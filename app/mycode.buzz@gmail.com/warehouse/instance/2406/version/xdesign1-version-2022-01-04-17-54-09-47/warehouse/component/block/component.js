
      //XSTART component/block
        class block extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                            
            
            this.fn_setType("block");      
            this.fn_setTag("block");            

            this.obj_design.bln_isGenericTag=true;//maybe need in the future as type is now set to be whatever is requested, rather than tag            
            //this.fn_extends("notset");
            this.fn_setIsContainer(true);
            
            
          }
        }//END CLS
        //END TAG
        //END component/block
        