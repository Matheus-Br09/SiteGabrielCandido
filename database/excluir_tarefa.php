<?php 
    require_once __DIR__ . "/config.php";
    
    $id = $_POST["id"] ?? null;

    if ($id){
        $sql = $connection->prepare("DELETE FROM task WHERE id_task = ?");
    }

    $sql->bind_param("i", $id);

    if ($sql->execute()){
        echo "excluido";
    } else {
        echo $sql->error;
    }
    
?>