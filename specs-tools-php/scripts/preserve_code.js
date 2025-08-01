var DEFAULT_CODE_EDITOR_NAME = "codeEditor";
var LARA_EDITOR_NAME = "laraEditor";

/**
 * Class instance to implement a listener for every page
 * @param {*} tool One of the following tools: clava, kadabra, matisse, manet, ...
 */
var PreserveCode = function(tool, codeEditorName) {
    this.codeEditorName = codeEditorName || DEFAULT_CODE_EDITOR_NAME;

    this.cookie = new Cookie(tool, generatePageId(128), "", "");
    this.getEditors();
    this.setCodeInEditors();
    this.setListeners();
    this.overwrite = true; //change to false if the confirm overwrite dialog is uncommented
    return this;
}

PreserveCode.prototype.hasSavedContent = function() {
    return this.cookie.content.sC.length > 0 || this.cookie.content.lC.length > 0;
}

/**
 * Get the editors in this object's variables
 */
PreserveCode.prototype.getEditors = function() {
    this.codeEditor = ace.edit(this.codeEditorName);
    this.laraEditor = ace.edit(LARA_EDITOR_NAME);

    //Instruction to disable warning
    this.codeEditor.$blockScrolling = Infinity;
    this.laraEditor.$blockScrolling = Infinity;
}

/**
 * Get updates when the text changes in the lara code
 */
PreserveCode.prototype.setListeners = function() {
    //So as to use identifier this inside nested methods, must after the editor declarations
    var tempThis = this;

    // Set listener for changes in the source code
    this.codeEditor.getSession().on('change', function() {
        tempThis.updateSourceCode(tempThis.codeEditor.getSession().getValue());
    });
    // Set listener for changes in the lara code
    this.laraEditor.getSession().on('change', function() {
        tempThis.updateLaraCode(tempThis.laraEditor.getSession().getValue());
    });

    $(window).bind("beforeunload", function(event) {
        tempThis.cookie.unload();
        //return "You have some unsaved changes";
    });
};


/**
 * Update the cookie value of the source code
 */
PreserveCode.prototype.updateSourceCode = function(newCode) {
    this.cookie.beforeUpdate(this.cookie.updateSourceCode, newCode);
    //this.cookie.updateSourceCode(newCode);
};

/**
 * Update the cookie value of the lara code
 */
PreserveCode.prototype.updateLaraCode = function(newCode) {
    this.cookie.beforeUpdate(this.cookie.updateLaraCode, newCode);
    //this.cookie.updateLaraCode(newCode);
};
/**
 * update the text fields with the code values from the cookies
 */
PreserveCode.prototype.setCodeInEditors = function() {
    this.laraEditor.setValue(this.cookie.content.lC, -1);
    this.codeEditor.setValue(this.cookie.content.sC, -1);
}

//================================Cookie Object Structure===============
var Cookie = function(name, id, sourceCode, laraCode) {
    this.originalId = id;
    this.name = name;
    this.content = { "id": id, "sC": sourceCode, "lC": laraCode, active: true };
    this.valuesSaved = true;

    this.load();
    return this;
}

/**
 * Check if the current cookie exits
 * @return boolean true if the cookie exists
 */
Cookie.prototype.exists = function() {
    return getLocalStorage(this.name) !== null;
}
Cookie.prototype.unload = function() {
    this.content.active = false;
    this.valuesSaved = false;
    this.save();
}

Cookie.prototype.load = function() {
    if (this.exists()) {
        var content = getLocalStorage(this.name);
        this.content = JSON.parse(content);
        this.content.id = this.originalId;
        this.content.active = true;
        return true;
    }
    return false;
}

Cookie.prototype.beforeUpdate = function(callFunction, newCode) {
    //Check if there were any changes
    //if (this.content.sC == newCode) { alert("equal"); return this; }

    callFunction(this, newCode);

    this.afterUpdate();
}


Cookie.prototype.updateSourceCode = function(thisInstance, newCode) {
    thisInstance.content.sC = newCode;
}

Cookie.prototype.updateLaraCode = function(thisInstance, newCode) {
    thisInstance.content.lC = newCode;
}

Cookie.prototype.afterUpdate = function() {
    this.valuesSaved = false;
    //Avoi data loss
    if (this.isOverwriting() && !this.overwrite) {
        var currentCookie = this.getSavedCookie();
        /*if (!confirm("Another tab is open.\nIt's source code is:\n" + currentCookie.sC + "\n\nAnd it's lara code is:\n" + currentCookie.lC + "\n\nDo you wish to override it with the current(if you choose yes, that behaviour will be applied as long as this window is open)?")) {
            return this;
        }
        this.overwrite = true;
        */
    }
    //Save the value
    this.save();
}

/**
 * Detectes wheter writing this cookie would cause loss of data, in that case prompt the user to choose to overwrite
 */
Cookie.prototype.isOverwriting = function() {
    if (!this.exists())
        return false;
    var tempCookieContent = JSON.parse(getLocalStorage(this.name));
    //Return true if the ids are different and the cached cookie is from an active tab
    return this.content.id != tempCookieContent.id && tempCookieContent.active == true;
}

Cookie.prototype.save = function() {
    if (!this.valuesSaved) {
        setLocalStorage(this.name, JSON.stringify(this.content));
        this.valuesSaved = true;
        console.log("updated");
    }
}

Cookie.prototype.getSavedCookie = function() {
    if (!this.exists())
        return false;
    return JSON.parse(getLocalStorage(this.name));
}

//========================FUNCTIONS
/**
 * Create a cookie that expires in exdays
 * @param {*} cname the cookie name 
 * @param {*} cvalue the cookie value
 * @param {*} exdays the number of days during which the cookie will be stored
 */
function setLocalStorage(cname, cvalue) {
    localStorage.setItem(cname, cvalue);
}

/**
 * Get a cookie value from its name, if it is set
 * @param {*} cname the cookie name
 */
function getLocalStorage(cname) {
    return localStorage.getItem(cname);
}
/**
 * Generate a random string for the page id
 * @param {*} length the number of chars in the id
 */
function generatePageId(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}