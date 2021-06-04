<?php
    class Connection {
        public static function connect() {
            define('host', 'localhost');
            define('dbname', 'crudphone-phpvue');
            define('user', 'root');
            define('pass', 'admin');

            $option = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');

            try {
                $connection = new PDO("mysql:host=" . host . "dbname=" . dbname, user, pass, $option);
                return $connection;
            } catch (Exception $error) {
                die("El error de conexion es: " . $error->getMessage());
            }
        }
    }