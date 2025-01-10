const TelegramBot = require('node-telegram-bot-api');

// Токен Telegram-бота
const bot = new TelegramBot('7319438464:AAFL8mYzpsy_8qb8UKmx4kKOw3Ha3gVZdyQ', { polling: true });

// Ваш URL с игрой (замените на ваш)
const gameUrl = 'https://dungeon-crawler-game.vercel.app/';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || "Unknown Player";
  
  // Отправка кнопки с ссылкой на игру
  bot.sendMessage(chatId, 'Добро пожаловать в игру Dungeons and Heroes! Нажмите на ссылку ниже, чтобы начать игру.',
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Начать игру',
              url: gameUrl
            },
            {
              text: "Играть",
              url: `https://dungeon-crawler-game.vercel.app/${username}`, // Добавляем имя в URL
            },
          ]
        ]
      }
    });
    // bot.sendMessage(chatId, "Добро пожаловать в игру!", {
    //   reply_markup: {
    //     inline_keyboard: [
    //       [
    //         {
    //           text: "Играть",
    //           url: `https://your-game-url?username=${username}`, // Добавляем имя в URL
    //         },
    //       ],
    //     ],
    //   },
    // });
});
