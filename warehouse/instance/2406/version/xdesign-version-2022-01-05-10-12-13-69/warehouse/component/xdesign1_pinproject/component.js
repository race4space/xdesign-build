
      //XSTART component/xdesign1_pinproject
        class xdesign1_pinproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_pinproject");      
            this.fn_setTag("xdesign1_pinproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){      
            obj_project.fn_toggleProjectPin();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_pinproject