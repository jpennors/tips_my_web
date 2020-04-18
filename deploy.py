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
uploadDirectory(".")
