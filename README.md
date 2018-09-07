# 2018-TFG-Alvaro-Paniagua


## Introduction

WebSim is a web tool for Robotic programming learning. Includes a graphic simulator based on AFRAME framework and a code editor
using ACE Editor.

WebSim uses different frameworks:
  - NodeJS (4.2.6)
  - AFRAME (0.8.2)
  - ACE Editor (1.3.3)
  - OpenCV JS (3.3.1)
  - jQuery (3.3.1)


## Requirements

- First install NodeJS, open a terminal and type the next commands:
    - Ubuntu / Linux distributions
~~~
    sudo apt-get update
    sudo apt-get install nodejs
    sudo apt-get install npm
~~~

    - Windows: Go to the [next](https://nodejs.org/es/download/) link and click on ***Windows installer***.


- Clone this repo in your PC from https://github.com/RoboticsURJC-students/2018-tfg-alvaro_paniagua

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

Now write your code using the API shown below.

## API

To run the robot we provide a API to make it simple to execute some commands on the robot.

Here i add an example of code to getting started with the robot. The code above just creates a new RobotI object, initiates 3 raycasters and move robot describing a circle.

~~~
  var myRobot = new RobotI('a-pibot');
  myRobot.startRaycasters(1, 3);
  myRobot.move(0.5, 0.5);
~~~

The robot the following interfaces, some of them are not callable:

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

### Position sensors:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| startRaycasters(distance, numOfRaycasters) | This method sets up a given number of raycaster which far property is given by distance | distance: Distance for every raycaster (meters) / numOfRaycasters: Number of raycasters to check intersections. | Float , Float | myRobotInstance.startRaycasters(1, 7) |
| stopRaycaster() | This method erases all raycaster properties, disables sensor | - | - | myRobotInstance.stopRaycaster() |
| setListener() | This method is not callable, sets a listener for the event 'intersection-detected-id' and 'intersection-cleared-id' and gets distance emitted by event or null, every single raycaster has its own custom event. | - | - | Not in use |
| getDistance() | This method returns the distance (float) between robot and the raycaster intersection in the center. | - | - | myRobotInstance.getDistance() |
| getDistances() | This method returns the distance (float) between robot and each raycaster intersection. | - | - | myRobotInstance.getDistances() |
| stopRaycasters() | This method erases all raycaster properties, disables sensor | - | - | myRobotInstance.stopRaycasters() |
| createRaycaster( distance, angle, emptyEntity, group, number) | This method creates a single raycaster. Not callable. | distance, angle, group and number are raycaster properties, emptyEntity is the entity where raycaster will be appended. | Float, Float, String, Integer, HTML object | Not in use |
| setListener() | This method creates event listener for every raycaster. Not callable. | - | - | Not in use |
| updateDistance() | This method update distances catched by raycasters. Not callable. | - | - | Not in use |
| eraseDistance() | This method erases distance entry when 'intersection-cleared' event fires up for a raycaster. Not callable. | - | - | Not in use |
| removeListeners() | This method removes event listener for all raycasters. Not callable. | - | - | Not in use. |
| getPosition() | This method returns the position of the robot and rotation on Y axis as JS object. | - | - | myRobotInstance.getDistance() |

*This API usage is shown at the Youtube videos below.*

## Youtube videos


OpenCV functionality with JS code: [Websim with OpenCV](https://www.youtube.com/watch?v=7y5X0LIvkik&t=3s)

Follow line algorithm: [Follow Line](https://youtu.be/7vfqN4fS5FU)

Raycaster first example: [Pibot detecting object](https://www.youtube.com/watch?v=OdjiArnrKoY)

Pibot moving between walls: [Raycaster examples](https://youtu.be/2O_4U86pe2M)

New raycaster behavior: [Raycaster getDistance](https://www.youtube.com/watch?v=jSG7ly4C_qk)

Arc of raycasters detecting a wall: [Avoiding walls](https://www.youtube.com/watch?v=BaFc_mYDkS4)
