import admin from "firebase-admin";

// // Инициализация Firebase Admin SDK
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

import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
