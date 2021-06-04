<?php
    include_once './Connection.php';
    $obj = new Connection();
    $connection = $obj->connect();

    // Necesario para recibir parametros con Axios
    $_POST = json_decode(file_get_contents(""), true);

    // Recepcion de los datos enviados mediante POST desde main.js
    $option = (isset($_POST['option'])) ? $_POST['option'] : '';

    $id = (isset($_POST['id'])) ? $_POST['id'] : '';
    $brand = (isset($_POST['brand'])) ? $_POST['brand'] : '';
    $model = (isset($_POST['model'])) ? $_POST['model'] : '';
    $stock = (isset($_POST['stock'])) ? $_POST['stock'] : '';

    switch ($option) {
        case 1: // Create
            $query = "INSERT INTO phone(brand, model, stock) VALUES('$brand', '$model', '$stock')";
            $response = $connection->prepare($query);
            $response->execute();
            break;
        case 2: // Update
            $query = "UPDATE phone SET brand='$brand', model='$model', stock='$stock' WHERE id='$id'";
            $response = $connection->prepare($query);
            $response->execute();
            $data = $response->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 3: // Delete
            $query = "DELETE FROM phone WHERE id='$id'";
            $response = $connection->prepare($query);
            $response->execute();
            break;
        case 4: // Read
            $query = "SELECT id, brand, model, stock FROM phone";
            $response = $connection->prepare($query);
            $response->execute();
            $data = $response->fetchAll(PDO::FETCH_ASSOC);
            break;
    }

    // Envira el array final en formato json a JS
    print json_decode($data, JSON_UNESCAPED_UNICODE);
    $connection = NULL;