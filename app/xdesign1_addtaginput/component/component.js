
            //XSTART component/xdesign1_addtaginput
              class xdesign1_addtaginput extends input{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_addtaginput");      
                  this.fn_setTag("xdesign1_addtaginput");                              
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("input");            

                   this.fn_setTag("xdesign1_addtaginput");                                          
                   
                   
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_addtaginput