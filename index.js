// Importiert Pakete
var express = require ('express');
var router = require('./router');

var app = express();
var fetcher = require('./fetcher');
var fetchES6 = require('isomorphic-fetch'); // aktiviert fetch
require('es6-promise').polyfill(); // aktiviert Promises


app.use('/',router); // bindet eigenen Router ein

// Server
app.listen(3000);