
      //XSTART component/theme
        class theme extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("theme");      
            this.fn_setTag("theme");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }          
          fn_onLoad(){          
              super.fn_onLoad();                                            
            
          }           
        }//END CLS
        //END TAG
        //END component/theme