laraImport("weaver.Query");
laraImport("clava.ClavaJoinPoints");

tileVars = {'i': {name: 'BS1', size: 64}, 'l': {name: 'BS2', size: 32}};

// find the top-level loop
const $pragma = Query.search("pragma", "matrix_loop").first();
loopTilingHelper($pragma.target, tileVars);



function loopTilingHelper(
        $topLevelLoop,
        tileVars = {}, // Maps control vars to tile variable names and sizes
        ternaryIf = false) {

    // Get function body
    $fBody = $topLevelLoop.ancestor('function').body;

    // Int type for tile variables
    var $intType = ClavaJoinPoints.builtinType('int');
    for (var $loop of $topLevelLoop.descendantsAndSelf('loop')) {
        var tileVar = tileVars[$loop.controlVar];
        if (tileVar === undefined) {
            continue;
        }

        // Create tile variable
        $fBody.addLocal(tileVar.name, $intType, tileVar.size.toString());
        // Tile loop
        $loop.tile(tileVar.name, $topLevelLoop, ternaryIf);
}

}