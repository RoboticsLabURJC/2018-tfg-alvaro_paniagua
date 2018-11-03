var fs = require('fs');
var http = require('http');
// Runs the server and sets 'handler' as callback function.
var server = http.createServer(handler).listen(8000);
console.log("------------- Server listening on port 8000 ------------- ");


function handler(req, res){
  if(req.url == "/"){
    fs.readFile(__dirname + '/index.html', (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });
  }else if(req.url == "/ice"){
    fs.readFile(__dirname + '/iceinterface.html', (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });
  }else if(req.url == "/ros"){
    fs.readFile(__dirname + '/rosinterface.html', (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });

  }else if(req.url == "/toPython"){
    var body = "";
    req.on('data', chunk =>{
      // Loading the request body
      body += chunk.toString();
    }).on('end', () =>{
      fs.readFile(__dirname + '/tmp/MyAlgorithm-Template.py', (err, data) =>{
        if(err){
          res.writeHead(500);
          return res.end("Error loading page");
        }
        body = body.replace("myRobot = None", "myRobot = PiBot.dameRobot()");

        var fileStr = data.toString();
        fileStr = fileStr.replace("# Add your code here", body);

        fs.writeFileSync(__dirname + '/tmp/MyAlgorithm-TEST.py', fileStr, 'utf-8');
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.end();
      });

    });

  }else{
    fs.readFile(__dirname + req.url, (err, data) =>{
      if(err){
        res.writeHead(500);
        return res.end("Error loading page.");
      }

      res.writeHead(200);
      res.end(data);
    });
  }
}
