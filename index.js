const express = require('express');

const http = require('https');

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

exApp.use(bodyParser.json(), app);

http.createServer(exApp).listen(3000);
