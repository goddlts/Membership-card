/**
 * 
 */



var common = {
		
		openidsubstring : function(value) {
			var v=value.substring(0,6)+"***"+value.substring(value.length-4,value.length);
			return v;
		},
		/*
		 * 顶部信息
		 * 
		 */		
		showTopbarMessage:function(options){
	        var defaults = {
	                background: "#66cc00",
	                borderColor: "#ff6000",
	                foreColor: "#000",
	                height: "80px",
	                fontSize: "20px",
	                lineHeight:"60px",
	                close: "2500",  //click  关闭方式：1- click:点击关闭；2-延迟多长关闭（毫秒）
	                content:"",
	                appendTo:"body",
	                type:"default"   //提示类型 default: success/error/
	            };
	           
	        if(options.type == "success"){options.background = "#66cc00";}
	        if(options.type == "error"){options.background = "#ff6";}
	        
	            var options = $.extend(defaults, options);

	            var barStyle = " width: 100%;position: fixed;height: " + options.height + ";top: 0px;left: 0px;right: 0px;margin: 0px;display: none;";
	            var overlayStyle = "height: " + options.height + ";filter: alpha(opacity=90);-moz-opacity: 0.9;-khtml-opacity: 0.9;opacity: 0.9;background-color: " + options.background + ";border-bottom: solid 2px " + options.borderColor + ";";
	            var messageStyle = " width: 100%;position: absolute;height: " + options.height + ";top: 0px;left: 0px;right: 0px;margin: 0px;color: " + options.foreColor + ";font-weight: bold;font-size: " + options.fontSize + ";text-align: center;padding: 10px 0px; line-height:"+options.lineHeight;

	         //   return this.each(function () {
	         //       obj = $(this);

	                if ($(".topbarBox").length > 0) {
	                    // Hide already existing bars
	                    $(".topbarBox").hide();
	                    $(".topbarBox").slideUp(200, function () {
	                        $(".topbarBox").remove();
	                    });
	                }


	                var html = ""
	                    + "<div class='topbarBox' style='" + barStyle + "'>"
	                    + "  <div style='" + overlayStyle + "'>&nbsp;</div>"
	                    + "  <div style='" + messageStyle + "'>" + options.content + "</div>"
	                    + "</div>";

	                if (options.close == "click") {
	                    $(html).click(function () {
	                        $(this).slideUp(200, function () {
	                            $(this).remove();
	                        });
	                    }).appendTo($(options.appendTo)).slideDown(200);
	                }
	                else {
	                    $(html).appendTo($(options.appendTo)).slideDown(200).delay(options.close).slideUp(200, function () {
	                        $(this).remove();
	                    });
	                }

	          //  });
		},
		//alert
		alert:function(message,fun,title,addClass){
			if($("#bootstrap_alert").length > 0){
				$("#bootstrap_alert").remove();
//				$("#bootstrap_alert").find(".modal-title").empty().append(("提示"));
//				$("#bootstrap_alert").find(".modal-body").empty().append(message);
//				$("#bootstrap_confirm").modal();
				$(".modal-backdrop.in").remove();
			}
			var $html = $("<div class='modal fade bootstrap_alert' id='bootstrap_alert'>"
				        + "<div class='modal-dialog modal-sm' style='margin-top:5%;'>"
					        + "<div class='modal-content'>"
					            + "<div class='modal-header'>"
						            + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'></span></button>"
						            + "<h4 class='modal-title'>提示</h4>"
						        + "</div>"
						        + "<div class='modal-body' style='text-align:center;'>"
						        + message
						        + "</div>"
						        + "<div class='modal-footer'>"
					            + "<button type='button' class='btn-juc-greed btn-ok'  data-dismiss='modal'>确定</button>"
					        + "</div>"
						    + "</div>"
						+ "</div>"
		            + "</div>");	
			
			if(addClass){
		    	$html.addClass(addClass);
		    }
		    
			if(title){
				$html.find(".modal-title").empty().append(title);
			}
			    
			    $("body").append($html);
			    
			    
			    $html.find(".btn-ok").click(function(){		
			    	$("#bootstrap_alert").addClass("hide");
			    	if(fun){
			    	  fun();
			    	}
			    });
			    $html.modal();	
			
		},
		//confirm
		confirm:function(message,title,fun,btn_ok_name,btn_cancel_name){
			if($("#bootstrap_confirm").length > 0){
				$("#bootstrap_confirm").remove();
				//$("#bootstrap_confirm").find(".modal-title").empty().append((title || "提示"));
				//$("#bootstrap_confirm").find(".modal-body").empty().append(message);
				//$("#bootstrap_confirm").modal({keyboard: false,backdrop:false});
			}
			
			var $html = $("<div class='modal fade bootstrap_confirm' id='bootstrap_confirm'>"
				        + "<div class='modal-dialog'>"
					        + "<div class='modal-content'>"
					            + "<div class='modal-header'>"
						            + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'></span></button>"
						            + "<h4 class='modal-title'>"+(title || '提示')+"</h4>"
						        + "</div>"
						        + "<div class='modal-body' style='text-align: center;'>"
						        + "<div class='img'></div>"
						        + message
						        + "</div>"
						        + "<div class='modal-footer'>"						            
						            + "<button type='button' class='btn-juc-grey'  data-dismiss='modal'>"+(btn_cancel_name || '取消')+"</button>"
						            + "<button type='button' class='btn-juc-sx btn-ok'>"+(btn_ok_name || '确定')+"</button>"
						        + "</div>"
						    + "</div>"
						+ "</div>"
		            + "</div>");	
			
			    $("body").append($html);
			    
			    $html.find(".btn-ok").click(function(){		
			    	$(".bootstrap_confirm").addClass("hide");
			    	fun();
			    });
			    			    
			    
			    $html.modal({keyboard: false,backdrop:false});
				
			
		},
		
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
        //tui chu
        singOut:function(){
        	$.ajax({
        		url:"/loginData!userLogionOut.do",
        	    success:function(data){
        	    	if(data.success){
        	    		window.location.href = "/loginsView!businesslogin.do";
        	    	}
        	    	else{
        	    		common.alert(data.message);
        	    	}
        	    }
        	});
        },
        getParamFromUrl : function (name) {
        	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        	var regexS = "[\\?&]" + name + "=([^&#]*)";
        	var regex = new RegExp(regexS);
        	var results = regex.exec(window.location.href);
        	if (results == null) {
        		return null;
        	} else {
        		return results[1];
        	}
        },
        
       //写cookies
        setCookie : function (name, value) {   
           document.cookie = name + "=" + encodeURI(value);
           //alert(document.cookie);
        },

        //读取cookies
        getCookie : function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return decodeURI(arr[2]);
            else
                return null;
        },

        //删除cookies
        delCookie : function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name;
        },
        
        getdate : function(date){
        	var datetime =  date.replace(/T/,' ').replace(".0","");
        	return datetime;
        },
};