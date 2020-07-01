require("dotenv").config({ path: __dirname + "/.env" });
const chalk = require('chalk')

const key = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_API_SECRET;
const StreamChat = require("stream-chat").StreamChat;
const test = async () => {
  client = new StreamChat( key, secret, { timeout: 6000 } );

  // SET USER
  const philID = "phil";
  const philToken = await client.createToken(philID);
  const setPhil = await client.setUser( { id: philID }, philToken )
  if(setPhil) {
    console.log(chalk.blue("User created"));
  }

  // CREATE CHANNEL
  const conversation = client.channel("messaging", "testing-mute-1", {
    name: "mute-test",
    members: ["phil", "bob"],
  });

  if(conversation) {
    console.log(chalk.blue("Channel created"));
  }
  
  // MUTE CHANNEL
  await conversation.create()
  const muteConversation = await conversation.update({'mute' : true})

  if(muteConversation) {
    console.log(chalk.yellow("Channel muted"))
  }

  // VALIDATE TEST
  if(conversation['data']['mute']) {
    console.log(chalk.greenBright("Test PASSING"))
  } else {
    console.log(chalk.red("Test FAILING"))
  }
};

test();