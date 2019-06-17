<?php
    session_start();
    header('Content-Type:text/html;');
    include_once("database.php");
    $username = $_POST['username'];
    // $password = $_POST['password'];
   // $username = addslashes($_SESSION["uid"]);
//$password = addslashes($_POST['password']);


    if($_POST['command']=='getmessage')
     {
        $mysqli=getConnect();

        $loginSQL = "select * from chat";
        $result = $mysqli->query($loginSQL);

        $arr = array();
        while($row=$result->fetch_assoc())
        {
            array_push($arr,$row);
        }

        $json = [
        'message' => $arr
        ];

        echo json_encode($json);
      
        $mysqli->close();
     }
     else   if($_POST['command']=='sendmessage')
     {
        $mysqli=getConnect();
        $data=$_POST['data'];
        $loginSQL = "INSERT INTO chat (username,message,time)   VALUES   ('$username','$data',now())";

        $result = $mysqli->query($loginSQL);

        $loginSQL = "select * from chat";
        $result = $mysqli->query($loginSQL);

        $arr = array();
        while($row=$result->fetch_assoc())
        {
            array_push($arr,$row);
        }

        $json = [
        'message' => $arr
        ];

        echo json_encode($json);
      
        $mysqli->close();
     }


  
?>
