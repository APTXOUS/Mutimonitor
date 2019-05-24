
<?php
    session_start();
    header('Content-Type:text/html; charset=gb2312;');
    include_once("database.php");
    // $userName = $_POST['userName'];
    // $password = $_POST['password'];
    $username = addslashes($_POST['username']);
    $password = addslashes($_POST['password']);

    $mysqli=getConnect();
    $loginSQL = "select count(*) from user where username= '$username' AND password = md5('$password')";
    $result = $mysqli->query($loginSQL);
    $row=$result->fetch_assoc();
    if($row["count(*)"]==1)
    {
        $_SESSION["uid"] = $userName;
        echo "成功";
    }
    else
    {
        echo "用户名或密码错误";
    }
    $mysqli->close();
?>
