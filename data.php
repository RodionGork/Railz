<?php

$result = json_decode(file_get_contents('data.json'));

$delta = time() % count($result->values);
while ($delta-- > 0) {
    $row = array_shift($result->values);
    $result->values[] = $row;
    $row = array_shift($result->heights);
    $result->heights[] = $row;
}
echo json_encode($result);
