laraImport("clava.hdf5.Hdf5");
laraImport("weaver.Query");


// Example
Hdf5Types("./", "Routing");
function Hdf5Types(srcFolder, namespace) {

    // Folder for the generated files
    var filepath = srcFolder + "/lara-generated";
    // Create files for generated code
    var $compTypeC = AstFactory.file("CompType.cpp", filepath);
    var $compTypeH = AstFactory.file("CompType.h", filepath);
    // Add files to the program

// 'program' is the root node
    const $program = Query.root();
    // Alternatively:
    // const $program = Query.search("program").first();

    $program.addFile($compTypeC);
    $program.addFile($compTypeH);
    var hDeclarationsCode = "";
    // Add include for CompTypes
    $compTypeC.addInclude("CompType.h", false);
    $compTypeC.addInclude("H5CompType.h", true);
    // For each record, create code
    //var recordCounter = 0;
    for (const $file of Query.search("file")) {

        for (const $record of Query.searchFrom($file, "record", {kind: kind => kind === "class" || kind === "struct"})) {
            //recordCounter++;
            var className = $record.name + "Type";
            var typeName = "itype";
            /* Generate code for .h file */

            // Create declaration
            hDeclarationsCode += HDeclaration($file.name, className);
            /* Generate code for .cpp file */

            // Add include to the file where record is
            $compTypeC.addIncludeJp($record);
            // Create code for translating C/C++ type to HDF5 type

            const code = RecordToHdf5($record, typeName);
            var cxxFunction = CImplementation(namespace, className, Format.addPrefix(code, "    "));
            $compTypeC.insertAfter(AstFactory.declLiteral(cxxFunction));
        }
    }

    /* Generate code for .h file */

// Add include to HDF5 CPP library
    $compTypeH.addInclude("H5Cpp.h", true);
    // Create header code inside the target namespace
    hDeclarationsCode = '\nnamespace ' + namespace + ' {\n\n' + Format.addPrefix(hDeclarationsCode, "    ") + "\n}\n";
    // Insert code inside header file
    $compTypeH.insertAfter(AstFactory.declLiteral(hDeclarationsCode));


}






function RecordToHdf5($record, typeName) {

    var recordName = $record.type.code;
    code = "H5::CompType " + typeName + "(sizeof(" + recordName + "));\n";
    for (const $field of Query.searchFrom($record, "field")) {

        if ($field.type.constant)
            continue; // Ignore constant fields
        if (!$field.isPublic)
            continue; // Ignore private fields

        fieldName = $field.name;
        var HDF5Type = Hdf5.convert($field.type);
        if (HDF5Type === undefined)
            continue; // Warning message omitted for the example
        var params = `"${fieldName}", offsetof(${recordName}, ${fieldName}), ${HDF5Type}`;
        code += `${typeName}.insertMember(${params}); ` + "\n";
    }

    return code;
}

function HDeclaration(filename, className) {
    return      `
 //  ${filename}
 class ${className} {
 public:
 static H5::CompType GetCompType();
 };
 `
}


function CImplementation(namespace, className, body) {
    return `
 H5::CompType ${namespace}::${className}::GetCompType() {
 ${body}

 return itype;
 }

`
}

