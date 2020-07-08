require('dotenv').config({ path: __dirname + '/.env' });
const chalk = require('chalk');
const { StreamChat } = require('stream-chat');

// initialize client
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const test = async () => {
    const client = new StreamChat( apiKey, apiSecret, { timeout: 6000 } );

    // create user 
    const userID = "phil";
    const userRole = "admin"
    
    const userToken = await client.createToken(userID);
    await client.upsertUser({ id: userID, name: userID, role: userRole }, userToken);

    class MyUploader: Uploader {
        // include functions here
    };
    
    let myUploader = MyUploader();
    channelPresenter.uploadManager = UploadManager(uploader: myUploader);


};

test();
