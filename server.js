const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: "28:dfbc5f3a-53a2-40fe-a123-abefca9f9a7a",
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: process.env.APP_ID,
        appSecret: process.env.APP_SECRET
    }
});

// Create bot and add dialogs
console.log("Creating SkypeBot ...");

/*
botService.on('contactAdded', (bot, data) => {
    console.log("Helloooooo");
    bot.reply('Hello', true);
});
botService.on('personalMessage', (bot, data) => {
    console.log("Helloooooo");
    
    bot.reply('Helloooooo', true);
});
*/

var bot = new builder.SkypeBot(botService);
bot.add('/', function (session) {
   //respond with user message
    //session.send("You said " + session.message.text);
    console.log("Helloooooo");
    session.send("HELLOoooooooooooooo");
});

// Setup Restify Server
console.log("Creating restify server ...");
const server = restify.createServer();
server.post('/api/messages', skype.messagingHandler(botService));

// Serve a static web page
//console.log("Configuring the restify server to serve the bot home page ...");
//server.get(/.*/, restify.serveStatic({
//	'directory': '.',
//	'default': 'index.html'
//}));


server.listen(process.env.port || 8080, function () {
   console.log('%s listening to %s', server.name, server.url); 
   console.log(JSON.stringify(server));
});

