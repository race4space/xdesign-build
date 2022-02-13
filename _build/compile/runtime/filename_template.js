
//START Project.js
class Project extends {str_nameTargetClass}{
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
        
        /*
        THe use of this wrapper function allows items to be called form database , rather than hard-written into the code.        
        //e.g it allows the use of a simple Main procedure "new wrapper" which is name agnostic.
        //*/
    }  
    fn_onLoad(){
        super.fn_onLoad();        
        //console.log("Project Loaded: " + this.obj_design.str_name);
        //alert(obj_projectTarget)
    }
    fn_initialize(obj_ini){        
        super.fn_initialize(obj_ini);
        
        //START INITIALIZE DESIGN        
        if(this.obj_design.int_idRecord==undefined){this.obj_design.int_idRecord=0;}        

        if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Project";}       

        
        //if(this.obj_domStyle.display==undefined){this.obj_domStyle.display="block";}        
        

        this.obj_holder.bln_isRoot=true;
        
        if(this.obj_design.bln_isContainer==undefined){this.obj_design.bln_isContainer=true;}
        //this.fn_setIsContainer(true);                 
        
        
        
        this.fn_loadBootVariables();
        //END INITIALIZE DESIGN

        //START INITIALIZE DOM PROPERTY                
        //END INITIALIZE DOM PROPERTY

        //START INITIALIZE DOM ATTRIBUTE
        //END INITIALIZE DOM ATTRIBUTE
        
        //START INITIALIZE STYLE
        //END INITIALIZE STYLE

        //START INITIALIZE THEME           
        //END INITIALIZE THEME                
    }   

    fn_setParentComponent(obj_parent){    
        console.log("PROJECT dont set Parent Component");
    }

    fn_getMyThemeItem(obj_myThemeProject){//project is always themed by direct referral to the the them project
        return obj_myThemeProject;        
    }

    fn_getisBootMode(){
        let str_mode=this.fn_getMode();
        if(str_mode==="boot"){return true;}
        return false;
    }
    
    fn_getisRuntimeMode(){

        let str_mode=this.fn_getMode();
        if(str_mode===null){return true;}
        return false;
    }
    fn_getisEditMode(){

        let str_mode=this.fn_getMode();
        if(str_mode==="edit"){return true;}
        return false;
    }
    fn_getMode(){

        let params;
        params = new URLSearchParams(location.search.toLowerCase());                
        return params.get('mode');        
    }    

    fn_loadBootVariables(){

        let str_mode=this.fn_getMode();

        switch(str_mode){            
            case "edit":
                this.obj_design.int_modeExecute=this.obj_holder.int_modeEdit;                                                                
                break;         
            case "boot":
                this.obj_design.int_modeExecute=this.obj_holder.int_modeBoot;                                                                
                break;         
            default:
                this.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;                                
        }                        
        
        let int_idRecord;        
        int_idRecord=this.obj_design.int_idRecord;
        this.obj_design.int_idRecord=parseInt(int_idRecord);        

    }
    
    fn_createSelf(){        
        this.fn_setTagOption();
        super.fn_createSelf();        
    }        
    
    xfn_applyTheme(){//for the moment empty to prevent theme being uncessily applied, needs theme moved to obj_holder        
    }       
    fn_initializePluginDesign(){                  
        this.obj_designDelegate=new DesignDelegateProjectInstance(this);//this will call the design programs component onload event                                  
    }  
    fn_applyTheme(){
        //apply theme to all child objects of type eazygrid and eazygriditem
        this.fn_setItemStyleProperty("eazygrid", "backgroundColor", this.obj_theme.backgroundColor);
        this.fn_setItemStyleProperty("eazygriditem", "backgroundColor", this.obj_theme.foregroundColor);        
     } 
     fn_viewInBrowser(){
        let o=window.open("../../myProject/", "xDesignViewInBrowser");
        if(o){o.focus()}
    }          
    
     //END Project Instance Functions

     fn_setTagOption(){

        /*COMPONENT TAG    
        //Following options for Project Wrapper:            
        1. Use No Tag
        2. Creating A Tag                 
        2. Use Exisitng Tag and Allow/DisAllow manipulation of this e.g color, padding etc
        //*/
        
        //Create own publish tag 
        //If used, publish does create its own tag , which will prevent any ammendments being made to its  parent HTML        
        //POSITION SELF
        this.dom_obj = document.createElement(this.obj_design.str_tag);                          
        //APPLIES ONLY TO PUBLISH AS IT IS THE ONLY ITEM THAT IS NOT INSERTED VIA ADDITEM
        //now position element in parent Dom                
        let dom_element=document.getElementById(idXdesignTarget);
        if(!dom_element){dom_element=document.body;}        
        obj_shared.fn_removeAllChildNodes(dom_element);
        dom_element.append(this.dom_obj);             
        //POSITION SELF
    }    
  }//END OF CLS

  /*START DESIGN BOOT VARIABLE//*/
obj_boot.obj_design.int_idRecord={int_idRecord}; 
/*END DESIGN BOOT VARIABLE//*/
//END Project.js

