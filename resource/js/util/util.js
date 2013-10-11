function show() {
	readFiles(getPath());
}

//获取文件地址
function getPath(){
	return $('#inputFilePath').val();
}

//读取文件夹对象
function readFiles(path) {
	//初始化fso对象; 
	fso = new ActiveXObject("Scripting.FileSystemObject");

	clearAllRows();

	fldr = fso.GetFolder(path);
	fc = new Enumerator(fldr.files);
	for (; !fc.atEnd(); fc.moveNext()) //添加所有文件   
	{
		//取文件对象  
		file = fc.item();
		//        alert("type:"+s.type + ", name:"+s.name);
		var html = getTableRowHtml(file);
	}
}

//把row增加到table中
function getTableRowHtml(file) {
	var checkBox = $('<input type="checkbox" />');
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
	$('#fileTable').append(tr);
}

//清除table中的所有行
function clearAllRows() {
	$("#fileTable :not(.title)").remove();
}

//发送xml
function sendXML() {
	$('#fileTable tr td  input:checked').each(function() {
		var filePathPrefix;
		var fileName=$(this).parent().next().next().html();
		filePathPrefix=getPath();
		var filePath=filePathPrefix+fileName;
		
		var file=readFile(filePath);
				$.ajax({
					type : "get",
					url : "http://www.cnblogs.com/rss",
					beforeSend : function(XMLHttpRequest) {
						// ShowLoading();
					},
					success : function(data, textStatus) {
//						$(".ajax.ajaxResult").html("");
//						$("item", data).each(
//								function(i, domEle) {
//									$(".ajax.ajaxResult").append(
//											"<li>"
//													+ $(domEle).children(
//															"title").text()
//													+ "</li>");
//								});
						alert('alert');
					},
					complete : function(XMLHttpRequest, textStatus) {
						//HideLoading();
					},
					error : function() {
						//请求出错处理
					}
				});
	});
}

//读取文件
function readFile(filePath){
	var fso, ts, s;
	var ForReading = 1;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	// 打开文件
	ts = fso.OpenTextFile(filePath, ForReading);
	// 读取文件一行内容到字符串
	s = ts.ReadLine();
	// 显示字符串信息
//	alert("File contents = ‘" + s + "‘");
	// 关闭文件
	ts.Close();
	
	return s;
}