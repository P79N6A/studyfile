<?php
$error = ""; //上传文件出错信息
$msg = "";
$fileElementName = 'picture';
    $allowType = array(".jpg",".gif",".png"); //允许上传的文件类型
    $num      = strrpos($_FILES['picture']['name'] ,'.');  
$fileSuffixName    = substr($_FILES['picture']['name'],$num,8);//此数可变  
$fileSuffixName    = strtolower($fileSuffixName); //确定上传文件的类型
    
$upFilePath             = 'd:/'; //最终存放路径

if(!empty($_FILES[$fileElementName]['error'])){
	switch($_FILES[$fileElementName]['error']){
    case '1':
     $error = '传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值';
     break;
    case '2':
     $error = '上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值';
     break;
    case '3':
     $error = '文件只有部分被上传';
     break;
    case '4':
     $error = '没有文件被上传';
     break;
    case '6':
     $error = '找不到临时文件夹';
     break;
    case '7':
     $error = '文件写入失败';
     break;
    default:
     $error = '未知错误';
   }
}elseif(empty($_FILES['fileToUpload']['tmp_name']) || $_FILES['fileToUpload']['tmp_name'] == 'none'){
   $error = '没有上传文件.';
}else if(!in_array($fileSuffixName,$allowType)){
   $error = '不允许上传的文件类型'; 
}else{
  $ok=@move_uploaded_file($_FILES['fileToUpload']['tmp_name'],$upFilePath);
   if($ok === FALSE){
    $error = '上传失败';
   }
}
?>