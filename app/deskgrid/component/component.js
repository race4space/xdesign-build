
            //XSTART component/deskgrid
              class deskgrid extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  console.log("new deskgrid");
                  
                  this.fn_setType("deskgrid");      
                  this.fn_setTag("deskgrid");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");                       
                                                
                
                this.fn_setStyleProperty("display", "grid");                
                this.fn_setStyleProperty("gridGap", "10px");
                this.fn_setStyleProperty("gridTemplateColumns", "repeat(3, 1fr)");
                this.fn_setStyleProperty("width", "100vw");
                //this.fn_setStyleProperty("height", "100vh");                
                
                //this.fn_setStyleProperty("gridTemplateRows", "auto");
                //this.fn_setStyleProperty("gridAutoColumns", "auto");
                //this.fn_setStyleProperty("gridAutoRows", "auto");
                //this.fn_setStyleProperty("gridAutoFlow", "column"); 
                }
              }//END CLS
              //END TAG
              //END component/deskgrid