<?php
require_once $_SERVER["DOCUMENT_ROOT"]."/app/shared/server/header.php";

require_once APPROOT . '/loginpanel/server/vendor/autoload.php';

class loginpanel{ 

  function __construct() {
    
      //global $obj_post;
      $this->bln_debug=false;                              
      $this->date_script=$this->fn_getSQLDate();                        
      //$this->fn_getPost();      
      $this->fn_setPost();      
      $this->fn_XDesigner_intializeServerPost();      
      $this->fn_intializeAuthorize();   
      
      global $AuthorizeStandardUser, $AuthorizeStandardPass;
      $this->AuthorizeStandardUser=$AuthorizeStandardUser;      
      $this->AuthorizeStandardPass=$AuthorizeStandardPass;      
      $this->AuthorizeStandardSchema="control";
      $obj_connect=new stdClass();      
      $obj_connect->Schema=$this->AuthorizeStandardSchema;      
      $obj_connect->User=$this->AuthorizeStandardUser;
      $obj_connect->Pass=$this->AuthorizeStandardPass;
      $this->pdo_standard=$this->fn_dataConnect($obj_connect);                    
      if($obj_connect->HasError){           
        $this->fn_setError($obj_connect->str_message);      
        return;
      }else{
        $this->fn_setGroupConcatLimit();                    
      }
      
      $this->fn_XDesigner_checkAuthorize();                                                                                   
    }    

    function fn_setPost(){

      global $obj_shared;      
      if(empty($obj_shared)){      
        $obj_shared=new stdClass();
        $obj_shared->obj_post=new stdClass();
      }
      $this->obj_post=$obj_shared->obj_post;
    }
    

    function fn_XDesigner_intializeServerPost(){
      $obj_post=$this->obj_post;      
      if(empty($obj_post->Action)){$obj_post->Action="notset";}      
      if(empty($obj_post->ObjectData)){$obj_post->ObjectData="{}";}      
      if(empty($obj_post->RowData)){$obj_post->RowData="[{}]";}      
      if(empty($obj_post->DesignId)){$obj_post->DesignId="DesignIdNotSet";}                       
      if(empty($obj_post->Execute)){$obj_post->Execute=false;}                       
      if(empty($obj_post->HasError)){$obj_post->HasError=false;}                       
      
    }
    function fn_formatPostAuthorize(){
      $obj_post=$this->obj_post;      
      $obj_post->AuthorizeUserEmail=$this->AuthorizeUserEmail;
      $obj_post->AuthorizeUserStatus=$this->AuthorizeUserStatus;      
    }

    function fn_intializeAuthorize(){
      $this->date_script=$this->fn_getSQLDate();                        
      $this->SystemUserEmail="marketing@myrsstestdomain.com";
      $this->SystemUserFriendlyName="Marketing";      
      $obj_post=$this->obj_post;
      if(empty($obj_post->AuthorizeUserEmail)){$obj_post->AuthorizeUserEmail="";}
      if(empty($obj_post->AuthorizeUserPass)){$obj_post->AuthorizeUserPass="";}
      if(empty($obj_post->AuthorizeUserStatus)){$obj_post->AuthorizeUserStatus=false;}  
      $this->AuthorizeUserEmail=$obj_post->AuthorizeUserEmail;
      $this->AuthorizeUserPass=$obj_post->AuthorizeUserPass;
      $this->AuthorizeUserStatus=$obj_post->AuthorizeUserStatus;      
    }    
    function fn_exit(){                           
      //echo json_encode($this->obj_post);
    }    
    function fn_setConnectionUser($AuthorizeStandardSchema){

      $obj_connect=new stdClass();            
      $obj_connect->Schema=$AuthorizeStandardSchema;      
      $obj_connect->User=$this->AuthorizeUserEmail;            
      $obj_connect->Pass=$this->AuthorizeUserPass;            
      return $this->fn_dataConnect($obj_connect);                              
    }
    
    function fn_execute() {           
      
      $obj_post=$this->obj_post;
      if(empty($obj_post->Execute)){$obj_post->Execute=false;}                       
      if(!$obj_post->Execute){        
        return;
      }      

      
      
      $obj_post=$this->obj_post;      
      
      switch($obj_post->Action){                
        case "XDesigner_checkAuthorize":                    
          //$this->fn_XDesigner_checkAuthorize();                                                            
          //no need to do this as it will be done by now already
        break;
        case "XDesigner_startAuthorize":          
          $this->fn_XDesigner_startAuthorize();                    
        break;                  
        case "XDesigner_endAuthorize":          
          $this->fn_XDesigner_endAuthorize();                    
        break;   
      } 
      
      //$this->fn_exit(); 
      
      
    }
    //*
    /////////////////////////////////
    /////////////START LOGIN 
    function fn_setAuthorizeSessionKey(){

      if(!empty($this->AuthorizeSessionKey)){
        //$this->fn_addEcho("NOT EMPTY SESSION KEY: ".$this->AuthorizeSessionKey);                  
        return;
      }      
      
      $str_value=$this->fn_getCookie("AuthorizeSessionKey");//this will bea new session length coookie or the stored cookie                  
      //$this->fn_addEcho("str_value cookie: ".$str_value);                  
      $this->AuthorizeSessionKey=$str_value;
    }
    
    
    function fn_XDesigner_intializeAuthorize(){
      $this->date_script=$this->fn_getSQLDate();                        
      $this->SystemUserEmail="marketing@myrsstestdomain.com";
      $this->SystemUserFriendlyName="Marketing";      
      $obj_post=$this->obj_post;
      if(empty($obj_post->AuthorizeUserEmail)){$obj_post->AuthorizeUserEmail="";}
      if(empty($obj_post->AuthorizeUserPass)){$obj_post->AuthorizeUserPass="";}
      if(empty($obj_post->AuthorizeUserStatus)){$obj_post->AuthorizeUserStatus=false;}  
      $this->AuthorizeUserEmail=$obj_post->AuthorizeUserEmail;
      $this->AuthorizeUserPass=$obj_post->AuthorizeUserPass;
      $this->AuthorizeUserStatus=$obj_post->AuthorizeUserStatus;      
    }    

    function fn_XDesigner_checkAuthorize(){
      
      
      //$this->fn_addEcho("START fn_XDesigner_checkAuthorize");                  

      global $AuthorizeStandardUser;
      global $AuthorizeStandardPass;            

      $this->fn_setAuthorizeSessionKey();
      if (empty($this->AuthorizeSessionKey)){
        //$this->fn_addEcho("EMPTY SESSION KEY");                  
        return;
      }      
      
      $str_sql="SELECT * FROM  control.`user_session` WHERE ";
      $str_sql.="(`AuthorizeSessionKey`=:AuthorizeSessionKey) ";
      $str_sql.="AND `AuthorizeUserPass`=`AuthorizeSentPass` ";
      $str_sql.=";";      
      //$this->fn_addEcho($str_sql);                  
      //$this->fn_addEcho("this->AuthorizeSessionKey: ".$this->AuthorizeSessionKey);                  
      
      $stmt = $this->pdo_standard->prepare($str_sql);                                                    
      $stmt->execute([              
        'AuthorizeSessionKey' => $this->AuthorizeSessionKey,         
      ]);            
      
      $row=$stmt->fetch();         
      
      if($row){
        //$this->fn_addEcho("FOUND KEY");                  
        
        $this->fn_setLoginCookie("AuthorizeSessionKey", $this->AuthorizeSessionKey);//renew expiry time - push out expiry date each time=never login , unless the cookie expires                                             
        $this->AuthorizeUserEmail=$row["AuthorizeUserEmail"];                          
        $this->AuthorizeUserPass=$row["AuthorizeUserPass"];          
        $this->AuthorizeUserStatus=true;     
        //update password in mysql                    
        $this->fn_dbCreeateUser($this->AuthorizeUserEmail, $this->AuthorizeUserPass);                             
        $this->fn_dbAlterUser("xdesign", $this->AuthorizeUserEmail, $this->AuthorizeUserPass);                     
      } 
      else{
        //$this->fn_addEcho("EMTPY AUTH RS");                  
      }           
      
      $this->fn_formatPostAuthorize();      
      
      
      //$this->fn_addEcho("END fn_XDesigner_checkAuthorize: AuthorizeUserStatus: [". $this->obj_post->AuthorizeUserStatus ."]");
    }    
    
    function fn_XDesigner_startAuthorize(){      

      
      //$this->fn_addEcho("START fn_XDesigner_startAuthorize");
      
      $this->fn_setAuthorizeSessionKey();
      if (empty($this->AuthorizeSessionKey)){return;}      
      
      $obj_post=$this->obj_post;             
      
      $this->AuthorizeUserEmail=$obj_post->AuthorizeUserEmail;
      $this->AuthorizeUserPass=$obj_post->AuthorizeUserPass;      

      //$this->fn_addEcho("this->AuthorizeUserEmail: " .$this->AuthorizeUserEmail);                  
      //$this->fn_addEcho("this->AuthorizeUserPass: " .$this->AuthorizeUserPass);
      
      
      if(!empty($this->AuthorizeUserEmail) && empty($this->AuthorizeUserPass)){        
        $this->fn_XDesigner_sendOTP();
      }            
      else if(!empty($this->AuthorizeUserEmail) && !empty($this->AuthorizeUserPass)){                
      
        //$this->fn_addEcho("UPDATE ");                  
        $str_sql="UPDATE control.`user_session` SET `AuthorizeUserPass`=:AuthorizeUserPass, `ModifiedDate`=:ModifiedDate WHERE ";
        $str_sql.="(`AuthorizeSessionKey`=:AuthorizeSessionKey AND `AuthorizeUserEmail`=:AuthorizeUserEmail) ";
        $str_sql.=";";        
        //$this->fn_addEcho($str_sql);               
        $stmt = $this->pdo_standard->prepare($str_sql);                                  
        $stmt->execute([
          'AuthorizeUserPass' => $this->AuthorizeUserPass,
          'AuthorizeSessionKey' => $this->AuthorizeSessionKey,
          'AuthorizeUserEmail' => $this->AuthorizeUserEmail,
          'ModifiedDate' => $this->date_script
        ]);                                    
      }    
      
      $this->fn_XDesigner_checkAuthorize();      

      //$this->fn_addEcho("END fn_XDesigner_startAuthorize");
    }        
    

    function fn_dbAlterUser($DBName, $DBUserName, $DBUserPass){
      //$this->fn_addEcho("START fn_dbAlterUser");               
      $str_sql="ALTER USER IF EXISTS '$DBUserName' IDENTIFIED BY '$DBUserPass';";            
      $stmt = $this->pdo_standard->prepare($str_sql);                                              
      $stmt->execute([]);                                      
      
      $str_sql="GRANT ALL ON $DBName.* TO '$DBUserName';";      
      $stmt = $this->pdo_standard->prepare($str_sql);                                              
      $stmt->execute([]);                                
      //$this->fn_addEcho("END fn_dbAlterUser");               
    }
    function fn_dbCreeateUser($DBUserName, $DBUserPass){            
      //$this->fn_addEcho("START fn_dbCreeateUser");       
      $str_sql="CREATE USER IF NOT EXISTS '$DBUserName' IDENTIFIED BY '$DBUserPass';";      
      $stmt = $this->pdo_standard->prepare($str_sql);                                              
      $stmt->execute([]);                                
      //$this->fn_addEcho("END fn_dbCreeateUser");                   
    }

    function fn_XDesigner_sendOTP(){          

      $this->fn_setAuthorizeSessionKey();
      if (empty($this->AuthorizeSessionKey)){return;}      
      
      $obj_post=$this->obj_post;
      
      $this->AuthorizeSentPass=rand(100000,999999);      
      $this->AuthorizeUserEmail=$obj_post->AuthorizeUserEmail;            
      
      $domain_name = substr(strrchr($this->AuthorizeUserEmail, "@"), 1);
      $rr = dns_get_record($domain_name, DNS_MX);            
      if(!$rr){
        return false;
      }      

      $str_sql="DELETE FROM  control.`user_session` WHERE ";
      $str_sql.="(`AuthorizeSessionKey`=:AuthorizeSessionKey) ";
      $str_sql.=";";      
      //$this->fn_addEcho($str_sql);                  
      //$this->fn_addEcho("this->AuthorizeSessionKey: ".$this->AuthorizeSessionKey);                  
      $stmt = $this->pdo_standard->prepare($str_sql);                                              
      $stmt->execute([      
        'AuthorizeSessionKey' => $this->AuthorizeSessionKey         
      ]);   
      
      
      $this->AuthorizeSessionKey=session_id();        
      $str_sql="INSERT INTO `control`.`user_session` ";
      $str_sql.="(`AuthorizeSessionKey`, `AuthorizeUserEmail`, `AuthorizeSentPass`, `AuthorizeIPAddress`, `CreatedDate`,`ModifiedDate`) ";
      $str_sql.="VALUES ";
      $str_sql.="(:AuthorizeSessionKey, :AuthorizeUserEmail, :AuthorizeSentPass, :AuthorizeIPAddress, :CreatedDate, :ModifiedDate) ";
      $str_sql.=";";      
      //$this->fn_addEcho($str_sql);            
      $stmt = $this->pdo_standard->prepare($str_sql);  
      $stmt->execute([
        'AuthorizeSessionKey' => $this->AuthorizeSessionKey, 
        'AuthorizeUserEmail' => $this->AuthorizeUserEmail, 
        'AuthorizeSentPass' => $this->AuthorizeSentPass,        
        'AuthorizeIPAddress' => $_SERVER['REMOTE_ADDR'],        
        'CreatedDate' => $this->date_script,
        'ModifiedDate' => $this->date_script
      ]);      
      

      
      
      
      $this->str_methodMailer="SENDGRID";
      switch($this->str_methodMailer){
        case "SENDMAIL":
          $this->fn_sendmail();          
        break;
        case "SENDGRID":          
          $this->fn_sendgridmail();
          break;
      }      
      
    }   

    function fn_sendmail(){

      
      $to= $this->AuthorizeUserEmail;
      $subject = 'One Time Pass: '.$this->AuthorizeSentPass;
      $message = '';
      $headers = 'From: '.$this->SystemUserEmail.' \r\n'.      
      mail($to, $subject, $message, implode("\r\n", $headers));            
    }

    function fn_sendgridmail(){

      
      global $SENDGRID_API_KEY;     
      
      
      $messageHTML=<<<END
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <title>One Time Pass</title>
      </head>    
      <body style="font-family:helvetica">          
      <p><h2>Here Is Your One Time Pass: </h2></p>
      <p><h1>$this->AuthorizeSentPass<h1></p>  
      </body>
      </html>
      END;  


      
      $email = new \SendGrid\Mail\Mail();       
      $email->setFrom($this->SystemUserEmail, $this->SystemUserFriendlyName);            
      $email->setSubject('One Time Pass: '.$this->AuthorizeSentPass);            
      $email->addTo($this->AuthorizeUserEmail, "");      
      $email->addContent("text/plain", "Here is your One Time Pass:".$this->AuthorizeSentPass);            
      $email->addContent("text/html", $messageHTML);            
      $sendgrid = new \SendGrid($SENDGRID_API_KEY);  
      
      
      
      try {
          $response = $sendgrid->send($email);        
          //$this->fn_addEcho("ONE TIME PASS SENT");
      } catch (Exception $e) {         
        $this->fn_addEcho("ERROR: ".$e->getMessage());                  
      }      
    
    }    

    function fn_XDesigner_endAuthorize(){            

      //$this->fn_addEcho("START fn_XDesigner_endAuthorize");
      

      $this->fn_setAuthorizeSessionKey();
      if (empty($this->AuthorizeSessionKey)){return;}      
      
      //dont set cookie to expire - it will break re-login on same session
      //$this->fn_XDesigner_checkAuthorize(); //get email address associated with session                       

      $obj_post=$this->obj_post;       
      
      $str_sql="DELETE FROM  control.`user_session` WHERE `AuthorizeSessionKey`=?;";
      //$this->fn_addEcho($str_sql);
      $stmt = $this->pdo_standard->prepare($str_sql);                            
      $stmt->execute([$this->AuthorizeSessionKey]);              
      
      if(!empty($this->AuthorizeUserEmail)){
        $this->fn_dbDropUser($this->AuthorizeUserEmail);      
      }
      
      $this->AuthorizeSessionKey="";            
      $this->AuthorizeUserEmail="";
      $this->AuthorizeUserPass=rand(100000000,999999999);
      $this->AuthorizeUserStatus=false;      
      
      $obj_post->AuthorizeUserEmail=$this->AuthorizeUserEmail;
      $obj_post->AuthorizeUserPass=$this->AuthorizeUserPass;
      $obj_post->AuthorizeUserStatus=$this->AuthorizeUserStatus;
      
      //$this->fn_addEcho("this->AuthorizeUserPass: ".$this->AuthorizeUserPass);
      //$this->fn_addEcho("END fn_XDesigner_endAuthorize: ".$obj_post->AuthorizeUserStatus);
    }

    function fn_dbDropUser($DBUserName){

      //$this->fn_addEcho("START fn_dbDropUser");

      $str_sql="DROP USER '$DBUserName';";                  
      //$this->fn_addEcho($str_sql);               
      $stmt = $this->pdo_standard->prepare($str_sql);                                        
      $stmt->execute();                          

      //$this->fn_addEcho("END fn_dbDropUser");
    }
    function fn_setLoginCookie($cookie_name, $cookie_value, $bln_expire=false){      
      
      //$this->fn_addEcho("fn_setLoginCookie");      
      

      unset($_COOKIE[$cookie_name]);
      

      $this->int_CookieStoreDays=7;

      $str_time=time() + (86400 * $this->int_CookieStoreDays);
      if($bln_expire){$str_time=0;}      
      
      $arr_cookie_options = array (
        'expires' => $str_time,
        'path' => '/',
        'domain' => '.lokal-mycode.buzz', 
        'secure' => false,     // or false
        'httponly' => false,    // or false
        'samesite' => 'Lax' // None || Lax  || Strict
        );
        
      setcookie($cookie_name, $cookie_value, $arr_cookie_options);      
      //$_SESSION[$cookie_name]=$cookie_value;      
      
    }
    function fn_getCookie($cookie_name){
      
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
    //*/

    

    function fn_formatPost($row){
      $obj_post=$this->obj_post;
      if($row){
        $obj_post->RecordId=$row["id"];
        $obj_post->RecordName=$row["Name"];        
        $obj_post->RecordType=$row["Type"];        
        $obj_post->ObjectData=$row["Serialize"];            
      }
    }
    function fn_setError($str_message){
      $this->obj_post->HasError=true;      
      $this->obj_post->ErrorMessage=$str_message;            
    }          
    function fn_isObject($obj){
      
      if(gettype($obj)==="object"){return true;}
      return false;
    }     
    
    function fn_getSQLDate(){
      return date("Y-m-d H:i:s");
    }
    
    function fn_addEcho($str_val){
      
      if(!isset($this->obj_post->Echo)) {              
        $this->obj_post->Echo="";
      }
      $this->obj_post->Echo.=$str_val.PHP_EOL.PHP_EOL;
    }

    function fn_dataConnect($obj_connect) {  

      $charset="utf8";      
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
      $stmt = $this->pdo_standard->prepare($str_sql);      
      $stmt->execute();
    }     

    
    
}//END CLASS xdesign1


//////////////////////
//Instance Creation goes at bottom the page
$obj_loginpanel=new loginpanel();
try {
  $obj_loginpanel->fn_execute();
} catch (Error $e) { // Error is the base class for all internal PHP error exceptions.  
  $str_message="SCRIPT ERROR: ".$e->getMessage();
  //$obj_loginpanel->fn_setError($str_message);
}
//Instance Creation goes at bottom the page
//////////////////////
?>
