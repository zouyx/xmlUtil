function show(){
	readFiles($('#inputFilePath').val());
}

function readFiles(path)  
{
    //��ʼ��fso����;  
    fso = new ActiveXObject("Scripting.FileSystemObject");  
    //����·����ȡ�ļ���;  
    fldr = fso.GetFolder(path);  
    //��ȡĿ¼�µ������ļ�;  
    fc = new Enumerator(fldr.files);  
    //���������ļ�  
    for(;!fc.atEnd();fc.moveNext())     
    {
        //ȡ�ļ�����  
        s=fc.item();       
        //����ļ������ͺ�����;  
        alert("type:"+s.type + ", name:"+s.name );  
    }  
}  