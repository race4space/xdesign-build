
      //XSTART component/xdesign1_import
        class xdesign1_import extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_import");      
            this.fn_setTag("xdesign1_import");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("button");            
          }
          fn_onClick(){      
            obj_project.fn_importAll();
          }
          
        }//END CLS
        //END TAG
        //END component/xdesign1_import