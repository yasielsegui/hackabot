const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: "dfbc5f3a-53a2-40fe-a123-abefca9f9a7a",
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: process.env.APP_ID,
        appSecret: process.env.APP_SECRET
    }
});

// Create bot and add dialogs
var bot = new builder.SkypeBot(botService);
bot.add('/', function (session) {
   session.send('Hello World'); 
});

// Setup Restify Server
const server = restify.createServer();
server.post('/api/messages', skype.messagingHandler(botService));
server.listen(process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
