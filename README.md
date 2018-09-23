# 2018-TFG-Alvaro-Paniagua


## Introduction

WebSim is a web tool for Robotic programming learning. Includes a graphic simulator based on AFRAME framework and 2 code editors,
ACE Editor and Blockly editor.

WebSim uses different frameworks:
  - NodeJS (4.2.6)
  - AFRAME (0.8.2)
  - ACE Editor (1.3.3)
  - OpenCV JS (3.3.1)
  - jQuery (3.3.1)
  - Blockly


## Requirements


- First install NodeJS, open a terminal and type the next commands:
    1. Ubuntu / Linux distributions


    `sudo apt-get update &
     sudo apt-get install nodejs &
     sudo apt-get install npm`



    2. Windows: Go to the [next](https://nodejs.org/es/download/) link and click on ***Windows installer***.


2. Clone this repo in your PC from https://github.com/RoboticsURJC-students/2018-tfg-alvaro_paniagua

## Usage

Go to the folder you cloned and type this command:

  - Ubuntu: In a terminal change directory to ***2018-tfg-alvaro_paniagua*** and execute:
~~~
    nodejs main.js
~~~

  - Windows: In CMD console change directory to ***2018-tfg-alvaro_paniagua*** and execute:

~~~
    node main.js
~~~

Open your web browser and write this URL; ***localhost:8000***

![WebSim index page](/docs/websimScreen.png)

Now write your code using the API shown below or use Blockly blocks.

## API

To run the robot we provide a API to make it simple to execute some commands on the robot.

Here i add an example of code to getting started with the robot. The code above just creates a new RobotI object, initiates 3 raycasters and move robot describing a circle.

~~~
  var myRobot = new RobotI('a-pibot');
  myRobot.startRaycasters(1, 3);
  myRobot.move(0.5, 0.5);
~~~

Some robot interfaces are not callable, see below.

### Motors interfaces:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| setV(linearSpeed) | Sets linear speed for the robot. | linearSpeed: Linear speed for the body. | Float | myRobotInstance.setV(0.4) |
| setW(angularSpeed) | Sets angular speed for the robot. | angularSpeed: Angular speed for the body. | Float | myRobotInstance.setW(0.4) |
| setL(lateralSpeed) | Sets lateral speed for humanoids robots. | lateralSpeed: Lateral speed. | Float | myRobotInstance.setL(0.7) |
| move(linearSpeed, angularSpeed) | Sets linear and angular speed for the robot. | linearSpeed: Linear speed. / angularSpeed: Angular speed | Float , Float | myRobotInstance.move(0.7, 0.5) |
| getV() | Returns linear speed given or 0 | - | - | myRobotInstance.getV() |
| getW() | Returns angular speed given or 0 | - | - | myRobotInstance.getW() |
| getL() | Returns lateral speed given or 0 | - | - | myRobotInstance.getL() |
| setVelocity() | This method is not callable, is a continious task to set every interval the speed we give to the robot | - | - | Not in use |
| getRotation() | Returns object with the rotation on X, Y, Z axis | - | - | myRobotInstance.getRotation() |

### Camera interfaces:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| startCamera() | This method is not callable, is a task to run the getImage_async after canvas is loaded | - | - | Not in use |
| getImage_async() | This method is not callable, is a continious task to get the image from the WebGL canvas | - | - | Not in use |
| getImage() | Returns a cv.Mat() object with the data from the WebGL canvas with id "camera2" | - | - | myRobotInstance.getImage() |
| getObjectColor(color) | Returns an object with center coordinates of an object detected with color passed as argument. | color: color of the object to detect, given colors ( red, blue, green ) | string | myRobotInstance.getObjectColor("blue") |
| getColorCode(color) | Returns a matrix with RGB low and high filter for an specified color, not callable. | color: color to search on predefined understandedColors object | string | Not in use |
| followLine(lineColor, speed) | Executes a predefined follow line algorithm | colorLine: color for the line to follow / speed: linear speed for the robot | string / number | myRobotInstance.followLine("white", 0.4) |

### Position sensors:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| startRaycasters(distance, numOfRaycasters) | This method sets up a given number of raycaster which far property is given by distance | distance: Distance for every raycaster (meters) / numOfRaycasters: Number of raycasters to check intersections. | Float , Float | myRobotInstance.startRaycasters(1, 7) |
| setListener() | This method is not callable, sets a listener for the event 'intersection-detected-id' and 'intersection-cleared-id' and gets distance emitted by event or null, every single raycaster has its own custom event. | - | - | Not in use |
| getDistance() | This method returns the distance (float) between robot and the raycaster intersection in the center. | - | - | myRobotInstance.getDistance() |
| getDistances() | This method returns the distance (float) between robot and each raycaster intersection. | - | - | myRobotInstance.getDistances() |
| stopRaycasters() | This method erases all raycaster properties, disables sensor | - | - | myRobotInstance.stopRaycasters() |
| createRaycaster( distance, angle, emptyEntity, group, number) | This method creates a single raycaster. Not callable. | distance, angle, group and number are raycaster properties, emptyEntity is the entity where raycaster will be appended. | Float, Float, String, Integer, HTML object | Not in use |
| setListener() | This method creates event listener for every raycaster. Not callable. | - | - | Not in use |
| updateDistance() | This method update distances catched by raycasters. Not callable. | - | - | Not in use |
| eraseDistance() | This method erases distance entry when 'intersection-cleared' event fires up for a raycaster. Not callable. | - | - | Not in use |
| removeListeners() | This method removes event listener for all raycasters. Not callable. | - | - | Not in use. |
| getPosition() | This method returns the position of the robot and rotation on Y axis as JS object. | - | - | myRobotInstance.getPosition() |

*This API usage is shown at the Youtube videos below.*

## Blockly

In this section we explain the custom Blockly blocks created to use the Robot functions.

The new blocks are allocated on blockly editor under RobotAPI category, this category is subdivided in four new
categories, Motors, Sensors, Tools and Camera.

### Motors

![Move forward](/docs/blocklyScreenshots/setVBlock.PNG)

This block is used to move forward the robot, is equivalent to code *myRobot.setV(linSpeed)*.

![Move backward](/docs/blocklyScreenshots/setVBackBlock.PNG)

This block is used to move backward the robo, is equivalent to code *myRobot.setV(-linSpeed)*.

Every Blockly program starts with a block named *Starting point*, this block waits until
scene is loaded and executes the blocks contained, is the equivalent to the next code:

```
$('#scene').on('loaded', ()=>{
  //Code
});
```
![Starting point](/docs/blocklyScreenshots/StartingPointBlock.PNG)


## Youtube videos


OpenCV functionality with JS code: [Websim with OpenCV](https://www.youtube.com/watch?v=7y5X0LIvkik&t=3s)

Follow line algorithm: [Follow Line](https://youtu.be/7vfqN4fS5FU)

Raycaster first example: [Pibot detecting object](https://www.youtube.com/watch?v=OdjiArnrKoY)

Pibot moving between walls: [Raycaster examples](https://youtu.be/2O_4U86pe2M)

New raycaster behavior: [Raycaster getDistance](https://www.youtube.com/watch?v=jSG7ly4C_qk)

Arc of raycasters detecting a wall: [Avoiding walls](https://www.youtube.com/watch?v=BaFc_mYDkS4)

Following an object: [Object detection by color](https://www.youtube.com/watch?v=_RfJrCThpAE)

Follow line: [New follow line method by color](https://www.youtube.com/watch?v=hf0u5lENR24)

First blockly examples: [Follow line Blockly](https://www.youtube.com/watch?v=6uXuuKfNBIA)

Pibot executing follow line with Blockly: [New follow line](https://www.youtube.com/watch?v=vs2r_J27kbE)
