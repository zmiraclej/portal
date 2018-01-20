<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>添加总分统计配置</title>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="${ctx}/js/plugins/daterangepicker/daterangepicker.css">
  <link rel="stylesheet" href="${ctx}/css/jqueryTable/jqx.base.css"
	type="text/css" />
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="${ctx}/js/plugins/bootstrap/css/bootstrap.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="${ctx}/css/font-awesome/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="${ctx}/css/ionicons/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="${ctx}/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
	     folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet" href="${ctx}/css/skins/_all-skins.min.css">
<link rel="stylesheet" href="${ctx}/css/pages/mycss.css">
<link rel="stylesheet" href="${ctx}/css/pages/queryFile.css">
<link rel="stylesheet" href="${ctx}/js/plugins/bootstrap-treeview/bootstrap-treeview.min.css">	
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">
<link rel="stylesheet" href="${ctx}/js/plugins/layui/css/layui.css">
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
				<li><a href="#"><i class="fa fa-fw fa-laptop"></i>学生管理</a></li>
	      		<li><a href="#">总分统计配置列表</a></li>
	      		<li class="active">修改总分统计配置</li>
			</ol>
			</section>
			<!-- 中间部分-top     end -->
			<div id="middle">
			
			<!-- 中间部分-main     startup -->
				<section class="content" style="margin-top:0px;">
					<div class="row">
    <div class="col-md-12">
    <div class="box">
            <div class="box-body">
            <div class="box-header with-border">
              <h3 class="box-title">修改总分统计配置</h3>
            </div>
            <!-- form start -->
            <form id="form"  class="form-horizontal" action="${ctx}/countupdate" method="post">
              <div class="box-body">
              	<input type="hidden" name="id" value="${countCycle.id}">
              	<div class="form-group">
                  <label class="col-sm-3 control-label">学校</label>
                  <div class="col-sm-4">
                    <select id="schoolCode" name="schoolCode" class="form-control" required>
                    	<c:forEach items="${schools}" var="v">
			            <option value="${v.code}">${v.name }</option>
			            </c:forEach>
	            	</select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">学部</label>
                  <div class="col-sm-3">
                  	<select id="stage" name="stage" class="form-control">
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
                  </div>
                  <div class="col-sm-3">
	            		<select id="grade" name="grade" class="form-control" required>
	            		<c:if test="${grades != null  && fn:length(grades) > 0 }">
							<c:forEach items="${grades }" var="g">
								<option value="${g}">${g}年级</option>
							</c:forEach>
						</c:if>
						<c:if test="${grades == null || fn:length(grades) == 0 }">
							<option value="-1"> -- 空 -- </option>
						</c:if>
	            	</select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">名称</label>
                  <div class="col-sm-6">
                    <textarea name="countName" rows="5" maxlength="255" class="form-control">${countCycle.countName}</textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">周期统计开始时间</label>
                  <div class="col-sm-3">
                  	<input id="recDate1" type="text" name="cycleStart" value="" class="layui-input" autocomplete="off" required readonly="readonly">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">周期统计结束时间</label>
                  <div class="col-sm-3">
                  	<input id="recDate2" type="text" name="cycleEnd" value="" class="layui-input" autocomplete="off" required readonly="readonly">
                  </div>
                </div>
                
              </div>
              <div class="box-footer" style="text-align: center">
                <button type="button" class="btn btn-default" onclick="history.go(-1);">返回</button>
                <button type="submit" class="btn btn-primary">确定</button>
              </div>
            </form>
          </div>
          </div>
    </div>
    </div>
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
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
            </div>
            <div class="modal-body">统计开始时间不能超过结束时间</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
    <script type="text/javascript" src="${ctx }/js/plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script src="${ctx}/js/plugins/daterangepicker/moment.js"></script>
  	<script src="${ctx}/js/plugins/daterangepicker/daterangepicker.js"></script>
  	<!-- ./wrapper -->
<script src="${ctx}/js/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="${ctx}/js/plugins/jQueryUI/jquery-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layer/layer.js"></script>
<script type="text/javascript" src="${ctx}/js/plugins/layui2/layui.all.js"></script>
<script type="text/javascript" src="${ctx}/js/common.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

<!-- Latest compiled and minified Locales -->
<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"></script>

<!-- AdminLTE App -->
<script src="${ctx}/js/app.min.js"></script>
	<SCRIPT type="text/javascript">
		$(document).ready(function(){
			$('#myModal').modal({
		        show:false
		    });
			var stage = '${countCycle.stage}';
			var grade = '${countCycle.grade}';
			var schoolCode ='${countCycle.schoolCode}';
			var startTime='${countCycle.cycleStart}';
			var st = FormatDate(startTime);
			$("#recDate1").val(st);
			var endTime='${countCycle.cycleEnd}';
			var et = FormatDate(endTime);
			$("#recDate2").val(et);
			console.log(st);
			console.log(et);
			function FormatDate (strTime) {
			    var date = new Date(strTime);
			    var m = date.getMonth();
			    var d = date.getDate();
			    if(m<9){
			    	m = "0"+(m+1);
			    }else{
			    	m = m+1;
			    }
			    if(d<10){
			    	d="0"+d;
			    }
			    return date.getFullYear()+"-"+m+"-"+d;
			}
			
			
				$("#schoolCode>option").each(function(index,element){
					if($(this).val() == schoolCode){
						$(this).attr("selected","selected");
					}
				});
			$("#stage>option").each(function(index,element){
				if($(this).val() == stage){
					$(this).attr("selected","selected");
				}
			});
			$("#grade>option").each(function(index,element){
				if($(this).val() == grade){
					$(this).attr("selected","selected");
				}
			});
	        layui.use('laydate', function(){
	        	  var laydate = layui.laydate;
	        	  
	        	  //执行一个laydate实例
	        	  laydate.render({
	        	    elem: '#recDate1', //指定元素
	        	  	value:st
	        	  });
	        	  laydate.render({
	        		elem:'#recDate2',
	        		value:et
	        	  });
	        	});
	        $('#form').submit(function(){
				if($("#recDate1").val()>$("#recDate2").val()){
					$('#myModal').modal('show');
					return false;
				}else{
					return true;
				}
			});
	        $("#schoolCode").on('change',function(){
				seachStages();
			});
			$("#stage").on('change',function(){
				  seachGrades();
			});
			function seachStages(){
				var schoolCode=$('#schoolCode').val();
				  //console.log(schoolCode);
				  $.ajax({
					  	async:false,
				        type: "POST",
				        url: "count/AllStage?schoolCode="+schoolCode,
				        /*
				        data: {
				        	'schoolCode':data.value
				        },
				        */
				        //contentType: "application/json", 
				        dataType: "json",
				        cache: false,
				        success: function(result) {
				        	$('#stage').find("option").remove();
				        	//console.log(result);
				            var length = result.length;
				            if(result[0] != null){
				            	for (var i = 0; i < length; i++) {
				            		$('#stage').append('<option value="' + result[i].code + '">' + result[i].name + '</option>');
					            };
				            }else{
				            	$('#stage').append('<option value="-1">' + "--无学部信息--"+ '</option>');
				            }
				      	  seachGrades();
				        }
				    });
			}
			function seachGrades(){
				var schoolCode = $('#schoolCode').val();
				var stage = $('#stage').val();
				//console.log(schoolCode+" "+stage);
				  $.ajax({
					   async:false,
				        type: "POST",
				        url: "count/AllGrade",
				        data: {
				        	'schoolCode':schoolCode,
				        	'stage':stage
				        },
				        dataType: "json",
				        cache: false,
				        error: function(a) {},
				        success: function(a) {
				        	 $('#grade').empty();
				        	//console.log(a[0]);
				            var length = a.length;
				            if(a[0] != null){
				            	for (var i = 0; i < length; i++) {
				            			$('#grade').append('<option value="' + a[i] + '">' + a[i] + '年级</option>');
					            };
				            	
				            }else{
				            	$('#grade').append('<option value="-1">' + "--无年级信息--"+ '</option>');
				            }
				        }
				    });
			}
			
			
		});
		
	</SCRIPT>
</body>
</html>
