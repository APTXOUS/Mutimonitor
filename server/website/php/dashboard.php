<?php
    session_start();
    header('Content-Type:text/html;');
    include_once("database.php");
    include_once("udp.php");
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
    else if($_POST['command']=='getcpuinfo')
    {
        $re1=udpsend('cat /proc/stat |head -n 1 | tail -n +1',$_POST['server']);
        $arr1=explode(" ",$re1);
        sleep(1);
        $re2=udpsend('cat /proc/stat |head -n 1 | tail -n +1',$_POST['server']);
        $arr2=explode(" ",$re2);

        $sum1=+$arr1[2]+$arr1[3]+$arr1[4]+$arr1[5]+$arr1[6]+$arr1[7]+$arr1[8];

        $sum2=+$arr2[2]+$arr2[3]+$arr2[4]+$arr2[5]+$arr2[6]+$arr2[7]+$arr2[8];

        $percent=100*($sum2-$sum1-$arr2[5]+$arr1[5])/($sum2-$sum1);
        $json = [
            'percent' => $percent
            ];
        echo json_encode($json);
    }
    else if($_POST['command']=='getmeminfo')
    {
        $re=udpsend('cat /proc/meminfo |head -n 3 | tail -n +1',$_POST['server']);
        $re=str_replace(" ","",$re);
        $re=str_replace("kB","",$re);
        $arr1=explode("\n",$re);
        $arr1[0]= array_diff(explode(":",$arr1[0]),[""]);
        $arr1[1]= array_diff(explode(":",$arr1[1]),[""]);
        $arr1[2]= array_diff(explode(":",$arr1[2]),[""]);
        $percent=100-100*((+$arr1[1][1]+$arr1[2][1])/$arr1[0][1]);
        $json = [
            'percent' => $percent
            ];
        echo json_encode($json);
    }
    else if($_POST['command']=='getprocessinfo')
    {
        $re=udpsend('ps -u root --sort=-%cpu|head -n 20',$_POST['server']);
        // $re=str_replace(" ","",$re);
        // $re=str_replace("kB","",$re);
        $arr1=explode("\n",$re);
        $len=count($arr1);
        $result=array();
        for ($i=1; $i<=$len; $i++)
        {
            $arr1[$i]= array_diff(explode(" ",$arr1[$i]),[""]);
            array_push($result,array_values($arr1[$i]));
        }

        $json = [
            'list' => $result
            ];
        echo json_encode($json);
    }
    else if($_POST['command']=='getserverlist')
    {
        $mysqli=getConnect();
        $loginSQL = "select * from server";
        $result = $mysqli->query($loginSQL);
        $arr=array();
        while($row=$result->fetch_assoc())
        {
            array_push($arr,$row);
        }

        $json = [
            'list' => $arr
            ];
        echo json_encode($json);
        $mysqli->close();
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

?>
