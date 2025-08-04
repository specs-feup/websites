laraImport("weaver.Query");
var flags = ["-funsafe-math-optimizations",
    "-fno-guess-branch-probability",
    "-fno-ivopts -fno-tree-loop-optimize",
    "-fno-inline-functions",
    "-funroll-all-loops",
    "-fomit-frame-pointer"];

for (const $call of Query.search("function", "foo").search("call", "bar")) {
    libVersioningCompiler($call, "id", flags);
}


function libVersioningCompiler($fcall, id, flags) {

    // Add extern C to all declarations of the function
    var functionDefFile = undefined;
    for (const chain of Query.search("file").search("function", $fcall.name).chain()) {
        const $file = chain["file"];
        const $function = chain["function"];
        // Store the path to the definition of the function, for later use
        if ($function.hasDefinition) {
            functionDefFile = $file.filepath;
        }

        // Build linkage node
        var $linkage = AstFactory.externC($function);
        // Replace original function declaration with new linkage node, if created
        if ($linkage !== null) {
            $function.replaceWith($linkage);
        }

    }



    // Check if function definition was found
    if (functionDefFile === undefined) {
        println("ERROR: Could not find file were function call " + $fcall.name + " is defined");
        return;
    }


    // Get joinpoint program
    var $program = $fcall.root;
    // Code for creating a compiled version of the function
    var createVersion = "std::shared_ptr<vc::Version> " + id + " = vc::createVersion(";
    // Add file where function is
    createVersion += '"' + Format.escape(functionDefFile) + '",\n';
    createVersion += '"' + $fcall.name + '",\n';
    // Create options
    createVersion += "{";
    // Add standard
    createVersion += newOption($program.stdFlag);
    // Add default flags
    for (flag of $program.defaultFlags) {
        createVersion += '\n,' + newOption(flag);
    }

    // Add weaver user flags
    for (flag of $program.userFlags) {
        createVersion += '\n,' + newOption(flag);
    }

    // Add include folders
    for (folder of $program.includeFolders) {
        createVersion += '\n,' + newOption("-I" + Format.escape(folder));
    }

    // Add user flags
    for (flag of flags) {
        createVersion += '\n,' + newOption(flag);
    }
    createVersion += "}\n);\n";
    var $fcallDeclType = $fcall.decl.functionType;
    var typedefName = "signature_" + id;
    // Add typedef of function signature
    createVersion += "typedef " + $fcallDeclType.returnType.code;
    createVersion += "(*" + typedefName + ")";
    createVersion += "(";
    createVersion += $fcallDeclType.paramTypes.map(function (type) {
        return type.code;
    }).join(", ");
    createVersion += ");\n";
    var newFcallName = $fcall.name + "_" + id;
    // Create a function pointer to the new compiled version of the function
    createVersion += typedefName + " " + newFcallName + " = " + "(" + typedefName + ") vc::compileAndGetSymbol(" + id + " );\n";
    // Change the original function call with the new compiled function
    $fcall.name = newFcallName;
    // Insert version creation at the beginning of the function of the function call
    var $fcallFunction = $fcall.ancestor("function");
    $fcallFunction.body.insertBegin(createVersion);


    // Setup on the main function
    for (const $file of Query.search("file", {hasMain: true})) {

        // Include
        $file.addInclude("versioningCompiler/Utils.hpp", false);
        for (const $function of Query.searchFrom($file, "function", "main")) {
            // Setup
            $function.body.insertBegin("vc::vc_utils_init();");
        }

    }

}

function newOption(flag) {
    return 'vc::Option("_", "' + flag + '")';
}
