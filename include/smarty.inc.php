<?php
$smarty_dir = dirname(__FILE__) . '/smarty';
require_once($smarty_dir . '/libs/Smarty.class.php');

$smarty = new Smarty();
$smarty->template_dir =  realpath(dirname(__FILE__). '/../templates/');
$smarty->compile_dir = $smarty_dir . '/compile/';
$smarty->cache_dir = $smarty_dir . '/cache/';

?>