class form extends component {
    constructor(obj_ini) {      
      super(obj_ini);        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);    
      
      //START INITIALIZE DESIGN
      this.fn_setType("form");      
      this.fn_setTag("form", true);            
      //END INITIALIZE DESIGN
      
      //START INITIALIZE DOM      
      //END INITIALIZE DOM
      
      //START INITIALIZE STYLE                  
      //END  INITIALIZE STYLE  

      this.fn_setIsContainer(true);
  }    

}//END CLS
//END IMG
