import { db } from "../firebaseAdmin"; // Убедитесь, что путь корректный
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

      const playerRef = db.collection("players").doc(userId);
      await playerRef.set(playerData);

      res.status(201).json({ message: `Player ${name} created`, playerData });
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
