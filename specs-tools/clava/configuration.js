/*
 * Variables that should not need changing
 */
//var RUN_COMPILER_PATH = "http://localhost:4000/api/weave"; // For local testing
var RUN_COMPILER_PATH = "https://specs.fe.up.pt/api/weave";

/*
 * Variables to configure website
 */
var TOOL = "clava";
var DEFAULT_SOURCE_FILENAME = "input.c";

var BASE_CODE_EXAMPLE_URL = "cpp/";
var BASE_LARA_EXAMPLE_URL = "larajs/";

var ACE_EDITOR_LANGUAGE = "c_cpp";

var CODE_HOME_EXAMPLE = "CallGraph.cpp";
var LARA_HOME_EXAMPLE = "CallGraph.js";

/***************************LS***************************/
var BASE_LS_JSON_URL =
  "https://raw.githubusercontent.com/specs-feup/clava/master/ClavaWeaver/src/pt/up/fe/specs/clava/weaver/CxxWeaver.json";

/*
 * END of configuration variables
 */

/*
 * Functions that need to be implemented
 */

function getImplementationExtension() {
  if (isCxx()) {
    return "cpp";
  }

  return "c";
}

function buildWeaverArgs() {
  var args = [];

  args.push("-std");
  args.push(getStandard());

  return args;
}

/*
 * END of functions that need to be implemented
 */

/*
 * Helper functions
 */

var CXX_STANDARDS = new Set(["c++11"]);

function getStandard() {
  var standardSelect = document.getElementById("c_standard");
  return standardSelect.options[standardSelect.selectedIndex].value;
}

function isCxx() {
  return CXX_STANDARDS.has(getStandard());
}

/*
 * END of helper functions
 */
