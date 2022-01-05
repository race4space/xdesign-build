
  //XSTART component/loginpanel
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
    }
    fn_setDisabled(){              
      super.fn_setDisabled();
    }
    //START SETTINGS MANAGER EVENTS          
    //START CHECK AUTHORIZE
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

    
    //END CHECK AUTHORIZE
    

    fn_checkAuthorize(){
      //let obj_auth=this.fn_getAuthorizeObject();
      obj_project.fn_runAction("XDesigner_checkAuthorize", {});            
    }
    fn_onCheckAuthorize(obj_post){
      this.fn_setAuthorizeObject(obj_post);//set values from server on client
      this.fn_processAuthorize();      
    }
    fn_processAuthorize(obj_post){            
      let obj_auth=this.fn_getAuthorizeObject();//get client values            
      if(!obj_auth.AuthorizeUserStatus){
        this.fn_onEndAuthorize();              
        return;
      }
      this.fn_hideFormAuthorize();
      obj_project.fn_XDesigner_onLogIn();      
    }
    

    //START ACTION AUTHORIZE          
    fn_startAuthorize(){//runs on projectload, on loginform submit, on loginbutton press     

      let obj_item, bln_valid;
      let AuthorizeUserEmail, AuthorizeUserPass;
      AuthorizeUserEmail="";
      AuthorizeUserPass="";            
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
      if(obj_item){
        AuthorizeUserEmail=obj_item.fn_getValue();
        obj_item.fn_setDisplay(true);        
        obj_item.fn_setDomProperty("autocomplete", "email");        
        obj_item.fn_setDomProperty("type", "email");        
      }
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
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

      obj_project.fn_runAction("XDesigner_startAuthorize", obj_auth);            
    }
    fn_onStartAuthorize(obj_post){
      
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

      this.fn_processAuthorize();
    }

    fn_requireAuthorizeUserEmail(){      
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
      let AuthorizeUserEmail;
      if(obj_item){
        obj_item.fn_setDisplay(true);        
        AuthorizeUserEmail=obj_item.fn_getValue();        
      }
      
      let bln_valid=obj_shared.fn_validEmail(AuthorizeUserEmail);      
      if(!bln_valid){        
        this.fn_displayFormAuthorize();            
        return false;
      }

      this.fn_setAuthorizeUserEmail(AuthorizeUserEmail);      
      return true;
    }
    
    fn_requireAuthorizeUserPass(){
      
      let AuthorizeUserPass;
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
      if(obj_item){
        obj_item.fn_setDisplay(true);        
        AuthorizeUserPass=obj_item.fn_getValue();
      }
      if(!AuthorizeUserPass){        
        this.fn_displayFormAuthorize();
        return false;
      }
      this.fn_setAuthorizeUserPass(AuthorizeUserPass);    
      obj_item.fn_setValue("");              
      return true;
    }
    

    fn_hideFormAuthorize(){      
      this.fn_setVisibility(false);
      this.fn_setDisplay(false);
      obj_project.fn_XDesigner_onHideLogIn();      
    }                     
    
    fn_endAuthorize(){                
      let obj_auth={};      
      
      //important, dont hide pass field in processlogin or fn_onEndAuthorize
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
      if(obj_item){obj_item.fn_setDisplay(false);}      
      //important, dont hide pass field in processlogin or fn_onEndAuthorize
      
      obj_project.fn_runAction("XDesigner_endAuthorize", obj_auth);
    }    

    fn_onEndAuthorize(){      
      obj_project.fn_XDesigner_onLogOut();      
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
      if(obj_item){        
        obj_item.fn_setValue("");
      }
      this.fn_displayFormAuthorize();            
    }

    fn_displayFormAuthorize(){                  
      this.fn_setVisibility(true);
      this.fn_setDisplay("flex");
      obj_project.fn_XDesigner_onShowLogIn();      
    }
    orig_backupstrart_auth(){//runs on projectload, on loginform submit, on loginbutton press      
      
      let obj_item;
      AuthorizeUserEmailSubmit="";
      AuthorizeUserPassSubmit="";            
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeSubmitEmail");                                    
      if(obj_item){AuthorizeUserEmailSubmit=obj_item.fn_getValue();}
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeSubmitPass");                                    
      if(obj_item){AuthorizeUserPassSubmit=obj_item.fn_getValue();}            

      if(AuthorizeUserEmailSubmit===""){return;}
      if(AuthorizeUserPassSubmit===""){return;}
      
      let obj_auth={        
        AuthorizeUserEmailSubmit:AuthorizeUserEmailSubmit,
        AuthorizeUserPassSubmit:AuthorizeUserPassSubmit
      };
      obj_project.fn_runAction("XDesigner_startAuthorize", obj_auth);            
    }
    //END ACTION AUTHORIZE
  }//END CLS
  //END TAG
  //END component/loginpanel