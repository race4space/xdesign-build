
      //XSTART component/xdesign1_propertydomstyle
        class xdesign1_propertydomstyle extends xdesign1_propertysheet{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertydomstyle");      
            this.fn_setTag("xdesign1_propertydomstyle");            
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
              this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem                      
        
              obj_container=this.obj_sheetHolder;
              
              
              //START PROPERTY SHEET
              obj_arg=new Holder;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_container=obj_container;
              obj_arg.str_text=this.obj_design.str_text;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_propertySheet=obj_selected.obj_domStyle;                  
              obj_arg.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange";
              obj_arg.str_propertySourceChange="fn_propertyDOMStyleChange";//this runs when a new entry is made in the property sheet 
              obj_arg.obj_design.str_valueEventChange="fn_linkDomStyleChange";//this runs when a value in the property sheet is changed      
              obj_arg.str_optionDOMDisplay="DOMStyle";
              super.fn_onPaletteItemSelected(obj_arg);
              //END PROPERTY SHEET            
            }   
      
            fn_displayPropertySheet(obj_arg){      
      
              let str_key, foo_val;
              let str_style, arr_parts, str_part, arr_subParts;
              
              str_style=obj_arg.obj_item.dom_obj.getAttribute("style"); 
              if(!str_style){
                str_style="";            
              }
              
              if(!str_style.length){return;}
          
              arr_parts = str_style.split(";")        
              for (let i=0;i<arr_parts.length;i++) {
                  str_part=arr_parts[i];            
                  if(str_part.length){
                    arr_subParts = str_part.split(':');                            
                    obj_arg.str_key=arr_subParts[0].trim();                    
                    obj_arg.foo_val=obj_arg.obj_item.dom_obj.style[obj_arg.str_key];
                    //console.log("STYLE: " + obj_arg.str_key + ": " + obj_arg.foo_val);          
                    this.fn_displayPropertySheetRow(obj_arg);  
                  }
              }  
            }
          
      
            
          //this runs when a value in the property sheet is changed              
          fn_linkDomStyleChange(){
            
            let obj_itemEvent, obj_item, str_name, str_value;      
            obj_itemEvent=obj_project.obj_projectEvent;      
            
            obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);                        
            str_name=obj_itemEvent.obj_design.str_name;
            str_value=obj_itemEvent.fn_getValue();      
      
            str_value=this.fn_validateItem(obj_item, str_name, str_value);
            if(str_name===undefined){return;}
            if(str_value===undefined){return;}              
      
            obj_item.fn_setStyleProperty(str_name, str_value);  
            obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                         
          }
      
          //this runs when a new entry is made in the property sheet 
          fn_propertyDOMStyleChangeName(){
            let obj_itemEvent, obj_item, str_name, str_value;      
            
            obj_itemEvent=obj_project.obj_projectEvent;      
            obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
            str_name=obj_itemEvent.obj_design.str_name;
            str_value=obj_itemEvent.fn_getValue();      
            
            str_value=this.fn_validateItem(obj_item, str_name, str_value);      
            
            if(str_name===undefined){return;}
            if(str_value===undefined){return;}                    
      
            this.foo_propertyDOMStyleChangeName=str_value;      
            this.fn_propertyDOMStyleChangeCheck(obj_item);            
          }
          //this runs when a new entry is made in the property sheet 
          fn_propertyDOMStyleChangeValue(){
            let obj_itemEvent, obj_item, str_name, str_value;      
            
            obj_itemEvent=obj_project.obj_projectEvent;      
            obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
            str_name=obj_itemEvent.obj_design.str_name;
            let foo_value=obj_itemEvent.fn_getValue();
            foo_value=obj_shared.fn_parseBool(foo_value);       
            this.foo_propertyDOMStyleChangeValue=foo_value;      
            this.fn_propertyDOMStyleChangeCheck(obj_item); 
            obj_item.obj_designDelegate.fn_setPaletteSelected(); 
            //console.log("bbbb");                                  
            
          }
          fn_propertyDOMStyleChangeCheck(obj_item){
            let str_name, foo_value;
            str_name=this.foo_propertyDOMStyleChangeName;
            foo_value=this.foo_propertyDOMStyleChangeValue;      
            if(str_name===undefined){return;}
            if(foo_value===undefined){return;}      
            //console.log("1111");                                  
            obj_item.fn_setStyleProperty(str_name, foo_value);    
            //console.log("2222");                                  
            return true;
          }
          
          fn_validateItem(obj_item, str_name, str_value){                                    
              return str_value;
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydomstyle