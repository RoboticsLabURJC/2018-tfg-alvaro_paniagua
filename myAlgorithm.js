
        // Press Ctrl-, to enter code editor configuration.
        // Write your algorithm inside next function and press RUN.
        // Always use this code above.
        $("#scene").on('loaded', function() {
            var myRobot = new RobotI('a-pibot');
myRobot.startRaycasters(1,9)
myRobot.move(0, 0.5)
        });
      