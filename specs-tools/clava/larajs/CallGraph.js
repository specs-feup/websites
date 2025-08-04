import Query from "@specs-feup/lara/api/weaver/Query.js";

// Utility object that counts tuples
var callGraph = {};

// Collect information
for (const $function of Query.search("function")) {
  for (const $call of Query.searchFrom($function, "call")) {
    // Alternatively:
    //for (const functionCall of Query.search("function").search("call").chain()) {
    //    const $function = functionCall["function"];
    //    const $call = functionCall["call"];

    // Test 1st key
    if (!($function.signature in callGraph)) {
      callGraph[$function.signature] = {};
    }

    // Test 2nd key
    if (!($call.signature in callGraph[$function.signature])) {
      callGraph[$function.signature][$call.signature] = 0;
    }

    // Increment
    callGraph[$function.signature][$call.signature]++;
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
