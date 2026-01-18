/*
 * Variables that should not need changing
 */
//var RUN_COMPILER_PATH = "http://localhost:4000/api/weave"; // For local testing
var RUN_COMPILER_PATH = "https://specs.fe.up.pt/api/weave";

/*
 * Variables to configure website
 */
var TOOL = "metafor";
var DEFAULT_SOURCE_FILENAME = "input.f90";

var BASE_CODE_EXAMPLE_URL = "fortran/";
var BASE_LARA_EXAMPLE_URL = "larajs/";

var ACE_EDITOR_LANGUAGE = "fortran";

var CODE_HOME_EXAMPLE = "hello.f90";
var LARA_HOME_EXAMPLE = "Hello.js";

/***************************LS***************************/
var BASE_LS_JSON_URL =
  "https://specs-feup.github.io/weavers_backend/FortranWeaver.json";

/*
 * END of configuration variables
 */

/*
 * Functions that need to be implemented
 */

function getSourceFilename() {
  return DEFAULT_SOURCE_FILENAME;
}

function getImplementationExtension() {
  return ".f90";
}

function buildWeaverArgs() {
  var args = [];
/*
  args.push("-std");
  args.push(getStandard());
*/
  return args;
}

/*
 * END of functions that need to be implemented
 */

/*
 * Helper functions
 */
/*
var CXX_STANDARDS = new Set(["c++11"]);

function getStandard() {
  var standardSelect = document.getElementById("c_standard");
  return standardSelect.options[standardSelect.selectedIndex].value;
}
*/
/*
function isCxx() {
  return CXX_STANDARDS.has(getStandard());
}
*/
/*
 * END of helper functions
 */
