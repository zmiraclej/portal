<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
            <div class="box-body">
            <div class="box-header with-border">
               	例如，01代表思想品德，以此类推01,02,03；等级选择一级。
             	 <br/>
              	     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01001代表思想品德下面的某项评测标准，以此类推01002，01003；等级选择二级
            </div>
            <!-- form start -->
            <form id="addform"  class="form-horizontal" action="${ctx}/save" method="post">
              <div class="box-body">
              	
              	<div class="form-group">
                  <label class="col-sm-3 control-label">编号</label>
                  <div class="col-sm-4">
                         <input id="code" type="number" name="code" value="" class="form-control" required autocomplete="off"  >
                  </div>
                </div>
                <div class="form-group">
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
                    <textarea id="name" name="name" rows="5" required maxlength="255" class="form-control"></textarea>
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
                  <label class="col-sm-3 control-label">基准分</label>
                  <div class="col-sm-6">
                  <input id="baseScore" type="number" name="baseScore" value="" class="form-control" autocomplete="off" required >
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
                  <label class="col-sm-3 control-label">累计次数</label>
                  <div class="col-sm-6">
                  <input id="insNum" type="number" name="insNum" value="" class="form-control" autocomplete="off" required >
                  </div>
                </div>
                 <div class="form-group">
                  <label class="col-sm-3 control-label">最低加减分</label>
                  <div class="col-sm-6">
                  <input id="insScoreMin" type="number" name="insScoreMin" value="" class="form-control" autocomplete="off" required >
                  </div>
                </div>
                 <div class="form-group">
                  <label class="col-sm-3 control-label">最高加减分</label>
                  <div class="col-sm-6">
                  <input id="insScoreMax" type="number" name="insScoreMax" value="" class="form-control" autocomplete="off" required >
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
                
              </div> -->
            </form>
          </div>
