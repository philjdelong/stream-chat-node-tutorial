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

    // create channel
    const chatChannel = await client.channel('messaging', 'General', {
        name: "CDN-test",
        members: [userID],
    });

    await chatChannel.create()
    await chatChannel.addMembers([userID])

    client.configs.messaging.uploads = false
    console.log(client.configs.messaging.uploads)

    // const info = await chatChannel.sendMessage({
    //     text: "Ayoo",
    //     user_id: userID,
    //     mentioned_users: [userID]
    // });

    // console.log(info.message.id);
    // console.log(chatChannel);

    // class MyUploader: Uploader {
    //     // include functions here
    // };
    
    // let myUploader = MyUploader();
    // channelPresenter.uploadManager = UploadManager(uploader: myUploader);
};

test();
