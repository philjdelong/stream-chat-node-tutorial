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
    const userToken = client.createToken(userID);
    const setUser = await client.setUser( {id: userID }, userToken );

    if(setUser) {
        console.log(chalk.blue("User created"));
    } else {
        console.log(chalk.red("User not created"));
    };

    // create channel
    const chatChannel = client.channel('messaging', 'general-chat', {
        name: "Partial update test started",
        custom: true
    });

    await chatChannel.create()

    if (chatChannel) {
        console.log(chatChannel.data.name)
        console.log(chalk.blueBright("Channel created"))
    }
    
    await chatChannel.update({
        name: "Partial update complete",
        custom: true
    })
    
    if( chatChannel.data.custom && chatChannel.data.name == "Partial update complete" ) {
        console.log(chalk.yellowBright(chatChannel.data.name))
        console.log(chalk.green(chatChannel.data.custom))
        console.log(chalk.greenBright("Test passing"))
    } else {
        console.log(chalk.red("Test not passing"))
        console.log(chalk.redBright("Need more customs!"))
    }
}

test();