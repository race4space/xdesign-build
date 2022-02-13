<?php

require_once $_SERVER["DOCUMENT_ROOT"]."/app/recordset/server/server.php";

class projectmanager extends recordset{
  function __construct() {    
      parent::__construct();
  }
  function fn_execute() {    
    
    if(parent::fn_execute()){return;}

      $obj_post=$this->obj_post;                          
      $this->fn_addEcho("xxxobj_post->Action: " .$obj_post->Action);    
      switch($obj_post->Action){                       
          case "getListPaletteInCategory":    
            $this->fn_getListPaletteInCategory();    
          break;                                                  
          }   
  }
     
  function fn_getListPaletteInCategory(){

    $obj_post=$this->obj_post;     

    //$this->fn_addEcho("obj_post->QueryString: " .$obj_post->QueryString);

    $CategoryName="";
    
    if(!empty($obj_post->QueryString)){
      parse_str($obj_post->QueryString, $output);
      $CategoryName=$output["CategoryName"];      
      $this->fn_addEcho("CategoryName: " .$CategoryName);
      if($CategoryName==="All"){
        $CategoryName="";
      }
    }

    $this->fn_addEcho("CategoryName: " .$CategoryName);
    
      $str_sql="SELECT ";      
    $str_sql.="`t1`.`id` AS `InstanceId`, ";
    $str_sql.="`t1`.`Name` AS `InstanceName`, ";
    $str_sql.="`t1`.`Type`AS `InstanceType`, ";
    $str_sql.="`t1`.`PalettePin` AS `PalettePin`, ";
    $str_sql.="`t1`.`LastVersionDate`AS `LastVersionDate`, ";      
    $str_sql.="`categorylink`.`InstanceId` As `CategoryLinkInstanceId`, ";
    $str_sql.="`categorylink`.`CategoryId` As `CategoryLinkCategoryId`, ";
    $str_sql.="`t2`.`id` As `CategoryId`, ";
    $str_sql.="`t2`.`Name` As `CategoryName` ";
    $str_sql.="FROM ";      
    $str_sql.="`instance` t1 ";      
    $str_sql.="LEFT JOIN  `categorylink` ON  `categorylink`.`InstanceId`=`t1`.`Id` ";                  
    $str_sql.="LEFT JOIN `instance` t2  ON  `categorylink`.`CategoryId`=`t2`.`Id` ";      
    $str_sql.="WHERE true AND `t1`.`PalettePin`";           
    if(!empty($CategoryName)){         
      $str_sql.="AND `t2`.`Name`=? ";
    }     
    $str_sql.="ORDER BY LOWER(`CategoryName`), LOWER(`InstanceName`) ";                  
    $str_sql.=";";                  
    $this->fn_addEcho("str_sql: " .$str_sql);    
    
    $stmt = $this->pdo_user->prepare($str_sql);
    if(!empty($CategoryName)){         
      $stmt->execute([$CategoryName]);      
    }
    else{
      $stmt->execute();      
    }
    
    $row=$stmt->fetchAll();
    if($row){       
      $obj_post->RowData=json_encode($row);
      //$this->fn_addEcho("ROW HAS DATA");
    }
    else{
      $obj_post->RowData="[{}]";
      //$this->fn_addEcho("ROW HAS ZERO DATA");
    }      
  }    
}//END OF CLASS

//////////////////////
//Instance Creation goes at bottom the page
$obj_page=new projectmanager();
try {
  $obj_page->fn_execute();
} catch (Error $e) { // Error is the base class for all internal PHP error exceptions.  
  $str_message="SCRIPT ERROR: ".$e->getMessage();
  $obj_page->fn_setError($str_message);
}
//Instance Creation goes at bottom the page
//////////////////////




  


?>
