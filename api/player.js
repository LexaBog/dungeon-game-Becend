// const { db } = require("../../backend/firebase");
// const { doc, setDoc } = require("firebase/firestore");
// const { v4: uuidv4 } = require("uuid");

// module.exports = async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       const { name } = req.body || { name: "Unknown" };
//       const userId = uuidv4();

//       const playerData = {
//         userId,
//         name,
//         xp: 0,
//         gold: 100,
//         power: 10,
//         level: 1,
//         armor: 2,
//         damage: 1,
//       };

//       const playerRef = doc(db, "players", userId);
//       await setDoc(playerRef, playerData);

//       return res.status(201).json({ message: "Player created", playerData });
//     } catch (error) {
//       console.error("Error creating player:", error);
//       return res.status(500).json({ error: "Internal server error", details: error.message });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// };
const { db } = require("./firebase");
const { doc, setDoc } = require("firebase/firestore");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name } = req.body || { name: "Unknown" };
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

      return res.status(201).json({ message: "Player created", playerData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};
