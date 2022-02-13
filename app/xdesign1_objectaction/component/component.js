
      //XSTART component/xdesign1_objectaction
        class xdesign1_objectaction extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_objectaction");      
            this.fn_setTag("xdesign1_objectaction");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");
            
            
          }
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){   
              
              let obj_container, obj_item, obj_ini, arr;
            let obj_table, obj_row, obj_cell;
            let str_text;
            let bln_locked, bln_disabled, bln_dynamicPin;
            
            let obj_selected=obj_arg.obj_selected;
            let obj_parent;
            bln_dynamicPin=obj_selected.obj_design.bln_dynamicPin;
            
            this.fn_removeAllContent();
            
            obj_ini=new Holder;                    
            obj_ini.obj_design.str_type="block";                  
            obj_ini.obj_domStyle.padding="0px";      
            obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
            this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem               
            
            obj_container=this.obj_sheetHolder;
            
      
      
            if(!obj_selected){return;} 
            
            let obj_localHome=obj_selected.fn_getLocalHome();      
            bln_locked=obj_localHome.fn_getLocked();
            
            obj_ini=new Holder;            
            obj_ini.obj_design.str_type="table";                              
            //obj_ini.obj_domProperty.className="xDesignConsoleProperty";
            obj_table=obj_container.fn_addItem(obj_ini);//BootItem       
            
            str_text=this.obj_design.str_text;
            if(str_text){      
              obj_row=obj_table.fn_addItem();//BootItem
              obj_ini=new Holder;            
              obj_ini.obj_design.str_type="tableheader";          
              //obj_ini.obj_theme=this.obj_theme;
              obj_ini.obj_domProperty.colSpan=3;                        
              obj_ini.obj_domProperty.innerText=str_text;                
              obj_row.fn_addItem(obj_ini);//BootItem    
            }           
            
            obj_row=obj_table.fn_addItem();//BootItem
            obj_ini=new Holder;  
            //obj_ini.obj_theme=this.obj_theme;
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
            //obj_cell.fn_setStyleProperty("background-color", this.obj_theme.backgroundColor);          
            obj_container=obj_cell;          
            
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateCopy(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }            
      
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Copy";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                      
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_copyTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validatePaste(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }            
            
            //ADD BUTTON TO VALUE CELL      
            obj_ini=new Holder;
            obj_ini.obj_design.bln_debug123=true;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Paste";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                                  
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_pasteTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateCut(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }
            
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Cut";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_cutTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED            
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateDelete(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }
            
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Delete";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;              
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_deleteTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem               
            //ADD BUTTON TO VALUE CELL
            
      
            //*
            switch(obj_selected.obj_design.str_type.toLowerCase()){
              case "eazygrid":
                this.fn_getEazyGridSwitch(obj_selected, obj_container);
                break;
            }
            //*/
      
            //ADD ROW
            obj_row=obj_table.fn_addItem();//BootItem      
            obj_ini=new Holder;  
            //obj_ini.obj_theme=this.obj_theme;
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
            //obj_cell.fn_setStyleProperty("background-color", this.obj_theme.backgroundColor);          
            obj_container=obj_cell;  

            bln_disabled=false;                  
      
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Local Home";          
            //obj_ini.obj_theme=this.obj_theme;            
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                      
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_selectLocalHome";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_container.fn_addItem(obj_ini);//BootItem      
            //ADD BUTTON TO VALUE CELL

            bln_disabled=false;      
            if(!obj_clipboard.fn_validateInsert(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }            

            //ADD BUTTON TO VALUE CELL            
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Insert";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_insertTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            //ADD ROW
            obj_row=obj_table.fn_addItem();//BootItem      
            obj_ini=new Holder;  
            //obj_ini.obj_theme=this.obj_theme;
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
            //obj_cell.fn_setStyleProperty("background-color", this.obj_theme.backgroundColor);          
            obj_container=obj_cell;  
      
            
      
            
            //ADD BUTTON TO VALUE CELL      
            
            //*
            
            if((obj_selected.obj_design.int_modeExecute==obj_holder.int_modeEdit || obj_selected.obj_design.int_idRecord===0)){      
              
            
              bln_disabled=false;      
              if(!this.fn_validateSave(obj_selected, obj_localHome)){  
                bln_disabled=true;    
              }                  
      
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="button";
              obj_ini.obj_design.str_name="Save";          
              //obj_ini.obj_theme=this.obj_theme;
              obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;              
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_saveComponent";  
              if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED              
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_item=obj_container.fn_addItem(obj_ini);//BootItem   
            }
            else if(obj_selected.obj_design.int_modeExecute==obj_holder.int_modeReadOnly){      
      
              bln_disabled=false;      
              if(!this.fn_validateEdit(obj_selected, obj_localHome)){  
                bln_disabled=true;    
              }                  
              
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="button";
              obj_ini.obj_design.str_name="Edit";          
              //obj_ini.obj_theme=this.obj_theme;
              obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                  
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_editTag";  
              if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_item=obj_container.fn_addItem(obj_ini);//BootItem   
            }
      
            bln_disabled=false;      
            if(!this.fn_validateOpen(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }                  
            
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Open";
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                  
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_openComponent";
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem               
      
            //*      
            bln_disabled=false;      
            if(!this.fn_validateSaveAs(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }                  
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Save As";
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                  
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_saveAsComponent";
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            if(!bln_disabled){obj_item=obj_container.fn_addItem(obj_ini);}            
            //*/
            
            //*/
            
            //ADD BUTTON TO VALUE CELL      
          }
          fn_setEazyGridSwitch(){

            console.log("fn_setEazyGridSwitch");
            
              let obj_eazygrid=obj_project.obj_palettSelected;            
              obj_eazygrid.obj_design.bln_split=obj_shared.fn_flipBool(obj_eazygrid.obj_design.bln_split);    
              obj_eazygrid.fn_compileTemplate();                              
              obj_eazygrid.fn_applyFeatures();//required , or must go in base object additem                             
            }
            
            fn_getEazyGridSwitch(obj_selected, obj_container){
              let obj_ini;
              //ADD BUTTON TO VALUE CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="button";                                  
              obj_ini.obj_design.str_name="ROTATE";    
              obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;          
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_setEazyGridSwitch";
              obj_container.fn_addItem(obj_ini);//BootItem      
              //ADD BUTTON TO VALUE CELL
            }
      
            fn_validateSave(obj_item, obj_localHome){
              let bln_debug=false;

              if(!obj_project.LocationMatchInstance){
                if(bln_debug){console.log("VALIDATE SAVE: LOCATIONMATCH IS FALSE")};
                  return false;
              }
      
              if(!obj_item){        
                  return false;
              }        
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE SAVE: CANNOT SAVE DYNMAIC PIN")};
                  return false;
                }
              
              let bln_locked=obj_localHome.fn_getLocked();        
              if(bln_locked){//cannot manipulate locked component
              //if(bln_locked && obj_localHome!==obj_item){//cannot manipulate locked component
                  if(bln_debug){console.log("VALIDATE SAVE: LOCALHOME IS LOCKED")};
                  return false;
              //}        
              }
      
              if(bln_debug){console.log("VALIDATE SAVE: VALIDATED")};   
              return true;
      
          }
          fn_validateSaveAs(obj_item, obj_localHome){
              let bln_debug=false;              
      
              if(!obj_item){        
                  return false;
              }        
      
              if(obj_item!=obj_projectTarget){
                  return false;
                }
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE SAVE AS: CANNOT SAVE DYNMAIC PIN")};
                  return false;
              }
      
              if(bln_debug){console.log("VALIDATE SAVE AS: VALIDATED")};   
              return true;
          }
          fn_validateEdit(obj_item, obj_localHome){
              let bln_debug=false;              
      
              if(!obj_item){        
                  return false;
              }        
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE EDIT: CANNOT SAVE DYNMAIC PIN")};
                  return false;
                }
              
              let bln_locked=obj_localHome.fn_getLocked();        
              if(bln_locked){//cannot manipulate locked component
                //if(bln_locked && obj_localHome!==obj_item){//cannot manipulate locked component
                  if(bln_debug){console.log("VALIDATE EDIT: LOCALHOME IS LOCKED")};
                  return false;
              //}        
              }              
      
              if(bln_debug){console.log("VALIDATE EDIT: VALIDATED")};   
              return true;
          }
          fn_validateOpen(obj_item, obj_localHome){
              let bln_debug=false;              
      
              if(!obj_item){        
                  return false;
              }        
              if(obj_item.obj_design.int_idRecord===0){
                if(bln_debug){console.log("VALIDATE OPEN: VALIDATED (ID RECORD IS 0)");}      
                return false;
              }            
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE OPEN: CANNOT OPEN DYNMAIC PIN")};
                  return false;
                }
              
              let bln_locked=obj_localHome.fn_getLocked();        
              if(bln_locked && obj_item!=obj_localHome){
                  if(bln_debug){console.log("VALIDATE OPEN: LOCALHOME IS LOCKED")};
                  return false;
              }
              if(obj_item==obj_projectTarget){
                  if(bln_debug){console.log("VALIDATE OPEN: SELECTED IS ALREADY OPEN")};
                  return false;
              }
              if(!obj_item.obj_design.bln_projectPin){        
                  if(bln_debug){console.log("VALIDATE OPEN: SELECTED IS NOT PINNED PROJECT")};
                  //return false;
              }
              if(bln_debug){console.log("VALIDATE OPEN: VALIDATED")};   
              return true;
          }
        }
        //END CLS
        //END TAG
        //END component/xdesign1_objectaction