
// import express from "express";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../firebase"; // Убедитесь, что путь правильный
// // import { authenticateToken } from "../../middleware/authenticate";

// const app = express();

// app.get("/api/player/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const playerRef = doc(db, "players", userId);
//     const playerSnapshot = await getDoc(playerRef);

//     if (!playerSnapshot.exists()) {
//       return res.status(404).json({ error: "Player not found" });
//     }

//     res.status(200).json(playerSnapshot.data());
//   } catch (error) {
//     console.error("Error fetching player data:", error);
//     res.status(500).json({ error: "Internal server error", details: error.message });
//   }
// });

// export default app;

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

app.get("/api/player/:userId", async (req, res) => {
  console.log("GET request received for userId:", req.params.userId);
  try {
    const { userId } = req.params;
    const playerRef = doc(db, "players", userId);
    const playerSnapshot = await getDoc(playerRef);

    if (!playerSnapshot.exists()) {
      console.log("Player not found:", userId);
      return res.status(404).json({ error: "Player not found" });
    }

    console.log("Player data retrieved:", playerSnapshot.data());
    res.status(200).json(playerSnapshot.data());
  } catch (error) {
    console.error("Error fetching player data:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

