import os
import requests
import configparser
from ftplib import FTP, FTP_TLS

config = configparser.ConfigParser()
config.read("./deploy.env.ini")
os.system("cls" if os.name == "nt" else "clear")

print("###### DEPLOYMENT ######")

print("\n\n>>> Retrieve latest data from Github <<<\n")
os.system("git pull")

print("\n\n>>> Install npm dependencies <<<\n")
os.system("npm install")

print("\n\n>>> Build Webapp <<<\n")
os.system("npm run build")

print("\n\n>>> Connect to FTP Server <<<\n")
host = config['FTP_AUTHENTICATION']['HOST']
port = config['FTP_AUTHENTICATION']['PORT']
usr = config['FTP_AUTHENTICATION']['USER']
pwd = config['FTP_AUTHENTICATION']['PASSWORD']
ftp = FTP()
ftp.connect(host, int(port))
ftp.login(usr, pwd)
ftp.cwd('/www/')


server_files_to_ignore = [
    ".",
    ".."
]

files_to_ignore = [
    "./.metals",
    "./bootstrap",
    "./documentation",
    "./public/storage",
    "./public/css/semantic",
    "./.git",
    "./node_modules",
    "./react",
    "./storage",
    "./tests",
    "./vendor",
    "./deploy.py"
]

def remove_files_to_update(path):
    files = ftp.nlst(path)
    for file in files:
        file_path = f'{path}/{file}'
        if not any(file_path.startswith(file) for file in files_to_ignore) and not any(file_path.startswith(file) for file in server_files_to_ignore):
            if os.path.isfile(file_path):
                ftp.delete(file_path)
            elif os.path.isdir(file_path):
                remove_files_to_update(file_path)
                ftp.rmd(file_path)


def dir_is_base_dir(dir):
    server_files = ftp.nlst(".")
    if dir in server_files:
        print(f'Uploading directory {dir}...')


def uploadFile(path, file):
    file_path = f'{path}/{file}'
    ftp.storbinary('STOR ' + path + "/" + file, open(file_path, 'rb'))

def uploadDirectory(path, existing_directory=True):
    if not existing_directory:
        ftp.mkd(path)
    files = os.listdir(path)
    server_files = ftp.nlst(path)
    for file in files:
        file_path = f'{path}/{file}'
        if os.path.isfile(file_path):
            uploadFile(path, file)
        elif os.path.isdir(file_path):
            if not any(file_path.startswith(file) for file in files_to_ignore):
                existing_directory = False
                if file in server_files:
                    existing_directory = True
                dir_is_base_dir(file)
                uploadDirectory(file_path, existing_directory)

print("\n>>> Remove files to update <<<\n")
remove_files_to_update(".")

print("\n>>> Upload new files <<<\n")
# uploadDirectory(".")


def make_request(method, path, data=None, headers=None):
    url = config['TMW_ADMIN']['API_URL']
    return requests.request(method=method, url=url+path, data=data, headers=headers)

print("\n>>> Login to Admin Webapp <<<\n")
data = {
    'username': config['TMW_ADMIN']['USERNAME'], 
    'password': config['TMW_ADMIN']['PASSWORD']
}
response = make_request(method='POST', path='login', data=data)

if response.status_code == 200:
    token = response.json()['token']
    print("Connection established")
else :
    print("Something went wrong when login into Admin Webapp..")
    print(response.json())


def is_deployment_command_done(api_response):
    if api_response.status_code == 200:
        print("Done")
    else :
        print("Something went wrong ...")
        print(response)

print("\n>>> Launching deployment commands in Admin Webapp <<<\n")

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