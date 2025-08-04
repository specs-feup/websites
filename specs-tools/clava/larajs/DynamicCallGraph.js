/**
 * Instruments code in order to build a runtime call graph.
 */
laraImport("weaver.Query");
var obj = new LaraObject();
/* Instrument function calls and increment the corresponding position */
for (const chain of Query.search("function").search("call").chain()) {
    const $function = chain["function"];
    const $call = chain["call"];
    var id = obj.getId($function.name, $call.name);
    $call.insertAfter(`call_graph[ ${id} ]++;`);
}


/* Declare the array in each file */
var total = obj.getTotal();
for (const $file of Query.search("file")) {

    if ($file.hasMain) {
        $file.insertBegin(`int call_graph[ ${total} ] = {0};`);
    } else {
        $file.insertBegin(`extern int call_graph[ ${total} ];`);
    }


}


/* Print the array at the end of the main function */
for (const $function of Query.search("function", "main")) {

    $function.insertReturn('printf("digraph call_graph {\\n\\n");');
    for (const f in obj) {
        for (const c in obj[f]) {

            var id = obj[f][c];
            $function.insertReturn(`
if (call_graph[ ${id} ] != 0)
    printf("\\t${f} -> ${c} [label=\\"%d\\"];\\n", call_graph[ ${id} ]);
        `);
        }
    }
    $function.insertReturn(`printf("}\\n"); `);
}




println('\nDynamicCallGraph done!');
