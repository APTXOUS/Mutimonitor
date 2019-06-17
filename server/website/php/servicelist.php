<?php
    session_start();
    header('Content-Type:text/html;');
    include_once("database.php");


    if($_POST['command']=='getservicelist')
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
    else if($_POST['command']=='getservice_server')
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
    


  
?>
