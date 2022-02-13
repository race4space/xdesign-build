class button extends component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.fn_setType("button");      
      this.fn_setTag("button", true);   
      this.fn_setTypeable(true);                     

      this.obj_design.bln_listenClick=true;                      

      if(this.obj_design.str_text===undefined){this.obj_design.str_text=obj_shared.fn_formatString(this.obj_design.str_name, obj_const.int_alpha);}                  
      if(this.obj_design.str_content===""){this.obj_design.str_content=this.obj_design.str_text;}                      

      this.fn_setIsContainer(false);
      
      //END INITIALIZE DESIGN
      
      //START INITIALIZE STYLE            
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}      
      if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                  
      if(this.obj_domStyle.color===undefined){this.obj_domStyle.color="black";}      
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
      if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="1px";}
      if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}        
      //END INITIALIZE STYLE            

      //this.obj_domProperty.disabled=false;
      
    }         
    fn_onClick(){                        
      //console.log("button click")
    }    
  
  fn_setHTMLContent(){
    super.fn_setHTMLContent();        
    this.fn_setText(this.obj_design.str_text);                
  }            
}//END CLS
//END BUTTON
