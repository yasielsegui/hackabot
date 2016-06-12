const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');

// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: "dfbc5f3a-53a2-40fe-a123-abefca9f9a7a",
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: process.env.BOTFRAMEWORK_APPID,
        appSecret: process.env.BOTFRAMEWORK_APPSECRET
    }
});

// Create bot and add dialogs
var bot = new builder.SkypeBot(botService);
bot.add('/', function (session) {
   //respond with user's message
    session.send("You said " + session.message.text);
});

// Setup Restify Server
const server = restify.createServer();
server.post('/api/messages', skype.messagingHandler(botService));

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));
debugger;
server.listen(process.env.port || 3978, function () {
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
