var db = require('../models');

exports.getTodos = function(req, res){
	db.Todo.find()
	.then(function(todos){
		res.json(todos);
	})
	.catch(function(err){
		res.send(err);
	});
}

exports.createTodos = function(req,res){
	// console.log(req.body);
	db.Todo.create(req.body)
	.then(function(newTodo){
		res.json(newTodo);
	})
	.catch(function(err){
		res.send(err);
	});
}

exports.getTodo = function(req,res){
	db.Todo.findById(req.params.todoId)
	.then(function(foundTodo){
		res.json(foundTodo);
	})
	.catch(function(err){
		res.send(err);
	})
}

exports.modifyTodo = function(req,res){
	db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new:true})
	.then(function(todo){
		res.json(todo);
	})
	.catch(function(err){
		res.send(err);
	});

}

exports.deleteTodo = function(req,res){
	db.Todo.remove({_id:req.params.todoId})
	.then(function(){
		res.json({message: 'we delete it'});
	})
	.catch(function(){
		res.send("err");
	})
}

module.exports = exports;