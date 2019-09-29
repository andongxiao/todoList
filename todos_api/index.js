var express = require('express'),
	bodyParser = require('body-parser');

var app = express();

var todoRoutes = require('./routes/todos');
var guessRouter = require('./routes/guess');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));
app.use(express.static(__dirname+ '/views'));
app.use(express.static(__dirname+ '/public'));

app.get('/', function(req,res){
	res.sendFile("index.html");
})

app.get('/todo',function(req,res){
	res.sendFile(__dirname+ "/views/index_todo.html");
})

app.get('/guess', function(req, res){
	res.sendFile(__dirname+ "/views/index_guess.html");
});

// app.get('/', function(req, res){
// 	res.json("Hi there from root express");
// })

app.use('/api/todos', todoRoutes);

app.listen(3000, function(){
	console.log("APP is Running");

});
