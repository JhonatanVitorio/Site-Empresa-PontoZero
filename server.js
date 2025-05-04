require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./src/routes/api'); // Importando o arquivo api.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para análise do corpo da requisição
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos
app.use(express.static('public'));

// Usar as rotas da API
app.use('/api', apiRoutes); // Prefixo '/api' para as rotas de API

// Rota para páginas estáticas
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'src/views', 'index.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'src/views', 'services.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'src/views', 'contact.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'src/views', 'about.html')));

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});