
      //XSTART component/xdesign1_xcompile
        class xdesign1_xcompile extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_xcompile");      
            this.fn_setTag("xdesign1_xcompile");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("button");            
          }
          fn_onClick(){      
            obj_project.fn_XDesigner_compile();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_xcompile