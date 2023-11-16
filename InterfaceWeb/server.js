const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'sd23',
  port: 3333
});

// Teste da conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro de conexão:', err);
  } else {
    console.log('Conexão bem-sucedida ao MySQL!');
  }
});

// Configuração para lidar com dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a página HTML com o formulário
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para lidar com o envio do formulário
app.post('/', (req, res) => {
  const dados = {
    nome: req.body.nome,
    idade: req.body.idade
  };

  connection.query('INSERT INTO tabelaEvento SET ?', dados, (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.send('Erro ao inserir dados');
    } else {
      console.log('Dados inseridos com sucesso. ID:', results.insertId);
      res.send('Dados inseridos com sucesso. ID:' + results.insertId);
    }
  });
});

// Iniciar o servidor na porta 3000
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
