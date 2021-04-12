const express = require('express');

const bodyParser = require('body-parser');  

// Import the service function and various response classes
const { conversation } = require('@assistant/conversation');

const app = conversation();

app.handle('getGem', conv => {
var BirthDate= conv.intent.params.BirthDate.resolved;
var prev = 0;
BirthDate.toString().split("").forEach((n)=>{
  n = parseInt(n)
  prev +=n;
});
conv.add(prev.toString())
});


var exApp = express();

exApp.use(bodyParser.json(), app).listen(process.env.PORT);

