  //XSTART component/xdesign1
  class xdesign1 extends component{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      this.fn_setType("xdesign1");      
      this.fn_setTag("xdesign1");            
      this.obj_design.bln_isGenericTag=true;
      //this.fn_extends("abc");            
      this.obj_design.bln_listenChange=true;                                
      
      this.obj_holder.bln_debugEvent=false;
      this.obj_holder.bln_debugServer=false;
    }

    fn_getDebugEvent(){
      return this.obj_holder.bln_debugEvent;
    }

    fn_register(obj_item){                         
      
      super.fn_register(obj_item);
      switch(obj_item.obj_design.str_variableName){            
        case 'xdesign1_clipboard':
        obj_clipboard=obj_item;
        break;            
      }
    }    
    
    fn_onLoad(){ //design project on load
        //see fn_projectTarget_onLoad for design target  on load  
        super.fn_onLoad();  
        //console.log("xdesign1 on load");    
        this.fn_onStateChange();        
        
        this.fn_checkAuthorize();        
    }  

    fn_setLocationMatchInstance(obj_post){            
      let bln_value, bln_match;
      bln_value=obj_post.LocationMatchInstance;
      bln_match=true;                                    
      if(bln_value===undefined){bln_match=true;}
      if(bln_value===false){bln_match=false;}            
      this.LocationMatchInstance=bln_match;            
    }
    fn_getLocationMatchInstance(){            
      return this.LocationMatchInstance;          
    }

    fn_setLocationMatchComponentCode(obj_post){            
      let bln_value, bln_match;
      bln_value=obj_post.LocationMatchComponentCode;
      bln_match=true;                                    
      if(bln_value===undefined){bln_match=true;}
      if(bln_value===false){bln_match=false;}            
      this.LocationMatchComponentCode=bln_match;            
    }
    fn_getLocationMatchComponentCode(){            
      return this.LocationMatchComponentCode;          
    }
    
    fn_unLoad(){

      //set reference to design frames publish object, called when that object has loaded in the frame
      if(obj_projectTarget){
        obj_projectTarget=false;  
      }
      this.obj_palettSelected=false;
      //note  obj_projectTarget.obj_designDelegate will still be undefined at thsi point.                

      this.fn_onStateChange();                     

      this.fn_close();
    }

    fn_close(){

      let obj_item;
      obj_item=this.obj_holder.obj_xdesign1_managersettings;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managerproject;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managerpalette;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managercomponent;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managermessenger;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managertag;
      if(obj_item){obj_item.fn_close();}
    }

    fn_projectTarget_onLoad(){   //project target
      //console.log("fn_projectTarget_onLoad");

      //set reference to design frames publish object, called when that object has loaded in the frame
      obj_projectTarget=this.obj_holder.obj_xdesign1_padiframe.dom_obj.contentWindow.obj_project;                         
      if(!obj_projectTarget){
        console.log("Error: obj_projectTarget is false");
      }
      //note  obj_projectTarget.obj_designDelegate will still be undefined at thsi point.  
      obj_project.obj_palettSelected=obj_projectTarget;      
      this.fn_onStateChange();      
      this.obj_holder.obj_xdesign1_managertag.fn_open();    

    }    
    
    fn_onStateChange(){    
      
      //console.log("XDESIGN fn_onStateChange");
      
      this.obj_holder.obj_xdesign1_managersettings.fn_onStateChange();  
      this.obj_holder.obj_xdesign1_managerproject.fn_onStateChange();
      this.obj_holder.obj_xdesign1_managermessenger.fn_onStateChange();
      this.obj_holder.obj_xdesign1_managerpalette.fn_onStateChange();    
      this.obj_holder.obj_xdesign1_managertag.fn_onStateChange();    
      this.obj_holder.obj_xdesign1_managercomponent.fn_onStateChange();  
    }          
    fn_onPaletteItemSelected(){             
      
      let obj_item=this.obj_palettSelected; 

      if(!obj_item){        
        return;
      }               
      
      this.obj_holder.obj_xdesign1_managerproject.fn_onPaletteItemSelected();
      this.obj_holder.obj_xdesign1_managerpalette.fn_onPaletteItemSelected();
      this.obj_holder.obj_xdesign1_managertag.fn_onPaletteItemSelected();              
      this.obj_holder.obj_xdesign1_managermessenger.fn_onPaletteItemSelected();
      this.obj_holder.obj_xdesign1_managercomponent.fn_onPaletteItemSelected();
    }  
    fn_onPaletteItemDeSelected(){
      let obj_item=obj_project.obj_palettSelected;   
      if(!obj_item){return;}
      /*
      this.obj_holder.obj_managerTag.fn_onPaletteItemDeSelected();  
      //*/
    }    
    fn_removeId(obj_item){      
      
      this.obj_designDelegate.fn_removeId(obj_item);
      //this.obj_holder.obj_xdesign1_managerpalette.fn_removeId(obj_item);
    }      
    fn_getGlass(){
      return this.obj_holder.obj_xdesign1_padiframe.dom_obj.contentWindow;
    }
    fn_runAction(str_action,  obj_ini){         

      let obj_serverManager=this.obj_holder.obj_xdesign1_designfile;              
      if(!obj_ini){obj_ini=new Object;}
      obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;      
      obj_ini.str_action=str_action;
      obj_serverManager.fn_runAction(obj_ini);          
    }
    fn_consoleLog(str_text){
      this.obj_holder.obj_xdesign1_managersettings.fn_consoleLog(str_text);            
    }
    
    //EVENTS
    //START TAG MANAGER EVENTS          
    fn_setEazyGridSwitch(){
      return this.obj_holder.obj_xdesign1_managertag.fn_setEazyGridSwitch();
    }          
    fn_editTag(){    
      this.obj_holder.obj_xdesign1_managertag.fn_editTag();
    }
    fn_unlockPaletteSelected(){    
      this.obj_holder.obj_xdesign1_managertag.fn_unlockPaletteSelected();
    }
    fn_lockPaletteSelected(){    
      this.obj_holder.obj_xdesign1_managertag.fn_lockPaletteSelected();
    }
    fn_selectLocalHome(){
      return this.obj_holder.obj_xdesign1_managertag.fn_selectLocalHome();      
    }
    fn_clearPaletteSelect(){
      return this.obj_holder.obj_xdesign1_managertag.fn_clearPaletteSelect();      
    }
    fn_cutTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_cutTag();      
    }
    fn_deleteTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_deleteTag();      
    }
    fn_copyTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_copyTag();      
    }
    fn_pasteTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_pasteTag();      
    }
    fn_insertTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_insertTag();      
    }              
    fn_moveObjectCompassUp(){  
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassUp();
    }
    fn_moveObjectCompassDown(){  
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassDown();
    }          
    fn_moveObjectCompassHome(){
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassHome();
    }
    fn_moveObjectCompassHorizontal(){
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassHorizontal();
    }
    fn_linkCompassItem(){                        
      return this.obj_holder.obj_xdesign1_managertag.fn_linkCompassItem();
    }
    //END TAG MANAGER EVENTS
    
    //START PALETTE MANAGER EVENTS
    fn_getInsertContainer(obj_item, int_idRecord){
      return this.obj_holder.obj_xdesign1_managerpalette.fn_getInsertContainer(obj_item, int_idRecord); 
    }
    fn_addPaletteTagFromInput(){           
      return this.obj_holder.obj_xdesign1_managerpalette.fn_addPaletteTagFromInput();          
    }
    fn_addComponentItem(obj_ini){//refers to adding custom components from palett via button
      return this.obj_holder.obj_xdesign1_managerpalette.fn_addComponentItem();
    }        
    getListPalettePinnedComponentInCategory(obj_post){  
      this.obj_holder.obj_xdesign1_managerpalette.fn_onGetListPalettePinnedComponentInCategory(obj_post);
    }    
    //END PALETTE MANAGER EVENTS
    //START PROJECT MANAGER EVENTS          
    fn_saveProject(){   //save the project in the iframe  
      this.obj_holder.obj_xdesign1_managerproject.fn_saveProject();    
    }
    fn_saveComponent(){ //save Selected Item                 
      //console.log("XDESIGN1 fn_saveComponent click button")
      this.obj_holder.obj_xdesign1_managerproject.fn_saveComponent(this.obj_palettSelected);
    }
    fn_saveAsComponent(){        
      this.obj_holder.obj_xdesign1_managerproject.fn_saveasProject();
    }
    onSaveComponent(obj_post){//callback function from save function
      //console.log("XDESIGN1 onSaveComponent call back function")
      this.obj_holder.obj_xdesign1_managerproject.fn_onSaveComponent(obj_post);        

      /*
      if(obj_project){
        if(obj_project.obj_palettSelected){                          
          console.log("Project: onSaveComponent call fn_setPaletteSelected");
          obj_project.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();                                        
          
        }
      }  
      //*/
    }
    fn_openComponent(){      
      this.obj_holder.obj_xdesign1_managerproject.fn_openComponent();
    }
    deprecated_fn_getListProject(){  //not required
      this.obj_holder.obj_xdesign1_managerproject.getListProject();        
    }    
    deprecated_getListProjectInCategory(obj_post){//run action callback
      this.obj_holder.obj_xdesign1_managerproject.fn_onGetListProjectInCategory(obj_post);
    }        
    fn_releaseProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_releaseProject();        
    }
    releaseProject(obj_post){  
      this.obj_holder.obj_xdesign1_managerproject.fn_onReleaseProject(obj_post);        
    }
    fn_publishProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_publishProject();        
    }
    publishProject(obj_post){  
      this.obj_holder.obj_xdesign1_managerproject.fn_onPublishProject(obj_post);        
    }
    fn_deleteProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_deleteProject();      
    }
    deleteProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_onDeleteProject();      
    }
    fn_toggleProjectPin(){//button event 
      this.obj_holder.obj_xdesign1_managerproject.fn_toggleProjectPin();
    }
    toggleProjectPin(){//run action callback
      this.obj_holder.obj_xdesign1_managerproject.fn_onToggleProjectPin();
    }          
    fn_newProject(){      
      this.obj_holder.obj_xdesign1_managerproject.fn_newProject();
    } 
    newProject(obj_post){             
      this.obj_holder.obj_xdesign1_managerproject.fn_onNewProject(obj_post);  
    }
    fn_openProject(int_idRecord){      
      this.obj_holder.obj_xdesign1_managerproject.fn_openProject(int_idRecord);            
    }
    openProject(obj_post){      
      this.obj_holder.obj_xdesign1_managerproject.fn_onOpenProject(obj_post);                        
    }
    //END PROJECT MANAGER EVENTS

    

    fn_XDesigner_createBackup(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_createBackup();  
    }
    XDesigner_createBackup(obj_post){ 
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_createBackup(obj_post);
    }
    fn_XDesigner_release(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_release();  
    }
    XDesigner_release(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_release(obj_post);
    }

    
    fn_XDesigner_move(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_move();  
    }
    XDesigner_move(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_move(obj_post);
    }
    fn_XDesigner_maintain(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_maintain();  
    }
    XDesigner_maintain(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_maintain(obj_post);
    }
    fn_XDesigner_compile(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_compile();  
    }
    XDesigner_compile(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_compile(obj_post);
    }
    fn_importAll(){
      this.obj_holder.obj_xdesign1_managersettings.fn_importAll();                        
    }
    importAll(){
      this.obj_holder.obj_xdesign1_managersettings.fn_onimportAll();  
    }          
    //END  SETTINGS MANAGER EVENTS
    //START  COMPONENT MANAGER EVENTS
    fn_onOpenComponentCode(obj_post){  
      return this.obj_holder.obj_xdesign1_managercomponent.fn_onOpenComponentCode(obj_post);
    }
    //END COMPONENT MANAGER EVENTS

    //START PROPERTY SHEET EVENT HANDLING                    
    fn_linkDomStyleChange(){            
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDomStyleChange();            
    }
    fn_linkDomPropertyChange(){
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDomPropertyChange();
    }
    fn_linkDomAttributeChange(){
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDomAttributeChange();                        
    }          
    fn_linkDesignChange(){  
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDesignChange();            
    }
    fn_linkTextEditChange(){            
      return this.obj_holder.obj_xdesign1_managermessenger.fn_linkTextEditChange();            
    }
    fn_propertyDOMStyleChangeName(){            
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDOMStyleChangeName();                      
    }
    fn_propertyDOMStyleChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDOMStyleChangeValue();                      
    }
    fn_propertyDomPropertyChangeName(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomPropertyChangeName();                      
    }
    fn_propertyDomPropertyChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomPropertyChangeValue();                                  
    }
    fn_propertyDomAttributeChangeName(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomAttributeChangeName();                      
    }
    fn_propertyDomAttributeChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomAttributeChangeValue();
    }          
    fn_propertyDesignChangeName(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDesignChangeName();            
    }
    fn_propertyDesignChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDesignChangeValue();                        
    }
    //END PROPERTY SHEET EVENT HANDLING    
    //START COMPONENT EVENT HANDLING
    fn_onChange(){            
      this.fn_event_call(obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange");//see if the event occurred on a dom that has registered this event                     
      this.fn_event_call(obj_project.obj_holder.str_prefix + "myDesignerPaletteTextEditOnChange");//see if the event occurred on a dom that has registered this event         
      this.fn_event_call(obj_project.obj_holder.str_prefix + "boot_managerComponent_TextEditorOnChange");//see if the event occurred on a dom that has registered this event         
    
    }
    fn_onClick(){              
      
      this.fn_event_call(obj_project.obj_holder.str_prefix + "myDesignerButtonClick");//see if the event occurred on a dom that has registered this event         
    }
    //END COMPONENT EVENT HANDLING   
    

    /////////////////////  
    fn_setVersionButton(bln_createRelease=false){
      this.obj_holder.bln_createRelease=bln_createRelease;
      let obj_item=this.fn_getComponent("xdesign1_publishProject");            
      if(!obj_item){return;}              

      let str_text="Version";      
      if(this.obj_holder.bln_createRelease){
        str_text="Release";
      }
      obj_item.fn_setText(str_text);        
    }
    //START Parent XDesginInterface LoginPanel Template 
    fn_navigateURLLogin(){
      let int_pos=window.location.href.indexOf("lokal");//localhost                   
      let str_urlNavigate;
      str_urlNavigate="https://desk.mycode.buzz";
      if(int_pos!==-1){str_urlNavigate="http://desk.lokal-mycode.buzz";}                  
      window.location.href=str_urlNavigate;
      //window.open(str_urlNavigate);                  
    }
    fn_onUnAuthorizeUserStatus(obj_post){
      //console.log("AAA XDESIGN fn_onUnAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);      
      let obj_item;  
      obj_item=this;      
      if(obj_item){        
        obj_item.fn_setDisplay(false);
      }             
      obj_item=this;    
      if(obj_item){        
        obj_item.fn_navigateURLLogin(false);
      }                
    }
    fn_onAuthorizeUserStatus(obj_post){
      //console.log("BBB XDESIGN fn_onAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
      let obj_item;        
      obj_item=this.fn_getComponent("loginPanel"); 
      if(obj_item){                
        obj_item.fn_setDisplay(false);
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
      let obj_item;
      
      this.fn_consoleLog("Welcome");
      
      this.fn_onStateChange();                     

      obj_item=this.fn_getComponent("xdesign1_managersettings");                                          
      if(obj_item){        
        obj_item.fn_open();
        obj_item.fn_close(false);
        obj_item.fn_XDesigner_onLogIn();
      }
      obj_item=this.fn_getComponent("xdesign1_managerproject");                                    
      if(obj_item){
        obj_item.fn_open();
        obj_item.fn_XDesigner_onLogIn();
      }      
    }        
    fn_onLogout(){//project can goodbye onlogout
    }            
    //END Parent XDesginInterface LoginPanel Template 
    /////////////////////        
  }//END CLS  
  //END component/xdesign1