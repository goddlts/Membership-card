// var index = {
//     isfirst:true,
//     shopId: "",
//     init: function() {
//         index.getUserInfo();
//         index.styleAuto();
//         index.event();
//         index.getMemberNum();
//         index.showdeal();
        
//         //买单提示
//     },
    
//     maidan: function() {
//         // 建立连接，conn 即web.xml中 CometServlet的<url-pattern>
//         JS.Engine.start('/conn');
//         // 监听后台某个频道
//         JS.Engine.on({
//             // 对应服务端 “频道1” 的值 result1
//             result: function(data) {
//                 JS.Engine.stop();
//                 if (data.shopid == index.shopId) {
//                     //num1.wxfee;
//                     common.alert("付款金额：" + data.wxfee +"元"+ "</br> 会员号：" + data.opuser, null, "买单成功", "maidan-modal");
//                 }
//             },

//             start: function(cId, channelList, engine) {
//                 //alert('连接已建立，连接ID为：' + cId);
//             },

//             stop: function(cause, cId, url, engine) {
//                 //alert('连接已断开，连接ID为：' + cId + ',断开原因：' + cause + ',断开的连接地址：'+ url);
//                 JS.Engine.start('/conn');
//             }
//         });
//         //setTimeout("index.play()",5000);
//         //setTimeout("index.stop()",10000);
//         //setTimeout("index.next()",12000);

//     },
//     //播放
//     play: function() {
//         var dewp = document.getElementById("dewplayer");
//         if (dewp != null) dewp.dewplay();
//     },
//     //暂停
//     stop: function() {
//         var dewp = document.getElementById("dewplayer");
//         if (dewp != null) dewp.dewstop();
//     },
//     //停止
//     pause: function() {
//         var dewp = document.getElementById("dewplayer");
//         if (dewp != null) dewp.dewpause();
//     },
//     //下一首，只有一首就重播
//     next: function() {
//         var dewp = document.getElementById("dewplayer");
//         if (dewp != null) dewp.dewnext();
//     },
//     //设置新播放文件 file:音频地址
//     set: function(file) {
//         var dewp = document.getElementById("dewplayer");
//         if (dewp != null) {
//             dewp.dewset(file);
//         }
//     },
//     //跳到第几秒
//     go: function() {
//         var dewp = document.getElementById("dewplayer");
//         if (dewp != null) {
//             dewp.dewgo(index);
//         }
//     },
//     //初始化样式
//     styleAuto: function() {        
//         var container_my_width = $(window).width();
//         var left = (container_my_width - 1200) / 2;
//         if (container_my_width > 1200) {
//           $("#center_panel").css("left", left);
//         }

//         var container_width = $(".container-fluid").width() >= 1200 ? $("body").width() : 1200;
//         var col_left_width = $(".col-left").outerWidth();
//     },
//     //设置初始化事件
//     event: function() {
        
//         $("#shuaxin").click(function() {
//             location.reload();
//         });
        
//         //问题反馈
//         $("#btn_feedback").click(function() {
//             $(".error-msg-panel").hide();
//             $("#question_modal").modal();
//         });

//         window.onresize = function() {
//             index.styleAuto();
//         };

//         //首页顶部菜单  
//         $(".top-panel .nav li").click(function() {
//             // alert("鼠标点击");
//             $(".top-panel .nav li.active").removeClass("active");
//             $(this).addClass("active");
//             var indexId = $(this).children().attr("href");
//             var name = $(this).attr("name");
//             // alert(name);        
//             menu_list(indexId, name);
//         });

//         $(".top-panel .nav li:first").trigger("click"); 
    
//         //首页左边交易金额和交易笔数
//         $(".nav-zbcd li").click(function() {
//             $(".nav-zbcd li.active").removeClass("active");
//             $(this).addClass("active");
//             var name = $(this).attr("role");

//             $(".panel-jebs").hide();
//             $("." + name).show();
//         });
//     },


//     /**
//      * 获取客户数量
//      */
//     getMemberNum: function() {
//         $.ajax({
//             url: "homeData!getMemberTotal.do",
//             type: "POST",
//             cache : false,
//             success: function(data) {
//                 if (data.success) {
//                     $("#hyzs").empty().append(data.data.totalmenber + "(位)");
//                 }
//             }
//         });
//     },
    
//     dateinit : function(date,days,type){
//         var d=new Date(date+days*24*60*60*1000);
//         var year=d.getFullYear();
//         var day=d.getDate();
//         var month=+d.getMonth()+1;
//         var f ="";
//         if(type == 1){
//             f=year+"-"+index.formate(month)+"-"+index.formate(day) +" 23:59:59";
//         }else if(type == 0){
//             f=year+"-"+index.formate(month)+"-"+index.formate(day) +" 00:00:00";
//         }
//         return f;
//     },
    
//      formate : function(d){
//         return d>9?d:'0'+d;
//     },
    
//     /**
//      * 获取交易金额
//      */
//     getDealMoney: function() {
//         var param = {
//             "traderecordwx.stattime": index.dateinit(new Date().getTime(),0,0),
//             "traderecordwx.endtime": index.dateinit(new Date().getTime(),0,0)
//         };
//         $.ajax({
//             url: "transactionData!currentRealIncomeIndex.do",
//             type: "POST",
//             data: param,
//             cache : false,
//             success: function(data) {
//                 if (data.success) {
//                     $("#total_money").empty().append((Number(data.data[0]==null?0:data.data[0].factmoney).toFixed(2) || 0.00));
//                     $("#total_money_noe").empty().append((Number(data.data[1]==null?0:data.data[1].factmoney).toFixed(2) || 0.00));
//                     $("#total_money_yesterday").empty().append((Number(data.data[2]==null?0:data.data[2].factmoney).toFixed(2) || 0.00));
//                     $("#total_money_seven").empty().append((Number(data.data[3]==null?0:data.data[3].factmoney).toFixed(2) || 0.00));
//                     $("#total_money_thirty").empty().append((Number(data.data[4]==null?0:data.data[4].factmoney).toFixed(2) || 0.00));
//                 }
//             }
//         });
//     },
//     /**
//      * 获取交易笔数
//      */
//     getDealNum: function() {
//         var param = {
//             "traderecordwx.stattime": index.dateinit(new Date().getTime(),0,0),
//             "traderecordwx.endtime": index.dateinit(new Date().getTime(),0,0)
//         };
//         $.ajax({
//             url: "transactionData!currentRealNumIndex.do",
//             type: "POST",
//             data: param,
//             cache : false,
//             success: function(data) {
//                 if (data.success) {
//                     $("#total_num").empty().append(data.data[0]==null?0:data.data[0].tnum);
//                     $("#total_num_noe").empty().append(data.data[1]==null?0:data.data[1].tnum);
//                     $("#total_num_yesterday").empty().append(data.data[2]==null?0:data.data[2].tnum);
//                     $("#total_num_seven").empty().append(data.data[3]==null?0:data.data[3].tnum);
//                     $("#total_num_thirty").empty().append(data.data[4]==null?0:data.data[4].tnum);
//                 }
//             }
//         });
//     },
    
//     showdeal : function(){
//         index.getDealMoney();
//         index.getDealNum();
//     },
    
//     getUserInfo: function() {
//         $.ajax({
//             url: "/homeData!getBusinessInfoByUser.do",
//             cache : false,
//             success: function(data) {
//                 if (data.success) {
//                     index.shopId = data.data.id;
//                     $("#memberName").empty().append("hi! " + data.data.shopname);

//                     if (data.data.logopicsrc == "" || data.data.logopicsrc == null) {
//                         $("#shop_img").attr("src", "../../../images/business/shop-moren.gif");
//                     } else {
//                         //                      $("#shop_img").attr("src","../../../images/business/shop-moren.gif");
//                         $("#shop_img").attr("src", data.data.logopicsrc);
//                     }

//                     $("#shop_name").empty().append(data.data.companyname);
//                 } else {}
//             }
//         });
//     },
 
//     signOut: function() {
//         common.singOut();
//         common.delCookie("username");
//     }
// };

// /*子菜单列表*/
// function menu_list(indexId, name){
//     index.getUserInfo();
//     // alert("执行 menu_list");
    
//     switch(indexId){
//         case "#1":
//             index.showdeal();
//              $('#frame_content').contents().empty();
//              $(".center-panel,.col-left").show();
//              $(".question").hide();
//              $('.col-right').css('padding-left', 200);
//              $(".menu").addClass("hide");
//              $("."+name).removeClass("hide");
//              $("#frame_content").attr("src","/webpages/business/home/shop.jsp");
//              index.getDealMoney();
//              index.getMemberNum();
//              index.getMemberNum();
//              break;
//         case "#2":
//         case "#3":
//         case "#4":
//         case "#5":
//         case "#6":
//         case "#7":
//         /*case "#8":*/
//              $('#frame_content').contents().empty();
//              $(".center-panel").show();
//              $(".col-left").show();
//              $('.col-right').css('padding-left', 200);
//              $(".question").hide();
//              index.styleAuto();
//              $(".menu").addClass("hide");
//              $('body').css('background', '#fff');
//              $("."+name).removeClass("hide");
//              var $li = $("."+name).find(".accordion>li:first");
//              if($li.find(".submenu").length > 0){
//                 if(!$li.hasClass("open")){ 
//                     $li.find(".link").trigger("click"); 
//                 }
//                 $li.find(".submenu li:first").trigger("click");
//                     // alert('子菜单展开！');
//              }
//              else{
//                 $li.find(".link").trigger("click");
//              }
//              $('.appMarket').removeClass('active');
//              break;
//         /*case '#9':*/
//         case "#8":     
//         $('#frame_content').contents().empty();
//         $(".col-left").hide();             
//        // $(".question").show();
//         $('body').css('background', '#f7f7f7');
//         $('.col-right').css('padding-left', 0);
//         $("#frame_content").attr("src","/webpages/business/application/myApplication.jsp");
//         $('.appMarket').removeClass('active');
//         break;
//         default:break;
//     }
// } 

// $(document).ready(function(){
//     $('.appMarket').click(function(){
//         $('#frame_content').contents().empty();
//         $(".top-panel .nav li").removeClass("active");
//         $(this).addClass('active');
//         $(".col-left").hide();
//         $('body').css('background', '#f7f7f7');
//       $(".col-right").css("width","1400px")
//         $(".col-right").css("height","1000px;")
//         $("#frame_content").attr("src","/webpages/business/application/applicationList.jsp");
//         /*window.location.href="application!toAppBaseInfo.do";*/
//         $('.col-right').css('padding-left', 0);
//     });
//     index.init();
//     index.isfirst=false;
// });


$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link').not(".link-title");
         // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);


        var link_title = this.el.find('.link-title');

        link_title.click(function(){
            
           link_title.removeClass("open");
           $(this).addClass("open");
           
           var url = $(this).attr("name");
           $("#frame_content").attr("src",url);
       });
        //submenu 
        var subLinks = this.el.find('.submenu li');
        subLinks.on('click',{el:this.el},this.subClick);
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }

    Accordion.prototype.subClick = function(e){
        
         var $el = e.data.el,
             $this = $(this);
         
         $el.find('.action').removeClass('action');
         $this.addClass('action');
         var url = $this.find("span").eq(0).attr("name");
         $("#frame_content").attr("src",url);
    }

    var accordion = new Accordion($('.accordion'), false);
    });
    //设置宽度
    //$(".menu-iframe").css("width",$(".content").width() - $(".menu").width()-1); 
    
    //var window_height = $(window).height();
    //$(".con-height").css("height",window_height-62);
    
    //$("#accordion .submenu li").click(function(){
    //  var url = $(this).find("span").eq(0).attr("name");
    //  $("#frame_content").attr("src",url);

    //});
    /*刷新浏览器后仍然在当前的页面*/
    // if (location.hash) {
    //     var name = '';
    //     var indexId = location.hash;
    //     if (indexId == '#1') {
    //         name = 'list-1';
    //     } else if (indexId == '#2') {
    //         name = 'list-2';
    //     } else if (indexId == '#3') {
    //         name = 'list-3';
    //     } else if (indexId == '#4') {
    //         name = 'list-4';
    //     } else if (indexId == '#5') {
    //         name = 'list-5';
    //     } else if (indexId == '#6') {
    //         name = 'list-6';
    //     } else if (indexId == '#7') {
    //         name = 'list-7';
    //     } else if (indexId == '#8') {
    //         name = 'list-8';
    //     } /*else if (indexId == '#9') {
    //         name = 'list-9';
    //     }*/
    //     // alert(indexId);
    //     // console.log(indexId);        
    //     $(".top-panel .nav li[name=" + name + "]").trigger("click");
    //     // alert('触发鼠标点击'+ name);
    //     // console.log(name);
    //     menu_list(indexId, name);
    
// var browserVersion = window.navigator.userAgent.toUpperCase();
// var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
// var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
// var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
// var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
// var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
// var isIE9More = (! -[1, ] == false);
// function reinitIframe(iframeId, minHeight) {
//     try {
//         var iframe = document.getElementById(iframeId);
//         var bHeight = 0;
//         if (isChrome == false && isSafari == false)
//             bHeight = iframe.contentWindow.document.body.scrollHeight;

//         var dHeight = 0;
//         if (isFireFox == true)
//             dHeight = iframe.contentWindow.document.documentElement.offsetHeight + 2;
//         else if (isIE == false && isOpera == false)
//             dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
//         else if (isIE == true && isIE9More) {//ie9+
//             var heightDeviation = bHeight - eval("window.IE9MoreRealHeight" + iframeId);
//             if (heightDeviation == 0) {
//                 bHeight += 3;
//             } else if (heightDeviation != 3) {
//                 eval("window.IE9MoreRealHeight" + iframeId + "=" + bHeight);
//                 bHeight += 3;
//             }
//         }
//         else//ie[6-8]、OPERA
//             bHeight += 3;

//         var height = Math.max(bHeight, dHeight);
//         if (height < minHeight) height = minHeight;
//         iframe.style.height = height + "px";
//     } catch (ex) { }
// }
// function startInit(iframeId, minHeight) {
//     eval("window.IE9MoreRealHeight" + iframeId + "=0");
//     //console.log(minHeight);
//     window.setInterval("reinitIframe('" + iframeId + "'," + minHeight + ")", 100);
// }

// $(function(){
//     var minHeight= $('body').height() - 112;
//     startInit('frame_content', minHeight);
// });

