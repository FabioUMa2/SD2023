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

$nome = $_POST['nome'];
$data = $_POST['data'];
$localidade = $_POST['localidade'];
$tipo = $_POST['tipo'];

// Adicione estas linhas para imprimir os valores
echo "Nome: " . $nome . "<br>";
echo "Data: " . $data . "<br>";
echo "Localidade: " . $localidade . "<br>";
echo "Tipo: " . $tipo . "<br>";


print("$nome");

// Insert data into the database
$sql = "INSERT INTO tabelaEvento (name, data, localidade, tipo) VALUES ('$nome', '$data', '$localidade', '$tipo')";

if ($conn->query($sql) === TRUE) {
    echo "Dados inseridos com sucesso.";
} else {
    echo "Erro ao inserir dados: " . $conn->error;
}

// Fechar a conexão com a base de dados
$conn->close();

?>
