<?php

require_once(APPROOT."/loginpanel/server/server.php");


class servermanager{  
    function __construct() {    
      
      
        $this->date_script=$this->fn_getSQLDate();                        
        $this->bln_debug=false;                  
        $this->bln_debugAuthorize=true;            
  
        $this->bln_clearError=false;
        $this->fn_setPost();          
        $this->fn_intializeServerPost();                
      }    
      function fn_formatPost($row){
        $obj_post=$this->obj_post;
        if($row){        
        }
      }
  
      function fn_setPost(){
  
        global $obj_shared;
        $this->obj_post=$obj_shared->obj_post;    
  
        
      }      
  
      function fn_intializeServerPost(){
        $obj_post=$this->obj_post;            
        if(empty($obj_post->DesignId)){$obj_post->DesignId="DesignIdNotSet";}                                                     
        $obj_post->ObjectData="{}";
        $obj_post->RowData="[]";
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
        
        global $obj_loginpanel;      
        $this->obj_loginpanel=$obj_loginpanel;
        
        $this->obj_post->AuthorizeUserStatus=$this->obj_loginpanel->AuthorizeUserStatus;                  
        return $this->obj_loginpanel->AuthorizeUserStatus;
      }
      
      function fn_execute() {              
        
        
        if(!$this->fn_getAuthorizeUserStatus()){                             
          return false;
        }
        $this->fn_setConnectionUser();                 
        
        
        
        $obj_post=$this->obj_post;                  
        
        
        if(empty($obj_post->HasError)){
          $obj_post->HasError=false;
        }
        if(empty($obj_post->ErrorMessage)){
          $obj_post->ErrorMessage="";
        }              

        if(empty($obj_post->QueryString)){
          $obj_post->QueryString="";
        }              

        
        
        $this->fn_set();         

        //template switch action
        switch($obj_post->Action){                       
          case "xxxx":
            $this->fn_xxxx();
          break;                                        
        }
        //template switch action
        
      }
      /////////////////////////////
      /////////////////////////////
      /////////////////////////////
      /////////////////////////////
      /////////////////////////////
      /////////////////////////////  
      
      function fn_set(){                     
        
  
        $this->bln_localHost=false;
        if (isset($_SERVER["REMOTE_ADDR"])) {if($_SERVER["REMOTE_ADDR"]==="127.0.0.1"){$this->bln_localHost=true;}}            
        $this->str_UniqueName=$this->fn_getUniqueName();                              
        
        $this->fn_setPath();        
        
      }      
      function fn_setPath(){       
        
        //////////////////////////
        //GENERIC PATH
        //////////////////////////
        $this->str_path_document_root=$_SERVER['DOCUMENT_ROOT'];               
      } 
   
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  /////////////////////////////////
  function fn_getSQLDate(){
    return date("Y-m-d H:i:s");
  }
  function fn_getUniqueName(){
    return date("Y-m-d-H-i-s-").rand(0,100);
  }
  
  function fn_dataConnect($obj_connect) {  
  
    $charset="utf8";
    $str_name="myPDO";
    if(!$this->fn_isObject($obj_connect)){$obj_connect=new stdClass();}  
    if(empty($obj_connect->Host)){
      $obj_connect->Host="localhost";
    }  
    $obj_connect->HasError=true;  
    $obj_connect->str_message="Error On Login";  
    
    $dsn = "mysql:host=$obj_connect->Host;charset=$charset;dbname=$obj_connect->Schema";
    
    $options = [
      PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES=>false,
      PDO::ATTR_PERSISTENT=>true
    ];
  
    $pdo=false;
    try {      
        $pdo = new PDO($dsn, $obj_connect->User, $obj_connect->Pass, $options);      
        $obj_connect->HasError=false;  
        $obj_connect->str_message="";      
     } catch (PDOException $e) {                   
      $obj_connect->str_message="CONNECT ERROR".$e->getMessage();    
    }  
    return $pdo;
  }
  function fn_setGroupConcatLimit($int_limit=1000000){      
        
    $str_sql="SET SESSION group_concat_max_len = $int_limit;";
    $stmt = $this->pdo_user->prepare($str_sql);      
    $stmt->execute();
  }     
  
  }//END CLASS xdesign1
  
?>
