const express = require("express");
const cors = require("cors"); // Для обработки запросов с фронта
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, doc, setDoc, } = require("firebase/firestore");

const app = express();
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

app.put("/api/player", async (req, res) => {
  try {
    let { userId, name, xp, gold, power, level, armor, damage } = req.body;

    // Генерируем userId, если его нет
    if (!userId || userId === "undefined") {
      userId = uuidv4(); // Генерация уникального идентификатора
    }

    console.log("Generated or received userId:", userId);

    const playerRef = doc(db, "players", userId); // Используем userId как идентификатор документа
    await setDoc(
      playerRef,
      { userId, name, xp, gold, power, level, armor, damage },
      { merge: true }
    );

    res.status(200).json({ message: "Player updated or created", userId });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});



// API: Получить всех игроков
// app.get("/api/players", async (req, res) => {
//   try {
//     const playersSnapshot = await getDocs(collection(db, "players"));
//     const players = playersSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     res.status(200).json(players);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Ошибка при получении игроков", details: error.message });
//   }
// });

// Проверочный маршрут
app.get("/test", (req, res) => {
  res.send("Бэкенд работает!");
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
