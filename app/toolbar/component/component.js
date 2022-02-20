
            //XSTART component/toolbar
              class toolbar extends flex{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("toolbar");      
                  this.fn_setTag("toolbar");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("flex");            
                }
              }//END CLS
              //END TAG
              //END component/toolbar