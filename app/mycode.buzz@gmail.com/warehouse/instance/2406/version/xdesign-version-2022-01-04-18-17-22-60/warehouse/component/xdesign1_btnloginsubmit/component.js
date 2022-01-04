
            //XSTART component/xdesign1_btnloginsubmit
              class xdesign1_btnloginsubmit extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_btnloginsubmit");      
                  this.fn_setTag("xdesign1_btnloginsubmit");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }

                fn_onClick(){
                  obj_project.fn_XDesigner_startLogIn();                  
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_btnloginsubmit