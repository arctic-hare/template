<?php
require (dirname(__FILE__).'/smarty.inc.php');

if (isset($_SERVER['PATH_TRANSLATED']) && is_file($_SERVER['PATH_TRANSLATED']))
{
	// ���������� doc_root ��� �����
	$droot = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
	$curdir = str_replace('\\', '/', dirname(__FILE__));
	$doc_root = str_replace($droot, '', $curdir);
	$doc_root = str_replace('/include', '', $doc_root);
	$doc_root = $_SERVER['HTTP_HOST'].'/'.$doc_root;
	$doc_root = 'http://'.preg_replace('[/{2,}]', '/', $doc_root);
	$doc_root = preg_replace('[/$]', '', $doc_root);
	$smarty->assign('doc_root', $doc_root);


	// ���������� ������
	if ($fp = fopen($_SERVER['PATH_TRANSLATED'], 'r'))
	{
		$smarty->display($_SERVER['PATH_TRANSLATED']);
	}
}
else
{
	echo "�������� �� �������";
}
?>
