laraImport("weaver.Query");
laraImport("lara.code.Timer");
laraImport("lara.code.Energy");


// Measure execution time and energy of the loop
var timer = new Timer();
var energy = new Energy();

for (const $loop of Query.search("function", "foo").search("loop")) {
    timer.time($loop);
    energy.measure($loop);
}
