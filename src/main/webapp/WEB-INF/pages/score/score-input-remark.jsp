<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<input type="hidden" id="remarkInsId" value="${examInsId }"/>
	<input type="hidden" id="remarkClassId" value="${classId }"/>
	<div class="easyui-panel" style="width:100%;padding:10px">
		<div style="margin-bottom:20px">
           	<input type="radio" name="scoreRemarkState" value="1" checked="checked"> 通用
           	&nbsp; &nbsp;<input type="radio" name="scoreRemarkState" value="2"> 特殊 
           	&nbsp; &nbsp;
           	<input class="easyui-textbox" id="scoreRemarkType"
           	 name="scoreRemarkType" style="width:150px;">
           	&nbsp; &nbsp;
           	<input class="easyui-textbox" id="scoreRemarkLevel"
           	 name="scoreRemarkLevel" style="width:150px;">
		</div>
	</div>
	
    <table id="score-input-remark-dg" class="easyui-datagrid" style="width:100%;height:300px;"
            data-options="
                iconCls: 'icon-edit',
                singleSelect: true,
            ">
        <thead>
            <tr>
            	<th data-options="field:'code',width:150,hidden:'true'">code</th>
                <th data-options="field:'name',width:'100%'">评语</th>
            </tr>
        </thead>
    </table>
    <div class="easyui-panel" style="width:100%;height: 50px;">
		<input style="width:100%;height: 100%;text-align: center;vertical-align: middle;" align="center" id="viewScoreRemark"></input>
	</div>
    
    <script type="text/javascript">
       $(function(){
    	   
    	   $('#score-input-remark-dg').datagrid({
    		   onClickCell: function(index,field,value){
    				//console.log(value);
    				$('#viewScoreRemark').empty();
    				$('#viewScoreRemark').val(value);
    			}
    		});
    	   
		   var stateCode = $("input[name='scoreRemarkState']:checked").val();
    	   initRemarkType( stateCode );
    	   
    	   $('input[name=scoreRemarkState]').change(function(){
    		   var stateCode = $("input[name='scoreRemarkState']:checked").val();
    		  // console.log('stateCode = '+stateCode);
        	   initRemarkType( stateCode );
    	   });
    	   
       });
       
       function initRemarkType( stateCode ){
    	   
    	   $('#scoreRemarkType').combobox({
    			url : 'scoreManage/findScoreRemarkTypeByState?stateCode='+stateCode,
    			method : 'get',
    			valueField : 'code',
    			textField : 'name',
    			panelHeight : 'auto',
    			editable:false,
    			onSelect: function( data ){
    				var typeCode = data.code;
    				//console.log('typeCode '+typeCode);
    				initRemarkLeve( typeCode );
    			}
    		});
    	   
       }
       
       function initRemarkLeve( typeCode ){
    	   
    	   $('#scoreRemarkLevel').combobox({
   			url : 'scoreManage/findScoreRemarkLevelByType?typeCode='+typeCode,
   			method : 'get',
   			valueField : 'code',
   			textField : 'name',
   			panelHeight : 'auto',
   			editable:false,
   			onSelect: function( data ){
   				var levelCode = data.code;
   				//console.log('levelCode '+levelCode);
   				initScoreInputRemarkDg( levelCode );
   			}
   		});
       }
       
       
       
       function initScoreInputRemarkDg( levelCode ){
    	   
    	   $.ajax({
				url : 'scoreManage/findScoreRemarkCommentByLevel?levelCode='+levelCode,
				async: false,
				context : self,
				success : function( result ) {
					//console.log(result);
        			//result = JSON.parse(result);
        			//console.log(result.code);
        			if(result.code == "02"){
        				
        				if(result.data){
        					$('#score-input-remark-dg').datagrid('loadData', result.data);
        				}
        				
            		}
            		else{
            			//console.log('no');
            		}
				}
			});
    	   
       }
    </script>

    </body>
</html>