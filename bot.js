const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Токен Telegram-бота
const botToken = "YOUR_TELEGRAM_BOT_TOKEN"; // Замените на ваш токен
const bot = new TelegramBot(botToken, { polling: true });

// URL вашего сервера
const serverUrl = "https://dungeon-game-becend.vercel.app/api/player";

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username || "Unknown Player";

  try {
    // Отправляем запрос на сервер для создания или обновления игрока
    const response = await axios.post(serverUrl, { name: username });

    // Уведомляем пользователя об успешной регистрации
    bot.sendMessage(
      chatId,
      `Добро пожаловать в игру, ${username}! Ваш прогресс сохранён.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Играть",
                url: "https://dungeon-crawler-game.vercel.app", // Ссылка на игру
              },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error("Error creating player:", error);
    bot.sendMessage(chatId, "Произошла ошибка при регистрации. Попробуйте позже.");
  }
});
