# node+redis+socket demo

## super simple 

通过node实时读取redis(本地或者远程)中改变的数据，并通过socket.io实时展示在浏览器
（express,request-json,ejs等不懂得请查看相应的文档，此处不解释）
## install redis

[redis官网](https://redis.io "redis官网")
[windows 64位地址](https://github.com/MSOpenTech/redis/releases "windows 64位地址")

1.将zip压缩包解压，cmd进入，输入 redis-server redis.windows.conf  运行redis服务器
2.redis 命令行工具(redis-cli)，双击打开，输入help查看指令
3.在项目目录下安装redis (cnpm i redis --save)

## config

```js
/*
 * config
 */
var  options = {
	RDS_PORT : '6379',                //端口号
    RDS_HOST : '127.0.0.1',    //服务器IP  要连接的A服务器redis   
    RDS_PWD  : '',  //密码   
    RDS_OPTS : {}//设置项
};

module.exports = {
	options:options
}
```
##app.js

```js
const redis = require("redis");
const options = require("./config");
const redisclient = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
var server = require('http').Server(app);
```

##配置redis
```js
redisclient.on('connect',function(){
 console.log("redis connect success");
 //订阅频道DIEW
 redisclient.subscribe("DIEW");
});
```
当请求/commit时，将数据存在redis,并广播

```js
//写入redis
router.all("/commit",function(req,res,next){
	var commits = JSON.stringify(req.query.data);
	var name    = req.query.data.name;
	redisclient.set("bidinvest",commits,redis.print);
	redisclient.publish("DIEW",commits);
})
```
##socket.io
[socket官网](https://socket.io "socket官网")
利用socket.io实现保存数据到redis时，触发socket推送数据到client

server：

```js
io.on('connection', function(socket) {
	redisclient.on('message', function(error, msg) {
        console.log('socketIo connection');
        socket.emit('DIEWMSG', msg);        
    });
})
```
client:
```js
//init socket
	var socket = io.connect('http://127.0.0.1:3000/');
	
	//socket connection
    socket.on('connection', function() {
        console.log('connection setup for socket.io')
    });
    //socket 订阅的频道
    socket.on('DIEWMSG', function(msg) {
    	var objMsg = JSON.parse(msg);
    	var random = parseInt(Math.random()*6)+1;
        //返回的数据
        var html = '';
        html+='<li class="row list-group-item"><div class="col-md-2 col-xs-12">';
        html+='<img src="/images/avatar/avatar0'+random+'.jpg" alt="llalalalla" class="img-thumbnail text-center avatar">';
        html+='<p class="text-center">'+objMsg.name+'</p></div>';
        html+='<div class="col-md-10 col-xs-12">';
        html+='<p>'+objMsg.txt+'</p></div></li>';
        
        $(".commit-all").append(html);
    })
```
##具体请看源文件
