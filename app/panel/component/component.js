class panel extends component {
  constructor(obj_ini) {
    super(obj_ini); // call the super class constructor
  }    
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);

    //START INITIALIZE DESIGN
    this.fn_setType("panel");      
    this.fn_setTag("panel");            
    this.fn_setIsContainer(true);    
    //END INITIALIZE DESIGN

    //START INITIALIZE STYLE
    if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="flex";}          
    if(this.fn_getStyleProperty("backgroundColor")===undefined){this.obj_domStyle.backgroundColor="orange";}
    if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
    if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}    
    if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}       
    if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="auto";}             
    //END INITIALIZE STYLE      
  }
  fn_bootChildren(){
    console.log("panel fn_bootChildren");
  }

}//END CLS
//END PANEL
