var config = require('./config.json'),
    Instagram = require('instagram-node-lib'),
    debug = require('debug')('CLInstagram');


Instagram.set('client_id', config.client_id);
Instagram.set('client_secret', config.client_secret);


Instagram.media.popular({
    complete: function(data){
        debug(data.length + ' popular items loaded.');
    }
});
