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
  }else if(req.url == "/myAlgorithm"){
    // Ajax request for the update of aframe

    if(req.method === 'POST'){
      var body = '';
      req.on('data', chunk =>{
        // Loading the request body
        body += chunk.toString();
      }).on('end', () =>{
        /*
        This creates 2 files, a copy of prueba.html with an identifier and
        the myalgorithm file with the same identifier.

        Is intended to use with a student ID.

        This code also modifies files to configure it to work.
        */
        var id = Math.floor(Math.random() * Math.floor(3));
        fs.writeFileSync(__dirname + '/tmp/myAlgorithm-' + id + '.js', body, 'utf-8');

        fs.readFile(__dirname + '/prueba.html', (err, data) =>{
          if(err){
            res.writeHead(500);
            return res.end('Error loading page.');
          }
          let htmlStr = data.toString();
          let newHTML = htmlStr.replace(/js\//g, "../js/");
          newHTML = newHTML.replace('<!--Insert here-->', '<script src="./myAlgorithm-' + id + '.js" ></script>\r');
          newHTML = newHTML.replace('<a-asset-item id="model-pibot" src="assets/models/jrobotF.dae"></a-asset-item>', '<a-asset-item id="model-pibot" src="../assets/models/jrobotF.dae"></a-asset-item>');
          newHTML = newHTML.replace('<img id="ground" src="assets/textures/cheste-circuit.png" />', '<img id="ground" src="../assets/textures/cheste-circuit.png" />');

          fs.writeFileSync(__dirname + '/tmp/' + id + '.html', newHTML, 'utf-8');
          res.setHeader('Content-Type', 'text/plain');
          res.writeHead(200);
          res.end(JSON.stringify({ url: "./tmp/" + id + ".html"}));
        });

      });
    }
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
