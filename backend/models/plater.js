const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Схема для данных игрока
const playerSchema = new Schema({
  userId: { type: String, required: true, unique: true },  // ID игрока (из Telegram)
  username: { type: String, required: true },  // Имя игрока
  progress: { type: Number, default: 0 },  // Прогресс игрока (например, уровень)
  inventory: { type: Array, default: [] },  // Инвентарь игрока
  gold: { type: Number, default: 100 },  // Золото игрока
  power: {type: Number,default: 10},
  damage: {type: Number,default: 0}
});

// Экспортируем модель игрока
const Player = model('Player', playerSchema);
module.exports = Player;
