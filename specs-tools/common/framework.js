//(() => {
"use strict";

var ACTIVE_ICON = "fa-cog";
var ACTIVE_ROTATION_MODE = "fa-spin";
var INACTIVE_ICON = "fa-clock-o";

var noCache = "?value=" + Math.random();
var currentFileName = "code." + getImplementationExtension();
var currentResults = {};

var resultFilesList = document.getElementById("result-files");

var hideDropdownMenus = function (activeMenu) {
  var dropdowns = document.getElementsByClassName("dropdown-menu-container");
  for (var i = 0; i < dropdowns.length; ++i) {
    var dropdown = dropdowns[i];
    if (dropdown !== activeMenu) {
      dropdown.classList.remove("show-dropdown");
    }
  }
};

var setMenuTrigger = function (trigger, menu) {
  trigger.addEventListener("click", function () {
    hideDropdownMenus(menu);
    menu.classList.toggle("show-dropdown");
  });
};

// Initializes selected divs as ace (text) editors.
var newAceEditor = function (name, mode, theme, fontSize) {
  var editor = ace.edit(name);
  editor.setTheme("ace/theme/" + theme);
  editor.session.setMode("ace/mode/" + mode);
  document.getElementById(name).style.fontSize = fontSize;
  return editor;
};

/*
 * newResults contains the following information:
 * String[] fileNames;
 * String[] outputs;
 * String mainFile;
 * String console;
 * final String originalCode;
 * boolean exceptionOccured;
 */
function populateResults(newResults) {
  //Clean results and dropdown menu
  currentResults = {};
  currentFileName = "code." + getImplementationExtension();
  while (resultFilesList.hasChildNodes()) {
    resultFilesList.removeChild(resultFilesList.lastChild);
  }

  //        alert(resultFilesList.hasChildNodes());
  var fileNames = newResults.fileNames;
  var codes = newResults.outputs;
  for (var i = 0; i < fileNames.length; i++) {
    var fileName = fileNames[i];
    var code = codes[i];
    currentResults[fileName] = code;
    var li = document.createElement("li");
    li.textContent = fileName;
    li.className = "load-source-code-result";
    resultFilesList.appendChild(li);
  }
  reloadResults();
}

var runCommand = function (path, outputMode, args) {
  var jsonArgs = JSON.stringify(args);

  var runRequest = new XMLHttpRequest();

  runRequest.onreadystatechange = function () {
    if (runRequest.readyState === 4) {
      if (runRequest.status === 200) {
        var fileContent = runRequest.responseText;
        try {
          /**
           * This object contains the following information:
           * String[] fileNames;
           * String[] outputs;
           * String mainFile;
           * String console;
           * final String originalCode;
           * boolean exceptionOccured;
           */
          var obj = JSON.parse(fileContent);
          finalResult.session.setMode("ace/mode/" + outputMode);
          populateResults(obj);
          if (obj.outputs.length !== 0 && obj.mainFile > -1) {
            loadWeaverResult(obj.fileNames[obj.mainFile]);
            //                            finalResult.setValue(obj.outputs[obj.mainFile]);
          }
          consoleOut.setValue(obj.console);
        } catch (e) {
          consoleOut.setValue(
            "Exception occured when getting output result: " + e
          );
        }
      } else {
        consoleOut.setValue(
          "Could not run compiler.\n" +
            runRequest.status +
            ": " +
            runRequest.statusText
        );
      }
      endWaitForResults();
    }
  };

  try {
    runRequest.open("POST", path, true);

    runRequest.setRequestHeader("Content-type", "application/json");
    runRequest.send(jsonArgs);
  } catch (e) {
    consoleOut.setValue("Could not run compiler. Got exception: " + e.name);
    endWaitForResults();
  }
};

var startWaitForResults = function (elementToChange) {
  canRun = false;

  var icons = document.querySelectorAll("#menu-section-options .fa");
  for (var i in icons) {
    var icon = icons.item(i);
    icon.classList.add(INACTIVE_ICON);
    icon.classList.remove("fa-play");
  }

  icons = elementToChange.querySelectorAll(".fa");
  for (var i in icons) {
    var icon = icons.item(i);
    icon.classList.add(ACTIVE_ICON);
    icon.classList.add(ACTIVE_ROTATION_MODE);
    icon.classList.remove(INACTIVE_ICON);
  }

  finalResult.setValue("");
  consoleOut.setValue("");
};

var endWaitForResults = function () {
  canRun = true;

  var icons = document.querySelectorAll("#menu-section-options .fa");
  for (var i in icons) {
    var icon = icons.item(i);

    icon.classList.remove(ACTIVE_ICON);
    icon.classList.remove(INACTIVE_ICON);
    icon.classList.remove(ACTIVE_ROTATION_MODE);
    icon.classList.add("fa-play");
  }
};

var uploadFile = function (target) {
  var selectFile = document.createElement("input");
  selectFile.setAttribute("type", "file");

  selectFile.addEventListener("change", function (evt) {
    var file = evt.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
      target.setValue(e.target.result);
    };
    reader.readAsText(file);
  });
  selectFile.click();
};

var downloadFile = function (sourceEditor, fileName) {
  var text = sourceEditor.getValue();
  var encoded = encodeURIComponent(text);
  var fileType = getImplementationExtension();
  window.open(
    "data:text/" +
      fileType +
      ";charset=utf-8;filename=" +
      fileName +
      "," +
      encoded
  );
};

var loadCodeExample = function (example) {
  var file_path = BASE_CODE_EXAMPLE_URL + example;

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      var fileContent = xmlHttp.responseText;
      codeEditor.setValue(fileContent);
      codeEditor.gotoLine(0);
    }
  };

  xmlHttp.open("GET", file_path + noCache, true);
  xmlHttp.send();
};

var loadWeaverResult = function (resultName) {
  var result = currentResults[resultName];
  if (result === undefined) {
  } else {
    currentFileName = resultName;
    finalResult.setValue(result);
    finalResult.gotoLine(0);
    var encoded = encodeURIComponent(result);
    var textType = getImplementationExtension();
    downloadWeavedFile.href =
      "data:text/" + textType + ";charset=utf-8," + encoded;
    downloadWeavedFile.download = resultName;
  }
};

var loadLaraExample = function (example) {
  var file_path = BASE_LARA_EXAMPLE_URL + example;

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      var fileContent = xmlHttp.responseText;
      laraEditor.setValue(fileContent);
      laraEditor.gotoLine(0);
    }
  };

  xmlHttp.open("GET", file_path + noCache, true);
  xmlHttp.send();
};

window.addEventListener("click", function (evt) {
  var target = evt.target;
  if (target.classList.contains("menu-trigger")) {
    return;
  }
  if (
    target.classList.contains("dont-hide") ||
    target.parentNode.classList.contains("dont-hide")
  ) {
    return;
  }
  hideDropdownMenus();
});

require("ace/commands/default_commands").commands.push({
  name: "Toggle Fullscreen",
  bindKey: "F11",
  exec: function (editor) {
    var codeBlock = editor.container.parentNode;
    document.body.classList.toggle("fullscreen");
    codeBlock.classList.toggle("fullscreen");
    editor.resize();
  },
});

var menuTryIt = document.getElementById("menu-try-it");
var menuCopyright = document.getElementById("menu-copyright");

var menuSectionOptions = document.getElementById("menu-section-options");

var menuWeaveApplication = document.getElementById("menu-weave-application");
var incompletePath = document.getElementById("incomplete-path");
//    var mainClass = document.getElementById('main-class');

var tryItBody = document.getElementById("try-it");
var copyrightBody = document.getElementById("about");

var fontSizeCombo = document.getElementById("font_size");

var canRun = true;

var sourceCodeMenuTrigger = document.getElementById("source-code-menu-trigger");
var laraMenuTrigger = document.getElementById("lara-menu-trigger");
var resultMenuTrigger = document.getElementById("result-menu-trigger");

var sourceCodeMenu = document.getElementById("source-code-menu");
var laraMenu = document.getElementById("lara-menu");
var resultMenu = document.getElementById("result-menu");

var uploadsourceCodeFile = document.getElementById("upload-source-code-file");
var uploadLaraFile = document.getElementById("upload-lara-file");
var downloadWeavedFile = document.getElementById("download-source-code-file");

menuTryIt.addEventListener("click", function () {
  menuTryIt.classList.add("active");
  menuCopyright.classList.remove("active");

  tryItBody.style.display = "";
  menuSectionOptions.style.visibility = "";
  copyrightBody.style.display = "none";
});

menuCopyright.addEventListener("click", function () {
  menuTryIt.classList.remove("active");
  menuCopyright.classList.add("active");

  tryItBody.style.display = "none";
  menuSectionOptions.style.visibility = "hidden";
  copyrightBody.style.display = "block";
});

menuWeaveApplication.addEventListener("click", function () {
  if (!canRun) return;

  var args = createInputData();

  if (args.sourceCode.trim() === "") {
    consoleOut.setValue("No source code to send, stopping");
    return;
  }

  if (args.script.trim() === "") {
    consoleOut.setValue("No JS script code to send, stopping");
    return;
  }

  startWaitForResults(menuWeaveApplication);

  runCommand(RUN_COMPILER_PATH, ACE_EDITOR_LANGUAGE, args);
});

fontSizeCombo.addEventListener("change", function () {
  var choice = this.options[this.selectedIndex].value;

  codeEditor.setFontSize(choice);
  laraEditor.setFontSize(choice);
  consoleOut.setFontSize(choice);
  finalResult.setFontSize(choice);
});

uploadsourceCodeFile.addEventListener("click", function () {
  uploadFile(codeEditor);
});

uploadLaraFile.addEventListener("click", function () {
  uploadFile(laraEditor);
});

setMenuTrigger(sourceCodeMenuTrigger, sourceCodeMenu);
setMenuTrigger(laraMenuTrigger, laraMenu);
setMenuTrigger(resultMenuTrigger, resultMenu);

var expanders = document.querySelectorAll(".expander");
for (var i = 0; i < expanders.length; ++i) {
  var expander = expanders[i];

  expander.addEventListener("click", function (evt) {
    var target = this.getAttribute("data-target");
    var targetElement = document.getElementById(target);
    var faIcon = this.querySelector(".fa");

    if (targetElement.classList.contains("show")) {
      targetElement.classList.remove("show");
      faIcon.classList.remove("fa-chevron-down");
      faIcon.classList.add("fa-chevron-left");
    } else {
      targetElement.classList.add("show");
      faIcon.classList.add("fa-chevron-down");
      faIcon.classList.remove("fa-chevron-left");
    }
  });

  expander.addEventListener("mousedown", function (evt) {
    evt.preventDefault();
  });
}

var selectSourceCodeExamples = document.querySelectorAll(".load-code-example");
for (var i = 0; i < selectSourceCodeExamples.length; ++i) {
  var selectSourceCodeExample = selectSourceCodeExamples[i];

  selectSourceCodeExample.addEventListener("click", function (evt) {
    var target = this.getAttribute("data-filename") || this.innerHTML;
    loadCodeExample(target);
  });
}

var selectLaraExamples = document.querySelectorAll(".load-lara-example");
for (var i = 0; i < selectLaraExamples.length; ++i) {
  var selectLaraExample = selectLaraExamples[i];

  selectLaraExample.addEventListener("click", function (evt) {
    var target = this.getAttribute("data-filename") || this.innerHTML;
    loadLaraExample(target);
  });
}

function reloadResults() {
  var selectResults = document.querySelectorAll(".load-source-code-result");
  for (var i = 0; i < selectResults.length; ++i) {
    var selectResult = selectResults[i];

    selectResult.addEventListener("click", function (evt) {
      loadWeaverResult(this.innerHTML);
    });
  }
}

reloadResults();

// Initialization.
var fontSize = "12px";

// Create editors for c, lara, final result, type definition and console.
var laraEditor = newAceEditor("laraEditor", "javascript", "chrome", fontSize);
var finalResult = newAceEditor(
  "resultEditor",
  ACE_EDITOR_LANGUAGE,
  "chrome",
  fontSize
);

var consoleOut = newAceEditor("outputLog", "text", "twilight", fontSize);
consoleOut.renderer.setShowGutter(false);
consoleOut.setReadOnly(true);
var codeEditor = newAceEditor(
  "codeEditor",
  ACE_EDITOR_LANGUAGE,
  "chrome",
  fontSize
);

function createInputData() {
  var args = {
    script: laraEditor.getValue(),
    sourceCode: codeEditor.getValue(),
    tool: TOOL,
    sourceFilename: getSourceFilename(),
    args: buildWeaverArgs(),
  };

  return args;
}

//Save changes in browser for source code an script code
var codeCache = new PreserveCode(TOOL);
if (!codeCache.hasSavedContent()) {
  loadLaraExample(LARA_HOME_EXAMPLE);
  loadCodeExample(CODE_HOME_EXAMPLE);
}

loadLsJson(BASE_LS_JSON_URL);
//})();
