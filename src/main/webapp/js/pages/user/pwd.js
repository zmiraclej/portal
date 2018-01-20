$('#changePwd').on("click",function(){
	var pwd = $('#newPwd').val();
	var pwdConfirm = $('#newPwdConfirm').val();
	var param = {'pwd':pwd};
	if(pwd == ''){
		layer.msg('密码不能为空', {
	        time: 1000, //2s后自动关闭
	        area: ['220px', '50px']
	      });
	} else if(pwd != pwdConfirm){
		layer.msg('密码不一致', {
	        time: 1000, //2s后自动关闭
	        area: ['220px', '50px']
	      });
	} else {
		var index = layer.msg('是否保存新密码？', {
	        time: 5000, //2s后自动关闭
	        area: ['220px', '100px'],
	        btn: ['确  认', '取  消'],
	        yes: function(){
	        	 layer.closeAll();
	        	 $.ajax({
	                 url: "changePwd",
	                 type: "POST",
	                 contentType: "application/json", 
	                 dataType:"json",
	                 data:JSON.stringify(param),
	                 success: function(result) {
	                	 console.log();
	                	 if('02'==result.code){
	                		 layer.msg(result.msg, {
	                		        time: 1000, //2s后自动关闭
	                		        area: ['350px', '80px']
	                		      });
	                	 } else {
	                		 layer.msg(result.msg, {
	                		        time: 1000, //2s后自动关闭
	                		        area: ['350px', '50px']
	                		      });
	                	 }
//	                     layer.closeAll();
	                 }
	             });

	          }
	          ,btn2: function(){
	            layer.closeAll();
	          }
	      });
	}
});