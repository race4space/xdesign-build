
      //XSTART component/xdesign1_managersettings
        class xdesign1_managersettings extends xdesign1_managermenu{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managersettings");      
            this.fn_setTag("xdesign1_managersettings");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("xdesign1_managermenu");                        
          }

          
          fn_XDesigner_onLogIn(){            
            let obj_item;
            
            let bln_visibleUserAuthor=true;              
            let bln_displaySysAdmin=true;            
            
            obj_item=this.obj_holder.obj_xdesign1_import;
            if(obj_item){obj_item.fn_setVisibility(bln_visibleUserAuthor)};            

            obj_item=this.obj_holder.obj_xdesign1_xmaintain;
            if(obj_item){obj_item.fn_setVisibility(bln_visibleUserAuthor)};      
          
            obj_item=this.obj_holder.obj_xdesign1_xcreatebackup;
            if(obj_item){obj_item.fn_setDisplay(bln_displaySysAdmin)};                        
          
            obj_item=this.obj_holder.obj_xdesign1_xcompile;
            if(obj_item){obj_item.fn_setDisplay(bln_displaySysAdmin)};            

            obj_item=this.obj_holder.obj_xdesign1_move;
            if(obj_item){obj_item.fn_setDisplay(bln_displaySysAdmin)};            

            obj_item=this.obj_holder.obj_xdesign1_release;
            if(obj_item){obj_item.fn_setDisplay("none")};            
          }
          
          //START XDESIGNER SPECIFIC EVENT          
          fn_onStateChange(){     
            //this runs onload
            //this run when the state of the applicationa as a whole changes                        
            
            super.fn_onStateChange();
            this.obj_holder.obj_container.fn_setDisplay();
            this.obj_holder.obj_container.fn_setEnabled();
            
          }            
          fn_importAll(){                
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("importAll");            
          }    
          fn_onimportAll(){                
            obj_project.fn_consoleLog("Complete Import All");
            obj_project.fn_onStateChange();   
            this.fn_open();
          }  
          fn_XDesigner_release(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_release");            
          }    
          fn_onXDesigner_release(){                 
            obj_project.fn_consoleLog("Complete Release");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          fn_XDesigner_move(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_move");            
          }    
          fn_onXDesigner_move(){                 
            obj_project.fn_consoleLog("Complete Move");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          
          fn_XDesigner_maintain(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_maintain");            
          }    
          fn_onXDesigner_maintain(){                 
            obj_project.fn_consoleLog("Complete Maintain");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          fn_XDesigner_compile(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_compile");
          }    
          fn_onXDesigner_compile(){                 
            obj_project.fn_consoleLog("Complete Compile");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          fn_XDesigner_createBackup(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_createBackup");
          }    
          fn_onXDesigner_createBackup(obj_post){                 
            obj_project.fn_consoleLog("Complete Create Backup: " + obj_project.obj_design.str_name);
            obj_project.fn_onStateChange();   
            this.fn_open();
          }          
          

          fn_consoleLog(str_text){
            let obj_item;
            obj_item=this.fn_getComponent("xdesign1_console");
            obj_item.fn_setDisplay(true);
            if(obj_item){
              obj_item.fn_setText(str_text);
              //obj_item.fn_addText(str_text);
            }

          }    
          

        }//END CLS
        //END TAG
        //END component/xdesign1_managersettings