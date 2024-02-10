<?php
    include ("./index.php");
    header("Content-Type:Application/json");
    $movieName=isset($_GET['title'])? $_GET['title']: "a";
    $apiUrl="https://www.omdbapi.com/?t={$movieName}&apikey=bd7a4864";


    $api_data=file_get_contents($apiUrl);//fetch
    $apiData=json_decode($api_data,true);//.json
    if($apiData["Response"]=="False"){
        $info= array("success"=>false);
    }
    else{
        $title=$apiData["Title"];
        $year=$apiData["Year"];
        $poster=$apiData["Poster"];

        $sql="INSERT INTO movie(title,year,poster) VALUES ('$title','$year','$poster')";
        $conn->query($sql);
        $info= array("success"=>true);
    }
    $json_data=json_encode($info);
    echo $json_data;


    
    // foreach($apiData["Search"] as $value){
    //     echo $value["Title"]."<br/>";
    //     $title=$value["Title"];
    //     $year=$value["Year"];
    //     $poster=$value["Poster"];
        
    //     $sql="INSERT INTO movie(title,year,poster) VALUES ('$title','$year','$poster')";
    //     if($conn->query($sql)){
    //         echo "success";
    //     }
    //     else{
    //         echo "failed";
    //     };
    // }

?>