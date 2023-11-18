const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const base64 = require('base-64');
require('dotenv').config(); // Adiciona suporte para variáveis de ambiente

const app = express();

// Carregar as configurações do arquivo secret.yaml
const config = yaml.load(fs.readFileSync('secret.yaml', 'utf8'));

// Decodificar as informações de configuração da Base64
config.database.host = base64.decode(config.database.host);
config.database.user = base64.decode(config.database.user);
config.database.password = base64.decode(config.database.password);
config.database.database = base64.decode(config.database.database);
config.database.port = base64.decode(config.database.port);

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  port: config.database.port
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

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.'));

// Rota para a página HTML com o formulário
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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

// Rota para a página pesquisarEvento.ejs
app.get('/pesquisarEvento', (req, res) => {
  // Obtenha o nome e a idade da consulta
  const { nome, idade } = req.query;

  // Construa a consulta SQL
  let sqlQuery = 'SELECT nome, idade FROM tabelaEvento';
  if (nome) {
    sqlQuery += ` WHERE nome LIKE ${connection.escape('%' + nome + '%')}`;
  } else if (idade) {
    sqlQuery += ` WHERE idade = ${connection.escape(idade)}`;
  }

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Erro ao pesquisar dados:', err);
      res.send('Erro ao pesquisar dados');
    } else {
      console.log('Dados encontrados com sucesso:', results);
      // Renderizar a página com os dados encontrados
      res.render('pesquisarEvento', { eventos: results });
    }
  });
});

// Iniciar o servidor na porta 3004
const PORT = 3009;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
