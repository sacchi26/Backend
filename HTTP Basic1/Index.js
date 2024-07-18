const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Function to read the database file
const readDatabase = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
};

// Function to write to the database file
const writeDatabase = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// Get all todos
app.get('/todos', (req, res) => {
  const db = readDatabase();
  res.json(db.todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const db = readDatabase();
  const newTodo = {
    id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
    title: req.body.title,
    status: false
  };
  db.todos.push(newTodo);
  writeDatabase(db);
  res.status(201).json(newTodo);
});

// Update status of todos with even IDs from false to true
app.put('/todos/even', (req, res) => {
  const db = readDatabase();
  db.todos = db.todos.map(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      return { ...todo, status: true };
    }
    return todo;
  });
  writeDatabase(db);
  res.json(db.todos);
});

// Delete all todos with status true
app.delete('/todos', (req, res) => {
  let db = readDatabase();
  db.todos = db.todos.filter(todo => todo.status === false);
  writeDatabase(db);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
