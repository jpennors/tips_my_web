var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var migration = require('mysql-migrations');
var http = require('http');


var index = require('./routes/index');
var website = require('./routes/website.routes');
var tag = require('./routes/tag.routes');

var app = express();

var cors = require('cors');
app.use(cors({origin: 'http://localhost:3000'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// var fs = require("fs");
// var content = fs.readFileSync("app.env.json");
// var env = JSON.parse(content);

const db = require('./config/db.config.js');

// app.use('/', index);
app.use('/api/v1/websites', website);
app.use('/api/v1/tags', tag);

module.exports = app;
var server = http.createServer(app);
server.listen(4001);