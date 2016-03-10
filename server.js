var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/forageposts');
var router = express.Router();
var port = process.env.PORT || 8080;
var floraRoutes = require('./routes/flora');
var userRoutes = require('./routes/user');
var session = require('express-session');
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
cookie: {
  maxAge: 60000
}
}));

require('./config/passport')(passport);
require('./routes/user.js')(app, passport);

app.use(function(req, res, next) {
    var user = req.user || "no user";
    console.log(user);
    next();
});

app.get('/', function(req, res){
    var user = req.user || "no user";
    res.render('index', {user: user})
});

app.get('/submitForage', function(req, res){
    res.render('submitForage', {user: 'a'})
});

app.use('/api/flora', floraRoutes);


app.listen(port, function(req, res){
  console.log('⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡\n⚡⚡⚡⚡ Forage Away ' + port + ' ⚡⚡⚡⚡\n⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡')
});