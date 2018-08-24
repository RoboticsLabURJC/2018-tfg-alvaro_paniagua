# 2018-TFG-Alvaro-Paniagua


## Introduction

WebSim is a web tool for Robotic programming learning. Includes a graphic simulator based on AFRAME framework and a code editor
using ACE Editor.

WebSim uses different frameworks:
  - NodeJS (4.2.6)
  - AFRAME (0.8.0)
  - ACE Editor (1.3.3)
  - OpenCV JS (3.3.1)


## Requirements

- First install NodeJS, open a terminal and type the next commands:
~~~
    sudo apt-get update
    sudo apt-get install nodejs
    sudo apt-get install npm
~~~

- Clone this repo in your PC from https://github.com/RoboticsURJC-students/2018-tfg-alvaro_paniagua

## Usage

Go to the folder you cloned and type this command:
~~~
    nodejs main.js
~~~

Open your web browser and write this URL; ***localhost:8000***

![WebSim index page](/docs/websimScreen.png)

Now write your code using the API shown below.

## API

To run the robot we provide a API to make it simple to execute some commands on the robot.

The robot has:

### Motors interfaces:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| setV(<linearSpeed>) | Sets linear speed for the robot. | linearSpeed: Linear speed for the body. | Float | myRobotInstance.setV(0.4) |
| setW(<angularSpeed>) | Sets angular speed for the robot. | angularSpeed: Angular speed for the body. | Float | myRobotInstance.setW(0.4) |
| setL(<lateralSpeed>) | Sets lateral speed for humanoids robots. | lateralSpeed: Lateral speed. | Float | myRobotInstance.setL(0.7) |
| getV() | Returns linear speed given or 0 | - | - | myRobotInstance.getV() |
| getW() | Returns angular speed given or 0 | - | - | myRobotInstance.getW() |
| getL() | Returns lateral speed given or 0 | - | - | myRobotInstance.getL() |
| setVelocity() | This method is not callable, is a continious task to set every interval the speed we give to the robot | - | - | Not in use |

### Camera interfaces:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| startCamera() | This method is not callable, is a task to run the getImage_async after canvas is loaded | - | - | Not in use |
| getImage_async() | This method is not callable, is a continious task to get the image from the WebGL canvas | - | - | Not in use |
| getImage() | Returns a cv.Mat() object with the data from the WebGL canvas with id "camera2" | - | - | myRobotInstance.getImage() |

### Position sensors:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| startRaycaster(<distance>) | This method sets up the raycaster entity on AFRAME and calls setListener | distance: Distance which to object will be detected by raycaster | Integer | myRobotInstance.startRaycaster(1) |
| stopRaycaster() | This method erases all raycaster proerties, disables sensor | - | - | myRobotInstance.stopRaycaster() |
| setListener() | This method is not callable, sets a listener for the event 'intersection-detected' and sets TRUE the self variable DETECTED | - | - | Not in use |
| checkCollides() | This method returns true if a object is detected at given distance at startRaycaster method | - | - | myRobotInstance.checkCollides() |

*This API usage is shown at the Youtube videos below.*

## Youtube videos


OpenCV functionality with JS code: [Websim with OpenCV](https://www.youtube.com/watch?v=7y5X0LIvkik&t=3s)

Follow line algorithm: [Follow Line](https://youtu.be/7vfqN4fS5FU)

Raycaster first example: [Pibot detecting object](https://www.youtube.com/watch?v=OdjiArnrKoY)
