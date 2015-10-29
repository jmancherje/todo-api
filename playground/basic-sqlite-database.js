var Sequelize = require('sequelize');

// an instance of Sequelize
var sequelize = new Sequelize(undefined, undefined, undefined, {
  // use sql database
  'dialect': 'sqlite',
  // where to store sqlite database (a file)
  'storage': __dirname + '/basic-sqlite-database.sqlite'
});

// Todo is definition of how the database will structure it's data
// each item is a singular / lower case todo
var Todo = sequelize.define('todo', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 250]
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

sequelize.sync({
  // force: true
}).then(function() {
  console.log('Everything is synced');


  Todo.findById(2).then(function (todo) {
    if (todo) {
      console.log(todo.toJSON());  
    } else {
      console.log('No item with that id');
    }
    
  });

  // Todo.create({
  //   description: 'Take out trash'
  // }).then(function(todo) {
  //   return Todo.create({
  //     description: 'Clean Room'
  //   });
  // }).then(function () {
  //   // return 1 todo item by id
  //   // return Todo.findById(1);

  //   return Todo.findAll({
  //     where: {
  //       description: {
  //         // $like to look for something inside the string
  //         // works with upper and lower case
  //         $like: '%trash%'
  //       }
  //     }
  //   });
  // }).then(function (todos) {
  //   if (todos) {
  //     todos.forEach(function (todo) {
  //       console.log(todo.toJSON());
  //     })
  //   } else {
  //     console.log('no todo found');
  //   }
  // }).catch(function (error) {
  //   console.log(error);
  // });
});
