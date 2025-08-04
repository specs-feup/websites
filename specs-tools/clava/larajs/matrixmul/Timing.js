laraImport("weaver.Query");
laraImport("lara.code.Timer");

// Measure time spent on matrix multiplication call
var timer = new Timer();

for (const $call of Query.search("call", "matrix_mult")) {
    timer.time($call);
}

