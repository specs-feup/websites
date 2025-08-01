<?php

  //require_once(__DIR__.'/../gearman.php'); 
  //require_once('requests/gearman.php'); 


  function magic_gearman($json){
    
	# Create our client object.
	$gmclient= new GearmanClient();

	# Add default server (localhost).
	$gmclient->addServer("localhost", 4732);

	$jsonOutput = $gmclient->doNormal("MWeaver", $json);
    error_log("Error log:" . $jsonOutput);
    return $jsonOutput;
  }
      error_log("Error log TEST");

  // $json = stripslashes($_POST["args"]);
  $json = $_POST["args"];
  //$args = json_decode($json,true);

  // MAGIC CALL TO GEARMAN
  //$result = magic_gearman("MWeaver", $json);
  $result = magic_gearman($json);

  
  echo $result;
?>
