<?php
session_name("AuthorizeSessionKey");
session_start();

if( ob_get_level() > 0 ) {ob_end_flush();}ob_implicit_flush(true);//TURN OFF BUFFERING

define('SCRIPT_PATH', realpath(dirname(__FILE__)));
define("ROOT",$_SERVER["DOCUMENT_ROOT"]);
define("APPROOT",ROOT."/app");


require_once APPROOT . "/shared/server/server-key.php";
require_once APPROOT . "/shared/server/server-shared.php";//must be above any other files that use shared object
require_once APPROOT . "/shared/server/server-manager.php";




//*/



?>