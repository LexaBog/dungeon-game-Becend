// import express from "express";
// import { doc, setDoc } from "firebase/firestore";
// import  {db}  from "./firebase"; // Убедитесь, что путь к Firebase правильный
// import { v4 as uuidv4 } from "uuid";

// const app = express();
// app.use(express.json()); // Для обработки JSON-запросов

// app.post("/api/player", async (req, res) => {
//   try {
//     const { name } = req.body || "Unknown";
//     const userId = uuidv4();

//     const playerData = {
//       userId,
//       name,
//       xp: 0,
//       gold: 100,
//       power: 10,
//       level: 1,
//       armor: 2,
//       damage: 1,
//     };

//     const playerRef = doc(db, "players", userId);
//     await setDoc(playerRef, playerData);

//     res.status(201).json({ message: "Player created", playerData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

// app.put("/api/player", async (req, res) => {
//     try {
//       const { userId, name, xp, gold, power, level, armor, damage } = req.body;
  
//       // Проверка наличия userId и name в запросе
//       if (!userId || !name) {
//         return res.status(400).json({ error: "userId и name обязательны" });
//       }
  
//       // Ссылка на документ игрока в Firestore
//       const playerRef = doc(db, "players", userId);
  
//       // Обновление данных игрока
//       await setDoc(
//         playerRef,
//         { userId, name, xp, gold, power, level, armor, damage },
//         { merge: true } // Объединяет новые данные с существующими
//       );
  
//       // Ответ клиенту
//       res.status(200).json({ message: "Player updated successfully" });
//     } catch (error) {
//       console.error("Error updating player:", error);
//       res.status(500).json({ error: "Internal server error", details: error.message });
//     }
//   });
  







// // Запуск сервера
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name } = req.body || "Unknown";
      const userId = uuidv4();

      const playerData = {
        userId,
        name,
        xp: 0,
        gold: 100,
        power: 10,
        level: 1,
        armor: 2,
        damage: 1,
      };

      const playerRef = doc(db, "players", userId);
      await setDoc(playerRef, playerData);

      res.status(201).json({ message: "Player created", playerData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
