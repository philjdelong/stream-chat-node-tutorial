require('dotenv').config({ path: __dirname + '/.env' });
const chalk = require('chalk');
const { StreamChat } = require('stream-chat');

// initialize client
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const test = async () => {
    const client = new StreamChat( apiKey, apiSecret, { timeout: 6000 } );

    // create user with .upsertUser()
    const userID = "phil";
    const userRole = "admin"
    
    const userToken = await client.createToken(userID);
    const createOrUpdate = await client.upsertUser({ id: userID, name: userID, role: userRole }, userToken);

    if(createOrUpdate) {
        console.log(chalk.yellow("User successfully created or updated"));
        console.log(chalk.greenBright("Test PASSING"));
    } else {
        console.log(chalk.red("User not created or updated"));
        console.log(chalk.redBright("User not created or updated"));
    };
};

test();