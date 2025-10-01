/*
 * Variables that should not need changing
 */
//var RUN_COMPILER_PATH = "http://localhost:4000/api/weave"; // For local testing
var RUN_COMPILER_PATH = "https://specs.fe.up.pt/api/weave";

/*
 * Variables to configure website
 */
var TOOL = "kadabra";

var BASE_CODE_EXAMPLE_URL = "java/";
var BASE_LARA_EXAMPLE_URL = "lara/";

var ACE_EDITOR_LANGUAGE = "java";

var CODE_HOME_EXAMPLE = "HelloWorld.java";
var LARA_HOME_EXAMPLE = "StaticCallGraph.js";

/***************************LS***************************/
var BASE_LS_JSON_URL =
  "https://raw.githubusercontent.com/specs-feup/kadabra/refs/heads/master/JavaWeaver/src/weaver/kadabra/JavaWeaver.json";

var REGEX_CLASSNAME = /(class|interface|enum)(\n|\s)+(\w+)/;

/*
 * END of configuration variables
 */

/*
 * Functions that need to be implemented
 */

function getImplementationExtension() {
  return "java";
}

function getSourceFilename() {
  // Extract class name from contents of source editor
  var match = codeEditor.getValue().match(REGEX_CLASSNAME);

  if (!match) {
    console.log(
      "WARNING: Could not extract classname from source code:\n\n" +
        codeEditor.getValue()
    );
    return "default.java";
  }
  console.log("Classname: " + match[3]);
  return match[3] + ".java";
}

function buildWeaverArgs() {
  //var args = ["-WC", "-o", "./woven_code"];
  var args = ["-WF"]; // To create "woven_code" folder

  const useIncompletePath = document.querySelector("#incomplete-path").checked;
  if (useIncompletePath) {
    args.push("--Xignore");
  }
  console.log("ARGS: " + args);
  return args;
}

/*
 * END of functions that need to be implemented
 */
