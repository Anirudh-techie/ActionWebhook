const express = require('express');

const bodyParser = require('body-parser');

// Import the service function and various response classes
const { conversation, Card, Simple } = require('@assistant/conversation');

const app = conversation();

app.handle('getGem', conv => {
  var BirthDate = conv.intent.params.BirthDate.resolved;
  if (BirthDate > 31 || BirthDate < 1) {
    conv.add("Please give a valid birthdate");
    return;
  }
  function root(num) {
    var rt = 0;
    num.toString().split("").forEach((n) => {
      n = parseInt(n)
      rt += n;
    });

    if (rt.toString().split("").length > 1) {
      return root(rt);
    } else {
      return rt;
    }
  }


  var Root = root(BirthDate)
  var desc = description(numToGem(Root) ? numToGem(Root) : null)
  if (!desc) {
    conv.add("Please give a valid birthdate");
    return;
  }
  conv.add(new Card({ title: numToGem(Root) ? numToGem(Root) : "Error", text: desc }));
  conv.add(new Simple({speech:"<speak>"+numToGem(Root)+'.<break time="1"/>'+desc+"</speak>",text:"ok... here is your gem. "}))
  // conv.add(`Thanks for using AstroVision GemFinder!!! `);
});
function description(gem) {
  var desc = {
    "Ruby": `Ruby is a transparent variety of crystalline corundum with a reddening trace of chromic oxide. Ruby is
    red in color with a hardness of 9. It is found in Brazil, Burma, Thailand, and Srilanka. Ruby is
    governed by the planet Sun. It is considered to be a hot precious gem. As a cheaper substitute for Ruby
    you can decide to use Garnet, which is a semi-precious stone.`,
    "Pearl": `Pearl is an organic substance, the hardened secretions of certain varieties of shelled mollusks like
    oysters. It is found in the Pacific and Indian oceans. Pearls are also produced by culture. Although
    cultured pearls usually look more uniform in shape and better in color often they are not as good as
    natural pearls. Pearl is governed by Moon. It is a cool gem. Opal, which is a semi-precious stone can
    be used as a substitute for Pearl, if you so desire.`,
    "Yellow Sapphire": `Sapphire is a variety of corundum and is found in different colors. Sapphire of yellow or golden
    colors are ruled by Jupiter. It has a hardness of 8. Yellow Sapphire is found in Srilanka, India,
    Australia and Russia. Burmese Sapphire is also very famous. Yellow Sapphire releases blue cosmic
    rays and is a cold gem. Golden Topaz will give results equivalent to Yellow Sapphire. So you can buy
    either of these two.`,
    "Hessonite (Gomed)": `Gomed, also known as Hessonite or Cinnamon is similar to Grossular Garnet, silicate of calcium and
    aluminum. It is yellowish-brown in color. It is found in abundance in many countries including
    Srilanka, USA, India, Canada, Brazil, and Burma. Burmese and Srilankan variety of Hessonite is
    considered to be superior. It is available along the banks of the river Krishna and Nedumangad in Kerala.
    Astrologically it is associated with ultra-violet cosmic rays and is ruled by Rahu.
    `,
    "Emerald": `Rich green in color, Emerald is a silicate of beryllium and aluminum with a hardness of 7.5 to 8.
    Occurs in Australia, Brazil, Columbia, Norway, and the Urals. It is a precious stone ruled by Mercury. It
    releases cold green rays. Semi-precious stones Jade and Peridot can be used by you as substitute for
    Emerald on considerations of cost.
    `,
    "Diamond": `Diamond is a precious stone. It is crystalline carbon. Hardness is 10. Occurs in South Africa, India,
    Brazil, Syberia, Urals, and Sierra Leone. Diamond is found in different shades and colors. Usually
    Diamond has a blue or slightly yellow tint. It is a costly gem and in India, it enjoys the reputation of
    being especially auspicious. Moreover, it is believed to be most effective if it is received as a gift from
    someone close to you. Diamond is ruled by Venus. It releases indigo blue cosmic rays and is a cold
    gem.
    `,
    "Cat's Eye (Vidurya)": `Cats' eye is a variety of chrysoberyl. Is yellowish to brownish green in color with a kind of moving
    thread in the middle. Hardness is 8.5. Cats' eye is associated with Ketu and infrared cosmic rays. It is
    considered to be a hot gem.`,
    "Blue Sapphire": `Blue Sapphire is corundum with a bluish trace of iron or titanium. Dark blue has a
    the hardness of 9. Occurs in Burma, Srilanka, Kashmir, and Australia. Planet connected with Blue
    Sapphire is the mighty Saturn. Blue Sapphire releases violet cosmic rays and is a cold gem. If you feel
    the need for cheaper semi-precious stones, Iolite or Lapis Lazuli can be used as a substitute.`,
    "Red Coral": `Coral is the skeleton of coral polyps, available in coral reefs. It occurs in many colors, but the gem
    variety is vivid red. Occurs in the Pacific and Indian oceans. Red coral is governed by planet Mars. It
    filters off the malefic rays of Mars and permits only the rays which are beneficial to you. It is a hot
    gem.`

  }
  if (desc[gem]) {
    return desc[gem];
  }
  else {
    return null
  }

}
var exApp = express();

exApp.use(bodyParser.json(), app).listen(process.env.PORT);

function numToGem(num) {
  var Gems = [
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
  num = num - 1;
  var gem = Gems[num];
  if (gem) {
    return gem;
  } else {
    return null;
  }
}
