
      //XSTART component/xdesign1_manageriframe
        class xdesign1_manageriframe extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                            
            
            this.fn_setType("xdesign1_manageriframe");      
            this.fn_setTag("xdesign1_manageriframe");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }

          fn_navigateToProjectInstance(str_url_folder){            
            let obj_glass=obj_project.fn_getGlass();      
            let str_url=str_url_folder + "/index.html?mode=edit";
            obj_glass.location.href=str_url;            
          }          
          fn_onRegisterWithProject(){                
            this.fn_reset();                       
          }
          fn_reset(){    
            let str_url=obj_path.fn_getURLAssetFile("welcome.html");
            this.fn_navigateURL(str_url);                       
          }
          fn_navigateURL(str_url){            
            let obj_glass=obj_project.fn_getGlass();      
            obj_glass.location.href=str_url;                        
          }          
          
          
          
          
      
        }//END CLS
        //END TAG
        //END component/xdesign1_manageriframe