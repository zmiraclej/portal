<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

	<input type="hidden" id="sendMsgExamInsId" name="sendMsgExamInsId" value="${input.examInsId }">
	<input type="hidden" id="sendMsgClassId" name="sendMsgExamInsId" value="${input.classId }">
	<div class="easyui-tabs" id="sendMsgStateTabs" style="width:100%;height:100%;">
        <div title="微信(总数：${wxCount } /成功：${wxMsgSuccess } /发送中：${wxMsgSending } /失败：${wxMsgFiled })" style="padding:10px;">
			<table id="view-Wx-sendState-table"  style="width:100%;height:100%"></table>
        </div>
        <div title="短信(总数：${smsCount } /成功：${smsMsgSuccess } /发送中：${smsMsgSending } /失败：${smsMsgFiled })" style="padding:10px;">
            <table id="view-Sms-sendState-table"  style="width:100%;height:100%"></table>
        </div>
    </div>


<script>
$(function(){
	
	//selectMsg(1);
	$('#sendMsgStateTabs').tabs({
		tabWidth:$('#sendMsgStateTabs').parent().width()/2-8,
		fit:true,
		border:false,
		onSelect:function(title,index){
			if(index==0){
				selectWxMsg();
			}else{
				selectSmsMsg();
			}
		}
	});
	
});
function selectSmsMsg(){
	$('#view-Sms-sendState-table').datagrid({
		url : 'scoreManage/viewScoreSendStateData?examInsId=${input.examInsId }&classId=${input.classId }&type=2',
		idField : 'id',
		rownumbers : true,
		fitColumns : true,
		fit:true,
		columns : [ [ {
			field : 'stuName',
			title : '家长号码/学生',
			halign : 'center',
			align : 'left'
		},{
			field : 'successFlag',
			title : '发送状态',
			halign : 'center',
			align : 'left',
			formatter:function(val,row){
				if(val == '1'){
					return "<span style='color:green'>发送成功</span>";
				}
				if(val == '2'){
					return "<span style='color:blur'>发送中</span>";
				}
				if(val == '3'){
					return "<span style='color:red'>发送失败</span>";
				}
			}
		},{
			field : 'content',
			title : '发送内容',
			halign : 'center',
			align : 'left'
		} ] ]
	});
}
function selectWxMsg(){
	$('#view-Wx-sendState-table').datagrid({
		url : 'scoreManage/viewScoreSendStateData?examInsId=${input.examInsId }&classId=${input.classId }&type=1',
		idField : 'id',
		rownumbers : true,
		fitColumns : true,
		columns : [ [ {
			field : 'stuName',
			title : '家长号码/学生',
			halign : 'center',
			align : 'left'
		},{
			field : 'successFlag',
			title : '发送状态',
			halign : 'center',
			align : 'left',
			formatter:function(val,row){
				if(val == '1'){
					return "<span style='color:green'>发送成功</span>";
				}
				if(val == '2'){
					return "<span style='color:blur'>发送中</span>";
				}
				if(val == '3'){
					return "<span style='color:red'>发送失败</span>";
				}
			}
		},{
			field : 'content',
			title : '发送内容',
			halign : 'center',
			align : 'left'
		} ] ]
	});
}
</script>