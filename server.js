const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: "28:dfbc5f3a-53a2-40fe-a123-abefca9f9a7a",
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: 'hackabot',
        appSecret: '3bb9e620eed743a6a4b82593382b8144'
    }
});

// Create bot and add dialogs
console.log("Creating SkypeBot ...");
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
console.log("Configuring the restify server to serve the bot home page ...");
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 8080, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

/*
var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = { 
    appId: process.env.BOTFRAMEWORK_APPID, 
    appSecret: process.env.BOTFRAMEWORK_APPSECRET 
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/', function (session) {
    
    //respond with user's message
    session.send("You said " + session.message.text);
});

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/  /*, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));
*/
/*
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
*/
