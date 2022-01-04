
      //XSTART component/xdesign1_managermenu
        class xdesign1_managermenu extends flex{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managermenu");      
            this.fn_setTag("xdesign1_managermenu");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("flex");            
            
          }
          fn_onStateChange(){                       
            this.fn_close();
            return true;
          }   
          fn_close(bln_disable=true){
            this.obj_holder.obj_container.fn_close();                        
            if(bln_disable){
              this.obj_holder.obj_container.fn_setDisabled();      
            }
          }
          fn_open(bln_enable=true){
            if(bln_enable){
              this.obj_holder.obj_container.fn_setEnabled();      
            }
            this.obj_holder.obj_container.fn_open();
          }

        }//END CLS
        //END TAG
        //END component/xdesign1_managermenu
