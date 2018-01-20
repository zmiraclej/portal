<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<!DOCTYPE html>
<html>
<head>
<title id="Description">通知查询</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!--
    注意样式表优先级
    主题样式必须在easyui组件样式后。
-->
  
<link href="${ctx}/easyui/themes/insdep/easyui.css" rel="stylesheet" type="text/css">
<link href="${ctx}/easyui/themes/insdep/easyui_animation.css" rel="stylesheet" type="text/css">
<!--
    easyui_animation.css
    Insdep对easyui的额外增加的动画效果样式，根据需求引入或不引入，此样式不会对easyui产生影响
-->
 
<link href="${ctx}/easyui/themes/insdep/easyui_plus.css" rel="stylesheet" type="text/css">
<!--
    easyui_plus.css
    Insdep对easyui的额外增强样式,内涵所有 insdep_xxx.css 的所有组件样式
    根据需求可单独引入insdep_xxx.css或不引入，此样式不会对easyui产生影响
-->
 
<link href="${ctx}/easyui/themes/insdep/insdep_theme_default.css" rel="stylesheet" type="text/css">
<!--
    insdep_theme_default.css
    Insdep官方默认主题样式,更新需要自行引入，此样式不会对easyui产生影响
-->
 
<link href="${ctx}/easyui/themes/insdep/icon.css" rel="stylesheet" type="text/css">
<!--
    icon.css
    美化过的easyui官方icons样式，根据需要自行引入
-->

 
</head>

<body>
	
	<div id="parentNotice" class="easyui-tabs" style="width:100%;height:100%" >
		<div id="sendParentNotice" title="发送" iconCls="icon-man" style="padding: 10px">
			<div >
				<div >
					<div id="tab1" >
						<div>
							<div class="toParentSelect" style="width: 800px; float: right;">
								<!-- <a  href="javascript:void(0)" id="toParentSelect"> -->
								<div style="width: 200px; font-size: 15px; display: inline;">
									<p>发送给谁</p>
								</div>
								</a>
								<div>
									<ul id="treeDemo" class="ztree"></ul>
								</div>
							</div>
							<div>
								<div>
									<div style="width: 200px; font-size: 15px;">短信通知</div>
									<div>
										<input id="sendMessageFlg" type="checkbox"  value="checkbox"  >
									</div>
								</div>
							</div>
							<div>
								<div style="width: 200px; font-size: 15px;">通知标题</div>
								<div>
									<div>
										<div>
											<input class="input" type="textarea" placeholder="请输入通知标题,最多40字"
												style="border: 1px solid; width: 500px; height: 30px"
												id="title"  maxlength="40">
										</div>
									</div>
								</div>
							</div>

							<div>
								<div style="width: 200px; font-size: 15px;">通知内容</div>
								<div>
									<div>
										<div>
											<textarea class="textarea" placeholder="请输入通知内容,最多300字"
												style="width: 500px; height: 200px" id="content"  maxlength="300"></textarea>
										</div>
									</div>
								</div>

							</div>
							 <div style='background-color: #f8f8f8; padding: 5px;'>
								<p>当前所选家长人数</p>
							</div>
							<div>
								<div>
									<span style="margin-left: 15px; color: #707070 ;">可选人数</span><span
										id="totalNum"
										style="margin-left: 15px; font-size: 30px; color: #DAA520 ;">0</span>
								</div>
								<div>
									<span style="margin-left: 15px;color: #707070 ;">已选人数</span><span id="selectedNum"
										style="margin-left: 15px; font-size: 30px; color: green;">0</span>
								</div>
							</div> 
						</div>

					</div>
					</div>
				</div>

				<div >
					<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" id="publish">提交</a>
				</div>
			</div>

			<input type="hidden" id="psId" value="${psId}">
		
	<div id="viewParentNotice" title="查看" iconCls="icon-man"
		style="padding: 10px">
		<div >
					<c:forEach items="${array}" var="arr">
						<div>
							<div style="font-size: 30px; border-bottom: 1px solid #4F94CD;">${arr.month}月</div>
								<c:forEach items="${arr.notices}" var="item">
									<a href="${ctx}/detail/${item.noticeNo}">
											<p style="font-size:15px">${item.title}</p>
											<p style="font-size:15px">${item.publishTime}</p>
									</a>
								</c:forEach>
							</div>
					</c:forEach>
		</div>
	</div>
	</div>
	<input type="hidden" id="psId" value="${psId}">
	<script type="text/javascript" src="${ctx}/easyui/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx}/easyui/jquery.easyui-1.5.1.min.js"></script>
	<script type="text/javascript" src="${ctx}/easyui/themes/insdep/jquery.insdep-extend.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/ztree/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="${ctx}/js/ztree/jquery.ztree.exedit.js"></script>
	<script type="text/javascript" src="${ctx}/js/ztree/jquery.ztree.excheck.js"></script>
	<link href="${ctx}/css/ztree/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css">
	
<script type="text/javascript">
		var zNodes;
		var zTree;
		var setting = {
		        view: {
		            nameIsHTML: true
		        },
		        data: {
		            simpleData: {
		                enable: true
		            },
		            keep: {
		                parent: true
		            }
		        },
		        check:{
		        	enable: true,
		    		chkStyle: "checkbox",
		    		chkboxType: { "Y" : "ps", "N" : "ps" },
		    		chkDisabledInherit: false
		        },
		        open: false,
		        callback: {
		            onClick: nodeClick,
		            onExpand: function (event, treeId, treeNode) {
		                addSubNode(treeNode);
		            },
		        	onCheck: zTreeOnCheck,
		        }
		    };

		$(function () {
	        $.ajax({
	            cache: true,
	            type: "get",
	            url: "${ctx}/parentNotice/searchClassTree",
	            data: { pid: '' },
	            async: false,
	            success: function (result) {
	            	//console.log("result");
	            	//console.log(result.data);
	                zNodes = result.data;
	            },
	            error: function (data) {
	                alert("error");
	            }
	        });
	        
	    	function filter(node) {
	    		return node;
	    	}

	    	$(function() {
	    		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	    		var nodes = zTree.getNodesByFilter(filter);
	    		for (var i = 0; i < nodes.length; i++) {
	                var node = nodes[i];
	                var id = node.id;
	                var idHeader = id.substring(0, 1);
	                if (idHeader == "S" || idHeader == "G") {
	                node.nocheck = true; //表示显示checkbox
	                zTree.updateNode(node);
	                }
	            }
	    	});
	        zTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	        zTree.expandAll(false);
	        zTree.expandNode(zTree.getNodes()[0], true, false, true);
	    })
	    
		 function showIconForTree(treeId, treeNode) {
		        return !treeNode.isParent;
		    };
		
		    function searchM() {
		        var username = $("#txtName").val()
		
		    }
		
		    function nodeClick(event, treeId, treeNode, clickFlag) {
		        addSubNode(treeNode);
		    }
		    
		    function addSubNode(treeNode) {
		        if (!treeNode.isParent) return;
		        var s = treeNode.children;
		        if (s != undefined)
		            return;
		        $.ajax({
		            cache: true,
		            type: "get",
		            url: "${ctx}/parentNotice/searchClassTree",
		            data: { pid: treeNode.id },
		            async: true,
		            success: function (data) {
		                zTree.addNodes(treeNode, data.data);
		            },
		            error: function (data) {
		                alert("error");
		            }
		        });
		    }
		   

	function zTreeOnCheck(event, treeId, treeNode) {
		var id = treeNode.id;
		var idHeader = id.substring(0, 1);
		//console.log("nodes =" + nodes.length);

		if (idHeader == "S" || idHeader == "G") {
			var params = [];
			if (idHeader == "S") {
				//treeNode.nocheck;
				var gNodes = treeNode.children;
				for (var i = 0; i < gNodes.length; i++) {
					var cNode = gNodes[i];
					var cNodeId = cNode.id;
					var p = {};
					p["gradeKeyNo"] = cNodeId.substring(1, cNodeId.length);
					p["selected"] = cNode.checked;

					params.push(p);
				}
			} else if (idHeader == "G") {
				var gNodes = treeNode.children;
				var params = [];
				for (var i = 0; i < gNodes.length; i++) {
					var cNode = gNodes[i];
					var cNodeId = cNode.id;
					var p = {};
					p["gradeKeyNo"] = cNodeId.substring(1, cNodeId.length);
					p["selected"] = cNode.checked;
					params.push(p);
				}
			}

			/* $.messager.progress({ 
			    title: '提示', 
			      　　msg: '数据提交中，请稍候……', 
			      　　text: '' 
			   　　}); */
			//console.log("params");
			//console.log(params);
			$.ajax({
				url : "${ctx}/parentNotice/saveParentGradeSelect",
				type : "POST",
				contentType : "application/json",
				dataType : "json",
				data : JSON.stringify(params),
				success : function(result) {
					if ('02' == result.code) {
						refreshSelectedInfo();
					} else {
					}
					$.messager.progress('close');
				}
			});
		} else if (idHeader == "C") {
			//var id = treeNode.id;
			var params = [];
			var gNodes = treeNode.children;
			for (var i = 0; i < gNodes.length; i++) {
				var cNode = gNodes[i];
				var cNodeId = cNode.id;
				var p = {};
				p["classKeyNo"] = cNodeId.substring(1, cNodeId.length);
				p["selected"] = cNode.checked;
				params.push(p);
			}

			/* p["classKeyNo"] = id.substring(1,id.length);
			p["selected"] = treeNode.checked;
			params.push(p); */

			$.ajax({
				url : "${ctx}/parentNotice/saveParentClassSelect",
				type : "POST",
				contentType : "application/json",
				dataType : "json",
				data : JSON.stringify(params),
				success : function(result) {

					if ('02' == result.code) {
						refreshSelectedInfo();
					} else {
					}
					$.messager.progress('close');
				}
			});
		} else if (idHeader == "P") {
			var id = treeNode.id;

			var params = [];
			var p = {};
			p["parentKeyNo"] = id.substring(1, id.length);
			p["selected"] = treeNode.checked;
			params.push(p);

			$.ajax({
				url : "${ctx}/parentNotice/saveParentSelect",
				type : "POST",
				contentType : "application/json",
				dataType : "json",
				data : JSON.stringify(params),
				success : function(result) {

					if ('02' == result.code) {
						refreshSelectedInfo();
					} else {
					}
					$.messager.progress('close');
				}
			});
		}

	};

	function refreshSelectedInfo() {
		$.ajax({
			url : "${ctx}/parentNotice/searchSelectedInfo",
			type : "GET",
			contentType : "application/json",
			dataType : "json",
			success : function(result) {
				if ('02' == result.code) {
					//console.log("result.data");
					//console.log(result);
					var data = result.data;
					//console.log("data");
					//console.log(data);
					$("#totalNum").html(data["total"]);
					$("#selectedNum").html(data["selected"]);
					var ts = data["selectedParents"];
					//console.log(ts);
					var disVal1 = "";
					for (var i = 0; i < ts.length; i = i + 2) {
						disVal1 = disVal1 + "<tr><td>" + ts[i] + "</td>";
						if ((i + 1) < ts.length) {
							disVal1 = disVal1 + "<td>" + ts[i + 1] + "</td>";
						}

						disVal1 = disVal1 + "</tr>";
					}
					//console.log(disVal1);
					$("#selectedTeachers").empty();
					$("#selectedTeachers").append(disVal1);

					// $("#st1").html(disVal1);
					/*$("#st2").html(disVal2); */
				} else {
				}
			}
		});
	}

	//短信发送
	var title;
	var content;
	$("#publish").click(
			function() {
				 title = $("#title").val();
				 content = $("#content").val();
				var selectedNum = $("#selectedNum").text();
				//console.log(selectedNum);
				if (title == '') {
					$.messager.alert("提示", "请输入通知标题");
				} else if (content == '') {
					$.messager.alert("提示", "请输入通知内容");
				} else if (selectedNum == 0) {
					$.messager.alert("提示", "请选择通知接收人");
				} else {
					$.messager.confirm("您是否要发布此家长通知", "确认发布?", function(data) {
						if (data) {

							var psId = $("#psId").val();

							var param = {};
							param["title"] = title;
							param["content"] = content;
							param["psId"] = psId;
							param["sendMessageFlg"] = $("#sendMessageFlg").is(
									':checked');

							//console.log("param");
							//console.log(param);

							//$("#parentNotice").showLoading("正在发送通知");
							$.ajax({
								url : "${ctx}/saveNotice",
								type : "post",
								contentType : "application/json",
								dataType : "json",
								data : JSON.stringify(param),
								success : function(data) {
									if ("02" == data.code) {
										title = $("#title").val("");
										content = $("#content").val("");
										window.location.reload();
										//window.location.href="${ctx}/toParenteNotice";
									}
								}
							});
						} else {

						}
					}

					);
				}

			});
</script>	
	
</body>
</html>
