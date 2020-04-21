import os
import sys
import requests
import configparser
from ftplib import FTP
from functools import partial
import json
import sys


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


def make_request(method, path, data=None, headers=None):
    url = config['TMW_ADMIN']['API_URL']
    return requests.request(method=method, url=url+path, data=data, headers=headers)

print_blue('\n>>> Login to Admin Webapp <<<\n')
token = None
data = {
    'username': config['TMW_ADMIN']['USERNAME'], 
    'password': config['TMW_ADMIN']['PASSWORD']
}
response = make_request(method='POST', path='login', data=data)

if response.status_code == 200:
    token = response.json()['token']
    print_green('Connection established')

else :
    print_red('Something went wrong when login into Admin Webapp..')
    sys.exit("Deployment cancelled")


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
    '.env',
    'composer.json',
    'composer.lock'
]


FORBIDDEN_DIRECTORIES = [
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

    def uploading_new_dependencies(self):
        self.download_old_dependencies()
        dependency_comparison = self.compare_dependencies()
        for dependency_name in dependency_comparison['dependency_to_update']:
            print(f'Updating dependency {dependency_name}...')
            file_path = './vendor/' + dependency_name
            self.remove_files(file_path)
            self.upload_dir(file_path)
        for dependency_name in dependency_comparison['dependency_to_create']:
            print(f'Creating dependency {dependency_name}...')
            file_path = './vendor/' + dependency_name
            self.upload_dir(file_path, False)
        for dependency_name in dependency_comparison['dependency_to_delete']:
            print(f'Deleting dependency {dependency_name}...')
            file_path = './vendor/' + dependency_name
            self.remove_files(file_path)
        self.remove_useless_dependency_files()


    def download_old_dependencies(self):
        local_files = os.listdir('.')
        if 'old_dependencies' not in local_files:
            os.system('mkdir old_dependencies')
        server_base_files = self.ftp.nlst(".")
        if "composer.lock" in server_base_files:
            self.ftp.retrbinary("RETR " + 'composer.lock' ,open('old_dependencies/composer.lock', 'wb').write)

    def compare_dependencies(self):
        new_dependencies = self.load_dependencies('composer.lock')
        old_dependencies = self.load_dependencies('old_dependencies/composer.lock')
        dependency_comparison = {
            'dependency_to_create': [],
            'dependency_to_update': [],
            'dependency_to_delete': []
        }
        for dependency_name in new_dependencies.keys():
            if dependency_name in old_dependencies.keys():
                # Check dependencies versions
                if new_dependencies[dependency_name] != old_dependencies[dependency_name]:
                    dependency_comparison['dependency_to_update'].append(dependency_name)
                del old_dependencies[dependency_name]
            else :
                dependency_comparison['dependency_to_create'].append(dependency_name)
        dependency_comparison['dependency_to_delete'] = old_dependencies.keys()
        return dependency_comparison
    
    def load_dependencies(self, file_path):
        dependencies = dict()
        if os.path.exists(file_path):
            with open(file_path) as handle:
                dictdump = json.loads(handle.read())
                for package in dictdump['packages']:
                    dependencies[package['name']] = package['version']
        return dependencies

    def remove_useless_dependency_files(self):
        if os.path.exists('old_dependencies/composer.lock'):
            os.remove('old_dependencies/composer.lock')
        if os.path.exists('old_dependencies'):
            os.rmdir('old_dependencies')


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
        response = self.make_request(method=method, path=path, headers=headers)
        self.is_deployment_command_done(response)


os.system('cls' if os.name == 'nt' else 'clear')


print_blue('###### DEPLOYMENT ######')


print_blue('\n\n>>> Retrieve latest data from Github <<<\n')
os.system('git pull')


print_blue('\n\n>>> Install npm dependencies <<<\n')
os.system('npm install')


print_blue('\n\n>>> Install Laravel dependencies <<<\n')
os.system('composer install')


print_blue('\n\n>>> Build Webapp <<<\n')
os.system('npm run build')


print_blue('\n\n>>> Connect to FTP Server <<<\n')
ftp = FtpServer()
ftp.login()


print_blue('\n>>> Update dependencies <<<\n')
ftp.uploading_new_dependencies()
print('Loading new dependencies...')


print_blue('\n>>> Uploading new project files <<<\n')
ftp.upload_tmw_project()    


print_blue('\n>>> Login to Admin Webapp <<<\n')
tmw = TmwAuthentication()
tmw.login()


print_blue('\n>>> Launching deployment commands in Admin Webapp <<<\n')
print('Migration...')
tmw.execute_command(method='GET', path='artisan/migration')
print('Seeding...')
tmw.execute_command(method='GET', path='artisan/seeds')
print('Cache...')
tmw.execute_command(method='GET', path='artisan/cache')
print('Config...')
tmw.execute_command(method='GET', path='artisan/config')


print_green('\n\n###### DEPLOYMENT DONE ######')
