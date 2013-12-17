var config = require('./config.json'),
    instagram = require('instagram-node-lib'),
    debug = require('debug')('CLInstagram'),
    util = require('util'),
    http = require('http'),
    fs = require('fs');
    ascii = require('ascii');

var download = function(url, dest, callback) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        debug('Downloading from ' + url);

        response.pipe(file);
        file.on('finish', function() {
            file.close();
            callback();
        });
    });
}


instagram.set('client_id', config.client_id);
instagram.set('client_secret', config.client_secret);

debug('Loading popular medias.');

instagram.media.popular({
    complete: function(data){
        debug(data.length + ' popular medias loaded.');

        console.log('Showing top 5 images...');

        var i = 0;

        data.forEach(function (media) {

            // Skip videos
            if (media.type != 'image') {
                debug(media.id + ' - not image but ' + media.type);
                return;
            }

            // Skip if more than 5 images
            if (i >= 5) {
                debug(media.id + ' - skipped as there has been more than 5 images.');
                return;
            }

            /*
                media.created_time

            */
            //console.log(util.inspect(media));
            //console.log(media.images.low_resolution.url);
            var filename = config.image_location + media.id + '.jpg';
            download(media.images.standard_resolution.url, filename, function() {
                debug('Download complete: ' + filename);

                var pic = new ascii(filename);

                pic.convert(function(err, result) {
                    console.log(result);
                });

            });

            //process.exit();
            ++i;
        });
    }
});

debug('Program execution complete');
