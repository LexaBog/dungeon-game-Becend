import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Подключаем Firestore

// Добавление документа в Firestore
// async function addPlayerData() {
//   try {
//     const docRef = await addDoc(collection(db, "players"), {
//       name: "Player1",
//       score: 1000,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

// Получение данных из Firestore
// async function getPlayersData() {
//   const querySnapshot = await getDocs(collection(db, "players"));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }

router.get('/player/:userId', async (req, res) => {
  const { userId } = req.params;
  const playerRef = doc(db, 'players', userId);
  const playerSnapshot = await getDoc(playerRef);
  if (!playerSnapshot.exists()) {
    return res.status(404).send('Player not found');
  }
  res.json(playerSnapshot.data());
});