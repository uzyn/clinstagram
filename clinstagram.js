var config = require('./config.json');
var Instagram = require('instagram-node-lib');

Instagram.set('client_id', config.client_id);
Instagram.set('client_secret', config.client_secret);

Instagram.tags.info({
  name: 'blue',
  complete: function(data){
    console.log(data);
  }
});
