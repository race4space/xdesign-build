
            //XSTART component/test666
              class test666 extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("test666");      
                  this.fn_setTag("test666");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component"); test           
                }
              }//END CLS
              //END TAG
              //END component/test666