import express from "express";

import { db } from "./firebaseAdmin"; // Путь к вашему файлу с настройками Firebase

const app = express();
app.use(express.json());

console.log("API function called:", req.method, req.url);


app.post("/api/player", async (req, res) => {
  console.log("POST request received with data:", req.body);
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

    console.log("Player added to Firestore:", playerData);
    res.status(201).json({ message: `Player ${name} created` });
  } catch (error) {
    console.error("Error adding player to Firestore:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});



