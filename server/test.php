<?php

if ($_SERVER["REQUEST_METHOD"] == "POST")
    $return=functionName($_POST["inst_input"]);

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


<!DOCTYPE HTML>
<html>

<body>

<div name = "input_div" id="input_div" style="position:absolute;left:400px;top:180px">
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>"> 
    指令：<input type="text" name="inst_input"><br>
<input type="submit">
</form>
</div>

<div name = "mydiv" id="mydiv" style="position:absolute;left:10px;top:10px">
<textarea rows="20" cols=50  style="background-color:#000000;font-size:13px;color:white;">
<?php
// define variables and set to empty values
echo $return;
?>
</textarea>
 </div>


</body>

</html>