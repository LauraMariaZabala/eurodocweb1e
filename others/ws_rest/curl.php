<?php

$curl = curl_init();

curl_setopt_array($curl, [
//    CURLOPT_URL => "https://example.com/api/v2/db/_table/contact_info?limit=5",
//    CURLOPT_URL => "https://fakerapi.it/api/v1/users?_quantity=10&_gender=male",
    CURLOPT_URL => "https://fakerapi.it/api/v1/users?_quantity=50",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
]);

curl_setopt($curl, CURLOPT_HTTPHEADER, [
        "cache-control: no-cache",
        "X-DreamFactory-API-Key: YOUR_API_KEY"
]);

$response = curl_exec($curl);
$error = curl_error($curl);

curl_close($curl);

if ($error) {
        echo "cURL error #:" . $error;
} else {
        echo $response;
//		echo json_encode($response);
}

?>