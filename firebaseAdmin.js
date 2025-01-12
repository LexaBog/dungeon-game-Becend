import admin from "firebase-admin";
import dotenv from "dotenv";

// Загрузка переменных окружения
dotenv.config();

// Парсим JSON из переменной окружения
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Инициализация Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
