<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="box-body">
            <div class="box-header with-border">
              <h3 class="box-title">评分标准详情</h3>
            </div>
            <!-- form start -->
            <form id="form"  class="form-horizontal" action="" method="post">
              <div class="box-body">
              	<input type="hidden" name="code" value="${standard.code}">
              	
              	
              	<div class="form-group">
                  <label class="col-sm-3 control-label">编号</label>
                  <div class="col-sm-4">
                    <input id="code" type="text" name="code" disabled value="${standard.code}" class="layui-input" autocomplete="off" required >
                  </div>
                </div> 
                
                 <div class="form-group">
                  <label class="col-sm-3 control-label">等级</label>
                  <div class="col-sm-3" id="stage">
                  	  		<c:if test="${standard.blLeaf=='0'}">
                                  <span class="form-control-static">一级</span>
                              </c:if>
                              <c:if test="${standard.blLeaf=='1'}">
                                  <span class="form-control-static">二级</span>
                              </c:if>
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="col-sm-3 control-label">名称</label>
                  <div class="col-sm-6">
                    <textarea id="name" name="name" rows="5" disabled maxlength="255" class="form-control">${standard.name}</textarea>
                  </div>
                </div>
                
                   <div class="form-group">
                  <label class="col-sm-3 control-label">基准分</label>
                  <div class="col-sm-6">
                  <input id="baseScore" type="text" name="baseScore" disabled value="${standard.baseScore}" class="layui-input" autocomplete="off" required >
                  </div>
                </div>  
                  
                  
                    <div class="form-group">
                  <label class="col-sm-3 control-label">累计次数</label>
                  <div class="col-sm-6">
                  <input id="insNum" type="text" name="insNum" disabled value="${standard.insNum}" class="layui-input" autocomplete="off" required >
                  </div>
                </div> 
                  
                  
               <div class="form-group">
                  <label class="col-sm-3 control-label">最低加减分</label>
                  <div class="col-sm-6">
                  <input id="insScoreMin" type="text" name="insScoreMin" disabled value="${standard.insScoreMin}" class="layui-input" autocomplete="off" required >
                  </div>
                </div>
                
                 <div class="form-group">
                  <label class="col-sm-3 control-label">最高加减分</label>
                  <div class="col-sm-6">
                  <input id="insScoreMax" type="text" name="insScoreMax" disabled value="${standard.insScoreMax}" class="layui-input" autocomplete="off" required >
                  </div>
                </div>
                
                 <div class="form-group">
                  <label class="col-sm-3 control-label">加减分类型</label>
                  <div class="col-sm-5" id="">
                  	<c:if test="${standard.type=='01'}">加分</c:if>
                        <c:if test="${standard.type=='02'}">减分</c:if>
                  </div>
                </div>
                
                
                 <div class="form-group">
                  <label class="col-sm-3 control-label">审核角色</label>
                  <div class="col-sm-5" id="">
                  		<c:if test="${standard.authRole=='1'}">班主任</c:if>
                        <c:if test="${standard.authRole=='2'}">任课老师</c:if>
                        <c:if test="${standard.authRole=='3'}">生辅老师</c:if>
                        <c:if test="${standard.authRole=='7'}">德育老师</c:if>
                  </div>
                 </div>
                 
                 <div class="form-group">
                  <label class="col-sm-3 control-label">记录周期</label>
                  <div class="col-sm-5" id="">
                  			<c:if test="${standard.reportCycle=='01'}">不限</c:if>
	                        <c:if test="${standard.reportCycle=='02'}">每月一次</c:if>
	                        <c:if test="${standard.reportCycle=='03'}">期末一次</c:if>
	                        <c:if test="${standard.reportCycle=='04'}">期中期末各一次</c:if>
                  </div>
                </div>
                
                
             </div>
              <!-- <div class="box-footer" style="text-align: center">
                <button type="button" class="btn btn-default" onclick="history.go(-1);">返回</button>
              </div> -->
            </form>
          </div>
