const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");

const path = require("path")

const app = express();

app.use(bodyParser.json());

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
        throw err;
    }else{
       res.json(JSON.parse(data));
    }
    
  });
});

app.get('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      res.json(todos[todoIndex]);
    }
  });
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

app.put('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      const updatedTodo = {
        id: todos[todoIndex].id,
        title: req.body.title,
        description: req.body.description
      };
      todos[todoIndex] = updatedTodo;
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json(updatedTodo);
      });
    }
  });
});

app.delete('/todos/:id', (req, res) => {

  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos = removeAtIndex(todos, todoIndex);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});


//It is throwing cors error
// CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to prevent malicious websites from making unauthorized requests to other websites. 
// As we know fetch lets us send request from anywhere to any where.
// which is not good for multiple reasons
// This means any frontend can send request to any backened
// This is why these things are blocked
// if the origins are not same then the request will fail

// to correct that we have route our frontend filr with the same route that we use to send http requests

// now use we require path to provide full the full path basically through this we are just serving our html filr from the same route
// And make sure we are using it before app.use()

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"))
})

// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});


app.listen(3000)



// We can also avoid the cors error by installing the cors library and then

//const cors = require("cors")
// app.use(cors())

// This enables to send req from any frontend to any backend