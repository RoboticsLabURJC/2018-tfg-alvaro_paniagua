/*
  This file sets up Blockly and ACE editors and manages their functions.

  This file provide 2 functions:
  - runCode: extracts code from Blockly or ACE editors and runs in browser.
  - changeEditor: Toggle editor between Blockly and ACE.
  - setupBlockly: Initial sets up Blockly workspace.
*/
var xhr = new XMLHttpRequest();
var workSpaceTemplate = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="1$KO!zx`GQ.w$)M[ab?^">mainInterval</variable></variables><block type="variables_set" id="?IKv~cxbXjz:8dZFcO[%" x="9" y="73"><field name="VAR" id="1$KO!zx`GQ.w$)M[ab?^" variabletype="">mainInterval</field><value name="VALUE"><block type="set_interval" id="7fxU+:oqBL0J0oHZD1Fj"><field name="TIME">100</field></block></value></block></xml>';
var runningCode = false;
var reservedVariables = ['myRobot,', 'mainInterval,', 'myRobot;', 'mainInterval;'];

var ajaxreq = new XMLHttpRequest();
var demoWorkspace ="";

$(document).ready(function setupBlockly(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

  demoWorkspace = Blockly.inject('blockly-div', {
    media: 'google-blockly/media/',
    toolbox: document.getElementById('toolbox'),
    zoom:
         {
           controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        },
    trashcan: true,
    horizontalLayout: true,
    scrollbars: true
  });
  var xmlToInject = Blockly.Xml.textToDom(workSpaceTemplate);

  Blockly.Xml.domToWorkspace(xmlToInject, demoWorkspace);

  var blocklyEditor = $("#blockly-div");
  blocklyEditor.css("display", "none");
});

function blocklyToPython(){
  var pythonContent;

  if($("#ace").css("display") === "none"){
    pythonContent = Blockly.Python.workspaceToCode(demoWorkspace);
  }
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       console.log("Python file created.")
    }
  };
  xhr.open("POST", "http://localhost:8000/toPython", true);
  xhr.send(pythonContent);
}

function changeEditor(){
  var blocklyEditor = $("#blockly-div");
  var aceEditor = $("#ace");

  if(blocklyEditor.css("display") === "none"){
    aceEditor.fadeOut("slow");
    blocklyEditor.fadeIn("slow");
  }else{
    aceEditor.fadeIn("slow");
    blocklyEditor.fadeOut("slow");
  }

}

function runCode(){

  var editor = ace.edit("ace");
  var content = null;
  var container = document.getElementById("scriptContainer");

  if($("#ace").css("display") === "none"){
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    content = Blockly.JavaScript.workspaceToCode(demoWorkspace);

  }else{
    content = editor.getValue();
  }

  if(!runningCode){
    content = cleanRedefinition(content);
    eval(content);
    runningCode = true;
  }else{
    console.log("Code already running, stop it first");
  }
}

var mainInterval;

function stopCode(){
/*
  This function stops the code and the robot.
*/
  clearInterval(mainInterval);
  myRobot.move(0,0);
  runningCode = false;
}

function cleanRedefinition(scriptContent){
/*
  This function removes redefinition of variables "myRobot" and "mainInterval"
*/
  var contentSplitted = scriptContent.split("\n");
  var definitionLine = contentSplitted[0].split(" ");
  reservedVariables.forEach((variable, position)=>{
    var index = definitionLine.indexOf(variable);
    if(index != -1){
      if(position == 0 || position == 1){
        definitionLine[index] = "";
      }else{
        definitionLine[index] = "dummyVariable;"
      }
    }
  });

  contentSplitted[0] = definitionLine.join(" ");
  return contentSplitted.join("\n");
}
