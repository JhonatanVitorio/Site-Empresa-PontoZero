require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 1) Servir arquivos estáticos (CSS, JS, imagens e também seus HTML)
app.use(express.static(path.join(__dirname, 'public')));

// 2) Rotas de API
app.use('/api', apiRoutes);

// 3) Qualquer rota não reconhecida, devolve o index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
