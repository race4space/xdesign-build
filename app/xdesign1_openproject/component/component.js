
            //XSTART component/xdesign1_openproject
              class xdesign1_openproject extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_openproject");      
                  this.fn_setTag("xdesign1_openproject");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                
                fn_onClick(){  
                  obj_project.obj_holder.bln_toggleChooseProject=true;                  
                  obj_project.fn_onStateChange();                  
                }
              }//END CLS              
              //END TAG
              //END component/xdesign1_openproject