
<?php
    session_start();
    header('Content-Type:text/html;');
    include_once("database.php");
    // $userName = $_POST['userName'];
    // $password = $_POST['password'];
    $username = addslashes($_SESSION["uid"]);
//$password = addslashes($_POST['password']);

    $mysqli=getConnect();
    $loginSQL = "select * from user where email= '$username'";
    $result = $mysqli->query($loginSQL);
    $row=$result->fetch_assoc();

    echo json_encode($row);
    
    $mysqli->close();
?>
