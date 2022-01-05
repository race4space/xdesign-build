
      //XSTART component/dynamiccontent
        class dynamiccontent extends flex{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("dynamiccontent");      
            this.fn_setTag("dynamiccontent", true);            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("flex");            

            //START INITIALIZE DESIGN                       
            this.obj_design.bln_registerAtContainer=true;
            //END  INITIALIZE DESIGN

            //START INITIALIZE STYLE            
            /*
            if(this.fn_getStyleProperty("background-color")===undefined){this.fn_setStyleProperty("background-color", "red");}
            if(this.fn_getStyleProperty("padding")===undefined){this.fn_setStyleProperty("padding", "10px");}            
            //*/

            //*            
            //*/
            //END  INITIALIZE STYLE  
          }
          fn_prepare(){
            this.fn_removeChildren();             
          }          
          fn_onBeforeSave(){            
            this.fn_prepare();            
          }
        }//END CLS
        //END TAG
        //END component/dynamiccontent