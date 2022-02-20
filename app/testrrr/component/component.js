
            //XSTART component/testrrr
              class testrrr extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("testrrr");      
                  this.fn_setTag("testrrr");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                }
              }//END CLS
              //END TAG
              //END component/testrrr