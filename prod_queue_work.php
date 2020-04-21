<?php

    // This script intends to execute queues in production

    $ch = curl_init('https://tipsmyweb.com/api/artisan/queues?options=empty');
    curl_exec($ch);
    curl_close($ch);

?>