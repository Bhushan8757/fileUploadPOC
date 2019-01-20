var http = require('http');
var formidable = require('formidable');
var form = require('fs').readFileSync('form.html');


http.createServer(function (request, response) {
  //response.setHeader('Access-Control-Allow-Origin', '*');
  if (request.method === "POST") {
    var incoming = new formidable.IncomingForm();
    incoming.uploadDir = 'uploads';
    incoming.on('file', function (field, file) {
      console.log(field);
      if (!file.size) { return; }
      response.write(file.name + ' received\n');
    }).on('end', function () {
      response.end('All files received');
    });
    incoming.parse(request);
  }
  if (request.method === "GET") {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(form);
  }
}).listen(8080);
console.log('Port running on: 8080')
