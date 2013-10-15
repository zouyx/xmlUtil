jQuery.support.cors = true;
//用于生成result的id
var reusltCount=0;

function show() {
	readFiles(getPath());
}

// 获取文件地址
function getPath() {
	return $('#inputFilePath').val();
}

//获取URL
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

// 发送xml
function sendXML() {
	var filePathPrefix = getPath();
	
	var url = getURL();
	
	//重新初始化id需要的参数
	reusltCount=0;
	$('#fileTable tbody tr td  input:checked').each(function() {
		var fileName = $(this).parent().next().next().html();
		var filePath = filePathPrefix + fileName;

		var file = readFile(filePath);

		var msg = $(this).parent().parent();
		$.ajax({
			url : url,
			// url : 'http://cb.alimama.cn/js/replace_pid.min.js',
			type : 'post',
			dataType : 'html',
			data : file,
			success : function(data, textStatus, xhr) {
				sucMsg(msg);
				writeResult(fileName,msg);
			},
			error : function(XmlHttpRequest, textStatus, errorThrown) {
				errMsg(msg);
				writeResult(fileName,errorThrown);
			},
			beforeSend:function(jqXHR, settings) {
				loadMsg(msg);
			}
		});

	});
}

// 写成功信息
function sucMsg(element){
	writeMsg(element,'success','交互成功');
}

// 写失败信息
function errMsg(element){
	writeMsg(element,'error','交互失败');
}

//写失败信息
function loadMsg(element){
	writeMsg(element,'info','交互中');
}

//写信息信息
function writeMsg(element,msg,showMsg){
	//删除样式
	element.removeClass();
	//增加样式
	element.addClass(msg);
	//找出过滤信息
	element.children().last().html(showMsg)
}


// 读取文件
function readFile(filePath) {
	var fso, ts, s;
	var ForReading = 1;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	// 打开文件
	var f = fso.GetFile(filePath);
	//将文件转成数据流打开
    var ts   =   f.OpenAsTextStream(1,-2);      
    var txt   =   ts.ReadAll();   //读全文
    //关闭数据流
    ts.Close();  
	
	return txt;
}

//写结果
function writeResult(title,msg){
	var resultId="collapse"+reusltCount;
	
	reusltCount++;
	
	//组织结果头
	var group = $('<div class="accordion-group"></div>');
	var heading = $('<div class="accordion-heading"></div>');
	var reusltHeading=$('<a class="accordion-toggle" data-toggle="collapse" data-parent="#result" href="#'+resultId+'"></a>');
	reusltHeading.html(title);
	heading.append(reusltHeading);
	group.append(heading);
	
	//组织结果
	var body=$('<div id="'+resultId+'" class="accordion-body collapse in"></div>');
	var resultBody=$('<div class="accordion-inner"></div>');
	resultBody.html(msg);
	body.append(resultBody);
	group.append(body);
	
	//结果append到控件
	$('#result').append(group);
}
