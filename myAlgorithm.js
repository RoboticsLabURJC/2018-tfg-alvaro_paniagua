
        // Press Ctrl-, to enter code editor configuration.
        // Write your algorithm inside next function and press RUN.
        // Always use this code above.
        $("#scene").on('loaded', function() {
            var myRobot = new RobotI('a-pibot');
            myRobot.setV(0);
            //myRobot.setW(-);
            
            
            setInterval(()=>{
                var img = myRobot.getImage();
        	    let grayImg = new cv.Mat();
		        let dst2 = new cv.Mat();

		        cv.cvtColor(img, grayImg, cv.COLOR_RGBA2GRAY);
		        
                let ksize = new cv.Size(9,9);
		        let grayBlurImg = new cv.Mat();
		        cv.GaussianBlur(grayImg, grayBlurImg, ksize, 0, 0, cv.BORDER_DEFAULT);
		        
		        let threshImg = new cv.Mat();
		        cv.threshold(grayBlurImg , threshImg, 201 ,255, cv.THRESH_BINARY);
		        
		        let contours = new cv.MatVector();
		        let hierarchy = new cv.Mat();
		        cv.findContours(threshImg, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
                
                let aux = new cv.Mat.zeros(img.cols, img.rows, cv.CV_8UC3);
		        if(contours.size() > 0){
		            for(var i = 0; i < contours.size(); i++){
		                let color = new cv.Scalar(Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255));
		                cv.drawContours(aux, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
		            }
		        }
                //cv.imshow('outputCanvas', aux);
                
            }, 33);
        });
      