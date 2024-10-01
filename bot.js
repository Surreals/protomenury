const TelegramBot = require('node-telegram-bot-api');

// Токен вашого бота
const token = '7577999169:AAE9jguXidUoVwGCuoloAR-t_zXQNSSjiSM';

const bot = new TelegramBot(token, { polling: true });

// Обробник команди /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Надсилаємо повідомлення з Web App кнопкою
  bot.sendMessage(chatId, 'Відкрийте меню нашого ресторану:', {
    reply_markup: {
      keyboard: [
        [{
          text: 'Відкрити меню',
          web_app: {
            url: 'https://my.carbook.pro/' // Замініть на URL вашого веб-застосунку
          }
        }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

// Обробник даних з Web App
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);

  if (data.length === 0) {
    bot.sendMessage(chatId, 'Ваше замовлення порожнє.');
    return;
  }

  let orderText = 'Ваше замовлення:\n\n';
  let total = 0;
  data.forEach((item, index) => {
    orderText += `${index + 1}. ${item.name} - ${item.price} грн\n`;
    total += item.price;
  });
  orderText += `\nЗагальна сума: ${total} грн`;

  bot.sendMessage(chatId, orderText);
});
