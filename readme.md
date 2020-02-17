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

First install **NPM** globally on your computer by following the instructions [here](https://www.npmjs.com/get-npm), then run the following:
```
npm install
```

#### Backend dependencies

This will install all the php dependencies to make the Laravel app work

First install **Composer** in the `tips_my_web` directory by following the instructions [here](https://getcomposer.org/download/), then run the following:
```
php composer.phar install
```

### Add `.env` file

#### Create the file
Run the following to create a `.env` file in the project root directory, which will for now be a copy of the default `.env.example` file:
```
cp .env.example .env
```

Later, we'll fill out this file to add database and debugging configuration.

#### Add the encryption key
Laravel requires you to have an app encryption key which is generally randomly generated and stored in your `.env` file. The app will use this encryption key to encode various elements, from cookies to password hashes and more. Run the following to generate the key:

```
php artisan key:generate
```

If you check the `.env` file again, you will see that it now has a long random string of characters in the `APP_KEY` field. We now have a valid app encryption key.

### Configure database

#### Install a database

Install a MySQL database on your computer: there are a lot of options available depending on your OS. A few options here:
- [Sequel Pro](https://www.sequelpro.com/) (Mac OS)
- ...
- ...

#### Add database credentials to `.env` file

Create an empty database (you can name it `tmw` for example but the name is up to you).

In the `.env` file, fill in the `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` options to match the credentials of the database you just created. This will allow us to run migrations and seed the database in the next step.

#### Migrate the database

Once your credentials are in the `.env` file, you can migrate your database:
```
php artisan migrate
```

This will create the tables necessary for the app to work.

#### Seed the database

*⚠️ TODO ! The database is empty for now, so you'll have to add some data through the admin interface to use the app. Later we'll add some basic random set of resources/tags that will be added automatically at the beginning.*

### Launch the app

#### Build the frontend

Run the following in the `tips_my_web` directory:
```
npm run build
```

This will export the react app into js bundled files and make them available in the `tips_my_web/public/` directory.


#### Launch the backend server

⚠️ Before launching the backend server, make sure the mysql database is running! Then run the following in the `tips_my_web` directory:
```
php artisan serve
```

This will launch the Laravel app and expose it to `http://localhost:8000` by default. If you want to use another port, for example `8080`, run `php artisan serve --port=8080`.

That's it! Open [http://localhost:8000](http://localhost:8000) to see the app running.

## Development tools


