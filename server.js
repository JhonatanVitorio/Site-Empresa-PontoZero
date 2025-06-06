require('dotenv').config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', apiRoutes);

// Serve views HTML
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'contact.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'services.html'));
});

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404
app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
