<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
        require_once 'utils.php';

        function magic_gearman($json) {

		
            # Create our client object.
            $gmclient = new GearmanClient();

            # Add default server (localhost).
            $gmclient->addServer("localhost", 4732);

            $jsonOutput = $gmclient->doNormal("matlab_to_xml", $json);


            return $jsonOutput;
			
        }

        //echo $result;
        //echo gearman_version();

        $default_value = 'ERROR';
        $inputJson = post_url_option('input', $default_value);
		
        if ($inputJson == $default_value) {
            echo 'Could not get input';
        } else {

            // MAGIC CALL TO GEARMAN
            $result = magic_gearman($inputJson);
            //echo $json;
            echo $result . "\n";
        }
        ?>
    </body>
</html>
