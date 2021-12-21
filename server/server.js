const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// import the router modules
const taskRouter = require('./routes/task.router');

// set up the app
const app = express();

// set up the body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up the routes
app.use('/api/task', taskRouter);

// set up port
const PORT = process.env.Port || 5000;

app.listen(PORT, () => {
  console.log('Node React Native ToDo app started on:', PORT);
});
