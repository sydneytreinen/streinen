var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require('mongoose'),
Todo = mongoose.model('Todo'),
bcrypt = require('bcryptjs'),
multer = require('multer'),
mkdirp = require('mkdirp'),
passport = require('passport');

user = mongoose.model('User'),
bcrypt = require('bcryptjs');


var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
app.use('/api', router);


router.route('/todos/user/:todoId').get(function (req, res, next) {
    logger.log('Get todos ' , 'verbose');

    var query = Todo.find({user: req.params.userId})
    .sort(req.query.order)
    .exec()
    .then(result => {
        if (results && result.lenght) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "No todos found" });
        }
    })
    .catch(error => {
        return next(error);
    });

    })
   {
           
        


router.get('/todos', requireAuth, function (req, res, next) {
    logger.log('Get all todos', "verbose");
    Todo.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            return next(err);
        });

});

router.route('/todos/:todoId').put(function (req, res, next) {
    logger.log('Update todos ' + req.params.todosId, 'verbose');
    Todo.findOneAndUpdate({ _id: req.params.todosId },
        req.body, { new: true, multi: false })
        .then(todos => {
            res.status(200).json(todos);
        })
        .catch(error => {
            return next(error);
        });
});


router.route('/todos/:todoId').delete(function (req, res, next) {
    logger.log('Delete todos ' + req.params.userId, 'verbose');
    Todo.remove({ _id: req.params.userId })
        .then(todos => {
            res.status(200).json({ msg: "todos Deleted" });
        })
        .catch(error => {
            return next(error);
        });

});
var storage = multer.diskStorage({
	destination: function (req, file, cb) {      
	  	var path = config.uploads + req.params.userId + "/";
		mkdirp(path, function(err) {
			if(err){
				res.status(500).json(err);
			} else {
				cb(null, path);
			}
		});
	},
	filename: function (req, file, cb) {
		let fileName = file.originalname.split('.');   
		cb(null, fileName[0] + new Date().getTime() + "." + 				fileName[fileName.length - 1]);
	}
  });

  var upload = multer({ storage: storage });
  

  router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
        logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
        
        Todo.findById(req.params.todoId, function(err, todo){
            if(err){ 
                return next(err);
            } else {     
                if(req.files){
                    todo.file = {
                        filename : req.files[0].filename,
                        originalName : req.files[0].originalname,
                        dateUploaded : new Date()
                    };
                }           
                todo.save()
                    .then(todo => {
                        res.status(200).json(todo);
                    })
                    .catch(error => {
                        return next(error);
                    });
            }
        });
    });
    

   };


};
