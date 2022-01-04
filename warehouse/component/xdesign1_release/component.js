
            //XSTART component/xdesign1_release
              class xdesign1_release extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_release");      
                  this.fn_setTag("xdesign1_release");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){      
                  obj_project.fn_XDesigner_release();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_release