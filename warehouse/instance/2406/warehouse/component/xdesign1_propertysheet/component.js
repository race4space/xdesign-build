
      //XSTART component/xdesign1_propertysheet
        class xdesign1_propertysheet extends tag{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertysheet");      
            this.fn_setTag("xdesign1_propertysheet");            
            this.obj_design.bln_isGenericTag=true;            

            this.fn_requires("input");     
            this.fn_requires("table");          
          }

          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){//overiding for safety. can reivew overide.                
      
              let obj_table;      
              let str_text=obj_arg.str_text;
              let obj_container=obj_arg.obj_container;
            
              let obj_ini, arr;
              let obj_row, obj_item;
              let obj_input;       
              
            
              obj_ini=new Holder;            
              obj_ini.obj_design.str_type="table";       
              obj_table=obj_container.fn_addItem(obj_ini);//BootItem    
              obj_arg.obj_table=obj_table;
            
              if(str_text){
                obj_row=obj_table.fn_addItem();//BootItem
                obj_ini=new Holder;            
                obj_ini.obj_design.str_type="tableheader";                        
                obj_ini.obj_theme=this.obj_theme;          
                obj_ini.obj_domProperty.colSpan=2;                                  
                obj_item=obj_row.fn_addItem(obj_ini);//BootItem    
                obj_item.fn_setText(str_text);                
              }        
            
              if(obj_arg.str_propertySourceChange){
                this.fn_propertySourceChange(obj_arg);//add new value row    
              }  
              
              //Parent class can call from here
              this.fn_displayPropertySheet(obj_arg);
            }
            
            fn_displayPropertySheet(obj_arg){//to be overriden              
      
              let arr_Property=Object.entries(obj_arg.obj_propertySheet).sort((a, b) => a[0].localeCompare(b[0]));          
              for (let [str_key, foo_val] of arr_Property) {          
                  obj_arg.str_key=str_key;
                  obj_arg.foo_val=foo_val;
                  this.fn_displayPropertySheetRow(obj_arg);
                } 
            }
          
            
            
            fn_displayPropertySheetRow(obj_arg){
          
              let str_key, str_val, foo_val;
              let obj_row, obj_ini, obj_container, obj_cell, obj_input;
              let bln_disabled;      
          
              str_key=obj_arg.str_key;    
              foo_val=obj_arg.foo_val;
              obj_ini=new Holder;
          
              
              foo_val=this.fn_validateInputValue(str_key, foo_val);
          
              if(foo_val===undefined){
                return;
              } 
            
              if(foo_val===""){
                return;
              }   
                
              str_val=foo_val;
              if(typeof foo_val==="object"){     
                if(foo_val){
                  str_val=foo_val.constructor.name;
                }
              }
              
          
              let str_keyDisplay, str_valueDisplay;
              str_keyDisplay=str_key;              
              str_valueDisplay=str_val;

              if(str_keyDisplay==="bln_registerAtProject"){
                //console.log("1 " + str_keyDisplay + ": " + str_valueDisplay)
              }              
              
              obj_row=obj_arg.obj_table.fn_addItem();
              
              //START CREATE NAME CELL
              obj_ini=new Holder;                        
              //obj_ini.obj_design.str_content=str_keyDisplay+":&nbsp;";
              obj_ini.obj_theme=this.obj_theme;        
              obj_ini.obj_domStyle.minWidth="150px";
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem
              obj_container=obj_cell;          
              //END CREATE NAME CELL
          
              //ADD TEXT INPUT TO NAME CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";
              obj_ini.str_subType="text";                              
              obj_ini.obj_domProperty.value=str_keyDisplay;    
              obj_ini.obj_design.str_name=str_key;               
              obj_ini.obj_domProperty.disabled=true;    
              obj_ini.obj_theme=this.obj_theme;        
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                              
              //END TEXT INPUT TO NAME CELL
              
              //START CREATE VALUE CELL
              obj_ini=new Holder;  
              obj_ini.obj_theme=this.obj_theme;        
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
              obj_container=obj_cell;          
              //END CREATE VALUE CELL
          
              //ADD TEXT INPUT TO VALUE CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";
              obj_ini.str_subType="text";                      
              obj_ini.obj_domProperty.value=str_valueDisplay;                                 
              obj_ini.obj_design.str_name=str_key;    
              obj_ini.obj_theme=this.obj_theme;        
              obj_ini.obj_design.str_linkId=obj_arg.obj_item.obj_design.str_idXDesign;            
              obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automaticall to dom        
              obj_ini.obj_design.str_valueEventChange=obj_arg.obj_design.str_valueEventChange;
              bln_disabled=true;            
              if(obj_arg.obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                bln_disabled=false;
              }              
              if(this.obj_design.int_modeExecute===obj_holder.int_modeReadOnly){                
                bln_disabled=true;
              }        
              
              if(typeof foo_val==="object"){        
                bln_disabled=true;
              }
              
              obj_ini.obj_domProperty.disabled=bln_disabled;    
          
              obj_ini=this.fn_validateInput(obj_ini);
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                              
              //END TEXT INPUT TO VALUE CELL
                
            }
          
            fn_validateInputValue(str_name, str_value){      
              return str_value;
            }
          
            fn_validateInput(obj_ini){
              return obj_ini;
            }
          
            
            fn_propertySourceChange(obj_arg){              
              
              let obj_table=obj_arg.obj_table;
              let obj_ini, arr;
              let obj_row, obj_cell;
              let obj_input;
              let bln_disabled;
            
              let obj_item=obj_arg.obj_item;      
              let obj_container=obj_arg.obj_container;
            
              obj_row=obj_table.fn_addItem();//BootItem
            
              //START CREATE NAME CELL
              obj_ini=new Holder; 
              obj_ini.obj_theme=this.obj_theme;              
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
              obj_container=obj_cell;          
              //END CREATE NAME CELL
            
              //ADD TEXT INPUT TO NAME CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";      
              obj_ini.str_subType="text";
              obj_ini.obj_domProperty.value="";    
              obj_ini.obj_design.str_name="str_key";                        
              obj_ini.obj_design.str_linkId=obj_item.obj_design.str_idXDesign;            
              obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automatically to dom        
              obj_ini.obj_design.str_valueEventChange=obj_arg.str_propertySourceChange + "Name";          
              
              
              bln_disabled=true;            
              if(obj_arg.obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                bln_disabled=false;
              }           
              
              if(this.obj_design.int_modeExecute===obj_holder.int_modeReadOnly){                
                bln_disabled=true;
              }

              if(!obj_project.LocationMatchInstance){              
                bln_disabled=true;
              }

              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                             
      
              
              
              //END TEXT INPUT TO NAME CELL
              
              //START CREATE VALUE CELL
              obj_ini=new Holder;     
              obj_ini.obj_theme=this.obj_theme;      
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
              obj_container=obj_cell;          
              //END CREATE VALUE CELL
              
              //ADD TEXT INPUT TO VALUE CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";      
              obj_ini.str_subType="text";
              obj_ini.obj_domProperty.value="";
              obj_ini.obj_design.str_name="str_key";                   
              obj_ini.obj_design.str_linkId=obj_item.obj_design.str_idXDesign;            
              obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automaticall to dom        
              obj_ini.obj_design.str_valueEventChange=obj_arg.str_propertySourceChange + "Value";      
              
              bln_disabled=true;            
              if(obj_arg.obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                bln_disabled=false;
              }        
              if(this.obj_design.int_modeExecute===obj_holder.int_modeReadOnly){                
                bln_disabled=true;
              }    
              
              if(!obj_project.LocationMatchInstance){              
                bln_disabled=true;
              }
              
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                              
              //END TEXT INPUT TO VALUE CELL        
            }  
        
      
        }//END CLS
        //END TAG
        //END component/xdesign1_propertysheet