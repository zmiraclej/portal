<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
            	<div class="box-body">
            <!-- form start -->
            <form id="editform"  class="form-horizontal" action="${ctx}/standardUpdate" method="post">
              <div class="box-body">
              	<input type="hidden" name="code" value="${standard.code}">
              	
              	
              	<%-- <div class="form-group">
                  <label class="col-sm-3 control-label">编号</label>
                  <div class="col-sm-4">
                    <input  name="code" value="${standard.code}">
                  </div>
                </div> --%>
                
                 <div class="form-group"  style="display:none;">
                  <label class="col-sm-3 control-label">等级</label>
                  <div class="col-sm-3" id="stage">
                  	<select id="blLeaf" name="blLeaf" class="form-control" required>
			            <option value="0">一级</option>
			            <option value="1">二级</option>
	            	</select>
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="col-sm-3 control-label">名称</label>
                  <div class="col-sm-6">
                    <textarea id="name" name="name" rows="5" required maxlength="255" class="form-control">${standard.name}</textarea>
                  </div>
                </div>
                
              
                  
                <div class="form-group">
                  <label class="col-sm-3 control-label">基准分</label>
                  <div class="col-sm-6">
                  <input id="baseScore" type="number" name="baseScore" value="${standard.baseScore}" class="form-control" autocomplete="off" required >
                  </div>
                </div> 
                  
                  
                <div class="form-group">
                  <label class="col-sm-3 control-label">累计次数</label>
                  <div class="col-sm-6">
                  <input id="insNum" type="number" name="insNum" value="${standard.insNum}" class="form-control" autocomplete="off" required >
                  </div>
                </div> 
                  
                  
               <div class="form-group">
                  <label class="col-sm-3 control-label">最低加减分</label>
                  <div class="col-sm-6">
                  <input id="insScoreMin" type="number" name="insScoreMin" value="${standard.insScoreMin}" class="form-control" autocomplete="off" required >
                  </div>
                </div>
                 <div class="form-group">
                  <label class="col-sm-3 control-label">最高加减分</label>
                  <div class="col-sm-6">
                  <input id="insScoreMax" type="number" name="insScoreMax" value="${standard.insScoreMax}" class="form-control" autocomplete="off" required >
                  </div>
                </div>
                
                 <div class="form-group">
                  <label class="col-sm-3 control-label">加减分类型</label>
                  <div class="col-sm-3" id="">
                  	<select id="type" name="type" class="form-control" required>
			            <option value="01">加分</option>
			            <option value="02">减分</option>
	            	</select>
                  </div>
                </div>
                
                
                 <div class="form-group">
                  <label class="col-sm-3 control-label">审核角色</label>
                  <div class="col-sm-3" id="">
                  	<select id="authRole" name="authRole" class="form-control" required>
			            <option value="1">班主任</option>
			            <option value="2">任课老师</option>
			            <option value="3">生辅老师</option>
			            <option value="7">德育老师</option>
	            	</select>
                  </div>
                  </div>
                
                 <div class="form-group">
                  <label class="col-sm-3 control-label">记录周期</label>
                  <div class="col-sm-3" id="">
                  	<select id="reportCycle" name="reportCycle" class="form-control" required>
			           <option value="01">不限</option>
						<option value="02">每月一次</option>
						<option value="03">期末一次</option>
						<option value="04">期中期末各一次</option>
	            	</select>
                  </div>
                </div>
                
                
              </div>
              <!-- <div class="box-footer" style="text-align: center">
                <button type="button" class="btn btn-default" onclick="history.go(-1);">返回</button>
                <button type="submit" class="btn btn-info btn-primary">确定</button>
              </div> -->
            </form>
          </div>

	<SCRIPT type="text/javascript">
		$(document).ready(function(){
			var reportCycle = '${standard.reportCycle}';
			var authRole = '${standard.authRole}';
			var type ='${standard.type}';
			var blLeaf='${standard.blLeaf}';
			
				$("#blLeaf>option").each(function(index,element){
					if($(this).val() == blLeaf){
						$(this).attr("selected","selected");
					}
				});
			$("#type>option").each(function(index,element){
				if($(this).val() == type){
					$(this).attr("selected","selected");
				}
			});
			$("#authRole>option").each(function(index,element){
				if($(this).val() == authRole){
					$(this).attr("selected","selected");
				}
			});
			$("#reportCycle>option").each(function(index,element){
				if($(this).val() == reportCycle){
					$(this).attr("selected","selected");
				}
			});
	       
			/* $("#editform").validate({
				submitHandler: function(form) {
				  form.submit();
				}
			}); */
			
			
		});
		
	</SCRIPT>
</body>
</html>
