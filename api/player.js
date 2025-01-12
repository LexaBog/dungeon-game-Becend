import express from "express";

import { db } from "./firebaseAdmin"; // Путь к вашему файлу с настройками Firebase

const app = express();
app.use(express.json());

app.post("/api/player", async (req, res) => {
  try {
    const { name, xp, gold } = req.body;
    const userId = uuidv4();

    const playerData = {
      userId,
      name: name || "Unknown",
      xp: xp || 0,
      gold: gold || 100,
      power: 10,
      level: 1,
      armor: 2,
      damage: 1,
    };

    console.log("Player data to save:", playerData);

    const playerRef = doc(db, "players", userId);
    await setDoc(playerRef, playerData);

    console.log("Player successfully saved in Firestore");

    res.status(201).json({ message: `Player ${name} created` });
  } catch (error) {
    console.error("Error in POST /api/player:", error);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});


