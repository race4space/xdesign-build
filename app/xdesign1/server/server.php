<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/app/shared/server/header.php";

require_once(APPROOT."/loginpanel/server/server.php");

class xdesign1{  
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
        $obj_post->RecordId=$row["id"];
        $obj_post->RecordName=$row["Name"];        
        $obj_post->RecordType=$row["Type"];        
        $obj_post->ObjectData=$row["Serialize"];                
        
      }
    }

    function fn_setPost(){

      global $obj_shared;
      $this->obj_post=$obj_shared->obj_post;    

      
    }      

    function fn_intializeServerPost(){
      $obj_post=$this->obj_post;      
      if(empty($obj_post->RecordId)){$obj_post->RecordId="0";}       
      if(empty($obj_post->DesignId)){$obj_post->DesignId="DesignIdNotSet";}                                             
      if(empty($obj_post->RecordName)){$obj_post->RecordName="New Project";}                             
      if(empty($obj_post->RecordType)){$obj_post->RecordType="NoType";}                                                                
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
      
      
      //*
      if(!$this->fn_getAuthorizeUserStatus()){                             
        return;
      }
      $this->fn_setConnectionUser();                 
      //*/

      

      
      
      
      $obj_post=$this->obj_post;                  
      
      if(empty($obj_post->CreatedDate)){
        $obj_post->CreatedDate="1101-01-01 00:00:00";
      }
      if(empty($obj_post->ModifiedDate)){
        $obj_post->ModifiedDate="1101-01-01 00:00:00";
      }
      if(empty($obj_post->LastVersionDate)){
        $obj_post->LastVersionDate="1101-01-01 00:00:00";
      }
      
      $this->bln_sendBackObjectDate=true;
      
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
      
      if(empty($obj_post->ClassController)){        
        $obj_post->ClassController=false;        
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
        $obj_post->RecordShortName="myproject";
      }
      if(empty($obj_post->NotifierId)){
        $obj_post->NotifierId="NotifierIdNotSet";
      }            
      if(empty($obj_post->RecordType)){
        $obj_post->RecordType="RecordTypeNotSet";
      } 
      if(empty($obj_post->RecordExtend)){
        $obj_post->RecordExtend="notset";
      }            
      if(empty($obj_post->ProtectedPin)){        
        $obj_post->ProtectedPin=false;
      }      
      
      if(empty($obj_post->PalettePin)){        
        $obj_post->PalettePin=false;
      }      
      
      if(empty($obj_post->CatQuery)){        
        $obj_post->CatQuery="notset";        
      }            
      if(empty($obj_post->CategoryList)){        
        $obj_post->CategoryList="notset";        
      }      
      else{
        $obj_post->CategoryList=trim($obj_post->CategoryList, ",");        
      }
      if(empty($obj_post->DynamicPin)){        
        $obj_post->DynamicPin=false;
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

      

      switch($obj_post->Action){                       
        case "openComponentCode":
          $this->fn_openComponentCode();
        break;                                        
        case "getListPalettePinnedComponentInCategory":
          $this->fn_getListPalettePinnedComponentInCategory();
        break;
        case "getListProjectInCategory":                  
          $this->fn_getListProjectInCategory();          
        break;                
        case "save":
          $this->fn_saveComponent();
        break;        
        case "versionProject":
          $this->fn_versionComponent();
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
          //$this->fn_openProject();    
        break;                    
        case "XDesigner_move":
          $this->fn_XDesigner_move();
        break;              
        case "XDesigner_maintain":              
          $this->fn_XDesigner_maintain();          
        break;                
        case "XDesigner_compile":              
          $this->fn_XDesigner_compile();          
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
          $obj_post->ErrorMessage="xdesign1 ACTION Not Handled: [".$obj_post->Action."]";       
      }

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
      $this->str_path_folder_start=$this->str_path_document_root;      
      $this->str_name_folder_app="app";              
      $this->str_path_folder_app=$this->fn_getFolderPathApp();            
      $this->str_name_folder_rucksack="rucksack";       
      
      
      //////////////////////////
      //xdesign1 PATH
      //////////////////////////
      $this->int_idRecordXDesign=2406;//saftey to prevent deletion, esp whilst confirmaiton is not first confirmed by "really delete".      
      $this->str_name_app_xdesign="xdesign1";         

      $this->str_name_folder_build="_build";
      $this->str_path_folder_build=$this->str_path_folder_start."/".$this->str_name_folder_build;

      $this->str_name_folder_component="component";      
      $this->str_name_folder_instance="instance";                  
      $this->str_name_folder_compile="compile";                    
      
      //USED e.g by Import Component, Import Instance
      //$this->str_folderPathComponentXDesign=$this->str_path_folder_build."/".$this->str_name_folder_component;                
      $this->str_folderPathComponentXDesign=$this->str_path_folder_app;
      
      $this->str_folderPathInstanceXDesign=$this->fn_getFolderPathInstance();                    
      $this->str_folderPathCompileXDesign=$this->fn_getFolderPathCompile();                                
      //USED e.g by Import Component, Import Instance
      
      
      
      $this->str_name_folder_package="package";
      $this->str_name_folder_version=$this->obj_post->RecordShortName."-version-".$this->str_UniqueName;
      $this->str_name_folder_hotinstall="hotrelease";
      
      $this->str_name_file_index="index.html";            
      $this->str_name_file_project=$this->str_name_folder_version.".mjs";
      $this->str_name_file_hotinstall=$this->str_name_folder_hotinstall.".mjs";
      
      $this->str_path_folder_site_backup="sitebackup-error";
      if($this->bln_localHost){
        $this->str_path_folder_site_backup="D:\\var\www\html\backup";//needs work
      }
      
      $this->dbname_projectMenuButton="menubutton";                       
      
      //DBType are used by package project, and in compile
      $this->dbtype_runtime="RunTimeCode";                   
      $this->dbtype_designtime="DesigntimeCode";
      $this->dbtype_template="TemplateCode";            
      //DBType are used by package project, and in compile      
    } 

    function fn_getFolderPathApp(){            
      return $this->str_path_folder_start."/".$this->str_name_folder_app;
    }    

    
    function fn_getFolderPathCompile(){            
      return $this->str_path_folder_build."/".$this->str_name_folder_compile;                
    }    

    function fn_getFolderPathInstance(){      
      return $this->str_path_folder_build."/".$this->str_name_folder_instance;                
    }    
    function fn_getFolderPathInstanceRecord($int_idRecord){          
      return $this->fn_getFolderPathInstance()."/".$int_idRecord;    
    }            
    function fn_getFilePathInstanceRecordColumn($int_idRecord, $str_column){    
      
      $str_path_folder=$this->fn_getFolderPathInstanceRecord($int_idRecord);
      $str_file_path=$str_path_folder."/".$str_column;      
      return $str_file_path;      
    }                   

    function fn_getFolderPathComponentRecord($str_name_component){          
      //return $this->str_folderPathComponentXDesign."/".$str_name_component;    
      return $this->str_folderPathComponentXDesign."/".$str_name_component."/".$this->str_name_folder_component;    
      
    }        
    function fn_getFilePathComponentRecordColumn($str_name_component, $str_name_file){    
  
      $str_path_folder=$this->fn_getFolderPathComponentRecord($str_name_component);
      $str_file_path=$str_path_folder."/".$str_name_file;      
      return $str_file_path;      
    }           
    
    function fn_getFolderPathPackageViaID($int_idRecord){

      return $this->fn_getFolderPathInstanceRecord($int_idRecord)."/".$this->str_name_folder_package;      
    }                    

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
    
    function fn_fileExists($str_path_folder){
      return file_exists($str_path_folder);                 
    }  
    

    function fn_createFolder($str_path_folder){
      $bln_fileexist=file_exists($str_path_folder);           
      //$this->fn_addEcho("fn_createFolder: ".$str_path_folder); 
      if(!$bln_fileexist){                              
        mkdir($str_path_folder, 0777, true);        
        //$this->fn_addEcho("mkdir");     
      }
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
      
      //*
      //Save id record direct into the object data
      $obj_ObjectData=json_decode($obj_post->ObjectData);
      $obj_ObjectData->obj_design->int_idRecord=$obj_post->RecordId;      
      $obj_post->ObjectData=json_encode($obj_ObjectData);      
      
      $this->fn_saveComponent();      
      //Save id record direct into the object data
      //*/            
      
      
      //$obj_post->ObjectData="{}";
    }               

    function fn_existInstance($int_idRecord){
      
      $obj_post=$this->obj_post;

      $str_sql="SELECT * FROM `instance` WHERE `id`=?;";            
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute([$int_idRecord]);      
      $row=$stmt->fetch();
      if($row){
        return true;
      }
      return false;
    }       
    
    function fn_saveComponent($bln_version=false){      

      //$this->fn_cleanupInstanceTable();//may prevent new components from savng ?

      //requires obj post to have an accurate dependent id string
      
      $obj_post=$this->obj_post;      

      $int_idRecord=$obj_post->RecordId;
      /*//experimental - no need to chagne action to saveas on client
      if($int_idRecord===0){
        $this->fn_saveAsComponent();
        return;        
      }
      //*/
      $str_nameRecord=$obj_post->RecordName;
      $str_nameShortRecord=$obj_post->RecordShortName;
      
      $str_typeRecord=$obj_post->RecordType;
      $db_type=$obj_post->RecordType;
      $str_objectData=$obj_post->ObjectData;      
      $str_dependentId=$obj_post->DependentId;            
      $str_classList=$obj_post->ClassList;      
      //$this->fn_addEcho("str_classList: ".$str_classList);
      $str_code=$obj_post->ComponentCode;   
      //$this->fn_addEcho("str_code: ".$str_code);
      
      

      $str_recordExtend=$obj_post->RecordExtend;      
      $int_protectedPin=$this->fn_get_intBool($obj_post->ProtectedPin);      
      $int_palettePin=$this->fn_get_intBool($obj_post->PalettePin);                  
      $this->obj_post->LastVersionDate=$this->fn_get_lastVersionDate($bln_version);                  
      $str_lastVersionDate=$this->obj_post->LastVersionDate;
      $str_categoryList=$obj_post->CategoryList;      
      $int_dynamicPin=$this->fn_get_intBool($obj_post->DynamicPin);            

      $str_createdDate=$obj_post->CreatedDate;                 
      $str_modifiedDate=$obj_post->ModifiedDate;         

      /*              
      $this->fn_addEcho("str_CreatedDate: ".$str_createdDate);                            
      $this->fn_addEcho("str_ModifiedDate: ".$str_modifiedDate);      
      //*/
      
      //*
      if(!$this->fn_validateDate($str_createdDate)){
        $str_createdDate="1001-01-01 00:00:00";        
      }
      $str_modifiedDate=date("Y-m-d H:i:s");
      if(!$this->fn_validateDate($str_modifiedDate)){
        $str_modifiedDate="1001-01-01 00:00:00";        
      } 

      $obj_post->CreatedDate=$str_createdDate;                       
      $obj_post->ModifiedDate=$str_modifiedDate;         
      //*/

      
      if($int_dynamicPin){
        return;
      }      

      $this->fn_updateCategoryList($obj_post);        
      
      
      
      //UPDATE DATABASE FROM SOFTWARE        
      $this->fn_updateInstanceToDatabase($str_nameRecord, $str_nameShortRecord, $str_typeRecord, $int_protectedPin, $int_palettePin, $str_lastVersionDate, $str_categoryList,  $str_dependentId, $str_objectData, $str_createdDate, $str_modifiedDate, $int_idRecord);

      if(empty($this->bln_sendBackObjectDate)){
        $obj_post->ObjectData="{}";
      }      
      
      //EXPORT FROM DATABASE TO FILE     
      $this->fn_exportInstanceToFile($str_nameRecord, $str_nameShortRecord, $str_typeRecord, $int_protectedPin, $int_palettePin, $str_lastVersionDate, $str_categoryList, $str_dependentId, $str_objectData, $str_createdDate, $str_modifiedDate, $int_idRecord);                

      //MANAGE COMPONENT SAVE, IF ANY
      $this->fn_manageComponentSave($str_typeRecord, $str_recordExtend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate);      
    } 

    function fn_get_lastVersionDate($bln_version){      

      /*
      if(!$bln_version){
        $date_value= NULL;            
      }
      else{
        $date_value=$this->date_script;
      }
      //*/
      $date_value=$this->date_script;
      return $date_value;
    }           
    
    function fn_validateDate($date, $format = 'Y-m-d H:i:s'){
      $d = DateTime::createFromFormat($format, $date);      
      return $d && $d->format($format) === $date;
    }

    
    function fn_updateInstanceToDatabase($str_nameRecord, $str_nameShortRecord, $str_typeRecord, $int_protectedPin, $int_palettePin, $str_lastVersionDate, $str_categoryList, $str_dependentId, $str_objectData, $str_createdDate, $str_modifiedDate, $int_idRecord){


      
      $str_sql="UPDATE `instance` SET `Name`=:Name, `NameShort`=:NameShort,`Type`=:Type, `ProtectedPin`=:ProtectedPin, `PalettePin`=:PalettePin, `LastVersionDate`=:LastVersionDate, `CategoryList`=:CategoryList, `DependentId`=:DependentId, `Serialize`=:Serialize, `CreatedDate`=:CreatedDate, `ModifiedDate`=:ModifiedDate WHERE `id`=:id ;";                             
      
      $stmt = $this->pdo_user->prepare($str_sql);                  
      $stmt->execute([
        'Name' => $str_nameRecord,
        'NameShort' => $str_nameShortRecord,
        'Type' => $str_typeRecord,                
        'ProtectedPin' => $int_protectedPin,
        'PalettePin' => $int_palettePin,
        'LastVersionDate' => $str_lastVersionDate,
        'CategoryList' => $str_categoryList,
        'DependentId' => $str_dependentId,
        'Serialize' => $str_objectData,      
        'CreatedDate' => $str_createdDate,
        'ModifiedDate' => $str_modifiedDate,
        'id' => $int_idRecord        
      ]);                                    
    }   

    function fn_manageComponentSave($str_dbtype, $str_recordExtend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate){      

      $obj_post=$this->obj_post;            
      
      if(strtolower($str_dbtype)==="component"){//very important
        return;//must return
      }            
      
      $int_idFixed=$this->fn_dbTypeComponentExist(0, $str_dbtype);//check on type only         
      //$this->fn_addEcho("int_idFixed: ".$int_idFixed);
      if($int_idFixed===0){        
        $this->fn_addEcho("NEW CLASS: RE-VERSION XDESIGNER AND RE-LOAD REQUIRED");
        $obj_post->RELOADREQUIRED=true;      
        $obj_post->ClassController=true;
        $this->fn_insertComponentFromUI($int_idRecord, $str_createdDate);
      }     

      $bln_classController=$this->fn_get_intBool($obj_post->ClassController);
      
      if($bln_classController){
        $this->fn_updateFileToComponentTable($int_idFixed, $str_dbtype, $str_recordExtend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate);      
        $this->fn_exportComponentToFile($str_dbtype, $str_recordExtend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate);    
      }
    }

    function fn_insertComponentFromUI($int_idRecord, $str_createdDate){              
      
      if($int_idRecord===0){                
        $str_sql="INSERT INTO `component` (`id`,`CreatedDate`) SELECT :id,:CreatedDate;";
        $stmt = $this->pdo_user->prepare($str_sql);        
        $stmt->execute([
          'id' => $int_idRecord,        
          'CreatedDate' => $str_createdDate
        ]);                                    
      }
    }
    function fn_updateFileToComponentTable($int_idRecord, $str_dbtype, $str_recordExtend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate){         
      
      $str_sql="UPDATE `component` SET `Type`=:Type, `Extend`=:Extend, `ClassList`=:ClassList, `ModifiedDate`=:ModifiedDate WHERE `id`=:id";                        
      $stmt = $this->pdo_user->prepare($str_sql);                        
      $stmt->execute([
        'id' => $int_idRecord,
        'Type' => $str_dbtype,
        'Extend' => $str_recordExtend,                    
        'ClassList' => $str_classList,      
        'ModifiedDate' => $str_modifiedDate
      ]);                                    

      if(!empty($str_code)){
        $str_sql="UPDATE `component` SET `Code`=:Code WHERE `id`=:id;";                        
        $stmt = $this->pdo_user->prepare($str_sql);                            
        $stmt->execute([
          'id' => $int_idRecord,
          'Code' => $str_code
        ]);                                    
      }      
    }
    

    function fn_openQuery(){

      $obj_post=$this->obj_post;
      $str_sql=$obj_post->Query;
      $stmt = $this->pdo_user->prepare($str_sql);
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
      $str_sql="UPDATE `instance` SET `PalettePin`=0 WHERE `id`=$obj_post->RecordId ;";
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();      
      //*/

      if($int_idRecord===$this->int_idRecordXDesign){
        return;
      }

      

      $str_sql="DELETE FROM `instance` WHERE `id`=:id AND `ProtectedPin`=0; ";                  
      $stmt = $this->pdo_user->prepare($str_sql);                    
      $stmt->execute([
        'id' => $int_idRecord
      ]);                              
      
      
      /*      
      $str_sql="DELETE FROM `instancelink` WHERE `InstanceId`=$obj_post->RecordId ;";
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();
      //*/            

      $this->fn_removeOrphanFolder($int_idRecord);//relates to single deleted folder      
    }     

    function fn_newProject(){       
      
      //$this->fn_cleanupInstanceTable();      
      
      $obj_ini=new stdClass();
      $obj_ini->RecordId=0;           
      $obj_ini->bln_version=false;       
      
      $this->fn_packageProject($obj_ini);      
    }


    function fn_openProject(){
      

      $obj_post=$this->obj_post;      
      $int_idRecord=$this->obj_post->RecordId;                  

      $str_sql="SELECT * FROM `instance` WHERE `id`=:id; ";                  
      $stmt = $this->pdo_user->prepare($str_sql);                    
      $stmt->execute([
        'id' => $int_idRecord
      ]);                        
      
      
      $row=$stmt->fetch();
      if($row){
        $this->fn_formatPost($row);    
        $obj_post->RowData=json_encode($row);            
      }
      else{
        $obj_post->HasError=true;
        $obj_post->ErrorMessage="RecordIdNotExist";
        $this->fn_addEcho("EMPTY ROW");
        return;
      }

      
      if($obj_post->RecordType==="category"){        
        $this->fn_formatReleaseReady();
      }

      
      $obj_ini=new stdClass();      
      $obj_ini->RecordId=$int_idRecord;            
      $obj_ini->bln_version=false;        
      $this->fn_packageProject($obj_ini);
    }  

    function fn_formatReleaseReady(){

      $obj_post=$this->obj_post;      
      $int_idRecord=$this->obj_post->RecordId;      
      
      $obj_post->ReleaseReady=false;

      $s="SELECT LastVersionDate FROM `CategoryLink` ";
      $s.="JOIN `Instance` ON `Instanceid`=`Instance`.`id` ";      
      $s.="WHERE `Categoryid`=:Categoryid AND Instanceid<>:Instanceid AND LastVersionDate IS NULL";      
      $s.=";";      
      $str_sql=$s;
      $this->fn_addEcho($str_sql);     
      $stmt = $this->pdo_user->prepare($str_sql);                        
      $stmt->execute([
        'Categoryid' => $int_idRecord,        
        'Instanceid' => $int_idRecord
      ]);                                    
      
      $row=$stmt->fetch();
      if($row){        
          return;
      }            
      $obj_post->ReleaseReady=true;
    }
    
    
    function fn_versionComponent(){

      
      //save the instance first.
      //requires obj post to have an accurate dependent id string
      //puboish does use the same  route "actionSave" which runs fn_compileDependentId
      $bln_version=true;
      $this->fn_saveComponent($bln_version);      
      
      $obj_ini=new stdClass();
      $obj_ini->RecordId=$this->obj_post->RecordId;        
      $obj_ini->bln_version=$bln_version;                    
      $this->fn_packageProject($obj_ini);
    }
    
    


    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    /////////////////////////////////
    
    
    
    

    function fn_get_last_insert_id(){
      return $this->pdo_user->lastInsertId();
    }       
    
    function fn_formatPostComponentCode($row){
      $obj_post=$this->obj_post;
      if($row){
        $obj_post->RecordId=$row["id"];        
        $obj_post->RecordType=$row["Type"];        
        $obj_post->RecordExtend=$row["Extend"];                
        $obj_post->ComponentCode=$row["Code"];                 
      }
    }
    function fn_formatPostAuthorize(){
      $obj_post=$this->obj_post;      
      $obj_post->AuthorizeUserEmail=$this->AuthorizeUserEmail;
      $obj_post->AuthorizeUserStatus=$this->AuthorizeUserStatus;      
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
    

    function fn_updateCategoryList($obj_post){

      
    
      $str_categoryList=$obj_post->CategoryList;

      if(empty($str_categoryList)){return;} 
      
      
      $int_InstanceId=$obj_post->RecordId;     

      $str_sql="DELETE FROM `categorylink` WHERE `InstanceId`=?;";        
      //$this->fn_addEcho("str_sql: " .$str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute([$int_InstanceId]);
      //$this->fn_addEcho("int_InstanceId: " .$int_InstanceId);

      $arr_value=explode(",",$str_categoryList);//grab list of child instance ids      
      $arr_length = count($arr_value);
      //$this->fn_addEcho("arr_length: " .$arr_length);
      for($i=0;$i<$arr_length;$i++){
        
        $str_value=$arr_value[$i];                          

        //$this->fn_addEcho("str_value: " .$str_value);

        if($str_value==="notset"){
          continue;
        }
        if(empty($str_value)){
          continue;
        }

        
        $str_value=strtolower($str_value);

        $str_sql="SELECT ";
        $str_sql.="`instance`.`id` As `CategoryId` ";
        $str_sql.="FROM `instance` WHERE LOWER(`instance`.`Name`)=:Name AND `Type`='category';";        
        //$this->fn_addEcho("str_sql: " .$str_sql);
        
        $stmt = $this->pdo_user->prepare($str_sql);                        
        $stmt->execute([
          'Name' => $str_value                  
        ]);                                    

        $row=$stmt->fetch();        
        if($row){           
          $int_CategoryId=$row["CategoryId"];                    
        }
        else{
          //$this->fn_addEcho("EMPTY SELECT");
          continue;
        }        
        
        $str_sql="INSERT INTO `categorylink` (`InstanceId`, `CategoryId`) VALUES(:InstanceId,:CategoryId) ;";                        
        //$this->fn_addEcho("str_sql: " .$str_sql);        
        $stmt = $this->pdo_user->prepare($str_sql);        
        $stmt->execute([
          'InstanceId' => $int_InstanceId,         
          'CategoryId' => $int_CategoryId         
        ]);                                    
        //$this->fn_addEcho("int_InstanceId: " .$int_InstanceId);
        //$this->fn_addEcho("int_CategoryId: " .$int_CategoryId);
      }
    }

    function fn_getListPalettePinnedComponentInCategory(){

      $obj_post=$this->obj_post;
      
      
      $str_sql="SELECT ";      
      $str_sql.="`t1`.`id` AS `InstanceId`, ";
      $str_sql.="`t1`.`Name` AS `InstanceName`, ";
      $str_sql.="`t1`.`Type`AS `InstanceType`, ";
      $str_sql.="`categorylink`.`InstanceId` As `CategoryLinkInstanceId`, ";
      $str_sql.="`categorylink`.`CategoryId` As `CategoryLinkCategoryId`, ";
      $str_sql.="`t2`.`id` As `CategoryId`, ";
      $str_sql.="`t2`.`Name` As `CategoryName` ";
      $str_sql.="FROM ";      
      $str_sql.="`instance` t1 ";      
      $str_sql.="LEFT JOIN `categorylink` ON  `categorylink`.`InstanceId`=`t1`.`Id`";                  
      $str_sql.="LEFT JOIN `instance` t2  ON  `categorylink`.`CategoryId`=`t2`.`Id` ";      
      $str_sql.="WHERE true AND `t1`.`PalettePin` ";            
      $str_sql.="ORDER BY LOWER(`CategoryName`), LOWER(`InstanceName`) ";                  
      //$str_sql.="LIMIT 0, 20 ";                  
      $str_sql.=";";      
      //$this->fn_addEcho("str_sql: " .$str_sql);

      
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
      $stmt = $this->pdo_user->prepare($str_sql);
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

      $str_sql="SELECT * FROM `component` WHERE `Type`=:Type;";
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);              
      $stmt->execute([
        'Type' => $str_typeRecord                 
      ]);                                    
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
      $stmt = $this->pdo_user->prepare($str_sql);      
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
      $stmt = $this->pdo_user->prepare($str_sql);      
      $stmt->execute($myArr);
      
      //$stmt->execute([$str_dbtype]);
      $row=$stmt->fetch();        
      $int_idRecord=0;  
      if($row){$int_idRecord=$row["Id"];}
      return $int_idRecord;  
    }         
    function fn_deletePackageFolder($int_idRecord, $str_name_app){      

      $obj_path=fn_createPackageFolder($int_idRecord, $str_name_app);
      $this->fn_deleteFolder($obj_path->str_folderPathPacakge);                    
    }
    function fn_createPackageFolder($int_idRecord, $str_name_app){      
      
      $obj_pathStart=$this->fn_createFolderAppName($this->str_path_folder_start, $str_name_app); 
      
      //sleep(10);
      
      $obj_path=new stdClass();                  
      //str_folderPathInstanceRecord
      $str_path=$this->fn_getFolderPathInstanceRecord($int_idRecord);              
      $this->fn_createFolder($str_path);       
      $obj_path->str_folderPathInstanceRecord=$str_path;

      //str_folderPathPacakge
      $str_path=$obj_path->str_folderPathInstanceRecord."/".$this->str_name_folder_package;                        
      $this->fn_createFolder($str_path); 
      $obj_path->str_folderPathPacakge=$str_path;

      //str_folderPathVersion
      $str_path=$obj_path->str_folderPathPacakge."/".$this->str_name_folder_version;          
      $this->fn_createFolder($str_path); 
      $obj_path->str_folderPathVersion=$str_path; /////////////////////////////           
      
      $obj_pathPackage=$obj_path;

      $obj_pathAppName=$this->fn_createFolderAppName($obj_pathPackage->str_folderPathVersion, $str_name_app);                             

      //str_folderPathRucksackVersion
      $str_path=$obj_pathAppName->str_folderPathAppName."/".$this->str_name_folder_rucksack;                                      
      $this->fn_createFolder($str_path); 
      $obj_pathAppName->str_folderPathRucksack=$str_path; 

      //str_folderPathComponentVerison
      $str_path=$obj_pathAppName->str_folderPathAppName."/".$this->str_name_folder_component;                                      
      $this->fn_createFolder($str_path); 
      $obj_pathAppName->str_folderPathComponent=$str_path; 
      
      //COPY APP FOLDER FROM APP ROOT TO VERSION ROOT      
      $str_source=$obj_pathStart->str_folderPathAppName;      
      $str_destination=$obj_pathAppName->str_folderPathAppName;                  
      $this->fn_copyFolder($str_source, $str_destination);            
      //COPY APP FOLDER FROM APP ROOT TO VERSION ROOT            

      $obj_path=new stdClass();                  
      $obj_path->obj_pathStart=$obj_pathStart;
      $obj_path->obj_pathPackage=$obj_pathPackage;      
      $obj_path->obj_pathAppName=$obj_pathAppName;
      return $obj_path;
    }   

    
    function fn_packageProject($obj_ini){  

      
      
      $obj_post=$this->obj_post;
      
      $this->obj_record=new stdClass();
      $this->obj_record->Type="notset";
      $int_idRecord=$obj_ini->RecordId;            
      $bln_version=$obj_ini->bln_version;                                   
      
      
      if(empty($obj_post->CreateRelease)){$obj_post->CreateRelease=false;}
      $bln_release=$this->fn_get_intBool($obj_post->CreateRelease);            
      
      $str_componentName="New Project";//e.g. id record =0
      $str_componentNameShort="newproject";      
      
      if(empty($int_idRecord)){$int_idRecord=0;}      
      if(empty($bln_version)){$bln_version=false;}      
      $str_nameTargetClass="component";//Default New Project Type, RecordId=0                  
      
      $str_sql="SELECT * FROM `instance` WHERE Id=?;";
      //$this->fn_addEcho("str_sql: ".$str_sql);
      
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute([$int_idRecord]);      
      $row=$stmt->fetch();            
      if($row){        
        $str_componentName=$row["Name"];
        $str_componentNameShort=$row["NameShort"];        
        $str_nameTargetClass=$row["Type"];        
        $this->obj_record->Type=$row["Type"];
      }//Overide with Custom Project Type, if the component has been Saved, RecordId=x

      

      if(empty($str_componentNameShort)){
        $str_componentNameShort=$str_componentName;        
      }
      $str_componentNameShort=str_replace(' ', '', strtolower($str_componentNameShort));      
      
      //0 START Create Project Folder          
      $this->fn_removePackageFolders();//be aware this can cause issues if it takes a long time to do
      $obj_pathOriginatorShared=$this->fn_createPackageFolder($int_idRecord, "shared");                           
      $obj_pathOriginator=$this->fn_createPackageFolder($int_idRecord, $str_componentNameShort);                           
      $this->obj_post->URLProjectVersion=$this->path2url($obj_pathOriginator->obj_pathPackage->str_folderPathVersion);                  
      
      //$this->fn_importComponentFile($this->obj_record->Type);
      //Temprairly disabling this here.
      //1. Its not sure why the database cannot be assume to be upto date
      //Surely its upto the Devleoper to decide when to hit the import button .      
      
      
      //1 START Create Project Index File      
      
      $str_header=<<<heredoc
      <!DOCTYPE html>
      <html lang="en">
      <title>$str_componentName</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
      <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>                        
      <script type="module" src="$this->str_name_file_project"></script>
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
      $this->fn_addDependentComponentToLinkTable("instancelink", $int_idRecord);//this is the complex dependent id function                                    
      //There is now a list of dependent entries in the link table      
      
      //---Add Palette Pinned component (if not version) , 
      //so as they are avaialble for choosing during further project editing  
      
      if(!$bln_version){
        $this->fn_addPalettePinComponentToLinkTable($int_idRecord);//add palette pinned components temporarily to packageproject
      }            

      //---Write code base 
      //get dependent code from database 
      $str_code=$this->fn_compileComponentCodeFromLinkTable($int_idRecord); //this is the complex component code function                                     
      $str_code_project.=$str_code.PHP_EOL.PHP_EOL;                  
      //$this->fn_addEcho("str_code_project: " . $str_code_project);
      
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
      $this->str_path_file_index=$obj_pathOriginator->obj_pathAppName->str_folderPathRucksack."/".$this->str_name_file_index;            
      file_put_contents($this->str_path_file_index, $str_documentIndex);               
      
      $str_path_file_xdesign=$obj_pathOriginator->obj_pathAppName->str_folderPathRucksack."/".$this->str_name_file_project;            
      file_put_contents($str_path_file_xdesign, $str_code_project);                                    
      $this->fn_updateTemplateFile($str_path_file_xdesign, $int_idRecord, $str_nameTargetClass);//Update Project Code File with RecordId and ClassName                 
      //END Write Code to File                 
      
      //COPY RUCKSACK CONTENTS INTO VERSION ROOT            
      $this->fn_copyFolder($obj_pathOriginator->obj_pathAppName->str_folderPathRucksack, $obj_pathOriginator->obj_pathPackage->str_folderPathVersion);                              

      $this->fn_copyFolder($obj_pathOriginatorShared->obj_pathAppName->str_folderPathRucksack, $obj_pathOriginatorShared->obj_pathPackage->str_folderPathVersion);                              
      $this->fn_deleteFolder($obj_pathOriginatorShared->obj_pathAppName->str_folderPathRucksack);        
      $this->fn_deleteFolder($obj_pathOriginatorShared->obj_pathAppName->str_folderPathComponent);        
      //COPY RUCKSACK CONTENTS INTO VERSION ROOT
      
      //*
      if($bln_version){
        //Create added palette item folders
        //Loop thru Instance Link Table
        //locate any corresponding existing folders in App folder              
        $str_sql = "SELECT `instance`.`Name` AS `Name`, `NameShort` AS `NameShort` FROM `instancelink` JOIN `instance` ON `instancelink`.`LinkDependentId`=`instance`.`id` WHERE `InstanceId` =?;";
        $stmt = $this->pdo_user->prepare($str_sql);
        $stmt->execute([$int_idRecord]);      
        while($row=$stmt->fetch()){                                   
          $str_componentName=$row["Name"];
          $str_componentNameShort=$row["NameShort"];        
          if(empty($str_componentNameShort)){
            $str_componentNameShort=$str_componentName;        
          }
          $str_componentNameShort=str_replace(' ', '', strtolower($str_componentNameShort));                          
          $obj_path_instancelink=$this->fn_createPackageFolder($int_idRecord, $str_componentNameShort);                               
          //DELETE UNDEEDED RUCKSACK AND COMPONENT
          $this->fn_deleteFolder($obj_path_instancelink->obj_pathAppName->str_folderPathRucksack);        
          $this->fn_deleteFolder($obj_path_instancelink->obj_pathAppName->str_folderPathComponent);        
          //DELETE UNDEEDED RUCKSACK AND COMPONENT      
          //DELETE FOLDER IF EXMPTY
          $bln_empty=$this->fn_isEmptyFolder($obj_path_instancelink->obj_pathAppName->str_folderPathAppName);          
          if($bln_empty){$this->fn_deleteFolder($obj_path_instancelink->obj_pathAppName->str_folderPathAppName);}
          //DELETE FOLDER IF EXMPTY         
        }
      } 
      //*/              
      
      //Remove ExisitngEntries In Instance Link
      $this->fn_removeLinkTableEntries("instancelink", $int_idRecord);      
      //Remove ExisitngEntries In Instance Link
      
      //create independent reelase 
      if($bln_release){    
        
        $str_sql = "SELECT `instance`.`Id`, `instance`.`Name` AS `Name` FROM `categorylink` JOIN `instance` ON `categorylink`.`InstanceId`=`instance`.`id` WHERE `CategoryId`=? AND `CategoryId`<>`InstanceId`;";
        $stmt = $this->pdo_user->prepare($str_sql);
        $stmt->execute([$int_idRecord]);      
        while($row=$stmt->fetch()){                                   
          $str_componentName=$row["Name"];          
          if(empty($str_componentNameShort)){
            $str_componentNameShort=$str_componentName;        
          }
          $str_componentNameShort=str_replace(' ', '', strtolower($str_componentNameShort));                          
          $obj_path_instancelink=$this->fn_createPackageFolder($int_idRecord, $str_componentNameShort);                               
          //DELETE UNDEEDED RUCKSACK AND COMPONENT
          $this->fn_deleteFolder($obj_path_instancelink->obj_pathAppName->str_folderPathRucksack);        
          $this->fn_deleteFolder($obj_path_instancelink->obj_pathAppName->str_folderPathComponent);        
          //DELETE UNDEEDED RUCKSACK AND COMPONENT      
          //DELETE FOLDER IF EXMPTY
          $bln_empty=$this->fn_isEmptyFolder($obj_path_instancelink->obj_pathAppName->str_folderPathAppName);          
          if($bln_empty){$this->fn_deleteFolder($obj_path_instancelink->obj_pathAppName->str_folderPathAppName);}
          //DELETE FOLDER IF EXMPTY         
        }

        //*   
        //Parent of current subdomain.        
        $str_path_folder_release_parent=dirname($this->str_path_document_root)."/".$obj_post->RecordShortName;
        $this->fn_createFolder($str_path_folder_release_parent);  
        $str_path_folder_release_version=$str_path_folder_release_parent."/".$this->str_name_folder_version;    
        $this->fn_deleteFolder($str_path_folder_release_version);                    
        $this->fn_createFolder($str_path_folder_release_version);                  
        $this->fn_copyFolder($obj_pathOriginator->obj_pathPackage->str_folderPathVersion, $str_path_folder_release_version); 
        //*/

        //*   
        //Parent of current subdomain.        
        $str_path_folder_release_parent=dirname($this->str_path_document_root)."/".$obj_post->RecordShortName;
        $this->fn_createFolder($str_path_folder_release_parent);  
        $str_path_folder_release_hotinstal=$str_path_folder_release_parent."/".$this->str_name_folder_hotinstall;            
        $this->fn_deleteFolder($str_path_folder_release_hotinstal);                    
        $this->fn_createFolder($str_path_folder_release_hotinstal);                  
        $this->fn_copyFolder($obj_pathOriginator->obj_pathPackage->str_folderPathVersion, $str_path_folder_release_hotinstal); 
        //*/       
        
        
        $str_sql = "SELECT * FROM `control`.`desktop` WHERE `Subdomain`=:Subdomain;";                      
        //$this->fn_addEcho($str_sql);                        
        $stmt = $this->obj_loginpanel->pdo_standard->prepare($str_sql);
        $stmt->execute([
          'Subdomain' => $obj_post->RecordShortName
        ]);                                    
        $row=$stmt->fetch();            
        if($row){                          
        }
        else{
          $str_sql = "INSERT INTO `control`.`desktop` (`Subdomain`)  VALUES (:Subdomain);";                      
          //$this->fn_addEcho($str_sql);                        
          $stmt = $this->obj_loginpanel->pdo_standard->prepare($str_sql);
          $stmt->execute([
            'Subdomain' => $obj_post->RecordShortName
          ]);                                    
        }
        
      }

      //3 END Create Project Code File      
    }        

    function fn_createFolderApp($str_path_folder_parent){      

      $obj_path=new stdClass();                  
      $str_path=$str_path_folder_parent."/".$this->str_name_folder_app;            
      $this->fn_createFolder($str_path);       
      $obj_path->str_folderPathApp=$str_path;            
      return $obj_path;
    }

    function fn_createFolderAppName($str_path_folder_parent, $str_name_app){      
      
      $obj_path=$this->fn_createFolderApp($str_path_folder_parent);      
      
      $str_path=$obj_path->str_folderPathApp."/".$str_name_app;          
      $this->fn_createFolder($str_path); 
      $obj_path->str_folderPathAppName=$str_path;                  
      return $obj_path;
    }
    
    function fn_createFolderComponent($str_path_folder_version, $str_name_app){      

      $obj_path=$this->fn_createFolderAppName($str_path_folder_version, $str_name_app);      
      
      $str_path=$obj_path->str_folderPathAppName."/".$this->str_name_folder_component;                                      
      $this->fn_createFolder($str_path);
      $obj_path->str_folderPathComponent=$str_path;            
      return $obj_path;
    }
    
    function fn_createFolderRucksack($str_path_folder_version, $str_name_app){      

      $obj_path=$this->fn_createFolderAppName($str_path_folder_version, $str_name_app);
      
      $str_path=$obj_path->str_folderPathAppName."/".$this->str_name_folder_rucksack;                                      
      $this->fn_createFolder($str_path);
      $obj_path->str_folderPathRucksack=$str_path;            
      return $obj_path;
    }
    
    function fn_removeLinkTableEntries($str_nameTable, $int_idRecord){       
      //XXXDEBUG

      //Remove ExisitngEntries
      //$str_sql = "DELETE FROM `$str_nameTable` WHERE `InstanceId` =".$int_idRecord.";";            
      $str_sql = "DELETE FROM `$str_nameTable`;";            
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();      
      //Remove ExisitngEntries      
    }
    
    function xfn_removeOrphanInstanceLinkTableEntries(){       

      //Remove OrphanEntries
      $str_sql = "DELETE FROM `instancelink` WHERE `InstanceId` NOT IN(SELECT `id` FROM `instance`);";            
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();      
      //Remove OrphanEntries
    }
    
    
    function fn_getlistLinkTableEntries($str_nameTable){                   
      $str_sql = "SELECT GROUP_CONCAT(LinkDependentId) as 'list' FROM maintainlink;";
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();            
      if($row){                
        $str_list=$row["list"];              
      }
      return $str_list;
    }    

    function fn_addPalettePinComponentToLinkTable($int_idRecordInstance,){//added during packageproject           
      //version uses save routnie to construct sufficient list    
      //after this operaiton the list will be technically incorrect - including all pinned, including  required pinned componnents.
      //however the list will be correct again when the operaiton is next saved , or versioned      
      
      //get all pinned components , and also any dependnt ids
      $this->fn_setGroupConcatLimit();      
      $str_sql="SELECT GROUP_CONCAT(CONCAT_WS(IF(`DependentId`='','',','), `id`, `DependentId`)) AS `list` FROM `instance` WHERE `PalettePin`;";                        
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);      
      
      $stmt->execute();      
      $row=$stmt->fetch();      
      if($row){
        $str_list=$row["list"]; 
        $arr_id=explode(",",$str_list);//grab list of child instance ids      
        $arr_length = count($arr_id);
        for($i=0;$i<$arr_length;$i++){
          $int_idRecord=$arr_id[$i];          
          //$this->fn_addEcho($int_idRecordInstance.": ".$int_idRecord);          
          $this->fn_addListToLinkTable("instancelink", $int_idRecordInstance, $int_idRecord); //add record    
          $this->fn_compileLinkList("instancelink", "", $int_idRecordInstance, $int_idRecord);// recursive function will find all entries in child dependnt lists     
        }                                           
      }
    }       
    

    function fn_compileLinkList($str_nameTable, $str_listDependentRecord, $int_idRecordInstance, $int_idDependentRecord){               
      
      $str_sql = "SELECT `DependentId` as `list` FROM `instance`  WHERE `id` ='$int_idDependentRecord' AND !INSTR('$str_listDependentRecord', `DependentId`);";
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();            
      $row=$stmt->fetch();                  
      if($row){        
        $str_Newlist=$row["list"];        
        $str_listDependentRecord.=",";        
        $str_listDependentRecord.=$str_Newlist;//Create default dependency list                          
        //$this->fn_addEcho("[$int_idDependentRecord] FOUND NEW LIST: [".$str_Newlist."]");                                    
        $this->fn_addListToLinkTable($str_nameTable, $int_idRecordInstance, $str_Newlist);                                   
        $arr_id=explode(",",$str_Newlist);//grab list of child instance ids      
        $arr_length = count($arr_id);
        for($i=0;$i<$arr_length;$i++){$this->fn_compileLinkList($str_nameTable, $str_listDependentRecord, $int_idRecordInstance, $arr_id[$i]);}        
      }  
    } 
    

    function fn_addDependentComponentToLinkTable($str_nameTable, $int_idRecord){                         
      
      //INSERT REQUIRED ENTRIES 
      $this->fn_addListToLinkTable($str_nameTable, $int_idRecord, $int_idRecord); //add self    
      $this->fn_compileLinkList($str_nameTable, "", $int_idRecord, $int_idRecord);// recursive function will find all entries in child dependnt lists     
      //INSERT REQUIRED ENTRIES      
    }

    

    function fn_addListToLinkTable($str_nameTable, $int_idRecord, $str_listDependentId){

      //create  entries relating to current instance
      $str_sql = "INSERT INTO `$str_nameTable` (InstanceId, LinkDependentId)  VALUES (?,?);";      
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);                  
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
          //$this->fn_addEcho("stmt->execute: ".$int_idRecord.": ".$int_id);
          $stmt->execute([$int_idRecord, $int_id]);          
        }        
      }
    }
    

    function fn_getPaletteComponentListIdFromLinkTable($int_idRecord){        
      
      $str_sql="SELECT group_concat(distinct `component`.`id`) as `listId` FROM instancelink join instance on LinkDependentId=instance.id join component on instance.type=component.Type ";
      $str_sql.="WHERE ";      
      $str_sql.="`InstanceId`=".$int_idRecord.";";
      //$this->fn_addEcho("str_sql: ".$str_sql);                              
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();            
      if($row){$str_listId=$row["listId"];}      
      //$this->fn_addEcho("xxx str_listId: ".$str_listId);                              
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

      $stmt = $this->pdo_user->prepare($str_sql);
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
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch(); 
      if($row){$str_listType=$row["listType"];}         
      $this->str_listPaletteComponentType=$str_listType;      
    }   
    

    function fn_getComponentLinkList($str_list){      
      
      $this->str_ComponentLinkList="";
      $this->fn_getComponentLinkListRecursive($str_list);                  
      $arr_Clean=$this->fn_cleanArray(explode(",", $this->str_ComponentLinkList));                  
      $str_list=implode(",", $arr_Clean);      
      return $str_list;      
    }
    function fn_getComponentLinkListRecursive($str_list){

      $arr_list=$this->fn_cleanArray(explode(",", $str_list));
      foreach ($arr_list as $str_type) {  

        if($str_type==="notset"){continue;}                
        $this->str_ComponentLinkList.=$str_type.",";           
        
        $str_sql="SELECT Concat(`Extend`, ',', `ClassList`) AS `listExtend` FROM `component` WHERE `Type`=?;";                              
        $stmt = $this->pdo_user->prepare($str_sql);
        $stmt->execute([$str_type]);         
        $row=$stmt->fetch();            
        if($row){                
          $str_column_value=$row["listExtend"];              
          if($str_column_value==="notset, notset"){continue;}                                    
          if(!empty($str_column_value)){                    
            $this->str_ComponentLinkList=$str_column_value.",".$this->str_ComponentLinkList;                        
            $this->fn_getComponentLinkListRecursive($str_column_value);                              
          }
        }              
      }                  
    }
    
    function fn_addBracketArray(&$arr_item, $str_bracket){

      foreach ($arr_item as &$str_item) {
        $str_item=$str_bracket.trim($str_item).$str_bracket;
      }
    }

    function fn_compileComponentCodeFromLinkTable($int_idRecord){      

      

      //set default values            
      $this->str_listPaletteComponentType="";
      $this->str_listInstanceLinkExtend="";      
      $this->str_listClassExpand="";
      //set default values
      
      $str_code="";        
      $str_listClass="";
      $str_listCodeClass="//START XTRA CLASSES".PHP_EOL;                  
      

      //$this->fn_addEcho("int_id_record: ".$int_idRecord);      
      
      //START Get List of Component Ids listed to be written to the browser.
      //important also generates component map      
      $str_listId=$this->fn_getPaletteComponentListIdFromLinkTable($int_idRecord);            
      //$this->fn_addEcho("xxx str_listId: ".$str_listId);
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
      
      $str_listDependent=$this->fn_getComponentLinkList($str_list2.",".$str_list1);                  ;            
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
        $stmt = $this->pdo_user->prepare($str_sql);        
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
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);
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
    

    function fn_updateProjectFileWithjsonObject($int_idRecord, $bln_version){     
      
      $str_code="";      
      $str_listRecord="";

      

      $str_code="";      
      $str_sql="SELECT group_concat(distinct LinkDependentId) as `list` FROM `instancelink` WHERE `InstanceId`='$int_idRecord';";      
      //$this->fn_addEcho($str_sql);      
      $stmt = $this->pdo_user->prepare($str_sql);
      $stmt->execute();      
      $row=$stmt->fetch();      
      if($row){
        $str_listRecord=$row["list"];                            
      }
      else{
        //$this->fn_addEcho("NO CODE FOUND");
      }

      //$str_listRecord.=",".$int_idRecord;//add reference to self
      
      
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
      $stmt = $this->pdo_user->prepare($str_sql);
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
    

    function fn_updateTemplateFile($str_name_file_xdesign, $int_idRecord, $str_nameTargetClass){     
      
  
      $str_code = file_get_contents($str_name_file_xdesign);  
      
      $str_search="{int_idRecord}";
      $str_replace=$int_idRecord;
      $str_code = str_replace($str_search, $str_replace, $str_code);
    
      $str_search="{str_nameTargetClass}";
      $str_replace=$str_nameTargetClass;
      $str_code = str_replace($str_search, $str_replace, $str_code);
    
      if(!empty($str_code)){file_put_contents($str_name_file_xdesign, $str_code);}
      //END Write Record
     
     }          
    function fn_getComponentCodeFromDBType($str_type){

      $str_code="";            
      
      $str_sql="SELECT group_concat(Id) as `list` FROM `component` WHERE `Type`='$str_type';";      
      //$this->fn_addEcho("str_sql: ".$str_sql);
      $stmt = $this->pdo_user->prepare($str_sql);      
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

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////


function fn_XDesigner_setPalettePinStatus($int_idRecord, $bln_status){                
      
  $int_status=0;
  if($bln_status){$int_status=1;}
  
  $str_sql="UPDATE `instance` SET PalettePin =$int_status WHERE `id`=$int_idRecord;";
  //$this->fn_addEcho("pin str_sql: ".$str_sql);
  $stmt = $this->pdo_user->prepare($str_sql);
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

  
  
  //sniff the packagage  folder  for the first folder (version) and locate the ruck package from there
  $int_idRecord=$this->int_idRecordXDesign;  
  
  $this->fn_XDesigner_maintainVersionDestination($this->str_path_document_root);    
  
  $str_path=$this->fn_getFolderPathInstanceRecord($int_idRecord);              
  $this->fn_createFolder($str_path);       
  $str_folderPathInstanceRecord=$str_path;
  
  $str_path=$str_folderPathInstanceRecord."/".$this->str_name_folder_package;      
  $this->fn_createFolder($str_path); 
  $str_folderPathPackage=$str_path;  

  $str_folderPathVersion=$this->fn_getFirstFolder($str_folderPathPackage);   

  $str_source=$str_folderPathVersion;
  $str_destination=$this->str_path_document_root;  
  //$this->fn_addEcho("str_source: ".$str_source);   
  //$this->fn_addEcho("str_destination: ".$str_destination);   
  $this->fn_copyFiles($str_source,  $str_destination);             
}

function fn_XDesigner_maintainVersionDestination($str_path_folder){
  
  foreach (new DirectoryIterator($str_path_folder) as $fileInfo) {
    if ($fileInfo->isDot()) {
      continue;
    }     

    $str_name_file=$fileInfo->getFilename();            
    $str_path_file=$fileInfo->getPathname();              
    $bln_inStr=$this->fn_inStr($str_name_file, "gitignore");          
    if(!$bln_inStr){        
      $this->fn_deleteFile($str_path_file);        
    }    
    
  }
}

function fn_removeFolderMatch($str_path_folder){            
      
  $obj_folder=scandir($str_path_folder);
  foreach ($obj_folder as &$str_name_file) {           
    $pattern = "/^xdesigner-x.*/i";            
    $bln_match=preg_match($pattern, $str_name_file); // Outputs 1 or 0        
    if($bln_match){          
      $str_path_file=$str_path_folder."/".$str_name_file;          
      $this->fn_unlinkFile($str_path_file);        
    }
    
  } 
}    

function fn_isEmptyFolder($dir) {

  if(!file_exists($dir)){return false;}
  if(!is_dir($dir)){return false;}

  $files = array_diff(scandir($dir), array('.','..'));
  if(count($files)===0){return true;}
  return false;
  
 } 


function fn_deleteFolder($dir) {


  if(!file_exists($dir)){return false;}
  if(!is_dir($dir)){return false;}

  $files = array_diff(scandir($dir), array('.','..'));
   foreach ($files as $file) {
     (is_dir("$dir/$file")) ? $this->fn_deleteFolder("$dir/$file") : unlink("$dir/$file");
   }
   return rmdir($dir);
 } 



function fn_getFileExtension($path) {
  $qpos = strpos($path, "?");
  if ($qpos!==false) $path = substr($path, 0, $qpos);
 
  $extension = pathinfo($path, PATHINFO_EXTENSION);

  return $extension;
} 



function fn_XDesigner_maintain(){

  $this->fn_addEcho("fn_XDesigner_maintain");   

    
    $obj_post=$this->obj_post;           
    
    $str_sql="DELETE FROM `maintainlink`"; //future where userid =x
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();      
    
    $str_sql="UPDATE `instance` SET MaintainStatus=0";            
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();           

    $str_sql="UPDATE `instance` SET MaintainStatus=1 WHERE (ProtectedPin OR PalettePin OR (CategoryList IS NOT NULL AND CategoryList<>'notset' AND CategoryList<>'')) OR `Type`='category' ";            
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();
    
    $str_sql="SELECT `id` As `int_idRecord` FROM `instance` WHERE MaintainStatus;";            
    $this->fn_addEcho("MaintainStatus str_list: ".$str_sql);
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();   
    
    while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
      
      $int_idRecord=$row["int_idRecord"];        
      //---Insert List of Required Components into Link table
      $this->fn_addDependentComponentToLinkTable("maintainlink", $int_idRecord);//this is the complex dependent id function                                    
      //There is now a list of dependent entries in the link table      
    }  
    
    
    $str_list=$this->fn_getlistLinkTableEntries("maintainlink");
    //$this->fn_addEcho("str_list maintain: ".$str_list);    

    $str_sql="UPDATE `instance` SET MaintainStatus=1 WHERE id in($str_list)";            
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();    
    
    $str_sql = "SELECT GROUP_CONCAT(Id) as 'list' FROM `instance` WHERE !MaintainStatus;";
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();      
    $row=$stmt->fetch();            
    if($row){                
      $str_list=$row["list"];              
    }
    //$this->fn_addEcho("str_list archive: ".$str_list);    
    
    //N.B. Below instance_archive table must be recreated/updated following any column change to the original instance table. 
    $str_sql="INSERT INTO `instance_archive` SELECT * FROM `instance` WHERE Id NOT IN(SELECT LinkDependentId FROM `maintainlink`);"; //future where userid =x            
    $stmt = $this->pdo_user->prepare($str_sql);        
    $stmt->execute();      
    
    $str_sql="DELETE FROM `instance` WHERE MaintainStatus=0;";                
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();    

    $this->fn_removeOrphanFolderInstance();

    $str_sql="DELETE FROM `maintainlink`"; //future where userid =x
    $stmt = $this->pdo_user->prepare($str_sql);
    $stmt->execute();      
    
  }
  
function fn_XDesigner_compile(){

  //$this->fn_addEcho("fn_XDesigner_compile");  

  
  //$int_idRecord=$this->int_idRecordXDesign;    
  //$str_folderPathInstanceRecord=$this->fn_getFolderPathInstanceRecord($int_idRecord);                      
  //$str_folder_path_compile=$str_folderPathInstanceRecord."/".$this->str_folder_name_compile;  
  
  $this->filename_runtime="filename_runtime.js";        
  $this->filename_template="filename_template.js";
  $this->filename_designtime="filename_designtime.js";
  
  $this->str_folder_name_runtime="runtime";
  $this->str_folder_path_runtime=$this->str_folderPathCompileXDesign."/".$this->str_folder_name_runtime;  
  $this->str_file_path_runtime=$this->str_folder_path_runtime."/".$this->filename_runtime;      
  
  
  
  $this->str_folder_name_template="runtime";
  $this->str_folder_path_template=$this->str_folderPathCompileXDesign."/".$this->str_folder_name_template;  
  $this->str_file_path_template=$this->str_folder_path_template."/".$this->filename_template;

  $this->str_folder_name_designtime="designtime";  
  $this->str_folder_path_designtime=$this->str_folderPathCompileXDesign."/".$this->str_folder_name_designtime;  
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
  $this->fn_XDesginer_transferFileToComponentTable($this->dbtype_runtime, "notset", "notset", $str_code, $date_script, $date_script);              

}
function fn_XDesigner_transfer_DesigntimeFile(){

  $date_script=$this->date_script;

    //write designtime code from file to database      
    $str_code = file_get_contents($this->str_file_path_designtime);      
    $this->fn_XDesginer_transferFileToComponentTable($this->dbtype_designtime, "notset", "notset", $str_code, $date_script, $date_script);              

}
function fn_XDesigner_transfer_TemplateFile(){

  $date_script=$this->date_script;
      
      //write template code from file to database      
      $str_code = file_get_contents($this->str_file_path_template);  
      $this->fn_XDesginer_transferFileToComponentTable($this->dbtype_template, "notset", "notset", $str_code, $date_script, $date_script);                    
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
function fn_XDesigner_importAll(){
  
  $this->fn_importAll();    
}

function fn_XDesigner_updateFileToInstanceTable($int_idFixed, $str_dbname, $str_dbtype, $str_code){

  
  $int_idRecord=$this->fn_XDesigner_dbTypeInstanceExist($int_idFixed, $str_dbtype);  

  //$int_idRecord=0;  
  
  if($int_idRecord==0){    
    $str_sql="INSERT INTO `instance` (`id`, `Name`, `Type`, `ProtectedPin`, `DependentId`, `Serialize`) SELECT ?, ?, ?, ?, ?, ?;";
    $stmt = $this->pdo_user->prepare($str_sql);    
    $stmt->execute([$int_idFixed, $str_dbname, $str_dbtype, "1", "", $str_code]);
    $int_idFixed=$this->fn_get_last_insert_id();
  }
  else{
    $str_sql="UPDATE `instance` SET `Serialize`=? WHERE `id`=?;";    
    $stmt = $this->pdo_user->prepare($str_sql);          
    $stmt->execute([$str_code, $int_idRecord]);
  }  
  
  return $int_idFixed;
}  
function fn_XDesigner_dbTypeInstanceExist($int_idFixed, $str_dbtype){

  $str_sql="SELECT Id FROM `instance` WHERE Id=? AND Type =? ;";
  $stmt = $this->pdo_user->prepare($str_sql);        
  $stmt->execute([$int_idFixed, $str_dbtype]);
  $row=$stmt->fetch();        
  $int_idRecord=0;  
  if($row){$int_idRecord=$row["Id"];}
  return $int_idRecord;  
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
    
    $arr_fobj = scandir($this->str_folderPathComponentXDesign);
    
    foreach ($arr_fobj as $str_type) {
      $this->fn_importComponentFile($str_type);
    }   
  }

  function fn_importComponentFile($str_type){
    
    
    //$this->fn_addEcho("fn_importComponentFile");

    if($str_type=="." || $str_type==".."){
      return;
    }                  
    
    $str_path_folder=$this->fn_getFolderPathComponentRecord($str_type);      
    
    if(!is_dir($str_path_folder)){
      return;
    }
    
    
    $str_file_path=$this->fn_getFilePathComponentRecordColumn($str_type, "Extend");                  
    $str_extend=$this->fn_getStringFromFile($str_file_path, "notset");            

    $str_file_path=$this->fn_getFilePathComponentRecordColumn($str_type, "ClassList");                  
    $str_classList=$this->fn_getStringFromFile($str_file_path, "notset");                
    
    $str_file_path=$this->fn_getFilePathComponentRecordColumn($str_type, "component.js");                  
    $str_code=$this->fn_getStringFromFile($str_file_path, "");        
    
    $str_file_path=$this->fn_getFilePathComponentRecordColumn($str_type, "CreatedDate");                    
    $str_createdDate=$this->fn_getStringFromFile($str_file_path, NULL);    

    $str_file_path=$this->fn_getFilePathComponentRecordColumn($str_type, "ModifiedDate");                      
    $str_modifiedDate=$this->fn_getStringFromFile($str_file_path, NULL);                  
    
    $this->fn_XDesginer_transferFileToComponentTable($str_type, $str_extend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate);                  
  }

  function fn_exportComponentToFile($str_type, $str_extend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate){      
    
    
    
    if(empty($str_code)){    //dont create folder etc if empty code
      //return;
    }
    
    
    $str_path_folder=$this->fn_getFolderPathComponentRecord($str_type);
    if(strtolower($str_type)==="component"){
      return;
    }  
    
    if(!is_dir($str_path_folder)){
      $this->fn_createFolder($str_path_folder);    
      if(!is_dir($str_path_folder)){
        return;
      }            
    }
    
    $str_value=$str_extend;  
    $str_path_file=$str_path_folder."/"."Extend";
    $this->fn_deleteFile($str_path_file);
    if($str_value!=="notset"){    
      file_put_contents($str_path_file, $str_value);                  
    }      

    $str_value=$str_classList;  
    $str_path_file=$str_path_folder."/"."ClassList";
    $this->fn_deleteFile($str_path_file);
    if($str_value!=="notset"){    
      file_put_contents($str_path_file, $str_value);                  
    }      
    
    if(!empty($str_code)){    //dont create folder etc if empty code    
    
      $str_file_path=$this->fn_getFilePathComponentRecordColumn($str_type, "component.js");                      
      $bln_exist=file_exists($str_file_path);    
      if(!$bln_exist){//If Folder does not exist        
        $str_value=$str_code;
        if(!empty($str_value)){    
          $str_path_file=$str_path_folder."/"."component.js";
          file_put_contents($str_path_file, $str_value);
        }    
      }  
    }

    $str_value=$str_createdDate;
    $str_path_file=$str_path_folder."/"."CreatedDate";
    $this->fn_deleteFile($str_path_file);
    if(!empty($str_createdDate)){//dont export default values
      file_put_contents($str_path_file, $str_value); 
    }                   

    $str_value=$str_modifiedDate;
    $str_path_file=$str_path_folder."/"."ModifiedDate";
    $this->fn_deleteFile($str_path_file);
    if(!empty($str_createdDate)){//dont export default values    
      file_put_contents($str_path_file, $str_value); 
    }                   

  }

function fn_exportInstanceToFile($str_name, $str_nameShortRecord, $str_type, $int_protectedPin, $int_palettePin, $str_lastVersionDate, $str_categoryList, $str_dependentId, $str_serialize, $str_createdDate, $str_modifiedDate, $int_idRecord){        
  
  $str_path_folder=$this->fn_getFolderPathInstanceRecord($int_idRecord);        
  if(!is_dir($str_path_folder)){
    $this->fn_createFolder($str_path_folder);    
    if(!is_dir($str_path_folder)){
      return;
    }            
  }

  $str_value=$str_name;   
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

  $str_value=$str_type;    
  $str_path_file=$str_path_folder."/"."Type";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){//dont export default values    
    file_put_contents($str_path_file, $str_value);                  
  }
  
  $int_value=$int_protectedPin;      
  $str_path_file=$str_path_folder."/"."ProtectedPin";
  $this->fn_deleteFile($str_path_file);
  if($int_value){//dont export default values    
    file_put_contents($str_path_file, $int_value);                    
  }    
  
  $int_value=$int_palettePin;
  $str_path_file=$str_path_folder."/"."PalettePin";
  $this->fn_deleteFile($str_path_file);
  if($int_value){//dont export default values    
    file_put_contents($str_path_file, $int_value);                    
  }

  $str_value=$str_lastVersionDate;
  $str_path_file=$str_path_folder."/"."LastVersionDate";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){    
    if($str_value!=="notset"){      
      file_put_contents($str_path_file, $str_value);                  
    }
  }    

  $str_value=$str_categoryList;
  $str_path_file=$str_path_folder."/"."CategoryList";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){    
    if($str_value!=="notset"){      
      file_put_contents($str_path_file, $str_value);                  
    }
  }  

  $str_value=$str_dependentId;
  $str_path_file=$str_path_folder."/"."DependentId";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value)){//dont export default values    
    file_put_contents($str_path_file, $str_value); 
  }                   

  $str_value=$str_serialize;      
  $str_path_file=$str_path_folder."/"."Serialize";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_value) && $str_value!=="{}"){//dont export default values      
    file_put_contents($str_path_file, $str_value);                      
  }

  $str_value=$str_createdDate;
  $str_path_file=$str_path_folder."/"."CreatedDate";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_createdDate)){//dont export default values
    file_put_contents($str_path_file, $str_value); 
  }                   

  $str_value=$str_modifiedDate;
  $str_path_file=$str_path_folder."/"."ModifiedDate";
  $this->fn_deleteFile($str_path_file);
  if(!empty($str_createdDate)){//dont export default values    
    file_put_contents($str_path_file, $str_value); 
  }                   
  
  //*/
}

function fn_XDesginer_transferFileToComponentTable($str_dbtype, $str_extend, $str_classList, $str_code,  $str_createdDate, $str_modifiedDate){          
  
  
  $str_sql="DELETE FROM `component` WHERE `Type`=?";
  //$this->fn_addEcho("str_sql: ".$str_sql);
  $stmt = $this->pdo_user->prepare($str_sql);  
  $stmt->execute([$str_dbtype]);  

  
  
  $str_sql="INSERT INTO `component` (`Type`, `Extend`, `ClassList`, `Code`, `CreatedDate`, `ModifiedDate`) SELECT ?,?, ?, ?, ?, ?;";    
  $stmt = $this->pdo_user->prepare($str_sql);  
  $stmt->execute([$str_dbtype, $str_extend, $str_classList, $str_code, $str_createdDate, $str_modifiedDate]);
  
}   


function fn_removePackageFolders(){   
  
  //global package delete funciton - be careful where this is called.

  //for each strname_instance_folder in $this->str_folderPathInstanceXDesign;
  $arr_fobj = scandir($this->str_folderPathInstanceXDesign);
  
  foreach ($arr_fobj as $str_name) {  
    if($str_name=="." || $str_name==".."){
      continue;
    }                  

    $int_idRecord=$str_name;
    
    $str_path=$this->fn_getFolderPathPackageViaID($int_idRecord);      
    if(!is_dir($str_path)){
      continue;
    }    

    $this->fn_deleteFolder($str_path);                 
  }
  
}

private function isEmptyDir($dir)
{
    $iterator = new FilesystemIterator($dir);
    $isDirEmpty = !$iterator->valid();
    return $isDirEmpty;
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

function fn_copyFiles($src_dir, $dst_dir)
{

  //$this->fn_addEcho("fn_copyFiles: ".$src_dir);
  //$this->fn_addEcho("fn_copyFiles: ".$dst_dir);

  if (is_dir($src_dir)) {    
    $files = scandir($src_dir);
    foreach ($files as $file){
      if ($file == '.' || $file == '..') {continue;}
      $src_file=$src_dir."/".$file;      
      if (is_file($src_file)) {    
        $dst_file=$dst_dir."/".$file;             
        //$this->fn_addEcho("src_file: ".$src_file);
        //$this->fn_addEcho("dst_file: ".$dst_file);
        copy($src_file, $dst_file);
      }
      
      
    }
  }  
  /*
  $files = glob($src."/*.*");
  foreach($files as $file){
    $file_to_go = str_replace($src,$dst,$file);    
    if ($file == '.' || $file == '..') {continue;}
    
    if (is_file($file)) {     
      $this->fn_addEcho("file: ".$file);
      $this->fn_addEcho("file_to_go: ".$file_to_go);
      //copy($file, $file_to_go);
    }
  }
  //*/
  
}

function fn_copyFolder($source, $dest, $bln_recur=true)
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
          $this->fn_copyFolder("$source/$entry", "$dest/$entry", $bln_recur);
        }
        
        
    }

    // Clean up

    $dir->close();
    return true;
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
  $this->fn_copyFolder($str_path_source, $str_path_destination);  
}

function fn_removeOrphanFolderInstance(){

  $arr_fobj = scandir($this->str_folderPathInstanceXDesign);
  
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
  
  $str_path=$this->str_folderPathInstanceXDesign."/".$int_idRecord;  

    if(!is_dir($str_path)){
      return;
    }
    
    if($int_idRecord==="0"){
      return;
    }

    $bln_exist=$this->fn_existInstance($int_idRecord);
    if(!$bln_exist){      
      $this->fn_deleteFolder($str_path);
    }
}
    
function fn_importInstanceFiles(){  
  
  
  //NB Under no circumstances run fn_removeOrphanFolderInstance, here. 
  //That would mean foldres cannot be imported which have been erroneously deleted from the db!  
  
  //for each strname_instance_folder in $this->str_folderPathInstanceXDesign;
  $arr_fobj = scandir($this->str_folderPathInstanceXDesign);
  
  foreach ($arr_fobj as $str_name) {  
    if($str_name=="." || $str_name==".."){
      continue;
    }
                    
    $str_path=$this->str_folderPathInstanceXDesign."/".$str_name;
    if(!is_dir($str_path)){
      continue;
    }
    
    $int_idRecord=$str_name;
    //$this->fn_addEcho("int_idRecord: ".$int_idRecord);        

    if($int_idRecord==="0"){
      continue;
    }
      
      
    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "Name");        
    $str_name=$this->fn_getStringFromFile($str_file_path, "");
    
    if($str_name===""){//N.B does not contain an import file                    
      continue;
    }
    
    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "Type");        
    $str_type=$this->fn_getStringFromFile($str_file_path, "Tag");            
    
    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "DependentId");        
    $str_dependentId=$this->fn_getStringFromFile($str_file_path,"");    

    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "ProtectedPin");        
    $bln_protectedPin=$this->fn_getBooleanFromFile($str_file_path, "0");

    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "PalettePin");                
    $bln_PalettePin=$this->fn_getBooleanFromFile($str_file_path, "0");                        

    
    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "LastVersionDate");                        
    $str_lastVersionDate=$this->fn_getStringFromFile($str_file_path, NULL);        

    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "CategoryList");                        
    $str_categoryList=$this->fn_getStringFromFile($str_file_path, NULL);        
    
    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "Serialize");                
    $str_serialize=$this->fn_getStringFromFile($str_file_path, "{}");    

    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "CreatedDate");                
    $str_createdDate=$this->fn_getStringFromFile($str_file_path, NULL);    

    $str_file_path=$this->fn_getFilePathInstanceRecordColumn($int_idRecord, "ModifiedDate");                
    $str_modifiedDate=$this->fn_getStringFromFile($str_file_path, NULL);          
    
    $this->fn_XDesginer_transferFileToInstanceTable($int_idRecord, $str_name, $str_type, $str_dependentId, $bln_protectedPin, $bln_PalettePin, $str_lastVersionDate, $str_categoryList, $str_serialize, $str_createdDate, $str_modifiedDate);                          
  }      
}    
function fn_XDesginer_transferFileToInstanceTable($int_idRecord, $str_name, $str_type, $str_dependentId, $bln_protectedPin, $bln_PalettePin, $str_lastVersionDate, $str_categoryList, $str_serialize, $str_createdDate, $str_modifiedDate){                   
  
  $str_sql="DELETE FROM `instance` WHERE `id`=?";
  $stmt = $this->pdo_user->prepare($str_sql);
  $stmt->execute([$int_idRecord]);              

  $str_sql="INSERT INTO `instance` (`id`, `Name`,`Type`, `DependentId`, `ProtectedPin`, `PalettePin`, `LastVersionDate`, `CategoryList`,`Serialize`,`CreatedDate`, `ModifiedDate`) SELECT ?,?,?,?,?,?,?,?,?,?,?;";    
  $stmt = $this->pdo_user->prepare($str_sql);      
  $stmt->execute([$int_idRecord, $str_name, $str_type, $str_dependentId, $bln_protectedPin, $bln_PalettePin, $str_lastVersionDate, $str_categoryList, $str_serialize, $str_createdDate, $str_modifiedDate]);  
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
function fn_setGroupConcatLimit($int_limit=1000000){      
      
  $str_sql="SET SESSION group_concat_max_len = $int_limit;";
  $stmt = $this->pdo_user->prepare($str_sql);      
  $stmt->execute();
}     

}//END CLASS xdesign1

//////////////////////
//Instance Creation goes at bottom the page
$obj_xdesign=new xdesign1();
try {
  $obj_xdesign->fn_execute();
} catch (Error $e) { // Error is the base class for all internal PHP error exceptions.  
  $str_message="SCRIPT ERROR: ".$e->getMessage();
  $obj_xdesign->fn_setError($str_message);
}
//Instance Creation goes at bottom the page
//////////////////////
?>
