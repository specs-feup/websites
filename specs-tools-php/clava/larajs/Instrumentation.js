laraImport("weaver.Query")
laraImport("lara.code.Logger")

var logger = new Logger();
// Log every time a loop is executed
for (const $function of Query.search("function")) {
    for (const $loop of Query.searchFrom($function, "loop")) {

        // Alternatively:
        //for (const functionLoop of Query.search("function").search("loop").chain()) {
        //    const $function = functionLoop["function"];
        //    const $loop = functionLoop["call"];

        logger.text("Starting loop in function ")
                .text($function.signature)
                .text(" at line ")
                .text($loop.line)
                .ln()
                .log($loop, true);
    }
}

