const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const {username} = request.headers;

  const user =  users.find((user) => user.username === username)
  
  if(!users) {
    return response.status(400).json({message: "User not found"})
  }

  request.user = user

  return next();
}

app.post('/users', (request, response) => {
  const { username, name} = request.body;

  const userAlreadyExists = users.some((users)=> users.username === username)

  if(userAlreadyExists){
    return response.status(400).json({error: 'Username already exists'})
  }

  users.push({
    username,
    name,
    id: uuidv4(),
    todos:[],
  })

  return response.status(201).send();
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {user} = request;

  return response.status(201).json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {title, done, deadline} = request.body;
  const {user} = request;

  const todo = {
    title,
    done,
    deadline,
    created_at: new Date(),
  }

  user.todos.push(todo);

  return response.status(201).send()
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.listen(3333);