
      //XSTART component/xdesign1_publishproject
        class xdesign1_publishproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_publishproject");      
            this.fn_setTag("xdesign1_publishproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }

          fn_onClick(){      
            obj_project.fn_publishProject();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_publishproject