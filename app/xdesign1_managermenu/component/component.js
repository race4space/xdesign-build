      //XSTART component/xdesign1_managermenu
      class xdesign1_managermenu extends recordset{
        constructor(obj_ini) {      
          super(obj_ini);        
        } 
        fn_initialize(obj_ini){
          super.fn_initialize(obj_ini);                
          
          
          this.fn_setType("xdesign1_managermenu");      
          this.fn_setTag("xdesign1_managermenu");            
          this.obj_design.bln_isGenericTag=true;
          this.fn_extends("recordset");            
          
        }
        
        
        fn_bootChildren(){//in boot phase , and often overidden                  

          let obj_ini=new Holder;                                    
          obj_ini.obj_design.str_type="dynamiccontent";    
          obj_ini.obj_design.str_name="dynamiccontent";    
          this.obj_holder.obj_dynamiccontent=this.fn_addItem(obj_ini);                    
          //console.log("fn_bootChildren: " + this.obj_holder.obj_dynamiccontent);

        }    
        fn_onStateChange(){                       
          this.obj_holder.bln_hasContent=false;          
          
          this.obj_holder.obj_container.fn_setDisplay(false);
          this.fn_close();          
          if(!obj_projectTarget){return false;}                 
          this.obj_holder.obj_container.fn_setDisplay();
          this.obj_holder.obj_container.fn_setEnabled();
          return true;
        }
        
        fn_close(bln_disable=true){
          this.obj_holder.obj_container.fn_close();                                  
          this.obj_holder.obj_container.fn_setDisabled(bln_disable);                                            

        }
        fn_open(bln_enable=true){          
          this.obj_holder.obj_container.fn_open();
          this.obj_holder.obj_container.fn_setEnabled(bln_enable);                                                      
        }
        
        fn_openContent(){
          //console.log("fn_openContent");            
          if(this.obj_holder.bln_hasContent){
            return;            
          }
          
          this.obj_holder.bln_hasContent=true;

          
          let obj_dynamiccontent=this.fn_getComponent("dynamiccontent");                                  
          if(!obj_dynamiccontent){
            //console.log("obj_dynamiccontent is false");            
            this.fn_bootChildren();            
            obj_dynamiccontent=this.obj_holder.obj_dynamiccontent;
          }    
          //console.log("x obj_dynamiccontent: " + obj_dynamiccontent);            
          if(!obj_dynamiccontent){
            return;
          }    
          obj_dynamiccontent.fn_prepare(); 

          let obj_ini=new Holder;                                    
          obj_ini.obj_design.str_type="accordion";    
          this.obj_holder.obj_accordion=obj_dynamiccontent.fn_addItem(obj_ini);                    

          this.fn_getContent();

        }
        fn_getContent(){           
          //console.log("manage rmenu default fn_getContent");

        }
        fn_closeContent(){
          //console.log("fn_closeContent");
        }          

        fn_getMenuItems(obj_post){

          let obj_row, arr_row;                       
          let str_CategoryName, str_CategoryCurrent;

          str_CategoryCurrent="";
          arr_row=obj_post.RowData;                                              
          
          for(var i=0;i<arr_row.length;i++){
            
            obj_row=arr_row[i];      
      
            if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object      
            
            if(obj_post.bln_ListAll){        
              str_CategoryName="All";
            }
            else{
              str_CategoryName=obj_row.CategoryName;
              if(str_CategoryName===null){
                continue;
              }                
            }
      
            if(str_CategoryName.toLowerCase()!==str_CategoryCurrent.toLowerCase()){
              str_CategoryCurrent=str_CategoryName;
              this.fn_addMenuItem(str_CategoryName);
            }             
          }
          this.fn_addMenuItem("All");
        }  
        fn_addMenuItem(str_CategoryName){
        }

        fn_getRecordSetItems(obj_post){                                                            

          let obj_ini, obj_item, obj_container, obj_row, arr_row;                     
          
          arr_row=obj_post.RowData;
          obj_container=this.obj_holder.obj_accordion;                                
          
          for(var i=0;i<arr_row.length;i++){
            
            obj_row=arr_row[i];      
      
            if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object                             

            
            
            
            let str_color="orange";              
            let str_LastVersionDate=obj_row.LastVersionDate;
            let bln_valid=obj_shared.fn_validDate(str_LastVersionDate);
            if(bln_valid ||obj_row.InstanceType==="category"){
              str_color="white";
            }            
            
            obj_ini=new Holder;            
            obj_ini.obj_design.str_LastVersionDate=str_LastVersionDate;
            obj_ini.obj_design.bln_dynamicPin=true;                                        
            obj_ini.obj_design.bln_dynamicPin=true;                                        
            obj_ini.obj_design.str_text=obj_row.InstanceName;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.int_idRecordTarget=obj_row.InstanceId;
            obj_ini.obj_design.str_typeRecord=obj_row.InstanceType;
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";            
            obj_ini.LastVersionDate=str_LastVersionDate;
            this.fn_formatRecordSetItem(obj_ini, obj_row);
            obj_item=obj_container.fn_addItem(obj_ini);
            obj_item.fn_setColor(str_color);
            if(obj_item.obj_design.bln_disabled){
              obj_item.fn_setDisabled(true);
            }
            
          }
        }

        fn_formatRecordSetItem(obj_ini){           
        }

        
      }//END CLS
      //END TAG
      //END component/xdesign1_managermenu


