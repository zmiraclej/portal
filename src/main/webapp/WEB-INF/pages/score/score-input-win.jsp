<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

	<input type="hidden" id="inputExamInsId" name="examInsId" value="${examInsId }">
	<input type="hidden" id="inputScoreMulti" name="scoreMulti" value="${scoreMulti }">
	<input type="hidden" id="inputClassId" name="classId" value="${classId }">
	<input type="hidden" id="inputCourseCode" name="courseCode" value="${courseCode }">
	<input type="hidden" id="inputExamType" name="examType" value="${examType }">
	<input type="hidden" id="inputCourseName" name="courseName" value="${courseName }">
	<input type="hidden" id="inputClassName" name="className" value="${className }">
	<input type="hidden" id="inputFullScore" name="fullScore" value="${fullScore }">
	
			<c:choose> 
				  	<c:when test='${scoreMulti eq "1" && examType eq "-1"}'>
				  		<table>
					  		<tr>
					  			<td>
					  				<input type="text" id=inputScoreAFull name="inputScoreAFull" class="easyui-numberbox" style="width:350px" value="${rule.scoreAFull }" data-options="required:true,label:'A卷满分',min:0,max:1000"></input>
					  			</td>
					  			<td>
					  			<input type="text" id=inputScoreAStd name="inputScoreAStd" class="easyui-numberbox" style="width:350px" value="${rule.scoreAStd }" data-options="required:true,label:'A卷计入分',min:0,max:1000"></input>
					  			</td>
					  		</tr>
					  		<tr>
					  			<td>
					  				<input type="text" id=inputScoreBFull name="inputScoreBFull" class="easyui-numberbox" style="width:350px" value="${rule.scoreBFull }" data-options="required:true,label:'B卷满分',min:0,max:1000"></input>
					  			</td>
					  			<td>
					  			<input type="text" id=inputScoreBStd name="inputScoreBStd" class="easyui-numberbox" style="width:350px" value="${rule.scoreBStd }" data-options="required:true,label:'B卷计入分',min:0,max:1000"></input>
					  			</td>
					  		</tr>
					  	</table>
				  	</c:when>
				  	 <c:when test='${scoreMulti eq "1"}'>  
					    <table>
					  		<tr>
					  			<td>
					  				<input type="text" id=inputScoreAFull name="inputScoreAFull" class="easyui-numberbox" style="width:350px" value="100" data-options="required:true,label:'A卷满分',min:0,max:1000"></input>
					  			</td>
					  			<td>
					  			<input type="text" id=inputScoreAStd name="inputScoreAStd" class="easyui-numberbox" style="width:350px" value="100" data-options="required:true,label:'A卷计入分',min:0,max:1000"></input>
					  			</td>
					  		</tr>
					  		<tr>
					  			<td>
					  				<input type="text" id=inputScoreBFull name="inputScoreBFull" class="easyui-numberbox" style="width:350px" value="50" data-options="required:true,label:'B卷满分',min:0,max:1000"></input>
					  			</td>
					  			<td>
					  			<input type="text" id=inputScoreBStd name="inputScoreBStd" class="easyui-numberbox" style="width:350px" value="50" data-options="required:true,label:'B卷计入分',min:0,max:1000"></input>
					  			</td>
					  		</tr>
					  	</table>
					 </c:when>
				</c:choose> 
	
	<div class="easyui-panel" style="width:100%;padding:10px">
		<div style="margin-bottom:20px">
			<form id="score-upload-form" method="post" enctype="multipart/form-data">
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="downloadScoreTemplate()" style="width:150px;">下载成绩模板</a>
			读取成绩：<input class="easyui-filebox" name="scoreFile" data-options="prompt:'选择导入文件...', buttonText:'选择', accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'" style="width:300px">
			<a href="javascript:void(0)" class="easyui-linkbutton" onclick="ajaxFileUpload()" style="width:150px;">读取</a>
			</form>
		</div>
	</div>
	
	  <div id="score-input-tb" style="height:auto">
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="append()">增加学生</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" onclick="removeit()">删除学生</a>
       <!-- <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onclick="accept()">Accept</a> -->
        <!--  <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true" onclick="reject()">Reject</a> -->
        <!-- <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="getData()">查看数据</a> -->
       <!--  <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="getChanges()">更改数量</a> -->
    	<%-- <input class="easyui-textbox" id="singleClassRemark" value="${singleClassRemark }" style="width: 500px;"/>
    	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" onclick="selectClassRemark()">添加班级单科评语</a> --%>
    </div>
	
    <table id="score-input-dg" class="easyui-datagrid" title="${examInsName }" style="width:100%;height:auto"
            data-options="
                iconCls: 'icon-edit',
                singleSelect: true,
                toolbar: 'score-input-tb',
                url: 'scoreManage/findStudentsByClassId?classId=${classId }&examType=${examType }&courseCode=${courseCode }&examInsId=${examInsId }',
                method: 'get',
                onClickCell: onClickCell,
                onEndEdit: onEndEdit
            ">
        <thead>
            <tr>
            	<th data-options="field:'id',width:150,hidden:'true'">id</th>
                <th data-options="field:'studentCode',width:60,editor:'textbox'">学号</th>
                <th data-options="field:'name',width:100,editor:'textbox'">姓名</th>
                <c:choose> 
				  <c:when test='${scoreMulti eq "1"}'>   
					<th data-options="field:'scoreA',width:80,align:'right',editor:'textbox'">A卷分数</th>
					<th data-options="field:'scoreB',width:80,align:'right',editor:'textbox'">B卷分数</th>
				  </c:when>
				  <c:otherwise>   
				    <th data-options="field:'score',width:80,align:'right',editor:'textbox'">分数</th>
				  </c:otherwise> 
				</c:choose> 
                
                <th data-options="field:'remark',width:330,editor:'textarea'">评语</th>
                <th field="action" width="80" align="center" formatter="formatAction">评语选项</th>
                <th data-options="field:'status',width:60,align:'center',editor:{type:'checkbox',options:{on:'是',off:'否'}}">异常</th>
            </tr>
        </thead>
    </table>
    
     <div id="score-input-remark-win" class="easyui-dialog" style="padding:5px;width:700px;height:550px;"
			title="选择评语" data-options="iconCls:'icon-view',modal:true, closed:true" buttons="#score-input-remark-dlg-buttons">
	</div>
	
	<div id="score-input-remark-dlg-buttons">
		<a class="easyui-linkbutton" onclick="addRemarkToStudent()">添加评语</a>
	</div>
	<!-- <div id="score-input-classRemark-win" class="easyui-dialog" style="padding:5px;width:700px;height:550px;"
			title="选择评语" data-options="iconCls:'icon-view',modal:true, closed:true" buttons="#score-input-classRemark-dlg-buttons">
	</div>
	
	<div id="score-input-classRemark-dlg-buttons">
		<a class="easyui-linkbutton" onclick="addClassRemark()">添加评语</a>
	</div> -->
    
    <script type="text/javascript">
    
   /*  $(function(){
    	
	}); */
	/* function formatNumberA(value,row,index){
		if($('#inputScoreAFull').val()==null){
			return;
		}else
		if(value<0 || value>$('#inputScoreAFull').val()){
			$.messager('请输入正确范围的分数！');
			return 0;
		}
	}
	function formatNumberB(value,row,index){
		if($('#inputScoreBFull').val()==null){
			return;
		}else
		if(value<0 || value>$('#inputScoreBFull').val()){
			$.messager('请输入正确范围的分数！');
			return 0;
		}
	}
	function formatNumber(value,row,index){
		if($('#inputFullScore').val()==null){
			return;
		}else
		if(value<0 || value>$('#inputFullScore').val()){
			$.messager('请输入正确范围的分数！');
			return 0;
		}
	} */
	/* var error = ${error};
	if(error=="1"){
		 $.messager.alert("提示","暂无学生成绩信息！");
		 $('#score-input-win').window('close');
		 $('#score-input-win').empty();
	} */
    
        var editIndex = undefined;
        function endEditing(){
            if (editIndex == undefined){return true}
            if ($('#score-input-dg').datagrid('validateRow', editIndex)){
                $('#score-input-dg').datagrid('endEdit', editIndex);
                editIndex = undefined;
                return true;
            } else {
                return false;
            }
        }
        function onClickCell(index, field){
            if (editIndex != index){
                if (endEditing()){
                    $('#score-input-dg').datagrid('selectRow', index)
                            .datagrid('beginEdit', index);
                    var ed = $('#score-input-dg').datagrid('getEditor', {index:index,field:field});
                    if (ed){
                        ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                    }
                    editIndex = index;
                } else {
                    setTimeout(function(){
                        $('#score-input-dg').datagrid('selectRow', editIndex);
                    },0);
                }
            }
        }
        function onEndEdit(index, row){
           /* var ed = $(this).datagrid('getEditor', {
                index: index,
                field: '_remark'
            }); */
           // row.remark = $(ed.target).combobox('getText'); 
           //row.remark = 'ok?';
        }
        function append(){
            if (endEditing()){
                $('#score-input-dg').datagrid('appendRow',{status:'P'});
                editIndex = $('#score-input-dg').datagrid('getRows').length-1;
                $('#score-input-dg').datagrid('selectRow', editIndex)
                        .datagrid('beginEdit', editIndex);
            }
        }
        function removeit(){
            if (editIndex == undefined){return}
            $('#score-input-dg').datagrid('cancelEdit', editIndex)
                    .datagrid('deleteRow', editIndex);
            editIndex = undefined;
        }
        function accept(){
            if (endEditing()){
                $('#score-input-dg').datagrid('acceptChanges');
            }
        }
        function reject(){
            $('#score-input-dg').datagrid('rejectChanges');
            editIndex = undefined;
        }
        function getChanges(){
            var rows = $('#score-input-dg').datagrid('getChanges');
            alert(rows.length+' rows are changed!');
        }
        
        function getData(){
        	var data = $('#score-input-dg').datagrid('getData');
        	//editIndex
        	//console.log(data);
        }
        
        function formatAction(value,row,index){
			/* if (row.editing){
				var s = '<a href="#" onclick="saverow(this)">Save</a> ';
				var c = '<a href="#" onclick="cancelrow(this)">Cancel</a>';
				return s+c;
			} else {
				var e = '<a href="#" onclick="editrow(this)">Edit</a> ';
				var d = '<a href="#" onclick="deleterow(this)">Delete</a>';
				return e+d;
			} */
			
			var a = '<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:\'icon-add\',plain:true" onclick="selectRemarkOption(this)">选择</a>';
			
			return a;
		}
        
        function updateActions(index){
			$('#score-input-dg').datagrid('updateRow',{
				index:index,
				row:{}
			});
		}
        
        function getRowIndex(target){
			var tr = $(target).closest('tr.datagrid-row');
			return parseInt(tr.attr('datagrid-row-index'));
		}
        
        var remarkTarget;
        
        function addRemarkToStudent(){
        	
        	var rowIndex = getRowIndex(remarkTarget);
        	var rows = $('#score-input-dg').datagrid('getRows');
        	var row = rows[rowIndex];
        	
        	var remark = $('#viewScoreRemark').val();
        	//console.log(remark);
        	
        	var data = row.remark;
			 
        	if(row.remark == null || row.remark == '' || row.remark == 'null'){
				 row.remark = '';
				 data = row.remark += remark;
			 }
			 else{
				 data = row.remark += "\n" + remark;
			 }
        	
        	//console.log(data);
        	
        	 var ed = $('#score-input-dg').datagrid('getEditor', {index: rowIndex,field:'remark'});
        	 ed.actions.setValue(ed.target, remark);
        	 
         	$('#score-input-remark-win').window('close');
         	$('#score-input-remark-win').empty();
        }
        
        function selectRemarkOption(target){
        
        	remarkTarget = target;
        	
			$('#score-input-dg').datagrid('beginEdit', rowIndex);
			
			
        	var rowIndex = getRowIndex(target);
        	var rows = $('#score-input-dg').datagrid('getRows');
        	var row = rows[rowIndex];
        	
        	$('#score-input-remark-win').empty();
        	$('#score-input-remark-win').window('open');
        	$('#score-input-remark-win').window('refresh', 'toScoreRemarkPage');
        	
			//var rowTarget = target;
        	
			/* $.messager.prompt('Prompt', 'Please enter your name:', function(r){
				if (r){
					console.log(rowIndex);
					console.log(rows);
					console.log(row);
					 var ed = $('#score-input-dg').datagrid('getEditor', {index: rowIndex,field:'remark'});
					 //var data = row.remark += "\n ok? " + r;
					 
					 if(row.remark == null || row.remark == '' || row.remark == 'null'){
						 row.remark = '';
						 data = row.remark += r;
					 }
					 else{
						 data = row.remark += "\n" + r;
					 }
					 
					 ed.actions.setValue(ed.target, data);  
					//$(ed.target).textareabox('setValue', "ok? " + r);
					//row.remark += "ok? " + r;
					
					//$('#score-input-dg').datagrid('endEdit', rowIndex);
					
				}
			}); */
		}
		function deleterow(target){
			$.messager.confirm('Confirm','Are you sure?',function(r){
				if (r){
					$('#score-input-dg').datagrid('deleteRow', getRowIndex(target));
				}
			});
		}
		function saverow(target){
			$('#score-input-dg').datagrid('endEdit', getRowIndex(target));
		}
		function cancelrow(target){
			$('#score-input-dg').datagrid('cancelEdit', getRowIndex(target));
		}
        
       /*  function formatAction(value,row,index){
			if (row.editing){
				var s = '<a href="#" onclick="selectMarkOptiona( value,row,index )">评语选项</a> ';
				return s;
			} else {
				var d = '选项';
				return d;
			}
		} */
        
       /*  function selectMarkOptiona(value,row,index){
        	row.remark = "ok?";
        } */
        
        /* function getLinkbuttonRow( index, row ){
        	alert('ok?');
        } */
        
     // 解决datagrid中单击修改单元格时，textarea会自动将datagrid表格行撑大的问题  
        /* $.extend($.fn.datagrid.defaults.editors,{  
            linkbutton: {  
                init: function(container, options){  
                    // var input = $("<textarea class='datagrid-editable-input' style='position:absolute; padding:0px; margin-top:-12px; height:120px; resize:none;' data-options=\"required:true,validType:'maxLength[10]'\"></textarea>").validatebox(options).appendTo(container);  
                    var input = $('<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:\'icon-remove\',plain:true" onclick="getLinkbuttonRow( index, row )">评语选项</a>').validatebox(options).appendTo(container);  
                        return input;  
                  },  
                getValue: function(target){  
                    return $(target).val();  
                },  
                setValue: function(target, value){  
                    $(target).val(value);  
                },  
                resize: function(target, width){  
                    var input = $(target);  
                    if($.boxModel == true){  
                       input.width(width - (input.outerWidth() - input.width()));  
                    }else{  
                       input.width(width);  
                    }  
                }  
            }  
        }); */
        
        function downloadScoreTemplate(){
        	var classId = $('#inputClassId').val();
        	var scoreMulti = $('#inputScoreMulti').val();
        	window.open('scoreManage/downloadScoreTemplate?classId='+classId+'&scoreMulti='+scoreMulti);
        }
        
        function ajaxFileUpload() {
        	
        	var examInsId = $('#inputExamInsId').val();
        	var classId = $('#inputClassId').val();
        	var scoreMulti = $('#inputScoreMulti').val();
        	
        	$('#score-upload-form').form('submit', {
        		url: 'scoreManage/scoreFileUpload',
        		onSubmit: function( param ){
        			param.examInsId = examInsId;
        			param.classId = classId;
        			param.scoreMulti = scoreMulti;
        			return true;
        		
        		},
        		success: function( result ){
        			//console.log(result);
        			result = JSON.parse(result);
        			//console.log(result.code);
        			if(result.code == "02"){
        				
        				if(result.data){
        					$('#score-input-dg').datagrid('loadData', result.data);
        				}
        				
            			//console.log('ok');
            			//console.log(result.data);
            		}
            		else{
            			//console.log('no');
            			 $.messager.show({
            		    	  	title:'提示',
            		    	  	msg: result.msg,
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
        
        
    </script>
    
    <%-- <script type="text/javascript" src="${ctx}/easyui/jquery.min.js"></script> --%>
    <%-- <script src="${ctx }/js/pages/score/jquery.form.js"></script>  --%>
    </body>
</html>
