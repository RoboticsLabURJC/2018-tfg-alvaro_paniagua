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

Go to the folder you cloned ant type this command:
~~~
    nodejs main.js
~~~

Open your web browser and write this URL; ***localhost:8000***

![WebSim index page](/docs/websimScreen.png)

Now write your code using the API shown below.

## API

To run the robot we provide a API to make it simple to execute some commands on the robot.

The robot has:

- Motors interfaces:
  - setV(<linearSpeed>) , sets linear speed for the robot.
  - setW(<angularSpeed>) , sets angular speed for the robot.
  - setL(<lateralSpeed>) , sets lateral speed for humanoids robots.
  - getV(), get linear speed.
  - getW(), get angular speed.
  - getL(), get lateral speed.
  - setVelocity() , this method is not callable is a continious task to set every interval the speed we give to the robot.

- Camera interfaces:
  - startCamera(), this method is not callable, is a task to run the getImage_async after canvas is loaded.
  - getImage_async(), this method is not callable, is a continious task to get the image from the WebGL canvas.
  - getImage(), returns a cv.Mat() object with the data from the WebGL canvas with id "camera2".

## Youtube videos

[Websim with OpenCV](https://www.youtube.com/watch?v=7y5X0LIvkik&t=3s) 
