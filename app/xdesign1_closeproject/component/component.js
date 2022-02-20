
            //XSTART component/xdesign1_closeproject
              class xdesign1_closeproject extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_closeproject");      
                  this.fn_setTag("xdesign1_closeproject");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){  
                  obj_project.obj_holder.bln_toggleChooseProject=false;                  
                  obj_project.fn_closeProject();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_closeproject