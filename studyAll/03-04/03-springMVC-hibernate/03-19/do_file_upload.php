<?php
$error = ""; //�ϴ��ļ�������Ϣ
$msg = "";
$fileElementName = 'picture';
    $allowType = array(".jpg",".gif",".png"); //�����ϴ����ļ�����
    $num      = strrpos($_FILES['picture']['name'] ,'.');  
$fileSuffixName    = substr($_FILES['picture']['name'],$num,8);//�����ɱ�  
$fileSuffixName    = strtolower($fileSuffixName); //ȷ���ϴ��ļ�������
    
$upFilePath             = 'd:/'; //���մ��·��

if(!empty($_FILES[$fileElementName]['error'])){
	switch($_FILES[$fileElementName]['error']){
    case '1':
     $error = '�����ļ������� php.ini �� upload_max_filesize ѡ�����Ƶ�ֵ';
     break;
    case '2':
     $error = '�ϴ��ļ��Ĵ�С������ HTML ���� MAX_FILE_SIZE ѡ��ָ����ֵ';
     break;
    case '3':
     $error = '�ļ�ֻ�в��ֱ��ϴ�';
     break;
    case '4':
     $error = 'û���ļ����ϴ�';
     break;
    case '6':
     $error = '�Ҳ�����ʱ�ļ���';
     break;
    case '7':
     $error = '�ļ�д��ʧ��';
     break;
    default:
     $error = 'δ֪����';
   }
}elseif(empty($_FILES['fileToUpload']['tmp_name']) || $_FILES['fileToUpload']['tmp_name'] == 'none'){
   $error = 'û���ϴ��ļ�.';
}else if(!in_array($fileSuffixName,$allowType)){
   $error = '�������ϴ����ļ�����'; 
}else{
  $ok=@move_uploaded_file($_FILES['fileToUpload']['tmp_name'],$upFilePath);
   if($ok === FALSE){
    $error = '�ϴ�ʧ��';
   }
}
?>