import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx6G-rteUAZk4ahEy08RKYv_MWpu4sz_A",
  authDomain: "dungeons-end-heroes.firebaseapp.com",
  projectId: "dungeons-end-heroes",
  storageBucket: "dungeons-end-heroes.firebasestorage.app",
  messagingSenderId: "109144668510",
  appId: "1:109144668510:web:1650a764cd84def26177cf",
  measurementId: "G-EPLEPNK74N",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
app.use(cors());
app.use(express.json());

// POST: Create a new player
app.post("/api/player", async (req, res) => {
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
    console.error("Error creating player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT: Update player data
app.put("/api/player", async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const playerRef = doc(db, "players", userId);
    await setDoc(playerRef, updateData, { merge: true });

    res.status(200).json({ message: "Player updated successfully" });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Get player data
app.get("/api/player/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const playerRef = doc(db, "players", userId);
    const playerSnapshot = await getDoc(playerRef);

    if (!playerSnapshot.exists()) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.status(200).json(playerSnapshot.data());
  } catch (error) {
    console.error("Error fetching player data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Test route
app.get("/test", (req, res) => {
  res.send("Server is running!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
