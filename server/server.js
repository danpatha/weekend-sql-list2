const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()


//Setting a port  helps when we deploy this website to AWS or other places, below. 
const PORT = process.env.PORT || 5000;
const toDo = require('./routes/toDo.router')

//This allows our post to understand our form data.
app.use(bodyParser.urlencoded({extended: true}));

//Serves up static files
app.use(express.static('server/public'));

// ROUTES, 
app.use('/list', toDo)

// Start listening for requests on a specific port
//With the use of an arrow function
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});