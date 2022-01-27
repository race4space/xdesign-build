
            //XSTART component/login
              class login extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("login");      
                  this.fn_setTag("login");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                }
              }//END CLS
              //END TAG
              //END component/login