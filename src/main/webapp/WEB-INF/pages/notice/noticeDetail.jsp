<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<html>
<head>
<title>通知详情</title>
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
<style>
    .send_columns {
        column-count: 3;
        column-gap: 3px;
    }

</style>
</head>
<body ontouchstart>
	<div >
		<!-- <div style="width:200px; display:inline-block;font-size:20px;border-bottom: 1px solid #4F94CD;">通知内容</div> -->
		<a href="#" class="easyui-linkbutton" plain="true" iconCls="icon-back" onclick="javascript:window.history.back(-1);">返回</a>
		<div style="border-bottom: 1px solid #4F94CD;">
			<table>
				<tr>
					<td>
					<span  style="color:blue;">标题:</span>${title}
					</td>
				</tr>
				<tr> 
					<td>
					<span  style="color:blue;">内容:</span>${content}
					</td>
				</tr>
			</table>
		      <%-- <div style="font-size:25px;">${title}</div>
		      <div style="font-size:20px;"> ${content}</div> --%>
		</div>
	</div>
	<div style="overflow-y:auto; height:100%;">
		<div style="font-size:15px;border-bottom: 1px solid #4F94CD;">通知发送详情：</div>
		<div >
			<div class="send_columns" style="width:100%">
					<div style="margin-left:10px;">
						<div style="font-size:15px;">姓名</div>
							<c:forEach items="${sendDetails}" var="item">
								<div style="font-size:15px;">${item.studentName}</div>
							</c:forEach>
					</div>
					<div>
						<div style="font-size:15px;">短信</div> 
						<c:forEach items="${sendDetails}" var="item">
							<div style="font-size:15px;">${item.shortMsgStatus}</div>
						</c:forEach>
					</div>
					<div>
						<div style="font-size:15px;">微信</div>
						<c:forEach items="${sendDetails}" var="item">
							<div style="font-size:15px;">${item.wxStatus}</div>
						</c:forEach>
					</div>
			</div>
		</div>
	</div>
	
	
<script type="text/javascript" src="${ctx}/easyui/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/easyui/jquery.easyui-1.5.1.min.js"></script>
<script type="text/javascript" src="${ctx}/easyui/themes/insdep/jquery.insdep-extend.min.js"></script>
</body>
</html>
