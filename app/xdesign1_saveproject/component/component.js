
            //XSTART component/xdesign1_saveproject
              class xdesign1_saveproject extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_saveproject");      
                  this.fn_setTag("xdesign1_saveproject");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){  
                  obj_project.fn_saveProject();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_saveproject