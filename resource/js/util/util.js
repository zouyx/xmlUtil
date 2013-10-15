jQuery.support.cors = true;

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
			},
			error : function(XmlHttpRequest, textStatus, errorThrown) {
				errMsg(msg);
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

//写信息信息
function writeMsg(element,msg,showMsg){
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

function writeHtml(){
	<div class="accordion-group">
	<div class="accordion-heading">
		<a class="accordion-toggle" data-toggle="collapse"
			data-parent="#accordion2" href="#collapseOne"> Collapsible
			Group Item #1 </a>
	</div>
	<div id="collapseOne" class="accordion-body collapse in">
		<div class="accordion-inner">Anim pariatur cliche...</div>
	</div>
</div>
}
}