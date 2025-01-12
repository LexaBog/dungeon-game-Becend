import express from "express";
import { doc, getDoc } from "firebase/firestore";
import  db  from "../firebase"; // Проверьте путь до firebase

const app = express();

app.get("/api/player/:userId", async (req, res) => {
    try {
      const { userId } = req.params; // Получаем userId из URL
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
  
    const playerRef = doc(db, "players", userId); // Путь к документу Firestore
    const playerSnapshot = await getDoc(playerRef); // Запрашиваем документ
  
    if (!playerSnapshot.exists()) {
        return res.status(404).json({ error: "Player not found" });
    }
  
      res.status(200).json(playerSnapshot.data()); // Возвращаем данные игрока
    } catch (error) {
      console.error("Error fetching player data:", error);
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
    console.log("Received userId:", req.params.userId);
});
  

const PORT = 5000;

