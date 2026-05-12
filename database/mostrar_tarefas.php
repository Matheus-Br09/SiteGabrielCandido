<?php 
    include_once __DIR__ . "/config.php";

    $sql = "SELECT * FROM task";
    $res = $connection->query($sql);

    $tarefas = [];

    if ($res->num_rows > 0){
        while ($linha = $res->fetch_assoc()){
            $tarefas[] = $linha;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($tarefas);
?>