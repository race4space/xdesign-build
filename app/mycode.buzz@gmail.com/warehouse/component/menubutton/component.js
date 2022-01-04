class menubutton extends component {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor        

        
    }    
    fn_initialize(obj_ini){                
        
        super.fn_initialize(obj_ini);
        
        this.fn_setType("menubutton");      
        this.fn_setTag("button", true);      

        this.fn_setIsContainer(true);

        //START INITIALIZE DESIGN
        this.bln_isOpen=obj_ini.bln_isOpen;
        if(this.bln_isOpen===undefined){this.bln_isOpen=false}                                        

        this.obj_design.bln_listenClick=true;
        this.obj_design.str_nameEventClick=this.obj_holder.str_prefix + "MenuButtonClick";  
        this.obj_design.str_valueEventClick="fn_MenuButtonClick";                  

        if(this.obj_design.str_text===undefined){this.obj_design.str_text=this.obj_design.str_name;}            
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM
        
        
        //END INITIALIZE DOM
        
        //START INITIALIZE STYLE        
        /*
        if(this.fn_getStyleProperty("flex-wrap")===undefined){this.fn_setStyleProperty("flex-wrap", "wrap");}
        if(this.fn_getStyleProperty("display")===undefined){this.fn_setStyleProperty("display", "block");}
        if(this.fn_getStyleProperty("width")===undefined){this.fn_setStyleProperty("width", "100%");}
        if(this.fn_getStyleProperty("height")===undefined){this.fn_setStyleProperty("height", "45px");}
        if(this.fn_getStyleProperty("padding")===undefined){this.fn_setStyleProperty("padding", "3px 12px");}
        if(this.fn_getStyleProperty("border")===undefined){this.fn_setStyleProperty("border", "0px solid black");}
        if(this.fn_getStyleProperty("font-size")===undefined){this.fn_setStyleProperty("font-size", "12pt");}        
        if(this.fn_getStyleProperty("cursor")===undefined){this.fn_setStyleProperty("cursor", "pointer");}
        if(this.fn_getStyleProperty("margin-right")===undefined){this.fn_setStyleProperty("margin-right", "1px");}
        if(this.fn_getStyleProperty("margin-bottom")===undefined){this.fn_setStyleProperty("margin-bottom", "1px");}
        //*/  

        //*
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="block";}
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="45px";}    
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}
        if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                          
        if(this.obj_domStyle.fontSize===undefined){this.obj_domStyle.fontSize="12pt";}        
        if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="1px";}      
        if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}      
        //*/  
        //END INITIALIZE STYLE

        
    }        
    
    fn_createSelf(){

        super.fn_createSelf();
        
        let dom_obj;
        dom_obj=document.createElement("div");        
        this.dom_obj.parentNode.insertBefore(dom_obj, this.dom_obj.nextSibling);                
        dom_obj.style.display="none";
        this.dom_objContentContainer=dom_obj;            

        dom_obj=document.createElement("flex");
        dom_obj.style.display="flex";        
        dom_obj.style.flexWrap=this.obj_domStyle.flexWrap;        
        dom_obj.style.padding="0px";                        
        dom_obj.style.marginBottom="0px";                        
        dom_obj.style.marginRight="0px";                        
        dom_obj.style.width="100%";
        dom_obj.innerHTML=this.obj_design.str_content;
        this.dom_objContent=dom_obj;
        this.dom_flex=dom_obj;
        this.dom_objContentContainer.append(dom_obj);        
    }
    
    fn_addItem(obj_ini){
        let obj_item;        
        if(obj_ini.obj_design.str_type===undefined){
            obj_ini.obj_design.str_type="button";                   
        }        
        obj_ini.obj_theme=this.fn_shallowCopyObject(this.obj_theme);                                  
        obj_item=super.fn_addItem(obj_ini);//CallSuper
        
        return obj_item;
    }
    fn_onLoad(){
        super.fn_onLoad();        
        if(this.bln_isOpen){
            this.fn_open();        
        }
    }    
    fn_openContainer(){//not currently in use, assumes container has this funciton
        this.obj_holder.obj_container.fn_open(this);
        
    }
    fn_open(){  
        if(this.obj_domProperty.disabled){            
            return;
        }
        let style=this.dom_objContentContainer.style;
        style.display="block";
        this.bln_isOpen=true;
        //alert("fn_open: " + this.obj_domProperty.innerText);
    }
    fn_close(){                       
        let style=this.dom_objContentContainer.style;
        style.display="none";
        this.bln_isOpen=false;        
        //alert("fn_close: " + this.obj_domProperty.innerText);
    }
    fn_toggle(){                
        if(this.bln_isOpen){this.fn_close();}
        else{this.fn_open();}
    }        
    fn_setHTMLContent(){
        super.fn_setHTMLContent();    
        this.fn_setText(this.obj_design.str_text);                
    } 
    fn_onClick(){          
        //this.fn_event();                
        this.fn_toggle();
    }


      
    
}//END CLS
//END MENUBUTTON
