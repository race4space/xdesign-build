<?php
session_name("AuthorizeSessionKey");
session_start();
//namespace phpxdesign;
if( ob_get_level() > 0 ) {ob_end_flush();}ob_implicit_flush(true);//TURN OFF BUFFERING
define('SCRIPT_PATH', realpath(dirname(__FILE__)));
//require "server-key.php";
require "server-key.php";

//use stdClass;
function fn_shutdown(){
  global $obj_xdesign;
  //$obj_xdesign->fn_addEcho("EXIT FUNCTION");
  $obj_xdesign->fn_echoPost();      
}
register_shutdown_function('fn_shutdown');

$obj_xdesign=new XDesign();
//$obj_xdesign->fn_execute();
try {
  $obj_xdesign->fn_execute();
} catch (Error $e) { // Error is the base class for all internal PHP error exceptions.  
  $str_message="SCRIPT ERROR: ".$e->getMessage();
  $obj_xdesign->fn_setError($str_message);
  
  //var_dump($ex);
  //fn_shutdown();
}


class ServerPost{
  function __construct() {    
    $this->RecordId="0";
    $this->RecordName="NoName";        
    $this->RecordType="NoType";            
    //$this->ObjectData=new stdClass();     
    $this->ObjectData="{}";     
    $this->RowData="[{}]";     
    $this->Echo="";
    $this->HasError=false;
  }
}

class XDesign{
  function __construct() {
    
      $this->bln_debug=false;
      $this->bln_debugPath=false;
      $this->bln_debugPathProjectInstance=false;
      
      $this->bln_debugAuthorize=true;      
      $this->int_idRecordXDesign=2406;//saftey to prevent deletion, esp whilst confirmaiton is not first confirmed by "really delete".
      $this->str_nameRecordXDesign="xdesign1"; //used by move for example
    }
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////   
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

    function fn_echoPost() {
      if(empty($this->obj_post)){
        $this->obj_post=new ServerPost();        
      }
      echo json_encode($this->obj_post);//write post back down to client
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
    
    function fn_execute() {

      global $AuthorizeStandardUser, $AuthorizeStandardPass, $AuthorizeStandardSchema;
      $this->AuthorizeStandardUser=$AuthorizeStandardUser;      
      $this->AuthorizeStandardPass=$AuthorizeStandardPass;      
      $this->AuthorizeStandardSchema=$AuthorizeStandardSchema;      

      
      
      $this->obj_post=new ServerPost();      
      
      $obj_connect=new stdClass();      
      $obj_connect->Schema=$AuthorizeStandardSchema;
      $obj_connect->User=$AuthorizeStandardUser;
      $obj_connect->Pass=$AuthorizeStandardPass;
      $this->pdo=$this->fn_dataConnect($obj_connect);                  
      
      if($obj_connect->HasError){           
        $this->fn_setError($obj_connect->str_message);      
        return;
      }

      
      $this->fn_setGroupConcatLimit();      
      
      
      $str_json= file_get_contents("php://input");
      $this->obj_post = json_decode($str_json);      

      if(!$this->fn_isObject($this->obj_post)){$this->obj_post=new stdClass();}

      $obj_post=$this->obj_post;     
      
      
      if(empty($obj_post->AuthorizeUserEmail)){$obj_post->AuthorizeUserEmail="";}
      if(empty($obj_post->AuthorizeUserPass)){$obj_post->AuthorizeUserPass="";}
      if(empty($obj_post->AuthorizeUserStatus)){$obj_post->AuthorizeUserStatus=false;}
      
      
      if(empty($obj_post->CreateRelease)){$obj_post->CreateRelease=false;}
      if(empty($obj_post->ReleaseName)){$obj_post->ReleaseName="notset";}      
      
      if(empty($obj_post->LocationID)){
        $obj_post->LocationID="";
      }
      if(empty($obj_post->CreatedDate)){
        $obj_post->CreatedDate="1101-01-01";
      }
      if(empty($obj_post->ModifiedDate)){
        $obj_post->ModifiedDate="1101-01-01";
      }

      if(empty($obj_post->Echo)){
        $obj_post->Echo="";
      }
      if(empty($obj_post->IsRoot)){
        $obj_post->IsRoot=false;
      }
      if(empty($obj_post->Action)){
        $obj_post->Action="";
      }
      if(empty($obj_post->Context)){
        $obj_post->Context="";
      }
      if(empty($obj_post->Query)){
        $obj_post->Query="";
      }
      if(empty($obj_post->DependentId)){
        $obj_post->DependentId="";
      }            
      if(empty($obj_post->ClassList)){        
        $obj_post->ClassList="notset";        
      }      
      else{
        $obj_post->ClassList=trim($obj_post->ClassList, ",");        
      }
      if(empty($obj_post->RecordId)){
        $obj_post->RecordId=0;
      }      
      if(empty($obj_post->RecordName)){
        $obj_post->RecordName="New Project";
      }
      if(empty($obj_post->RecordShortName)){
        $obj_post->RecordShortName="myProject";
      }
      if(empty($obj_post->NotifierId)){
        $obj_post->NotifierId="NotifierIdNotSet";
      }           
      if(empty($obj_post->DesignId)){//set to the client side HTML Design ID
        $obj_post->DesignId="DesignIdNotSet";
      }      
      if(empty($obj_post->RecordType)){
        $obj_post->RecordType="RecordTypeNotSet";
      } 
      if(empty($obj_post->RecordExtend)){
        $obj_post->RecordExtend="notset";
      }            
      if(empty($obj_post->ObjectData)){
          $obj_post->ObjectData="{}";
      }         
      if(empty($obj_post->ToggleProjectPin)){
        $obj_post->ToggleProjectPin=false;
      }      
      
      if(empty($obj_post->HiddenProjectPin)){        
        $obj_post->HiddenProjectPin=false;
      }      
      if(empty($obj_post->ProjectPin)){        
        $obj_post->ProjectPin=false;
      }      
      if(empty($obj_post->PalettePin)){        
        $obj_post->PalettePin=false;
      }      
      if(empty($obj_post->DynamicPin)){        
        $obj_post->DynamicPin=false;
      }      
      if(empty($obj_post->RowData)){
        $obj_post->RowData="[{}]";
      }
      if(empty($obj_post->ComponentCode)){        
        $obj_post->ComponentCode=false;
      }            
      if(empty($obj_post->HasError)){
        $obj_post->HasError=false;
      }
      if(empty($obj_post->ErrorMessage)){
        $obj_post->ErrorMessage="";
      }  

      
      $this->fn_set();           
      
      if($this->bln_debug){
        $this->fn_debug();      
      }
      
      switch($obj_post->Action){                
        case "openComponentCode"://revised pdo
          $this->fn_openComponentCode();
        break;        
        break;        
        case "getListPalettePinnedComponent"://revised pdo              
          $this->fn_getListPalettePinnedComponent();
        break;
        case "getListProject"://revised pdo          
          $this->fn_getListProject();
        break;
        case "toggleProjectPin":
          $this->fn_toggleProjectPin();          
        break;        
        case "save":
          $this->fn_saveComponent();
        break;        
        case "versionProject":
          $this->fn_versionComponent();
        break;                
        break;                      
        case "saveAs":
          $this->fn_saveAsComponent();
        break;        
        case "delete":
          $this->fn_deleteComponent();
        break;                
        case "newProject":                              
          $this->fn_newProject();          
        break;
        case "openProject":                    
          $this->fn_openProject();          
        break;  
        case "getInstance":
          $this->fn_openProject();    
        break;            
        case "XDesigner_release"://revised pdo
          $this->fn_XDesigner_release();
        break;                      
        case "XDesigner_move"://revised pdo
          $this->fn_XDesigner_move();
        break;              
        case "XDesigner_maintain":              
          $this->fn_XDesigner_maintain();          
        break;                
        case "XDesigner_compile":              
          $this->fn_XDesigner_compile();          
        break;                                
        case "XDesigner_checkAuthorize":          
          $this->fn_XDesigner_checkAuthorize();          
        break;         
        case "XDesigner_startAuthorize":          
          $this->fn_XDesigner_startAuthorize();          
        break;         
        case "XDesigner_endAuthorize":          
          $this->fn_XDesigner_endAuthorize();          
        break;         
        case "importAll":
          $this->fn_importAll();          
        break;        
        case "importComponentFiles":              
          $this->fn_importComponentFiles();          
        break;            
        case "importInstanceFiles":              
          $this->fn_importInstanceFiles();          
        break;         
        case "XDesigner_createBackup":              
          $this->fn_XDesigner_createBackup();          
        break;                
        case "SQLQuery":
          $this->fn_openQuery();          
        break;        
        default:          
          $obj_post->HasError=true;
          $obj_post->ErrorMessage="XDesign ACTION Not Handled: [".$obj_post->Action."]";       
      }
    }
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    /////////////////////////////    
    function fn_setPath(){ 

      $this->bln_localHost=false;
      if (isset($_SERVER["REMOTE_ADDR"])) {if($_SERVER["REMOTE_ADDR"]==="127.0.0.1"){$this->bln_localHost=true;}}            
      $this->str_UniqueName=$this->fn_getUniqueName();                        
      
      $this->str_path_document_root=$_SERVER['DOCUMENT_ROOT'];   

      $this->AuthorizeStandardEmail="mycode.buzz@gmail.com";
      
      $this->str_name_folder_app="app";
      $this->str_name_folder_user=$this->AuthorizeStandardEmail;
      $this->str_name_folder_asset="asset";      
      $this->str_name_folder_server="server";            
      $this->str_name_folder_component="component";
      $this->str_name_folder_instance="instance";      
      
      $this->str_path_folder_app=$this->str_path_document_root."/".$this->str_name_folder_app;                      
      $this->str_path_folder_user=$this->str_path_folder_app."/".$this->str_name_folder_user;                                    
      $this->str_path_folder_user_component=$this->str_path_folder_user."/".$this->str_name_folder_component;              
      $this->str_path_folder_user_instance=$this->str_path_folder_user."/".$this->str_name_folder_instance;                               
      
      $this->str_path_folder_user_asset=$this->str_path_folder_user."/".$this->str_name_folder_asset;              
      $this->str_path_folder_user_server=$this->str_path_folder_user."/".$this->str_name_folder_server;             

      
    }    
    function fn_debugPath(){

      $s="";
      $s.="this->str_UniqueName: ".$this->str_UniqueName.PHP_EOL.PHP_EOL;      
      $s.="this->str_path_document_root: ".$this->str_path_document_root.PHP_EOL.PHP_EOL;      
      $s.="this->str_path_folder_app: ".$this->str_path_folder_app.PHP_EOL.PHP_EOL;
      $s.="this->str_path_folder_user: ".$this->str_path_folder_user.PHP_EOL.PHP_EOL;
      $s.="this->str_path_folder_user_component: ".$this->str_path_folder_user_component.PHP_EOL.PHP_EOL;
      $s.="this->str_path_folder_user_instance: ".$this->str_path_folder_user_instance.PHP_EOL.PHP_EOL;
      $s.="this->str_path_folder_user_asset: ".$this->str_path_folder_user_asset.PHP_EOL.PHP_EOL;      
      $this->fn_addEcho($s);     
      
    }

    function fn_set(){          
      
      $this->date_script=$this->fn_getSQLDate();            
      $this->fn_setPath();  
      
      
      if($this->bln_debugPath){
        $this->fn_debugPath();
      }

      $this->str_name_folder_release=$this->AuthorizeStandardSchema;                    
      $this->str_name_folder_resource="resource";              
      $this->str_name_folder_release_hot="latest-build";
      $this->str_name_folder_build="build";            
      $this->str_name_folder_version="version"; 
      $this->str_name_folder_backup="backup"; 
      
      $this->str_path_folder_user_resource=$this->str_path_folder_user."/".$this->str_name_folder_resource;        
      $this->str_path_folder_user_backup=$this->str_path_folder_user."/".$this->str_name_folder_backup;        
      $this->str_path_folder_release=dirname($this->str_path_document_root)."/".$this->str_name_folder_release;
      
      
      $this->dbname_projectMenuButton="menubutton";
      
      $this->str_name_xdesign=$this->obj_post->RecordShortName;
      $this->xdesign_module_identifier="x";                  
      $this->xdesign_module_basename=$this->str_name_xdesign."-x-";                  
      $this->xdesign_module_name=$this->xdesign_module_basename.$this->str_UniqueName;                  
      
      $this->xdesign_version_identifier="version";                  
      $this->xdesign_version_basename=$this->str_name_xdesign."-".$this->xdesign_version_identifier."-";                  
      $this->xdesign_version_name=$this->xdesign_version_basename.$this->str_UniqueName;
      
      $this->str_path_folder_site_backup="sitebackup-error";
      if($this->bln_localHost){
        $this->str_path_folder_site_backup="D:\\var\www\html\backup";//needs work
      }      
      
      $this->str_name_file_xdesign=$this->xdesign_module_name.".mjs";//https://v8.dev/features/modules#mjs                 
      $this->str_name_file_xdesign_version=$this->xdesign_version_name.".mjs";
      $this->str_name_file_xdesign_index="index.html";
      $this->str_name_file_xdesign_index_version=$this->str_name_file_xdesign_index;
      
      
      //DBType are used by build project, and in compile
      $this->dbtype_runtime="RunTimeCode";                   
      $this->dbtype_designtime="DesigntimeCode";
      $this->dbtype_template="TemplateCode";            
      //DBType are used by build project, and in compile      
      
      $this->fn_setfolderpathProjectInstance();               
      
    }    
    function fn_setfolderpathProjectInstance(){      

      $int_idRecord=$this->obj_post->RecordId;

      $this->folderpath_instance=$this->fn_getfolderpathInstance($int_idRecord);      
      $this->fn_createFolder($this->folderpath_instance);
      
      $this->folderpath_build=$this->fn_getfolderpathInstanceBuild($int_idRecord);                  
      $this->folderpath_projectInstance=$this->folderpath_build."/".$this->xdesign_module_name;                        
      $this->URLProjectInstance=$this->path2url($this->folderpath_projectInstance);      
      $this->obj_post->URLProjectInstance=$this->URLProjectInstance;      
      
      $this->folderpath_version=$this->fn_getfolderpathInstanceVersion($int_idRecord);                        
      $this->folderpath_projectVersion=$this->folderpath_version."/".$this->xdesign_version_name;
      $this->URLProjectVersion=$this->path2url($this->folderpath_projectVersion);      
      $this->obj_post->URLProjectVersion=$this->URLProjectVersion;      
      
      //*
      if($this->bln_debugPathProjectInstance){
        $this->fn_debugPathProjectInstance();
      }
      //*/
    }   
    
    function fn_debugPathProjectInstance(){

      $s="";      
      $s.="this->folderpath_instance: ".$this->folderpath_instance.PHP_EOL.PHP_EOL;      
      $s.="this->folderpath_build: ".$this->folderpath_build.PHP_EOL.PHP_EOL;      
      $s.="this->folderpath_projectInstance: ".$this->folderpath_projectInstance.PHP_EOL.PHP_EOL;      
      $s.="this->URLProjectInstance: ".$this->URLProjectInstance.PHP_EOL.PHP_EOL;      
      $s.="this->folderpath_version: ".$this->folderpath_version.PHP_EOL.PHP_EOL;
      $s.="this->folderpath_projectVersion: ".$this->folderpath_projectVersion.PHP_EOL.PHP_EOL;
      $s.="this->URLProjectVersion: ".$this->URLProjectVersion.PHP_EOL.PHP_EOL;
      $this->fn_addEcho($s);     
      
    }

    function fn_debugAuthorize(){

      $obj_post=$this->obj_post;      
      
      $s="";
      $s.="AUTHORIZE".PHP_EOL;
      $s.="-----------------".PHP_EOL;            
      $s.="AuthorizeStandardUser: ".$this->AuthorizeStandardUser.PHP_EOL;            
      $s.="AuthorizeStandardPass: ".$this->AuthorizeStandardPass.PHP_EOL;            
      $s.="-----------------".PHP_EOL;            
      $s.="AuthorizeSessionKey: ".$this->AuthorizeSessionKey.PHP_EOL;            
      $s.="AuthorizeUserEmail: ".$this->AuthorizeUserEmail.PHP_EOL;            
      $s.="AuthorizeUserPass: ".$this->AuthorizeUserPass.PHP_EOL;                  
      $this->fn_addEcho($s);     
    }


    
    /////////////////////////////////
    /////////////START LOGIN    
    function fn_XDesigner_checkAuthorize(){      

      $str_value=$this->fn_getLoginCookie("AuthorizeSessionKey");//this will bea new session length coookie or the stored cookie
      if(empty($str_value)){return;}
      $this->AuthorizeSessionKey=$str_value;

      $obj_post=$this->obj_post;       
      $obj_post->AuthorizeUserStatus=false;

      $this->AuthorizeUserStatus=$obj_post->AuthorizeUserStatus;      
      $this->AuthorizeUserEmail="";      

      $str_sql="SELECT * FROM  control.`user_session` WHERE ";
      $str_sql.="(`AuthorizeSessionKey`=:AuthorizeSessionKey) ";
      $str_sql.="AND `AuthorizeUserPass`=`AuthorizeSentPass` ";
      $str_sql.=";";      
      //$this->fn_addEcho($str_sql);                  
      $stmt = $this->pdo->prepare($str_sql);                                              
      $stmt->execute([      
        'AuthorizeSessionKey' => $this->AuthorizeSessionKey,         
      ]);      
      $row=$stmt->fetch();         
      if($row){                                                           
        $this->fn_setLoginCookie("AuthorizeSessionKey", $this->AuthorizeSessionKey);//set with longer expiry time                                     
        $this->AuthorizeUserEmail=$row["AuthorizeUserEmail"];          
        $this->AuthorizeUserStatus=true;
      }

      if ($this->bln_localHost){
        //$this->AuthorizeUserStatus=true;
      }
      
      $obj_post->AuthorizeUserStatus=$this->AuthorizeUserStatus;
      $obj_post->AuthorizeUserEmail=$this->AuthorizeUserEmail;
      
    }    
    function fn_XDesigner_startAuthorize(){      
      
      $str_value=$this->fn_getLoginCookie("AuthorizeSessionKey");//this will bea new session length coookie or the stored cookie
      if(empty($str_value)){return;}
      $this->AuthorizeSessionKey=$str_value;
      
      $obj_post=$this->obj_post;             
      
      $this->AuthorizeUserEmail=$obj_post->AuthorizeUserEmail;
      $this->AuthorizeUserPass=$obj_post->AuthorizeUserPass;      

      if(!empty($this->AuthorizeUserEmail) && empty($this->AuthorizeUserPass)){
        $this->fn_XDesigner_sendOTP();
      }      
      else if(!empty($this->AuthorizeUserEmail) && !empty($this->AuthorizeUserPass)){                
        
        $str_sql="UPDATE control.`user_session` SET `AuthorizeUserPass`=:AuthorizeUserPass, `ModifiedDate`=:ModifiedDate WHERE ";
        $str_sql.="(`AuthorizeSessionKey`=:AuthorizeSessionKey AND `AuthorizeUserEmail`=:AuthorizeUserEmail) ";
        $str_sql.=";";        
        //$this->fn_addEcho($str_sql);               
        $stmt = $this->pdo->prepare($str_sql);                                  
        $stmt->execute([
          'AuthorizeUserPass' => $this->AuthorizeUserPass,
          'AuthorizeSessionKey' => $this->AuthorizeSessionKey,
          'AuthorizeUserEmail' => $this->AuthorizeUserEmail,
          'ModifiedDate' => $this->date_script
        ]);                          
      }      
      $this->fn_XDesigner_checkAuthorize();
    } 

    function fn_XDesigner_sendOTP(){                                  
      
      $str_value=$this->fn_getLoginCookie("AuthorizeSessionKey");
      if(empty($str_value)){return;}
      $this->AuthorizeSessionKey=$str_value;

      $obj_post=$this->obj_post;       
      
      
      $this->AuthorizeSentPass=rand(100000,109999);      
      $this->AuthorizeUserEmail=$obj_post->AuthorizeUserEmail; 
      
      
      $str_sql="SELECT * FROM  control.`user_session` WHERE ";
      $str_sql.="(`AuthorizeSessionKey`=:AuthorizeSessionKey) ";      
      $str_sql.=";";      
      //$this->fn_addEcho($str_sql);                  
      $stmt = $this->pdo->prepare($str_sql);                                              
      $stmt->execute([      
        'AuthorizeSessionKey' => $this->AuthorizeSessionKey,         
      ]);      
      $row=$stmt->fetch();         
      
      if($row){                                                                   
        $str_sql="UPDATE control.`user_session` SET `AuthorizeSentPass`=:AuthorizeSentPass, `ModifiedDate`=:ModifiedDate WHERE ";
        $str_sql.="(`AuthorizeSessionKey`=:AuthorizeSessionKey) ";
        $str_sql.=";";        
        //$this->fn_addEcho($str_sql);                       
        $stmt = $this->pdo->prepare($str_sql);                                                  
        $stmt->execute([
          'AuthorizeSessionKey' => $this->AuthorizeSessionKey,
          'AuthorizeSentPass' => $this->AuthorizeSentPass,          
          'ModifiedDate' => $this->date_script
        ]);                         
        
      }
      else{                
        $domain_name = substr(strrchr($this->AuthorizeUserEmail, "@"), 1);
        $rr = dns_get_record($domain_name, DNS_MX);            
        if(!$rr){
          return false;
        }

        $str_sql="DELETE FROM  control.`user_session` WHERE ";
        $str_sql.="(`AuthorizeUserEmail`=:AuthorizeUserEmail) ";
        $str_sql.=";";      
        //$this->fn_addEcho($str_sql);                  
        $stmt = $this->pdo->prepare($str_sql);                                              
        $stmt->execute([      
          'AuthorizeUserEmail' => $this->AuthorizeUserEmail         
        ]);      

        $this->AuthorizeSessionKey=session_id();        
        $str_sql="INSERT INTO `control`.`user_session` ";
        $str_sql.="(`AuthorizeSessionKey`, `AuthorizeUserEmail`, `AuthorizeSentPass`, `CreatedDate`,`ModifiedDate`) ";
        $str_sql.="VALUES ";
        $str_sql.="(:AuthorizeSessionKey, :AuthorizeUserEmail, :AuthorizeSentPass, :CreatedDate, :ModifiedDate) ";
        $str_sql.=";";      
        //$this->fn_addEcho($str_sql);            
        $stmt = $this->pdo->prepare($str_sql);  
        $stmt->execute([
          'AuthorizeSessionKey' => $this->AuthorizeSessionKey, 
          'AuthorizeUserEmail' => $this->AuthorizeUserEmail, 
          'AuthorizeSentPass' => $this->AuthorizeSentPass,
          'CreatedDate' => $this->date_script,
          'ModifiedDate' => $this->date_script
        ]);      
      }

      if ($this->bln_localHost){      
        //return;        
      }
      
      $mailmsg="Here is your OTP Code: ".$this->AuthorizeSentPass;
      $mailsubject="OTP Code";
      $headers[] = "From: "."Jack Jones"." <server@mycode.buzz>";            
        $this->fn_sendOTPMail($this->AuthorizeUserEmail, $mailsubject, $mailmsg, $headers);
      
    } 
    function fn_sendOTPMail(){     

      //$this->fn_addEcho("START fn_sendOTPMail");

        $to = $this->AuthorizeUserEmail; // note the comma

        // Subject
        $subject = 'One Time Pass';

        // Message
        $message = <<<END
        <html><head><title>One Time Passcode</title></head><body><p>Here is your One Time Pass:</p><p>$this->AuthorizeSentPass</p></body></html>
        END;

        // To send HTML mail, the Content-type header must be set
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=iso-8859-1';

        // Additional headers        
        $headers[] = "To: User <$this->AuthorizeUserEmail>";
        $headers[] = 'From: Application <marketing@myrsstestdomain.com>';
        //$headers[] = 'Cc: mycode.buzz@gmail.com';    
        $this->fn_addEcho("headers: .".vardump($headers));

        // Mail it
        $bln_value=mail($to, $subject, $message, implode("\r\n", $headers));
        $this->fn_addEcho("sendOTPMail: ".$bln_value);
    }   


    function fn_XDesigner_endAuthorize(){            

      $str_value=$this->fn_getLoginCookie("AuthorizeSessionKey");
      if(empty($str_value)){return;}
      $this->AuthorizeSessionKey=$str_value;

      $obj_post=$this->obj_post;       
      
      $str_sql="DELETE FROM  control.`user_session` WHERE `AuthorizeSessionKey`=?;";
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo->prepare($str_sql);                            
      $stmt->execute([$this->AuthorizeSessionKey]);              
      
      $this->AuthorizeSessionKey="";            
      $this->AuthorizeUserEmail="";
      $this->AuthorizeUserPass="";
      $this->AuthorizeUserStatus=false;      
      
      $obj_post->AuthorizeUserEmail=$this->AuthorizeUserEmail;
      $obj_post->AuthorizeUserPass=$this->AuthorizeUserPass;
      $obj_post->AuthorizeUserStatus=$this->AuthorizeUserStatus;
    }


    function fn_setLoginCookie($cookie_name, $cookie_value, $bln_expire=false){      

      unset($_COOKIE[$cookie_name]);

      $str_time=time() + (86400 * 30);
      if($bln_expire){$str_time=0;}      
      
      $arr_cookie_options = array (
        'expires' => $str_time,
        'path' => '/',
        //'domain' => 'xdesign-build.lokal-mycode.buzz/', // leading dot for compatibility or use subdomain
        'secure' => false,     // or false
        'httponly' => false,    // or false
        'samesite' => 'Lax' // None || Lax  || Strict
        );

      setcookie($cookie_name, $cookie_value, $arr_cookie_options);      
    }
    function fn_getLoginCookie($cookie_name){
      $str_value="";
      if(!isset($_COOKIE[$cookie_name])) {        
      } 
      else {
        $str_value=$_COOKIE[$cookie_name];        
      }
      return $str_value;
    }
    /////////////END LOGIN
    /////////////////////////////////
    



    function fn_getUniqueName(){
      return date("Y-m-d-H-i-s-").rand(0,100);
    }
    function fn_getSQLDate(){
      return date("Y-m-d H:i:s");
    }
    
    
    function fn_getPathFolderUser($str_path=SCRIPT_PATH){      

      if (!file_exists($str_path)){return "error";};
      $str_nameFolder=basename($str_path);
      if($this->fn_inStr($str_nameFolder, "@")){        
        $this->fn_addEcho("Found @");     
        return $str_path;
      }            
      return $this->fn_getPathFolderUser(dirname($str_path));//revurtsive to parentfolder      
    }

    
    function fn_createFolderPath($str_path){    
      //if (!file_exists($str_path)){mkdir($str_path);}
    }    
    
    

    function fn_createFolder($str_path_folder){
      $bln_fileexist=file_exists($str_path_folder);           
      //$this->fn_addEcho("fn_createFolder: ".$str_path_folder); 
      if(!$bln_fileexist){                              
        mkdir($str_path_folder, 0777, true);        
        //$this->fn_addEcho("mkdir");     
      }
    }  
    
    
    function fn_getfolderpathInstanceResource($int_idRecord){

      return $this->fn_getfolderpathInstance($int_idRecord)."/".$this->str_name_folder_resource;      
    }    
    function fn_getfolderpathInstanceVersion($int_idRecord){

      return $this->fn_getfolderpathInstance($int_idRecord)."/".$this->str_name_folder_version;      
    }    
    function fn_getfolderpathInstanceBuild($int_idRecord){

      return $this->fn_getfolderpathInstance($int_idRecord)."/".$this->str_name_folder_build;      
    }        
    
    function fn_getfolderpathInstance($int_idRecord){

      return $this->str_path_folder_user_instance."/".$int_idRecord;      
    }
    
    function fn_getfolderpathComponent($db_type){

      return $this->str_path_folder_user_component."/".$db_type;      
    }

    
    function path2url($str_file_path) {  
      
      $str_protocol='http://';      
      if(!empty($_SERVER['HTTPS'])){$str_protocol='https://';}
      $str_HTTP_HOST=$_SERVER['HTTP_HOST'];            
      $str_DOCUMENT_ROOT=str_replace("\\", "/", $_SERVER['DOCUMENT_ROOT']);;      
      $str_file_path=str_replace("\\", "/", $str_file_path);
      $str_url_path=str_replace($_SERVER['DOCUMENT_ROOT'], '', $str_file_path);
      $str_url=$str_protocol.$str_HTTP_HOST.$str_url_path;      

      /*
      $this->fn_addEcho("SCRIPT_PATH: ".SCRIPT_PATH);
      $this->fn_addEcho("str_protocol: ".$str_protocol);
      $this->fn_addEcho("str_HTTP_HOST: ".$str_HTTP_HOST);
      $this->fn_addEcho("str_file_path: ".$str_file_path);
      $this->fn_addEcho("str_DOCUMENT_ROOT: ".$str_DOCUMENT_ROOT);            
      $this->fn_addEcho("str_url_path: ".$str_url_path);      
      $this->fn_addEcho("str_url: ".$str_url);           
      //*/
      return $str_url;
    }   
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////

  
    
    function fn_saveAsComponent(){
      
      $obj_post=$this->obj_post;      

      $int_idRecord=$obj_post->RecordId;            
      $int_dynamicPin=$this->fn_get_intBool($obj_post->DynamicPin);      

      if($int_dynamicPin){
        return;
      }
      
      
      $this->fn_insertInstance($int_idRecord);
      
      $obj_post->RecordId=$this->fn_get_last_insert_id();
      //$this->fn_setfolderpathProjectInstance();         
      
      //*
      //Save id record direct into the object data
      $obj_ObjectData=json_decode($obj_post->ObjectData);
      $obj_ObjectData->obj_design->int_idRecord=$obj_post->RecordId;      
      $obj_post->ObjectData=json_encode($obj_ObjectData);      
      
      $this->fn_saveComponent();      
      //Save id record direct into the object data
      //*/      
      
      $obj_post->ObjectData="{}";
    }               

    function fn_existInstance($int_idRecord){
      
      $obj_post=$this->obj_post;

      $str_sql="SELECT * FROM `instance` WHERE `id`=?;";            
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute([$int_idRecord]);      
      $row=$stmt->fetch();
      if($row){
        return true;
      }
      return false;
    }   
    
    function fn_saveComponent(){      

      //$this->fn_cleanupInstanceTable();//may prevent new components from savng ?

      //requires obj post to have an accurate dependent id string
      
      $obj_post=$this->obj_post;      

      $int_idRecord=$obj_post->RecordId;
      $str_nameRecord=$obj_post->RecordName;
      $str_nameShortRecord=$obj_post->RecordShortName;
      
      $str_typeRecord=$obj_post->RecordType;
      $db_type=$obj_post->RecordType;
      $str_objectData=$obj_post->ObjectData;      
      $str_dependentId=$obj_post->DependentId;      
      $str_classList=$obj_post->ClassList;
      $str_componentCode=$obj_post->ComponentCode;           
      $str_recordExtend=$obj_post->RecordExtend;
      $int_ToggleProjectPin=$this->fn_get_intBool($obj_post->ToggleProjectPin);
      $int_HiddenProjectPin=$this->fn_get_intBool($obj_post->HiddenProjectPin);
      $int_projectPin=$this->fn_get_intBool($obj_post->ProjectPin);      
      $int_palettePin=$this->fn_get_intBool($obj_post->PalettePin);      
      $int_dynamicPin=$this->fn_get_intBool($obj_post->DynamicPin);            
      
      $str_LocationID=$obj_post->LocationID;                 
      if($str_LocationID==="notset"){$str_LocationID=$this->AuthorizeStandardSchema;}
           

      $str_CreatedDate=$obj_post->CreatedDate;                 
      $str_ModifiedDate=$obj_post->ModifiedDate;         

      if(!$this->fn_validateDate($str_CreatedDate, 'Y-m-d H:i:s')){
        $str_CreatedDate="1001-01-01";
      }
      if(!$this->fn_validateDate($str_ModifiedDate)){$str_ModifiedDate="1001-01-01";}      
      
      /*        
      $this->fn_addEcho("str_LocationID: ".$str_LocationID);                            
      $this->fn_addEcho("str_CreatedDate: ".$str_CreatedDate);                            
      $this->fn_addEcho("str_ModifiedDate: ".$str_ModifiedDate);
      //*/

      if($int_dynamicPin){
        return;
      }      
      
      //UPDATE DATABASE FROM SOFTWARE        
      $this->fn_updateInstanceToDatabase($str_nameRecord, $str_nameShortRecord, $str_typeRecord, $int_ToggleProjectPin, $int_HiddenProjectPin, $int_projectPin, $int_palettePin, $str_dependentId, $str_objectData, $str_LocationID, $str_CreatedDate, $str_ModifiedDate, $int_idRecord);
      $obj_post->ObjectData="{}";            

      $this->fn_exportInstanceToFile($str_nameRecord, $str_nameShortRecord, $str_typeRecord, $int_ToggleProjectPin, $int_HiddenProjectPin, $int_projectPin, $int_palettePin, $str_dependentId, $str_objectData, $str_LocationID, $str_CreatedDate, $str_ModifiedDate, $int_idRecord);                
            
      //UPDATE DATABASE FROM SOFTWARE
      $this->fn_updateComponentToDatabase($str_typeRecord, $str_recordExtend, $str_classList, $str_componentCode, $str_LocationID, $str_CreatedDate, $str_ModifiedDate);         
      
      //EXPORT FROM DATABASE TO FILE         
      $this->fn_exportComponentToFile($str_typeRecord, $str_recordExtend, $str_classList, $str_componentCode, $str_LocationID, $str_CreatedDate, $str_ModifiedDate);    
    }         

    function fn_validateDate($date, $format = 'Y-m-d H:i:s'){
      $d = DateTime::createFromFormat($format, $date);
      return $d && $d->format($format) == $date;
    }

    
    function fn_updateInstanceToDatabase($str_nameRecord, $str_nameShortRecord, $str_typeRecord, $int_ToggleProjectPin, $int_HiddenProjectPin, $int_projectPin, $int_palettePin, $str_dependentId, $str_objectData, $str_LocationID, $str_CreatedDate, $str_ModifiedDate, $int_idRecord){

      
      $str_sql="UPDATE `instance` SET `Name`=?, `NameShort`=?,`Type`=?, `ToggleProjectPin`=?, `HiddenProjectPin`=?, `ProjectPin`=?, `PalettePin`=?, `DependentId`=?, `Serialize`=?, `LocationID`=?, `CreatedDate`=?, `ModifiedDate`=? WHERE `id`=? ;";                             
      $stmt = $this->pdo->prepare($str_sql);            
      $stmt->execute([$str_nameRecord, $str_nameShortRecord, $str_typeRecord, $int_ToggleProjectPin, $int_HiddenProjectPin, $int_projectPin, $int_palettePin, $str_dependentId, $str_objectData, $str_LocationID, $str_CreatedDate, $str_ModifiedDate, $int_idRecord]);            
    }

    
    function fn_updateComponentToDatabase($str_dbtype, $str_recordExtend, $str_classList, $str_Code, $str_LocationID, $str_CreatedDate, $str_ModifiedDate){      



      
      //$this->fn_addEcho("str_Code: ".$str_Code);
      //$this->fn_addEcho("str_dbtype: ".$str_dbtype);
      
      if(empty($str_Code)){
        return;//saftey
      }

      if(strtolower($str_dbtype)==="component"){//very important
        return;//must return
      }

      //$this->fn_addEcho("str_dbtype: ".$str_dbtype);                    

      $int_idFixed=$this->fn_dbTypeComponentExist(0, $str_dbtype);//check on type only         
      //$this->fn_addEcho("int_idFixed: ".$int_idFixed);
      if($int_idFixed===0){        
        $this->fn_addEcho("NEW CLASS: BUILD XDESIGNER AND RELOAD REQUIRED");
      }                         
      $this->fn_updateFileToComponentTable($int_idFixed, $str_dbtype, $str_recordExtend, $str_classList, $str_Code, $str_LocationID, $str_CreatedDate, $str_ModifiedDate);      
    }


    function fn_updateFileToComponentTable($int_idFixed, $str_dbtype, $str_recordExtend, $str_classList, $str_componentCode, $str_LocationID, $str_CreatedDate, $str_ModifiedDate){  
  
      $int_id_record=$this->fn_dbTypeComponentExist($int_idFixed, $str_dbtype);    
      
      //$this->fn_addEcho("fn_updateFileToComponentTable int_id_record: ".$int_id_record);  
      
      
      if($int_id_record===0){        
        $str_sql="INSERT INTO `component` (`id`, `Type`, `Extend`, `ClassList`,`Code`,`LocationID`, `CreatedDate`, `ModifiedDate`) SELECT ?,?,?,?,?,?,?,?;";
        $stmt = $this->pdo->prepare($str_sql);
        $stmt->execute([$int_idFixed, $str_dbtype, $str_recordExtend, $str_classList, $str_componentCode,$str_LocationID, $str_CreatedDate, $str_ModifiedDate]);
      }
      else{        
        $str_sql="UPDATE `component` SET `Type`=?, `Extend`=?, `ClassList`=?, `Code`=?, `LocationID`=?, `CreatedDate`=?, `ModifiedDate`=? WHERE `id`=?;";                        
        $stmt = $this->pdo->prepare($str_sql);        
        //$this->fn_addEcho("str_sql: ".$str_sql);                            
        $stmt->execute([$str_dbtype, $str_recordExtend, $str_classList, $str_componentCode, $str_LocationID, $str_CreatedDate, $str_ModifiedDate, $int_id_record]);
        
      }  
      
      return $int_id_record;
      
    }


    function fn_openQuery(){

      $obj_post=$this->obj_post;
      $str_sql=$obj_post->Query;
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();
      $row=$stmt->fetchAll();
      if($row){
        $this->fn_formatPost($row);
        $obj_post->RowData=json_encode($row);
      }
      else{
        $obj_post->RowData="[{}]";
      }
    }
    
    function fn_deleteComponent(){
      $obj_post=$this->obj_post;      

      $int_idRecord=$obj_post->RecordId;

      /*      
      $str_sql="UPDATE `instance` SET `ProjectPin`=0, `PalettePin`=0 WHERE `id`=$obj_post->RecordId ;";
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      //*/

      if($int_idRecord===$this->int_idRecordXDesign){
        return;
      }

      
      $str_sql="DELETE FROM `instance` WHERE `id`=$int_idRecord ;";      
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();
      
      /*      
      $str_sql="DELETE FROM `instancelink` WHERE `InstanceId`=$obj_post->RecordId ;";
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();
      //*/            

      $this->fn_removeOrphanFolder($int_idRecord);//relates to single deleted folder      
    } 
    
    function fn_createDefaultResouce($int_idRecord){       
          
      $str_path_source=$this->str_path_folder_user_resource;
      $str_path_destination=$this->fn_getfolderpathInstanceResource($int_idRecord);
      $this->fn_createFolder($str_path_destination);        
      $this->fn_copyFolderLevel($str_path_source, $str_path_destination); 
    }
    
    function fn_newProject(){       
      
      //$this->fn_cleanupInstanceTable();      
      
      $this->fn_emptydirectory($this->folderpath_build);            
      
      $obj_ini=new stdClass();
      $obj_ini->RecordId=0;
      $obj_ini->str_path_folder=$this->folderpath_projectInstance;      
      $obj_ini->str_name_file_xdesign=$this->str_name_file_xdesign;            
      $obj_ini->bln_version=false;
      $obj_ini->str_nameTargetClass="";            
      $this->fn_buildProject($obj_ini);
    }


    function fn_openProject(){

      $obj_post=$this->obj_post;      

      $int_idRecord=$this->obj_post->RecordId;      

      $s="SELECT * FROM `instance` WHERE `id`=? ";
      $s.="AND LOWER(`LocationID`)=? ";       
      $s.=";";       

      $str_sql=$s;
      $stmt = $this->pdo->prepare($str_sql);            
      $stmt->execute([$int_idRecord, strtolower($this->AuthorizeStandardSchema)]);      
      $row=$stmt->fetch();
      if($row){
        $this->fn_formatPost($row);
      }
      else{
        $obj_post->HasError=true;
        $obj_post->ErrorMessage="RecordIdNotExist";
        $this->fn_addEcho("EMPTY ROW");
      }

      
      $this->fn_emptydirectory($this->folderpath_build);
      
      $obj_ini=new stdClass();
      $obj_ini->RecordId=$int_idRecord;
      $obj_ini->str_path_folder=$this->folderpath_projectInstance;
      $obj_ini->str_name_file_xdesign=$this->str_name_file_xdesign;            
      $obj_ini->bln_version=false;
      $obj_ini->str_nameTargetClass="";      
      $this->fn_buildProject($obj_ini);
    }   
    
    
    function fn_versionComponent(){

      
      //save the instance first.
      //requires obj post to have an accurate dependent id string
      //puboish does use the same client side route "actionSave" which runs fn_compileDependentId
      $this->fn_saveComponent();

      
      //remove existing version files                         
      //$this->fn_emptydirectory($this->folderpath_version);
      $this->fn_deleteFolderTree($this->folderpath_version);
      //remove existing version files       

      $obj_ini=new stdClass();
      $obj_ini->RecordId=$this->obj_post->RecordId;  
      $obj_ini->str_path_folder=$this->folderpath_projectVersion;      
      $obj_ini->str_name_file_xdesign=$this->str_name_file_xdesign_version;            
      $obj_ini->bln_version=true;              
      $obj_ini->str_nameTargetClass="";                        
      $this->fn_buildProject($obj_ini);
    }
    
    


    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    
    
    
    function fn_addEcho($str_val){
      $this->obj_post->Echo.=$str_val.PHP_EOL.PHP_EOL;
    }
    function fn_debug(){      
      
      //$this->fn_addEcho("SCRIPT_PATH: ".SCRIPT_PATH);                  
      //$this->fn_addEcho("obj_post->xAction: ".$this->obj_post->Action);              
    }
    function fn_get_last_insert_id(){
      return $this->pdo->lastInsertId();
    }
    
    
    function fn_setLocationMatchInstance(){      
      
      $this->obj_post->LocationMatchInstance=$this->fn_compareLocationID("instance", $this->obj_post->RecordId);      
    }
    function fn_compareLocationID($str_name_table, $int_idRecord){            
      
      $str_locationID=$this->fn_getLocationID($str_name_table, $int_idRecord);      
      if(strtolower($str_locationID)===strtolower($this->AuthorizeStandardSchema)){
        return true;
      }      

      return false;
    }
    function fn_getLocationID($str_name_table, $int_idRecord){            
      
      $obj_post=$this->obj_post;
      $int_idRecord=$obj_post->RecordId;      
      $bln_debug=false;

      if($bln_debug){
        $this->fn_addEcho("str_name_table: ".$str_name_table);
        $this->fn_addEcho("int_idRecord: ".$int_idRecord);
      }
      
      $str_locationID="";
      
      if($int_idRecord>0){        
        $str_sql="SELECT `LocationID` as 'LocationID' FROM  `$str_name_table` WHERE `id`=?;";                          
        if($bln_debug){$this->fn_addEcho($str_sql);}
        $stmt = $this->pdo->prepare($str_sql);                            
        $stmt->execute([$int_idRecord]);        
        $row=$stmt->fetch();        
        if($row){                                     
          $str_locationID=$row["LocationID"];          
          if($bln_debug){$this->fn_addEcho("GOT RS: ".$str_locationID);}
        }
        else{//empty rs          
          if($bln_debug){$this->fn_addEcho("EMPTY RS");}
          return $str_locationID;       
        }
      }      
      
      if(empty($str_locationID)){       
        if($bln_debug){$this->fn_addEcho("LOCATIONID IS BLANK");}
        $str_locationID=$this->AuthorizeStandardSchema;        
        $str_sql="UPDATE `$str_name_table` SET `LocationID`=? WHERE `id`=?;";                          
        if($bln_debug){$this->fn_addEcho($str_sql);}
        $stmt = $this->pdo->prepare($str_sql);                            
        $stmt->execute([$str_locationID, $int_idRecord]);                        
      }      
      if($bln_debug){$this->fn_addEcho("RETURN LOCATIONID: ".$str_locationID);}
      return $str_locationID;       
    }

    function fn_formatPostComponentCode($row){
      $obj_post=$this->obj_post;
      if($row){
        $obj_post->RecordId=$row["id"];        
        $obj_post->RecordType=$row["Type"];        
        $obj_post->RecordExtend=$row["Extend"];                
        $obj_post->ComponentCode=$row["Code"];            
        $this->fn_setLocationMatchComponentCode();
      }
    }

    function fn_setLocationMatchComponentCode(){      
      
      $this->obj_post->LocationMatchComponentCode=$this->fn_compareLocationID("component", $this->obj_post->RecordId);      
    }

    
    function fn_emptydirectory($str) {//some question wether this deletes the directroy as well
      if (is_file($str)) {
          return @unlink($str);
      }
      elseif (is_dir($str)) {
          $scan = glob(rtrim($str,'/').'/*');
          foreach($scan as $index=>$path) {
            $this->fn_emptydirectory($path);
          }
          return @rmdir($str);
      }
    }

    // removes files and non-empty directories
    function rrmdir($dir) {
      if (is_dir($dir)) {
        $files = scandir($dir);
        foreach ($files as $file)
        if ($file != "." && $file != "..") rrmdir("$dir/$file");
        rmdir($dir);
      }
      else if (file_exists($dir)) unlink($dir);
    }    
    

    // copies files and non-empty directories
    function rcopy($src, $dst) {
      
      if (file_exists($dst)) rrmdir($dst);

      if (is_dir($src)) {
        mkdir($dst);
        $files = scandir($src);
        foreach ($files as $file){
          if ($file != "." && $file != ".." && $file != "backup"){                                                  
              $this->rcopy($src."/".$file, $dst."/".$file);                         
          }
        }
      }
      else if (file_exists($src)){
         copy($src, $dst);         
      }
    }
    

    function fn_getListPalettePinnedComponent(){        
        
      $obj_post=$this->obj_post;
      $str_sql="SELECT `id`, Lower(`Name`) AS `Name`, `Type` FROM  `instance` WHERE `PalettePin` AND !HiddenPalettePin ORDER BY `Name`;";                  
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo->prepare($str_sql);                    
      $stmt->execute();

      $row=$stmt->fetchAll();
      if($row){       
        $obj_post->RowData=json_encode($row);
      }
      else{
        $obj_post->RowData="[{}]";
      }      
    } 
    
    function fn_getListProject(){       
      
      $int_togglePin=$this->fn_getToggleProjectPin();                              
      $obj_post=$this->obj_post;
      $s="SELECT `id`, `Name` AS `Name`, `Type` FROM  `instance` WHERE True AND !`HiddenProjectPin` ";      
      if($int_togglePin){$s.="AND `ProjectPin` ";}
      $s.="AND LOWER(`LocationID`)=? ";       
      $s.=" ORDER BY `Name`; ";
      $str_sql=$s;      
      
      $stmt = $this->pdo->prepare($str_sql);                    
      $stmt->execute([strtolower($this->AuthorizeStandardSchema)]);

      
      

      $row=$stmt->fetchAll();
      if($row){       
        $obj_post->RowData=json_encode($row);
      }
      else{
        $obj_post->RowData="[{}]";
      }      
    }     
    function fn_getToggleProjectPin(){
      
      $str_sql="SELECT `ToggleProjectPin` FROM  `instance` WHERE Name='$this->dbname_projectMenuButton';";                  
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();    
      if($row){       
        return $row["ToggleProjectPin"];      
      }
      return 0;
      
    }
    function fn_toggleProjectPin(){
      
      $int_togglePin=$this->fn_getToggleProjectPin();      
      $bln_toggleValue=$this->fn_toggleValue($int_togglePin);
      $int_togglePin=$this->fn_get_intBool($bln_toggleValue);
      
      $str_sql="UPDATE `instance` SET  `ToggleProjectPin`='$int_togglePin' WHERE Name='$this->dbname_projectMenuButton';";            
      //$this->fn_addEcho("str_sql :".$str_sql);      
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();            
    }
    function fn_toggleValue($bln_toggle){
      if($bln_toggle){return false;}
      else{return true;}
    }

    function fn_formatHTML($str_nameFile, $str_data){

      $obj_post=$this->obj_post;

      $obj_post->FileName=$str_nameFile;
      $obj_post->RecordType="HTML";      
      $obj_post->ObjectData=json_encode($str_data);
    }   
    
    
    function fn_getComponentInstance(){
      $obj_post=$this->obj_post;
      
      $str_sql=$obj_post->Query;
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();            
      $row=$stmt->fetch();
      if($row){
        $this->fn_formatPost($row);
      }

    }
    

    function fn_openComponentCode(){

      $obj_post=$this->obj_post;
      $str_typeRecord=$obj_post->RecordType;      

      if(empty($obj_post->RecordId)){
        //return;
      }      

      $str_sql="SELECT * FROM `component` WHERE `Type`=?;";
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo->prepare($str_sql);              
      $stmt->execute([$str_typeRecord]);
      $row=$stmt->fetch();
      
      if($row){
        $this->fn_formatPostComponentCode($row);
        
      }
      else{
        //$this->fn_addEcho("EMPTY ROW");
      }

      
    }
    
    function fn_insertInstance($int_idRecord){

      $obj_post=$this->obj_post;      
      
      $str_nameRecord=$obj_post->RecordName;
      $str_typeRecord=$obj_post->RecordType;
      $str_objectData=$obj_post->ObjectData;
      
      $str_sql="INSERT INTO `instance` (`id`,`Name`,`Type`,`Serialize`) VALUES (?, ?,?,?);";      
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo->prepare($str_sql);      
      $stmt->execute([$int_idRecord, $str_nameRecord, $str_typeRecord, $str_objectData]);
    }
    

    
    function fn_dbTypeComponentExist($int_idFixed, $str_dbtype){

      $str_sql="SELECT Id FROM `component` WHERE ";
      $str_sql.="Type =? ";    
      $myArr=[$str_dbtype];  
      if($int_idFixed>0){
        $str_sql.="AND Id=?";    
        array_push($myArr, $int_idFixed);
      }
      $str_sql.=";";      
      $stmt = $this->pdo->prepare($str_sql);      
      $stmt->execute($myArr);
      
      //$stmt->execute([$str_dbtype]);
      $row=$stmt->fetch();        
      $int_id_record=0;  
      if($row){$int_id_record=$row["Id"];}
      return $int_id_record;  
    }         
    
    function fn_buildProject($obj_ini){

      $obj_post=$this->obj_post;
      
      $this->obj_record=new stdClass();
      $this->obj_record->Type="notset";
      $int_idRecord=$obj_ini->RecordId;      
      $str_path_folder=$obj_ini->str_path_folder;      
      $str_name_file_xdesign=$obj_ini->str_name_file_xdesign;
      //$str_name_file_xdesign=$this->str_name_file_xdesign;
      $bln_version=$obj_ini->bln_version;                              
      $bln_release=$this->fn_get_intBool($obj_post->CreateRelease);      
      
      
      
      
      $str_nameComponent="NoName";
      $str_nameTargetClass=$obj_ini->str_nameTargetClass;       
      
      if(empty($int_idRecord)){$int_idRecord=0;}
      if(empty($str_path_folder)){return;}            
      if(empty($bln_version)){$bln_version=false;}      
      if(empty($str_nameTargetClass)){$str_nameTargetClass="component";}//Default New Project Type, RecordId=0                  
      
      $str_sql="SELECT * FROM `instance` WHERE Id=$int_idRecord;";
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();      
      if($row){        
        $str_nameComponent=$row["Name"];
        $str_nameTargetClass=$row["Type"];
        $this->obj_record->Type=$row["Type"];
      }//Overide with Custom Project Type, if the component has been Saved, RecordId=x
      
      //0 START Create Project Folder            
      if(empty($str_path_folder)){
        return;        
      }      
      
      $this->fn_createFolder($str_path_folder);            
      $this->fn_removePreviousBuilds($str_path_folder);
      if($bln_version){
        $this->fn_createDefaultResouce($int_idRecord);
        $str_path_source=$this->fn_getfolderpathInstanceResource($int_idRecord);          
        $str_path_destination=$str_path_folder;        
        $this->fn_copyFolderLevel($str_path_source, $str_path_destination);
      }
      
      
      //0 End Create Project Folder      

      //$this->fn_importComponentFile($this->obj_record->Type);
      //Temprairly disabling this here.
      //1. Its not sure why the database cannot be assume to be upto date
      //Surely its upto the Devleoper to decide when to hit the import button .
      //2. Causing issue with LocationID
      
      
      //1 START Create Project Index File      
      
      $str_header=<<<heredoc
      <!DOCTYPE html>
      <html lang="en">
      <title>$str_nameComponent</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>                        
      <script type="module" src="$str_name_file_xdesign"></script>
      <!--
      <script src="https://kit.fontawesome.com/6daaa4e123.js" crossorigin="anonymous"></script>      
      -->
      <style>
        * {/*NOTE. Box Sizing must be set//*/
          -webkit-box-sizing: border-box;
          box-sizing: border-box;    
        }                
        body{background-color: rgb(43, 44, 52);}
      </style>
      <body>
heredoc;
      
      $str_footer=<<<heredoc
      </body>
      </html>
heredoc;  

      //---Delete instance Link
      //Remove ExisitngEntries
      $this->fn_removeLinkTableEntries("instancelink", $int_idRecord);      
      //Remove ExisitngEntries
      

      $str_documentIndex=$str_header.$str_footer;      
      //1 END Create Project Index File
      
      //3 START Create Project Code File            
      $str_code_project="";      
      
      //get runtime code from database
      $str_code=$this->fn_getComponentCodeFromDBType($this->dbtype_runtime);            
      $str_code_project.=$str_code.PHP_EOL.PHP_EOL;            
      
      if(!$bln_version){//designtime code
        //get designtime code from database
        $str_code=$this->fn_getComponentCodeFromDBType($this->dbtype_designtime);      
        $str_code_project.=$str_code.PHP_EOL.PHP_EOL;
      }      

      $this->arr_ComponentMap=[];//This array is altered/addedto in fn_getComponentCodeFromListId            
      
      //---Insert List of Required Components into Link table
      $this->fn_createLinkTableEntries("instancelink", $int_idRecord);//this is the complex dependent id function                                    
      //There is now a list of dependent entries in the link table

      //---Add Palette Pinned component (if not version) , 
      //so as they are avaialble for choosing during further project editing  
      
      if(!$bln_version){
        $this->fn_addPalettePinComponentToLinkTable($int_idRecord);//add palette pinned components temporarily to buildproject
      }           



      //---Write code base 
      //get dependent code from database 
      $str_code=$this->fn_compileComponentCodeLinks($int_idRecord); //this is the complex component code function                                     
      $str_code_project.=$str_code.PHP_EOL.PHP_EOL;            
      
      $str_code=$this->fn_getComponentMap();                          
      $str_code_project.=$str_code.PHP_EOL.PHP_EOL;      
      
      
      //get own code template code from database 
      $str_code=$this->fn_getComponentCodeFromDBType($this->dbtype_template);//needs to go at the bottom of the file            
      $str_code_project.=$str_code.PHP_EOL.PHP_EOL;
      
      
      //-----Write Project Instance to JSONMap
      //write jsonmap from database to file - map must be included, version or not.
      $str_code=$this->fn_updateProjectFileWithjsonObject($int_idRecord, $bln_version);      
      $str_code_project.=$str_code.PHP_EOL.PHP_EOL;             
      
      //START Write Code to File      
      
      //Write Code to File      
      $this->str_path_file_index=$str_path_folder."/".$this->str_name_file_xdesign_index;            
      file_put_contents($this->str_path_file_index, $str_documentIndex);               
      
      $this->str_path_file_xdesign=$str_path_folder."/".$str_name_file_xdesign;            
      file_put_contents($this->str_path_file_xdesign, $str_code_project);                                    
      $this->fn_updateTemplateFile($this->str_path_file_xdesign, $int_idRecord, $str_nameTargetClass);//Update Project Code File with RecordId and ClassName                 
      //END Write Code to File
      
      //---Delete instance Link
      //Remove ExisitngEntries
      $this->fn_removeLinkTableEntries("instancelink", $int_idRecord);      
      //Remove ExisitngEntries

      
      if($bln_release){
        //$this->fn_releaseComponent($int_idRecord, $obj_post->ReleaseName);
        $this->fn_releaseComponent($int_idRecord, $obj_post->RecordShortName);
      }

      //3 END Create Project Code File
    }    

    function fn_removeLinkTableEntries($str_nameTable, $int_idRecord){       
      //XXXDEBUG

      //Remove ExisitngEntries
      $str_sql = "DELETE FROM `$str_nameTable` WHERE `InstanceId` =".$int_idRecord.";";            
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      //Remove ExisitngEntries      
    }
    
    function xfn_removeOrphanInstanceLinkTableEntries(){       

      //Remove OrphanEntries
      $str_sql = "DELETE FROM `instancelink` WHERE `InstanceId` NOT IN(SELECT `id` FROM `instance`);";            
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      //Remove OrphanEntries
    }
    
    
    function fn_getlistLinkTableEntries($str_nameTable){                   
      $str_sql = "SELECT GROUP_CONCAT(LinkDependentId) as 'list' FROM maintainlink;";
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();            
      if($row){                
        $str_list=$row["list"];              
      }
      return $str_list;
    }

    function fn_createLinkTableEntries($str_nameTable, $int_idRecord){                   
      
      //REMOVE EXISTING ENTRIES
      $this->fn_removeLinkTableEntries($str_nameTable, $int_idRecord);      
      //REMOVE EXISTING ENTRIES            
      
      //INSERT REQUIRED ENTRIES 
      $this->fn_addListToLinkTable($str_nameTable, $int_idRecord, $int_idRecord); //add self    
      $this->fn_buildLinkList($str_nameTable, "", $int_idRecord, $int_idRecord);// recursive function will find all entries in child dependnt lists     
      //INSERT REQUIRED ENTRIES      

      //REMOVE ORPHAN ENTRIES
      //$this->fn_removeOrphanInstanceLinkTableEntries();//not sure why this would be necessary
      //REMOVE ORPHAN ENTRIES
    }

    function fn_buildLinkList($str_nameTable, $str_listDependentRecord, $int_idRecordInstance, $int_idDependentRecord){               
      
      $str_sql = "SELECT `DependentId` as `list` FROM `instance`  WHERE `id` ='$int_idDependentRecord' AND !INSTR('$str_listDependentRecord', `DependentId`);";
      if($this->bln_debug){$this->fn_addEcho("str_sql: ".$str_sql);}
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();            
      $row=$stmt->fetch();                  
      if($row){        
        $str_Newlist=$row["list"];
        if(empty($str_listDependentRecord)){
          //$str_Newlist=$int_idRecordInstance.",".$str_Newlist; //ADD INSTANCE RECORD To Dependency List         
        }
        else{
          $str_listDependentRecord.=",";
        }        
        $str_listDependentRecord.=$str_Newlist;//Create default dependency list                          
        //$this->fn_addEcho("[$int_idDependentRecord] FOUND NEW LIST: [".$str_Newlist."]");                                    
        $this->fn_addListToLinkTable($str_nameTable, $int_idRecordInstance, $str_Newlist);                                   
        $arr_id=explode(",",$str_Newlist);//grab list of child instance ids      
        $arr_length = count($arr_id);
        for($i=0;$i<$arr_length;$i++){$this->fn_buildLinkList($str_nameTable, $str_listDependentRecord, $int_idRecordInstance, $arr_id[$i]);}        
      }  
    } 
    function fn_setGroupConcatLimit($int_limit=1000000){      
      
      $str_sql="SET SESSION group_concat_max_len = $int_limit;";
      $stmt = $this->pdo->prepare($str_sql);      
      $stmt->execute();
    }     
    

    function fn_addListToLinkTable($str_nameTable, $int_idRecord, $str_listDependentId){

      //create  entries relating to current instance
      $str_sql = "INSERT INTO `$str_nameTable` (InstanceId, LinkDependentId)  VALUES (?,?);";      
      if($this->bln_debug){$this->fn_addEcho("str_sql: ".$str_sql);}
      $stmt = $this->pdo->prepare($str_sql);                  
      //create  entries relating to current instance 
      
      if(empty($str_listDependentId)){
        $str_listDependentId="";//safety check , perhaps could be nulkl etc
      }      
      $str_listDependentId=strval($str_listDependentId);
      $arr_id=explode(",",$str_listDependentId);//grab list of child instance ids            
      $arr_length = count($arr_id);                  
      for($i=0;$i<$arr_length;$i++)
      {
        $int_id=$arr_id[$i];                      
        $bln_isNumeric=is_numeric($int_id);        
        if($bln_isNumeric){
          if($this->bln_debug){$this->fn_addEcho("stmt->execute: ".$int_idRecord.": ".$int_id);}
          $stmt->execute([$int_idRecord, $int_id]);
        }        
      }
    }

    function  fn_addPinnedComponentToLinkTableViaBuildInstanceLinkList($int_idRecord){//added during buildproject                 
      //EXPERIMENTAL //CURRENTLY NOT IN USE            
      $str_sql="SELECT GROUP_CONCAT(`id`) AS `list` FROM `instance` WHERE `PalettePin` AND ID<>$int_idRecord;";                  
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();      
      if($row){
        $str_list=$row["list"];                            
        $arr_id=explode(",",$str_list);//grab list of child instance ids      
        $arr_length = count($arr_id);
        for($i=0;$i<$arr_length;$i++){$this->fn_buildLinkList("instancelink", "", $arr_id[$i], $arr_id[$i]);}        
      }
    }   

    function fn_addPalettePinComponentToLinkTable($int_idRecord){//added during buildproject           
      //version uses save routnie to build sufficient list    
      //after this operaiton the list will be technically incorrect - including all pinned, including  required pinned componnents.
      //however the list will be correct again when the operaiton is next saved , or versioned      
      
      //get all pinned components , and also any dependnt ids
      $this->fn_setGroupConcatLimit();      
      $str_sql="SELECT GROUP_CONCAT(CONCAT_WS(IF(`DependentId`='','',','), `id`, `DependentId`)) AS `list` FROM `instance` WHERE `PalettePin`;";                        
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();      
      if($row){
        $str_list=$row["list"];                            
        $this->fn_addListToLinkTable("instancelink", $int_idRecord, $str_list);//add this list as records to the Link Table
      }
    }       

    function fn_getPaletteComponentListId($int_id_record){        
      
      $str_sql="SELECT group_concat(distinct `component`.`id`) as `listId` FROM instancelink join instance on LinkDependentId=instance.id join component on instance.type=component.Type ";
      $str_sql.="WHERE ";      
      $str_sql.="`InstanceId`=".$int_id_record.";";
      //$this->fn_addEcho("str_sql: ".$str_sql);                              
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();            
      if($row){$str_listId=$row["listId"];}      
      return $str_listId;
    }           
    
    function fn_getPaletteComponentListExpand($str_listType){    

      
      /*
      take the given list
      query if that list has a extend or classlist that meets criteria
      ie not in notset, component, tag, not equal to blank, and not already in the same list
      if rows are returned add each colum to the end of the list, and repeat with the expanded list
      if rows are not returned exit and return
      //*/

      //take the given list
      //$this->fn_addEcho("str_listType: ".$str_listType);                   

      $str_listExclude="'','notset','component','tag'";

      if(empty($str_listType)){return $str_listType;}
      $s="";
      $s.="SELECT `Type`, `Extend` AS `listExtend`, `ClassList` AS `listClass` FROM component where `Type` IN($str_listType) ";
      $s.="AND ";
      $s.="(";
      $s.="`Extend` ";
      $s.="NOT IN";
      $s.="(";
      $s.=$str_listType.", ";
      $s.=$str_listExclude;
      $s.=") ";
      $s.="OR ";
      $s.="`ClassList` ";
      $s.="NOT IN";
      $s.="(";
      $s.=$str_listType.", ";
      $s.=$str_listExclude;
      $s.=") ";
      $s.=") ";
      $s.=";";                              
      $str_sql=$s;      

      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      
      $this->str_listClassExpand="";
      while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
          $str_listType="";
          //if rows are returned add each colum to the end of the list, and repeat with the expanded list
          $str_listExtend=$row["listExtend"];
          $str_listClass=$row["listClass"];        
          
          $str_value=$str_listExtend;        
          $arr_value = explode(",",$str_value);            
          $this->fn_addBracketArray($arr_value, "'");
          $str_value=implode(",", $arr_value);                  
          $bln_inStr=$this->fn_inStr(",'".$str_listExclude."',", ",".$str_value.",");                        
          if(!$bln_inStr){
            $str_listType.=$str_value.",";
          }
          
          $str_value=$str_listClass;                
          $arr_value = explode(",",$str_value);            
          $this->fn_addBracketArray($arr_value, "'");
          $str_value=implode(",", $arr_value);                            
          $bln_inStr=$this->fn_inStr(",'".$str_listExclude."',", ",".$str_value.",");                        
          if(!$bln_inStr){
            $str_listType.=$str_value.",";
          }
          if(!empty($str_listType)){
            $this->str_listClassExpand.=$str_listType;                        
          }
          
        
      }           
      $this->str_listClassExpand=trim($this->str_listClassExpand, ",");      
    }

    function fn_cleanArray($arr_ToClean){  
      
      //START Clean Array
      $arr_Clean=[];
      $str_Seen="notset,";
      foreach ($arr_ToClean as $str_ToClean) {                
        $str_Clean = trim(preg_replace('/["\']/', "", $str_ToClean));//replace single and double quotes , and trims                                     
        $bln_inStr=$this->fn_inStr(",".$str_Seen.",", ",".$str_Clean.",");                        
        if($bln_inStr){          
          continue;
        }                        
        $str_Seen.=$str_Clean.",";
        array_push($arr_Clean, $str_Clean);        
      }
      return  array_filter($arr_Clean);//remove any empties              
      //END Clean Array
    }
    function fn_dedupeArray($arr_ToClean){  
      
      //START Clean Array
      $arr_Clean=[];
      $str_Seen="";
      foreach ($arr_ToClean as $str_ToClean) {                
        $str_Clean = trim($str_ToClean);//replace single and double quotes , and trims                                     
        $bln_inStr=$this->fn_inStr(",".$str_Seen.",", ",".$str_Clean.",");                        
        if($bln_inStr){          
          continue;
        }                        
        $str_Seen.=$str_Clean.",";
        array_push($arr_Clean, $str_Clean);        
      }
      return  array_filter($arr_Clean);//remove any empties              
      //END Clean Array
    }

    function fn_getPaletteComponentListType($str_listId){  
      
      if(empty($str_listId)){return;}      
      $str_listType="";      
      $str_sql="SELECT concat(\"'\", group_concat(`Type` SEPARATOR \"','\"), \"'\")  as `listType` FROM component where Id IN($str_listId);";                              
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch(); 
      if($row){$str_listType=$row["listType"];}         
      $this->str_listPaletteComponentType=$str_listType;      
    }

    function fn_getInstanceLinkList($str_list){

      $this->str_InstanceLinkList="";
      $this->fn_getInstanceLinkListRecursive($str_list);            
      $arr_Clean=$this->fn_cleanArray(explode(",", $this->str_InstanceLinkList));                  
      $str_list=implode(",", $arr_Clean);      
      return $str_list;      
    }
    function fn_getInstanceLinkListRecursive($str_list){

      $arr_list=$this->fn_cleanArray(explode(",", $str_list));
      foreach ($arr_list as $str_type) {  

        if($str_type==="notset"){continue;}                
        $this->str_InstanceLinkList.=$str_type.",";   

        $str_sql="SELECT Concat(`Extend`, ',', `ClassList`) AS `listExtend` FROM `component` WHERE `Type`=?;";                              
        $stmt = $this->pdo->prepare($str_sql);
        $stmt->execute([$str_type]);              
        $row=$stmt->fetch();            
        if($row){                
          $str_column_value=$row["listExtend"];              
          if(!empty($str_column_value)){        
            $this->str_InstanceLinkList=$str_column_value.",".$this->str_InstanceLinkList;
            $this->fn_getInstanceLinkListRecursive($str_column_value);                              
          }
        }              
      }                  
    }
    
    function fn_addBracketArray(&$arr_item, $str_bracket){

      foreach ($arr_item as &$str_item) {
        $str_item=$str_bracket.trim($str_item).$str_bracket;
      }
    }

    function fn_compileComponentCodeLinks($int_id_record){      

      

      //set default values            
      $this->str_listPaletteComponentType="";
      $this->str_listInstanceLinkExtend="";      
      $this->str_listClassExpand="";
      //set default values
      
      $str_code="";        
      $str_listClass="";
      $str_listCodeClass="//START XTRA CLASSES".PHP_EOL;                  
      

      //$this->fn_addEcho("int_id_record: ".$int_id_record);      
      
      //START Get List of Component Ids listed to be written to the browser.
      //important also generates component map      
      $str_listId=$this->fn_getPaletteComponentListId($int_id_record);            
      if($this->bln_debug){$this->fn_addEcho("xxx str_listId: ".$str_listId);}
      //END  Get List of Component Ids listed to be written to the browser.                  
      
      //START get LIST OF XTRA CLASSES
      $this->fn_getPaletteComponentListType($str_listId);                                    
      //$this->fn_addEcho("xxx str_listPaletteComponentType: ".$this->str_listPaletteComponentType);      
      //END get LIST OF XTRA CLASSES        

      
      //START get LIST OF XTRA CLASSES            
      $this->fn_getPaletteComponentListExpand($this->str_listPaletteComponentType);                                    
      $arr_listClassExpand=$this->fn_dedupeArray(explode(",", $this->str_listClassExpand));                  
      $this->str_listClassExpand=implode(",", $arr_listClassExpand);                        
      //END get LIST OF XTRA CLASSES 

      $str_list1=$this->str_listPaletteComponentType;
      $str_list2=$this->str_listClassExpand;
      $str_listDependent=$this->fn_getInstanceLinkList($str_list2.",".$str_list1);                  ;
      
      $str_listClass=$str_listDependent;
      $str_listClass=trim($str_listClass, ',');      
      $arr_listClass=explode(",",$str_listClass);//grab list of child instance ids      
      //$arr_listClass=array_reverse($arr_listClass); 
      $arr_listClass=$this->fn_cleanArray($arr_listClass);                  
      $str_listClass=implode(",", $arr_listClass);                  
      $this->str_listClassExpand=$str_listClass;

      
      
      //START RETRIEVE CLASSES IN ORDER FROM XTRA CLASS LIST         
      foreach ($arr_listClass as $str_nameClass) {                
        //$this->fn_addEcho("AAA str_nameClass ".$str_nameClass);                                 

        $str_sql="SELECT `id` as `recordId`, `Type` as `recordType`, `Code` as  `recordCode` FROM `component` WHERE `Type`=?;";                            
        //dont use protected here as it will be too restrictive
        $stmt = $this->pdo->prepare($str_sql);        
        $stmt->execute([$str_nameClass]);
        $row=$stmt->fetch();      
        
        if($row){
          $str_recordId=$row["recordId"];   
          $str_recordType=$row["recordType"];                       

          $str_recordCode=$this->fn_formatComponentCodeBlock($str_recordId, $str_recordType, $row["recordCode"]);
          $str_listCodeClass.=$str_recordCode;//add to the lcode block list to add to the return code value at the end of this function
          
          //remove any existing entries with same record id
          //if this is not done , its possible to get adiditonaly classes added twice, which will error
          //also it wont be possible to change order of named classes , should they be pallett items          
          $str_listId = str_replace(",".$str_recordId.",", ",0,", ",".$str_listId.","); 
          $str_listId =trim($str_listId, ",");          
          //Very important, as we have set the ids to zero, they will non longer be added to the component map as part of the $str_listId
          //this step adds them to the array independently of the usual funciton fn_getComponentCodeFromListId
          array_push($this->arr_ComponentMap, $str_recordType);               
        } 
        
      } 
      //END RETRIEVE CLASSES IN ORDER FROM XTRA CLASS LIST
      
      $str_listCodeClass.="//END XTRA CLASSES".PHP_EOL;   
      
      $str_code="";      
      if(!empty($str_listId)){
        $str_code.=$this->fn_getComponentCodeFromListId($str_listId, $this->arr_ComponentMap);//get standard pallet class blocks  
      }      
      if(!empty($str_listCodeClass)){
        $str_code.=PHP_EOL.PHP_EOL.$str_listCodeClass.PHP_EOL.PHP_EOL;//tack on ou additional class blocks
      }
      return $str_code;
    }

    

    function fn_addEchoArray($str_title, $arr){      
      $int_count=0;      
      $this->fn_addEcho($str_title);
      foreach ($arr as &$str_value) {          
          $this->fn_addEcho($int_count.": ".$str_value);
          $int_count++;
      }
      
    }

    function fn_getComponentCodeFromListId($str_listRecord, &$arr_listRecord){
      //Note: &$arr_listRecord is passed by reference
      
      $str_listCode="";

      if(empty($str_listRecord)){
        return  $str_listCode;
      }      
      
      $str_sql="SELECT DISTINCT * FROM `component` WHERE `id` IN($str_listRecord) ;";            
      if($this->bln_debug){$this->fn_addEcho("str_sql: ".$str_sql);}      
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $str_listCode=PHP_EOL;      
      
      while($row=$stmt->fetch()){               
        $int_idRecord=$row["id"];              
        $str_type=$row["Type"];      
        $str_code=$row["Code"];          
        /*
        $this->fn_addEcho("int_idRecord: ". $int_idRecord);
        $this->fn_addEcho("str_type: ". $str_type);
        $this->fn_addEcho("str_code: ". $str_code);
        //*/
        $str_listCode.=$this->fn_formatComponentCodeBlock($int_idRecord, $str_type, $str_code);
        
        
        array_push($arr_listRecord, $str_type);
      }
      
      return  $str_listCode;
    }   

    function fn_formatComponentCodeBlock($int_idRecord, $str_type, $str_code){

      $str_codeBlock="".PHP_EOL;
      $str_codeBlock.="/*START COMPONENT//*/".PHP_EOL;
      $str_codeBlock.="/*id: ".$int_idRecord."//*/".PHP_EOL;
      $str_codeBlock.="/*type: ".$str_type."//*/".PHP_EOL;        
      $str_codeBlock.=$str_code.PHP_EOL;        
      $str_codeBlock.="/*id: ".$int_idRecord."//*/".PHP_EOL;
      $str_codeBlock.="/*type: ".$str_type."//*/".PHP_EOL;        
      $str_codeBlock.="/*END COMPONENT//*/".PHP_EOL;
      $str_codeBlock.=PHP_EOL;

      return  $str_codeBlock;
    }
    

    function fn_updateProjectFileWithjsonObject($int_id_record, $bln_version){     
      
      $str_code="";      
      $str_listRecord="";

      

      $str_code="";      
      $str_sql="SELECT group_concat(distinct LinkDependentId) as `list` FROM `instancelink` WHERE `InstanceId`='$int_id_record';";      
      //$this->fn_addEcho($str_sql);      
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();      
      if($row){
        $str_listRecord=$row["list"];                            
      }
      else{
        //$this->fn_addEcho("NO CODE FOUND");
      }

      //$str_listRecord.=",".$int_id_record;//add reference to self
      
      
      $arr_listRecord=[];
      $str_code_json=$this->fn_getInstanceSerializeFromListId($str_listRecord, $arr_listRecord);

      $str_listCodeStart="";
      $str_listCodeStart.=PHP_EOL;
      $str_listCodeStart.="/*START INSTANCE JSON MAP//*/".PHP_EOL;        
      $str_listCodeStart.="var obj_InstanceJSONMap = new Map([".PHP_EOL;

      $str_listCodeEnd="";
      $str_listCodeEnd.="]);".PHP_EOL;
      $str_listCodeEnd.="/*END INSTANCE JSON MAP//*/".PHP_EOL;

      $str_code.=$str_listCodeStart;
      if($bln_version){
        //$str_code.=$str_code_json;      
      }
      $str_code.=$str_code_json;      
      $str_code.=$str_listCodeEnd;      

      return $str_code;
     }     

     function fn_getInstanceSerializeFromListId($str_listRecord, &$arr_listRecord){
      //Note: &$arr_listRecord is passed by reference
      
      $str_listCode="";

      if(empty($str_listRecord)){
        return  $str_listCode;
      }      
      
      $str_sql="SELECT * FROM `instance` WHERE `id` IN($str_listRecord) ;";
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo->prepare($str_sql);
      $stmt->execute();      
      $str_listCode=PHP_EOL;      

      while($row=$stmt->fetch()){               
        $int_idRecord=$row["id"];              
        $str_type=$row["Type"];      
        $str_code=$row["Serialize"];         
        /*
        $this->fn_addEcho("int_idRecord: ". $int_idRecord);
        $this->fn_addEcho("str_type: ". $str_type);
        $this->fn_addEcho("str_code: ". $str_code);
        //*/

        
        $str_listCode.="[".$int_idRecord.", ".$str_code."],".PHP_EOL;        
        array_push($arr_listRecord, $str_type);
      }

      $str_listCode=trim($str_listCode);//remove whitespace
      $str_listCode=substr($str_listCode, 0, -1);//trim trailing comma      
      $str_listCode.=PHP_EOL;//re-add  new line
      
      return  $str_listCode;
    }

    function fn_getComponentMap(){

      $str_code="";
      
      //Now have a list of all 

      $arr_list=$this->arr_ComponentMap;
      
      $str_map="";
      $str_map.="//START AUTO GENERATED COMPONENT MAP".PHP_EOL;
      $str_map.="const obj_ComponentMap = new Map([";        
      $arr_length = count($arr_list);        
      for($i=0;$i<$arr_length;$i++)
      {        
        $str_val=$arr_list[$i];                
        //$str_key=strtolower($str_val);
        $str_key=$str_val;
        $str_map.="['$str_key', $str_val],";
      }
      $str_map = rtrim($str_map, ',');
      $str_map.="]);".PHP_EOL;        
      $str_map.="//END AUTO GENERATED MAP".PHP_EOL;
      //$this->fn_addEcho("str_map: ".$str_map);

      $str_code.=$str_map;
      
      
      return $str_code;
    }
    

    function fn_updateTemplateFile($str_name_file_xdesign, $int_id_record, $str_nameTargetClass){     
      
  
      $str_code = file_get_contents($str_name_file_xdesign);  
      
      $str_search="{int_idRecord}";
      $str_replace=$int_id_record;
      $str_code = str_replace($str_search, $str_replace, $str_code);
    
      $str_search="{str_nameTargetClass}";
      $str_replace=$str_nameTargetClass;
      $str_code = str_replace($str_search, $str_replace, $str_code);
    
      if(!empty($str_code)){file_put_contents($str_name_file_xdesign, $str_code);}
      //END Write Record
     
     }     
     function fn_updateIndexFileVersion($str_name_file_xdesign_version, $str_search){     
      
  
      $str_code = file_get_contents($str_name_file_xdesign_version);        
      
      $str_replace=$this->str_name_file_xdesign_version;
      
      
      $str_code = str_replace($str_search, $str_replace, $str_code);         
    
      if(!empty($str_code)){file_put_contents($str_name_file_xdesign_version, $str_code);}
      //END Write Version Record
     
     }     
    function fn_getComponentCodeFromDBType($str_type){

      $str_code="";            
      
      $str_sql="SELECT group_concat(Id) as `list` FROM `component` WHERE `Type`='$str_type';";      
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo->prepare($str_sql);      
      $stmt->execute();      
      
      $row=$stmt->fetch();      
      if($row){
        $str_list=$row["list"];                    
      }
      else{        
        //$this->fn_addEcho("NO CODE FOUND");
      }
      
      if(!empty($str_list)){
        $arr_list=[];                      
        $str_code=$this->fn_getComponentCodeFromListId($str_list, $arr_list);                          
      }
      
      return $str_code;
    }    
    
    function fn_copyFile($str_path_file_source, $str_path_file_destination){
      copy($str_path_file_source, $str_path_file_destination);
    }
  
    function fn_get_intBool($foo_val){
      
      $int_val=1; 
      if(empty($foo_val)){$int_val=0;}                   
      switch ($foo_val) {                                  
        case "no":          
          break;  
        case "false":          
          $int_val=0;          
          break;            
        case false:          
          $int_val=0;          
          break;            
        case 0:
          $int_val=0;          
          break;        
        case "0":
          $int_val=0;          
          break;        
      }              
      return $int_val;
    }
    function fn_inStr($str_haystack, $str_search){
      $int_pos=strpos($str_haystack, $str_search);   
      if($int_pos===false){return false;}        
      return true;
    }

    function fn_removePreviousBuilds($str_path_folder){      
      
      //$this->fn_addEcho("str_path_folder: ".$str_path_folder);                                
      $obj_folder=scandir($str_path_folder);
      foreach ($obj_folder as &$str_name_file) {   
        //if(!is_dir($str_name_file)){continue;}
        //$this->fn_addEcho("str_name_file: ".$str_name_file);
        $pattern = "/^xdesigner-x.*/i";            
        $bln_match=preg_match($pattern, $str_name_file); // Outputs 1 or 0        
        if($bln_match){          
          $str_path_file=$str_path_folder."/".$str_name_file;
          //$this->fn_addEcho("str_path_file: ".$str_path_file);
          $this->fn_unlinkFile($str_path_file);        
        }
        
      } 
    }    

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////


function fn_XDesigner_setPalettePinStatus($int_id_record, $bln_status){                
      
  $int_status=0;
  if($bln_status){$int_status=1;}
  
  $str_sql="UPDATE `instance` SET PalettePin =$int_status WHERE `id`=$int_id_record;";
  //$this->fn_addEcho("pin str_sql: ".$str_sql);
  $stmt = $this->pdo->prepare($str_sql);
  $stmt->execute();
}
function fn_XDesigner_setHiddenPalettePinStatus($int_id_record, $bln_status){                
      
  $int_status=0;
  if($bln_status){$int_status=1;}
  
  $str_sql="UPDATE `instance` SET HiddenPalettePin =$int_status WHERE `id`=$int_id_record;";
  //$this->fn_addEcho("pin str_sql: ".$str_sql);
  $stmt = $this->pdo->prepare($str_sql);
  $stmt->execute();
}


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//////////COMPILE////////////////  


function fn_XDesigner_move(){
  
  if($this->bln_debug){$this->fn_addEcho("fn_XDesigner_move");}

  $int_idRecord=$this->int_idRecordXDesign;
  $str_nameRecordXDesign=$this->str_nameRecordXDesign;
  $str_pattern=$str_nameRecordXDesign."-".$this->xdesign_version_identifier."-";                  
  
  $str_path_folder=$this->fn_getfolderpathInstanceVersion($int_idRecord);              
  $str_path_folder_first=$this->fn_getFirstFolder($str_path_folder);    

  $str_path_source=$str_path_folder_first;
  $str_path_destination=$this->str_path_document_root;    
  
  $this->fn_XDesigner_maintainVersionDestination($str_path_destination, $str_pattern);

  $this->fn_copyFolderLevel($str_path_source, $str_path_destination);    
}

function fn_XDesigner_maintainVersionDestination($str_path_folder, $str_pattern=""){

  if(empty($str_pattern)){    //dont create folder etc if empty code
    $str_pattern=$this->xdesign_module_basename;    
  }
  
  $str_path_file=$str_path_folder."/"."index.html";        
  $this->fn_deleteFile($str_path_file);

  foreach (new DirectoryIterator($str_path_folder) as $fileInfo) {
    if ($fileInfo->isDot()) {
      continue;
    }     
      
    $str_file_extension=$fileInfo->getExtension();          
    
    if($str_file_extension==="mjs"){
      //$this->fn_addEcho("str_file_extension: ".$str_file_extension);           
      $str_name_file=$fileInfo->getFilename();            
      $str_path_file=$fileInfo->getPathname();              
      $bln_inStr=$this->fn_inStr($str_name_file, $str_pattern);          
      if($bln_inStr){        
        $this->fn_deleteFile($str_path_file);        
      }    
    }
  }
}


function fn_deleteFolderTree($dir) {

  if(!file_exists($dir)){return false;}
  if(!is_dir($dir)){return false;}

  $files = array_diff(scandir($dir), array('.','..'));
   foreach ($files as $file) {
     (is_dir("$dir/$file")) ? $this->fn_deleteFolderTree("$dir/$file") : unlink("$dir/$file");
   }
   return rmdir($dir);
 } 

function fn_releaseComponent($int_idRecord, $str_nameRelease){  
  
  $this->str_path_folder_version=$this->fn_getfolderpathInstanceVersion($int_idRecord); 
  $this->str_path_folder_version_source=$this->fn_getFirstFolder($this->str_path_folder_version);        
  $this->str_name_folder_version_source=basename($this->str_path_folder_version_source);  

  $this->fn_createFolder($this->str_path_folder_release);
  $this->str_path_folder_release_application=$this->str_path_folder_release."/".$str_nameRelease;
  $this->fn_createFolder($this->str_path_folder_release_application);  

  $this->str_path_folder_release_target_number=$this->str_path_folder_release_application."/".$this->str_name_folder_version_source;  
  $this->str_path_folder_release_target_hot=$this->str_path_folder_release_application."/".$this->str_name_folder_release_hot;            

  $this->str_path_folder_release_target=$this->str_path_folder_release_target_hot;    
  $this->fn_deleteFolderTree($this->str_path_folder_release_target);    
  //$this->fn_XDesigner_create_path_release($int_idRecord, $str_nameRelease);

  $this->str_path_folder_release_target=$this->str_path_folder_release_target_number;    
  $this->fn_deleteFolderTree($this->str_path_folder_release_target);    
  $this->fn_XDesigner_create_path_release($int_idRecord, $str_nameRelease);
}

function fn_XDesigner_create_path_release($int_idRecord, $str_nameRelease){  
  
  $this->fn_deleteFolderTree($this->str_path_folder_release_target);    
  $this->fn_createFolder($this->str_path_folder_release_target);  
  $str_path_source=$this->str_path_folder_version_source;  
  $str_path_destination=$this->str_path_folder_release_target;  
  $this->fn_copyFolderLevel($str_path_source, $str_path_destination); 

  $this->fn_XDesigner_create_path_release_app();
  $this->fn_XDesigner_create_path_release_app_asset();      
  $this->fn_XDesigner_create_path_release_app_resource();      
  $this->fn_XDesigner_create_path_release_app_server();  
  
}




function fn_XDesigner_create_path_release_app(){

  $this->str_path_folder_release_app=$this->str_path_folder_release_target."/".$this->str_name_folder_user;
  $this->fn_createFolder($this->str_path_folder_release_app);
}

function fn_XDesigner_create_path_release_app_asset(){  
  
  $this->str_path_folder_release_app_asset=$this->str_path_folder_release_app."/".$this->str_name_folder_asset;
  $this->fn_createFolder($this->str_path_folder_release_app_asset);

  $str_path_source=$this->str_path_folder_user_asset;  
  $str_path_destination=$this->str_path_folder_release_app_asset;
  $this->fn_copyFolderLevel($str_path_source, $str_path_destination);       
}

function fn_XDesigner_create_path_release_app_resource(){  

  
  $this->str_path_folder_release_app_resource=$this->str_path_folder_release_app."/".$this->str_name_folder_resource;
  $this->fn_createFolder($this->str_path_folder_release_app_resource);

  $str_path_source=$this->str_path_folder_user_resource;  
  $str_path_destination=$this->str_path_folder_release_app_resource;
  $this->fn_copyFolderLevel($str_path_source, $str_path_destination);      
  
}



function fn_XDesigner_create_path_release_app_server(){
  
  $this->str_path_folder_release_app_server=$this->str_path_folder_release_app."/".$this->str_name_folder_server;  
  $this->fn_createFolder($this->str_path_folder_release_app_server);

  $str_path_source=$this->str_path_folder_user_server;  
  $str_path_destination=$this->str_path_folder_release_app_server;
  $this->fn_copyFolderLevel($str_path_source, $str_path_destination);      
}





function fn_getFileExtension($path) {
  $qpos = strpos($path, "?");
  if ($qpos!==false) $path = substr($path, 0, $qpos);
 
  $extension = pathinfo($path, PATHINFO_EXTENSION);

  return $extension;
} 


function fn_copyFolderLevelOld($srcDir, $destDir){//run via action      
  if (file_exists($destDir)) {
    if (is_dir($destDir)) {
      if (is_writable($destDir)) {
        if ($handle = opendir($srcDir)) {
          while (false !== ($file = readdir($handle))) {
            if (is_file($srcDir . '/' . $file)) {
              copy($srcDir . '/' . $file, $destDir . '/' . $file);
            }
          }
          closedir($handle);
        } else {
          $this->fn_addEcho("srcDir could not be opened: ".$srcDir);             
        }
      } else {
        $this->fn_addEcho("destDir is not writable!: ".$destDir);           
      }
    } else {
      $this->fn_addEcho("destDir is not directory!: ".$destDir);         
    }
  } else {
    $this->fn_addEcho("destDir does not exist!: ".$destDir);       
  }
  }

  /*
  **
 * Copy a file, or recursively copy a folder and its contents
 *
 * @author      Aidan Lister <aidan@php.net>
 * @version     1.0.1
 * @link        http://aidanlister.com/2004/04/recursively-copying-directories-in-php/
 * @param       string   $source    Source path
 * @param       string   $dest      Destination path
 * @return      bool     Returns TRUE on success, FALSE on failure
 */

function fn_copyFolderLevel($source, $dest, $bln_recur=true)
{
    // Check for symlinks

    if (is_link($source)) {
        return symlink(readlink($source), $dest);
    }
    
    // Simple copy for a file

    if (is_file($source)) {
        return copy($source, $dest);
    }

    // Make destination directory

    if (!is_dir($dest)) {
        mkdir($dest);
    }

    // Loop through the folder

    $dir = dir($source);
    while (false !== $entry = $dir->read()) {
        // Skip pointers

        if ($entry == '.' || $entry == '..') {
            continue;
        }

        // Deep copy directories

        
        if($bln_recur){
          $this->fn_copyFolderLevel("$source/$entry", "$dest/$entry", $bln_recur);
        }
        
        
    }

    // Clean up

    $dir->close();
    return true;
}


function fn_XDesigner_maintain(){

  $this->fn_addEcho("fn_XDesigner_maintain");   

    
    $obj_post=$this->obj_post;           
    
    $str_sql="DELETE FROM `maintainlink`"; //future where userid =x
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();      
    
    $str_sql="UPDATE `instance` SET MaintainStatus=0";            
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();           

    $str_sql="UPDATE `instance` SET MaintainStatus=1 WHERE (ProjectPin OR HiddenProjectPin OR PalettePin OR HiddenPalettePin)";            
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();
    
    $str_sql="SELECT `id` As `int_idRecord` FROM `instance` WHERE MaintainStatus;";            
    $this->fn_addEcho("MaintainStatus str_list: ".$str_sql);
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();   
    
    while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
      
      $int_idRecord=$row["int_idRecord"];        
      //---Insert List of Required Components into Link table
      $this->fn_createLinkTableEntries("maintainlink", $int_idRecord);//this is the complex dependent id function                                    
      //There is now a list of dependent entries in the link table      
    }  
    
    
    $str_list=$this->fn_getlistLinkTableEntries("maintainlink");
    //$this->fn_addEcho("str_list maintain: ".$str_list);    

    $str_sql="UPDATE `instance` SET MaintainStatus=1 WHERE id in($str_list)";            
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();    
    
    $str_sql = "SELECT GROUP_CONCAT(Id) as 'list' FROM `instance` WHERE !MaintainStatus;";
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();      
    $row=$stmt->fetch();            
    if($row){                
      $str_list=$row["list"];              
    }
    //$this->fn_addEcho("str_list archive: ".$str_list);    
    
    //N.B. Below instance_archive table must be recreated/updated following any column change to the original instance table. 
    $str_sql="INSERT INTO `instance_archive` SELECT * FROM `instance` WHERE Id NOT IN(SELECT LinkDependentId FROM `maintainlink`);"; //future where userid =x            
    $stmt = $this->pdo->prepare($str_sql);        
    $stmt->execute();      
    
    $str_sql="DELETE FROM `instance` WHERE MaintainStatus=0;";                
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();    

    $this->fn_removeOrphanFolderInstance();

    $str_sql="DELETE FROM `maintainlink`"; //future where userid =x
    $stmt = $this->pdo->prepare($str_sql);
    $stmt->execute();      
    
  }
  
function fn_XDesigner_compile(){

  //$this->fn_addEcho("fn_XDesigner_compile");    

  $this->filename_runtime="filename_runtime.js";        
  $this->filename_template="filename_template.js";
  $this->filename_designtime="filename_designtime.js";

  $this->str_folder_name_compile="compile";
  $this->str_folder_path_compile=$this->str_path_folder_user."/".$this->str_folder_name_compile;  
  
  $this->str_folder_name_runtime="runtime";
  $this->str_folder_path_runtime=$this->str_folder_path_compile."/".$this->str_folder_name_runtime;  
  $this->str_file_path_runtime=$this->str_folder_path_runtime."/".$this->filename_runtime;    

  $this->str_folder_name_template="runtime";
  $this->str_folder_path_template=$this->str_folder_path_compile."/".$this->str_folder_name_template;  
  $this->str_file_path_template=$this->str_folder_path_template."/".$this->filename_template;

  $this->str_folder_name_designtime="designtime";  
  $this->str_folder_path_designtime=$this->str_folder_path_compile."/".$this->str_folder_name_designtime;  
  $this->str_file_path_designtime=$this->str_folder_path_designtime."/".$this->filename_designtime;  
  
  
  $this->fn_XDesigner_compile_RunTimeFile();        
  $this->fn_XDesigner_compile_DesigntimeFile();       
  $this->fn_XDesigner_compile_TemplateFile();     
  
  $this->fn_XDesigner_transfer_RunTimeFile();          
  $this->fn_XDesigner_transfer_DesigntimeFile();     
  $this->fn_XDesigner_transfer_TemplateFile();       
  
}

function fn_XDesigner_transfer_RunTimeFile(){  

  $date_script=$this->date_script;

  //write runtime code from file to database        
  $str_code = file_get_contents($this->str_file_path_runtime);      
  $this->fn_XDesginer_transferFileToComponentTable($this->dbtype_runtime, "notset", "notset", $str_code, "notset", $date_script, $date_script);              

}
function fn_XDesigner_transfer_DesigntimeFile(){

  $date_script=$this->date_script;

    //write designtime code from file to database      
    $str_code = file_get_contents($this->str_file_path_designtime);      
    $this->fn_XDesginer_transferFileToComponentTable($this->dbtype_designtime, "notset", "notset",$str_code, "notset", $date_script, $date_script);              

}
function fn_XDesigner_transfer_TemplateFile(){

  $date_script=$this->date_script;
      
      //write template code from file to database      
      $str_code = file_get_contents($this->str_file_path_template);  
      $this->fn_XDesginer_transferFileToComponentTable($this->dbtype_template, "notset", "notset", $str_code, "notset", $date_script, $date_script);                    
}

function fn_XDesigner_compile_RunTimeFile(){
  
  $str_path=$this->str_folder_path_runtime."/";
  $arr_file=[
    //RunTime must be at the top of the file    
    
    $str_path."UserSettings.js",
    $str_path."Path.js",    
    $str_path."Shared.js",
    $str_path."LevelObject.js",
    $str_path."Holder.js",  
    $str_path."BaseObject.js",          
    $str_path."Component.js",    
    $str_path."AJAX.js",    
    $str_path."Tag.js",    
        
    $str_path."Debug.js",  
    $str_path."myJSON.js",        
    $str_path."Main.js"
    
    //RunTime must be at the top of the file
 ];
 $this->fn_XDesigner_concat_fileList($this->str_file_path_runtime, $arr_file);

}

function fn_XDesigner_compile_DesigntimeFile(){  
  
  $str_path=$this->str_folder_path_designtime."/";  
  
  $arr_file=[                  
    
    $str_path."DesignDelegate.js",    
    $str_path."DesignDelegateeazygrid.js",
    $str_path."DesignDelegateeazygriditem.js",
    $str_path."DesignDelegategrid.js",    
    $str_path."DesignDelegateProjectInstance.js",    
    $str_path."GlobalVariable.js"
  ];
  $this->fn_XDesigner_concat_fileList($this->str_file_path_designtime, $arr_file);
}

function fn_XDesigner_compile_TemplateFile(){  
  
  $str_path=$this->str_folder_path_template."/";  
  
  $arr_file=[      
    $str_path."Project.js"
  ];
  $this->fn_XDesigner_concat_fileList($this->str_file_path_template, $arr_file);
}
function fn_XDesigner_concat_fileList($str_file_target, $arr_list){  
  
  file_put_contents($str_file_target, "");            
  $arr_length = count($arr_list);        
  for($i=0;$i<$arr_length;$i++)
  {
    $str_pathFile=$arr_list[$i];
    $str_basename=basename($str_pathFile);
    $str_code="";
    $str_code.=PHP_EOL;
    $str_code.="//START ".$str_basename.PHP_EOL;    
    $str_code.=file_get_contents($str_pathFile).PHP_EOL;
    $str_code.="//END ".$str_basename.PHP_EOL;        
    $str_code.=PHP_EOL;
    file_put_contents($str_file_target, $str_code, FILE_APPEND);
  }
}

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
//////////BUILD/////////////////

function fn_XDesigner_set(){//run via action        

  $this->int_XDesigner_id_record=$this->fn_XDesigner_getProjectId();          
  $this->obj_post->RecordId=$this->int_XDesigner_id_record;
  $this->fn_setfolderpathProjectInstance();    
}



function fn_XDesigner_importAll(){
  
  $this->fn_importAll();    
}







function fn_XDesigner_updateFileToInstanceTable($int_idFixed, $str_dbname, $str_dbtype, $str_code){

  
  $int_id_record=$this->fn_XDesigner_dbTypeInstanceExist($int_idFixed, $str_dbtype);  

  //$int_id_record=0;  
  
  if($int_id_record==0){    
    $str_sql="INSERT INTO `instance` (`id`, `Name`, `Type`, `HiddenProjectPin`, `DependentId`, `Serialize`) SELECT ?, ?, ?, ?, ?, ?;";
    $stmt = $this->pdo->prepare($str_sql);    
    $stmt->execute([$int_idFixed, $str_dbname, $str_dbtype, "1", "", $str_code]);
    $int_idFixed=$this->fn_get_last_insert_id();
  }
  else{
    $str_sql="UPDATE `instance` SET `Serialize`=? WHERE `id`=?;";    
    $stmt = $this->pdo->prepare($str_sql);          
    $stmt->execute([$str_code, $int_id_record]);
  }  
  
  return $int_idFixed;
}  
function fn_XDesigner_dbTypeInstanceExist($int_idFixed, $str_dbtype){

  $str_sql="SELECT Id FROM `instance` WHERE Id=? AND Type =? ;";
  $stmt = $this->pdo->prepare($str_sql);        
  $stmt->execute([$int_idFixed, $str_dbtype]);
  $row=$stmt->fetch();        
  $int_id_record=0;  
  if($row){$int_id_record=$row["Id"];}
  return $int_id_record;  
}


function fn_XDesigner_debugBuildProject($obj_ini){

  /*
  $this->fn_addEcho("obj_ini->RecordId: ". $obj_ini->RecordId);
  $this->fn_addEcho("obj_ini->str_path_folder: ". $obj_ini->str_path_folder);  
  $this->fn_addEcho("obj_ini->bln_version: ". $obj_ini->bln_version);  
  $this->fn_addEcho("obj_ini->str_nameTargetClass: ". $obj_ini->str_nameTargetClass);
  //*/  

}

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////


function fn_importAll(){
  $this->fn_importComponentFiles();
  $this->fn_importInstanceFiles();
}

function fn_importComponentFiles(){
      
  //this->fn_addEcho("fn_importComponentFiles");

  //for each strname_component_folder in $this->str_path_folder_user_component;
  
  $arr_fobj = scandir($this->str_path_folder_user_component);
  
  foreach ($arr_fobj as $str_Type) {      
    $this->fn_importComponentFile($str_Type);
  }  
}

function fn_importComponentFile($str_Type){

  //$this->fn_addEcho("fn_importComponentFile");

  if($str_Type=="." || $str_Type==".."){
    return;
  }                  
  
  $str_path_folder=$this->fn_getfolderpathComponent($str_Type);      
  if(!is_dir($str_path_folder)){
    return;
  }

  $str_file_path=$this->fn_get_file_path_component($str_Type, "Extend");                  
  $str_Extend=$this->fn_getStringFromFile($str_file_path, "notset");            

  $str_file_path=$this->fn_get_file_path_component($str_Type, "ClassList");                  
  $str_ClassList=$this->fn_getStringFromFile($str_file_path, "notset");     
  
  $str_file_path=$this->fn_get_file_path_component($str_Type, "component.js");                  
  $str_Code=$this->fn_getStringFromFile($str_file_path, "");        

  $str_file_path=$this->fn_get_file_path_component($str_Type, "LocationID");                  
  $str_LocationID=$this->fn_getStringFromFile($str_file_path, "");        
  //$this->fn_addEcho("str_file_path: ".$str_file_path);
  //$this->fn_addEcho("str_LocationID: ".$str_LocationID);

  $str_file_path=$this->fn_get_file_path_component($str_Type, "CreatedDate");                    
  $str_CreatedDate=$this->fn_getStringFromFile($str_file_path, NULL);    

  $str_file_path=$this->fn_get_file_path_component($str_Type, "ModifiedDate");                      
  $str_ModifiedDate=$this->fn_getStringFromFile($str_file_path, NULL);              
  
  $this->fn_XDesginer_transferFileToComponentTable($str_Type, $str_Extend, $str_ClassList, $str_Code, $str_LocationID, $str_CreatedDate, $str_ModifiedDate);                  
}

function fn_exportComponentToFile($str_Type, $str_Extend, $str_ClassList, $str_Code, $str_LocationID, $str_CreatedDate, $str_ModifiedDate){      
  
  
  
  $str_content_file=$str_Code;
  if(empty($str_content_file)){    //dont create folder etc if empty code
    return;
  }
  
  
  $str_path_folder=$this->fn_getfolderpathComponent($str_Type);
  if(strtolower($str_Type)==="component"){
    return;
  }  
  
  if(!is_dir($str_path_folder)){
    $this->fn_createFolder($str_path_folder);    
    if(!is_dir($str_path_folder)){
      return;
    }            
  }
  

  
  $str_value=$str_Extend;  
  $str_path_file=$str_path_folder."/"."Extend";
  $this->fn_deleteFile($str_path_file);
  if($str_value!=="notset"){    
    file_put_contents($str_path_file, $str_value);                  
  }  

  $str_value=$str_ClassList;
  $str_path_file=$str_path_folder."/"."ClassList";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){    
    if($str_value!=="notset"){      
      file_put_contents($str_path_file, $str_value);                  
    }
  }  

  $str_file_path=$this->fn_get_file_path_component($str_Type, "component.js");                    
  $bln_exist=file_exists($str_file_path);  
  if(!$bln_exist){//If Folder does not exist        
    $str_value=$str_Code;
    if(!empty($str_value)){    
      $str_path_file=$str_path_folder."/"."component.js";
      file_put_contents($str_path_file, $str_value);
    }    
  }  
  
  
  $str_value=$str_LocationID;  
  $str_path_file=$str_path_folder."/"."LocationID";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value) && $str_value!=="notset"){//dont export default values      
    file_put_contents($str_path_file, $str_value); 
  }                   

  $str_value=$str_CreatedDate;
  $str_path_file=$str_path_folder."/"."CreatedDate";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_CreatedDate)){//dont export default values
    file_put_contents($str_path_file, $str_value); 
  }                   

  $str_value=$str_ModifiedDate;
  $str_path_file=$str_path_folder."/"."ModifiedDate";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_CreatedDate)){//dont export default values    
    file_put_contents($str_path_file, $str_value); 
  }                   

}



function fn_exportInstanceToFile($str_Name, $str_nameShortRecord, $str_Type, $int_ToggleProjectPin, $int_HiddenProjectPin, $int_ProjectPin, $int_PalettePin, $str_DependentId, $str_Serialize, $str_LocationID, $str_CreatedDate, $str_ModifiedDate, $int_idRecord){      
  
  $str_path_folder=$this->fn_getfolderpathInstance($int_idRecord);        
  if(!is_dir($str_path_folder)){
    $this->fn_createFolder($str_path_folder);    
    if(!is_dir($str_path_folder)){
      return;
    }            
  }

  $str_value=$str_Name;   
  $str_path_file=$str_path_folder."/"."Name";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){//dont export default values    
    file_put_contents($str_path_file, $str_value);                  
  }

  $str_value=$str_nameShortRecord;   
  $str_path_file=$str_path_folder."/"."NameShort";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){//dont export default values    
    file_put_contents($str_path_file, $str_value);                  
  }

  $str_value=$str_Type;    
  $str_path_file=$str_path_folder."/"."Type";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){//dont export default values    
    file_put_contents($str_path_file, $str_value);                  
  }

  $int_value=$int_ToggleProjectPin;      
  $str_path_file=$str_path_folder."/"."ToggleProjectPin";
  $this->fn_deleteFile($str_path_file);
  if($int_value){//dont export default values    
    file_put_contents($str_path_file, $int_value);                    
  }
  
  $int_value=$int_HiddenProjectPin;      
  $str_path_file=$str_path_folder."/"."HiddenProjectPin";
  $this->fn_deleteFile($str_path_file);
  if($int_value){//dont export default values    
    file_put_contents($str_path_file, $int_value);                    
  }  

  $int_value=$int_ProjectPin;      
  $str_path_file=$str_path_folder."/"."ProjectPin";
  $this->fn_deleteFile($str_path_file);
  if($int_value){//dont export default values    
    file_put_contents($str_path_file, $int_value);                    
  }
  
  $int_value=$int_PalettePin;
  $str_path_file=$str_path_folder."/"."PalettePin";
  $this->fn_deleteFile($str_path_file);
  if($int_value){//dont export default values    
    file_put_contents($str_path_file, $int_value);                    
  }

  $str_value=$str_DependentId;
  $str_path_file=$str_path_folder."/"."DependentId";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){//dont export default values    
    file_put_contents($str_path_file, $str_value); 
  }                   

  $str_value=$str_Serialize;      
  $str_path_file=$str_path_folder."/"."Serialize";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value) && $str_value!=="{}"){//dont export default values      
    file_put_contents($str_path_file, $str_value);                      
  }

  $str_value=$str_LocationID;  
  $str_path_file=$str_path_folder."/"."LocationID";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value) && $str_value!=="notset"){//dont export default values      
    file_put_contents($str_path_file, $str_value); 
  }                   

  $str_value=$str_CreatedDate;
  $str_path_file=$str_path_folder."/"."CreatedDate";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_CreatedDate)){//dont export default values
    file_put_contents($str_path_file, $str_value); 
  }                   

  $str_value=$str_ModifiedDate;
  $str_path_file=$str_path_folder."/"."ModifiedDate";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_CreatedDate)){//dont export default values    
    file_put_contents($str_path_file, $str_value); 
  }                   

  //$str_LocationID, $str_CreatedDate, $str_ModifiedDate
  //*/
}

function fn_XDesginer_transferFileToComponentTable($str_dbtype, $str_typeExtend, $str_ClassList, $str_code, $str_LocationID, $str_CreatedDate, $str_ModifiedDate){        

  
  //$this->fn_addEcho("fn_XDesginer_transferFileToComponentTable");  
  
  $str_sql="DELETE FROM `component` WHERE `Type`=?";
  //$this->fn_addEcho("str_sql: ".$str_sql);
  $stmt = $this->pdo->prepare($str_sql);  
  $stmt->execute([$str_dbtype]);  
  
  $str_sql="INSERT INTO `component` (`Type`, `Extend`, `ClassList`, `Code`, `LocationID`, `CreatedDate`, `ModifiedDate`) SELECT ?, ?, ?, ?, ?, ?, ?;";    
  $stmt = $this->pdo->prepare($str_sql);
  $stmt->execute([$str_dbtype, $str_typeExtend, $str_ClassList, $str_code, $str_LocationID, $str_CreatedDate, $str_ModifiedDate]);
  
}   


function fn_removeBuildFolderInstance(){

  
  //for each strname_instance_folder in $this->str_path_folder_user_instance;
  $arr_fobj = scandir($this->str_path_folder_user_instance);
  
  foreach ($arr_fobj as $str_name) {  
    if($str_name=="." || $str_name==".."){
      continue;
    }                  

    $int_idRecord=$str_name;
    
    $str_path=$this->fn_getfolderpathInstanceBuild($int_idRecord);      
    if(!is_dir($str_path)){
      continue;
    }    

    $this->fn_deleteFolderTree($str_path);                 
  }
}

private function isEmptyDir($dir)
{
    $iterator = new FilesystemIterator($dir);
    $isDirEmpty = !$iterator->valid();
    return $isDirEmpty;
}

function fn_emptyFolder($folderName, $int_seconds=false){
  
  //only used by backup currently, for the timing funciton
  //not sure wehter delete file will delete any hidden files

  //Provide $int_seconds to only delete objects older than int_seconds
  //otherwise set to 0 or leave blank to delete all files
  
  $int_count=0;
  foreach (new DirectoryIterator($folderName) as $fileInfo) {
    if ($fileInfo->isDot()) {
    continue;
    }  
    $bln_delete=true;
    if($int_seconds){
      $calcPeriod=time() - $fileInfo->getCTime();                
      $bln_delete=false;
      if ($calcPeriod >= $int_seconds) {$bln_delete=true;}
    }
    
    //$this->fn_addEcho("calcPeriod: ".$calcPeriod);
    if ($bln_delete) {              
      $int_count++;        
      $str_path=$fileInfo->getPathname();      
      //$this->fn_addEcho("str_path: ".$str_path);
      if(is_dir($str_path)){       
        $this->fn_deleteFolderTree($str_path);
      }
      else {        
        $this->fn_deleteFile($str_path);        
      }          
    } 
  
  }
  //$this->fn_addEcho("folder emptied count: ".$int_count);
}

function fn_deleteFile($str_path){      
  if(!file_exists($str_path)){return false;}
  if(!is_file($str_path)){return false;}  
  return $this->fn_unlinkFile($str_path);
}
function fn_deleteHidden($str_path){        
  unlink($str_path);
}
function fn_unlinkFile($filename){      
  if(file_exists($filename)){unlink($filename);}
}


function fn_getFirstFolder($folderName){
  
  $int_count=0;
  foreach (new DirectoryIterator($folderName) as $fileInfo) {
    if ($fileInfo->isDot()) {
    continue;
    } 
    $str_path=$fileInfo->getPathname();      
    if(is_dir($str_path)){               
      return $str_path;
    }
  }
  //$this->fn_addEcho("folder emptied count: ".$int_count);
}

function fn_XDesigner_createBackup(){  
  
  $str_name=$this->fn_getUniqueName();  
  $str_path_source=$this->str_path_document_root;
  $str_path_destination=$this->str_path_folder_site_backup."/".$str_name;      
  //$this->rcopy($str_path_folder_source, $str_path_folder_destination);
  $this->fn_copyFolderLevel($str_path_source, $str_path_destination);  
}

function fn_backupFolder($str_path_folder_source){
  
  /*
  $this->fn_createFolder($this->str_path_folder_user_backup);
  $this->fn_emptyFolder($this->str_path_folder_user_backup, 600);
  $str_name=$this->fn_getUniqueName();
  $str_path=$this->str_path_folder_user_backup."/".$str_name;  
  $str_path_folder_destination=$str_path;    
  $this->rcopy($str_path_folder_source, $str_path_folder_destination);
  //*/
}

function fn_removeOrphanFolderInstance(){

  $this->fn_backupFolder($this->str_path_folder_user_instance);  

  

  $arr_fobj = scandir($this->str_path_folder_user_instance);
  
  foreach ($arr_fobj as $str_name) {  
    if($str_name=="." || $str_name==".."){
      continue;
    }

    $int_idRecord=$str_name;

    $this->fn_removeOrphanFolder($int_idRecord);    
    
  }

  //$this->fn_addEcho("fn_removeOrphanFolderInstance complete");        
}

function fn_removeOrphanFolder($int_idRecord){
  
  $str_path=$this->str_path_folder_user_instance."/".$int_idRecord;  

    if(!is_dir($str_path)){
      return;
    }
    
    if($int_idRecord==="0"){
      return;
    }

    $bln_exist=$this->fn_existInstance($int_idRecord);
    if(!$bln_exist){      
      $this->fn_deleteFolderTree($str_path);
    }
}
    
function fn_importInstanceFiles(){
  
  
  //NB Under no circumstances run fn_removeOrphanFolderInstance, here. 
  //That would mean foldres cannot be imported which have been erroneously deleted from the db!
  $this->fn_removeBuildFolderInstance();
  
  //for each strname_instance_folder in $this->str_path_folder_user_instance;
  $arr_fobj = scandir($this->str_path_folder_user_instance);
  
  foreach ($arr_fobj as $str_name) {  
    if($str_name=="." || $str_name==".."){
      continue;
    }
                    
    $str_path=$this->str_path_folder_user_instance."/".$str_name;
    if(!is_dir($str_path)){
      continue;
    }
    
    $int_idRecord=$str_name;
    //$this->fn_addEcho("int_idRecord: ".$int_idRecord);        

    if($int_idRecord==="0"){
      continue;
    }
      
      
    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "Name");        
    $str_Name=$this->fn_getStringFromFile($str_file_path, "");


    
    if($str_Name===""){//N.B does not contain an import file                    
      continue;
    }
    
    
    
    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "Type");        
    $str_Type=$this->fn_getStringFromFile($str_file_path, "Tag");        
    
    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "DependentId");        
    $str_DependentId=$this->fn_getStringFromFile($str_file_path,"");

    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "ProjectPin");        
    $bln_ProjectPin=$this->fn_getBooleanFromFile($str_file_path, "0");

    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "HiddenProjectPin");        
    $bln_HiddenProjectPin=$this->fn_getBooleanFromFile($str_file_path, "0");

    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "PalettePin");                
    $bln_PalettePin=$this->fn_getBooleanFromFile($str_file_path, "0");                    

    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "HiddenPalettePin");                        
    $bln_HiddenPalettePin=$this->fn_getBooleanFromFile($str_file_path, "0");        
    
    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "Serialize");                
    $str_Serialize=$this->fn_getStringFromFile($str_file_path, "{}");

    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "ToggleProjectPin");                
    $bln_ToggleProjectPin=$this->fn_getBooleanFromFile($str_file_path, "0");
    
    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "LocationID");                
    $str_LocationID=$this->fn_getStringFromFile($str_file_path, "");    

    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "CreatedDate");                
    $str_CreatedDate=$this->fn_getStringFromFile($str_file_path, NULL);    

    $str_file_path=$this->fn_get_file_path_instance_Column($int_idRecord, "ModifiedDate");                
    $str_ModifiedDate=$this->fn_getStringFromFile($str_file_path, NULL);          
    
    $this->fn_XDesginer_transferFileToInstanceTable($int_idRecord, $str_Name, $str_Type, $str_DependentId, $bln_ProjectPin, $bln_HiddenProjectPin, $bln_PalettePin, $bln_HiddenPalettePin, $str_Serialize, $bln_ToggleProjectPin, $str_LocationID, $str_CreatedDate, $str_ModifiedDate);                          
  }      
}    
function fn_XDesginer_transferFileToInstanceTable($int_idRecord, $str_Name, $str_Type, $str_DependentId, $bln_ProjectPin, $bln_HiddenProjectPin, $bln_PalettePin, $bln_HiddenPalettePin, $str_Serialize, $bln_ToggleProjectPin, $str_LocationID, $str_CreatedDate, $str_ModifiedDate){                   
  
  $str_sql="DELETE FROM `instance` WHERE `id`=?";
  $stmt = $this->pdo->prepare($str_sql);
  $stmt->execute([$int_idRecord]);              

  $str_sql="INSERT INTO `instance` (`id`, `Name`,`Type`, `DependentId`, `ProjectPin`, `HiddenProjectPin`, `PalettePin`, `HiddenPalettePin`,`Serialize`,`ToggleProjectPin`, `LocationID`, `CreatedDate`, `ModifiedDate`) SELECT ?,?,?,?,?,?,?,?,?,?,?,?,?;";    
  $stmt = $this->pdo->prepare($str_sql);      
  $stmt->execute([$int_idRecord, $str_Name, $str_Type, $str_DependentId, $bln_ProjectPin,$bln_HiddenProjectPin, $bln_PalettePin, $bln_HiddenPalettePin, $str_Serialize, $bln_ToggleProjectPin, $str_LocationID,$str_CreatedDate, $str_ModifiedDate]);  
}   




function fn_getStringFromFile($str_file_path, $str_default){  

  if(file_exists($str_file_path)){
    $str_value=file_get_contents($str_file_path);    
  }
  else{
    $str_value=$str_default;
  }    
  //N.B Bizzarley, allowing string value of "true" to be returned causes error. Likely also applies to false.
  if($str_value==="true"){$str_value=true;}
  if($str_value==="false"){$str_value=false;}
  if($str_value==="yes"){$str_value=true;}
  if($str_value==="no"){$str_value=false;}
  return $str_value;
}

function fn_getBooleanFromFile($str_file_path, $str_default){
  $str_value=false;
  if(file_exists($str_file_path)){
    $str_value=file_get_contents($str_file_path);  
  }
  else{
    $str_value=$str_default;  
  }
  return $this->fn_get_intBool($str_value);      
}

function fn_get_folder_path_component($str_name_component){    
  
  $str_path_folder=$this->str_path_folder_user_component."/".$str_name_component;       
  
  //$this->fn_addEcho("str_path_folder: ".$str_path_folder);                        
  
  return $str_path_folder;      
}

function fn_get_file_path_component($str_name_component, $str_name_file){    
  
  $str_path_folder=$this->fn_get_folder_path_component($str_name_component);
  $str_file_path=$str_path_folder."/".$str_name_file;
  //$this->fn_addEcho("str_file_path: ".$str_file_path);
  return $str_file_path;      
}      
/////////////////////////////////
/////////////////////////////////
function fn_get_folder_path_instance_file($str_name_instance){    
  
  $str_path_folder=$this->str_path_folder_user_instance."/".$str_name_instance;       
  
  //$this->fn_addEcho("str_path_folder: ".$str_path_folder);                        
  
  return $str_path_folder;      
}

function fn_get_file_path_instance_Column($int_id_record, $str_column){    
  
  $str_path_folder=$this->fn_get_folder_path_instance_file($int_id_record);
  $str_file_path=$str_path_folder."/".$str_column;
  //$this->fn_addEcho("str_file_path: ".$str_file_path);
  return $str_file_path;      
}

 
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

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
}//END CLASS XDesign
?>
