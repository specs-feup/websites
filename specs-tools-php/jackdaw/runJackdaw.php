<?php

function magic_gearman($json) {

    # Create our client object.
    $gmclient = new GearmanClient();

    # Add default server (localhost).
    $gmclient->addServer("localhost", 4732);

    $jsonOutput = $gmclient->doNormal("Jackdaw", $json);

    return $jsonOutput;
}

$json = $_POST["args"];


// MAGIC CALL TO GEARMAN
$result = magic_gearman($json);
// MAGIC CALL TO GEARMAN

echo $result;
?>
