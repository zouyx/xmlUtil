function show() {
	readFiles($('#inputFilePath').val());
}

//读取文件夹对象
function readFiles(path) {
	//初始化fso对象; 
	fso = new ActiveXObject("Scripting.FileSystemObject");
	
	this.clearAllRows();
	
	fldr = fso.GetFolder(path);
	fc = new Enumerator(fldr.files);
	for (; !fc.atEnd(); fc.moveNext()) //添加所有文件   
	{
		//取文件对象  
		file = fc.item();
		//        alert("type:"+s.type + ", name:"+s.name);
		var html = this.getTableRowHtml(file);
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
function clearAllRows(){
	$("#fileTable :not(.title) ").remove();
}


function sendXML(){
	
}