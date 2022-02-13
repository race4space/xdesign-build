
            //XSTART component/xdesign1_addtagbutton
              class xdesign1_addtagbutton extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_addtagbutton");      
                  this.fn_setTag("xdesign1_addtagbutton");            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("button");                               
                   
                }

                fn_onClick(){                                   
                  //this.fn_event();                      
                  obj_project.fn_addPaletteTagFromInput();           
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_addtagbutton