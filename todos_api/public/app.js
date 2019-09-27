// alert("Hello from js");
/* global $ */

$(document).ready(function() {
	$.getJSON('/api/todos')
	.then(addTodos)

	$('#todoInput').keypress(function(event){
		if (event.which == 13) {
			createTodo();
		}
	});

	$('.list').on('click','li',function(){
		// alert("click");
		updateTodo($(this));
	})

	$('.list').on('click','span',function(e){
		e.stopPropagation();
		// console.log('click');
		removeTodo($(this).parent());
		
	})
});

function addTodos(todos){
	todos.forEach(function(todo){
		addTodo(todo);
	})
}

function addTodo(todo){
	var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('comp', todo.completed);
	if(todo.completed){
			newTodo.toggleClass("done");
	}
	$('.list').append(newTodo);
}


function createTodo(){
	var userInput = $('#todoInput').val();
	// console.log(userInput);
	$.post('/api/todos',{name: userInput})
	.then(function(newTodo){
		// console.log(newTodo);
		addTodo(newTodo);
	})
	.catch(function(err){
		console.log(err);
	})
}	

function removeTodo(todo){
	var deleteUrl = 'api/todos/' + todo.data('id');
	$.ajax({
		url: deleteUrl,
		type: 'DELETE',
	})
	.done(function() {
		console.log("success");
		todo.remove();
	})
	.fail(function() {
		console.log("error");
	})
}

function updateTodo(todo){
	var updateUrl = '/api/todos/' + todo.data('id');
	var isDone = !todo.data('comp');
	var updateData = {completed: isDone};

	$.ajax({
		url: updateUrl,
		type: 'PUT',
		data: updateData
	})
	.done(function() {
		todo.toggleClass('done');
		todo.data('comp', isDone)
		// console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
}