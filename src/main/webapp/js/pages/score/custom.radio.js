/**
 * <b>Ajax 页面加载</b>.
 */

(function($, undefined) {

	$.fn.customAjaxRadio = $.fn.custom_ajax_radio = function( options ) {

		var self = $(this);

		if (typeof options === "object" && options) {
			
			var url = options.url;
			var valueField = options.valueField;
			var textField = options.textField;
			var checkedField = options.checkedField;
			var name = options.name ;
			var singleRow = options.singleRow;
			var loadSuccess = options.loadSuccess ;
			var labelField = options.labelField;

			if(typeof url === 'string' && url){
				
				$.ajax({
					url : url,
					async: false,
					context : self,
					success : function( data ) {
						
						if(data != null && data.length >0){
							
							var html = '<label class="textbox-label textbox-label-before" for="_easyui_textbox_input53" style="text-align: left; height: 30px; line-height: 30px;border: 1px solid #ccc;">'+labelField+'</label>';
							
							for(i=0; i< data.length; i++){
								var value = data[i][valueField];
								var text = data[i][textField];
								var checked = data[i][checkedField];
								
								
								
								html += '&nbsp;&nbsp;<input type="radio" text="'+text+'" name="'+name+'" height="32px" value="'+value+'"';
								
								if(checked){
									html += ' checked="checked"';
								}
								
								html += '>'+text+'</input>&nbsp;&nbsp;';
								
								if(singleRow != null && singleRow != undefined){
									
									console.log('2222');
									
									if(i != 0 && (i + 1)%singleRow ==0){
										html += '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
									}
								}
								
								
							}
							
							self.empty();
							self.html( html );
							
							//self.attr('options', options);
							
							if(typeof loadSuccess === 'function' && loadSuccess){
								loadSuccess( data );
							}
							
						}
						
					}
				});
				
			}
			
		}
		else{
			console.log('options args is null!');
		}

	}

})(window.jQuery);