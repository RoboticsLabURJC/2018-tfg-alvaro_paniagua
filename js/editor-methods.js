/*
  This file sets up Blockly and ACE editors and manages their functions.

  This file provide 2 functions:
  - startStopCode: starts or stop the code from blockly workspace.
  - setupBlockly: Initial set up Blockly workspace.
*/

export function setupBlockly(workspace, workSpaceTemplate){
/*
  This function sets up Blockly editor.
  It configures toolbox and injects a template
*/
  workspace = Blockly.inject('blockly-div', {
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
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  Blockly.Xml.domToWorkspace(xmlToInject, workspace);
  return workspace;
}

export function toggleCameraDisplay(){
    var opencvCam = document.querySelector("#outputCanvas");
    var imageCamBtn = document.querySelector("#cambtn").firstChild;
    $("#outputCanvas, #spectatorDiv").toggle();
    if(opencvCam.style.display != "none"){
      imageCamBtn.src = "assets/resources/stop-camera-icon.png"
    }else{
      imageCamBtn.src = "assets/resources/play-camera-icon.png"
    }
}






export function showMe(demoWorkspace){
  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
  var xmlt_text = Blockly.Xml.domToText(xml);

  console.log(xmlt_text);
}
/*
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
