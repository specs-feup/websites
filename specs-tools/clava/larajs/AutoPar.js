laraImport("clava.autopar.Parallelize");
laraImport("weaver.Query");

var $loops = [];
for (const $loop of Query.search("function", "foo").search("loop")) {
    $loops.push($loop);
}

Parallelize.forLoops($loops);

// We can also only return the pragmas mapped to the $loop.astId
// without modifying the code
//var pragmas = Parallelize.getForLoopsPragmas($loops);
//printlnObject(pragmas);
