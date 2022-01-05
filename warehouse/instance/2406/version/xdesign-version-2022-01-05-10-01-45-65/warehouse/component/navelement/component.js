class navelement extends component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.fn_setType("div");      
      //this.fn_setTag("div", true);                        
      this.fn_setTag("button", true);                        

      this.obj_design.bln_listenClick=true;
      //END INITIALIZE DESIGN
  
      //START INITIALIZE STYLE      
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="10px";}              
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="10px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="10px";}                  
      if(this.obj_domStyle.margin===undefined){this.obj_domStyle.margin="10px";}              
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}      
      //END INITIALIZE STYLE  
    }     
    xfn_applyTheme(){
      super.fn_applyTheme();
      this.fn_setStyleProperty("background-color", this.obj_theme.lolightColor);          
      this.fn_setStyleProperty("color", this.obj_theme.lolightColor);       
      this.fn_setStyleProperty("border-radius", "0px");                   
  }   
  xfn_setDisabled(){    
    super.fn_setDisabled();        
    //this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          
    //this.fn_setStyleProperty("color", this.obj_theme.foregroundColor);                      
  }  
  fn_onClick(){
    this.fn_event();                
  }
  
}//END CLS
//END BUTTON
