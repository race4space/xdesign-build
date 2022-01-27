
//XSTART component/abcconsumer
class abcconsumer extends component{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("abcconsumer");      
    this.fn_setTag("abcconsumer");            
    this.obj_design.bln_isGenericTag=true;
    // this.fn_extends("component");            
    this.obj_holder.bln_debugServer=true;
  }

  fn_onLoad(){ //design project on load
    super.fn_onLoad();      
    this.fn_checkAuthorize();        
  }  

  /////////////////////        
  //START Parent XDesginInterface LoginPanel Template 
  fn_onUnAuthorizeUserStatus(obj_post){
    console.log("AAA PROJECT COMPONENT fn_onUnAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
    let obj_item;  
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }              
    obj_item=this.fn_getComponent("maingrid"); 
    if(obj_item){              
      obj_item.fn_setDisplay(false);
    }          
    obj_item=this.fn_getComponent("loginPanel");     
    if(obj_item){                
      obj_item.fn_showFormAuthorize();
    }     
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(true);
    }          
  }  
  fn_onAuthorizeUserStatus(obj_post){
    console.log("BBB PROJECT COMPONENT  fn_onAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
    let obj_item; 
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }          
    obj_item=this.fn_getComponent("maingrid"); 
    if(obj_item){              
      obj_item.fn_setDisplay("grid");
    } 
    obj_item=this.fn_getComponent("loginPanel");     
    if(obj_item){                
      obj_item.fn_hideFormAuthorize();
    }     
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(true);
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
  //END Parent XDesginInterface LoginPanel Template 
  /////////////////////        
}//END CLS
//END TAG
//END component/abcconsumer