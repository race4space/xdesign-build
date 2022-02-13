<?php

require_once $_SERVER["DOCUMENT_ROOT"]."/app/shared/server/header.php";

require_once(APPROOT."/loginpanel/server/server.php");

class recordset extends servermanager{
    function __construct() {    
        parent::__construct();
    }
}

?>
