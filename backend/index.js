
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

if (!token || !webAppUrl) {
  console.error('ERROR: BOT_TOKEN or WEB_APP_URL missing in .env file');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Основное меню при запуске /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'Предприниматель';

  bot.sendMessage(chatId, `Привет, ${firstName}! 🚀\n\nДобро пожаловать в EGPower — симулятор бизнеса нового поколения. Кликай, инвестируй в активы и готовься к листингу!\n\nЖми кнопку ниже, чтобы начать игру.`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Играть в EGPower 🎮', web_app: { url: webAppUrl } }],
        [{ text: 'Подписаться на канал 📢', url: 'https://t.me/your_channel' }]
      ]
    }
  });
});

// Ответ на любые текстовые сообщения
bot.on('message', (msg) => {
  if (msg.text !== '/start') {
    bot.sendMessage(msg.chat.id, 'Используй кнопку "Играть", чтобы запустить приложение!');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Бэкенд запущен на порту ${PORT}`);
  console.log(`🔗 Ссылка на Mini App: ${webAppUrl}`);
});
