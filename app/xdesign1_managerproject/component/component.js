
      //XSTART component/xdesign1_managerproject
        class xdesign1_managerproject extends xdesign1_managermenu{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managerproject");      
            this.fn_setTag("xdesign1_managerproject");            
            this.obj_design.bln_isGenericTag=true;            
            //this.fn_extends("abc");            
          }
          fn_XDesigner_onLogIn(obj_auth){            
            //this.fn_newProject();
          }
          fn_XDesigner_onLogOut(obj_auth){
            //this.fn_newProject();
          }
          fn_onStateChange(){                        
            
            if(!super.fn_onStateChange()){return;} 
            let bln_value, bln_valueFlip;
            bln_value=false;                        
            if(obj_projectTarget){              
              if(obj_projectTarget.obj_design.int_idRecord){
                bln_value=true;               
              }
            }                                    

            //CHECK PROJECT SERVER LOCKED                              
            if(!obj_project.LocationMatchInstance){
              bln_value=false;
            }                 
            
            
            bln_valueFlip==obj_shared.fn_flipBool(bln_value);            

            let obj_item;                        
            obj_item=this.obj_holder.obj_xdesign1_deleteproject;                        
            if(obj_item){obj_item.fn_setEnabled(bln_value)};            
            obj_item=this.obj_holder.obj_xdesign1_publishproject;       
            if(obj_item){obj_item.fn_setEnabled(bln_value)};            
            obj_item=this.obj_holder.obj_xdesign1_releaseproject;       
            if(obj_item){obj_item.fn_setEnabled(bln_value)};            
            
            this.obj_holder.obj_container.fn_setEnabled();        
            this.fn_getListProject();
            
          }
          fn_listProject(arr_row){            
            
            //console.log("fn_listProject");            
      
            let obj_ini, obj_item, obj_dynamicContentHolder;                        
            let obj_row;
            
            obj_dynamicContentHolder=this.fn_getComponent("ListProjectDynamicContent");            
            if(!obj_dynamicContentHolder){
              return;
            }
            obj_dynamicContentHolder.fn_prepare();            
      
            for(var i=0;i<arr_row.length;i++){        
              obj_row=arr_row[i];
              
              if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object
              obj_ini=new Holder;
              obj_ini.obj_design.bln_dynamicPin=true;                            
              obj_ini.obj_design.str_name="xdesign1_buttonOpenProject" + obj_row.Name;
              obj_ini.obj_design.str_text=obj_row.Name;
              obj_ini.obj_design.str_type="button";
              obj_ini.obj_design.int_idRecordTarget=obj_row.id;
              obj_ini.obj_design.str_typeRecord=obj_row.Type;
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_openProject";
              obj_ini.obj_domProperty.disabled=false;      
              obj_ini.obj_design.int_idRecordTarget=obj_row.id;              
              obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);//BootItem                                                 
            }
          }              
          //Event
          fn_getListProject(){
            //console.log("fn_getListProject");
            obj_project.fn_runAction("getListProject");
          }
          fn_onGetListProject(obj_post){
            let arr_row=obj_post.RowData;
            this.fn_listProject(arr_row);
          }
          fn_releaseProject(){

            console.log("fn_releaseProject");

            if(!obj_projectTarget){
              return;
            }

            obj_project.fn_close();

            obj_project.fn_runAction("releaseProject");
          }
          fn_onReleaseProject(obj_post){
            console.log("Released Project: " + obj_projectTarget.obj_design.str_name);                        
            obj_project.fn_onStateChange();                        
          }
          fn_publishProject(){      

            console.log("fn_publishProject");

            if(!obj_projectTarget){
              return;
            }

            obj_project.fn_close();
      
            
            let obj_serverManager=obj_project.obj_holder.obj_xdesign1_designfile;
            let obj_ini=new Object;
            obj_ini.obj_instance=obj_projectTarget;
            obj_ini.str_idAJAXNotifier=obj_project.obj_design.str_idXDesign;
            obj_ini.str_actionCallback="publishProject";
            obj_serverManager.fn_publish(obj_ini);
            
          }
          fn_onPublishProject(obj_post){
            console.log("Published Project: " + obj_projectTarget.obj_design.str_name);            
            console.log("URLProjectVersion: " + obj_post.URLProjectVersion);                        
            obj_project.fn_onStateChange();            
            this.fn_viewInBrowser(obj_post.URLProjectVersion);
          }
          fn_viewInBrowser(str_url){            
            let o=window.open(str_url, "xDesignViewInBrowser");
            if(o){o.focus()}
          }
          fn_openComponent(){      
            let int_idRecord=obj_project.obj_palettSelected.obj_design.int_idRecord;      
            this.fn_openProject(int_idRecord);
          }  
          fn_openProject(int_idRecord){//Add Project Item From Project Menu

            obj_project.fn_unLoad();                                 
           
            //if(this.obj_menuButton){this.obj_menuButton.fn_close();}
            let obj_itemEvent; 
            //int_idRecord can be set when this funciton is called from script
            
            if(int_idRecord===undefined){
              //set int_idRecord from event button click
              obj_itemEvent=obj_project.obj_projectEvent;                            
              int_idRecord=obj_itemEvent.obj_design.int_idRecordTarget;                   
              obj_project.fn_unsetEvent();                
            }
      
            
            let obj_post;            
            obj_post={
              RecordId:int_idRecord
            };
            obj_project.fn_runAction("openProject", obj_post);
          }    
          fn_deleteProject(){//to delete the loaded instance

            //console.log("fn_deleteProject");

            if(!obj_projectTarget){
              return;
            }

            obj_project.fn_close();
      
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");            
            let obj_ini=new Object;
            obj_ini.obj_instance=obj_projectTarget;      
            obj_ini.str_idAJAXNotifier=obj_project.obj_design.str_idXDesign;            
            obj_ini.str_actionCallback="deleteProject";                              
            let bln_success=obj_serverManager.fn_delete(obj_ini);      
            if(!bln_success){
              obj_project.fn_onStateChange();
            }
          }
          fn_onDeleteProject(){
      
            console.log("Deleted Project");
            obj_project.fn_onStateChange();      
            this.fn_newProject();
          }
          fn_newProject(){//BUTTON PRESS            
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("newProject");
          }    
          fn_onNewProject(obj_post){  
            obj_project.fn_onStateChange();      
            this.fn_onOpenProject(obj_post);
          }    
          fn_onOpenProject(obj_post){      
            
            obj_project.fn_setLocationMatchInstance(obj_post);
                  
            obj_clipboard.fn_clear();                   
            obj_project.obj_holder.obj_xdesign1_manageriframe.fn_navigateToProjectInstance(obj_post.URLProjectVersion);            
            this.obj_holder.obj_container.fn_close();              
            
            this.obj_holder.obj_container.fn_setText(obj_post.RecordName);                  
            obj_project.fn_onStateChange();      

            obj_project.fn_consoleLog("Loaded: " + obj_post.RecordName);
            //console.log("Loaded: " + obj_post.RecordName);            
          }    
          fn_onPaletteItemSelected(){
            //console.log("fn_onPaletteItemSelected");            
          }          
          fn_toggleProjectPin(){
            obj_project.fn_runAction("toggleProjectPin");
          }
          fn_onToggleProjectPin(){                  
            obj_project.fn_onStateChange();
          }  
          fn_saveasProject(){//This relates to saving a component within the Project Isntance ie from the aciton button                       
    
            let obj_item, str_name;
      
            obj_item=obj_project.obj_palettSelected;
            
            obj_item.fn_setLocked(false);      
            obj_project.fn_removeId(obj_item);
            obj_item.fn_setLocked(true);                  
      
            let str_addon=" Copy";      
            str_name=this.fn_getAddOnString(obj_item.fn_getName(), str_addon);      
            obj_item.fn_setName(str_name);      
            
            this.obj_holder.obj_container.fn_setText(str_name);
            obj_project.fn_saveProject();            
          } 
          fn_getAddOnString(str_orig, str_addon){
            let str_new;
            
            str_new=str_orig.replace(str_addon, "");
            str_new+=str_addon;
            return str_new;
          }      
          fn_saveProject(){
            //globabl save utility, not currently in use, due to the save hole
            //requires to "look" for non saved areas
      
            obj_project.fn_close();
            
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");      
            let obj_ini=new Object;
            obj_ini.ObjectInstance=obj_projectTarget;                   
            obj_serverManager.fn_saveComponent(obj_ini);
          }
          fn_saveComponent(obj_item){//This relates to saving a component within the Project Isntance ie from the action button      
            
            let obj_parent=obj_item.obj_holder.obj_container;            
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");      
            let obj_ini=new Object;
            obj_ini.ObjectInstance=obj_item;                 
            obj_item.obj_designDelegate.fn_setPaletteSelected();
            obj_serverManager.fn_saveComponent(obj_ini);           
          }
          fn_onSaveComponent(){//CallBack Function from designfile            
            this.obj_holder.obj_container.fn_setText(obj_projectTarget.obj_design.str_name);            
            this.fn_onStateChange();           
            console.log("Saved: " + obj_project.obj_palettSelected.obj_design.str_name);
          }              
          fn_close(){                        
            super.fn_close();
          }

        }//END CLS
        //END TAG
        //END component/xdesign1_managerproject