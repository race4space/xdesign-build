
      //XSTART component/xdesign1_deleteproject
        class xdesign1_deleteproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_deleteproject");      
            this.fn_setTag("xdesign1_deleteproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){    
            obj_project.fn_deleteProject();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_deleteproject