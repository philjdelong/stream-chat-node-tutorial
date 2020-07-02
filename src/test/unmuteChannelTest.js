require("dotenv").config({ path: __dirname + "/.env"});
const chalk = require("chalk");
const { StreamChat } = require("stream-chat");
const { set } = require("mongoose");

// initialize client
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const test = async () => {
    const client = new StreamChat( apiKey, apiSecret, { timeout: 6000 } );
    
    // set user
    const userID = "phil";
    const userToken = await client.createToken(userID);
    const setUser = client.setUser( {id: userID }, userToken );
    if(setUser) {
        console.log(chalk.blue("User created"));
    } else {
        console.log(chalk.red("User not created"));
    }

    // create channel
    const chatChannel = client.channel('messaging', 'test-unmute-1', {
        name: "unmute-test",
        members: ["phil", "courtney"],
    });

    if(chatChannel) {
        console.log(chalk.blue("Channel created"))
    } else {
        console.log(chalk.redBright("Channel not created"));
    }

    // mute channel
    await chatChannel.create();
    const muteChatChannel = chatChannel.update({"mute": true});
    await muteChatChannel;
    
    if(chatChannel.data['mute'] == true) {
        console.log(chalk.blue("Channel muted"));
    } else {
        console.log(chalk.redBright("Channel not muted"));
    };

    
    const unmuteChatChannel = () => {
        if(chatChannel.data['mute'] == true) {
            chatChannel.update({'mute': false});
            console.log(chalk.yellow("Channel unmuted"));
            console.log(chalk.greenBright("TEST PASSED"));
        } else {
            console.log(chalk.redBright("Channel already unmuted"));
        }
    }
    
    unmuteChatChannel();
};

test();