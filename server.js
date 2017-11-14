var http = require('http');
var handler = require('./src/handlers.js');

var server = http.createServer(handler);

server.listen(3000,function() {
    console.log("Ready and listening");
});