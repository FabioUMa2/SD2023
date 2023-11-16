<?php
$servername = "sd23";
$username = "root";
$password = "root";
$dbname = "tabelaEvento";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $idade = $_POST["idade"];

    $sql = "INSERT INTO tabelaEvento (nome, idade) VALUES ('$nome', '$idade')";

    if ($conn->query($sql) === TRUE) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro ao inserir dados: " . $conn->error;
    }
}

$conn->close();
?>
