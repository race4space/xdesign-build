
            //XSTART component/xdesign1_login
              class xdesign1_login extends svgblock{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_login");      
                  this.fn_setTag("xdesign1_btnLogin", true);            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("svgblock");            

                  this.obj_holder.str_filter_gray="invert(50%)";
                  this.obj_holder.str_filter_orange="invert(64%) sepia(16%) saturate(4363%) hue-rotate(360deg) brightness(106%) contrast(105%)";
                  //this.obj_holder.str_filter_electricblue="invert(47%) sepia(65%) saturate(535%) hue-rotate(150deg) brightness(94%) contrast(90%)";
                  this.obj_holder.str_filter_electricblue="invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)";
                  
                  

                  this.obj_holder.str_filter_endAuthorize=this.obj_holder.str_filter_gray;                  
                  this.obj_holder.str_filter_startAuthorize=this.obj_holder.str_filter_electricblue;

                  //this.fn_setFilter(this.obj_holder.str_filter_startAuthorize);
                   
                   
                   /*
                   #2596be electic blue
                   #389eff electic blue
                   check generator here: 
                   https://codepen.io/sosuke/pen/Pjoqqp
                   //*/
                }

                fn_onClick(){                                    
                  obj_project.fn_XDesigner_startLogOut();
                  
                }                
              }//END CLS
              //END TAG
              //END component/xdesign1_login