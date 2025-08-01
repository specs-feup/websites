<?php

	
	/*
	* FUNCTIONS
	*/
	function get_file_contents($file_name) {
	
		$contents = file_get_contents($file_name);
		
		return $contents;
	}
	
	function replace_template($templateHTML, $main_script, $lara_examples, $c_examples) {
		
		$finalHTML = str_replace("%{MAIN_SCRIPT}%", $main_script, $templateHTML);
		$finalHTML = str_replace("%{LARA_EXAMPLES}%", $lara_examples, $finalHTML);
		$finalHTML = str_replace("%{C_EXAMPLES}%", $c_examples, $finalHTML);
		
		return $finalHTML;
	}	

	function build_lara_examples() {
	
		$final_string = "";
		
		$lara_examples_folder = "../../examples/harmonic/lara/";
		$lara_example_files = scandir($lara_examples_folder);
		
		foreach($lara_example_files as $file) {
			
			if(!is_dir($file)) {
			
				$final_string .= "<option value='" . $file . "'>" . $file . "</option>\n";
			}
		}
		
		return $final_string;
	}
	
	function build_c_examples() {
	
		$final_string = "";
		
		$c_examples_folder = "../../examples/harmonic/c/";
		$c_example_files = scandir($c_examples_folder);
		
		foreach($c_example_files as $file) {
			
			if(!is_dir($file)) {
			
				$final_string .= "<option value='" . $file . "'>" . $file . "</option>\n";
			}
		}
		
		return $final_string;
	}
	
	$templateHTML = get_file_contents("template.html");

	$main_script = "<script src=\"../../scripts/harmonic/harmonic.js?timestamp=" .  rand() . "\" type=\"text/javascript\" charset=\"utf-8\"></script>";

	$lara_examples = build_lara_examples();
	
	$c_examples = build_c_examples();

	$finalHTML = replace_template($templateHTML, $main_script, $lara_examples, $c_examples);
	
	echo $finalHTML;
	
	/**
	$maintenance = get_file_contents("maintenance.html");
	echo $maintenance;
	/**/

?>
