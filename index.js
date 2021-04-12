const express = require('express');

const bodyParser = require('body-parser');  

// Import the service function and various response classes

const {

  dialogflow,

  Image,

  Table,

  Carousel,

} = require('actions-on-google');

const app = dialogflow({

  debug: true

});

app.intent('1', (conv) => {

  conv.ask('How are you?');

});

var exApp = express();

exApp.use(bodyParser.json(), app).listen(3000);
