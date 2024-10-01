const express = require('express');
const app = express();
const path = require('path');

// Порт сервера
const PORT = process.env.PORT || 3000;

// Роздача статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
