

// Инициализация Firebase Admin SDK
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)), // Убедитесь, что этот файл настроен
//   });
// }

// export const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken; // Добавить данные пользователя в запрос
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// import admin from "firebase-admin";


import admin from "firebase-admin";
import * as dotenv from "dotenv";

// Загружаем переменные окружения
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dungeons-end-heroes.firebaseio.com", // Убедитесь, что этот URL правильный
});

const db = admin.firestore();

export default db;
