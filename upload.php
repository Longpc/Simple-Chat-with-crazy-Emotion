<?php 
	header("Content-Type: text/html; charset=utf-8");
	mb_internal_encoding('UTF-8');
	mb_regex_encoding("UTF-8");
	$temp = $_FILES['Filedata']['tmp_name'];
	#echo serialize($_FILES['Filedata']);
	$filename1 = "./files/".uniqid().$_FILES['Filedata']['name'];
	#$filename = "./files/".uniqid().".jpg";
	$filename = iconv("utf-8", "cp932", $filename1);
	$filename = mb_ereg_replace('\s+','', $filename);
	$filename1 = mb_ereg_replace('\s+','', $filename1);
	move_uploaded_file($temp, $filename);
	echo $filename1."~~".$_FILES['Filedata']['type']."~~".$_FILES['Filedata']['size'];
?>