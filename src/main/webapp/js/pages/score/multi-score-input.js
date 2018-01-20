var inputScoreAFull; 
    var inputScoreAStd; 
    var inputScoreBFull; 
    var inputScoreBStd; 
	function generateInputScoreDiv( courseMulti ) {
		
		//console.log("aaaaaa : "+courseMulti.length);
		
		var html = '';
		for(i = 0 ; i < courseMulti.length ; i++){
		var code = courseMulti[i].code;
		//console.log("code ="+code);
		var name = courseMulti[i].title;
		var courseName = courseMulti[i].courseName;
		html += '<tr>																						';
		html += '<td rowspan="2"><label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 64px; line-height: 64px;border: 1px solid #ccc;">'+courseName +'</label></td>';
		html += '<td><label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">A卷满分</label>';
		html += '	<input type="text" id=inputScoreAFull'+code+' name="inputScoreAFull'+code+'"                        ';
		html += '		class="easyui-textbox score-txt"  value="100"                                               ';
		html += '		></input>    ';
		html += '	</td>                                                                                   ';
		html += '<td><label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">A卷计入分</label>';
		html += '	<input type="text" id=inputScoreAStd'+code+' name="inputScoreAStd'+code+'"                          ';
		html += '		class="easyui-textbox score-txt"  value="100"                                               ';
		html += '		></input>  ';
		html += '	</td>                                                                                   ';
		html += '</tr>                                                                                      ';
		html += '<tr>																						';
		html += '<td><label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">B卷满分</label>';
		html += '	<input type="text" id=inputScoreBFull'+code+' name="inputScoreBFull'+code+'"                        ';
		html += '		class="easyui-textbox score-txt"  value="50"                                               ';
		html += '		></input>    ';
		html += '	</td>                                                                                   ';
		html += '<td><label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">B卷计入分</label>';
		html += '	<input type="text" id=inputScoreBStd'+code+' name="inputScoreBStd'+code+'"                          ';
		html += '		class="easyui-textbox score-txt"  value="50"                                               ';
		html += '		></input>  ';
		html += '	</td>                                                                                   ';
		html += '</tr>                                                                                      ';
		}
		//console.log(html)
		$('#input-score-multi-div').empty();
		$('#input-score-multi-div').html(html);
	}
	
	  function generateInputSingleScoreDiv( courseSingle ) {
		var html = '';
		for(i = 0 ; i < courseSingle.length ; i++){
			var code = courseSingle[i].code;
			var courseName = courseSingle[i].courseName;
			html += '<tr>																						';
			html += '<td><label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">'+courseName +'</label></td>';
			html += '<td><label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">满分</label>';
			html += '	<input type="text" id=inputScoreFull'+code+' name="inputScoreFull'+code+'"                        ';
			html += '		class="easyui-textbox score-txt"  value="100"                                               ';
			html += '		></input>    ';
			html += '	</td>                                                                                   ';
			html += '</tr>    ';
			
		}
		$('#input-score-single-div').empty();
		$('#input-score-single-div').html(html);
	} 
	//需要添加备注的文本框
	var columnTextRemark;
	var calbackRemarkType='';
	
	var editIndex = undefined;
	function endEditing() {
		if (editIndex == undefined) {
			return true
		}
		if ($('#score-input-multi-dg').datagrid('validateRow', editIndex)) {
			$('#score-input-multi-dg').datagrid('endEdit', editIndex);
			editIndex = undefined;
			return true;
		} else {
			return false;
		}
	}
	function onClickCell(index, field) {
		if (editIndex != index) {
			if (endEditing()) {
				$('#score-input-multi-dg').datagrid('selectRow', index)
						.datagrid('beginEdit', index);
				var ed = $('#score-input-multi-dg').datagrid('getEditor', {
					index : index,
					field : field
				});
				if (ed) {
					($(ed.target).data('textbox') ? $(ed.target).textbox(
							'textbox') : $(ed.target)).focus();
				}
				editIndex = index;
			} else {
				setTimeout(
						function() {
							$('#score-input-multi-dg').datagrid('selectRow',
									editIndex);
						}, 0);
			}
		}
	}
	function onEndEdit(index, row) {
		/* var ed = $(this).datagrid('getEditor', {
		     index: index,
		     field: '_remark'
		 }); */
		// row.remark = $(ed.target).combobox('getText'); 
		//row.remark = 'ok?';
	}
	
	function append() {
		if (endEditing()) {
			$('#score-input-multi-dg').datagrid('appendRow', {
				status : 'P'
			});
			editIndex = $('#score-input-multi-dg').datagrid('getRows').length - 1;
			$('#score-input-multi-dg').datagrid('selectRow', editIndex)
					.datagrid('beginEdit', editIndex);
		}
	}
	function removeit() {
		if (editIndex == undefined) {
			return

		}
		$('#score-input-multi-dg').datagrid('cancelEdit', editIndex).datagrid(
				'deleteRow', editIndex);
		editIndex = undefined;
	}
	function accept() {
		if (endEditing()) {
			$('#score-input-multi-dg').datagrid('acceptChanges');
		}
	}
	function reject() {
		$('#score-input-multi-dg').datagrid('rejectChanges');
		editIndex = undefined;
	}
	function getChanges() {
		var rows = $('#score-input-multi-dg').datagrid('getChanges');
		alert(rows.length + ' rows are changed!');
	}

	function getData() {
		var data = $('#score-input-multi-dg').datagrid('getData');
	}

	function updateActions(index) {
		$('#score-input-multi-dg').datagrid('updateRow', {
			index : index,
			row : {}
		});
	}

	function getRowIndex(target) {
		var tr = $(target).closest('tr.datagrid-row');
		return parseInt(tr.attr('datagrid-row-index'));
	}

	var remarkTarget;

	function addRemarkToStudent() {
		//console.log(calbackRemarkType);
		if(calbackRemarkType == '1'){
			var remark = $('#viewScoreRemark').val();
			//var data = $("#classRemark").val();
			//console(data);
			//console.log(remark);
			var data = $("#classRemark").val();
			//console.log(data);
			var classRemark = $("#classRemark").val(remark);
			$('#score-input-remark-win').window('close');
			$('#score-input-remark-win').empty();
		} else if(calbackRemarkType == '0'){
			
		//console.log("--------");
		//console.log(remarkTarget);
		var rowIndex = getRowIndex(remarkTarget);
		//console.log(remarkTarget);
		//console.log(rowIndex);
		var rows = $('#score-input-multi-dg').datagrid('getRows');
		var row = rows[rowIndex];
		var remark = $('#viewScoreRemark').val();
		//console.log(row);
		
		var data = row[columnTextRemark];
		if (data == null || data == '' || data == 'null') {
			row[columnTextRemark] = '';
			data = row[columnTextRemark] += remark;
		} else {
			data = row[columnTextRemark] += "\n" + remark;
		}

		//console.log(data);

		var ed = $('#score-input-multi-dg').datagrid('getEditor', {
			index : rowIndex,
			field : columnTextRemark
		});
		ed.actions.setValue(ed.target, remark);
		
		$('#score-input-remark-win').window('close');
		$('#score-input-remark-win').empty();
		}
	}
	
	function selectRemarkOption(target,code, type) {

		remarkTarget = target;
		calbackRemarkType = type;
		columnTextRemark = code + "-textarea";
		
		$('#score-input-multi-dg').datagrid('beginEdit', rowIndex);

		var rowIndex = getRowIndex(target);
		var rows = $('#score-input-multi-dg').datagrid('getRows');
		var row = rows[rowIndex];

		$('#score-input-remark-win').empty();
		$('#score-input-remark-win').window('open');
		$('#score-input-remark-win').window('refresh', 'toScoreRemarkPage');
		
	}
	
	//班级评语
	/* var classTarget;
	function selectClassRemarkOption(target,type){
		console.log(type);
		classTarget = target;
		calbackRemarkType = type;
		var remark = $('#viewScoreRemark').html();
			//console.log(remark);
			var classRemark = $("#classRemark").val(remark);
			
       	remarkTarget = target;
       	$('#score-input-remark-win').empty();
       	$('#score-input-remark-win').window('open');
       	$('#score-input-remark-win').window('refresh', 'toScoreRemarkPage');
       
	} */
	
	function deleterow(target) {
		$.messager.confirm('Confirm', 'Are you sure?', function(r) {
			if (r) {
				$('#score-input-multi-dg').datagrid('deleteRow',
						getRowIndex(target));
			}
		});
	}
	function saverow(target) {
		$('#score-input-multi-dg').datagrid('endEdit', getRowIndex(target));
	}
	function cancelrow(target) {
		$('#score-input-multi-dg').datagrid('cancelEdit', getRowIndex(target));
	}

	function downloadScoreTemplate() {
		var classId = $('#inputClassId').val();
		var scoreMulti = $('#inputScoreMulti').val();
		var scoreSection = $('#inputScoreSection').val();
		window
				.open('scoreManage/downloadScoreTemplate?classId=' + classId
						+ '&scoreMulti=' + scoreMulti + '&scoreSection='
						+ scoreSection);
	}
	var resultHeaders;
	var courseMulti = [];
	var courseSingle = [];
	function ajaxFileUploadMulti() {
		var examInsId = $('#inputExamInsId').val();
		var classId = $('#inputClassId').val();
		var scoreMulti = $('#inputScoreMulti').val();
		var scoreSection = $('#inputScoreSection').val();
		$("#input-score-multi-classRemark").show();
		$("#classRemark").show();
		$('#score-upload-form').form('submit',
						{
							url : 'scoreManage/scoreFileUploadMulti',
							onSubmit : function(param) {
								param.examInsId = examInsId;
								param.classId = classId;
								param.scoreMulti = scoreMulti;
								param.scoreSection = scoreSection;
								return true;
							},
							async : false,
							success : function(result) {
								courseMulti = [];
								courseSingle = [];
								$('#input-score-multi-div').empty();
								$("#input-score-single-div").empty();
								//$("#fullscore").empty();
								//$("#input-score-single-div").empty();
								//$("#input-score-multi-div").empty();
								var result = $.parseJSON(result);
								var columnHeaders = [];
								var columnStudents = new Array();
								if (result.code == "02") {
								resultHeaders = result.data.header;
									if (result.data) {
										var headers = result.data.header;
										for (var k = 0; k < headers.length; k++) {
											var code = headers[k].code;
											//console.log(code);
											var name = headers[k].titleName;
											var courseName = headers[k].courseName;
											var isMulti = headers[k].isMulti;
											if(k > 1){
												if (isMulti == 1) {
													columnHeaders.push({
														field : code + '-scoreA',
														title : name + '-A卷',
														width:50,
														editor:'textbox'
													});
													columnHeaders.push({
														field : code + '-scoreB',
														title : name + '-B卷',
														width:50,
														editor:'textbox'
														
													});
													columnHeaders.push({
														field : code + '-select-textarea',
														title : '评语',
														width:50,
														editor:'textarea'
													});
													columnHeaders.push({
														field : code+"-select",
														title : '评语选项',
														width:50,
														formatter:function(value,row,index){
															return '<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:\'icon-add\',plain:true" onclick="selectRemarkOption(this,\''+this.field + '\',\'0\')">选择</a>';
														}
													});
													courseMulti.push({
														code : code,
														title : name,
														width:50,
														courseName:name 
													});
	
												} else {
													columnHeaders.push({
														field : code,
														title : name,
														width:50,
														editor:'textbox'
													});
													
													columnHeaders.push({
														field : code + '-select-textarea',
														title : '评语',
														width:50,
														editor:'textarea'
													});
													columnHeaders.push({
														field : code+"-select",
														title : '评语选项',
														width:50,
														formatter:function(value,row,index){
															
															return '<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:\'icon-add\',plain:true" onclick="selectRemarkOption(this,\''+this.field + '\', \'0\')">选择</a>';
														}
													});
													
													courseSingle.push({
														code : code,
														title : name,
														width:50,
														courseName:name 
													});
												}
												
											}else{
												columnHeaders.push({
													field : code,
													title : name,
													width:50,
													editor:'textbox'
												});
											}
										}
										//console.log(courseMulti);
										//console.log(headers);
										var students = result.data.student;
										//console.log(students);
										var headers = result.data.header;
										for (var i = 0; i < students.length; i++) {
											var stu = students[i];
											var student = {};
											for (var j = 0; j < headers.length; j++) {
												var code = headers[j].code;
												//console.log(code)
												var name = headers[j].titleName;
												var isMulti = headers[j].isMulti;
												if (j == 0) {
													student[code] = stu[j].studentNo;

												} else if (j == 1) {
													student[code] = stu[j].name;

												} else if (j > 1) {
													if (isMulti == 1) {
														student[code
																+ '-scoreA'] = stu[j].scoreA;
														student[code
																+ '-scoreB'] = stu[j].scoreB;
													} else {

														student[code] = stu[j].score;
													}
												}
											}
											columnStudents.push(student);
											//console.log(stu)
											//console.log(student)
										}
										//console.log(columnStudents);
										//显示AB卷
										generateInputScoreDiv(courseMulti);
										generateInputSingleScoreDiv( courseSingle );
										 $('#score-input-multi-dg').datagrid({
											rownumbers : true,
											fitColumns : false,
											onClickCell: onClickCell,
											columns : [ columnHeaders ]
										});
										//console.log(columnStudents);
										
										$('#score-input-multi-dg').datagrid(
												'loadData', columnStudents); 
									}
								} else {
									$.messager.show({
										title : '提示',
										msg : result.msg,
										showType : 'fade',
										style : {
											right : '',
											bottom : ''
										}
									});
								}
							}
						});
	}