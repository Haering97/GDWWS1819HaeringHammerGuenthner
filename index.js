// Importiert Pakete
var express = require ('express');
var router = require('./router');


var app = express();

app.use('/',router);



// Server
app.listen(3000);