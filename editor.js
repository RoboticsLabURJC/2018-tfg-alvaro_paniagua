import {setupBlockly, toggleCameraDisplay, showMe} from './js/editor-methods.js'
import initGetAngularSpeedBlock from './js/customBlocks/getAngularSpeedBlock.js'
import initConsoleLogBlock from './js/customBlocks/consoleLogBlock.js'
import initGetDistanceBlock from './js/customBlocks/getDistanceBlock.js'
import initGetDistancesBlock from './js/customBlocks/getDistancesBlock.js'
import initGetImageBlock from './js/customBlocks/getImageBlock.js'
import initGetLateralSpeed from './js/customBlocks/getLateralSpeedBlock.js'
import initGetLinearSpeedBlock from './js/customBlocks/getLinearSpeedBlock.js'
import initGetObjectColorBlock from './js/customBlocks/getObjectColorBlock.js'
import initGetPositionBlock from './js/customBlocks/getPositionBlock.js'
import initGetRotationBlock from './js/customBlocks/getRotationBlock.js'
import initMoveBackwardBlock from './js/customBlocks/moveBackwardBlock.js'
import initMoveBlock from './js/customBlocks/moveBlock.js'
import initMoveForwardBlock from './js/customBlocks/moveForwardBlock.js'
import initPrintOnCanvasBlock from './js/customBlocks/printImgCanvasBlock.js'
import initReadIRBlock from './js/customBlocks/readIRBlock.js'
import initSetIntervalBlock from './js/customBlocks/setIntervalBlock.js'
import initSetTimeoutBlock from './js/customBlocks/setTimeoutBlock.js'
import initSetLateralSpeedBlock from './js/customBlocks/setLateralSpeedBlock.js'
import initStopBlock from './js/customBlocks/stopBlock.js'
import initTurnLeftBlock from './js/customBlocks/turnLeftBlock.js'
import initTurnRightBlock from './js/customBlocks/turnRightBlock.js'
import initWaitBlock from './js/customBlocks/waitBlock.js'


var demoWorkspace ="";
var workSpaceTemplate = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="l~TjU+xA#6DmIFILBYRu">mainInterval</variable></variables><block type="variables_set" id="`.Eqw44X*jK2Mn,daBr#" x="18" y="83"><field name="VAR" id="l~TjU+xA#6DmIFILBYRu" variabletype="">mainInterval</field><value name="VALUE"><block type="set_interval" id="=ZtFT}Y*9Mpu$rwaQh~T"></block></value></block></xml>';

$(document).ready(()=>{
  configureCustomBlocks();
  demoWorkspace = setupBlockly(demoWorkspace, workSpaceTemplate); // Sets up blockly editor

  // Toggle display when cambtn clicked
  $("#cambtn").click(()=>{
    toggleCameraDisplay();
  });

  $('#generator').click(()=>{
    showMe(demoWorkspace);
  });

  $('#runbtn').click(()=>{
    var codeString = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    var websimevent = new CustomEvent('code-to-run', {
      'detail': {
        'code': codeString
      }
    });
    document.dispatchEvent(websimevent);
  });

});


function configureCustomBlocks(){
  initGetAngularSpeedBlock();
  initConsoleLogBlock();
  initGetDistanceBlock();
  initGetDistancesBlock();
  initGetImageBlock();
  initGetLateralSpeed();
  initGetLinearSpeedBlock();
  initGetObjectColorBlock();
  initGetPositionBlock();
  initGetRotationBlock();
  initMoveBackwardBlock();
  initMoveBlock();
  initMoveForwardBlock();
  initPrintOnCanvasBlock();
  initReadIRBlock();
  initSetIntervalBlock();
  initSetTimeoutBlock();
  initStopBlock();
  initTurnLeftBlock();
  initTurnRightBlock();
  initWaitBlock();
  initSetLateralSpeedBlock();
}
