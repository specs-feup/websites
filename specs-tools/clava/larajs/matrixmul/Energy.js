laraImport("weaver.Query");
laraImport("lara.code.Energy");

// Measure energy of matrix multiplication call
var energy = new Energy();

for (const $call of Query.search("call", "matrix_mult")) {
    energy.measure($call);
}
