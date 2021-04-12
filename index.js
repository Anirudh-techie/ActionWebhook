const express = require('express');

const bodyParser = require('body-parser');

// Import the service function and various response classes
const { conversation } = require('@assistant/conversation');

const app = conversation();

app.handle('getGem', conv => {
  var BirthDate = conv.intent.params.BirthDate.resolved;
  var prev = 0;
  BirthDate.toString().split("").forEach((n) => {
    n = parseInt(n)
    prev += n;

  });

  conv.add(numToGem(prev))

  
});

var exApp = express();

exApp.use(bodyParser.json(), app).listen(process.env.PORT);

function numToGem(num){
  var Gems=[
    "Ruby",
    "Pearl",
    "Yellow Sapphire",
    "Hessonite (Gomed)",
    "Emerald",
    "Diamond",
    "Cat's Eye (Vidurya)",
    "Blue Sapphire",
    "Red Coral"
]
  num = num-1;
  var gem = gems[num];
  if(gem){
    return gem;
  }else{
    return null;
  }
}