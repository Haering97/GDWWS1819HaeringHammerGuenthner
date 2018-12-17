
// Init
var express = require('express');
var router = express.Router();

// Routing


router.get('/',function (req,res,next) {
    res.send("Hey BUUUUUU");
});


module.exports = router;