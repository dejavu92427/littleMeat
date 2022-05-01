const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5324015603:AAHgRlON-OHE-oP3gV677ZEafrAbd7c-Ehc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
console.log('bot server started...'); //TelegramBot底層有個https.createServer而非express

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Commands
bot.onText(/\hi/, (msg) => {
  if (!msg.from.username) {
    bot.sendMessage(msg.chat.id, "there isn't an username");
    return;
  }
  bot.sendMessage(msg.chat.id, `hi ${msg.from.username}`);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
