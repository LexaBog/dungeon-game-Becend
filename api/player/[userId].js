
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

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query; // Получаем userId из параметров запроса
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const playerRef = doc(db, "players", userId); // Ссылка на документ в Firebase
      const playerSnapshot = await getDoc(playerRef);

      if (!playerSnapshot.exists()) {
        return res.status(404).json({ error: "Player not found" });
      }

      return res.status(200).json(playerSnapshot.data());
    } catch (error) {
      console.error("Error fetching player data:", error);
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
