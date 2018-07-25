
        //Insert code here and press button RUN.
$( document ).ready(function() {
    var myRobot = new RobotI('a-pibot');

    myRobot.setV(0);


    /*setInterval(()=>{
        vamosacogerlaimagen(myRobot);
    }, 70);*/

});

function vamosacogerlaimagen(robot){
    var img = robot.getImage();

}