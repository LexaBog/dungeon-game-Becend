import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { userId, ...updateData } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const playerRef = doc(db, "players", userId);
      await setDoc(playerRef, updateData, { merge: true });

      res.status(200).json({ message: "Player updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
