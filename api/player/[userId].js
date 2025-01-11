const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");

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
