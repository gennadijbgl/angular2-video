/**
 * Created by Hienadz on 30.08.16.
 */

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var moverride = require("method-override");
var multer = require("multer");

var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

mongoose.Promise = require('bluebird');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'SECRET' }));
app.use(moverride());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(username, password,done){
    User.findOne({ email : username},function(err,user){
        return err
            ? done(err)
            : user
            ? password === user.password
            ? done(null, user)
            : done(null, false, { message: 'Incorrect password.' })
            : done(null, false, { message: 'Incorrect username.' });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err
            ? done(err)
            : done(null,user);
    });
});



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(express.static('.'));

app.use('/angula2My/angula2T/', express.static('.'));



app.get('/', function(req, res){
    res.send("index.html");
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});

app.post("/upload", multer({storage:storage}).array("fileUpload", 1), function(req, res) {
    res.send(req.files);
});



mongoose.connect('mongodb://localhost/ecomm_database');



var UserSchema   = new Schema({
    firstName:String,
    lastName:String,
    email: {
    type: String,
        unique: true,
        required: true
    },
    password: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var VideoSchema   = new Schema({
    videoId:String,
    videoTitle:String,
    price: Number,
    description: String,
    starRating: Number,
    imageUrl: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

var tr = function (doc, obj, options) {

    obj.videoId = obj._id;
    delete obj._id;
    delete obj.id;

    return obj;

};

if (!VideoSchema.options.toObject) VideoSchema.options.toObject = {};
VideoSchema.options.toObject.transform = tr;

if (!VideoSchema.options.toJSON) VideoSchema.options.toJSON = {};
VideoSchema.options.toJSON.transform = tr;



var Video = mongoose.model('Video', VideoSchema);
var User = mongoose.model('User', UserSchema);

var router = express.Router();              // get an instance of the express Router

var i = 0;
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.'+i+++" ");
    next(); // make sure we go to the next routes and don't stop here
});




router.route('/video/:videoId').get( function(req, res) {
    Video.findById(req.params.videoId,(function(err, bear) {
        if (err)
            res.send(err);
        res.json(bear);
    }));
}).put(function(req, res) {

    // use our bear model to find the bear we want
    Video.findById(req.params.videoId, function(err, video) {

        if (err)
            res.send(err);

        video.videoId = req.body.videoId;  // set the bears name (comes from the request)
        video.videoTitle = req.body.videoTitle;
        video.price = req.body.price;
        video.description = req.body.description;
        video.starRating = req.body.starRating;
        video.imageUrl = req.body.imageUrl;

        // save the bear
        video.save(function(err) {
            if (err)
                res.send(err);

            console.log('Video updated!');
            res.json({ message: 'Video updated!' });
        });

    });
}).delete(function(req, res) {
    Video.remove({
        _id: req.params.videoId
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

router.route('/video')

// create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var video = new Video();      // create a new instance of the Bear model
        video.videoId = req.body.videoId;  // set the bears name (comes from the request)
        video.videoTitle = req.body.videoTitle;
        video.price = req.body.price;
        video.description = req.body.description;
        video.starRating = req.body.starRating;
        video.imageUrl = req.body.imageUrl;

        video.save(function(err) {
            if (err)
                res.send(err);

            console.log('Video created!');

            res.json({ message: 'Video created!' });
        });
    })


    .get(function(req, res) {
            Video.find().sort({ $natural: -1 } ).exec(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });



router.route('/user').post(function(req, res) {
    User.find({
        email: req.body.email
    },function (err,users) {

        if(users.length == 0 ) {
            var item = new User();      // create a new instance of the Bear model

            item.firstName = req.body.firstName;
            item.lastName = req.body.lastName;
            item.password = req.body.password;
            item.email = req.body.email;

            item.save(function (err) {
                if (err)
                    res.send(err);

                console.log('User created!');
                console.log(item);

                getTokenToUser(item, res, 'User created with token');

            });
        }
        else {
            res.json({
                success: false,
                message: "User with the same email already exist"
            });
        }
        });

}).get(function(req, res) {
    User.find().sort({ $natural: -1 } ).exec(function(err, bears) {
        if (err)
            res.send(err);

        res.json(bears);
    });
});

var getTokenToUser = function (user,res,message) {
    var token = jwt.sign(user, 'ilovescotchyscotch', {
        expiresIn: '1440m'
    });


    res.json({
        success: true,
        message: message?message:'Enjoy your token!',
        token: token,
        user:user
    });
};

router.route('/authentication').post(function(req, res) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                getTokenToUser(user,res);
            }

        }

    });
});

router.route('/login').post(function(req, res, next) {
    passport.authenticate('local',
        function(err, user, info) {
            return err
                ? next(err)
                : user
                ? req.logIn(user, function(err) {
                return err
                    ? next(err)
                    : res.redirect('/list');
            })
                : res.redirect('/');
        }
    )(req, res, next);
}
);

// router.use( function (req, res, next){
//     req.isAuthenticated()
//         ? next()
//         : res.redirect('/');
// });

// router.use(function(req, res, next) {
//
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//     // decode token
//     if (token) {
//
//         // verifies secret and checks exp
//         jwt.verify(token, 'ilovescotchyscotch', function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 jwt.decode(token)
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// });

app.use('/api', router);

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});