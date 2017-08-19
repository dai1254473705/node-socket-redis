# baidupic#
BaiduPicturesCrawl
# 从百度获取图片地址并解析#

>##规则如下##
{
    'w': 'a',
    'k': 'b',
    'v': 'c',
    '1': 'd',
    'j': 'e',
    'u': 'f',
    '2': 'g',
    'i': 'h',
    't': 'i',
    '3': 'j',
    'h': 'k',
    's': 'l',
    '4': 'm',
    'g': 'n',
    '5': 'o',
    'r': 'p',
    'q': 'q',
    '6': 'r',
    'f': 's',
    'p': 't',
    '7': 'u',
    'e': 'v',
    'o': 'w',
    '8': '1',
    'd': '2',
    'n': '3',
    '9': '4',
    'c': '5',
    'm': '6',
    '0': '7',
    'b': '8',
    'l': '9',
    'a': '0'
};
##主要代码##
$(function(){
		var pn=30;
		function Baidu(){};
		Baidu.prototype.conver = function(res){
			var _this = this;
//			console.log(res);
			var options  = this.convertMap;
			var str,start,mid,mid1,mid2,end=[],resultstr;
			var getStr  =res.objURL;
			//把头尾截取出来
			start  = getStr.indexOf("$");
			//将AzdH3FAzdH3F删除
			mid1 = getStr.substring(start+2);
			mid2 = mid1.replace(/AzdH3F/gi,'/');
//			mid  = mid2.replace(/_z2C$q/gi,':')
			//等到需要转换的字符串
			resultstr = mid2.replace(/_z&e3B/gi,'.');
			console.log(getStr);
			console.log(resultstr);
			$.each(resultstr.split(''),function(index,item){
				var setitem  = _this.convertMap[item];
				if(setitem==undefined){
					setitem = item;
				}
				end.push(setitem);
			})
			str = "http://"+end.join("");
			
			console.log(str);
			return str;
		};
		Baidu.prototype.getData = function(url){
			var _this = this;
			var name = $(".searchText").val();
//			console.log(name);
            $.ajax({
            	url:url,
            	dataType:"json",
            	type:"get",
            	data:{
            		"name":name==""?"昆虫":name,
            		"pn":pn
            	},
            	success:function(data){
            		var res = data.body;
            		console.log(res);/**/
            		$(".showSource").val(data.statics);
            		var one = res.indexOf("queryExt");
            		var two = res.indexOf("listNum");
            		var ss = res.replace(res.slice(one,two-one),'');
//          		console.log(one);
//          		console.log(two);
//          		console.log(res.slice(one-1,two-1));
             		var gets = res.replace(res.slice(one-1,two-1),'');
             		var jsonData = JSON.parse(gets);
             		var hasConv = '';
            		console.log(jsonData);
            		$.each(jsonData.data,function(index,item){
            			if(item.objURL!=''&&item.objURL!=undefined&&item.objURL!=null){
	            			hasConv =  _this.conver(item);
	            			var str  = '<li class="col-md-10 list-group-item"><img src="'+hasConv+'" class="img-thumbnail col-md-12"></li>'
	            			$('.img').append(str);
//	            			console.log(hasConv);
						}
            		})
				},
            	error:function(err){
            		console.log(err);
            	}
            })
		};
		Baidu.prototype.convertMap = {
            'w': 'a',
            'k': 'b',
            'v': 'c',
            '1': 'd',
            'j': 'e',
            'u': 'f',
            '2': 'g',
            'i': 'h',
            't': 'i',
            '3': 'j',
            'h': 'k',
            's': 'l',
            '4': 'm',
            'g': 'n',
            '5': 'o',
            'r': 'p',
            'q': 'q',
            '6': 'r',
            'f': 's',
            'p': 't',
            '7': 'u',
            'e': 'v',
            'o': 'w',
            '8': '1',
            'd': '2',
            'n': '3',
            '9': '4',
            'c': '5',
            'm': '6',
            '0': '7',
            'b': '8',
            'l': '9',
            'a': '0'
       };
		var bd = new Baidu();
		$(".searchBtn").on("click",function(){
			bd.getData('/getbaidupic');
		})
		$(".more").on("click",function(){
			pn+=30;
			bd.getData();
		})
		$(".local").on("click",function(){
			bd.getData('/getbaidupic_bendi');
		})
	})
  仅用来学习参考，不要做坏事，我们都是好孩子！
