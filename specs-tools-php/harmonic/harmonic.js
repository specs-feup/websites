// Initialization.
var fontSize = '12px';

/**ACE Editor Initializer**/
var $ = document.getElementById.bind(document);
var dom = require("ace/lib/dom");
//add command to all new editor instaces
require("ace/commands/default_commands").commands.push({
name: "Toggle Fullscreen",
bindKey: "F11",
exec: function(editor) {
	var bottomBar = document.getElementById("SponsorBottomBar");
	var topBar = document.getElementById("TopBar");
	if(bottomBar.style.visibility=='hidden')
		bottomBar.style.visibility= 'visible';
	else bottomBar.style.visibility= 'hidden';
	
	if(topBar.style.visibility=='hidden')
		topBar.style.visibility= 'visible';
	else topBar.style.visibility= 'hidden';
	
    dom.toggleCssClass(document.body, "fullScreen");
    dom.toggleCssClass(editor.container, "fullScreen");
    editor.resize();
  }
});


//Define the 'compare' div as a mergely div
var jQueryDoc = jQuery(document);
jQueryDoc.ready(function () {
	jQuery('#compare').mergely({
		cmsettings: { readOnly: true, lineNumbers: true },
		autoresize: true,
		autoupdate: true,
		editor_width: '420px',
		editor_height: '300px'
		//lhs: function(setValue) {
		//	setValue('beginning');
		//},
		//rhs: function(setValue) {
		//	setValue('beginning');
		//}
	});
});

// Event handler for showing/hidding the compare div
var compareTDEl = document.getElementById('compareTD');
		compareTDEl.style.width = "1px";
var compareEl = document.getElementById('compare');
		compareEl.style.visibility = 'hidden';
		
function showDiffOnCheck(e){
	if(e.checked){
		var compareElTD = document.getElementById('compareTD');
		compareElTD.style.width = "auto";
		var compareEl = document.getElementById('compare');
		compareEl.style.visibility = 'visible';

	}else{
	   // TODO - hide blank space left by the div
		var compareTDEl = document.getElementById('compareTD');
		compareTDEl.style.width = "1px";
		var compareEl = document.getElementById('compare');
		compareEl.style.visibility = 'hidden';
	}
}


// Create editors for c, lara, final result and console.
var laraEditor = newAceEditor("laraEditor","lara","chrome",fontSize);
var finalResult = newAceEditor("finalResult","c_cpp","chrome",fontSize);
var consoleOut = newAceEditor("console","text","twilight",fontSize);
consoleOut.renderer.setShowGutter(false);
consoleOut.setReadOnly(true);
var cEditor = newAceEditor("cEditor","c_cpp","chrome",fontSize);

// Initializes selected divs as ace (text) editors.
function newAceEditor(name,mode,theme,fontSize){
  var editor = ace.edit(name);
  editor.setTheme("ace/theme/"+theme);
  editor.session.setMode("ace/mode/"+mode);
  document.getElementById(name).style.fontSize=fontSize;
  return editor;
}





// Function that creates the XMLHttpRequest instance. 
function getXMLHttpRequest() {
  
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xhr=new XMLHttpRequest();
  }
  else {
    // code for IE6, IE5
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}

/*************************************************
*
*           HANDLERS
*
*/

// Handler for the combo box that controls the font size of the editors.
function fontSizeOnChange(font_size){

  var choice = font_size.options[font_size.selectedIndex].value;
  
  cEditor.setFontSize(choice);
  laraEditor.setFontSize(choice);
  consoleOut.setFontSize(choice);
  finalResult.setFontSize(choice);
}


// Handler for the C file uploader.
function cUploadOnChange(e) {

  var file = e.files[0];

  if(file.name.indexOf(".c") < 0){
    alert("Use only .c files!");
    return false;
  }
  
  reader = new FileReader();

  reader.onload = function (event) {
    
    var f = event.target;
    cEditor.setValue(event.target.result);
    cEditor.gotoLine(0);
  };
  
  reader.readAsText(file);
  return true;
}

// Handler for the LARA file uploader.
function laraUploadOnChange(e) {
  
  var file = e.files[0];

  if(file.name.indexOf(".lara") < 0){
    alert("Use only .lara files!");
    return false;
  }
  
  reader = new FileReader();

  reader.onload = function (event) {
    
    var f = event.target;
    laraEditor.setValue(event.target.result);
    laraEditor.gotoLine(0);
  };
  
  reader.readAsText(file);
  return true;
}

// Event handler for the combo box of the C example files.
function cComboOnChange(e) {
  
  var choice = e.options[e.selectedIndex];
  if ( choice.value == ""){
    return false;
  }
  
  var file_path = "../../examples/harmonic/c/" + choice.value;
  xmlhttp = getXMLHttpRequest();
  
  xmlhttp.onreadystatechange=function() {
    
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var fileContent = xmlhttp.responseText;
      cEditor.setValue(fileContent);
      cEditor.gotoLine(0);
    }
  }
  
  xmlhttp.open("GET",file_path, true);
  xmlhttp.send();
}

// Event handler for the combo box of the LARA example files.
function laraComboOnChange(e) {
  
  var choice = e.options[e.selectedIndex];
  if ( choice.value == ""){
    return false;
  }
  
  var file_path = "../../examples/harmonic/lara/" + choice.value;
  
  xmlhttp = getXMLHttpRequest();
  
  xmlhttp.onreadystatechange=function() {
    
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      var fileContent = xmlhttp.responseText;
      laraEditor.setValue(fileContent);
      laraEditor.gotoLine(0);
    }
  }
  
  xmlhttp.open("GET",file_path, true);
  xmlhttp.send();
}

/*************************************************
*
*           RUNNERS
*
*/
// Run Harmonic and returns C code
//encodeURIComponent()
function runC(e){
  disableRuns();

  //Clear the  diff
  jQuery('#compare').mergely('clear','lhs');
  jQuery('#compare').mergely('clear','rhs');
  //jQuery('#compare').mergely('lhs',obj.originalCode);
  //jQuery('#compare').mergely('rhs',obj.output);
  
  var args = { 	lara: laraEditor.getValue(),
            	c: cEditor.getValue()};
  var jsonArgs = JSON.stringify(args);
  
  jsonArgs = encodeURIComponent(jsonArgs);
  var runRequest = getXMLHttpRequest();
  
  runRequest.onreadystatechange = function (){
    
    if (runRequest.readyState==4 && runRequest.status==200) {
      
      var fileContent = runRequest.responseText;
      var obj = JSON.parse(fileContent);
      
      finalResult.setValue(obj.output);
      consoleOut.setValue(obj.console);
      enableRuns();
	  
	  //Add  compare the input file and the output file
	  jQuery('#compare').mergely('lhs',obj.originalCode);
	  jQuery('#compare').mergely('rhs',obj.output);
    }
  };
  
  var params = "args="+jsonArgs;
  runRequest.open("POST","../../requests/harmonic/runHarmonic.php", true);
  
  runRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  runRequest.setRequestHeader("Content-length", params.length);
  runRequest.setRequestHeader("Connection", "close");  
  
  runRequest.send(params);
}

// Disable all run buttons
function disableRuns(){
  var cImage = document.getElementById("runCImage");
  var cArea = document.getElementById("runCArea");
  cImage.src = "../../img/arrow-down-gray.png";
  cArea.onclick=undefined;
}
// Enable all run buttons
function enableRuns(){
  var cImage = document.getElementById("runCImage");
  var cArea = document.getElementById("runCArea");
  cImage.src = "../../img/arrow-down.png";
  cArea.onclick=runC;
}
