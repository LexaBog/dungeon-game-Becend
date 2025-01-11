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
const { db } = require("../../../backend/firebase");
const { doc, getDoc } = require("firebase/firestore");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      const playerRef = doc(db, "players", userId);
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
    res.status(405).json({ error: "Method not allowed" });
  }
};
