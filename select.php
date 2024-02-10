<?php
    include("./index.php");

    $searchTerm=isset($_GET['title'])?$_GET['title']:"";
    $sql="SELECT * FROM movie WHERE title LIKE '%$searchTerm%'";

    if($data=$conn->query($sql)){
        if($data->num_rows>0){
            $result=array();
            while($row=$data->fetch_assoc()){
                $result[]=$row;
            }
            $conn->close();
            $json_data=json_encode($result);
            header('Content-Type: application/json');
            echo $json_data;
        }
        else{
                echo '[]';
            }
    }


    
?>