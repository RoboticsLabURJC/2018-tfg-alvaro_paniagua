
        // Press Ctrl-, to enter code editor configuration.
        // Write your algorithm inside next function and press RUN.
        // Always use this code above.
        $("#scene").on('loaded', function() {
            var myRobot = new RobotI('a-pibot');
            myRobot.setV(-0.2);
            myRobot.setW(-0.4);
            
            
            setInterval(()=>{
                var img = myRobot.getImage();
                cv.imshow('outputCanvas', img);
            }, 33);
        });