import os
import sys
import requests
import configparser
from ftplib import FTP, FTP_TLS
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
os.system('cls' if os.name == 'nt' else 'clear')

print_blue('###### DEPLOYMENT ######')

print_blue('\n\n>>> Retrieve latest data from Github <<<\n')
os.system('git pull')

print_blue('\n\n>>> Install npm dependencies <<<\n')
os.system('npm install')

print_blue('\n\n>>> Build Webapp <<<\n')
os.system('npm run build')

print_blue('\n\n>>> Connect to FTP Server <<<\n')
host = config['FTP_AUTHENTICATION']['HOST']
port = config['FTP_AUTHENTICATION']['PORT']
usr = config['FTP_AUTHENTICATION']['USER']
pwd = config['FTP_AUTHENTICATION']['PASSWORD']
ftp = FTP()
ftp.connect(host, int(port))
ftp.login(usr, pwd)
print_green('Connection established')
ftp.cwd('/www/')


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
    '.env'
]

DEPENDENCIES_FILES = [
    '.composer.json',
    '.composer.lock'
]


FORBIDDEN_DIRECTORIES = [
    './public/storage',
    './public/css/semantic',
]

def remove_files(path):
    files = ftp.nlst(path)
    for file in files:
        file_path = f'{path}/{file}'
        if not any(map(file_path.startswith, FORBIDDEN_DIRECTORIES)) and not file in SERVER_FILES_TO_IGNORE:
            if os.path.isfile(file_path):
                ftp.delete(file_path)
            elif os.path.isdir(file_path):
                remove_files(file_path)


def upload_file(path, file):
    file_path = f'{path}/{file}'
    with open(file_path, 'rb') as fs:
        ftp.storbinary('STOR ' + path + '/' + file, fs)

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
            if not any(map(file_path.startswith, FORBIDDEN_DIRECTORIES)):               
                upload_dir(file_path, existing_directory=(file in server_files))


def upload_tmw_dependencies():
    for file in DEPENDENCIES_FILES:
        print(f'Removing old {file} ...')
        ftp.delete(file)
        print(f'Uploading new {file} ...')
        upload_file(".", file)


def upload_tmw_project():
    for dir in AUTHORIZED_DIRECTORIES:
        print(f'Removing old {dir} ...')
        remove_files(dir)
        print(f'Uploading new {dir} ...')
        upload_dir(dir)
    for file in AUTHORIZED_FILES:
        print(f'Removing old {file} ...')
        ftp.delete(file)
        print(f'Uploading new {file} ...')
        upload_file(".", file)


def is_deployment_command_done(api_response):
    if api_response.status_code == 200:
        print_green('Done')
    else :
        print_red('Something went wrong ...')       

print_blue('\n>>> Update dependencies <<<\n')
upload_tmw_dependencies()
print('Loading new dependencies...')
response = make_request(method='GET', path='deployment/dependencies', headers= {'Authorization': token })
is_deployment_command_done(response)

print_blue('\n>>> Uploading new project files <<<\n')
upload_tmw_project()    

print_blue('\n>>> Launching deployment commands in Admin Webapp <<<\n')

if token:

    headers = {
        'Authorization': token
    }

    print('Migration...')
    response = make_request(method='GET', path='deployment/migration', headers=headers)
    is_deployment_command_done(response)

    print('Seeding...')
    response = make_request(method='GET', path='deployment/seeding', headers=headers)
    is_deployment_command_done(response)

    print('Cache...')
    response = make_request(method='GET', path='deployment/cache', headers=headers)
    is_deployment_command_done(response)

    print('Config...')
    response = make_request(method='GET', path='deployment/config', headers=headers)
    is_deployment_command_done(response)

print_green('\n\n###### DEPLOYMENT DONE ######')