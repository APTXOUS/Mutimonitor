<?php

function udpsend($com,$ip)
{

    $curl = curl_init();

    curl_setopt($curl, CURLOPT_PORT, 8000);
    curl_setopt($curl, CURLOPT_URL,$ip);

    curl_setopt($curl, CURLOPT_HEADER, 0);

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