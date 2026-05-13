<?php 
    require_once __DIR__ . "/config.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $task = $_POST["task"] ?? '<desconhecido>';
        $categoria = $_POST["categoria"] ?? '<Não Informada>';

        $sql = $connection->prepare("INSERT INTO task(task, urgency_level) values (?, ?)");
        $sql->bind_param("ss", $task, $categoria);

        if ($sql->execute()){
            echo "Inserido com sucesso;";
        } else {
            $sql->error;
        }

        
    }
    $sql->close();
?>