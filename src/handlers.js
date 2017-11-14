var fs = require('fs');
var queryString = require('querystring');
var savePost = require('./blog.js');

function handler(request, response) {
    var url = request.url;
    console.log(url);
    if (url === "/") {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.readFile(__dirname+"/../public/index.html", function(error, file) {
            if (error) {
                console.log(error);
                return;
            }
            response.end(file);
        });
    } else if (url === "/create/post") {
        var blogPost = '';
        request.on('data', function(dataChunk) {
            blogPost += dataChunk;
        });
        request.on('end', function() {
            var parsedPost = queryString.parse(blogPost);
            response.writeHead(307, {
                'Location': '/'
            });
            savePost(parsedPost);
            response.end();
        });
    } else if (url == "/posts") {
        var blogEntries = fs.readFile(__dirname+"/posts.json", function(error, file) {
            if (error) {
                return console.log(error);
            }
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(file);
        });
    } else {
        var extensionType = {
            html: 'text/html',
            css: 'text/css',
            js: 'application/javascript',
            ico: 'image/x-icon',
            jpg: 'image/jpg',
            png: 'image/png'
        };
        var extension = url.split('.')[1];
        fs.readFile(__dirname+"/../public" + url, function(error, file) {
            if (error) {
                console.log(error);
                return;
            }
            response.writeHead(200, {
                'Content-Type': extensionType[extension]
            });
            response.end(file);
        });
    }
}

module.exports = handler;