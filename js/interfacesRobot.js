// document references prueba.html document, not index.html document.
'use strict';

class RobotI
{
    constructor(robotId){
        var self = this;
        this.velocity = {x:0, y:0, z:0, ax:0, ay:0, az:0};
        this.robot = document.getElementById(robotId);
        // this.robot is ready only after the callback
        this.robot.addEventListener('body-loaded', this.setVelocity.bind(self));
        this.startCamera();
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
      this.robot.body.velocity.set(this.velocity.x, this.velocity.y, this.velocity.z);
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
      this.stopCamera = false;
      if (($('#spectatorDiv').length) && (document.querySelector("#spectatorDiv").firstChild != undefined)) {
        this.canvas = document.querySelector("#spectatorDiv").firstChild;

        this.getImageData_async();
      }else{
        setTimeout(this.startCamera.bind(this), 100);
      }
    }
    getImage(){
      // Returns a screenshot from the robot camera
      if(this.imagedata != undefined){
        /*let test = await this.getImageData_async().then((result)=>{
          this.imagedata = result;
        });
        return this.imagedata;*/
        return this.imagedata;
      }else{
        setTimeout(this.getImage.bind(this), 200);
      }
    }

    getImageData_async()
    {

        let ctx = this.canvas.getContext( 'webgl' );
        this.imagedata  = new Uint8Array(this.canvas.width*this.canvas.height*4);
        ctx.readPixels(0, 0, this.canvas.width, this.canvas.height, ctx.RGBA, ctx.UNSIGNED_BYTE, this.imagedata);

        /*return new Promise((resolve) =>{
          resolve(this.imagedata);
        });*/
        setTimeout(this.getImageData_async.bind(this), 70);
    }
}
