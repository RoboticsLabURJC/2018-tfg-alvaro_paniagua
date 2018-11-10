import RobotI from './js/interfacesRobot.js'
import {spectObject} from './js/spectatorComponent.js'
import {intersectionHandlerObj} from './js/intersectionHandlerComponent.js'
import {followBodyObj} from './js/followBodyComponent.js'
import {startStopCode} from './js/websim-world-controller.js'

//Websim variables
var myRobot;
var play = false;
var reservedVariables = ['myRobot,', 'mainInterval,', 'myRobot;', 'mainInterval;'];
var mainInterval;
var argument, getCodeFunction;

// Register 3 AFRAME components
AFRAME.registerComponent('spectator', spectObject);
AFRAME.registerComponent("intersection-handler", intersectionHandlerObj);
AFRAME.registerComponent("follow-body", followBodyObj);

// Declare an event listener for body-loaded and then creates robot object.
document.addEventListener('body-loaded', (bodyLoaded)=>{

  if(bodyLoaded.target.id == "a-pibot"){
    console.log("------Robot body loaded, creating myRobot instance------")
    myRobot = new RobotI('a-pibot');
  }
});

document.addEventListener('get-editor-event', (event)=>{

  getCodeFunction = event.detail["function-to-call"];
  argument = event.detail['argument'];
});


$(document).ready(()=>{
  $('#runbtn').click(()=>{
    var jsonOutput = startStopCode(play, myRobot, reservedVariables, mainInterval, getCodeFunction, argument);

    mainInterval = jsonOutput.mainInterval;
    play = jsonOutput.play;
  });

});

// Auxiliar function to implement a throttle of code.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
