var loadLsJson = (function () {
    'use strict';

    var lsView = document.getElementById('lsView');
    var joinPoints = document.getElementById('joinpoints');
    var attributesList = document.getElementById('attributes');
    var attrDiv = document.getElementById('attrDiv');
    var selectsList = document.getElementById('selects');
    var selDiv = document.getElementById('selDiv');
    var actionsList = document.getElementById('actions');
    var actDiv = document.getElementById('actDiv');
    var rootNode = undefined;
    var toggleLS = document.getElementById('toggle-ls');
    var closeLS = document.getElementById('closeLS');

    function toggleLSEvent() {
        lsView.classList.toggle('invisible');
        lsView.classList.toggle('lsView');
    }

    closeLS.addEventListener('click', toggleLSEvent);
    toggleLS.addEventListener('click', toggleLSEvent);

//    if (toggleLS !== null) {
    //      toggleLS.addEventListener('click', toggleLSEvent);
    // }


    function getIndexOfOption(select, label) {
        var options = select.getElementsByTagName('option');
        for (var i = 0; i < options.length; ++i) {
            if (options[i].value === label) {
                return i;
            }
        }
        return -1;
    }

    function makeJoinPointNode(label) {
        var bNode = document.createElement('a');
        bNode.classList.add('select');
        bNode.addEventListener('click', function () {
            var index = getIndexOfOption(joinPoints, label);
            joinPoints.selectedIndex = index;
            var evt = document.createEvent('HTMLEvents');

            evt.initEvent('change', true, true);
            joinPoints.dispatchEvent(evt);
        });

        bNode.appendChild(document.createTextNode(label));

        return bNode;
    }

    function addDeclarationNode(parent, declaration) {
        parent.appendChild(document.createTextNode(declaration.name + ": "));
        if (declaration.type === 'Global') {
            parent.appendChild(makeJoinPointNode(declaration.type));
        } else {
            var bNode = document.createElement('b');
            bNode.appendChild(document.createTextNode(declaration.type));
            parent.appendChild(bNode);
        }
    }

    function addAttributes(attributes) {

        var isEmpty = attributes.length === 0;
        attrDiv.classList.toggle("invisible", isEmpty);
        if (isEmpty) {
            return;
        }
        attributesList.innerHTML = '';
        for (var a in attributes) {
            var attribute = attributes[a];

            var li = document.createElement("li");

            var children = attribute.children;
            var declaration = children[0];

            addDeclarationNode(li, declaration);
            if (children.length > 1) {
                li.appendChild(document.createTextNode('('));
                for (var i = 1; i < children.length - 1; i++) {
                    declaration = children[i];
                    addDeclarationNode(li, declaration);
                    li.appendChild(document.createTextNode(', '));
                }
                declaration = children[children.length - 1];
                addDeclarationNode(li, declaration);
                li.appendChild(document.createTextNode(')'));
            }
            if ('tooltip' in attribute) {
                li.appendChild(document.createElement('br'));
                var shortDocumentation = document.createElement('span');
                shortDocumentation.classList.add('joinpoint-short-documentation');
                shortDocumentation.appendChild(makeDocumentation(attribute.tooltip));
                li.appendChild(shortDocumentation);
            }

            attributesList.appendChild(li);
        }

    }

    function addSelects(selects) {

        var isEmpty = selects.length === 0;
        selDiv.classList.toggle("invisible", isEmpty);
        if (isEmpty) {
            return;
        }
        selectsList.innerHTML = '';
        for (var s in selects) {
            var select = selects[s];

            var li = document.createElement("li");

            var span = document.createElement("span");
            if (select.alias !== '') {
                span.appendChild(document.createTextNode(select.alias + ': '));
            }
            span.appendChild(makeJoinPointNode(select.clazz));
            li.appendChild(span);

            if ('tooltip' in select) {
                li.appendChild(document.createElement('br'));
                var shortDocumentation = document.createElement('span');
                shortDocumentation.classList.add('joinpoint-short-documentation');
                shortDocumentation.appendChild(makeDocumentation(select.tooltip));
                li.appendChild(shortDocumentation);
            }

            selectsList.appendChild(li);
        }
    }

    function addActions(actions) {

        var isEmpty = actions.length === 0;
        actDiv.classList.toggle("invisible", isEmpty);
        if (isEmpty) {
            return;
        }
        actionsList.innerHTML = '';
        for (var a in actions) {
            var action = actions[a];

            var li = document.createElement("li");

            var liText = "";
            var children = action.children;
            var declaration = children[0];
            liText = '<b>' + declaration.type + "</b> " + declaration.name;
            liText += "(";
            if (children.length > 1) {
                for (var i = 1; i < children.length - 1; i++) {
                    declaration = children[i];
                    liText += '<b>' + declaration.type + "</b> " + declaration.name;
                    liText += ", ";
                }
                declaration = children[children.length - 1];
                liText += '<b>' + declaration.type + "</b> " + declaration.name;
            }
            liText += ")";

            var span = document.createElement("span");
            span.innerHTML = liText;
            li.appendChild(span);

            if ('tooltip' in action) {
                li.appendChild(document.createElement('br'));
                var shortDocumentation = document.createElement('span');
                shortDocumentation.classList.add('joinpoint-short-documentation');
                shortDocumentation.appendChild(makeDocumentation(action.tooltip));
                li.appendChild(shortDocumentation);
            }

            actionsList.appendChild(li);
        }

    }

    function makeDocumentation(text) {
        // In the future, text might become HTML or something like that
        // For now, assume plain text

        return document.createTextNode(text);
    }

    /**
     * @param a first object
     * @param b second object
     * function to define how the values are sorted in the Language Specification
     */
    function compareObjectsFunction(a, b) {
        if (a.children === undefined || b.children === undefined) {
            return 0;
        }
        if (a.children[0].name < b.children[0].name)
            return -1;
        if (a.children[0].name > b.children[0].name)
            return 1;
        return 0;
    }

    function addSpecification(joinpoint) {
        var jpChildren = joinpoint.children;
        var attributes = [];
        var selects = [];
        var actions = [];
        for (var s in jpChildren) {
            var spec = jpChildren[s];
            switch (spec.type) {
                case 'attribute':
                    attributes.push(spec);
                    break;
                case 'select':
                    selects.push(spec);
                    break;
                case 'action':
                    actions.push(spec);
                    break;
            }
        }
        var joinPointName = document.getElementById('joinpoint-name');
        joinPointName.innerHTML = '';
        joinPointName.appendChild(document.createTextNode(joinpoint.name));
        var joinPointExtends = document.getElementById('joinpoint-extends');
        if (joinpoint.extends === '') {
            joinPointExtends.style.display = 'none';
        } else {
            joinPointExtends.style.display = '';

            var joinPointBase = document.getElementById('joinpoint-base');
            joinPointBase.innerHTML = '';
            joinPointBase.appendChild(makeJoinPointNode(joinpoint.extends));
        }

        var joinPointShortDescription = document.getElementById('joinpoint-short-description');
        joinPointShortDescription.innerHTML = '';
        if ('tooltip' in joinpoint) {
            joinPointShortDescription.appendChild(makeDocumentation(joinpoint.tooltip));
        }

        var joinPointDefaultAttr = document.getElementById('joinpoint-default-attr');
        if (joinPointDefaultAttr !== null) {
            joinPointDefaultAttr.innerHTML = '';

            if ('defaultAttr' in joinpoint) {
                joinPointDefaultAttr.innerHTML += "<br>Default attribute: <b>" + joinpoint.defaultAttr + "</b>";
            }

        }


        //Sort the attributes, selcts and actions alhabetically
        attributes.sort(compareObjectsFunction);
        selects.sort(compareObjectsFunction);
        actions.sort(compareObjectsFunction);

        addAttributes(attributes);
        addSelects(selects);
        addActions(actions);
    }

    function addJoinPoint(content) {
        var option = document.createElement("option");
        option.text = content;
        joinPoints.add(option);
    }

    function loadLsJson(baseUrl) {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                var fileContent = xmlHttp.responseText;
                //console.log("JSON parse2:" + fileContent);
                rootNode = JSON.parse(fileContent);

                var children = rootNode.children;
                var rootIndex = 0;
                for (var i in children) {
                    var child = children[i];
                    addJoinPoint(child.name);
                    if (child.name === rootNode.root) {
                        rootIndex = i;
                    }
                }
                joinPoints.selectedIndex = rootIndex;

                addSpecification(rootNode.children[rootIndex]);
            }
        };

        xmlHttp.open("GET", baseUrl, true);
        xmlHttp.send();
    }

    joinPoints.addEventListener('change', function () {
        var index = joinPoints.selectedIndex;
        var child = rootNode.children[index];
        addSpecification(child);
    });

    return loadLsJson;

})();

// Functions related with script type (i.e. LARA or JS)
function getScriptType() {
    var selectValue = document.getElementById("input_type");
    return selectValue.options[selectValue.selectedIndex].value;
}

/*
function onScriptTypeChange() {
    let scriptType = getScriptType();

    var labelText = undefined;
    if (scriptType === "js") {
        labelText = "JavaScript";
    } else if (scriptType === "lara") {
        labelText = "LARA";
    } else {
        labelText = "Not defined for type '" + scriptType + "'";
    }

    // Update label on script editor
    document.getElementById("source_script_type").textContent = labelText;
}
*/