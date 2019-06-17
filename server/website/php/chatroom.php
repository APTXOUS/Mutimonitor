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
     else   if($_POST['command']=='getservicelist')
     {
        $mysqli=getConnect();
       
        $loginSQL = "select * from service";
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
     else   if($_POST['command']=='getserviceinfo')
     {
        $mysqli=getConnect();
        $name=$_POST['service'];
        $loginSQL = "select * from service where servicename='$name'";
        $result = $mysqli->query($loginSQL);

        $arr = array();
        while($row=$result->fetch_assoc())
        {
            array_push($arr,$row);
        }

        $server = array();
        $loginSQL = "select * from server where server.id in (select server_id from server_service,service where servicename='$name' and service_id=service.id) ";
        $result = $mysqli->query($loginSQL);
        while($row=$result->fetch_assoc())
        {
            array_push($server,$row);
        }

        $json = [
        'message' => $arr,
        'list'=> $server
        ];

        echo json_encode($json);
      
        $mysqli->close();
     }
     


  
?>
