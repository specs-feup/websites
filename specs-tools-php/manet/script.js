(function () {
    'use strict';

    var RUN_COMPILER_PATH = 'runManetNew.php';
    var BASE_C_EXAMPLE_URL = 'c/';
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

    var runCommand = function (path, outputMode, args) {
        var jsonArgs = encodeURIComponent(JSON.stringify(args));

        var runRequest = new XMLHttpRequest();

        runRequest.onreadystatechange = function () {
            if (runRequest.readyState === 4) {
                try {
                    if (runRequest.status === 200) {
                        var fileContent = runRequest.responseText;
                        var obj = JSON.parse(fileContent);

                        finalResult.session.setMode("ace/mode/" + outputMode);
                        finalResult.setValue(obj.output);
                        consoleOut.setValue(obj.console);
                    } else {
                        consoleOut.setValue('Could not run MANET.\n' + runRequest.status + ": " + runRequest.statusText);
                    }
                } catch (e) {
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
            consoleOut.setValue('Could not run MANET. Got exception: ' + e.name);
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
                target.setValue(e.target.result);
            };
            reader.readAsText(file);
        });
        selectFile.click();
    }

    var loadCExample = function (example) {
        var file_path = BASE_C_EXAMPLE_URL + example;

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var fileContent = xmlHttp.responseText;
                cEditor.setValue(fileContent);
                cEditor.gotoLine(0);
            }
        }

        xmlHttp.open("GET", file_path, true);
        xmlHttp.send();
    }

    var loadLaraExample = function (example) {
        var file_path = BASE_LARA_EXAMPLE_URL + example;

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

    var formatOutput = document.getElementById('format-output');

    var tryItBody = document.getElementById('try-it');
    var copyrightBody = document.getElementById('about');

    var fontSizeCombo = document.getElementById('font_size');

    var canRun = true;

    var cMenuTrigger = document.getElementById('c-menu-trigger');
    var laraMenuTrigger = document.getElementById('lara-menu-trigger');

    var cMenu = document.getElementById('c-menu');
    var laraMenu = document.getElementById('lara-menu');

    var uploadCFile = document.getElementById('upload-c-file');
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

    menuCompileToC.addEventListener('click', function () {
        if (!canRun)
            return;

        startWaitForResults(menuCompileToC);

        var args = {
            lara: laraEditor.getValue(),
            c: cEditor.getValue(),
            format: formatOutput.checked,
        };

        runCommand(RUN_COMPILER_PATH, "c_cpp", args);
    });

    fontSizeCombo.addEventListener('change', function () {
        var choice = this.options[this.selectedIndex].value;

        cEditor.setFontSize(choice);
        laraEditor.setFontSize(choice);
        consoleOut.setFontSize(choice);
        finalResult.setFontSize(choice);
    });

    uploadCFile.addEventListener('click', function () {
        uploadFile(cEditor);
    });

    uploadLaraFile.addEventListener('click', function () {
        uploadFile(laraEditor);
    });

    setMenuTrigger(cMenuTrigger, cMenu);
    setMenuTrigger(laraMenuTrigger, laraMenu);

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

    var selectCExamples = document.querySelectorAll('.load-c-example');
    for (var i = 0; i < selectCExamples.length; ++i) {
        var selectCExample = selectCExamples[i];

        selectCExample.addEventListener('click', function (evt) {
            var target = this.getAttribute('data-filename') || this.innerHTML;
            loadCExample(target);
        });
    }

    var selectLaraExamples = document.querySelectorAll('.load-lara-example');
    for (var i = 0; i < selectLaraExamples.length; ++i) {
        var selectLaraExample = selectLaraExamples[i];

        selectLaraExample.addEventListener('click', function (evt) {
            loadLaraExample(this.innerHTML);
        });
    }

    // Initialization.
    var fontSize = '12px';

    // Create editors for c, lara, final result, type definition and console.
    var laraEditor = newAceEditor("laraEditor", "lara", "chrome", fontSize);
    loadLaraExample('EmptyAspect.lara')
    var finalResult = newAceEditor("resultEditor", "text", "chrome", fontSize);
    var consoleOut = newAceEditor("outputLog", "text", "twilight", fontSize);
    consoleOut.renderer.setShowGutter(false);
    consoleOut.setReadOnly(true);
    var cEditor = newAceEditor("cEditor", "c_cpp", "chrome", fontSize);

    //Save changes in browser for manet
    var manetCodeCache = new PreserveCode("manet", "cEditor");
    if (!manetCodeCache.hasSavedContent()) {
        loadCExample('empty_main.c');
    }

    /***************************LS***************************/
    var BASE_LS_JSON_URL = 'CetusWeaver.json';

    loadLsJson(BASE_LS_JSON_URL);
    /***************************LS***************************/
})();