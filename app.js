var express = require("express");
var bodyParser = require("body-parser");

//mongoose setup
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/practice', {
    useNewUrlParser: true
}).
catch(error => handleError(error));

mongoose.connection.on('error', err => {
    logError(err);
});

mongoose.connection.once('open', function (callback) {
    console.log("connection succeeded");
});

var User = require('./models/user');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//insert new user record
app.post('/sign_up', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;

    var data = {
        "username": name,
        "password": password
    };

    User.create(data, function (err, data) {
        if (err) {
            return console.error(err)
        } else {
            // return res.redirect('signup_success.html');
            console.log(data);
            res.send(`Thanks for signing up, ${data.username}. <a href='login.html'>Click to Log in</a>`);
        }
    });
});

//verify the password
app.post('/', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;

    var data = {
        "username": name,
        "password": password
    };

    User.findOne(data, function (err, data) {
        if (err) {
            res.send(`Error occur, try again. <a href='login.html'>Click to Log in</a>`);
        } else {
            if (!data) {
                res.send(`Wrong password, try again. <a href='login.html'> Try again!</a>`);
            } else {
                res.send(`<h1>welcome, ${data.username}.<br><a href='login.html'>Click to HomePage</a></h1>`);
            }
        }
    });
});


//Home page
app.get('/', function (req, res) {
    return res.redirect('login.html');
}).listen(3000);


console.log("server listening at port 3000");