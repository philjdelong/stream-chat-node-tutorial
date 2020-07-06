require('dotenv').config({ path: __dirname + '/.env' });
const chalk = require('chalk');
const { StreamChat } = require('stream-chat');
const { Error } = require('mongoose');

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const test = async () => {
    const client = new StreamChat( apiKey, apiSecret, { timeout: 6000 } );

    // create users
    const joeID = "joe";
    const joeToken = await client.createToken(joeID);
    
    const janeID = "jane";
    const janeToken = await client.createToken(janeID);
    await client.updateUser({id: janeID, name: "jane"}, janeToken);
    
    // set currentUser
    await client.setUser({id: joeID, name: "joe"}, joeToken);

    // create channel
    const doeChannel = await client.channel('messaging', "doe-family", {
        name: "doe-family-chat",
        members: ['joe', 'jane']
    });

    await doeChannel.create();
    await doeChannel.addMembers(['joe', 'jane']);
    
    // mute user
    const muter = (user_id) => client.muteUser(user_id);
    const unmuter = (user_id) => client.muteUser(user_id);

    await muter('jane');
    await unmuter('jane');
    
};
test();