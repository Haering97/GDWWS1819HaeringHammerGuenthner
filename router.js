
// Init
var express = require('express');
var router = express.Router();
var fetcher = require('./fetcher');

// Routing


router.get('/',function (req,res,next) {

    res.send("Hey BUUUUUU");
});



router.get('/:geo1/:geo2',function (req,res,next) {
    var geo1 = req.param("geo1");
    var geo2 = req.param("geo2");
    fetcher.getInfo(geo1,geo2);
    res.send(geo1 + geo2);
});


module.exports = router;