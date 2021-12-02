<?php
class CConexion{
    static $host;
    static $dbname;
    static $username;
    static $pwd;

    static function conexionDB(){
        $host = "localhost:8080/";
        $dbname = "myMapDb";
        $username = "JuanJGaldo";
        $pwd = "Tan4go09+1";

        try{
            $conn = new PDO ("pgsql:host = $host; dbname=$dbname; user=$username;password=$pwd");
            //echo "Conectado a la DB";
        }catch(PDOException $exp){
            echo ("No se pudo conectar a la DB,<br>".$exp);
        }
        return $conn;
    }     
}

?>