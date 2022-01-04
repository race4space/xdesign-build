
            //XSTART component/xxform
              class xxform extends form{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xxform");      
                  this.fn_setTag("xxform");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("form");            
                }
                fn_onLoad(){
      
                 super.fn_onLoad();
                }
              }//END CLS
              //END TAG
              //END component/
              
