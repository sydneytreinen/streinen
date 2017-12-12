var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
mongoose = require('mongoose'),
User = mongoose.model('User'),
passportService = require('../../config/passport'),
passport = require('passport');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
app.use('/api', router);

router.route('/users/login').post(requireLogin, login);

router.route('users').get(function (req, next) {
    logger.log('Get all users', 'verbose');

    var query = User.find()
        .sort(req.query.order)
        .exec()
        .then(results => {
            if (results && results.lenght) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'No Users' });
            }
        })
        .catch(err => {
            return next(err);

        });
});

router.route('/users/:userId').get(function (req, res, next) {
    logger.log('Get user ' + req.params.userId, 'verbose');

    User.findById(req.params.userId)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "No user found" });
            }
        })
        .catch(error => {
            return next(error);
        });
});

router.route('/users').post(function (req, res, next) {
    logger.log('create user ' + req.params.userId, 'verbose');

    console.log(req.body)

    var user = new User(req.body);
    user.save()
        .then(results => {
            res.status(201).json(results);
        })
        .catch(error => {
            return next(error);
        });

});

router.route('/users/:userId').put(function (req, res, next) {
    logger.log('Update user ' + req.params.userId, 'verbose');
    User.findOneAndUpdate({ _id: req.params.userId },
        req.body, { new: true, multi: false })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            return next(error);
        });
});

router.route('/users/:userId').delete(function (req, res, next) {
    logger.log('Delete user ' + req.params.userId, 'verbose');
    User.remove({ _id: req.params.userId })
        .then(user => {
            res.status(200).json({ msg: "User Deleted" });
        })
        .catch(error => {
            return next(error);
        });

});

};

