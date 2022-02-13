<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/app/shared/server/header.php";

require_once(APPROOT."/loginpanel/server/server.php");

$obj_desk=new Desk();
try {
  $obj_desk->fn_execute();
} catch (Error $e) { // Error is the base class for all internal PHP error exceptions.  
  $str_message="SCRIPT ERROR: ".$e->getMessage();
  $obj_desk->fn_setError($str_message);
}



class Desk{  
  function __construct() {    
    
      
      $this->bln_debug=false;                  
      $this->bln_debugAuthorize=true;            

      $this->bln_clearError=false;
      $this->fn_setPost();          
      $this->fn_intializeServerPost();                
    }    
    function fn_formatPost($row){
      $obj_post=$this->obj_post;
      if($row){
        $obj_post->RecordId=$row["id"];
        $obj_post->RecordName=$row["Name"];        
        $obj_post->RecordType=$row["Type"];        
        $obj_post->ObjectData=$row["Serialize"];
        $this->fn_setLocationMatchInstance();       
      }
    }

    function fn_setPost(){

      global $obj_shared;
      $this->obj_post=$obj_shared->obj_post;    

      global $obj_loginpanel;      
      $this->obj_loginpanel=$obj_loginpanel;
      
    }      

    function fn_intializeServerPost(){
      $obj_post=$this->obj_post;            
    }
    function fn_setError($str_message){
      $this->obj_post->HasError=true;      
      $this->obj_post->ErrorMessage=$str_message;            
    }      
    function fn_hasError(){
      return $this->obj_post->HasError;      
    }     
    function fn_isObject($obj){
      
      if(gettype($obj)==="object"){return true;}
      return false;
    } 

    function fn_addEcho($str_val){
      
      $obj_post=$this->obj_post;      
      if(!isset($obj_post->Echo)) {              
        $obj_post->Echo="";
      }
      $obj_post->Echo.=$str_val.PHP_EOL.PHP_EOL;
    }

    

    function fn_setConnectionUser(){

      $this->AuthorizeStandardSchema="xdesign";                  
      $this->pdo_user=$this->obj_loginpanel->fn_setConnectionUser($this->AuthorizeStandardSchema);      
    }

    function fn_getAuthorizeUserStatus(){      
      
      $this->obj_post->AuthorizeUserStatus=$this->obj_loginpanel->AuthorizeUserStatus;                  
      return $this->obj_loginpanel->AuthorizeUserStatus;
    }
    
    function fn_execute() {        
      
      //*
      if(!$this->fn_getAuthorizeUserStatus()){                             
        return;
      }
      $this->fn_setConnectionUser();                 
      //*/

      

      
      
      
      $obj_post=$this->obj_post;                  
      if(empty($obj_post->Action)){
        $obj_post->Action="";      }      
      
      

      switch($obj_post->Action){                               
        case "GetListProgram":
          $this->fn_GetListProgram();          
        break;        
        default:          
          $obj_post->HasError=true;
          $obj_post->ErrorMessage="xdesign1 ACTION Not Handled: [".$obj_post->Action."]";       
      }

    }
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////  
    

    function fn_GetListProgram(){

      $obj_post=$this->obj_post;      
      $str_sql="SELECT * FROM  `control`.`desktop` ORDER BY `control`.`desktop`.`Subdomain` ASC;";                  
      $this->fn_addEcho($str_sql);
      $stmt = $this->obj_loginpanel->pdo_standard->prepare($str_sql);
      $stmt->execute();

      $row=$stmt->fetchAll();
      if($row){       
        $obj_post->RowData=json_encode($row);
      }
      else{
        $obj_post->RowData="[{}]";
      }      
    }
    
 
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////


}//END CLASS xdesign1
?>
