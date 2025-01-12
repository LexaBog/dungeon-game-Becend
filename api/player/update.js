// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../firebase.js";

// export default async function handler(req, res) {
//   if (req.method === "PUT") {
//     try {
//       const { userId, ...updateData } = req.body;

//       if (!userId) {
//         return res.status(400).json({ error: "userId is required" });
//       }

//       const playerRef = doc(db, "players", userId);
//       await setDoc(playerRef, updateData, { merge: true });

//       res.status(200).json({ message: "Player updated successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }

import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { userId, name, xp, gold, power, level, armor, damage } = req.body;

      if (!userId || !name) {
        return res.status(400).json({ error: "userId and name are required" });
      }

      const playerRef = doc(db, "players", userId);
      await setDoc(
        playerRef,
        { userId, name, xp, gold, power, level, armor, damage },
        { merge: true }
      );

      return res.status(200).json({ message: "Player updated successfully" });
    } catch (error) {
      console.error("Error updating player:", error);
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
