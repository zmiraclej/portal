window.onload = function() {
	// 璁剧疆骞翠唤鐨勯�夋嫨
	var OaLogin = $("#oaLogin").attr("href");
	$.ajax({
		type : "GET",
		url : OaLogin,
		dataType: 'JSONP',//here
		success:function(result){
			console.log(result);
		}
	});
}
//定义OA的服务器链接
var oaUrl='http://oa.jxfls.com:8088';
//首页查询OA接口数据
$(function(){
	$.ajax({ 									
		type : "GET",
		url : "/jx-web-portal/searchImagesAndNews",
		dataType : "json",
		data : {
		},
		success : function(result) {
			if("02" == result.code){				
				if(result.data!=null){
					var content="";
					var length=6;
					if(result.data.length<length){
						length=result.data.length;
					};
					var picWidth=document.getElementById("newsPicDiv").clientWidth-25;
					var searchPicUrl=oaUrl+"/seeyon/newsData.do?method=newsIndex&spaceType=2";
					for (var i = 0; i < length; i++) {
						var NewsDatasRet=result.data[i];
						if(NewsDatasRet.imageNews){
							var imgUrl=NewsDatasRet.imgUrl;
							var id=NewsDatasRet.id;
							var title=NewsDatasRet.title;
							if(imgUrl==""||imgUrl==null){
							}else{
								var src = oaUrl+imgUrl;
								var hrefUrl=oaUrl+"/seeyon/newsData.do?method=newsView&newsId="+id;
								content+='<li><a href="'+hrefUrl+'"><span style="position:absolute;display:block;,margin-top:5px;margin-left:5px;text-align:center">'
								+title+'</span><img src="'+src+'" style="height:220px;width:'+picWidth+'px"></a></li>';
							}
						}
					}
					$("#newsUi").append(content);
					$("#imageMore").attr("href",searchPicUrl); 
					//增加图片轮播事件
					var unslider04 = $('#b04').unslider({
				        dots: true  //是否显示翻页圆点
				    }),
				     data04 = unslider04.data('unslider'); 
				    
				     $('.unslider-arrow04').click(function(){
				        var fn = this.className.split(' ')[1];
				        data04[fn]();
				    }); 
				}
				if(result.unidNewsData!=null){
					var content="";
					var length=8;
					if(result.unidNewsData.length<length){
						length=result.unidNewsData.length;
					};
					var searchNewsUrl="http://oa.jxfls.com:8088/seeyon/newsData.do?method=newsIndex&spaceType=2";
					for (var i = 0; i < length; i++) {
						var newRecords=result.unidNewsData[i];
						var publishDate=new Date(newRecords.publishDate).toLocaleDateString();
						var publishDepartmentName=newRecords.publishDepartmentName;
						var id=newRecords.id;
						var title=newRecords.title;
						var hrefUrl=oaUrl+"/seeyon/newsData.do?method=newsView&newsId="+id;
						content+='<li><a href="'+hrefUrl+'"><span style="width:40%;height:25px;overflow:hidden;display:inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'+title+
						'</span><span style="width:8%;float:right;height:25px;overflow:hidden;display:inline-block;text-overflow:ellipsis;white-space:nowrap">'+publishDate+
						'</span><span style="width:20%;float:right;height:25px;overflow:hidden;display:inline-block;text-overflow:ellipsis;white-space:nowrap;margin-right:15px">'+publishDepartmentName+
						'</span></a></li>'				
					}			
					$("#danweiNews").append(content);
					$("#danweiNewsMore").attr("href",searchNewsUrl); 
				}
				if(result.gonggaoData!=null){
					var content="";
					var searchGonggaoUrl=oaUrl+"/seeyon/bulData.do?method=bulIndex&spaceType=2";
					var length=8;
					if(result.gonggaoData.length<length){
						length=result.gonggaoData.length;
					};
					for (var i = 0; i < length; i++) {
						var gonggaoRecords=result.gonggaoData[i];
						var publishDate=new Date(gonggaoRecords.publishDate).toLocaleDateString();
						var publishDeptName=gonggaoRecords.publishDeptName;
						var id=gonggaoRecords.id;
						var title=gonggaoRecords.title;
						var hrefUrl=oaUrl+"/seeyon/bulData.do?method=bulView&bulId="+id;
						content+='<li><a href="'+hrefUrl+'" style="border:3px"><span style="float:left;width:40%; height:25px; display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+title+
						'</span><span style="float:right;width:8%;height:25px;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+publishDate+
						'</span><span style="float:right;width:20%;height:25px;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:15px">'+publishDeptName+
						'</span></a></li>'
					}
					$("#companyGonggao").append(content);
					$("#companyGonggaoMore").attr("href",searchGonggaoUrl); 
				}
				if(result.sxDbData!=null){
					var content="";
					if(result.sxDbData.data!=null){
						var length=8;
						if(result.sxDbData.data.length<length){
							length=result.sxDbData.data.length;
						};
						for (var i = 0; i < length; i++) {
							var record=result.sxDbData.data[i];
							var id=record.id;
							var subject=record.subject;
							var subState=record.subState;
							var createTime=new Date(record.receiveTime).toLocaleDateString();
							var hrefUrl=oaUrl+"/seeyon/collaboration/collaboration.do?method=summary&openFrom=listPending&affairId="+id;
							var contentChild="";
							if(subState==11){
								contentChild='<li><a href="'+hrefUrl+'"><span style="width:40%;height:25px; overflow: hidden;display: inline-block;float:left;font-weight:bold;text-overflow:ellipsis;white-space:nowrap">'
								+subject+'</span><div style="height:25px;float:right;width:10%;overflow: hidden;display: inline-block"><a href="'+oaUrl+'/seeyon/collaboration/collaboration.do?method=listPending&openFrom=listPending" style="font-weight:bold;"><font color=blue>协同</font></a></div>'+
								'<span style="width:10%;height:25px; margin-right:15px;float:right;font-weight:bold;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
								+createTime+'</span></a></li>';
							}else{
								contentChild='<li><a href="'+hrefUrl+'"><span style="width:40%;height:25px; overflow: hidden; display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'
								+subject+'</span><div style="height:25px;float:right;width:10%;overflow: hidden;display: inline-block"><a href="'+oaUrl+'/seeyon/collaboration/collaboration.do?method=listPending&openFrom=listPending"><font color=blue>协同</font></a></div>'+
								'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
								+createTime+'</span></a></li>';
							}
							
							content+=contentChild;
						}
					}
					$("#daibanshixiang").html(content);
				}
				if(result.sxZzData!=null){
					var content="";
					if(result.sxZzData.data!=null){
						var length=8;
						if(result.sxZzData.data.length<length){
							length=result.sxZzData.data.length;
						};
						for (var i = 0; i < length; i++) {
							var record=result.sxZzData.data[i];
							var id=record.id;
							var subject=record.subject;
							var subState=record.subState;
							var createTime=new Date(record.receiveTime).toLocaleDateString();
							var hrefUrl=oaUrl+"/seeyon/collaboration/collaboration.do?method=summary&openFrom=listDone&affairId="+id;
							var contentChild="";
							if(subState==11){
								contentChild='<li><a href="'+hrefUrl+'" style="height:30px;"><span style="width:40%;height:25px; overflow: hidden;display: inline-block;float:left;font-weight:bold;text-overflow:ellipsis;white-space:nowrap">'
								+subject+'</span><div style="height:25px;float:right;width:10%"><a href="'+oaUrl+'/seeyon/collaboration/collaboration.do?method=listPending&openFrom=listPending" style="font-weight:bold;"><font color=blue>协同</font></a></div>'+
								'<span style="width:10%;height:25px; margin-right:15px;float:right;font-weight:bold;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
								+createTime+'</span></a></li>';
							}else{
								contentChild='<li><a href="'+hrefUrl+'" ><span style="width:40%;height:25px; overflow: hidden; display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap"">'
								+subject+'</span><div style="height:25px;float:right;width:10%"><a href="'+oaUrl+'/seeyon/collaboration/collaboration.do?method=listDone"><font color=blue>协同</font></a></div>'+
								'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
								+createTime+'</span></a></li>';
							}
							content+=contentChild;
						}
					}
					$("#genzongshixiang").html(content);
				}
				if(result.gwDbRecords!=null){
					var content="";
					var length=8;
					if(result.gwDbRecords.length<length){
						length=result.gwDbRecords.length;
					};
					for (var i = 0; i < length; i++) {
						var record=result.gwDbRecords[i];
						var id=record.id;//公文ID
						var title=record.title;//公文标题
						var openUrl=record.url;//打开连接
						var sendMember=record.sendMember;//发起人
						var appStatus=record.app;//公文标记---19发文 20收文 21签报
						var createTime=new Date(record.createDate).toLocaleDateString();
						var hrefUrl=oaUrl+"/seeyon"+openUrl;
						var contentChild="";
						if(appStatus==19){
							contentChild='<li><a href="'+hrefUrl+'" style="height:30px;"><span style="width:40%;height:25px; overflow: hidden;display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'
							+title+'</span><div style="height:25px;float:right;width:10%"><a href="'+oaUrl+'/seeyon/edocController.do?method=entryManager&entry=sendManager&listType=listPending"><font color=blue>发文</font></a></div>'+
							'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+sendMember+'</span><span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+createTime+'</span></a></li>';
						}else if(appStatus==20){
							contentChild='<li><a href="'+hrefUrl+'" style="height:30px;"><span style="width:40%;height:25px; overflow: hidden;display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'
							+title+'</span><div style="height:25px;float:right;width:10%"><a href="'+oaUrl+'/seeyon/edocController.do?method=entryManager&entry=recManager&listType=listPending"><font color=blue>收文</font></a></div>'+
							'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+sendMember+'</span><span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+createTime+'</span></a></li>';
						}else if(appStatus==21){
							contentChild='<li><a href="'+hrefUrl+'" style="height:30px;"><span style="width:40%;height:25px; overflow: hidden;display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'
							+title+'</span><div style="height:25px;float:right;width:10%"><a href="'+oaUrl+'/seeyon/edocController.do?method=entryManager&entry=recManager&listType=listV5Register"><font color=blue>发文</font></a></div>'+
							'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+sendMember+'</span><span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+createTime+'</span></a></li>';
						}
						content+=contentChild;
					}
					$("#daibanGongwen").html(content);
				}
				if(result.gwYbRecords!=null){
					var content="";
					var length=8;
					if(result.gwYbRecords.length<length){
						length=result.gwYbRecords.length;
					};
					for (var i = 0; i < length; i++) {
						var record=result.gwYbRecords[i];
						var id=record.id;//公文ID
						var title=record.title;//公文标题
						var openUrl=record.url;//打开连接
						var sendMember=record.sendMember;//发起人
						var appStatus=record.app;//公文标记---19发文 20收文 21签报
						var createTime=new Date(record.createDate).toLocaleDateString();
						var hrefUrl="http://oa.jxfls.com:8088/seeyon"+openUrl;
						var contentChild="";
						if(appStatus==19){
							contentChild='<li><a href="'+hrefUrl+'" style="height:30px;"><span style="width:40%;height:25px; overflow: hidden;display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'
							+title+'</span><div style="height:25px;float:right;width:10%"><a href="'+oaUrl+'/seeyon/edocController.do?method=entryManager&entry=sendManager&listType=listPending"><font color=blue>发文</font></a></div>'+
							'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+sendMember+'</span><span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+createTime+'</span></a></li>';
						}else if(appStatus==20){
							contentChild='<li><a href="'+hrefUrl+'" style="height:30px;"><span style="width:40%;height:25px; overflow: hidden;display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'
							+title+'</span><div style="height:25px;float:right;width:10%"><a href="'+oaUrl+'/seeyon/edocController.do?method=entryManager&entry=recManager&listType=listPending"><font color=blue>收文</font></a></div>'+
							'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+sendMember+'</span><span style="width:80px;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+createTime+'</span></a></li>';
						}else if(appStatus==21){
							contentChild='<li><a href="'+hrefUrl+'" style="height:30px;"><span style="width:50%;height:25px; overflow: hidden;display: inline-block;float:left;text-overflow:ellipsis;white-space:nowrap">'
							+title+'</span><div style="height:25px;float:right;width:40px"><a href="'+oaUrl+'/seeyon/edocController.do?method=entryManager&entry=recManager&listType=listV5Register"><font color=blue>发文</font></a></div>'+
							'<span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+sendMember+'</span><span style="width:10%;height:25px; margin-right:15px;float:right;overflow: hidden;display: inline-block;text-overflow:ellipsis;white-space:nowrap">'
							+createTime+'</span></a></li>';
						}
						content+=contentChild;
					}
					$("#yibanGongwen").html(content);
				}
			}
		},
		error: function (result) {
		}
	})	
})

/*//浠ｅ姙鍏枃
$(function(){
	var content=""
	$.ajax({ 									
		type : "GET",
		url : "/jx-web-portal/searchDaibanGw",
		dataType : "json",
		data : {	
		},
		success : function(result) {
			if("02" == result.code){
				var searchMoreUrl="http://oa.jxfls.com:8088/seeyon/bulData.do?method=bulIndex&spaceType=2";
				if(result.data!=null){
					var length=8;
					if(result.data.length<length){
						length=result.data.length;
					};
					for (var i = 0; i < length; i++) {
						var NewsDatasRet=result.data[i];
						var id=NewsDatasRet.id;
						var subject=NewsDatasRet.subject;
						var hrefUrl="http://oa.jxfls.com:8088/seeyon/bulData.do?method=bulViews&newsId="+id;
						content+='<li><a href="'+hrefUrl+'" style="border:3px"><span>'+subject+'</span></a></li>'
					}
				}
				$("#daibanGongwen").append(content);
				$("#companyGongwen").attr("href",searchMoreUrl); 
			}
		},
		error: function (result) {
		}
	})	
})*/

/*//宸插姙鍏枃
$(function(){
	var content=""
	$.ajax({ 									
		type : "GET",
		url : "/jx-web-portal/searchYibanGw",
		dataType : "json",
		data : {	
		},
		success : function(result) {
			if("02" == result.code){
				var searchMoreUrl="http://oa.jxfls.com:8088/seeyon/bulData.do?method=bulIndex&spaceType=2";
				if(result.data!=null){
					var length=8;
					if(result.data.length<length){
						length=result.data.length;
					};
					for (var i = 0; i < length; i++) {
						var NewsDatasRet=result.data[i];
						var id=NewsDatasRet.id;
						var subject=NewsDatasRet.subject;
						var hrefUrl="http://oa.jxfls.com:8088/seeyon/bulData.do?method=bulViews&newsId="+id;
						content+='<li><a href="'+hrefUrl+'" style="border:3px"><span>'+subject+'</span></a></li>'
					}
				}
				$("#yibanGongwen").append(content);
			}
		},
		error: function (result) {
		}
	})	
})
*/













