const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDoc } = require("firebase/firestore");
const { v4: uuidv4 } = require("uuid");

// Настройки Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCx6G-rteUAZk4ahEy08RKYv_MWpu4sz_A",
  authDomain: "dungeons-end-heroes.firebaseapp.com",
  projectId: "dungeons-end-heroes",
  storageBucket: "dungeons-end-heroes.firebasestorage.app",
  messagingSenderId: "109144668510",
  appId: "1:109144668510:web:1650a764cd84def26177cf",
  measurementId: "G-EPLEPNK74N",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name } = req.body;
      const userId = req.body.userId || uuidv4();

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
      await setDoc(playerRef, playerData, { merge: true });

      return res.status(201).json(playerData);
    } catch (error) {
      console.error("Error creating player:", error);
      return res.status(500).json({ error: "Internal server error", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
