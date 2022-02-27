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
        
        //START INITIALIZE STYLE              
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}            
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="10px";}
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="block";}
        /*
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="flex";}                    
        this.fn_setStyleProperty("align-items", "flex-start");
        this.fn_setStyleProperty("flex-flow", "column wrap");
        //*/
        
        //END INITIALIZE STYLE                
    }
    
    fn_addItem(obj_ini=false){
        let obj_item;        
        if(!obj_ini){
          obj_ini=new Holder;
          obj_ini.obj_design.str_type="menubutton";                   
          obj_ini.obj_domStyle.flexDirection="row";           
            obj_ini.obj_domStyle.flexWrap="wrap";                  
        }      
        obj_item=super.fn_addItem(obj_ini);//CallSuper          
        return obj_item;
    }

    
    //START COMPONENT EVENT HANDLING        
    fn_open(){
        this.fn_openParent();
    }
    fn_close(){
        this.fn_closeLevel();
    }
    fn_openParent(){        
        let obj_container=this.fn_getParentComponent();        
        let str_method="fn_open";        
        if(obj_container && obj_container[str_method]){
            obj_container[str_method]();
        }              
    }
    fn_closeLevel(){
        
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            let obj_item=this.obj_design.arr_item[i];                                    
            let str_method="fn_close";        
            if(obj_item && obj_item[str_method]){
                if(!obj_item.obj_design.bln_isPinned){
                    obj_item[str_method]();
                }
            }              
        }
    }
    
    //START COMPONENT EVENT HANDLING 
    fn_onClick(){     
        //console.log("accordion click");        
    }

}//END CLS
//END ACCORDION