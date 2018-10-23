$(document).ready(execute); 
async function execute(){
var myRobot = new RobotI("a-pibot"); var myRobot, dis;


myRobot.setV(0.1);
myRobot.setW(-0.35);
while (true) {
  await sleep(150);
  dis = (myRobot.getDistance());
  console.log(dis);
}
 
}