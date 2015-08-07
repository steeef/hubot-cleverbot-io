// Description:
//   Integrates cleverbot.io with hubot
//
// Dependencies:
//   cleverbot.io
//
// Configuration:
//   Set up your API keys at https://cleverbot.io/keys
//   HUBOT_CLEVERBOT_IO_API_USER
//   HUBOT_CLEVERBOT_IO_API_KEY
//   HUBOT_CLEVERBOT_IO_NICK: Optional: Nickname
//
// Commands:
//   hubot chat <dialog>  - returns cleverbot's response to your dialog
//
// Authors:
//   Gary DuVall - https://github.com/duvallg
//   Stephen Price - https://github.com/steeef

(function() {
    var api_user = process.env.HUBOT_CLEVERBOT_IO_API_USER,
    api_key = process.env.HUBOT_CLEVERBOT_IO_API_KEY,
    cleverbot = require("cleverbot.io");
    bot = new cleverbot(api_user, api_key);
    module.exports = function(robot) {
        var findSelf = new RegExp('^[@]?(' + robot.name + ')' + (robot.alias ? '|(' + robot.alias + ')' : '') + '[:,]?\\s', 'i');
        robot.hear(/.*/i, function(msg) {
            if (findSelf.test(msg.message.text)) {
                bot.setNick(process.env.HUBOT_CLEVERBOT_IO_NICK || "generic_nick");
                bot.create(function(err, session) {
                    bot.ask(msg.message.text, function(err, response) {
                        if (err) console.log(err);
                        else msg.send(response);
                    });
                });
            }
        });
    };
}).call(this);
