const express = require('express');

const bodyParser = require('body-parser');

// Import the service function and various response classes
const { conversation } = require('@assistant/conversation');

const app = conversation();

app.handle('getGem', conv => {
  var BirthDate = conv.intent.params.BirthDate.resolved;
  var prev = 0;
  if(BirthDate > 31 || BirthDate <1){
    conv.add("pls give a valid birthdate");
    return;
  }
  function root(num){
    num.toString().split("").forEach((n) => {
      n = parseInt(n)
      prev += n;
      if(prev.toString().split("").length>1){
        num = prev;
        console.log(num)
        return root(num);
      }
    });
    return prev;
  }
  var Root = root(BirthDate)
  console.log(Root)
  conv.add(numToGem(Root)?numToGem(Root):"error")

  
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
  var gem = Gems[num];
  if(gem){
    return gem;
  }else{
    return null;
  }
}