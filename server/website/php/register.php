<?php
    header('Content-Type:text/html;');
    include_once("database.php");
    if (empty($_POST)) {
        exit("您提交的表单数据超过post_max_size! <br>");
    }
    // 判断输入密码与确认密码是否相同
   

    $username = $_POST['uname'];
    $email=$_POST['umail'];
    $password = $_POST['upwd'];
    $sex=$_POST['usex'];

    $userNameSQL = "select count(*) from user where email = '$email'";
    $mysqli=getConnect();
    $result = $mysqli->query($userNameSQL);
    $row=$result->fetch_assoc();
    if ($row["count(*)"]==1) {
        echo "邮箱已被使用,请使用其他邮箱";
        echo "
            <script>
                    setTimeout(function(){window.location.href='../register.html';},1000);
            </script>
        ";//如果错误使用js 1秒后跳转到登录页面重试;
    }
    $result->close();
    $registerSQL = "insert into user(username,password,email,sex) values('$username',md5('$password'),'$email','$sex')";
    $result = $mysqli->query($registerSQL);


    $registerSQL = "select count(*) from user where email = '$email'";
    $result = $mysqli->query($registerSQL);
    $row=$result->fetch_assoc();  
    if($row["count(*)"]==1)
    {
        echo "注册成功";
        echo "
            <script>
                    setTimeout(function(){window.location.href='../index.html';},1000);
            </script>
        ";
    }
    else
    {
        echo "注册错误";
        echo "
            <script>
                    setTimeout(function(){window.location.href='../register.html';},1000);
            </script>
        ";//如果错误使用js 1秒后跳转到登录页面重试;
    }
    $mysqli->close();
?>