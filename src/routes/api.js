const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Endpoint para envio de e-mail de contato
router.post('/send-email', async (req, res) => {
  const { name, email, phone, company, message } = req.body;

  // Configuração do transporte de e-mail usando o Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou outro serviço de e-mail de sua preferência
    auth: {
      user: process.env.EMAIL_USER, // e-mail
      pass: process.env.EMAIL_PASS, // senha de aplicativo ou senha do e-mail
    },
  });

  try {
    // Enviar o e-mail
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Remetente
      replyTo: email,
      to: process.env.EMAIL_USER, // Destinatário
      subject: 'Novo contato do site', // Assunto do e-mail
      html: `
        <h3>Nova mensagem de contato:</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Mensagem:</strong> ${message}</p>
      `, // Corpo do e-mail
    });

    // Resposta de sucesso
    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (err) {
    console.error(err);
    // Resposta de erro
    res.status(500).json({ message: 'Erro ao enviar e-mail' });
  }
});

module.exports = router;