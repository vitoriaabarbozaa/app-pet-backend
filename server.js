const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API do Diário Pet funcionando.' });
});

app.use('/api/entries', require('./routes/diaryRoutes'));
app.use('/api/books', bookRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pet_diary')
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Servidor rodando');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar no MongoDB:', error);
  });