import express from "express";

import { db } from "./firebaseAdmin"; // Путь к вашему файлу с настройками Firebase

const app = express();
app.use(express.json());

app.post("/api/player", async (req, res) => {
  try {
    const { userId, name } = req.body;

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

    await db.collection("players").doc(userId).set(playerData);
    res.status(201).json({ message: "Player created", playerData });
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
