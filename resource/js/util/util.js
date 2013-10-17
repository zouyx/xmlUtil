jQuery.support.cors = true;
// 用于生成result的id
var reusltCount = 0;

//判断是什么浏览器类型
var mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
var webkit = /webkit/.test(navigator.userAgent.toLowerCase());
var opera = /opera/.test(navigator.userAgent.toLowerCase());
var msie = /msie/.test(navigator.userAgent.toLowerCase());

$(document).ready(function() {
	if(!isIE()){
		$('#inputFilePath').toggle();
		$('#showBtn').toggle();
		$('#fileTable').toggle();
		$('#splitResult').toggle();
		$('#inputFile').toggle();
	}
});

function show() {
	readFiles(getPath());
}

// 获取文件地址
function getPath() {
	return $('#inputFilePath').val();
}

// 获取URL
function getURL() {
	return $('#inputUrl').val();
}

// 读取文件夹对象
function readFiles(path) {
	// 初始化fso对象;
	var fso = new ActiveXObject("Scripting.FileSystemObject");

	clearAllRows();

	var fldr = fso.GetFolder(path);
	var fc = new Enumerator(fldr.files);
	for (; !fc.atEnd(); fc.moveNext()) // 添加所有文件
	{
		// 取文件对象
		file = fc.item();
		var html = getTableRowHtml(file);
	}
}

// 把row增加到table中
function getTableRowHtml(file) {
	var checkBox = $('<input type="checkbox" checked/>');
	var fileAttrs = new Array(checkBox, file.type, file.name, '准备就绪');
	var tr = $('<tr></tr>');
	for ( var i = 0; i < fileAttrs.length; i++) {
		var td = $('<td></td>');
		if (fileAttrs[i] instanceof jQuery) {
			td.append(fileAttrs[i]);
		} else {
			td.text(fileAttrs[i]);
		}
		tr.append(td);
	}
	$('#fileTable tbody').append(tr);
}

// 清除table中的所有行
function clearAllRows() {
	$("#fileTable tbody tr").remove();
}

function clearAllStatus() {
	$('#fileTable tbody tr').each(function() {
		$(this).removeClass();
		$(this).children().last().html('准备就绪');
	});
}

// 读取xml
function readXML() {
	// 发送xml的时候需要重新初始化的值-begin
	// 重新初始化id需要的参数
	reusltCount = 0;
	// 清空结果
	$('#result').html('');
	// 清空状态
	this.clearAllStatus();
	// 发送xml的时候需要重新初始化的值-end

	var filePathPrefix = getPath();
	if(isIE()){
		$('#fileTable tbody tr td  input:checked').each(function() {
			var fileName = $(this).parent().next().next().html();
			var filePath = filePathPrefix + fileName;
	
			var fileData = readFile(filePath);
	
			var msg = $(this).parent().parent();
			
			// 发送xml
			sendXML(fileData,fileName,msg);
		});
	}else{
		// 检测浏览器是否支持FileReader对象
		   if(typeof FileReader=='undefined'){
		     alert("检测到您的浏览器不支持FileReader对象!");
		   }
		   var inputFile=document.getElementById("inputFile");
		   var tmpFile= inputFile.files[0];
		   var fileName=inputFile.value;
		   
		   var reader=new FileReader();
		   reader.readAsText(tmpFile);
		   reader.onload=function(e){
		      sendXML(this.result,fileName);
		   }
	}
}

function sendXML(fileData,fileName,msg){
	$.ajax({
		url : getURL(),
		type : 'post',
		dataType : 'html',
		data : fileData,
		success : function(data, textStatus, xhr) {
			if(isIE()){
				sucMsg(msg);
			}
			writeResult(fileName, data);
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			if(isIE()){
				errMsg(msg);
			}
			var errorMsg='textStatus:'+textStatus+'\nerrorThrown:'+errorThrown;
			writeResult(fileName, errorMsg);
		},
		beforeSend : function(jqXHR, settings) {
			if(isIE()){
				loadMsg(msg);
			}
		}
	});
}

// 写成功信息
function sucMsg(element) {
	writeMsg(element, 'success', '交互成功');
}

// 写失败信息
function errMsg(element) {
	writeMsg(element, 'error', '交互失败');
}

// 写失败信息
function loadMsg(element) {
	writeMsg(element, 'info', '交互中');
}

// 写信息信息
function writeMsg(element, msg, showMsg) {
	if (element != null) {
		// 删除样式
		element.removeClass();
		// 增加样式
		element.addClass(msg);
		// 找出过滤信息
		element.children().last().html(showMsg);
	}
}

// 读取文件
function readFile(filePath) {
	var fso, ts, s;
	var ForReading = 1;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	// 打开文件
	var f = fso.GetFile(filePath);
	// 将文件转成数据流打开
	var ts = f.OpenAsTextStream(1, -2);
	var txt = ts.ReadAll(); // 读全文
	// 关闭数据流
	ts.Close();

	return txt;
}

// 写结果
function writeResult(title, msg) {
	var resultId = "collapse" + reusltCount;

	reusltCount++;

	// 组织结果头
	var group = $('<div class="accordion-group"></div>');
	var heading = $('<div class="accordion-heading"></div>');
	var reusltHeading = $('<a class="accordion-toggle" data-toggle="collapse" data-parent="#result" href="#'
			+ resultId + '"></a>');
	reusltHeading.html(title);
	heading.append(reusltHeading);
	group.append(heading);

	// 组织结果
	var body = $('<div id="' + resultId
			+ '" class="accordion-body collapse in"></div>');
	var resultBody = $('<div class="accordion-inner"></div>');
	var xmp = $('<xmp></xmp');
	xmp.text(msg);
	resultBody.append(xmp);
	body.append(resultBody);
	group.append(body);

	// 结果append到控件
	$('#result').append(group);
}

/**
 * 判断是否IE
 */
function isIE() {
	if (msie) {
		return true;
	}else{
		return false;
	}
}
