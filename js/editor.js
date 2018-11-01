/*
  This file sets up Blockly and ACE editors and manages their functions.

  This file provide 2 functions:
  - runCode: extracts code from Blockly or ACE editors and runs in browser.
  - changeEditor: Toggle editor between Blockly and ACE.
*/



var ajaxreq = new XMLHttpRequest();
var demoWorkspace ="";

$(document).ready(function(){
  var editor = ace.edit("ace");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");

  demoWorkspace = Blockly.inject('blockly-div', {
    media: 'google-blockly/media/',
    toolbox: document.getElementById('toolbox'),
    zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2},
    trashcan: true,
    horizontalLayout: true,
    scrollbars: true
  });

  var blocklyEditor = $("#blockly-div");
  blocklyEditor.css("display", "none");
});

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

    console.log(content);
  }else{
    content = editor.getValue();
  }

  var dynamicScript = document.getElementById("dynamicScript");
  var newScript = document.createElement("script");
  newScript.type = "text/javascript";
  newScript.id = "dynamicScript";
  newScript.text = content ;
  
  if(dynamicScript != undefined){
    container.removeChild(dynamicScript);
  }
  container.appendChild(newScript);
}
