<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">学生档案</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="css/jqueryTable/jqx.base.css" type="text/css" />
	    <!-- Bootstrap 3.3.6 -->
	<link rel="stylesheet" href="js/plugins/bootstrap/css/bootstrap.css">
	  <!-- Font Awesome -->
	<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="css/ionicons/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="css/AdminLTE.min.css">
	<!-- AdminLTE Skins. Choose a skin from the css/skins
	     folder instead of downloading all of them to reduce the load. -->
	<link rel="stylesheet" href="css/skins/_all-skins.min.css">
	<link rel="stylesheet" href="css/pages/mycss.css">
	<link rel="stylesheet" href="css/pages/queryFile.css">
	<link rel="stylesheet" href="js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">	
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
	<link rel="stylesheet" href="js/plugins/layui/css/layui.css">
	<link rel="stylesheet" href="css/pages/report.css">
</head>

<body class="hold-transition skin-blue-light sidebar-mini">
	<div class="wrapper">

		<!-- 头部开始 -->
		<jsp:include page="../includes/top.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>
		<!-- 头部结束 -->


		<!-- 左边部分       startup -->
		<jsp:include page="../includes/left.jsp">
			<jsp:param name="userName" value="${userName}" />
		</jsp:include>

		<!-- 左边部分       end -->


		<div class="content-wrapper">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i> 基础设定 </a></li>
				<li class="active">学生档案</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">
			
			<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top:20px"> 
				    <table width="100%">
				    	<tr>
				    		<td width="800px">
					    		<div style="height:600px;width:100%;background-color:white;">
								    <table id="studentsTable" data-toggle="table">
									</table>
								</div>
				    		</td>
				    	</tr>
				    </table>
				</section>
			<!-- 中间部分-main     end -->
		</div>
	</div>
	<!-- 底部       startup  -->
	<%@ include file="../includes/bottom.jsp"%>
	<!-- 底部       end -->

	<!-- 设置按钮页面       startup -->
	<%@ include file="../includes/rightSetup.jsp"%>
	<!-- 设置按钮页面       end -->
	<div class="control-sidebar-bg"></div>
	
</div>
<div id="studentsToolbar" class="btn-group">
	<!-- <div class="layui-input-inline" style="height: 34px;  margin-top: -5px;">
			<input type="text" id="search" style="height: 30px;"/>
		</div> -->
		
		<c:choose>
		
			<c:when test="${yw}">
			<!-- 运维 -->
				<div class="layui-input-inline" style="right: -20px;height: 34px;margin-top:-5px;">
		<input id="yw" name="yw"  type="hidden" value="${yw }">
		<select id="school" class="layui-select" lay-filter="school" style="height: 34px;">
						<option value="0">全部</option>
						<c:if test="${schools != null  && fn:length(schools) > 0 }">
							<c:forEach items="${schools }" var="s">
								<option value="${s.code}">${s.name}</option>
							</c:forEach>
						</c:if>
						<c:if test="${schools == null || fn:length(schools) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="stages" class="layui-select" lay-filter="stages" style="height: 34px;">
						<option value="0">全部</option>
						<c:if test="${stages != null  && fn:length(stages) > 0 }">
							<c:forEach items="${stages }" var="t">
								<c:if test="${t.code eq 1 }">
									<option value="${t.code}">小学</option>
								</c:if>
								<c:if test="${t.code eq 2 }">
									<option value="${t.code}">初中</option>
								</c:if>
								<c:if test="${t.code eq 3 }">
									<option value="${t.code}">高中</option>
								</c:if>
								
							</c:forEach>
						</c:if>
						<c:if test="${stages == null || fn:length(stages) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="grades" class="layui-select" lay-filter="grades" style="height: 34px;">
						<option value="0">全部</option>
						<c:if test="${grades != null  && fn:length(grades) > 0 }">
							<c:forEach items="${grades }" var="g">
								<option value="${g}">${g}年级</option>
							</c:forEach>
						</c:if>
						<c:if test="${grades == null || fn:length(grades) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="classes" class="layui-select" lay-filter="classes" style="height: 34px;">
						<option value="0">全部</option>
						<c:if test="${classes != null  && fn:length(classes) > 0 }">
							<c:forEach items="${classes }" var="c">
								<option value="${c.id}">${c.className}</option>
							</c:forEach>
						</c:if>
						<c:if test="${classes == null || fn:length(classes) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		</div>
			</c:when>
			
			
			<c:otherwise>
			<!-- 班主任 -->
				<div class="layui-input-inline" style="right: -20px;height: 34px;margin-top:-5px;">
		<input id="yw" name="yw"  type="hidden" value="${yw}">
		<select id="school" class="layui-select" lay-filter="school" style="height: 34px;">
						<c:if test="${schools != null  && fn:length(schools) > 0 }">
							<c:forEach items="${schools }" var="s">
								<option value="${s.schoolCode}">${s.schoolName}</option>
							</c:forEach>
						</c:if>
						<c:if test="${schools == null || fn:length(schools) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="stages" class="layui-select" lay-filter="stages" style="height: 34px;">
						<c:if test="${stages != null  && fn:length(stages) > 0 }">
							<c:forEach items="${stages }" var="t">
								<c:if test="${t.stage eq 1 }">
									<option value="${t.stage}">小学</option>
								</c:if>
								<c:if test="${t.stage eq 2 }">
									<option value="${t.stage}">初中</option>
								</c:if>
								<c:if test="${t.stage eq 3 }">
									<option value="${t.stage}">高中</option>
								</c:if>
								
							</c:forEach>
						</c:if>
						<c:if test="${stages == null || fn:length(stages) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="grades" class="layui-select" lay-filter="grades" style="height: 34px;">
						<c:if test="${grades != null  && fn:length(grades) > 0 }">
							<c:forEach items="${grades }" var="g">
								<option value="${g}">${g}年级</option>
							</c:forEach>
						</c:if>
						<c:if test="${grades == null || fn:length(grades) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="classes" class="layui-select" lay-filter="classes" style="height: 34px;">
						<c:if test="${classes != null  && fn:length(classes) > 0 }">
							<c:forEach items="${classes }" var="c">
								<option value="${c.classId}">${c.className}</option>
							</c:forEach>
						</c:if>
						<c:if test="${classes == null || fn:length(classes) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		</div>
			</c:otherwise>
			
			
		</c:choose>
		
		
		
     <div class="layui-btn-group" style="margin-left:10px">
		    <button id="addStudent"  class="fristBtnDes">
		    <li class="btnIconCss">
			<img src="img/newIcon/add_16px_1209048_easyicon.net.png"></li>新&nbsp;增</button>
		    <!-- <button id="editteacher" class="fristBtnDes ">
		    <li class="btnIconCss">
			<img src="img/newIcon/edit_16px_1103530_easyicon.net.png"></li>编&nbsp;辑</button> -->
		    <button id="deletestudent" class="thirBtnDes"><!-- deleteteacher -->
		   <li class="btnIconCss">
			<img src="img/newIcon/delete_15.275362318841px_1143794_easyicon.net.png"></li>删&nbsp;除</button>
  	</div>
</div>

<div id="studentAddContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="" method="post" name="formDemo" id="frmStudentAdd">
	  <!-- <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">学籍号:</label>
	    <div class="layui-input-block">
	      <input id="newStudentNo" type="text" name="studentNo" lay-verify="studentNo" autocomplete="off" placeholder="请输入学籍号" class="layui-input" style="width:200px">
	    </div>
	  </div> -->
	  
	  <div class="layui-form-item" style="margin-top:10px">
	  	<div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">姓名:</label>
	      <div class="layui-input-inline">
	        <input id="newName" type="text" name="name" lay-verify="name" autocomplete="off" placeholder="请输入学生姓名" class="layui-input" style="width:200px">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">学籍号:</label>
	      <div class="layui-input-inline">
	        <input id="newStudentNo" type="text" name="studentNo" lay-verify="studentNo" autocomplete="off" placeholder="请输入学籍号" class="layui-input" style="width:200px">
	      </div>
	    </div>
	    
	  </div>
	  
	  <div class="layui-form-item" style="margin-top:10px">
	    <div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">身份证号码:</label>
	      <div class="layui-input-inline">
	        <input id="newIdCardNumber" type="text" name="idCardNumber" lay-verify="identity" autocomplete="off" placeholder="请输入身份证号" class="layui-input" style="width:200px">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">性别:</label>
	      <div class="layui-input-inline" style="width:200px;">
	          <!-- <input id="newSexMale" type="radio" name="sex" value="1" title="男" checked="checked" class="layui-input" >
		      <input id="newSexFmale" type="radio" name="sex" value="0" title="女" class="layui-input" > -->
		      <select name="sex" lay-filter="aihao">
		        <option value="1">男</option>
		        <option value="0">女</option>
		      </select>
		  
	      </div>
	    </div>
	  </div>
	  <!-- <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">照片:</label>
	    <div class="layui-input-block">
	       <div class="layui-upload">
			  <button type="button" class="layui-btn" id="test1">上传图片</button>
			  <div class="layui-upload-list">
			    <img class="layui-upload-img" id="demo1">
			    <p id="demoText"></p>
			  </div>
		</div>  
	    </div>
	  </div> -->
	  
	  
	  
	   <div class="layui-form-item"  style="margin-top:10px">
	    <label class="layui-form-label"   style="width:120px">请选择班级:</label>
	    <div class="layui-input-inline" style="width:200px;">
	      <select name="schoolCode" id="schoolCode"  lay-filter="schoolCode">
	        <option value="-1">请选择校区学部</option>
	      </select>
	    </div>
	    <div class="layui-input-inline" style="width:116px">
	      <select name="cureentSchoolCode" id="cureentSchoolCode" lay-filter="cureentSchoolCode">
	        <option value="-1">请选择学段</option>
	      </select>
	    </div>
	    <div class="layui-input-inline"  style="width:116px">
	      <select name="gradeNo" id="gradeNo"  lay-filter="gradeNo">
	        <option value="-1">请选择年级</option>
	      </select>
	    </div>
	     <div class="layui-input-inline" style="width:116px">
	     <input type="hidden" name="classNo" id="classNo">
	      <select name="classId" id="classId"  lay-filter="classId">
	        <option value="-1">请选择班级</option>
	      </select>
	    </div>
	  </div>
	  
	<div class="layui-form-item" style="margin-top:10px">
	    <div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">一卡通卡号:</label>
	      <div class="layui-input-inline">
	        <input id="newCardNo" type="text" name="cardNo" autocomplete="off" placeholder="请输入一卡通卡号" class="layui-input" style="width:200px">
	      </div>
	    </div>
	    <div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">一卡通颜色:</label>
	      <div class="layui-input-inline"  style="width:200px">
	          <select name="cardColor">
		        <option value="-1">请选择颜色</option>
		        <option value="蓝">蓝</option>
		        <option value="红">红</option>
		        <option value="黄">黄</option>
		        <option value="绿">绿</option>
		        <option value="白">白</option>
		      </select>
	      </div>
	    </div>
	  </div>
	  
	 <div class="layui-form-item" style="margin-top:10px">
	    <div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">学籍状态:</label>
	      <div class="layui-input-inline">
	        <select name="studentStatus">
		        <option value="0">在读</option>
		        <option value="1">休学</option>
		        <option value="2">退学</option>
		        <option value="3">毕业</option>
		      </select>
	      </div>
	    </div> 
	    <!--  <div class="layui-inline">
	      <label class="layui-form-label" style="width:120px">缴费状态:</label>
	      <div class="layui-input-inline">
	         <select name="payStatus">
		        <option value="0">未缴费</option>
		        <option value="1">已缴费</option>
		      </select>
	      </div>
	    </div>-->
	    <div class="layui-inline">
		      <label class="layui-form-label" style="width:120px">学号:</label>
		      <div class="layui-input-inline">
		         <input id="studentCode" type="text" name="studentCode" lay-verify="studentCode" autocomplete="off" placeholder="请输入学号" class="layui-input" style="width:200px" value="${t.studentCode }">
		      </div>
		</div>
	  </div>
	 
	  
	 <div class="layui-form-item" style="margin-left:180px;">
	    <div class="layui-input-block">
	      <button class="fristBtnDes" lay-submit lay-filter="formDemo">
	      <li class="btnIconCss">
		<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>立即提交</button>
	      <button type="reset" class="thirBtnDes">
	      <li class="btnIconCss">
		<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>重置</button>
	    </div>
	  </div>

	</form>  
</div>

<div id="roleTables"></div>

<div id="teacherEditContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	 <input id="editteacherId" type="text" name="teacherId" style="display:none">
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">用户名:</label>
	    <div class="layui-input-block">
	      <input  id="editteacherName" type="text" name="teacherName" lay-verify="teacherName" autocomplete="off" placeholder="请输入用户名" class="layui-input" style="width:200px">
	    </div>
	  </div>
	   <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">手机号:</label>
	    <div class="layui-input-block">
	      <input  id="editTel" type="text" name="tel" lay-verify="tel" autocomplete="off" placeholder="请输入手机号名" class="layui-input" style="width:200px">
	    </div>
	  </div>
	  
	   <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">密码</label>
	    <div class="layui-input-block">
	      <input id="editPassword" type="password" name="password" lay-verify="pass" autocomplete="off" placeholder="请输入密码 " class="layui-input" style="width:200px">
	    </div>
      <div class="layui-form-item " style="margin-top:10px">
	    <label class="layui-form-label" style="width:120px">再次确认密码:</label>
	    <div class="layui-input-block">
	      <input id="editPasswordConfirm" type="password" name="passwordVtype" lay-verify="confirmPass" placeholder="请输入密码" autocomplete="off" class="layui-input" style="width:200px">
	    </div>
	  </div>
		    
		</div>
		<div class="layui-form-item" style="margin-top:10px">
		    <div class="layui-input-block">
		      <button class="fristBtnDes" lay-submit lay-filter="editteacher">
		      <li class="btnIconCss">
			<img src="img/newIcon/send_16px_1190679_easyicon.net.png"></li>立即提交</button>
		      <button  class="thirBtnDes" lay-filter="cancel">
		      <li class="btnIconCss">
			<img src="img/newIcon/Delete_16px_1060905_easyicon.net.png"></li>取消</button>
		    </div>
		  </div>
	  </div>
	 </form>
</div>

<script type="text/javascript" src="js/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- ./wrapper -->
<script src="js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="js/plugins/layui/layui.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/plugins/bootstrap-treeview/bootstrap-treeview.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>

<script src="js/pages/dm/students.js"></script>
</body>


</html>