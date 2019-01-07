// Importiert Pakete
var express = require ('express');
var router = require('./router');


var app = express();
var fetcher = require('./fetcher');
var fetchES6 = require('isomorphic-fetch');
require('es6-promise').polyfill();


app.use('/',router);

var app = express();

app.use('/',router);



// Server
app.listen(3000);