const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/react/index.js', 'public/js');
mix.copyDirectory('resources/assets/react/images', 'public/images');
mix.copyDirectory('resources/assets/react/fonts', 'public/fonts');
