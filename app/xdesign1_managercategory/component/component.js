
      //XSTART component/xdesign1_managercategory
        class xdesign1_managercategory extends xdesign1_managermenu{

        constructor(obj_ini) {      
          super(obj_ini);        
        } 
        fn_initialize(obj_ini){
          super.fn_initialize(obj_ini);                          
          
          this.fn_setType("xdesign1_managercategory");      
          this.fn_setTag("xdesign1_managercategory");            
          this.obj_design.bln_isGenericTag=true;            
          this.fn_extends("xdesign1_managermenu");                              

          this.obj_design.str_urlServer="server.php";
          this.obj_holder.bln_debugServer=false;
        }                           
        
        fn_onStateChange(){                          
          super.fn_onStateChange();          
          this.obj_holder.obj_container.fn_setEnabled();                                        
        }
        fn_getContent(){
          //console.log("fn_getContent");          
          let obj_query={};            
          obj_query.str_action="getListProjectInCategory";            
          obj_query.str_queryString="CategoryName=" + this.obj_design.str_categoryName;                                
          this.fn_runQuery(obj_query);
        }           

        getListProjectInCategory(obj_post){                                                  
          this.fn_getRecordSetItems(obj_post);
        }

        fn_formatRecordSetItem(obj_ini, obj_row){
          obj_ini.obj_design.str_name="xdesign1_buttonOpenProject" + obj_row.InstanceName;            
          obj_ini.obj_design.str_valueEventClick="fn_openProject";            
          obj_ini.obj_design.int_idRecordTarget=obj_row.InstanceId;                                        
        }
        
      }//END CLS
      //END TAG
      //END component/xdesign1_managerprojectcategory