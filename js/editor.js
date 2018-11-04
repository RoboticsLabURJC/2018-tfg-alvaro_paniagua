/*
  This file sets up Blockly and ACE editors and manages their functions.

  This file provide 2 functions:
  - startStopCode: starts or stop the code from blockly workspace.
  - setupBlockly: Initial set up Blockly workspace.
*/
var workSpaceTemplate = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="l~TjU+xA#6DmIFILBYRu">mainInterval</variable></variables><block type="variables_set" id="`.Eqw44X*jK2Mn,daBr#" x="18" y="83"><field name="VAR" id="l~TjU+xA#6DmIFILBYRu" variabletype="">mainInterval</field><value name="VALUE"><block type="set_interval" id="=ZtFT}Y*9Mpu$rwaQh~T"></block></value></block></xml>';

var play = false;
var reservedVariables = ['myRobot,', 'mainInterval,', 'myRobot;', 'mainInterval;'];
var mainInterval;
var demoWorkspace ="";

$(document).ready(function setupBlockly(){
/*
  This function sets up Blockly editor.
  It configures toolbox and injects a template
*/

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
});

function startStopCode(){

  if(!play){
    var content = null;
    var container = document.getElementById("scriptContainer");

    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    content = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    content = cleanRedefinition(content);
    play = true;
    eval(content);
  }else{
    clearInterval(mainInterval);
    myRobot.move(0,0);
    play = false;
    console.log("Execution stopped.")
  }
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

/*
The next functions is only for develop purposes.

function showMe(){
  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
  var xmlt_text = Blockly.Xml.domToText(xml);

  console.log(xmlt_text);
}

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
*/
