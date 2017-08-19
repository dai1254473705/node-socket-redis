/*!
 * https://github.com/dai1254473705/baidupic.git
 * author:DIEW
 */
const express = require("express");
const morgan = require('morgan');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const redis = require("redis");
const options = require("./config");
const redisclient = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
var server = require('http').Server(app);
var io = require('socket.io')(server);
//logs info to server
//app.use(morgan('dev'));

//post resolve
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//设置静态文件如：图片， CSS, JavaScript 等。
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * reuire pages
 */
var index = require('./routes/index')

/*
 * render pages
 */
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error', {
		"title": '404',
		"msg": '服务异常'
	});
});

redisclient.on('connect',function(){
 console.log("redis connect success");
 //订阅频道DIEW
 redisclient.subscribe("DIEW");
});
//socketIo connection
io.on('connection', function(socket) {
	redisclient.on('message', function(error, msg) {
        console.log('socketIo connection');
        socket.emit('DIEWMSG', msg);        
    });
})
module.exports = app;

server.listen(3000,function(){
	console.log('http://127.0.0.1:3000')
});

