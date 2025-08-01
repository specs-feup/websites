(function () {
    'use strict';

    var RUN_WEAVER_PATH = 'runMWeaver.php';
    var RUN_COMPILER_PATH = 'runMATISSE.php';
    var BASE_MATLAB_EXAMPLE_URL = 'matlab/';
    var BASE_LARA_EXAMPLE_URL = 'lara/';
    var ACTIVE_ICON = 'fa-cog';
    var ACTIVE_ROTATION_MODE = 'fa-spin';
    var INACTIVE_ICON = 'fa-clock-o';

    var hideDropdownMenus = function (activeMenu) {
        var dropdowns = document.getElementsByClassName("dropdown-menu-container");
        for (var i = 0; i < dropdowns.length; ++i) {
            var dropdown = dropdowns[i];
            if (dropdown !== activeMenu) {
                dropdown.classList.remove('show-dropdown');
            }
        }
    }

    var setMenuTrigger = function (trigger, menu) {
        trigger.addEventListener('click', function () {
            hideDropdownMenus(menu);
            menu.classList.toggle('show-dropdown');
        });
    }

    // Initializes selected divs as ace (text) editors.
    var newAceEditor = function (name, mode, theme, fontSize) {
        var editor = ace.edit(name);
        editor.setTheme("ace/theme/" + theme);
        editor.session.setMode("ace/mode/" + mode);
        document.getElementById(name).style.fontSize = fontSize;
        return editor;
    };

    var setDownload = function (code, filename, outputMode) {
        var format = {'c_cpp': 'text/x-c', 'matlab': 'text/x-matlab', 'text': 'text/plain'};

        var format = format[language];

        var encoded = code === undefined ? "" : encodeURIComponent(code);
        var url = 'data:' + format + ';charset=utf-8,' + encoded;
        var download = document.querySelector('#download-results a');
        download.href = url;
        download.download = filename;
    }

    var setDownloadAll = function (base64) {
        var filename = "result.zip";
        var format = "application/zip";

        var url = 'data:' + format + ';base64,' + base64;
        var download = document.querySelector('#download-all-results a');
        download.href = url;
        download.download = filename;
        download.style.display = '';
    }

    var setFiles = function (outputs, filenames, mainFile, outputMode) {
        finalResult.session.setMode("ace/mode/" + outputMode);

        filesMenu.removeChild(filesMenu.getElementsByClassName("dropdown-menu")[0]);

        var contents = document.createElement('ul');
        contents.classList.add('dropdown-menu');
        filesMenu.appendChild(contents);

        if (outputs.length == 0) {
            finalResult.setValue("<Nothing>");
            return;
        }

        var zip = new JSZip();
        for (var i = 0; i < outputs.length; ++i) {
            (function () {
                var output = outputs[i];
                var filename = filenames[i];

                var element = document.createElement("li");
                var icon = document.createElement("i");
                icon.classList.add("fa");
                icon.classList.add("fa-file-code-o");
                element.appendChild(icon);
                element.appendChild(document.createTextNode(' '));
                element.appendChild(document.createTextNode(filename));
                contents.appendChild(element);

                element.addEventListener('click', function () {
                    finalResult.setValue(output);
                    setDownload(output, filename, outputMode);
                });

                if (filename == mainFile) {
                    element.click();
                }

                zip.file(filename, output);
            })();
        }

        document.querySelector('#download-all-results a').style.display = 'none';
        zip.generateAsync({type: 'base64'}).then(function (base64) {
            setDownloadAll(base64);
        });
    }

    var runCommand = function (path, outputMode, args) {
        var jsonArgs = encodeURIComponent(JSON.stringify(args));

        var runRequest = new XMLHttpRequest();
        console.log("PATH:" + path);
        console.log("OUTPUT MODE:" + outputMode);
        console.log("ARGS:" + args);
        runRequest.onreadystatechange = function () {
            if (runRequest.readyState === 4) {
                try {
                    if (runRequest.status === 200) {

                        var fileContent = runRequest.responseText;
                        console.log("JSON parse1:" + fileContent);
                        var obj = JSON.parse(fileContent);
                        console.log(obj);

                        consoleOut.setValue('console' in obj ? obj.console : "<Nothing>");
                        setFiles(obj.outputs, obj.filenames, obj.mainFile, outputMode);
                    } else {
                        consoleOut.setValue('Could not run MATISSE.\n' + runRequest.status + ": " + runRequest.statusText);
                    }
                } catch (e) {
                    console.log(e);
                    consoleOut.setValue(e.toString());
                } finally {
                    endWaitForResults();
                }
            }
        };

        var params = "args=" + jsonArgs;
        try {
            runRequest.open("POST", path, true);

            runRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            runRequest.setRequestHeader("Content-length", params.length);
            runRequest.setRequestHeader("Connection", "close");

            runRequest.send(params);
        } catch (e) {
            console.log(e);
            consoleOut.setValue('Could not run MATISSE. Got exception: ' + e.name);
            endWaitForResults();
        }
    }

    var startWaitForResults = function (elementToChange) {
        canRun = false;

        var icons = document.querySelectorAll('#menu-section-options .fa');
        for (var i in icons) {
            var icon = icons.item(i);
            icon.classList.add(INACTIVE_ICON);
            icon.classList.remove('fa-play');
        }

        icons = elementToChange.querySelectorAll('.fa');
        for (var i in icons) {
            var icon = icons.item(i);
            icon.classList.add(ACTIVE_ICON);
            icon.classList.add(ACTIVE_ROTATION_MODE);
            icon.classList.remove(INACTIVE_ICON);
        }

        finalResult.setValue('');
        consoleOut.setValue('');
    };

    var endWaitForResults = function () {
        canRun = true;

        var icons = document.querySelectorAll('#menu-section-options .fa');
        for (var i in icons) {
            var icon = icons.item(i);

            icon.classList.remove(ACTIVE_ICON);
            icon.classList.remove(INACTIVE_ICON);
            icon.classList.remove(ACTIVE_ROTATION_MODE);
            icon.classList.add('fa-play');
        }
    };

    var uploadFile = function (target) {
        var selectFile = document.createElement('input');
        selectFile.setAttribute('type', 'file');

        selectFile.addEventListener('change', function (evt) {
            var file = evt.target.files[0];
            if (!file)
                return;

            var reader = new FileReader();
            reader.onload = function (e) {
                console.log(e);
                target.setValue(e.target.result);
            };
            reader.readAsText(file);
        });
        selectFile.click();
    }

    var loadMatlabExample = function (example) {
        var file_path = BASE_MATLAB_EXAMPLE_URL + example + "?no_cache=" + Math.random();
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var fileContent = xmlHttp.responseText;
                mEditor.setValue(fileContent);
                mEditor.gotoLine(0);
            }
        }

        xmlHttp.open("GET", file_path, true);
        xmlHttp.send();
    }

    var loadLaraExample = function (example) {
        var file_path = BASE_LARA_EXAMPLE_URL + example + "?no_cache=" + Math.random();

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var fileContent = xmlHttp.responseText;
                laraEditor.setValue(fileContent);
                laraEditor.gotoLine(0);
            }
        }

        xmlHttp.open("GET", file_path, true);
        xmlHttp.send();
    }

    window.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.classList.contains('menu-trigger')) {
            return;
        }
        if (target.classList.contains('dont-hide') || target.parentNode.classList.contains('dont-hide')) {
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
        }
    });

    var menuTryIt = document.getElementById('menu-try-it');
    var menuCopyright = document.getElementById('menu-copyright');

    var menuSectionOptions = document.getElementById('menu-section-options');

    var menuCompileToC = document.getElementById('menu-compile-to-c');
    var menuCompileToCL = document.getElementById('menu-compile-to-cl');
    var menuCompileToMatlab = document.getElementById('menu-compile-to-matlab');

    var optionEnableDynamicAllocation = document.getElementById('enable-dynamic-allocation');
    var optionUsePassSystem = document.getElementById('use-pass-system');
    var target = document.getElementById('target');

    var tryItBody = document.getElementById('try-it');
    var copyrightBody = document.getElementById('about');

    var fontSizeCombo = document.getElementById('font_size');

    var canRun = true;

    var matlabMenuTrigger = document.getElementById('matlab-menu-trigger');
    var laraMenuTrigger = document.getElementById('lara-menu-trigger');
    var resultMenuTrigger = document.getElementById('result-menu-trigger');
    var filesMenuTrigger = document.getElementById('files-menu-trigger');

    var matlabMenu = document.getElementById('matlab-menu');
    var laraMenu = document.getElementById('lara-menu');
    var resultMenu = document.getElementById('result-menu');
    var filesMenu = document.getElementById('files-menu');

    var uploadMatlabFile = document.getElementById('upload-matlab-file');
    var uploadLaraFile = document.getElementById('upload-lara-file');

    menuTryIt.addEventListener('click', function () {
        menuTryIt.classList.add('active');
        menuCopyright.classList.remove('active');

        tryItBody.style.display = '';
        menuSectionOptions.style.visibility = '';
        copyrightBody.style.display = 'none';
    });

    menuCopyright.addEventListener('click', function () {
        menuTryIt.classList.remove('active');
        menuCopyright.classList.add('active');

        tryItBody.style.display = 'none';
        menuSectionOptions.style.visibility = 'hidden';
        copyrightBody.style.display = 'block';
    });

    var language = "c";

    menuCompileToMatlab.addEventListener('click', function () {
        if (!canRun)
            return;

        startWaitForResults(menuCompileToMatlab);

        var args = {
            lara: laraEditor.getValue(),
            matlab: mEditor.getValue()
        };

        language = "matlab";
        runCommand(RUN_WEAVER_PATH, "matlab", args);
    });

    menuCompileToC.addEventListener('click', function () {
        if (!canRun)
            return;

        startWaitForResults(menuCompileToC);

        var args = {
            lara: laraEditor.getValue(),
            matlab: mEditor.getValue(),
            types: '',
            matrices: optionEnableDynamicAllocation.checked ? 'dynamic' : 'static',
            'use_pass_system': optionUsePassSystem.checked
        };

        language = "c_cpp";
        runCommand(RUN_COMPILER_PATH, "c_cpp", args);
    });
    menuCompileToCL.addEventListener('click', function () {
        if (!canRun)
            return;

        startWaitForResults(menuCompileToCL);

        var args = {
            lara: laraEditor.getValue(),
            matlab: mEditor.getValue(),
            types: '',
            matrices: optionEnableDynamicAllocation.checked ? 'dynamic' : 'static',
            'use_pass_system': true,
            'use_cl': true,
            'target': target.value
        };

        language = "c_cpp";
        runCommand(RUN_COMPILER_PATH, "c_cpp", args);
    });

    fontSizeCombo.addEventListener('change', function () {
        var choice = this.options[this.selectedIndex].value;

        mEditor.setFontSize(choice);
        laraEditor.setFontSize(choice);
        consoleOut.setFontSize(choice);
        finalResult.setFontSize(choice);
    });

    uploadMatlabFile.addEventListener('click', function () {
        uploadFile(mEditor);
    });

    uploadLaraFile.addEventListener('click', function () {
        uploadFile(laraEditor);
    });

    setMenuTrigger(matlabMenuTrigger, matlabMenu);
    setMenuTrigger(laraMenuTrigger, laraMenu);
    setMenuTrigger(resultMenuTrigger, resultMenu);
    setMenuTrigger(filesMenuTrigger, filesMenu);

    var expanders = document.querySelectorAll('.expander');
    for (var i = 0; i < expanders.length; ++i) {
        var expander = expanders[i];

        expander.addEventListener('click', function (evt) {
            var target = this.getAttribute('data-target');
            var targetElement = document.getElementById(target);
            var faIcon = this.querySelector('.fa');

            if (targetElement.classList.contains('show')) {
                targetElement.classList.remove('show');
                faIcon.classList.remove('fa-chevron-down');
                faIcon.classList.add('fa-chevron-left');
            } else {
                targetElement.classList.add('show');
                faIcon.classList.add('fa-chevron-down');
                faIcon.classList.remove('fa-chevron-left');
            }
        });

        expander.addEventListener('mousedown', function (evt) {
            evt.preventDefault();
        });
    }

    var selectMatlabExamples = document.querySelectorAll('.load-matlab-example');
    for (var i = 0; i < selectMatlabExamples.length; ++i) {
        var selectMatlabExample = selectMatlabExamples[i];

        selectMatlabExample.addEventListener('click', function (evt) {
            loadMatlabExample(this.innerHTML);
        });
    }

    var selectLaraExamples = document.querySelectorAll('.load-lara-example');
    for (var i = 0; i < selectLaraExamples.length; ++i) {
        var selectLaraExample = selectLaraExamples[i];

        selectLaraExample.addEventListener('click', function (evt) {
            var target = this.getAttribute('data-filename') || this.innerHTML;
            loadLaraExample(target);
        });
    }

    // Initialization.
    var fontSize = '12px';

    // Create editors for matlab, lara, final result, type definition and console.
    var laraEditor = newAceEditor("laraEditor", "lara", "chrome", fontSize);
    loadLaraExample('SmartDefineTypes.lara')
    var finalResult = newAceEditor("resultEditor", "text", "chrome", fontSize);
    var consoleOut = newAceEditor("outputLog", "text", "twilight", fontSize);
    consoleOut.renderer.setShowGutter(false);
    consoleOut.setReadOnly(true);
    var mEditor = newAceEditor("matlabEditor", "matlab", "chrome", fontSize);


    //Save changes in browser for matisse
    var matisseCodeCache = new PreserveCode("matisse", matlabEditor);
    if (!matisseCodeCache.hasSavedContent()) {
        loadMatlabExample('matmul.m');
    }

    /***************************LS***************************/
    var BASE_LS_JSON_URL = 'MWeaver.json';

    loadLsJson(BASE_LS_JSON_URL);
    /***************************LS***************************/
})();