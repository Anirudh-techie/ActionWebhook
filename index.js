const express = require('express');

const bodyParser = require('body-parser');

// Import the service function and various response classes
const { conversation } = require('@assistant/conversation');

const app = conversation();

app.handle('getGem', conv => {
  var BirthDate = conv.intent.params.BirthDate.resolved;
  if(BirthDate > 31 || BirthDate <1){
    conv.add("pls give a valid birthdate");
    return;
  }
  function root(num){
    var rt = 0;
    num.toString().split("").forEach((n) => {
      n = parseInt(n)
      rt += n;
    });

    if(rt.toString().split("").length>1){
      console.log(num)
      //return root(num);
      return rt;
    }else{
      return rt;
    }
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