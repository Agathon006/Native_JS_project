<?php
$_POST = json_decode(file_get_contents("php://input"), true); // нужна чтобы работать с JSON
echo var_dump($_POST);