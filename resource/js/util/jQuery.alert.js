(function($) {
	/**
	 * alert框的class/id-begin
	 */
	//错误
	var _ALERT_ERROR_ID='alert-error';
	//成功
	var _ALERT_SUCCESS_ID='alert-success';
	//信息
	var _ALERT_INFO_ID='alert-info';
	//警告
	var _ALERT_BLOCK_ID='alert-block';
	/**
	 * alert框的class/id-end
	 */
	
	$.fn.error = function(text) {
		this.addAlert({content:text,alertId:_ALERT_ERROR_ID,info:'错误'});
	};
	
	$.fn.success = function(text) {
		this.addAlert({content:text,alertId:_ALERT_SUCCESS_ID,info:'成功'});
	};
	
	$.fn.info = function(text) {
		this.addAlert({content:text});
	};
	
	$.fn.block = function(text) {
		this.addAlert({content:text,alertId:_ALERT_BLOCK_ID,info:'警告'});
	};
	
	
	//计算器的id
	var timeoutId;

	/**
	 * 弹出alert框
	 * @param content 显示内容
	 * @param alertId 
	 * alert框的id,如果没有默认就是和class一样
	 * 错误:alert-error
	 * 成功:alert-success
	 * 信息:alert-info
	 * 警告:alert-block
	 */
	$.fn.addAlert = function (options) {
		var defaults={
			alertId:_ALERT_INFO_ID,
			info:'信息',
			content:''
		};
		var options = $.extend(defaults, options);
		
		var existAlert = $('#' + options.alertId);
		if (existAlert.length == 0) {
			
			var alertDiv = $('<div id="' + options.alertId + '"/>');
			alertDiv.addClass('alert')
			.addClass(options.alertId)
			.addClass('fade')
			.addClass('in');

			var alertClose = $('<button>&times;</button>');
			alertClose.addClass('close')
			.attr('data-dismiss', 'alert')
			.attr('type', 'button');
			
			var alertTitle = $('<p><h4>'+options.info+':</h4></p>');
			var alertText = $('<p/>');
			alertText.append(options.content);
			//拼接alert
			alertDiv.append(alertClose);
			alertDiv.append(alertTitle);
			alertDiv.append(alertText);
			
			this.append(alertDiv);
			
			timeoutId=window.setInterval('clearAlert('+options.alertId+')',2000);
		}else{
			window.clearInterval(timeoutId);
			timeoutId=window.setInterval('clearAlert('+options.alertId+')',2000);
		}
	};

})(jQuery); 

/**
 * 清除alert框
 * @param alertId
 */
function clearAlert(alertId){
	var existAlert = $('#' + alertId);
	if (existAlert.length> 0) {
		existAlert.alert('close');
	}
};