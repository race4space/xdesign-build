  class flex extends component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.fn_setType("flex");      
      this.fn_setTag("flex");            
      this.fn_setIsContainer(true);      
      //END INITIALIZE DESIGN

      //START INITIALIZE STYLE      
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="default";}
      if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="flex";}
      if(this.obj_domStyle.flexWrap===undefined){this.obj_domStyle.flexWrap="wrap";}      
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}      
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="auto";}                   
      //END INITIALIZE STYLE      
    }
}//END CLS
//END FLEX
