// Importiert Pakete
var express = require ('express');
var router = require('./router');

var app = express();
var fetcher = require('./fetcher');
require('es6-promise').polyfill(); // aktiviert Promises
var fetchES6 = require('isomorphic-fetch'); // aktiviert fetch


app.use('/',router); // bindet eigenen Router ein

// Server
app.listen(3000,function () {
    console.log("Server running on port 3000");
});