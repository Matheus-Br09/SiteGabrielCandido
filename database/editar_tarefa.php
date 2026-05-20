<?php
include_once __DIR__ . "/config.php";

    if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        $id = $_POST["id_task"];
        $task = trim($_POST["task"]);
        $urgency_level = trim($_POST["urgency_level"]);

        $sql = $connection->prepare("UPDATE task SET task = ?, urgency_level = ? WHERE id_task = ?");
        $sql->bind_param("ssi", $task, $urgency_level, $id);

        if ($sql->execute()) {
            echo "Alterado com sucesso";
        } else {
            $sql->error;
        }

        $sql->close();
    }
    
?>