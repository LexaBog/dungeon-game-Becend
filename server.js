import express from "express";

const app = express();

// Middleware для обработки JSON-запросов
app.use(express.json());

// Пример GET-запроса
app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

// Пример POST-запроса
app.post("/api/player", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  res.status(201).json({ message: `Player ${name} created` });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
