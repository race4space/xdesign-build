<?php
//////////////////////
//Instance Creation - this seems to need to be a the top of the page
$obj_shared=new cls_shared();
register_shutdown_function('fn_shutdown');
//Instance Creation - this seems to need to be a the top of the page
//////////////////////

class cls_shared{
    function __construct() {
      $this->fn_setPost();
    }
  
    function fn_setPost(){
      $str_json= file_get_contents("php://input");    
      $obj_post = json_decode($str_json);        
      if(!$this->fn_isObject($obj_post)){$obj_post=new ServerPost();}                
      $this->obj_post=$obj_post;
      
   
    }
    function fn_isObject($obj){      
      if(gettype($obj)==="object"){return true;}
      return false;
    } 
  }//END Class
  
  class ServerPost{
    function __construct() {      
      
      $this->Action="ERROR_NEW_SERVERPOST";        
      $this->RecordId="0";        
      $this->ObjectData="{}";     
      $this->RowData="[{}]";     
      $this->Echo="";
      $this->HasError=false;      
    }
  }
  function fn_shutdown(){
    global $obj_shared;  
    echo json_encode($obj_shared->obj_post);  
  }
  
  
  
  
?>