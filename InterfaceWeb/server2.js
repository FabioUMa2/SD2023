const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

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

// Configuração do motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '.'));

// Rota para a página HTML para mostrar os dados
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

// Rota para a página HTML de pesquisa
app.get('/', (req, res) => {
  res.render('pesquisarEvento', { eventos: [] });
});

// Iniciar o servidor na porta 3000
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
