/*!
 * AUTHOR:DIEW 
 * DATE:2017/8/19
 * EMAIL:1254473705@QQ.COM
 * GITHUT:https://github.com/dai1254473705/
 */
if (typeof jQuery === 'undefined') {
  throw new Error('逗比，你家的jQuery丢了！')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery;
  console.log("jquery version:",version);
}(jQuery);

+function ($) {
	function SocketRedis(){
		//console.log全局开关
		this.flag = true;
	};
	//SET REDIS
	SocketRedis.prototype.setRedis = function(obj){
		$.ajax({
			type:"get",
			url:"/commit",
			async:true,
			data:obj,
			success:function(res){
				console.log("保存成功");
			},
			error:function(err){
				console.log("保存失败");
				throw new Error(err)
			}
		});
	};
	
	//init socket
	var socket = io.connect('http://127.0.0.1:3000/');
	
	//socket connection
    socket.on('connection', function() {
        console.log('connection setup for socket.io')
    });
    //socket 订阅的频道
    socket.on('msgReceived', function(msg) {
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
    
    // new 一个女朋友
	var comit = new SocketRedis();
	$(".submit-commit").on("click",function(){
		//要存到redis的数据
		var obj = {
			data:{
				"name":new Date().getTime(),
				"txt":$("#commit").val()
			}
		};
		
		if(comit.flag){
			console.log(obj);
		};
		//调用ajax
		comit.setRedis(obj);
	});
}(jQuery);
