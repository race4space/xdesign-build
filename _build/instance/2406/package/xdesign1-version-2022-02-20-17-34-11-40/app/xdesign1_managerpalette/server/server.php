<?php

require_once $_SERVER["DOCUMENT_ROOT"]."/app/recordset/server/server.php";

class palettemanager extends recordset{
  function __construct() {    
      parent::__construct();
  }
  function fn_execute() {    
      
    if(parent::fn_execute()){return;}

      $obj_post=$this->obj_post;                          
      switch($obj_post->Action){                       
          case "getListPaletteInCategory":
            $this->fn_getListPaletteInCategory();
          break;                                        
          }
      
  }
  function fn_getListPaletteInCategory(){

      $obj_post=$this->obj_post;     

      /*
      	SELECT   DISTINCT     
      `t2`.`Name` As `CategoryName` 
      FROM       
      `instance` t1       
      LEFT JOIN  `categorylink` ON  `categorylink`.`InstanceId`=`t1`.`Id`                   
      LEFT JOIN `instance` t2  ON  `categorylink`.`CategoryId`=`t2`.`Id`       
      WHERE true  AND `t2`.`name` is not null                    
      ORDER BY LOWER(`CategoryName`)
      ;                  
      //*/
      $str_sql="SELECT DISTINCT `t2`.`Name` As `CategoryName` FROM `instance` t1 LEFT JOIN  `categorylink` ON  `categorylink`.`InstanceId`=`t1`.`Id` LEFT JOIN `instance` t2  ON  `categorylink`.`CategoryId`=`t2`.`Id` WHERE true  AND `t2`.`name` is not null ORDER BY LOWER(`CategoryName`)";                  
      $this->fn_addEcho("str_sql: " .$str_sql);
      //*/
      
      $stmt = $this->pdo_user->prepare($str_sql);                                

      $stmt->execute();      
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
$obj_page=new palettemanager();
try {
  $obj_page->fn_execute();
} catch (Error $e) { // Error is the base class for all internal PHP error exceptions.  
  $str_message="SCRIPT ERROR: ".$e->getMessage();
  $obj_page->fn_setError($str_message);
}
//Instance Creation goes at bottom the page
//////////////////////




  


?>
