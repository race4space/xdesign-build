//START component/loginpanel
class loginpanel extends panel{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);
    
    this.fn_setType("loginpanel");      
    this.fn_setTag("loginpanel");            
    this.obj_design.bln_isGenericTag=true;
    this.fn_extends("panel");                  
    this.obj_holder.UserDaysAuthorize=5;
    this.int_count=0;
    this.obj_holder.bln_debugServer=false;    
    
    if(this.obj_design.bln_useExternalButton===undefined){this.obj_design.bln_useExternalButton=false;}    
  }
  fn_validateDesignInput(obj_ini){
    let str_name=obj_ini.obj_design.str_name;
    let bln_disabled=true;
    if(str_name==="bln_useExternalButton"){
      bln_disabled=false;
    }
    return  bln_disabled;

  }          
  /////////////////////            
  fn_setAuthorizeUserEmail(AuthorizeUserEmail){
    this.obj_holder.AuthorizeUserEmail=AuthorizeUserEmail;
  }                
  fn_setAuthorizeUserPass(AuthorizeUserPass){                          
    this.obj_holder.AuthorizeUserPass=AuthorizeUserPass;
  }              
  fn_setAuthorizeUserStatus(AuthorizeUserStatus){                          
    this.obj_holder.AuthorizeUserStatus=AuthorizeUserStatus;
  }              
  /////////////////////        
  fn_getAuthorizeObject(){
    return {        
      AuthorizeSessionKey:obj_shared.fn_getCookie("AuthorizeSessionKey"),
      AuthorizeUserEmail:this.obj_holder.AuthorizeUserEmail,
      AuthorizeUserPass:this.obj_holder.AuthorizeUserPass,
      AuthorizeUserStatus:this.obj_holder.AuthorizeUserStatus
    };
  }    
  fn_setAuthorizeObject(obj_post){
      
      let bln_valid;
      bln_valid=obj_shared.fn_validEmail(obj_post.AuthorizeUserEmail);
      if(!bln_valid){obj_post.AuthorizeUserEmail="";}
      this.fn_setAuthorizeUserEmail(obj_post.AuthorizeUserEmail);
      
      bln_valid=obj_shared.fn_validNumber(obj_post.AuthorizeUserPass);
      if(!bln_valid){obj_post.AuthorizeUserPass="";}
      this.fn_setAuthorizeUserPass(obj_post.AuthorizeUserPass);

      let bln_value=obj_shared.fn_parseBool(obj_post.AuthorizeUserStatus)
      this.fn_setAuthorizeUserStatus(bln_value);        
  }    
  fn_debugAuthorize(){
    let obj_auth=this.fn_getAuthorizeObject();
    console.log("/////////fn_debug Authorize/////////");
    console.log("AuthorizeSessionKey: " + obj_auth.AuthorizeSessionKey);
    console.log("AuthorizeUserEmail: " + obj_auth.AuthorizeUserEmail);
    console.log("AuthorizeUserPass: " + obj_auth.AuthorizeUserPass);      
    console.log("AuthorizeUserStatus: " + obj_auth.AuthorizeUserStatus);      
  }
  /////////////////////        
  fn_runAction(str_action,  obj_ini){         
    
    let obj_serverManager=this.fn_getComponent("loginPanelServerManager");      
    if(!obj_ini){obj_ini=new Object;}
    obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;            
    obj_ini.str_action=str_action;
    obj_ini.bln_execute=true;      
    obj_serverManager.fn_runAction(obj_ini);          
  }

  fn_checkAuthorize(){        
    this.fn_runAction("runauthstatus", {});            
  }  
  /////////////////////        
  fn_startAuthorize(){//runs on projectload, on loginform submit, on power button press     
    //console.log("LOGIN fn_startAuthorize");

    let obj_item, bln_valid;
    let AuthorizeUserEmail, AuthorizeUserPass;
    AuthorizeUserEmail="";
    AuthorizeUserPass=""; 
    
    let obj_Project=this;
    obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
    if(obj_item){
      AuthorizeUserEmail=obj_item.fn_getValue();
      obj_item.fn_setDisplay(true);        
      obj_item.fn_setDomProperty("autocomplete", "email");        
      obj_item.fn_setDomProperty("type", "email");        
    }
    
    obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
    if(obj_item){
      AuthorizeUserPass=obj_item.fn_getValue();                        
      obj_item.fn_setDomProperty("placeholder", "One Time Pass");        
      obj_item.fn_setDomProperty("inputmode", "numeric");        
      obj_item.fn_setDomProperty("pattern", "[0-9]*");        
      obj_item.fn_setDomProperty("autocomplete", "one-time-code");        
      obj_item.fn_setDomProperty("type", "text");        
    }            

    bln_valid=obj_shared.fn_validEmail(AuthorizeUserEmail);
    if(!bln_valid){      
      return;
    }
    
    let obj_auth={        
      AuthorizeUserEmail:AuthorizeUserEmail,
      AuthorizeUserPass:AuthorizeUserPass
    };

    this.fn_setAuthorizeObject(obj_auth);
    this.fn_getAuthorizeObject(obj_auth);

    obj_Project.fn_runAction("XDesigner_startAuthorize", obj_auth);            
  }
  XDesigner_startAuthorize(obj_post){                                    
    
    let bln_value;          
    
    this.fn_setAuthorizeObject(obj_post);//set values from server on client
    let obj_auth=this.fn_getAuthorizeObject();//get client values      
    
    let bln_valid=obj_shared.fn_validEmail(obj_auth.AuthorizeUserEmail);
    if(!bln_valid){
      bln_value=this.fn_requireAuthorizeUserEmail();        
      if(!bln_value){return false;}
    }      

    if(!obj_auth.AuthorizeUserPass){
      bln_value=this.fn_requireAuthorizeUserPass();        
      if(!bln_value){return false;}             
    }
    
    if(!obj_auth.AuthorizeUserStatus){
      this.fn_onEndAuthorize();              
      return;
    }
    
    let obj_notify=this.obj_holder.obj_regisratorProject;
    let str_method="fn_onLogIn";                   
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method]();
    }
  }

  fn_requireAuthorizeUserEmail(){      
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
    let AuthorizeUserEmail;
    if(obj_item){
      obj_item.fn_setDisplay(true);        
      AuthorizeUserEmail=obj_item.fn_getValue();        
    }
    
    let bln_valid=obj_shared.fn_validEmail(AuthorizeUserEmail);      
    if(!bln_valid){        
      this.fn_showFormAuthorize();            
      return false;
    }

    this.fn_setAuthorizeUserEmail(AuthorizeUserEmail);      
    return true;
  }
  
  fn_requireAuthorizeUserPass(){
    
    let AuthorizeUserPass;
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
    if(obj_item){
      obj_item.fn_setDisplay(true);        
      AuthorizeUserPass=obj_item.fn_getValue();
    }
    if(!AuthorizeUserPass){        
      this.fn_showFormAuthorize();
      return false;
    }
    this.fn_setAuthorizeUserPass(AuthorizeUserPass);    
    obj_item.fn_setValue("");              
    return true;
  }
  fn_endAuthorize(){                
    let obj_auth={};      
    
    
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
    if(obj_item){obj_item.fn_setDisplay(false);}      
    
    obj_Project.fn_runAction("XDesigner_endAuthorize", obj_auth);
  } 
  XDesigner_endAuthorize(obj_post){      
    this.fn_onEndAuthorize();
  }    

  fn_onEndAuthorize(){      
    let obj_notify=this.obj_holder.obj_regisratorProject;
    let str_method="fn_onLogout";                   
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method]();
    }      

    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
    if(obj_item){        
      obj_item.fn_setValue("");
    }
    this.fn_showFormAuthorize();            
  }
  /////////////////////            
  fn_onUnAuthorizeUserStatus(obj_post){
    //console.log("loginpanel fn_onUnAuthorizeUserStatus");

    this.fn_showFormAuthorize();

    let obj_notify=this.obj_holder.obj_regisratorProject;    
    let str_method="fn_onUnAuthorizeUserStatus";
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method](obj_post);
    }      
      
  }
  fn_onAuthorizeUserStatus(obj_post){
    //console.log("loginpanel  fn_onAuthorizeUserStatus");

    this.fn_hideFormAuthorize();

    let obj_notify=this.obj_holder.obj_regisratorProject;    
    let str_method="fn_onAuthorizeUserStatus";
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method](obj_post);
    }          
  }

  fn_showFormAuthorize(){        
    //console.log("login panel fn_showFormAuthorize");

    this.fn_setVisibility(true);
    this.fn_setDisplay("flex");
    
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("loginpanelform");                                                
    if(obj_item){
      obj_item.fn_setVisibility(true);
      obj_item.fn_setDisplay(true);
    }    
    
    obj_item=obj_Project.fn_getComponent("loginbutton");                                                      
    if(obj_item){
      obj_item.fn_setVisibility(false);
      obj_item.fn_setDisplay(false);      
    }
  }
  fn_hideFormAuthorize(){   
    //console.log("login panel fn_hideFormAuthorize");

    this.fn_setVisibility(true);
    this.fn_setDisplay("flex");

    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("loginpanelform");                                                
    if(obj_item){
    obj_item.fn_setVisibility(false);
    obj_item.fn_setDisplay(false);
    }
    
    if(!this.obj_design.bln_useExternalButton){
      obj_item=obj_Project.fn_getComponent("loginbutton");                                                      
      if(obj_item){
        obj_item.fn_setVisibility(true);
        obj_item.fn_setDisplay(true);
      }
    }
  }                     
  /*
  /////////////////////        
  //START Parent XDesginInterface LoginPanel Template - to copy
  fn_onUnAuthorizeUserStatus(){    
    let obj_item;
    //Hide project 
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }          
    obj_item=this.fn_getComponent("ExampleProjectGrid");
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }
    //Show loginpanel 
    obj_item=this.fn_getComponent("loginPanel"); 
    if(obj_item){                
      obj_item.fn_showFormAuthorize();
    }     
  }        
  fn_onAuthorizeUserStatus(){
    let obj_item;
    //Show project 
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(true);
    }          
    obj_item=this.fn_getComponent("ExampleProjectGrid");
    if(obj_item){        
      obj_item.fn_setDisplay("grid");
    }
    //Hide loginpanel 
    obj_item=this.fn_getComponent("loginPanel"); 
    if(obj_item){                
      obj_item.fn_hideFormAuthorize();
    }     
  }        
  /////////////////////
  fn_endAuthorize(){//project external button will/call this funciton 
    let obj_item=this.fn_getComponent("loginPanel");
    if(obj_item){obj_item.fn_endAuthorize();}      
  }    
  fn_checkAuthorize(){//project onload call this function to update login status
    let obj_item=this.fn_getComponent("loginPanel");
    if(obj_item){obj_item.fn_checkAuthorize();}      
  }          
  fn_onLogIn(){//project can welcome onlogin
    //welcome etc
  }        
  fn_onLogout(){//project can goodbye onlogout
    //good bye etc
  }   
  //END Parent XDesginInterface LoginPanel Template - to copy
  /////////////////////        
  //*/
}//END CLS
//END component/loginpanel