<?php

function magic_gearman($json) {

    # Create our client object.
    $gmclient = new GearmanClient();

    # Add default server (localhost).
    $gmclient->addServer("localhost", 4732);
    #$gmclient->addServer("10.227.118.27", 4732);
    # $jsonOutput = $gmclient->do("Clava", $json);
    //error_log(print_r("BEFORE doNormal", TRUE));
    $jsonOutput = $gmclient->doNormal("Clava", $json);
    //    error_log(print_r("JSON: " . $jsonOutput, TRUE));
    //error_log(print_r("AFTER doNormal", TRUE));
    return $jsonOutput;


    return $json;
}

$json = $_POST["args"];


// MAGIC CALL TO GEARMAN
//error_log(print_r("BEFORE GEARMAN", TRUE));
$result = magic_gearman($json);
// MAGIC CALL TO GEARMAN
//error_log(print_r("AFTER GEARMAN", TRUE));

echo $result;
?>
