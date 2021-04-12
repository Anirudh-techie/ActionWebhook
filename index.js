const express = require('express');

const bodyParser = require('body-parser');  

// Import the service function and various response classes
const { conversation } = require('@assistant/conversation');

const app = conversation();

app.handle('plswork', conv => {
  // Implement your code here
  conv.add("<your prompt here>");
});


var exApp = express();

exApp.use(bodyParser.json(), app).listen(process.env.PORT);

