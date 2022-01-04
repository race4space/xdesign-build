class tableheader extends tablecell {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }  
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);      

      this.fn_setType("tableheader");      
      this.fn_setTag("th", true);                  

      this.fn_setIsContainer(true);      
    }
    xfn_applyTheme(){        
      super.fn_applyTheme();
      
      this.fn_setStyleProperty("background-color", "");          
      this.fn_setStyleProperty("border", "");                
      //this.fn_setStyleProperty("background-color", this.obj_theme.headingBackgroundColor);                
      this.fn_setStyleProperty("color", this.obj_theme.headingTextColor);          
  }   
    
}//END CLS