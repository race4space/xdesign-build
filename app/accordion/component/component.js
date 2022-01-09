class accordion extends component {
    constructor(obj_ini) {        
        super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
        super.fn_initialize(obj_ini);

        //START INITIALIZE DESIGN
        this.fn_setType("accordion");      
        this.fn_setTag("accordion");                                
        //END INITIALIZE DESIGN

        let str_name, str_value;
        str_name="width";
        str_value="100%";

        //START INITIALIZE STYLE      
        /*
        if(this.fn_getStyleProperty("width")===undefined){this.fn_setStyleProperty("width", "100%");}        
        //*/  
        //*
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}    
        //*/  
        //END INITIALIZE STYLE                
    }

    fn_bootChildren(){

        
        let obj_ini, obj_menuButton, obj_accordion, str_name;
        obj_accordion=this;

        obj_ini=new Holder;        
        obj_ini.obj_design.str_text="Group 1";              
        obj_ini.obj_design.str_idXDesign=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);//BootItem                      

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test A";                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem                
        
        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Group 2";                              
        obj_ini.obj_design.str_idXDesign=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);//BootItem                      

        obj_ini=new Holder;        
        obj_ini.obj_design.str_text="Test B";                              
        obj_menuButton.fn_addItem(obj_ini);//BootItem                

        /*
        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test C";                                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem                
        
        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Group 3";                                              
        obj_ini.obj_design.str_idXDesign=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);//BootItem                      

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test D";                                                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test E";                                                              
        obj_menuButton.fn_addItem(obj_ini);//BootItem

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test F";                                                                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem
        //*/
    }

    fn_addItem(obj_ini){
        //obj_ini required , used to pass accordion id etc
        
        obj_ini=this.fn_checkIni(obj_ini);        

        let obj_item;  
        obj_ini.obj_theme=this.fn_shallowCopyObject(this.obj_theme);                                  
        obj_ini.obj_design.str_type="menubutton";         
        obj_ini.obj_domStyle.flexDirection="row";           
        obj_ini.obj_domStyle.flexWrap="wrap";                  
        obj_item=super.fn_addItem(obj_ini);//CallSuper
        return obj_item;
    }
    
    //START COMPONENT EVENT HANDLING    
    fn_MenuButtonClick(){

        //console.log("aaaa");                    
        
        this.fn_open(obj_project.obj_projectEvent);    
        obj_project.fn_unsetEvent();                
    }
    fn_open(obj_target){
        
        if(!obj_target){return;}

        //obj_target.fn_open();            
        
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            let obj_item=this.obj_design.arr_item[i];            
            if(obj_item!=obj_target){
                if(!obj_item.obj_design.bln_isPinned){
                    obj_item.fn_close();                    
                }
            }
        }
    }
    //START COMPONENT EVENT HANDLING 
    fn_onClick(){           
        this.fn_event_call(obj_project.obj_holder.str_prefix + "MenuButtonClick");//trap lower                 
    }

}//END CLS
//END ACCORDION