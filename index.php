<?php
    $serverName="localhost";
    $username="root";
    $password="";
    $dbName="week9";

    $conn=mysqli_connect($serverName,$username,$password,$dbName);

    if (!$conn){
        die("connection failed:".mysqli_connect_error());
    }
?>