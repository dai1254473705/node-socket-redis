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
const client = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
const pub = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
const sub = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
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
//写入redis
app.use("/commit",function(req,res,next){
	console.log("sdfasdfasfasdfsdfsdfsdfsadfasdfasdfasfasdfsad");
	var commits = JSON.stringify(req.query.data);
	var name    = req.query.data.name;
	client.set("bidinvest",commits,redis.print);
	//订阅commits
	sub.subscribe("commits");
})
//触发订阅
sub.on("subscribe", function (channel, count) {
	console.log("channel",channel);
	console.log("count",count);
	//取出redis存储的数据
	client.get("bidinvest", function(err, reply) {
	    pub.publish("commits", reply);
	});
});

sub.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
});
io.on('connection', function (socket) {
	 socket.emit('news', { hello: "message" });
	console.log("connection success");
});
module.exports = app;

server.listen(3000,function(){
	console.log('http://127.0.0.1:3000')
});

