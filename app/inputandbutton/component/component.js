class inputandbutton extends component {
    constructor(obj_ini) {

        super(obj_ini); // call the super class constructor        
    }    
    fn_initialize(obj_ini){        
        
        super.fn_initialize(obj_ini);               

        this.fn_setType("inputandbutton");      
        this.fn_setTag("inputandbutton");                        

        this.fn_requires("input");                        
        this.fn_requires("xdesign1_addtagbutton");                                
        
        this.fn_setIsContainer(true);

        //START INITIALIZE DESIGN
        if(this.obj_design.str_text===undefined){this.obj_design.str_text=this.obj_design.str_name;}            
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM                
        //END INITIALIZE DOM         
        
        //START INITIALIZE STYLE  
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}                      
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="1px";}        
        if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}        
        //END INITIALIZE STYLE
    }    

    fn_applyTheme(){ 
        
        //if(false!=true){return;}
        super.fn_applyTheme();
        this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          
        this.fn_setStyleProperty("color", this.obj_theme.highlightColor);          
    }   
    
    fn_bootChildren(){//only in boot/pallteItem phase

        let obj_ini, obj_input;
        let obj_row, obj_cell, obj_container;        

        obj_container=this;
        

        //ADD TEXT INPUT
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="input";        
        obj_ini.obj_domProperty.value="";                         
        obj_ini.obj_domStyle.marginRight="3px";                        
        obj_ini.obj_design.bln_registerAtContainer=true;
        obj_input=obj_container.fn_addItem(obj_ini);//BootItem                
        //END TEXT INPUT        

        //ADD BUTTON TO VALUE CELL
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="xdesign1_addtagbutton";                
        obj_ini.obj_design.str_name=this.obj_design.str_text;
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_design.str_linkId=obj_input.obj_design.str_idXDesign;                    
        //obj_ini.obj_design.str_nameEventClick=this.obj_design.str_nameEventButtonClick;
        //obj_ini.obj_design.xstr_valuexEventClick=this.obj_design.str_valueEventButtonClick;
        obj_container.fn_addItem(obj_ini);//BootItem                      
        //ADD BUTTON TO VALUE CELL    
    }
    xfn_setEnabled(bln_value){
        super.fn_setEnabled(bln_value);

        let obj_item;
        obj_item=this.fn_getComponent("xdesign1_addtagInput");                                    
        if(obj_item){        
            obj_item.fn_setEnabled(bln_value);
        }
        obj_item=this.fn_getComponent("xdesign1_addtagButton");                                    
        if(obj_item){
            obj_item.fn_setEnabled(bln_value);
        }

    }
    
}//END CLS
//END MENUBUTTON
