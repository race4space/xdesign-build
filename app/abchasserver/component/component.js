
            //XSTART component/abchasserver
              class abchasserver extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("abchasserver");      
                  this.fn_setTag("abchasserver");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                }
              }//END CLS
              //END TAG
              //END component/abchasserver