<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
	<body>
	<div style="overflow: auto;">
	
	<div style="width: 500px;float: left;">
		<select id="rangeRules" name="rangeRules" style="width:350px;">
	<c:if test="${fn:length(ranges) == 0 }">
		<option value="-1">--无分数段信息--</option>
	</c:if>
    <c:if test="${fn:length(ranges)>0 }">
    	<option value="-1">请选择分数段</option>
    	<c:forEach items="${ranges }" var="r">
    		<option value="${r.name }">${r.name }</option>
    	</c:forEach>
    </c:if>
</select>
<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="showAddInput()">新增分数段</a>

<div id="ruleNameBox">
	<input type="text" id="rangeRuleName" name="rangeRuleName" class="easyui-textbox" style="width:290px" data-options="label:'分数段名称',validType:'checkName'"></input>
	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="hideAddInput()">取消新增</a>
</div>

	<div id="score-range-tb" style="height:121">
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append()">增加一行</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除一行</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="deleteRange()">删除此分数段</a>
        <!-- <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="accept()">Accept</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="getData()">查看数据</a> -->
    </div>
<table id="range-rule-dg" style="width:100%;height:auto"></table>
</div>
<ul style="font-size: 13px;color:red; width:270px;float: right;line-height: 30px;" >
	<li style="font-weight: bolder;">分数段规则:</li>
	<li>分数段统计含下限，不含上限(最高分数段除外)</li>
	<li>例：</li>
	<li>第一阶段：85-100</li>
	<li>第二阶段：70-84</li>
	<li>第三阶段：60-69</li>
	<li>第四阶段：0-59</li>
	<li>以此类推</li>
</ul>
</div>

<script type="text/javascript">
	var rangeName = $('#rangeRules').find('option:selected').val();

	$(function() {
		datagirdShow();
		if($('#rangeRules').val() == '-1'){
			for(var i = 0;i<4;i++){
				append();
			} 
		}else{
			$('#range-rule-dg').datagrid('reload','scoreManage/ScoreRangeRuleByName?name='+$('#rangeRules').val());
		}
		$('#ruleNameBox').hide();
		 $('#rangeRules').combobox({
			 editable:false,
			onChange:function(n,o){
				rangeName = n;
				if(n != '-1'){
					$('#range-rule-dg').datagrid('reload','scoreManage/ScoreRangeRuleByName?name='+n);
				}/* else{
					$("#range-rule-dg").datagrid("loadData", { total: 0, rows: [] });
					for(var i = 0;i<4;i++){
						append();
					}
				} */
				
			}
		}); 
	});
	$.extend($.fn.validatebox.defaults.rules, {
		checkName:{
			validator:function(value){
				var ok = 0;
				$("#range-rule-dg").datagrid("loadData", { total: 0, rows: [] });
				for(var i = 0;i<4;i++){
					append();
				}
				$('#rangeRules option').each(function(){
					if($(this).val() == value){
						ok = 1;
						return false;
					}else{
						ok = 0;
						return true;
					}
				});
				if(ok == 1){
					return false;
				}else{
					return true;
				}
			},
			message:"已存在该分数段名称！"
		},
		checkScore:{
			validator:function(value,param){
				if(param[0] == 1){
					return false;
				}else{
					return true;
				}
			},
			message:"最低分和最高分不能相等"
		},
		
	});
	function deleteRange(){
		
		if(rangeName == '-1' || rangeName == ''){
			$.messager.show({
           	  	title:'提示',
           	  	msg: '请选择分数段',
           	  	showType:'fade',
                  style:{
                      right:'',
                      bottom:''
                  }
           	  });
			return;
		}
		$.messager.confirm("提示","确认删除【"+rangeName+"】的数据吗？",function(r){
        	if(r){
        		var input = {'name':rangeName};
        		$.ajax({
        			url : "scoreManage/deleteScoreRangeRule",
        			type: "POST",
        	        contentType: "application/json",
        	        dataType:"json",
        	        async: false,
        	        data:JSON.stringify(input),
        			success : function(result) {
        				
        				//console.log(result);
        				
        				if('02'==result.code){
        					//console.log("id = "+ id);
        					 $.messager.show({
        	               	  	title:'提示',
        	               	  	msg: '删除成功！',
        	               	  	showType:'fade',
        	                      style:{
        	                          right:'',
        	                          bottom:''
        	                      }
        	               	  });
        					$.messager.progress('close');
        					$('#score-range-win').window('refresh',"toFindScoreRange");
        	              } else {
        	            	  $.messager.show({
        	               	  	title:'提示',
        	               	  	msg: '删除失败,请重试！',
        	               	  	showType:'fade',
        	                      style:{
        	                          right:'',
        	                          bottom:''
        	                      }
        	               	  });
        	             }
        			}
        		});
        	}
        });
		
	}
	
	function hideAddInput(){
		$('#rangeRuleName').textbox('clear');
		$('#ruleNameBox').hide();
		$('#rangeRules').combobox('enable');
		$('#range-rule-dg').datagrid('reload','scoreManage/ScoreRangeRuleByName?name='+$('#rangeRules').val());
	}
	function showAddInput(){
		$('#ruleNameBox').show();
		$('#rangeRules').combobox('disable');
		$("#range-rule-dg").datagrid("loadData", { total: 0, rows: [] });
	}
	function datagirdShow(){
		$('#range-rule-dg').datagrid({
			iconCls: 'icon-edit',
			//url:'scoreManage/ScoreRangeRuleByName?name='+name,
			singleSelect: true,
			toolbar: 'score-range-tb',
			method: 'get',
			fitColumns:true,
			rownumbers:true,
			onClickCell: onClickCell,
			columns:[
				[
					{field:'id',hidden:true},
					{field:'name',hidden:true},
					{field:'type',hidden:true},
					{field:'scoreRangeStart',align:'center',width:60,title:'最低分',editor:'textbox'},
				    {field:'scoreRangeEnd',align:'center',width:60,title:'最高分',editor:'textbox'},
				]
			]
		});
	}
	var editIndex = undefined;
    function endEditing(){
        if (editIndex == undefined){return true}
        if ($('#range-rule-dg').datagrid('validateRow', editIndex)){
            $('#range-rule-dg').datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
	function onClickCell(index, field){
        if (editIndex != index){
            if (endEditing()){
                $('#range-rule-dg').datagrid('selectRow', index)
                        .datagrid('beginEdit', index);
                var ed = $('#range-rule-dg').datagrid('getEditor', {index:index,field:field});
                if (ed){
                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                    $(ed.target).textbox({
                    	onChange:function(n,o){
                    		var fieldName = '';
                    		console.log(field);
            				var rows = $('#range-rule-dg').datagrid('getRows');
            				if(field == 'scoreRangeStart'){
            					fieldName = 'scoreRangeEnd';
            				}else{
            					fieldName = 'scoreRangeStart';
            				}
            				console.log('当前值:'+n);
            				for(var i = 0; i< rows.length; i++){
            					if(n == rows[i][fieldName]){
            						$(ed.target).textbox({validType:'checkScore[1]'});
            						break;
            					}else{
            						$(ed.target).textbox({validType:'checkScore[0]'});
            					}
            				}
                    			}
                    		}); 
                }
                editIndex = index;
            } else {
                setTimeout(function(){
                    $('#range-rule-dg').datagrid('selectRow', editIndex);
                },0);
            }
        }
        
    }
	function append(){
        if (endEditing()){
            $('#range-rule-dg').datagrid('appendRow',{id:"",scoreRangeStart:"",scoreRangeEnd:""});
            editIndex = $('#range-rule-dg').datagrid('getRows').length-1;
            if(editIndex == 3){
            	editIndex = 0;
            }
            $('#range-rule-dg').datagrid('selectRow', editIndex)
                    .datagrid('beginEdit', editIndex);
        }
    }
	function removeit(){
        if (editIndex == undefined){return}
        $.messager.confirm("提示","确认删除该行数据吗？",function(r){
        	if(r){
        		$('#range-rule-dg').datagrid('cancelEdit', editIndex)
                .datagrid('deleteRow', editIndex);
        		editIndex = undefined;
        	}
        });
        
    }
	 function accept(){
        if (endEditing()){
            $('#range-rule-dg').datagrid('acceptChanges');
        }
    }/*
    function reject(){
        $('#range-rule-dg').datagrid('rejectChanges');
        editIndex = undefined;
    }
    function getChanges(){
        var rows = $('#range-rule-dg').datagrid('getChanges');
        alert(rows.length+' rows are changed!');
    }
    
    */function getData(){
    	var data = $('#range-rule-dg').datagrid('getData');
    	//editIndex
    	console.log(data);
    }/*
    function updateActions(index){
		$('#range-rule-dg').datagrid('updateRow',{
			index:index,
			row:{}
		});
	}
    
    function getRowIndex(target){
		var tr = $(target).closest('tr.datagrid-row');
		return parseInt(tr.attr('datagrid-row-index'));
	}
    function deleterow(target){
		$.messager.confirm('Confirm','Are you sure?',function(r){
			if (r){
				$('#range-rule-dg').datagrid('deleteRow', getRowIndex(target));
			}
		});
	}
	function saverow(target){
		$('#range-rule-dg').datagrid('endEdit', getRowIndex(target));
	}
	function cancelrow(target){
		$('#range-rule-dg').datagrid('cancelEdit', getRowIndex(target));
	} */
</script>
	</body>
</html>
