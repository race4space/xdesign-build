class menubutton extends component {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor        
    }        
    fn_initialize(obj_ini){                
        
        super.fn_initialize(obj_ini);
        
        this.fn_setType("menubutton");      
        this.fn_setTag("button", true);              
        this.obj_design.bln_isMenuButton=true;

        this.fn_setIsContainer(true);

        //START INITIALIZE DESIGN        
        if(this.obj_design.bln_isOpen==undefined){this.obj_design.bln_isOpen=false;}//ensure visible placeholder at front of object defintion
        

        this.obj_design.bln_listenClick=true;
        this.obj_design.str_nameEventClick=this.obj_holder.str_prefix + "MenuButtonClick";  
        this.obj_design.str_valueEventClick="fn_MenuButtonClick";                  

        if(this.obj_design.str_text===undefined){this.obj_design.str_text=this.obj_design.str_name;}            
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM
        //END INITIALIZE DOM
        
        //START INITIALIZE STYLE                        
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="block";}
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="45px";}    
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}
        if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                          
        if(this.obj_domStyle.fontSize===undefined){this.obj_domStyle.fontSize="12pt";}        
        if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="0px";}      
        if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}              
        //END INITIALIZE STYLE
    }            
    fn_onLoad(){
        super.fn_onLoad();        
        if(this.obj_design.bln_isOpen){
            this.fn_openContent();        
        }        
        //this.fn_setColorGradient();
    }        
    
    fn_createSelf(){

        super.fn_createSelf();
        
        let dom_obj;
        dom_obj=document.createElement("div");        
        this.dom_obj.parentNode.insertBefore(dom_obj, this.dom_obj.nextSibling);                
        dom_obj.style.display="none";
        this.dom_objContentContainer=dom_obj;            

        dom_obj=document.createElement("flex");
        //dom_obj.style.display="flex";        
        dom_obj.style.display="block";        
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
    
    /*
    fn_setColorGradient(){
        let obj_parent=this.fn_getParentComponent();                
        let obj_container=obj_parent.fn_getObjectMatching("fn_setColorGradient");                
        if(obj_container){            
            if(obj_container){
                console.log("MENU BUTTON HIERACHY");
    
                let str_rgb=obj_container.dom_obj.style.backgroundColor;                              
                let str_hex=obj_shared.fn_convertRGBToHex(str_rgb);                    
                let str_hex_new=obj_shared.fn_lightenGradient(str_hex, 25);                
                this.fn_setStyleProperty("backgroundColor", str_hex_new);                                    
            }
        }      
    }
    //*/
    
    fn_setHTMLContent(){
        super.fn_setHTMLContent();    
        this.fn_setText(this.obj_design.str_text);                
    } 
    
    fn_addItem(obj_ini){
        let obj_item;        
        if(obj_ini.obj_design.str_type===undefined){
            obj_ini.obj_design.str_type="button";                   
        }                
        obj_item=super.fn_addItem(obj_ini);//CallSuper
        
        return obj_item;
    }        

    
    fn_setDisplay(bln_display=true){          
        
        if(!bln_display){
            this.obj_design.bln_pin=undefined;
        }
        super.fn_setDisplay(bln_display);
    }
    fn_open(){        
        this.fn_openContent();
    }
    fn_close(){        
        if(!this.obj_design.bln_pin){
            this.fn_closeContent();
        }                
    }
    fn_openContent(){          

        if(this.obj_domProperty.disabled){            
            return;
        }
    
        let obj_container=this.fn_getParentComponent();        
        let str_method="fn_open";        
        if(obj_container && obj_container[str_method]){
            obj_container[str_method]();
        }      
        
        this.dom_objContentContainer.style.display="block";
        this.obj_design.bln_isOpen=true;        

        //console.log("menu tab fn_openContent");

        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];                                    
            let str_method="fn_openContent";        
            if(obj_item && obj_item[str_method]){
                //console.log("obj_item fn_openContent");
                obj_item[str_method]();
            }                  
        }
    }
    fn_closeContent(){                           
        
        this.dom_objContentContainer.style.display="none";
        this.obj_design.bln_isOpen=false;                
        
        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];                                    
            let str_method="fn_closeContent";        
            if(obj_item && obj_item[str_method]){
                obj_item[str_method]();
            }                  
        }
    }    
    fn_toggle(bln_isOpen=false){                
        if(bln_isOpen){            
            //this.obj_design.bln_pin=false;
            this.fn_closeContent();
        }
        else{            
            this.fn_openContent();
        }
    }        
    
    fn_onClick(){                  

        let bln_isOpen=this.obj_design.bln_isOpen;        
        let obj_container=this.fn_getParentComponent();        
        let str_method="fn_close";        
        if(obj_container && obj_container[str_method]){
            obj_container[str_method]();
        }      

        
        this.fn_toggle(bln_isOpen)        
    }
}//END CLS
//END MENUBUTTON
