
            //XSTART component/menubuttonpalettepinned
              class menubuttonpalettepinned extends menubutton{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("menubuttonpalettepinned");      
                  this.fn_setTag("menubuttonpalettepinned");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("menubutton");
                   
                   //this.obj_design.str_nameTheme="xdesign1_menubutton";
                   this.obj_design.str_nameTheme="thememenubutton";
                   //

                   if(this.obj_design.str_catQuery===undefined){
                    this.obj_design.str_catQuery="notset";
                   }
                }

                fn_onLoad(){
                  super.fn_onLoad();
                  let obj_ini=new Object;
                  obj_ini.str_catQuery=this.obj_design.str_catQuery;      
                  //console.log("obj_ini.str_catQuery: " + obj_ini.str_catQuery);
                  obj_project.fn_runAction("getListPalettePinnedComponent", obj_ini);
                }        
              }//END CLS
              //END TAG
              //END component/menubuttonpalettepinned