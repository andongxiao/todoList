var mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.connect('mongodb+srv://admin:523015302@cluster0-blhas.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true })
.then(() => console.log('MongoDb connected'))
.catch(function(err){
	console.log(err);
})

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");

