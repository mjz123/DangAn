var path ="/"+location.pathname.split('/')[1];
/*------------------------公用js------------------------*/

$(function(){
	clickblur();
});

//设置多选框和单线按钮失去焦点事件
function clickblur(){
	$("input[type=checkbox]").click(function(){
		$(this).blur();
	});
	$("input[type=radio]").click(function(){
		$(this).blur();
	});
}

//初始化滚动条数据
function initScroll(){
	$(".nui-scroll").niceScroll({
    	cursorcolor:"#cccccc",
    	//smoothscroll:false,
    	//autohidemode:"leave"
    });
}


/*清空所有弹窗遮罩层*/
$("body").on("hidden.bs.modal", function() {
    $(this).removeData("modal");
});

/*浏览器大小改变时更改内容区域的高度*/
$(window).resize(function() {
	var showType =  $("#tow_menu").attr("isShow");
	 if(showType == 'hide'){
		 initCenterHeight(0);
	 }else{
		 initCenterHeight(1);
	 }
});


/*根据当前浏览器高度设置内容区域的高度*/
function  initCenterHeight(type){
	var wh = $("#site-landing").outerHeight();
    var th = $("#headerDiv").outerHeight();//logodiv
    var mh = $("#tow_menu").outerHeight();//二级菜单div
    var bh = $(".bootomDiv").outerHeight();//下方div
    var footerH = $("footer").outerHeight();
    //如果有二级菜单
    var ch = wh-th-bh-140;
    if(mh!=null && type==1){
    	ch = ch-mh;
    }   
    var mengShow = $(".menus").attr("isShow");
	if(mengShow=="hide"){
		ch = ch + 80;
	}
    
    $(".dashboard-wrapper_index").css("height",ch+"px");
}

//动态设置div的高度
function  initDivHeight(divId){
    var wh = window.outerHeight;
    var th = $("#headerDiv").height();
    var mh = $(".menus").outerHeight();
    var mh = $(".bootomDiv").outerHeight();
    var ch =wh-th-mh-mh-330;
    $("#"+divId).css("height",ch+"px");
}

/*自动更新当前时间*/
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//从接口获取菜单数据自动生成
function getmenuData(){
	
		//获取菜单数据
		var menuData = [{"hangBiaoShi":5,"fuJieDianBiaoShi":1,"link":"机构人员维护.html","label":"机构人员维护","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":4,"fuJieDianBiaoShi":1,"link":"","label":"信息分类管理","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[{"hangBiaoShi":8,"fuJieDianBiaoShi":4,"link":"shouYeFenLei/list.do?jieDianBiaoShi=1","label":"主信息树维护","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":16,"fuJieDianBiaoShi":4,"link":"系统代码维护.html","label":"系统代码维护","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":35,"fuJieDianBiaoShi":4,"link":"yuanShuJu/list.do","label":"电子文件元数据维护","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":67,"fuJieDianBiaoShi":4,"link":"guoJia/list.do","label":"国家地区分类","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":34,"fuJieDianBiaoShi":4,"link":"关键词维护.html","label":"关键词维护","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]}]},{"hangBiaoShi":6,"fuJieDianBiaoShi":1,"link":"","label":"权限分配策略","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[{"hangBiaoShi":14,"fuJieDianBiaoShi":6,"link":"权限分类维护.html","label":"权限分类维护","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":15,"fuJieDianBiaoShi":6,"link":"权限设置维护.html","label":"权限设置维护","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":23,"fuJieDianBiaoShi":6,"link":"authorityPage/rightchakan.do","label":"系统权限查看","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]}]},{"hangBiaoShi":3,"fuJieDianBiaoShi":1,"link":"","label":"审计管理","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[{"hangBiaoShi":9,"fuJieDianBiaoShi":3,"link":"登录日志.html","label":"登录日志","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":37,"fuJieDianBiaoShi":3,"link":"jiGouRenYuanRiZhi/toList.do","label":"机构人员日志","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]},{"hangBiaoShi":38,"fuJieDianBiaoShi":3,"link":"授权日志.html","label":"授权日志","icon":"","sgowRole":null,"guanLiYuanLeiXing":-1,"xianShiQuanXian":"","children":[]}]}];
		var listr="<li class='fm'><a numfs='fsFirst' url='Initialization.html'><div class='fs1' aria-hidden='true' data-icon='&#xe000;'></div>首页</a></li>";
		var chilidStr="";
		var chilidList="";
		var mdata="";
		//循环生成菜单
		for (var n=0;n<menuData.length;n++){
			mdata = menuData[n];//一级菜单
			chilidList = mdata.children;//一级菜单下的二级菜单
			listr+="<li class='fm"+n+"'><a numfs='fs"+n+"' url='"+mdata.link+"'><div class='fs1' aria-hidden='true' data-icon='"+mdata.icon+"'></div>"+mdata.label+"</a></li>";/*"+mdata.link+"*/
			//罗列二级菜单数据
			chilidStr += "<ul class='cmenu chl_fs"+n+"' style='display: none'>";
			for (var m=0;m<chilidList.length;m++){
				chilidStr += "<li class='chm"+m+"'><a id='tomNenu_"+n+"_"+m+"'  url='"+chilidList[m].link+"' class='towmenu_a'>"+chilidList[m].label+"</a></li>";/*"+chilidList[m].link+"*/
			}
			chilidStr +="</ul>";
		}
		$("#first_menu").html(listr);
		$("#tow_menu").html(chilidStr);
		//默认选中第一个菜单的第一个子菜单
		$("#first_menu a:eq(0)").addClass("selected");
		
}

//初始化一级菜单和二级菜单的点击事件
function initMenuClick(){
    //一级菜单的点击事件
    $("#first_menu a").click(function(){
        if(!$(this).hasClass("selected")){
            //清空其它菜单的class
            $("#first_menu a").removeClass("selected");
            $("#tow_menu a").removeClass("heading");
            $("#tow_menu ul").hide();
            //添加当前菜单的样式classs
            $(this).addClass("selected");
            var cmenu = $(this).attr("numfs");
            var liNum = $("#tow_menu .chl_"+cmenu+" li").length;
            if(liNum>0){
                $("#tow_menu").show();
                $("#tow_menu").attr("isShow","show");
                $("#tow_menu .chl_"+cmenu).show();
                $("#tow_menu .chl_"+cmenu+" a:eq(0)").addClass("heading");
                var id = $("#tow_menu .chl_"+cmenu+" a:eq(0)").attr("id");
                $("#tow_menu .chl_"+cmenu+" a:eq(0)").trigger("click");
                /*根据浏览器大小设置内容区域*/
                initCenterHeight(1);
            }else{
                $("#tow_menu").hide();
                $("#tow_menu").attr("isShow","hide");
                $('#centerFrameId').attr('src', $(this).attr("url"));
                /*根据浏览器大小设置内容区域*/
                initCenterHeight(0);
            }

        }
    })
    //二级菜单的点击事件
    $("#tow_menu a").click(function(){
    	$("#tow_menu a .glyphicon.glyphicon-pushpin").remove();
        $(this).html("<i class='glyphicon glyphicon-pushpin'></i>"+$(this).html());            
        if(!$(this).hasClass("heading")){
            $("#tow_menu a").removeClass("heading");
            $(this).addClass("heading");
            $('#centerFrameId').attr('src', $(this).attr("url"));
        }else{
            $('#centerFrameId').attr('src', $(this).attr("url"));
        }
    })
}

//展示左侧菜单
$("#toggleMenu").hover(function(){
	$(this).css("left", "1px");
},
function(){
	$(this).css("left", "-15px");
})

var flog = false;
function showLeftMenu(){	
	 if(!flog){
		 flog = true;
		 $(".menus").hide();
		 $(".menus").attr("isShow","hide");
		 $(".leftMenuList").show();
		 $("#centerFrameId").css("width","84%");
		 initCenterHeight(0);
		 if(typeof initTabHeight === "function"){
			 //initTabHeight("jiGouRenYuanTabContent");
		 }
		 //$(".leftMenuList").css("border","1px solid rgba(212, 193, 193, 0.74)");
		 $("iframe").css("border","1px solid rgba(110, 151, 177, 0.8)");
		 $("#toggleMenu a").html("<span class='glyphicon glyphicon-th'></span>");
	 }else{
		 flog = false;
		 $(".leftMenuList").hide();
		 $(".menus").show();
		 $(".menus").attr("isShow","show");
		 $("#centerFrameId").css("width","99%");
		 var showType =  $("#tow_menu").attr("isShow");
		 if(showType == 'hide'){
			 initCenterHeight(0);
		 }else{
			 initCenterHeight(1);
		 }
		  //$(".leftMenuList").css("border","");
		  $("iframe").css("border","");
		  $("#toggleMenu a").html("<span class='glyphicon glyphicon-list'></span>");
	 }
	 
	 //获取菜单数据罗列左侧菜单
	 if(flog){
		 getLeftMenuData();
	 }else{
		 var thisMenu  = $(".leftUl a.selected");
		 $("#first_menu a").removeClass("selected");

		 if(thisMenu.hasClass("towmenu_a")){
			 var classname = thisMenu.parent().attr("class");
			 var fmLi = thisMenu.parent().parents("li");
			 var fmLiclass= fmLi.attr("class");
			 var cmenu = fmLi.find("a").attr("numfs");
			 $("#first_menu ."+ fmLiclass +" a").addClass("selected");
			 $("#tow_menu").show();
			 $("#tow_menu").attr("isShow","show");
	         $("#tow_menu a").removeClass("heading");
			 $("#tow_menu a .glyphicon.glyphicon-pushpin").remove();
	         $("#tow_menu .chl_"+cmenu).show();
	         var muca =  $("#tow_menu .chl_"+cmenu+" ."+classname+" a");
	         muca.addClass("heading");
	         muca.html("<i class='glyphicon glyphicon-pushpin'></i>"+muca.html());
		 }else{
			 var fmLiclass = thisMenu.parent().attr("class");
			 $("#tow_menu").hide();
			 $("#tow_menu").attr("isShow","hide");
			 $("#first_menu ."+ fmLiclass +" a").addClass("selected");
		 }
	 }
}

/*获取左侧菜单数据*/
function getLeftMenuData(){
	$.ajax({
	    url:path+'/jiChuZhiChengTree/loadBannerTree.do?server=CPCNS_JHSKS',
	    type:"get", 
	    async:false, 
	    dataType:"json", 
	    success:function(data){
	    	//获取菜单数据
	        var menuData = data;
		    var listr="<li class='fm'><a numfs='fsFirst' url='Initialization.jsp'><span class='fs1' aria-hidden='true' data-icon='&#xe000;'></span>首页</a></li>";
		    var chilidList="";
		    var mdata="";
		    //循环生成菜单
		    for (var n=0;n<menuData.length;n++){
		        mdata = menuData[n];//一级菜单
		        chilidList = mdata.children;//一级菜单下的二级菜单
		        //罗列二级菜单数据
		        if(chilidList.length>0){
		        	listr+="<li class='fm"+n+"'><a numfs='fs"+n+"' url='"+mdata.link+"'><span class='fs1' aria-hidden='true' data-icon='"+mdata.icon+"'></span>"+mdata.label+"<i class='glyphicon glyphicon-menu-down'></i></a>";/*"+mdata.link+"*/
		        	var chilidStr="";
			        chilidStr += "<ul class='cmenu chl_fs"+n+"' style='display: none'>";
			        for (var m=0;m<chilidList.length;m++){
			            chilidStr += "<li class='chm"+m+"'><a id='tomNenu_"+n+"_"+m+"'  url='"+chilidList[m].link+"' class='towmenu_a'>"+chilidList[m].label+"</a></li>";/*"+chilidList[m].link+"*/
			        }
			        chilidStr +="</ul>";
			        listr += chilidStr+"</li>";
		        }else{
		        	listr+="<li class='fm"+n+"'><a numfs='fs"+n+"' url='"+mdata.link+"'><span class='fs1' aria-hidden='true' data-icon='"+mdata.icon+"'></span>"+mdata.label+"</a>";/*"+mdata.link+"*/
		        }
		        
		    }
		    $(".leftUl").html(listr);
		    initLeftMenu();
		    var thisMenu  = $("#first_menu a.selected");
			var classname = thisMenu.parent().attr("class");
			if($("#tow_menu").attr("isshow")=="show"){
				$(".leftUl ."+classname +" ul").show();
				$(".leftUl ."+classname +" ul").attr("isShow","show");
				$(".leftUl ."+classname +" i").attr("class","glyphicon glyphicon-menu-up");
				var cm = $(".towmenu_a.heading");
				var classN = cm.parent().attr("class");
				var menua =  $(".leftUl ."+classname +" ."+classN +" a");
				$(".leftUl a .glyphicon.glyphicon-pushpin").remove();
				menua.addClass("selected");
				menua.html("<i class='glyphicon glyphicon-pushpin'></i>"+menua.html()); 
			}else{
				$(".leftUl ."+classname +" a").addClass("selected");
			}
		}
	});
}

//初始化左侧菜单的点击事件
function initLeftMenu(){
    $(".leftUl a").click(function(){
    	var parLi = $(this).parent();
    	var uldiv = parLi.find("ul");
        if($(this).hasClass("towmenu_a")){
        	$(".leftUl a .glyphicon.glyphicon-pushpin").remove();
        	$(this).html("<i class='glyphicon glyphicon-pushpin'></i>"+$(this).html());  
        	if(!$(this).hasClass("selected")){
                //添加当前菜单的样式classs
                 $(".leftUl a").removeClass("selected");
                 $(this).addClass("selected");
                 $('#centerFrameId').attr('src', $(this).attr("url"));
            }else{
            	 $('#centerFrameId').attr('src', $(this).attr("url"));
            }
        }else{        
        	if(uldiv.length==0){
        		if(!$(this).hasClass("selected")){
                    //添加当前菜单的样式classs
                     $(".leftUl a").removeClass("selected");
                     $(this).addClass("selected");
                     $('#centerFrameId').attr('src', $(this).attr("url"));
                }else{
                	 $('#centerFrameId').attr('src', $(this).attr("url"));
                }
        		$("#tow_menu").attr("isShow","hide");
        	}else{
        		if(uldiv.attr("isShow")=="show"){
        			uldiv.attr("isShow","hide");
        			uldiv.hide();
        			$(this).find("i").attr("class","glyphicon glyphicon-menu-down");
        		}else{
        			uldiv.attr("isShow","show");
        			uldiv.show();
        			$(this).find("i").attr("class","glyphicon glyphicon-menu-up");
        		}
        		$("#tow_menu").attr("isShow","show");
        	}
        	
        }
    })
}


/*初始化右上角菜单按钮事件*/
function initRightEvent(){
    //设置按钮
    $("#setup,.sub_ul").mouseover(function(){
        $(this).addClass("onhover");
        //$(".sub_ul").addClass("onhover");
        $(".sub_ul").show();
    });
    $("#setup,.sub_ul").mouseout(function(){
        $(this).removeClass("onhover");
        if(!$("#setup").hasClass("onhover") && !$("#sub_li").hasClass("onhover")){
            $(".sub_ul").hide();
        }
    });
}





//退出登录按钮
function loginOut(){
    //执行需要执行的操作后退出
    //window.location.href='login.html';
    var url = '<%=AppConfiguration.getConfigValue("JiChuZhiCheng")%>';
	window.top.location.href='<%=AppConfiguration.getSSOLogoutKey()%>?url='+url+'index.jsp';
}

/*高级查询按钮*/
function onSearch(div){
    if($(".queryDiv").hasClass("open")){
        $(".queryDiv").hide();
        $(".queryDiv").removeClass("open");
        $(div).html("<i class='glyphicon glyphicon-chevron-down'></i>打开高级查询");
    }else{
        $(".queryDiv").show();
        $(".queryDiv").addClass("open");
        $(div).html("<i class='glyphicon glyphicon-chevron-up'></i>关闭高级查询");
    }
}

/*设置表格可选中*/
var nk;//记录表格选中的个数
var nl;//当前表格中的多选框个数
function initTableSelect(tableId,type,buttonId,inputName){/*tableId:表格id, type:0单选 or 1多选, buttonId:当前表格中全选按钮的id, inputName:当前表格多选框input名称*/
    nk = 0;
    nl = $('#'+tableId+' tbody').find(".checkb").length;
    var table = $('#'+tableId).DataTable();
    
    //鼠标单击
    $('#'+tableId+' tbody').on( 'click', 'tr', function () {
        if ($(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            if(inputName!=null){
                $(this).find('input[name='+inputName+']').prop('checked', false);
                nk--;
            }
        }
        else {
            if(type<1){
                table.$('tr.selected').removeClass('selected');
            }
            $(this).addClass('selected');
            if(inputName!=null){
                $(this).find('input[name='+inputName+']').prop('checked', true);
                nk++;
            }
        }
        if(nk==nl){
            $("#"+buttonId).prop("checked", true);
        }else{
            $("#"+buttonId).prop("checked", false);
        }
    } );
    
    if(buttonId!=null){
    	//全选和取消全选
        $("#"+buttonId).click(function(){
            if($(this).hasClass("checknew")){
                $(this).removeClass("checknew");
                $('input[name='+inputName+']').prop("checked", false);
                table.$('tr.selected').removeClass('selected');
            }else{
                $(this).addClass("checknew");
                $('input[name='+inputName+']').prop("checked", true);
                table.$('tr').addClass('selected');
            }
        })
    }
    //设置列表表格横向滚动条不显示
    $(".dataTables_scrollBody").css("overflow-x","hidden");
}

/*当前表格搜索初始化*/
function initSeltSearch(divId){
	$( "input[type=search]").unbind();
	$( "input[type=search]").bind( "keyup", function () {
		searchState=1;
		var seachValue = this.value.replace(/(^\s*)|(\s*$)/g, "").trim();
		var state = 0;
		var trlist = $("#"+divId+" tbody").find('tr');
		trlist.each(function(){
			var tr = $(this);
			state = 0;
			if(seachValue==""){
				state=1;//1显示，2隐藏
			}else{
				tr.find("td").each(function(){
					var text = $(this)[0].textContent;
					if(text.indexOf(seachValue)>-1){
						state = 1;
					}
				})
			}
			if(state==1){
				tr.show();
			}else{
				tr.hide();
			}
		})
	});
	
	$(".paginate_button").click(function(){
		searchState=0;
	})
}


/*提示框，确认框，警告框*/
var reset = function () {
    alertify.set({
        labels: {
            ok: "确定",
            cancel: "取消"
        },
        delay: 5000,
        buttonReverse: false,
        buttonFocus: "ok"
    });
};

function  showAlertDiv(index){
	centeralertify();
    if(index==1){
        reset();
        alertify.alert("这是弹出框");
        return false;
    }else if(index==2){
		showMask();
        reset();
        alertify.confirm("这是确认框", function (e) {
            if (e) {
                alertify.success("您已确认信息！");
            } else {
                alertify.error("您取消了！");
            }
            hideMask();
        });
        return false;
    }else if(index==3){
		showMask();
        reset();
        alertify.prompt("这是信息输入框", function (e, str) {
            if (e) {
                alertify.success("是正确提示框！");
            } else {
                alertify.error("这是错误提示框！");
            }
            hideMask();
        }, "这填入数据");
        return false;
    }else if(index==4){
        reset();
        alertify.set({
            delay: 5000
        });
        alertify.log("如不点击五秒后自动隐藏");
        return false;

    }else if(index==5){
        reset();
        alertify.log("点击后才隐藏", "", 0);
        return false;
    }

    /*其它格式*/
    /*var msg = "<img src='https://placehold.it/256x128'>" +
	    "<h3>这里是HTML内容</h3>" +
	    "<p>看起来不错，不是吗？</p>";
	alertify.log(msg);
	
    alertify.log("右下角");
    
    alertify.delay(10000).log("10秒后隐藏");
    
    alertify.delay(0).log("一直显示直到被单击");
    
    alertify.closeLogOnClick(true).log("单击关闭");*/

}

//显示遮罩层  
function showMask(){  
    parent.$("#mask").css("height",$(document).height());   
    parent.$("#mask").css("width",$(document).width());   
    parent.$("#mask").show();   
}
//隐藏遮罩层
function hideMask(){   
	parent.$("#mask").hide();   
}

/*根据分页信息获取页面显示个数和当前页码*/
function getPageData(aoData){
	
	 var pageSize = aoData[4].value;
     var startNum = aoData[3].value;
     var pageNum = parseInt(startNum/pageSize)+1; 
     
     return {"pageSize":pageSize,"pageNum":pageNum};
}

/* 设置模态框居中 */
function centerModals(showType,topVal,leftVal) {  
　　$(".modalDiv").each(function(i) {  
	  var top = 0,left = 0;
	  //居中显示
	  if(showType=="center" || showType==null){
	  	var $clone = $(this).clone().css('display','block').appendTo('body');
　　　　	top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	  	left = Math.round(($clone.width() - $clone.find('.modal-content').width()) / 2);
	  	$clone.remove();
	  }else{
	  	 top = topVal;
	  	 left = leftVal;
	  }

　　　　top = top > 0 ? top : 0;  
	  left = left > 0 ? left : 0; 
　　　　   
　　　　$(this).find('.modal-content').css("margin-top", top);   
	  $(this).find('.modal-content').css("margin-left", left);   
　　});    
};  
	
/* 设置提示框居中 */
function centeralertify(){
	$(".alertify").each(function(i) {  
	  var top = 0,left = 0;
	  //居中显示
	  	  var wh = $(window).height();
	  	  var sh = $(this).height();
　　　	  top = Math.round((wh-sh) / 2);	  	  
	　　　　top = top > 0 ? top : 0;  
	　　　　$(this).css("top", top);   
　　});   
}
//验证名称，名称不能有特殊符号,当返回true表示输入的名称不可用是不合法的，false表是不是不可用的，是合法的
//nameVal是要验证的字符串
function NameIsUnusable(nameVal){
	 var pattern_name = /^[\w_:\s\u4e00-\u9fa5]*$/;
	 if(pattern_name.test(nameVal)){
		 return false;
	 }else{
		 return true
	 }
 }
