
      //XSTART component/xdesign1_newproject
        class xdesign1_newproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_newproject");      
            this.fn_setTag("xdesign1_newproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){  
            obj_project.fn_newProject();
          }
          
          
        }//END CLS
        //END TAG
        //END component/xdesign1_newproject