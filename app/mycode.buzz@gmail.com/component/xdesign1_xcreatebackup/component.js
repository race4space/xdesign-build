
      //XSTART component/xdesign1_xcreatebackup
        class xdesign1_xcreatebackup extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_xcreatebackup");      
            this.fn_setTag("xdesign1_xcreatebackup");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){      
            obj_project.fn_XDesigner_createBackup();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_xcreatebackup