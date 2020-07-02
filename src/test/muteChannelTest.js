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
  const philUser = await client.setUser( { id: philID }, philToken )
  if(philUser) {
    console.log(chalk.blue("User created"));
  }

  // CREATE CHANNEL
  const chatChannel = client.channel("messaging", "testing-mute-1", {
    name: "mute-test",
    members: ["phil", "bob"],
  });

  if(chatChannel) {
    console.log(chalk.blue("Channel created"));
  }
  
  // MUTE CHANNEL
  await chatChannel.create()
  await chatChannel.update({'mute': true});
  philUser.me.channel_mutes
  // await philUser.me.channel_mutes.push(chatChannel.id)

  // VALIDATE TEST
  if(chatChannel.data['mute'] == true) {
    console.log(chalk.yellow("Channel muted"))
    console.log(chalk.greenBright("Test PASSING"))
  } else {
    console.log(chalk.redBright("Channel not muted"));
    console.log(chalk.red("Test FAILING"))
  }
};

test();