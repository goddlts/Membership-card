/**
 * 
 */



var common = {	

		//等待状态
		wait:{
			    add:function(){
					if($(".common-wait-bg").length > 0){
						$(".common-wait-bg").show();
						return;
					}
					
					    var $bg = $("<div class='common-wait-bg'><div class='img'></div></div>");			
				    	$("body").append($bg);
		            },
			    hide:function(){
			    	$(".common-wait-bg").hide();
			    },
			    del:function(){
			    	$(".common-wait-bg").remove();
			    }
		},
		
		//get url param
		getUrlParam:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
        /**
         * 获取当前地址
         * @returns url
         */
        getUrl:function(){
        	var url =window.location.protocol + "//" +window.location.host + window.location.port + window.location.pathname;
        	return url;
        },
        getUrlPort:function(){
        	var url =window.location.protocol + "//" +window.location.host + window.location.port;
        	return url;
        },
        /**
         * /添加cookie
         * @param objName  名称
         * @param objValue  值
         * @param objHours  过期时间，(小时)
         */
        addCookie:function(objName,objValue,objHours){
        	var str = objName + "=" + escape(objValue);
        	 
            if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
         
                var date = new Date();
         
                var ms = objHours*3600*1000;
         
                date.setTime(date.getTime() + ms);
         
                str += "; expires=" + date.toGMTString();
         
           }
         
           document.cookie = str;
        },
        /**
         * 删除cookie
         * @param name 名称
         */
        delCookie:function(name){
        	document.cookie = name+"=;expires="+(new Date(0)).toGMTString();
        },

        /**
         * 获取cookie
         */
        getCookie:function(objName){
        	var arrStr = document.cookie.split("; ");
        	 
            for(var i = 0;i < arrStr.length;i ++){
         
                var temp = arrStr[i].split("=");
         
                if(temp[0] == objName) return unescape(temp[1]);
            }
        },
        ditu : function(lat,lng) {
			url="http://apis.map.qq.com/uri/v1/geocoder?coord="+lat+","+lng+"&referer=myapp";
			window.location.href=url;
		},
		
        /**
         * /根据shopid获取appid
         */
        getAppId:function(shopid,fun){
        	$.ajax({
        		url:"/wxcommonData!getAppidByShopId.do",
        		data:{"shopid":shopid},
        		success:function(data){
        			if(data.success){
        				fun(data.data);
        			}
        		}
        	});
        },
        
        /**
         * 根据openid获取用户信息(uid和手机)
         * {
         * }
         */
        getUserInfo:function(openid,colback){
        	$.ajax({
        		url:"/wxcommonData!getUserInfoByOpenId.do",
        		data:{"wx_openid":openid},
        		async : false,
        		success:function(data){
        			if(data.success){
        				common.delCookie("userid");
        				common.addCookie("userid", data.data.userid, 168);
        				colback(data.data);
        			}
        			else{
        			}
        		}
        	});
        },
        
        //判断商家有无微信公众号 根据商家的shopid
        // return boolean: 没有返回false, 有返回 true;
        hasWxAccount:function(shopid){
        	$.ajax({
        		url:"/wxcommonData!getAppidByShopId.do",
        		data:{"shopid":shopid},
        		success:function(data){
        			if(data.success){
        				if(data.data == "0"){
        				   return false;
        				}
        				else{
        				    return false;
        				}
        			}
        			else{
        				return false;
        			}
        			
        		}
        	});
        },
        
        //设置openId到cookie
        //如果用户未登陆过，则跳转到网页授权页,网页授权分为“商家的网页授权”和“桔橙公众号的网页授权”，如果商家没有公众号，则跳转到桔橙公众号的网页授权。
        setOpenId:function(){   
        	//return;  //测试
        	
        	
        	var shopid = common.getUrlParam("parStr").split('.')[0];        	
        	var openid = common.getCookie("zhct-"+shopid);
        	var code = common.getUrlParam("code");
    		var appid = common.getUrlParam("appid");   
    		if(code != null &&  appid != null){  
    			$.ajax({
        			url:"/wxcommonData!getOpenId.do",
        			data:{"wx_code":code,"wx_appid":appid,"shopid":shopid},
        			type:"POST",
        			success:function(data){
        				if(data.success){        					
        					var json = eval("["+data.data+"]");
        					if(json[0].openid){
        						var openId = json[0].openid;
        						common.delCookie("zhct-"+shopid);
        						common.addCookie("zhct-"+shopid, openId, 168);
        					}
        					else{
        						
        					}
        				}
        				else{
        					//alert(data.message);
        				}
        			}
        		});
    		}
    		else{
    			if(openid == undefined || openid == "undefined"){  
    				var url = window.location.href;
    				window.location.href = common.getUrlPort()+"/wxcommonView!authorized.do?backUrl="+encodeURIComponent(url)+"&sid="+common.getUrlParam("parStr").split('.')[0];
    			}
    			else{
    				
    			}
    		}
        },
        //获取openId
        getOpenId:function(){
        	var shopid = common.getUrlParam("parStr").split('.')[0];
        	var openid= common.getCookie("zhct-"+shopid);
			return openid;
        	
        },
      //获取openId
        getuserid:function(){
        	var userid= common.getCookie("userid");
			return userid;
        	
        },
        /**
         * 设置微信config接口注入权限验证配置
         * @param ajsApiList 
         */
        setWxConfig:function(ajsApiList,shopid){
        	common.getAppId(shopid, function(value){
        		$.ajax({
    				url:"/wxcommonData!getJsApiSign.do",
    				data:{"url":location.href.split('#')[0],"shopid":shopid},
    				async:true,
    				success:function(data){
    					if(data.success){
    						wx.config({
    							debug:false,
    							appId:value,
    							timestamp: ""+data.data.timestamp+"",
    							nonceStr: ""+data.data.nonceStr+"",
    							signature: ""+data.data.signature+"",
    							jsApiList: ajsApiList
    						});
    					}
    				}
            	});
        	});        		
        },
        getdate : function(date){
        	var datetime =  date.replace(/T/,' ');
        	return datetime;
        }
};


var cwx = {
		
};



