import os
import requests
import configparser
from ftplib import FTP, FTP_TLS


class bcolors:
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

config = configparser.ConfigParser()
config.read('./deploy.env.ini')
os.system('cls' if os.name == 'nt' else 'clear')

print(f'{bcolors.OKBLUE}###### DEPLOYMENT ######{bcolors.ENDC}')

print(f'{bcolors.OKBLUE}\n\n>>> Retrieve latest data from Github <<<\n{bcolors.ENDC}')
os.system('git pull')

print(f'{bcolors.OKBLUE}\n\n>>> Install npm dependencies <<<\n{bcolors.ENDC}')
os.system('npm install')

print(f'{bcolors.OKBLUE}\n\n>>> Build Webapp <<<\n{bcolors.ENDC}')
os.system('npm run build')

print(f'{bcolors.OKBLUE}\n\n>>> Connect to FTP Server <<<\n{bcolors.ENDC}')
host = config['FTP_AUTHENTICATION']['HOST']
port = config['FTP_AUTHENTICATION']['PORT']
usr = config['FTP_AUTHENTICATION']['USER']
pwd = config['FTP_AUTHENTICATION']['PASSWORD']
ftp = FTP()
ftp.connect(host, int(port))
ftp.login(usr, pwd)
ftp.cwd('/www/')


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
    './.env'
]

FORBIDDEN_DIRECTORIES = [
    './public/storage',
    './public/css/semantic',
]

files_to_ignore = [
    './public/storage',
    './public/css/semantic',
]

def remove_files(path):
    files = ftp.nlst(path)
    for file in files:
        file_path = f'{path}/{file}'
        if not any(file_path.startswith(file) for file in FORBIDDEN_DIRECTORIES) and not any(file == file_to_ignore for file_to_ignore in SERVER_FILES_TO_IGNORE):
            if os.path.isfile(file_path):
                ftp.delete(file_path)
            elif os.path.isdir(file_path):
                remove_files(file_path)


def upload_file(path, file):
    file_path = f'{path}/{file}'
    ftp.storbinary('STOR ' + path + '/' + file, open(file_path, 'rb'))

def upload_dir(path, existing_directory=True):
    if not existing_directory:
        ftp.mkd(path)
    files = os.listdir(path)
    server_files = ftp.nlst(path)
    for file in files:
        file_path = f'{path}/{file}'
        if os.path.isfile(file_path):
            upload_file(path, file)
        elif os.path.isdir(file_path):
            if not any(file_path.startswith(dir) for dir in FORBIDDEN_DIRECTORIES):
                existing_directory = False
                if file in server_files:
                    existing_directory = True
                upload_dir(file_path, existing_directory)


def remove_old_tmw_project():
    for dir in AUTHORIZED_DIRECTORIES:
        print(f'Removing {dir} ...')
        remove_files(dir)
    for file in AUTHORIZED_FILES:
        print(f'Removing {file} ...')
        remove_files(file)

def upload_tmw_project():
    for dir in AUTHORIZED_DIRECTORIES:
        print(f'Uploading {dir} ...')
        upload_dir(dir)
    for file in AUTHORIZED_FILES:
        print(f'Uploading {file} ...')
        # upload_file(file)

print(f'{bcolors.OKBLUE}\n>>> Remove files to update <<<\n{bcolors.ENDC}')
remove_old_tmw_project()

print(f'{bcolors.OKBLUE}\n>>> Upload new files <<<\n{bcolors.ENDC}')
upload_tmw_project()
    


def make_request(method, path, data=None, headers=None):
    url = config['TMW_ADMIN']['API_URL']
    return requests.request(method=method, url=url+path, data=data, headers=headers)

print(f'{bcolors.OKBLUE}\n>>> Login to Admin Webapp <<<\n{bcolors.ENDC}')
token = None
data = {
    'username': config['TMW_ADMIN']['USERNAME'], 
    'password': config['TMW_ADMIN']['PASSWORD']
}
response = make_request(method='POST', path='login', data=data)

if response.status_code == 200:
    token = response.json()['token']
    print(f'{bcolors.OKGREEN}Connection established{bcolors.ENDC}')
else :
    print(response.json())
    print(f'{bcolors.FAIL}Something went wrong when login into Admin Webapp..{bcolors.ENDC}')


def is_deployment_command_done(api_response):
    if api_response.status_code == 200:
        print(f'{bcolors.OKGREEN}Done{bcolors.ENDC}')
    else :
        print(f'{bcolors.FAIL}Something went wrong ...{bcolors.ENDC}')
        print(response)

print(f'{bcolors.OKBLUE}\n>>> Launching deployment commands in Admin Webapp <<<\n{bcolors.ENDC}')

if token:

    headers = {
        'Authorization': token
    }

    print("Dependencies...")
    response = make_request(method='GET', path='deployment/dependencies', headers=headers)
    is_deployment_command_done(response)

    print("Migration...")
    response = make_request(method='GET', path='deployment/migration', headers=headers)
    is_deployment_command_done(response)

    print("Seeding...")
    response = make_request(method='GET', path='deployment/seeding', headers=headers)
    is_deployment_command_done(response)

    print("Cache...")
    response = make_request(method='GET', path='deployment/cache', headers=headers)
    is_deployment_command_done(response)

    print("Config...")
    response = make_request(method='GET', path='deployment/config', headers=headers)
    is_deployment_command_done(response)

print("###### DEPLOYMENT DONE ######")