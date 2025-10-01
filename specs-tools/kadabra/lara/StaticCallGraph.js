/**
 * Prints a static call graph based on the structure of the code.
 * It takes into account all possible function calls. This is
 * printed to the command line in dot format.
 */
import Query from "@specs-feup/lara/api/weaver/Query.js";

// Utility object that counts tuples
var callGraph = {};

// Collect information
for (const $function of Query.search("method")) {
  for (const $call of Query.searchFrom($function, "call")) {
    // Alternatively:
    //for (const functionCall of Query.search("function").search("call").chain()) {
    //    const $function = functionCall["function"];
    //    const $call = functionCall["call"];

    // Test 1st key
    if (!($function.name in callGraph)) {
      callGraph[$function.name] = {};
    }

    // Test 2nd key
    if (!($call.name in callGraph[$function.name])) {
      callGraph[$function.name][$call.name] = 0;
    }

    // Increment
    callGraph[$function.name][$call.name]++;
  }
}

// Create graph in dot format (Graphviz) and print it to the console
console.log(
  "// Copy this code, open the web page http://webgraphviz.com/, paste the code and click Generate Graph!"
);
console.log("digraph static_call_graph {\n");

for (const f in callGraph) {
  for (const c in callGraph[f]) {
    console.log(
      '\t"' + f + '"->"' + c + '" [label="' + callGraph[f][c] + '"];'
    );
  }
}

console.log("}");
