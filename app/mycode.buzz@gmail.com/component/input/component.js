class input extends component {
    constructor(obj_ini) {      
      super(obj_ini);
    }        
    fn_initialize(obj_ini){
      
      super.fn_initialize(obj_ini);
      this.fn_setType("input");      
      this.fn_setTag("input", true);                                    
      this.obj_design.bln_listenChange=true;
      this.obj_design.bln_listenClick=true;
      this.fn_setIsContainer(false);
      
  }     
  fn_getValue(){        
    let str_value=this.fn_getDomProperty("value")+"";
    return str_value;    
  }
  fn_setValue(str_value){ 
    str_value+="";    
    this.fn_setDomProperty("value", str_value);        
  }  
  fn_setPlaceholder(str_value){ 
    str_value+="";    
    this.fn_setDomProperty("placeholder", str_value);        
  }  
  fn_getPlaceholder(){       
    return this.fn_getDomProperty("placeholder");        
  }  
  
  
  fn_onClick(){             
  }
  fn_onChange(){             
    super.fn_onChange();                
    this.fn_setDomProperty("value", this.dom_obj.value);            
  }
  
}//END CLS
//END INPUT
