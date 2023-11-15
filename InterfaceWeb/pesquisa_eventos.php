<!DOCTYPE html>
<html>
<head>
    <title>Pesquisar Eventos</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Pesquisar Eventos</h2>
        <form method="POST">
            <div class="form-group">
                <input type="text" name="search" class="form-control" placeholder="Pesquisar por tipo de evento">
            </div>
            <button type="submit" class="btn btn-primary">Pesquisar</button>
        </form>

        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $search = $_POST["search"];
            // Conexão a base de dados e consulta dos dados
            $conn = new mysqli("localhost", "seu_usuario", "sua_senha", "seu_banco_de_dados");

            $sql = "SELECT * FROM eventos WHERE tipo LIKE '%$search%'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo '<table class="table">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data</th>
                        <th>Localidade</th>
                        <th>Tipo</th>
                    </tr>';

                while ($row = $result->fetch_assoc()) {
                    echo '<tr>
                        <td>' . $row["id"] . '</td>
                        <td>' . $row["nome"] . '</td>
                        <td>' . $row["data"] . '</td>
                        <td>' . $row["localidade"] . '</td>
                        <td>' . $row["tipo"] . '</td>
                    </tr>';
                }

                echo '</table>';
            } else {
                echo "Nenhum resultado encontrado.";
            }

            $conn->close();
        }
        ?>
    </div>
</body>
</html>
