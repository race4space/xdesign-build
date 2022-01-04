class textarea extends component {
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);        

      this.fn_setType("textarea");      
      this.fn_setTag("textarea", true);                  

      this.obj_design.bln_listenChange=true;
    }        
    fn_onChange(){                    
      obj_project.obj_projectEvent=this;             
      this.obj_design.str_content=this.dom_obj.value;                        
    }   
    fn_applyTheme(){ 
      super.fn_applyTheme();
      this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          

      let str_color=this.obj_theme.highlightColor;
      if(this.obj_domProperty.disabled){
        str_color="gray";
      }
      this.fn_setStyleProperty("color", str_color); 
    }   
    xfn_setDisabled(){
      super.fn_setDisabled();
      this.fn_setStyleProperty("color", this.obj_theme.foregroundColor);                  
    }   
    
}//END CLS
//END TAG