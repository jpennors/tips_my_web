# TipsMyWeb


## Installation

Follow these steps to install the project from scratch.

### Clone the project

First clone the project by running the following command in the directory where you want the project to be installed.
```
git clone https://github.com/jpennors/tips_my_web.git
``` 

This will  create a directory named `tips_my_web`: enter it!
```
cd tips_my_web
```

### Install dependencies

#### Frontend dependencies

This will install all the javascript dependencies to make the React app work

First install *NPM* globally on your computer by following the instructions [here](https://www.npmjs.com/get-npm), then run the following:
```
npm install
```

#### Backend dependencies

This will install all the php dependencies to make the Laravel app work

First install *Composer* in the `tips_my_web` directory by following the instructions [here](https://getcomposer.org/download/), then run the following:
```
php composer.phar install
```

### Configure database

#### Install a database

Install a MySQL database on your computer: there are a lot of options available depending on your OS. A few options here:
- [Sequel Pro](https://www.sequelpro.com/) (Mac OS)
- ...
- ...

Create a new database caled...

#### Add database credentials to `.env` file

In the `tips_my_web` directory, create a file named `.env` and copy the content of `.env.example` in it. On the database section, fill in the credentials of your newly created mysql database.

#### Migrate data

...


### Launch the app

#### Launch the backend server

Run the following in the `tips_my_web` directory:
```
php artisan serve
```

This will launch the Laravel app and expose it to `http://localhost:8000` by default. If you want to use another port, add the `--` option.


