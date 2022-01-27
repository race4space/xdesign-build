
      //XSTART component/xdesign1_propertydesign
        class xdesign1_propertydesign extends xdesign1_propertysheet{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                            
            
            this.fn_setType("xdesign1_propertydesign");      
            this.fn_setTag("xdesign1_propertydesign");            
            this.obj_design.bln_isGenericTag=true; 
            this.fn_extends("xdesign1_propertysheet");
          }

          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){   
      
              let obj_selected=obj_arg.obj_selected;
             
              if(!obj_selected){return;}                
        
              if(!obj_selected.fn_isElement()){
                return;
              }
      
              this.fn_removeAllContent();
        
              let obj_container, obj_ini;                      
      
              obj_ini=new Holder;                    
              obj_ini.obj_design.str_type="block";                                
              obj_ini.obj_domStyle.padding="0px";                    
              this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem            
              obj_container=this.obj_sheetHolder;              
              
              //START PROPERTY SHEET
              obj_arg=new Holder;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_container=obj_container;
              obj_arg.str_text=this.obj_design.str_text;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_propertySheet=obj_selected.obj_design;                  
              obj_arg.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange";       
              obj_arg.str_propertySourceChange="fn_propertyDesignChange";//this runs when a new entry is made in the property sheet 
              obj_arg.obj_design.str_valueEventChange="fn_linkDesignChange";//this runs when a value in the property sheet is changed                              
              super.fn_onPaletteItemSelected(obj_arg);
              //END PROPERTY SHEET            
            }         
            
          //this runs when a value in the property sheet is changed
          fn_linkDesignChange(){        
            
              let obj_itemEvent, obj_item, str_name, str_value, foo_value;
              obj_itemEvent=obj_project.obj_projectEvent;    
              
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);                              
              str_name=obj_itemEvent.obj_design.str_name;
              str_value=obj_itemEvent.fn_getValue();
              str_value=this.fn_validateItem(obj_item, str_name, str_value);
              
              this.foo_propertyDesignChangeName=str_name;
              this.foo_propertyDesignChangeValue=str_value;              
              this.fn_actionDesignChange(obj_item);                                            
            }
            
            fn_propertyDesignChangeName(){//when adidng a new item
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);                        
              this.foo_propertyDesignChangeName=foo_value;      
              this.fn_actionDesignChange(obj_item);            
            }
            fn_propertyDesignChangeValue(){//when adding a new item
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);            
              this.foo_propertyDesignChangeValue=foo_value;      
              this.fn_actionDesignChange(obj_item);                              
            }
            fn_actionDesignChange(obj_item){///not deprecasted!
              let str_name, foo_value;
              str_name=this.foo_propertyDesignChangeName;
              foo_value=this.foo_propertyDesignChangeValue;            
              if(str_name===undefined){return;}
              if(foo_value===undefined){return;}      
              obj_item.obj_designDelegate.fn_setDesignProperty(str_name, foo_value);            
              obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                         
              return true;
            }
      
            fn_validateItem(obj_item, str_name, str_value){                        
      
              let obj_instance, bln_val;

              let int_idRecordProjectTarget=obj_projectTarget.obj_design.int_idRecord;
              let int_idRecordProject=obj_project.obj_design.int_idRecord;
              let blnEditXDesigner=false;
              //console.log("int_idRecordProjectTarget: " + int_idRecordProjectTarget);
              //console.log("int_idRecordProject: " + int_idRecordProject);
              if(int_idRecordProjectTarget===int_idRecordProject){
                blnEditXDesigner=true;
              }
        
              switch(str_name){        
                case "str_type":
                  if(obj_item===obj_projectTarget){        
                    obj_projectTarget.obj_holder.str_componentCode=false; 
                    obj_item.obj_holder.bln_changeRecordType=true;                            
                  }   
                  else{   
                    str_value="error";
                  }          
                break;   
                case "str_idXDesign":
                    if(!blnEditXDesigner){                                     
                      obj_instance=obj_projectTarget.fn_findItemById(str_value);                                
                      if(obj_instance){
                        //internal duplicate error                 
                        str_value="internal duplicateerror str_idXDesign";
                      }                
                      obj_instance=obj_project.fn_findItemById(str_value);                                
                      if(obj_instance){
                        //designer duplicate error                 
                        str_value="designer duplicateerror str_idXDesign";
                      }                
                    }
                break;    
                case "bln_registerAtProject":                                           

                      if(!blnEditXDesigner){
                        obj_instance=obj_projectTarget.fn_findItemByVariableName(obj_project.obj_palettSelected.obj_design.str_variableName, obj_project.obj_palettSelected);
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //internal duplicate error                 
                          //console.log("internal duplicate error bln_registerAtProject obj_projectTarget/obj_instance: " + obj_instance + "[" + obj_project.obj_palettSelected.obj_design.str_variableName + "]");
                          obj_instance.fn_debug("internal duplicate error bln_registerAtProject obj_project/obj_instance");
                          str_value=obj_project.obj_palettSelected.fn_getRegisterAtProject();
                        }

                        obj_instance=obj_project.fn_findItemByVariableName(obj_project.obj_palettSelected.obj_design.str_variableName, obj_project.obj_palettSelected);
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //designer duplicate error                                 
                          console.log("designer duplicate error bln_registerAtProject obj_project/obj_instance: " + obj_instance  + "[" + obj_project.obj_palettSelected.obj_design.str_variableName + "]");
                          obj_instance.fn_debug("designer duplicate error bln_registerAtProject obj_project/obj_instance");
                          str_value=obj_project.obj_palettSelected.fn_getRegisterAtProject();
                        }
                      }
                break;                        
                case "str_name": 
                      if(!blnEditXDesigner){               
                        let str_nameShort=this.fn_formatShortName(str_value);     
                        obj_instance=obj_projectTarget.fn_findItemByVariableName(str_nameShort, obj_project.obj_palettSelected);                                                
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //internal duplicate error                                                     
                          console.log("internal duplicate error str_name: " + obj_instance.obj_design.str_name);
                          str_value=obj_project.obj_palettSelected.fn_getName();
                        }                
                        obj_instance=obj_project.fn_findItemByVariableName(str_nameShort, obj_project.obj_palettSelected);                                
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //designer duplicate error                                             
                          console.log("designer  duplicate error str_name: " + obj_instance.obj_design.str_name);                                
                          str_value=obj_project.obj_palettSelected.fn_getName();
                        }                
                      }
                break;              
                case "str_variableName":                     
                      obj_instance=obj_projectTarget.fn_findItemByVariableName(str_value, obj_project.obj_palettSelected);                                                                
                      if(obj_instance){                
                        str_value=obj_project.obj_palettSelected.fn_getVariableName();;
                      }
                break;              
                }     
             
              
              return str_value;
            }
      
            fn_isDuplicateVariableName(){        
              
            }
            
        
            fn_validateInput(obj_ini){       
              
              let bln_isProject=false;
              let obj_selected=obj_project.obj_palettSelected;
              if(obj_selected===obj_projectTarget){//probably ok to leave disabled global if selected component is not the project        
                bln_isProject=true;
              }   
              
              let str_name=obj_ini.obj_design.str_name;

              let bln_disabled;
      
              obj_ini.obj_domProperty.disabled=true; 

              
              if(!obj_project.LocationMatchInstance){                
                  return obj_ini;
              }
              
              if(obj_selected.obj_design.int_modeExecute!==obj_holder.int_modeEdit){                
                return obj_ini;
              }      

              let str_listIn="bln_isContainer,bln_maintainId,bln_registerAtContainer,bln_showToolbar,bln_themeType,bln_toggleProjectPin,bln_typeable,str_nameRegistrator,bln_registerAtProject,bln_palettePin,bln_projectPin,dataSVG,filterSVG,gridTemplate,str_classList,str_classExtend,str_createdDate,str_locationID,str_idProject,str_modifiedDate,str_name,str_nameTheme,str_subType,str_text,str_tag,str_urlServer,str_value,";              
              let str_listInProjectOnly="bln_createRelease,bln_lockComponent,str_nameRelease,str_type,str_urlServer";
              str_listIn+=str_listInProjectOnly;

              //obj_design.bln_useOwnButton

              let bln_display;

              bln_disabled=true;

              let str_method="fn_validateDesignInput";
              if(obj_selected && obj_selected[str_method]){
                bln_disabled=obj_selected[str_method](obj_ini);
              }                        


              if(obj_shared.fn_inStr(","+str_name+",", ","+str_listIn+",")){                
                bln_disabled=false;
              }            
              if(!bln_isProject){
                if(obj_shared.fn_inStr(","+str_name+",", ","+str_listInProjectOnly+",")){                
                  bln_disabled=true;
                }            
              }              

              switch(str_name){                        
                case "str_text": 
                  if(obj_selected.fn_getTypeable()){
                    bln_disabled=false;
                  }            
              }

              

              if(!obj_project.LocationMatchInstance){              
                bln_disabled=true;
              }

              obj_ini.obj_domProperty.disabled=bln_disabled;                    
              //obj_ini.obj_domProperty.readonly=bln_disabled;                    

              
              
              
              return obj_ini;
            }
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydesign