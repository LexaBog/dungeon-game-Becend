const express = require('express');
const Player = require('../models/player');  // Подключаем модель игрока
const router = express.Router();

// API для сохранения данных игрока
router.post('/player', async (req, res) => {
  const { userId, username } = req.body;

  // Проверяем, есть ли уже такой игрок в базе данных
  let player = await Player.findOne({ userId });

  if (!player) {
    // Если игрок не найден, создаем нового
    player = new Player({ userId, username });
    await player.save();
    return res.send('New player created');
  }

  // Если игрок найден, обновляем его данные
  player.username = username;
  await player.save();
  res.send('Player data updated');
});

// API для получения данных игрока
router.get('/player/:userId', async (req, res) => {
  const { userId } = req.params;
  const player = await Player.findOne({ userId });

  if (!player) {
    return res.status(404).send('Player not found');
  }

  res.json(player);  // Отправляем данные игрока в формате JSON
});

module.exports = router;
