var express = require('express');


module.exports = function (app, config) {

//response to url 
  app.use(function (req, res, next) {
    console.log('Request from ' + req.connection.remoteAddress);
    next();
  });  

	app.use(express.static(config.root + '/public'));
	
  //404 not found 
	app.use(function (req, res) {
	  res.type('text/plan');
	  res.status(404);
	  res.send('404 Not Found');
	});
 // 500 server error 
	app.use(function (err, req, res, next) {
	  console.error(err.stack);
	  res.type('text/plan');
	  res.status(500);
	  res.send('500 Sever Error');
	});
  
	console.log("Starting application");
  
  };
  