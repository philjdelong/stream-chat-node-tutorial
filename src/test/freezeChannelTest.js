require("dotenv").config({ path: __dirname + "/.env" });
const chalk = require("chalk");
const { StreamChat } = require("stream-chat");

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
    };

    // create channel
    const chatChannel = client.channel('messaging', 'test-unmute-1', {
        name: "unmute-test",
        members: ["phil", "bob"],
    });

    if(chatChannel) {
        console.log(chalk.blue("Channel created"))
    } else {
        console.log(chalk.redBright("Channel not created"));
    };

    // freeze channel
    const freezeChannel = await chatChannel.update({frozen: true});
    freezeChannel;
    console.log(chatChannel.data);

    if(chatChannel.data.frozen == true) {
        console.log(chalk.yellow("Channel Frozen"));
        console.log(chalk.greenBright("Test PASSING"));
    } else {
        console.log(chalk.redBright("Test failing"));
    };
};

test();