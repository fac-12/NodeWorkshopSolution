var fs = require('fs');

function savePost(data) {
    fs.readFile('./src/posts.json', function(err, file) {
        if (err) {
            return console.log(err);
        }
        var timePosted = Date.now();
        var blogEntries = JSON.parse(file);
        blogEntries[timePosted] = data.post;
        fs.writeFile('./src/posts.json', JSON.stringify(blogEntries), function (error) {
            if (error) {
                return console.log(error);
            }
        });
    });
}

module.exports = savePost;