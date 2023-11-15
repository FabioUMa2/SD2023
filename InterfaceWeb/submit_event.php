<?php
// conexão com a base de dados
$servername = "sd23"; // nome do servidor 
$username = "root";
$password = "root";
$database = "tabelaEvento"; //nome da tabela 
$port = 3333; // porta 

// Conexão com a base de dados
$conn = new mysqli($servername, $username, $password, $database, $port);

// Verificação da conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Insert data into the database
$sql = "INSERT INTO tabelaEvento (nome, data, localidade, tipo) VALUES ('$nome', '$data', '$localidade', '$tipo')";

if ($conn->query($sql) === TRUE) {
    echo "Dados inseridos com sucesso.";
} else {
    echo "Erro ao inserir dados: " . $conn->error;
}

// Fechar a conexão com a base de dados
$conn->close();

?>
