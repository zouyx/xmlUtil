function show(){
	readFiles($('#inputFilePath').val());
}

function readFiles(path)  
{
    //初始化fso对象;  
    fso = new ActiveXObject("Scripting.FileSystemObject");  
    //根据路径获取文件夹;  
    fldr = fso.GetFolder(path);  
    //获取目录下的所有文件;  
    fc = new Enumerator(fldr.files);  
    //遍历所有文件  
    for(;!fc.atEnd();fc.moveNext())     
    {
        //取文件对象  
        s=fc.item();       
        //输出文件的类型和名称;  
        alert("type:"+s.type + ", name:"+s.name );  
    }  
}  