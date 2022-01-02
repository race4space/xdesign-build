
      //XSTART component/xdesign1_propertydesignui
        class xdesign1_propertydesignui extends xdesign1_propertydesign{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertydesignui");      
            this.fn_setTag("xdesign1_propertydesignui");            
            this.obj_design.bln_isGenericTag=true; 
            this.fn_extends("xdesign1_propertydesign");           
          }

          fn_displayPropertySheet(obj_arg){//to be overriden      

            let bln_isProject, bln_isThemeProject=false;
            let obj_selected=obj_project.obj_palettSelected;
            if(obj_selected===obj_projectTarget){//probably ok to leave disabled global if selected component is not the project        
              bln_isProject=true;
            }                                   
            if(obj_projectTarget.obj_design.str_type==="theme"){
              bln_isThemeProject=true;
            }

            
      
            
              let str_listIn="bln_maintainId,bln_palettePin,bln_projectPin,bln_registerAtContainer,bln_registerAtProject,bln_typeable,dataSVG,filterSVG,gridTemplate,int_idRecord,str_classExtend,str_classList,str_name,str_nameRegistrator,str_nameTheme,str_subType,str_type,str_tag,str_value,";
              //let str_listInProjectOnly="bln_palettePin,bln_projectPin,";        
              if(obj_selected.fn_getTypeable()){                    
                str_listIn+="str_text,";          
              }
              let str_listInProjectOnly="";
              str_listIn+=str_listInProjectOnly;

              if(bln_isThemeProject){
                str_listIn+="bln_themeType,";
              }
              
      
              let bln_display;
      
              let arr_Property=Object.entries(obj_arg.obj_propertySheet).sort((a, b) => a[0].localeCompare(b[0]));          
              for (let [str_key, foo_val] of arr_Property) {          
                  bln_display=false;
                  if(obj_shared.fn_inStr(","+str_key+",", ","+str_listIn+",")){                
                    bln_display=true;
                  }            
      
                  if(!bln_isProject){
                    if(obj_shared.fn_inStr(","+str_key+",", ","+str_listInProjectOnly+",")){                
                      bln_display=false;
                    }            
                  }
      
                  if(bln_display){
                      obj_arg.str_key=str_key;
                      obj_arg.foo_val=foo_val;
                      this.fn_displayPropertySheetRow(obj_arg);
                    }
                } 
            }
      
            fn_validateInput(obj_ini){
      
              let bln_isProject=false;
              if(obj_project.obj_palettSelected===obj_projectTarget){//probably ok to leave disabled global if selected component is not the project        
                bln_isProject=true;
              }                                   
      
              obj_ini=super.fn_validateInput(obj_ini);
      
              let str_listReadOnly="int_idRecord";
      
              let str_listAllAccess="gridTemplate";
      
              let str_listInProjectOnly="bln_palettePin,bln_projectPin";
      
        
              if(!bln_isProject){//probably ok to leave disabled global if selected component is not the project
                //obj_ini.obj_domProperty.disabled=true;    
              }
              
      
              if(obj_shared.fn_inStr(","+obj_ini.obj_design.str_name+",", ","+str_listAllAccess+",")){
                obj_ini.obj_domProperty.disabled=false;    
              }  
      
              if(obj_shared.fn_inStr(","+obj_ini.obj_design.str_name+",", ","+str_listReadOnly+",")){
                obj_ini.obj_domProperty.disabled=true;    
              }  

              
              if(!obj_project.LocationMatchInstance){                                            
                obj_ini.obj_domProperty.disabled=true;    
              }
              
              
        
              return obj_ini;
            }
          
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydesignui