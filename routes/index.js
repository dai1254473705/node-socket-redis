"use strict";

const express = require('express');
const request = require('request-json');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require("path");
const fs = require('fs'); 
const app = express();
const redis = require("redis");
const options = require("../config");
const redisclient  = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
const pub = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
const sub = redis.createClient(options.RDS_PORT,options.RDS_HOST,options.RDS_OPTS);
var server = require('http').Server(app);
var io = require('socket.io')(server);

/**
 * author:代云舟
 * email:1254473705@qq.com
 * @param  {[type]}   res   [description]
 * @param  {Function} next) {	console.log("cookies [description]
 * @return {[type]}         [description]
 */

router.all('/', function(req, res, next) {
	res.render('index', {
		title: "留言板",
		author:"DIEW"
	});
})
//client.auth(options.RDS_PWD,function(){   
//      console.log('通过认证');   
//}); 
//client.on("error", function (err) {
//  console.log("Error " + err);
//});



//email:1254473705@qq.com author:daiyunzhou 
module.exports = router;