var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Todo API Root');
});

// GET request /todos (to get all todos)
app.get('/todos', function (req, res) {
  res.json(todos);
});
// GET /todos/:id (to get todo id:1 etc)
app.get('/todos/:id', function (req, res) {
  var todoId = parseInt(req.params.id, 10);
  var matchedTodo;
  todos.forEach(function (todo) {
    if (todo.id === todoId){
      matchedTodo = todo;
    }
  });

  if (!matchedTodo){
    res.status(404).send();  
  } else {
    res.json(matchedTodo);
  }
});


// POST /todos
app.post('/todos', function (req, res) {
  var body = req.body;
  // add id field
  // push body to array
  body.id = todoNextId++;
  todos.push(body);
  res.json(body);
});

app.listen(PORT, function () {
  console.log('Express listening on port ' + PORT + '!');
});