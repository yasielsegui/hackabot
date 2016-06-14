   var stringify = function (obj, replacer, spaces, cycleReplacer) {
      return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
   };

   var serializer = function (replacer, cycleReplacer) {
        var stack = [], keys = [];

        if (cycleReplacer == null) cycleReplacer = function(key, value) {
            if (stack[0] === value) return "[Circular ~]"
            return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
        }

        return function(key, value) {
            if (stack.length > 0) {
            var thisPos = stack.indexOf(this)
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
            if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
            }
            else stack.push(value)

            return replacer == null ? value : replacer.call(this, key, value);
        };
    };
    
    var jsonify = function (obj) { 
        return stringify(obj, null, 2);
    };

const restify = require('restify');
const skype = require('skype-sdk');
const builder = require('botbuilder');




// Initialize the BotService
const botService = new skype.BotService({
    messaging: {
        botId: "28:d35570cc-7cc3-4fe3-9cb9-9db7a42eb17e",
        serverUrl : "https://apis.skype.com",
        requestTimeout : 15000,
        appId: process.env.APP_ID,
        appSecret: process.env.APP_SECRET
    }
});

// Create bot and add dialogs
console.log("Creating SkypeBot ...");
botService.on('contactAdded', (bot, data) => {
    console.log("Helloooooo");
    bot.reply('Hello', true);
});
botService.on('personalMessage', (bot, data) => {
    console.log("Helloooooo");
    bot.reply('Helloooooo', true);
});


// Setup Restify Server
console.log("Creating restify server ...");
const server = restify.createServer();
//server.use(skype.ensureHttps(true));
server.use(function(req, resp, next){
    console.log(jsonify(req));
    console.log(jsonify(resp));
    next();
});
server.post('/api/messages', skype.messagingHandler(botService));

// Serve a static web page
//console.log("Configuring the restify server to serve the bot home page ...");
//server.get(/.*/, restify.serveStatic({
//	'directory': '.',
//	'default': 'index.html'
//}));


server.listen(process.env.PORT || 8080, function () {
   console.log('%s listening to %s', server.name, server.url); 
   
   console.log(jsonify(server));
});

