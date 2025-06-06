require('dotenv').config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON e urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas de API
app.use('/api', apiRoutes);

// Rotas das views HTML
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'contact.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'services.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
