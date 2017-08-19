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
//				throw new Error(err)
			}
		});
	};
	// new 一个女朋友
	var comit = new SocketRedis();
	$(".submit-commit").on("click",function(){
		
		var obj = {
			data:{
				"name":new Date().getTime(),
				"txt":$("#commit").val()
			}
		};
		
		if(comit.flag){
//			console.log(obj);
		};
		comit.setRedis(obj);
	});
	 
}(jQuery);
