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
//写入redis
router.all("/commit",function(req,res,next){
	var commits = JSON.stringify(req.query.data);
	var name    = req.query.data.name;
	redisclient.set("bidinvest",commits,redis.print);
	redisclient.publish("DIEW",commits);
})

//email:1254473705@qq.com author:daiyunzhou 
module.exports = router;