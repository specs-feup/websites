laraImport("clava.autopar.Parallelize");
laraImport("weaver.Query");


var $loops = [];
for (const $loop of Query.search("function", "matrix_mult").search("loop", {isOutermost: true})) {
    $loops.push($loop);
}

Parallelize.forLoops($loops);
