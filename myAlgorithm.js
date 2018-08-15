
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
		        
                let ksize = new cv.Size(13,13);
		        let grayBlurImg = new cv.Mat();
		        cv.GaussianBlur(grayImg, grayBlurImg, ksize, 0, 0, cv.BORDER_DEFAULT);
		        
		        let threshImg = new cv.Mat();
		        cv.threshold(grayBlurImg , threshImg, 140 ,255, cv.THRESH_BINARY);
		        
		        let contours = new cv.MatVector();
		        let hierarchy = new cv.Mat();
		        cv.findContours(threshImg, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
                
                let aux = new cv.Mat.zeros(img.cols, img.rows, cv.CV_8UC3);
		        if(contours.size() > 0){
		            let stored = contours.get(0);
		            for(var i = 1; i < contours.size(); i++){
		                
		                if(stored.length < contours.get(i)){
		                    stored = contours.get(i);
		                }
		            }
		            let moments = cv.moments(stored, false);
		            let cx = moments.m10/moments.m00;
		            let cy = moments.m01/moments.m00;
		            
                    if(cx >= 75 && cx < 95){
                        myRobot.setW(-0.2);
                        
                    }else if(cx <= 75 && cx >= 55){
                        myRobot.setW(0.2);
                    }else if(cx >= 95){
                        myRobot.setW(-0.35);
                    }else if(cx <= 55){
                        myRobot.setW(0.35)
                    }
                    
                    myRobot.setV(0.2);
		        }
                cv.imshow('outputCanvas', threshImg);
                grayImg.delete();
                img.delete();
                dst2.delete();
                grayBlurImg.delete();
                threshImg.delete();
                hierarchy.delete();
                contours.delete();
            }, 33);
        });