
            //XSTART component/xdesign1_move
              class xdesign1_move extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_move");      
                  this.fn_setTag("xdesign1_move");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){      
                  obj_project.fn_XDesigner_move();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_move