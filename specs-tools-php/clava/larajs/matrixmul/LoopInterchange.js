laraImport("weaver.Query");
for (const chain of Query.search("function", "matrix_mult")
        .search("loop", {controlVar: "i"})
        .search("loop", {controlVar: "j"})
        .chain()) {

    chain["loop_0"].interchange(chain["loop_1"]);
}


