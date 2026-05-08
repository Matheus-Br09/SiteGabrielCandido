<?php 
    $server = "localhost";
    $user = "root";
    $password = "";
    $bd = "todo_tasks";

    $connection = new mysqli($server, $user, $password, $bd);

    if ($connection -> connect_error){
        die("Falha na conexão" . $connection->connect_error);
    }

    $connection -> set_charset("utf8mb4")
    
?>