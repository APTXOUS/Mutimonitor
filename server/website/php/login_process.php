<?php
    session_start();
    header('Content-Type:text/html;');
    include_once("database.php");
    // $userName = $_POST['userName'];
    // $password = $_POST['password'];
    $username = addslashes($_POST['username']);
    $password = addslashes($_POST['password']);

    $mysqli=getConnect();
    $loginSQL = "select count(*) from user where email= '$username' AND password = md5('$password')";
    $result = $mysqli->query($loginSQL);
    $row=$result->fetch_assoc();
    if($row["count(*)"]==1)
    {
        $_SESSION["uid"] = $username;
        echo "success";
    }
    else
    {
        echo "error".$_SESSION["uid"];
    }
    $mysqli->close();
?>
