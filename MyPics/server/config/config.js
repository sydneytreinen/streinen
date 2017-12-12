var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
development: {    
            root: rootPath,    
            app: ('Sydney Treinen: MyPics' ),
            port: 5000, 
            db: 'mongodb://127.0.0.1/mypics-dev',
            secret: "ihatehowearlyitgetsdark",
            uploads: rootPath + "/public/uploads/",
            
 },  

 test: {    
  root: rootPath,    
  app: ('Sydney Treinen: MyPics' ),
  port: 4000, 
  db: 'mongodb://127.0.0.1/mypics-dev',
  secret: "ihatehowearlyitgetsdark",
  
  
}, 

 production: {    
              root: rootPath,    
              app: ('Sydney Treinen: MyPics'),   
               port: 80,  
               db: 'mongodb://127.0.0.1/mypics-dev',
               secret: "ihatehowearlyitgetsdark" ,
               uploads: rootPath + "/public/uploads/",
               
              }
  };

module.exports = config[env];

