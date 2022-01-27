
            //XSTART component/desktopnavigationbutton
              class desktopnavigationbutton extends svgblock{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("desktopnavigationbutton");      
                  this.fn_setTag("desktopnavigationbutton", true);            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("svgblock");            
                  
                  if(this.obj_design.dataSVG===undefined){
                    this.obj_design.dataSVG=obj_path.fn_getURLAssetFile("shared", "exit-button.svg");
                  }         
                  this.obj_holder.str_filter_electricgreen="invert(77%) sepia(47%) saturate(2073%) hue-rotate(40deg) brightness(105%) contrast(106%)";
                  /*
                   #2596be electic blue
                   #389eff electic blue
                   check generator here: 
                   https://codepen.io/sosuke/pen/Pjoqqp
                   //*/

                  if(this.obj_design.str_urlNavigate===undefined){
                    this.obj_design.str_urlNavigate="https://www.mycode.buzz";
                  }
                }
                fn_validateDesignInput(obj_ini){
                  let str_name=obj_ini.obj_design.str_name;
                  let bln_disabled=true;
                  if(str_name==="str_urlNavigate"){
                    bln_disabled=false;
                  }
                  return  bln_disabled;
              
                }        
                fn_onClick(){  
                  
                  let int_pos=window.location.href.indexOf("lokal");//localhost                   
                  let str_urlNavigate;
                  str_urlNavigate="https://console.mycode.buzz";
                  if(int_pos!==-1){str_urlNavigate="http://desk.lokal-mycode.buzz";}                  
                  window.location.href=str_urlNavigate;
                  //window.open(str_urlNavigate);
                }  
              }//END CLS
              //END TAG
              //END component/desktopnavigationbutton