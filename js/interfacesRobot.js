// document references prueba.html document, not index.html document.
'use strict';

class RobotI
{
    constructor(robotId){
        var self = this;
        this.velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0};
        this.robot = document.getElementById(robotId);
        this.robot.addEventListener('body-loaded', this.setVelocity.bind(self));
        this.startRaycaster();
        this.startCamera();
    }
    getRotation(){
      return this.robot.getAttribute('rotation');
    }
    setV(v){
        this.velocity.x = v;
    }
    setW(w){
        this.velocity.ay = w*10;
    }
    setL(l){
        this.velocity.y = l;
    }
    getV(){
        return this.velocity.x;
    }
    getW(){
        return this.velocity.az;
    }
    getL(){
        return this.velocity.y;
    }
    setVelocity(body){
      /*
        This code run continiously, setting the speed of the robot every 40ms
        This function will not be callable, use setV, setW or setL
      */
      if(body != undefined){
        this.robot = body.originalTarget;
      }
      let rotation = this.getRotation();
      let newpos = updatePosition(rotation, this.velocity, this.robot.body.position);
      this.robot.body.position.set(newpos.x, newpos.y, newpos.z);
      this.robot.body.angularVelocity.set(this.velocity.ax, this.velocity.ay, this.velocity.az);
      setTimeout(this.setVelocity.bind(this), 40);
    }

    setCameraDescription(data /* , current */)
    {
        console.log("setCameraDescription: "+ data);
    }

    getCameraDescription()
    {
        return 1;
    }
    stopCameraStreaming()
    {
        return 1;
    }

    reset()
    {
        return 1;
    }

    getImageDescription()
    {
        return 1;
    }

    getImageFormat()
    {
        return 1;
    }
    startCamera(){
      // Starts camera from robot
      if (($('#spectatorDiv').length) && (document.querySelector("#spectatorDiv").firstChild != undefined)) {
        this.canvas2d = document.querySelector("#camera2");

        this.getImageData_async();
      }else{
        setTimeout(this.startCamera.bind(this), 100);
      }
    }
    getImage(){
      // Returns a screenshot from the robot camera
      if(this.imagedata != undefined){
        return this.imagedata;
      }else{
        setTimeout(this.getImage.bind(this), 200);
      }
    }

    getImageData_async()
    {
        this.imagedata = cv.imread('camera2');

        //console.log(this.imagedata);
        setTimeout(this.getImageData_async.bind(this), 33);
    }

    startRaycaster()
    {
      let collide = false;
      this.raycaster = document.querySelector('#positionSensor');
      this.raycaster.setAttribute('raycaster', 'objects', '.collidable');
      this.raycaster.setAttribute('raycaster', 'far', 3);
      this.raycaster.addEventListener('raycaster-intersection', function(evt){
        var myBox = evt.detail.els[0];

        myBox.setAttribute('material', 'color', 'orange');

      });
    }
}

function updatePosition(rotation, velocity, robotPos){
  let x = velocity.x/10 * Math.cos(rotation.y * Math.PI/180);
  let z = velocity.x/10 * Math.sin(rotation.y * Math.PI/180);

  robotPos.x += x;
  robotPos.z -= z;

  return robotPos;
}
