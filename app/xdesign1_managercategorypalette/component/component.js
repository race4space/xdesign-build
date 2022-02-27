
            //XSTART component/xdesign1_managercategorypalette
            class xdesign1_managercategorypalette extends xdesign1_managermenu{
              constructor(obj_ini) {      
                super(obj_ini);        
              } 
              fn_initialize(obj_ini){
                super.fn_initialize(obj_ini);                
                
                
                this.fn_setType("xdesign1_managercategorypalette");      
                this.fn_setTag("xdesign1_managercategorypalette");            
                this.fn_extends("xdesign1_managermenu");                              
                this.obj_design.bln_isGenericTag=true;                  

                this.obj_design.str_urlServer="server.php";
                this.obj_holder.bln_debugServer=false;
              }

              

              fn_onStateChange(){                          
                super.fn_onStateChange();          
                this.obj_holder.obj_container.fn_setEnabled();                                        
              }
              fn_getContent(){
                //console.log("abc fn_getContent");          
                let obj_query={};            
                obj_query.str_action="getListPaletteInCategory";            
                obj_query.str_queryString="CategoryName=" + this.obj_design.str_categoryName;                                
                this.fn_runQuery(obj_query);
              }           
      
              getListPaletteInCategory(obj_post){                                                  
                this.fn_getRecordSetItems(obj_post);
              }
      
              fn_formatRecordSetItem(obj_ini, obj_row){

                let str_LastVersionDate=obj_ini.obj_design.str_LastVersionDate;
                let bln_valid=obj_shared.fn_validDate(str_LastVersionDate);                
                if(!bln_valid){      
                  obj_ini.obj_design.bln_disabled=true;                
                }            
                
                
                
                obj_ini.obj_design.str_name="xdesign1_buttonAddPaletteItem" + obj_row.InstanceName;            
                obj_ini.obj_design.str_valueEventClick="fn_addComponentItem";            
                obj_ini.obj_design.int_idRecordTarget=obj_row.InstanceId;        
                obj_ini.obj_design.str_typeRecordTarget=obj_row.InstanceType;                
      
              }
              
            }//END CLS
            //END TAG
            //END component/xdesign1_managercategoryproject