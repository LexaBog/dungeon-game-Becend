// const { db } = require("../../../backend/firebase");
// const { doc, getDoc } = require("firebase/firestore");

// module.exports = async (req, res) => {
//   try {
//     const { userId } = req.query;

//     const playerRef = doc(db, "players", userId);
//     const playerSnapshot = await getDoc(playerRef);

//     if (!playerSnapshot.exists()) {
//       return res.status(404).json({ error: "Player not found" });
//     }

//     return res.status(200).json(playerSnapshot.data());
//   } catch (error) {
//     console.error("Error fetching player data:", error);
//     return res.status(500).json({ error: "Internal server error", details: error.message });
//   }
// };
const { db } = from ("../../../firebase");
const { doc, setDoc, getDoc } = from ("firebase/firestore");

module.exports = async (req, res) => {
  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      const playerRef = doc(db, "players", userId);
      const playerSnapshot = await getDoc(playerRef);

      if (!playerSnapshot.exists()) {
        return res.status(404).json({ error: "Player not found" });
      }

      return res.status(200).json(playerSnapshot.data());
    } catch (error) {
      console.error("Error fetching player data:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const { ...updateData } = req.body;

      const playerRef = doc(db, "players", userId);
      await setDoc(playerRef, updateData, { merge: true });

      return res.status(200).json({ message: "Player updated successfully" });
    } catch (error) {
      console.error("Error updating player:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};
