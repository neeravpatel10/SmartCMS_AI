<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$link = mysqli_connect('localhost', 'devuser_erpalvasdev', 'Hype#123', 'erpalvasdev');

if (!$link) {
    echo json_encode([
        'error' => 'Connection failed',
        'details' => mysqli_connect_error()
    ]);
    exit;
}

$result = mysqli_query($link, "SELECT * FROM faculty_details");

if (!$result) {
    echo json_encode([
        'error' => 'Query failed',
        'details' => mysqli_error($link)
    ]);
    exit;
}

$data = array();
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

mysqli_close($link);
echo json_encode($data);
?> 