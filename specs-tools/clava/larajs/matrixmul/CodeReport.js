laraImport("weaver.JoinPoints");
laraImport("weaver.Query");


// Possible attributes
const loopTypeAttr = ["type", "kind"];
const loopIsInnermostAttr = ["is_innermost", "isInnermost"];
const loopNestedLevelAttr = ["nested_level", "nestedLevel"];

const loops = [];
const callInfo = new LaraObject();

let num_files = 0;
let num_functions = 0;
let num_calls = 0;

const loopCount = new LaraObject();
let num_loops = 0;
let num_loops_innermost = 0;
let max_nest = -1;
let max_nest_location = '';

num_files = Query.search("file").get().length;

num_functions = Query.search("function").get().length;

for (const $function of Query.search("function")) {
    for (const $call of Query.searchFrom($function, "call")) {
        num_calls++;
        callInfo.inc($call.name, 'callee');
        callInfo.inc($function.name, 'caller');
    }
}

for (const $file of Query.search("file")) {
    for (const $function of Query.searchFrom($file, "function")) {
        for (const $loop of Query.searchFrom($function, "loop")) {
            const loopType = JoinPoints.getAttributeStrict($loop, loopTypeAttr);
            loopCount.inc(loopType, "total");

            const isInnermost = JoinPoints.getAttributeStrict($loop, loopIsInnermostAttr);
            if (isInnermost) {
                loopCount.inc(loopType, "innermost");
                num_loops_innermost++;
            }

            num_loops++;

            const loopNestedLevel = JoinPoints.getAttributeStrict($loop, loopNestedLevelAttr);

            if (loopNestedLevel > max_nest) {
                max_nest = loopNestedLevel;
                max_nest_location = $file.name + ' : ' + $function.name + ' : ' + $loop.line;
            }
        }
    }
}

/********************* HELPER FUNCTIONS *********************/

function withWidth(string, width) {

    const diff = width - string.toString().length;

    if (diff <= 0) {
        return string;
    }

    let result = '';
    for (let i = 0; i < diff; i++) {

        result += ' ';
    }

    return string + result;
}

function lineWidth(string, width) {

    let result = '';
    for (let i = 0; i < width; i++) {

        result += string;
    }

    return result;
}

/********************* GENERAL INFORMATION *********************/

println('\n\n\n-== [ General Information ] ==-\n');

println("No. of Files: " + num_files);
println("No. of Functions: " + num_functions);
println("No. of Calls: " + num_calls);


/********************* LOOP INFORMATION *********************/

println('\n\n\n-== [ Loop Information ] ==-\n');

let firstWidth = 10;
let secondWidth = 8;
let thirdWidth = 10;
let totalWidth = firstWidth + secondWidth + thirdWidth + 2;


println(lineWidth('=', totalWidth));
println(withWidth('Type', firstWidth) + ' ' + withWidth('Total', secondWidth) + ' ' + withWidth('Innermost', thirdWidth));

println(lineWidth('-', totalWidth));

for (const loopType in loopCount) {
    println(withWidth(loopType, firstWidth) + ' ' + withWidth(loopCount.get(loopType, "total") || 0, secondWidth) + ' ' + withWidth(loopCount.get(loopType, "innermost") || 0, thirdWidth));
}

println(lineWidth('-', totalWidth));

println(withWidth('Total', firstWidth) + ' ' + withWidth(num_loops, secondWidth) + ' ' + withWidth(num_loops_innermost, thirdWidth));

println(lineWidth('=', totalWidth));

println("\nLargest Loop Nest: " + (max_nest + 1) + ' @ ' + max_nest_location);

/********************* CALL INFORMATION *********************/

let mostCalled = '';
let mostCalledCounter = -1;
let mostCalls = '';
let mostCallsCounter = -1;
let largestName = 0;

for (const funcName in callInfo) {

    if (funcName.length > largestName)
        largestName = funcName.length;

    const callee = callInfo[funcName]['callee'] || 0;
    const caller = callInfo[funcName]['caller'] || 0;

    if (callee > mostCalledCounter) {
        mostCalledCounter = callee;
        mostCalled = funcName;
    }

    if (caller > mostCallsCounter) {
        mostCallsCounter = caller;
        mostCalls = funcName;
    }
}
secondWidth = 10;
thirdWidth = 10;
totalWidth = largestName + secondWidth + thirdWidth + 2;

println('\n\n\n-== [ Call Information ] ==-\n');

println(lineWidth('=', totalWidth));
println(withWidth('Name', largestName) + ' ' + withWidth('As Callee', secondWidth) + '  ' + withWidth('As Caller', thirdWidth));

println(lineWidth('-', totalWidth));

for (const funcName in callInfo) {

    let callee = callInfo[funcName]['callee'] || 0;
    let caller = callInfo[funcName]['caller'] || 0;

    if (funcName === mostCalled)
        callee += '*';
    if (funcName === mostCalls)
        caller += '*';

    println(withWidth(funcName, largestName) + ' ' + withWidth(callee, secondWidth) + '  ' + withWidth(caller, thirdWidth));
}

println(lineWidth('=', totalWidth));





