var express = require('express');
var router = express.Router();

var app = express();
// app.use(express.static(__dirname+ '.././views'));
// app.use(express.static(__dirname+ '/public'));

router.get("/", function(req,res){
    console.log(__dirname);
    res.sendFile("index_guess.html");
});

module.exports = router;