
            //XSTART component/xdesign1_addtag
              class xdesign1_addtag extends inputandbutton{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_addtag");      
                  this.fn_setTag("xdesign1_addtag");            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("inputandbutton");            
                }

                fn_onClick(){                  
                  
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_addtag