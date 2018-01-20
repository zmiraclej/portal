<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">实例管理</title>
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
	<link rel="stylesheet" href="js/plugins/ztree/zTreeStyle/zTreeStyle.css">
	<link rel="stylesheet" href="${ctx}/js/plugins/ztree/zTreeStyle/zTreeStyle.css">
  	<link rel="stylesheet" href="${ctx}/js/plugins/file-input/css/fileinput.min.css">
  	<%-- <link rel="stylesheet" href="${ctx}/js/plugins/daterangepicker/daterangepicker.css"> --%>
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


		<div class="content-wrapper" style="background-color: white;">
			<!-- 中间部分-top     startup -->
			<section class="content-header">
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i> 基础设定 </a></li>
				<li class="active">实例管理</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle" style="height: 600px;">
			
			<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top:0px;">
					<table id="insTable" data-toggle="table">
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

<div id="insToolbar" class="btn-group">
		<div class="layui-input-inline" style="right: 300px;height: 34px;margin-top:-5px;">
		<input id="dy" name="dy"  type="hidden" value="${dy }">
		<select id="_school" class="layui-select" style="height: 34px;">
						<c:if test="${schools != null  && fn:length(schools) > 0 }">
							<c:forEach items="${schools }" var="s">
								<option value="${s.schoolCode}">${s.schoolName}</option>
							</c:forEach>
						</c:if>
						<c:if test="${schools == null || fn:length(schools) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="_role" class="layui-select" style="height: 34px;">
						<c:if test="${roles != null  && fn:length(roles) > 0 }">
							<c:forEach items="${roles }" var="r">
								<option value="${r.id}">${r.name}</option>
							</c:forEach>
						</c:if>
						<c:if test="${roles == null || fn:length(roles) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<select id="_class" class="layui-select" style="height: 34px;">
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
		<div class="layui-btn-group" style="margin-left:10px">
			<button id="addIns"  class="layui-btn">补录实例</button>
     		<button id="viewIns"  class="layui-btn">实例详情</button>
		    <button id="reviewIns"  class="layui-btn">审&nbsp;核</button>
  	</div>
</div>

<!-- 添加 -->

<div id="insAddContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">评分标准:</label>
	    <div class="layui-input-inline" style="width: 400px;">
	      <!-- <div id="insTree"></div> -->
	      <ul id="codeTree" class="ztree"></ul>
          <input type="text" lay-verify="stdCode" id="confirmCode" name="stdCode" class="form-control" required readonly="readonly" placeholder="待确认编号">
	      <input type="hidden" id="hiddenCode" name="stdName"/>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">学校:</label>
	    <div class="layui-input-inline" style="width: 400px;">
	     <select id="_stu_school" class="layui-select" lay-filter="stu_school" name="schoolCode" style="height: 34px;">
						<c:if test="${schools != null  && fn:length(schools) > 0 }">
							<c:forEach items="${schools }" var="s">
								<option value="${s.schoolCode}">${s.schoolName}</option>
							</c:forEach>
						</c:if>
						<c:if test="${schools == null || fn:length(schools) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
			<input type="hidden" id="schoolName" name="schoolName"/>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">老师类型:</label>
	    <div class="layui-input-inline" style="width: 400px;">
	     <select id="_stu_role" class="layui-select" lay-filter="stu_role" name="teacherType" style="height: 34px;">
						<c:if test="${roles != null  && fn:length(roles) > 0 }">
							<c:forEach items="${roles }" var="r">
								<option value="${r.id}">${r.name}</option>
							</c:forEach>
						</c:if>
						<c:if test="${roles == null || fn:length(roles) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
	    </div>
	  </div>
	  <div id="courseBox" class="layui-form-item" style="margin-top:10px; display: none;">
	    <label class="layui-form-label"  style="width:120px">科目名称:</label>
	    <div class="layui-input-inline" style="width: 400px;">
	       <select id="_stu_course" name="courseCode"  class="form-control" style="width: 400px;">
						    	<c:forEach items="${courses}" var="c">
						    		<option value="${c.code }" >${c.name }</option>
								</c:forEach>
			</select>
			<input type="hidden" id="courseName" name="courseName"/>
	    </div>
	  </div>
	  
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">班级:</label>
	    <div class="layui-input-inline" style="width: 400px;">
	    <select id="_stu_class" class="layui-select" lay-filter="stu_class" name="classId" style="height: 34px;">
						<c:if test="${classes != null  && fn:length(classes) > 0 }">
							<c:forEach items="${classes }" var="c">
								<option value="${c.classId}">${c.className}</option>
								
							</c:forEach>
						</c:if>
						<c:if test="${classes == null || fn:length(classes) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
		</select>
		<input type="hidden" name="className" id="className"/>
		</div>
	  </div>
	  <!-- <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">年级:</label>
	    <div class="layui-input-inline" style="width: 400px;">
	     <select id="_stu_grade" class="layui-select" lay-filter="_stu_grade" style="height: 34px;">
						
		</select>
	    </div>
	  </div> -->
	  <!-- <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">评分标准:</label>
	    <div class="layui-input-inline" style="width: 400px;">
		     <select id="_stu_grade" class="layui-select" style="height: 34px;">
							
			</select>
	    </div>
	  </div> -->
	  
	  <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">学生姓名:</label>
	    <div class="layui-input-inline">
		    <input type="text" id="searchName" class="form-control" placeholder="模糊搜索">
	    </div>
	    <div class="layui-input-inline">
	    <select id="stuName" lay-verify="studentId" name="studentId">
		    <option value="0">请选择...</option>
		</select>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">内容:</label>
	    <div class="layui-input-inline"  style="width:350px">
	      <textarea name="content" lay-verify="content" rows="5" maxlength="255" class="form-control" ></textarea>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">附件上传:</label>
	    <div style="width: 600px; margin-left: 120px;">
                    <input id="inputFile" name="files" type="file" multiple class="file-loading">
                    <input id="attachFile" type="hidden" name="attachFile" value=""/>
        </div>
	 </div>
	 <div class="layui-form-item">
		    <div class="layui-input-block" style="text-align: center">
		      <button id="submit-btn" class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
		      <button type="reset" class="layui-btn layui-btn-primary" onclick="resetForm();">重置</button>
		    </div>
		  </div>
	</form>  
</div>




<!-- 打分审核 -->

<div id="reviewInsContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	
	<div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">实例名称:</label>
	    <div class="layui-input-inline">
          <input type="text" id="_stdName" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">实例类型:</label>
	    <div class="layui-input-inline">
          <input type="text" id="_recType" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">学生姓名:</label>
	    <div class="layui-input-inline">
          <input type="text" id="_stuName" class="form-control" readonly>
	    </div>
	  </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">实例内容:</label>
	    <div class="layui-input-inline"  style="width:350px">
	      <textarea id="_content" rows="5" readonly="readonly" class="form-control" >
	      </textarea>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">修改内容:</label>
	    <div class="layui-input-inline"  style="width:350px">
	      <textarea id="_alterContent" name="alterContent" lay-verify="alterContent" rows="5" class="form-control" ></textarea>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">教师评价:</label>
	    <div class="layui-input-inline"  style="width:350px">
	      <textarea id="_authContent" name="authContent" lay-verify="authContent" rows="3" class="form-control" ></textarea>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">计入时间:</label>
	    <div class="layui-input-inline">
	      <input id="_recDate" type="text" class="form-control" autocomplete="off" readonly>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">上传的附件:</label>
	    <div class="layui-input-inline" id="fls_" style="margin-top: 5px;">
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">审核附件:</label>
	    <div style="width: 600px; margin-left: 120px;">
               <input id="inputFile2" name="files" type="file" multiple class="file-loading">
               <input id="attachFile2" type="hidden" name="authAttachFile" value=""/>
        </div>
	 </div>
	 <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">教师评分:</label>
	    <div class="layui-input-inline">
          <input type="text"  lay-verify="actScore" id="_actScore" name="actScore" class="form-control" required placeholder="教师打分">
	    </div>
	    <div class="layui-input-inline" style="margin-top: 5px">
		    <label id="scoreArea"></label>
		    <input type="hidden" id="minScore" value=""/>
		    <input type="hidden" id="maxScore" value=""/>
	    </div>
	  </div>
	  <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">认证结果:</label>
	    <div class="layui-input-inline">
	    <select id="_authResult" name="authResult">
	    <option value="01">直接确认</option>
	    <option value="02">修改确认</option>
	    <option value="03">纪录作废</option>
	    </select>
	    </div>
	 </div>
	 	<input type="hidden" name="id" id="insId1" />
		<div class="layui-form-item">
		    <div class="layui-input-block" style="text-align: center">
		      <button class="layui-btn" onclick="javascript:resultChange()" lay-submit lay-filter="formDemo1">立即提交</button>
		    </div>
		  </div>
	</form>  
</div>



<!-- 实例详情-->

<div id="viewInsContent" style="display:none;width:100%;height:90%">
	<form class="layui-form" action="">
	
	<div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">实例名称:</label>
	    <div class="layui-input-inline">
          <input type="text" id="stdName_" class="form-control" style="width: 400px" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">实例类型:</label>
	    <div class="layui-input-inline">
          <input type="text" id="recType_" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">学生姓名:</label>
	    <div class="layui-input-inline">
          <input type="text" id="stuName_" class="form-control" readonly>
	    </div>
	  </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">实例内容:</label>
	    <div class="layui-input-inline"  style="width:350px">
	      <textarea id="content_" rows="5" readonly="readonly" class="form-control" >
	      </textarea>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">修改内容:</label>
	    <div class="layui-input-inline"  style="width:350px">
	      <textarea id="alterContent_" rows="5" class="form-control" readonly></textarea>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">教师评价:</label>
	    <div class="layui-input-inline"  style="width:350px">
	      <textarea id="authContent_" rows="3" class="form-control" readonly></textarea>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">计入时间:</label>
	    <div class="layui-input-inline">
	      <input id="recDate_" type="text" class="form-control" autocomplete="off" readonly>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">更新时间:</label>
	    <div class="layui-input-inline">
	      <input id="updateTime_" type="text" class="form-control" autocomplete="off" readonly>
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">上传的附件:</label>
	    <div class="layui-input-inline" id="fls" style="margin-top: 5px;">
	    </div>
	 </div>
	 <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">审核附件:</label>
	    <div class="layui-input-inline" id="fls2" style="margin-top: 5px;">
	    </div>
	 </div>
	 <div class="layui-form-item" style="margin-top:10px">
	    <label class="layui-form-label"  style="width:120px">教师评分:</label>
	    <div class="layui-input-inline">
          <input type="text" id="actScore_" class="form-control" readonly>
	    </div>
	  </div>
	  <div class="layui-form-item ">
	    <label class="layui-form-label" style="width:120px">认证结果:</label>
	    <div class="layui-input-inline">
	    <input type="text" id="authResult_" class="form-control" readonly>
	    </div>
	 </div>
	 	<input type="hidden" name="id" id="insId1" />
		<div class="layui-form-item">
		    <div class="layui-input-block" style="text-align: center">
		      <button class="layui-btn" lay-submit lay-filter="formDemo2">关闭</button>
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

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="js/app.min.js"></script>
<script src="js/pages/ins/wtrjIns.js"></script>
<script src="${ctx}/js/plugins/ztree/jquery.ztree.core.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/plugins/sortable.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/plugins/purify.min.js"></script>
<script src="${ctx}/js/plugins/file-input/js/fileinput.js"></script>
<script src="${ctx}/js/plugins/file-input/js/locales/zh.js"></script>
<%-- <script src="${ctx}/js/plugins/daterangepicker/moment.js"></script>
<script src="${ctx}/js/plugins/daterangepicker/daterangepicker.js"></script> --%>

<SCRIPT type="text/javascript">
		//暂时存储所上传的文件名
		var pic_array = new Array();
		var pic_array2 = new Array();

		$(document).ready(function(){	
			/* $("#searchName").bind('input propertychange',function() {
				search();
			}); */
			//initClassNo();
			
			var fileoptions = {
					uploadUrl: "${ctx}/insUpload/fileUpload",
				    uploadAsync: true,
				    showRemove: false,
				    minFileCount: 1,
				    showUpload: false,
				    maxFileCount: 10,
				    overwriteInitial: false,
			        language : 'zh',
			        allowedFileExtensions : [ 'jpg', 'png', 'gif','jpeg','doc','xls','txt','pdf','xlsx' ],
			        maxFileSize : 3000,
			        purifyHtml: true,
			        showPreview:false
			        
				}
			//教师补录
			var $inputFile = $('#inputFile');
			$inputFile.fileinput(fileoptions);
			$inputFile.on("filebatchselected", function(event, files) {
	            $(this).fileinput("upload");
	        }).on('fileuploaded', function(event, data, previewId) {
			    var f = data.response;
			    pic_array.push({ fileName: f, keyId: previewId });
			    setPic();
			}).on('filesuccessremove', function(event, id ) {
			    for (var i = 0; i < pic_array.length; i++) { 
			        if (pic_array[i].keyId== id) {
			        var name = pic_array[i].fileName;
			        //异步请求删除后台图片
			          $.ajax({
		                type:'get',
		                url:'${ctx}/insUpload/delete',
		                data:{name:name},
		                success: function (data) {
		                	//暂不处理
		                }
		              })
		              pic_array.splice(i,1);
			          setPic();
			        } 
			        
			    }
			})
			
			//教师查看
			
		});
		//设置上传的文件
		function setPic(){
			var t = new Array();
			for (var i = 0; i < pic_array.length; i++) {
				t.push(pic_array[i].fileName);
			}
			$('#attachFile').val(t.join(";"));
		}
		
		function setPic2(){
			var t = new Array();
			for (var i = 0; i < pic_array2.length; i++) {
				t.push(pic_array2[i].fileName);
			}
			$('#attachFile2').val(t.join(";"));
		}
		

	//学生姓名模糊查询
	/* function findStudents(searchName) {
		//清空
		$("#stuName").empty();
		var schoolCode = $("#_stu_school").val();
		$.get("findStudentsByTidByName", {
			"searchName" : searchName, "schoolCode" : schoolCode
		}, function(data) {
			if(data.length>0){
				$.each(data, function(index, element) {
					$("#stuName").append(
							"<option value="+element.id+">" + element.name + '['+element.className+']'
									+ "</option>")
				})	
			}else{
				$("#stuName").append(
						"<option value='0'>没有搜索结果</option>")
			}
			var form = layui.form();
			form.render();
		});
	} */
	
	/* function search() {
		var searchName = $('#searchName').val();
		findStudents(searchName);
	} */
	
	function getIns(insId,flag){
		$.post("findInsByid", {
			"insId" : insId
		}, function(data) {
			var date = new Date();
			var rt = "";
			if(data.authResult=="01")
				rt = "直接确认";
			if(data.authResult=="02")
				rt = "修改确认";
			if(data.authResult=="03")
				rt = "记录作废";
			if(data.authResult=="04")
				rt = "老师补录";
			if(flag==1){
				pic_array = new Array();
				$('#stdName_').val(data.stdName);
				$('#recType_').val(data.recType);
				$('#stuName_').val(data.stuName);
				$('#content_').val(data.content);
				$('#alterContent_').val(data.alterContent);
				$('#authContent_').val(data.authContent);
				$('#actScore_').val(data.actScore);
				$('#authResult_').val(rt);
				$('#recDate_').val(dateFormatUtil(data.recDate));
				$('#updateTime_').val(dateFormatUtil(data.updateTime));
				$('#fls').html(getHtml(data.attachFile,data.filePath));
				$('#fls2').html(getHtml(data.authAttachFile,data.filePath));
			}else{
				pic_array2 = [];
				$('#_stdName').val(data.stdName);
				$('#_recType').val(data.recType);
				$('#_stuName').val(data.stuName);
				$('#_content').val(data.content);
				$('#_alterContent').val(data.alterContent);
				$('#_authContent').val(data.authContent);
				$('#_actScore').val(data.actScore);
				$('#minScore').val(data.minScore);
				$('#maxScore').val(data.maxScore);
				$('#_recDate').val(dateFormatUtil(data.recDate));
				$('#fls_').html(getHtml(data.attachFile,data.filePath));
				$('#insId1').val(data.id);
				$('#attachFile2').val(data.authAttachFile);
				$('#scoreArea').html(data.score);
				var $inputFile2 = $('#inputFile2');
				var fileObj=new Array();
				 var configObj=new Array();
				if(data.authAttachFile != null){
					var files=data.authAttachFile.split(";");
	                $.each(files,function(i,name){
	                    var type=getFileType(name)
	                    if(type!="png" && type!="jpg" && type!="gif"){
	                    var o='<div class="kv-preview-data file-preview-other-frame">'+
	                            '<div class="file-preview-other">'+
	                            '<span class="file-other-icon"><i class="fa fa-file-archive-o text-muted"></i></span>'+
	                            '</div>'+
	                            '</div>';
	                        fileObj.push(o);
	                    }
	                    else{
	
	                        fileObj.push( "<img src='${ctx}/common/upload/" + name + "' class='file-preview-image'> ");
	                    }
	                    var obj=new Object();
	                    var extra=new Object();
	                    obj.caption=name;
	                    obj.width="120px";
	                    obj.url="${ctx}/insUpload/delete";
	                    obj.key=name;
	                    extra.name=name;
	                    obj.extra=extra;
	                    configObj.push(obj);
	                    pic_array2.push({ fileName: name, keyId: name });
	                })
				}
				var fileoptions2 = {
						uploadUrl: "${ctx}/insUpload/fileUpload",
					    uploadAsync: true,
					    showRemove: false,
					    minFileCount: 1,
					    showUpload: false,
					    maxFileCount: 10,
					    overwriteInitial: false,
				        language : 'zh',
				        allowedFileExtensions : [ 'jpg', 'png', 'gif','jpeg','doc','xls','txt','pdf','css','xlsx' ],
				        maxFileSize : 3000,
				        showPreview:false,
				        initialPreview:fileObj,
				        initialPreviewConfig: configObj,
				        purifyHtml: true
					}
				$inputFile2.fileinput(fileoptions2);
				$inputFile2.on("filebatchselected", function(event, files) {
		            $(this).fileinput("upload");
		        })
		        $inputFile2.on('fileuploaded', function(event, data, previewId) {
				    var f = data.response;
				    for (var i = 0; i < pic_array2.length; i++) {
	                    if (pic_array2[i].fileName== f) {
	                        pic_array2.splice(i,1);
	                    }
	                }
				    pic_array2.push({ fileName: f, keyId: previewId });
				    setPic2();
				})
				//删除当前上传的图片
				$inputFile2.on('filesuccessremove', function(event, id ) {
				    for (var i = 0; i < pic_array2.length; i++) { 
				        if (pic_array2[i].keyId== id) {
				        var name = pic_array2[i].fileName;
				        //异步请求删除后台图片
				          $.ajax({
			                type:'get',
			                url:'${ctx}/insUpload/delete',
			                data:{name:name},
			                success: function (data) {
			                	//暂不处理
			                }
			              })
			              pic_array2.splice(i,1);
				          setPic2();
				        }
				    }
				})
				//删除原来的文件
				.on('filedeleted', function(event,id) {
	                for (var i = 0; i < pic_array2.length; i++) {
	                    if (pic_array2[i].keyId== id) {
	                        pic_array2.splice(i,1);
	                        setPic2();
	                    }

	                }
	            });
			}
		});
	}
	
	//获取文件后缀名，显示缩略图
	function getFileType(name) {

        var i = name.lastIndexOf(".");
        if(i > -1){
            var ext = name.substring(i+1);
        }
        return ext;
    }
	
	function getHtml(files,filePath){
		var html = "";
		if(files!=null&&files!=""){
			files=files.split(";");
			$.each(files, function(index, element) {
				html += "<a style=\"color:green;\" href="+filePath+element+" target=\"_Blank\">"+element+"</a><br>";
			});
		}else{
			html = "没有上传附件";
		}
		return html;
	}
	
	 function dateFormatUtil(longTypeDate){  
         var dateTypeDate = "";  
         var date = new Date();  
         date.setTime(longTypeDate);  
         dateTypeDate += date.getFullYear();   //年  
         dateTypeDate += "-" + getMonth(date); //月   
         dateTypeDate += "-" + getDay(date);   //日  
         return dateTypeDate;  
     }  
	//返回 01-12 的月份值   
     function getMonth(date){  
         var month = "";  
         month = date.getMonth() + 1; //getMonth()得到的月份是0-11  
         if(month<10){  
             month = "0" + month;  
         }  
         return month;  
     }  
       
     //返回01-30的日期  
     function getDay(date){  
         var day = "";  
         day = date.getDate();  
         if(day<10){  
             day = "0" + day;  
         }  
         return day;  
     } 
     //清除图片
     function resetForm(){
    	 pic_array = [];
    	 $('#attachFile').val('');
    	 $('#inputFile').fileinput('clear');
     }
   //清除图片-审核
     function resetForm2(){
    	 pic_array2 = [];
    	 $('#attachFile2').val('');
    	 $('#inputFile2').fileinput('clear');
    	 $('#inputFile2').fileinput('refresh');
    	 $('#inputFile2').fileinput('reset');
    	 $('#inputFile2').fileinput('destroy');
     }
     //实例树形数据
     var treeData = '${insTree}';
     treeData = eval(treeData);
     /* console.log(treeDate); */
     //初始化树形数据
     layui.use('tree', function(){
  		layui.tree({
  			elem:'#codeTree',
  			nodes:treeData,
  			click: function(item){ 
  		      var key = item.key;
  		      var name= item.name;
  		      if(key.length>2){
  		    	  $('#confirmCode').val(key);
  		    	  $('#hiddenCode').val(name);
  		      }
  		    }
  		});
	});
     //初始化班级
     /* function initClassNo(){
    	 $.get("queryClassNo", function(data) {
    		 if(data.length>0){
    			 for(var i=0;i<data.length;i++){
    				 $('#classNos').append('<option value='+data[i].classNo+'>'+data[i].className+'</option>');
    			 }
    		 }
    	 })
     }
     
     $("#classNos").change(function(){
    	 $('#insTable').bootstrapTable('refresh',getTParam());
    }); */
     
	function resultChange() {
		if ($("#_authResult").val() == '03') {
			$('#_actScore').val(0);
		}
		return true;
	};
	
	
	
	
</SCRIPT>

</body>
</html>