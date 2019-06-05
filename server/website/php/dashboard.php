<?php
    session_start();
    header('Content-Type:text/html;');
    include_once("database.php");
    // $userName = $_POST['userName'];
    // $password = $_POST['password'];
    $username = addslashes($_SESSION["uid"]);
//$password = addslashes($_POST['password']);



    if($_POST['command']=='cpu')
    {
        $re=functionName("vmstat 1 2");
        $row=$re->fetch_assoc();
        echo json_encode($row);
    }
    else
    {
    $mysqli=getConnect();
    $loginSQL = "select * from user where email= '$username'";
    $result = $mysqli->query($loginSQL);
    $row=$result->fetch_assoc();

    echo json_encode($row);
    //$arr = array('name' => $_SESSION["uid"]);
    //echo json_encode($arr);
    
    $mysqli->close();
    }


    function functionName($com)
    {

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_PORT, 8000);
        curl_setopt($curl, CURLOPT_URL, '119.28.139.244/running');

        curl_setopt($curl, CURLOPT_HEADER, 1);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        curl_setopt($curl, CURLOPT_POST, 1);

        $post_data = array(
            "username" => "123",
            "password" => "234",
            "command" => $com
        );
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);

        $data = curl_exec($curl);

        curl_close($curl);

        return $data;
    }
?>
