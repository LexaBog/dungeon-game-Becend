const express = require("express");
const cors = require("cors"); // Для обработки запросов с фронта
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} = require("firebase/firestore");

const app = express();
app.use(express.json()); // Для обработки JSON-запросов
const port = 5000;
const { v4: uuidv4 } = require("uuid");

app.use(cors()); // Разрешить запросы с других доменов
app.use(express.json()); // Для обработки JSON-запросов

// Настройки Firebase из консоли
const firebaseConfig = {
  apiKey: "AIzaSyCx6G-rteUAZk4ahEy08RKYv_MWpu4sz_A",
  authDomain: "dungeons-end-heroes.firebaseapp.com",
  projectId: "dungeons-end-heroes",
  storageBucket: "dungeons-end-heroes.firebasestorage.app",
  messagingSenderId: "109144668510",
  appId: "1:109144668510:web:1650a764cd84def26177cf",
  measurementId: "G-EPLEPNK74N",
};

// Инициализация Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);



/// 1. POST /api/player - создание нового игрока
app.post("/api/player", async (req, res) => {
  try {
    const { name } = req.body; // Имя передаётся в теле запроса
    const userId = req.body.userId || uuidv4(); // Генерируем userId, если он отсутствует

    // const playerRef = doc(db, "players", userId);
    const playerData = {
      userId,
      name,
      xp: 0,
      gold: 100,
      power: 0,
      level: 1,
      armor: 0,
      damage: 1,
    };

    const playerRef = doc(db, "players", userId);
    await setDoc(playerRef, playerData, { merge: true });

    res.status(201).json(playerData); // Возвращаем данные нового игрока
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

/// 2. GET /api/player/:userId - получение данных игрока
app.get("/api/player/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Извлекаем userId из параметров URL
    const playerRef = doc(db, "players", userId);
    const playerSnapshot = await getDoc(playerRef);

    if (!playerSnapshot.exists()) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.status(200).json(playerSnapshot.data()); // Отправляем данные игрока
  } catch (error) {
    console.error("Error fetching player data:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

/// 3. PUT /api/player - обновление данных игрока
app.put("/api/player", async (req, res) => {
  try {
    const { userId, name, xp, gold, power, level, armor, damage } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: "userId и name обязательны" });
    }

    const playerRef = doc(db, "players", userId);
    await setDoc(
      playerRef,
      { userId, name, xp, gold, power, level, armor, damage },
      { merge: true }
    );

    res.status(200).json({ message: "Player updated successfully" });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});


/// 4. Проверочный маршрут
app.get("/test", (req, res) => {
  res.send("Бэкенд работает!");
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
