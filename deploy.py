import os
import requests
import configparser
from ftplib import FTP
from functools import partial


class bcolors:
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'


def printc(text: str, color: str):
    print(getattr(bcolors, color) + text + bcolors.ENDC)
print_blue = partial(printc, color='OKBLUE')
print_green = partial(printc, color='OKGREEN')
print_red = partial(printc, color='FAIL')


config = configparser.ConfigParser()
config.read('./deploy.env.ini')


SERVER_FILES_TO_IGNORE = [
    '.',
    '..'
]


AUTHORIZED_DIRECTORIES = [
    './app',
    './config',
    './public',
    './resources',
    './routes'
]


AUTHORIZED_FILES = [
    '.env'
]


DEPENDENCIES_FILES = [
    'composer.json',
    'composer.lock'
]

files_to_ignore = [
    './public/storage',
    './public/css/semantic',
]


class FtpServer:

    ftp = None

    def login(self):
        host = config['FTP_AUTHENTICATION']['HOST']
        port = config['FTP_AUTHENTICATION']['PORT']
        usr = config['FTP_AUTHENTICATION']['USER']
        pwd = config['FTP_AUTHENTICATION']['PASSWORD']
        self.ftp = FTP()
        self.ftp.connect(host, int(port))
        self.ftp.login(usr, pwd)
        print_green('Connection established')
        self.ftp.cwd('/www/')

    def delete_file(self, file_path):
        try:
            self.ftp.delete(file_path)
        except:
            print_red(f'Unable to remove {file_path}...')

    def remove_files(self, path):
        files = self.ftp.nlst(path)
        for file in files:
            file_path = f'{path}/{file}'
            if not any(map(file_path.startswith, FORBIDDEN_DIRECTORIES)) and not file in SERVER_FILES_TO_IGNORE:
                if os.path.isfile(file_path):
                    self.delete_file(file_path)
                elif os.path.isdir(file_path):
                    self.remove_files(file_path)

    def upload_file(self, path, file):
        file_path = f'{path}/{file}'
        with open(file_path, 'rb') as fs:
            self.ftp.storbinary('STOR ' + path + '/' + file, fs)

    def upload_dir(self, path, existing_directory=True):
        if not existing_directory:
            self.ftp.mkd(path)
        files = os.listdir(path)
        server_files = self.ftp.nlst(path)
        for file in files:
            file_path = f'{path}/{file}'
            if os.path.isfile(file_path):
                self.upload_file(path, file)
            elif os.path.isdir(file_path):
                if not any(map(file_path.startswith, FORBIDDEN_DIRECTORIES)):               
                    self.upload_dir(file_path, existing_directory=(file in server_files))

    def upload_tmw_dependencies(self):
        for file in DEPENDENCIES_FILES:
            print(f'Removing old {file} ...')
            self.delete_file(file)
            print(f'Uploading new {file} ...')
            self.upload_file(".", file)
    
    def upload_tmw_project(self):
        for dir in AUTHORIZED_DIRECTORIES:
            print(f'Removing old {dir} ...')
            self.remove_files(dir)
            print(f'Uploading new {dir} ...')
            self.upload_dir(dir)
        for file in AUTHORIZED_FILES:
            print(f'Removing old {file} ...')
            self.delete_file(file)
            print(f'Uploading new {file} ...')
            self.upload_file(".", file)


class TmwAuthentication:

    token = None

    def make_request(self, method, path, data=None, headers=None):
        url = config['TMW_ADMIN']['API_URL']
        return requests.request(method=method, url=url+path, data=data, headers=headers)

    def login(self):
        data = {
            'username': config['TMW_ADMIN']['USERNAME'], 
            'password': config['TMW_ADMIN']['PASSWORD']
        }
        response = self.make_request(method='POST', path='login', data=data)
        if response.status_code == 200:
            self.token = response.json()['token']
            print_green('Connection established')
        else :
            print_red('Something went wrong when login into Admin Webapp..')
            sys.exit("Deployment cancelled")

    def is_deployment_command_done(self, api_response):
        if api_response.status_code == 200:
            print_green('Done')
        else :
            print_red('Something went wrong ...')   

    def execute_command(self, method, path):
        headers = {
            'Authorization': self.token
        }
        response = self.make_request(method='GET', path='deployment/migration', headers=headers)
        self.is_deployment_command_done(response)


os.system('cls' if os.name == 'nt' else 'clear')


print_blue('###### DEPLOYMENT ######')


print_blue('\n\n>>> Retrieve latest data from Github <<<\n')
os.system('git pull')


print_blue('\n\n>>> Install npm dependencies <<<\n')
os.system('npm install')


print_blue('\n\n>>> Build Webapp <<<\n')
os.system('npm run build')


print_blue('\n\n>>> Connect to FTP Server <<<\n')
ftp = FtpServer()
ftp.login()


print_blue('\n>>> Login to Admin Webapp <<<\n')
tmw = TmwAuthentication()
tmw.login()


print_blue('\n>>> Update dependencies <<<\n')
ftp.upload_tmw_dependencies()
print('Loading new dependencies...')
tmw.execute_command('GET', 'deployment/dependencies')


print_blue('\n>>> Uploading new project files <<<\n')
ftp.upload_tmw_project()    


print_blue('\n>>> Launching deployment commands in Admin Webapp <<<\n')
print('Migration...')
tmw.execute_command(method='GET', path='deployment/migration')
print('Seeding...')
tmw.execute_command(method='GET', path='deployment/seeding')
print('Cache...')
tmw.execute_command(method='GET', path='deployment/cache')
print('Config...')
tmw.execute_command(method='GET', path='deployment/config')


print(f'{bcolors.OKGREEN}\n\n###### DEPLOYMENT DONE ######{bcolors.ENDC}')