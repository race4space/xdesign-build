
      //XSTART component/xdesign1_propertydomattribute
        class xdesign1_propertydomattribute extends xdesign1_propertysheet{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertydomattribute");      
            this.fn_setTag("xdesign1_propertydomattribute");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("xdesign1_propertysheet");            
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
      
              
              this.obj_design.int_modeExecute=obj_holder.int_modeReadOnly;
              
              //START PROPERTY SHEET
              obj_arg=new Holder;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_container=obj_container;
              obj_arg.str_text=this.obj_design.str_text;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_propertySheet=obj_selected.obj_domAttribute;                 
              obj_arg.str_propertySourceChange="fn_propertyDomAttributeChange";//this runs when a new entry is made in the property sheet 
              obj_arg.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange";        
              obj_arg.obj_design.str_valueEventChange="fn_linkDomAttributeChange";//this runs when a value in the property sheet is changed      
              obj_arg.str_optionDOMDisplay="DOMAttribute";
              super.fn_onPaletteItemSelected(obj_arg);
              //END PROPERTY SHEET            
            }   
      
            fn_displayPropertySheet(obj_arg){      
              
              let str_key, foo_val;
          
              let arr_Property=obj_arg.obj_item.dom_obj.attributes;
              for(var i = 0; i < arr_Property.length; i++) {
        
              obj_arg.str_key=arr_Property[i].name;
              obj_arg.foo_val=arr_Property[i].value;        
              //console.log("ATTRIBUTE: " + obj_arg.str_key + ": " + arr_Property[i].value);
      
              //obj_arg.foo_val=obj_arg.obj_item.dom_obj.getAttribute(obj_arg.str_key);
              //console.log("ATTRIBUTE: " + obj_arg.str_key + ": " + obj_arg.foo_val);
              this.fn_displayPropertySheetRow(obj_arg);  
              
              } 
            }
          
      
            
          //this runs when a value in the property sheet is changed    
          fn_linkDomAttributeChange(){      
            
              let obj_itemEvent, obj_item, str_name, str_value;      
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              str_value=obj_itemEvent.fn_getValue();        
              obj_item.fn_setDomAttribute(str_name, str_value);      
              obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                         
            }    
            
            //this runs when a new entry is made in the property sheet 
            fn_propertyDomAttributeChangeName(){
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);                  
              this.foo_propertyDomAttributeChangeName=foo_value;      
              this.fn_propertyDomAttributeChangeCheck(obj_item);            
            }
            
            //this runs when a new entry is made in the property sheet 
            fn_propertyDomAttributeChangeValue(){
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);            
              this.foo_propertyDomAttributeChangeValue=foo_value;      
              this.fn_propertyDomAttributeChangeCheck(obj_item);            
              obj_item.obj_designDelegate.fn_setPaletteSelected();                                   
            }
            fn_propertyDomAttributeChangeCheck(obj_item){
              let str_name, foo_value;
              str_name=this.foo_propertyDomAttributeChangeName;
              foo_value=this.foo_propertyDomAttributeChangeValue;      
              if(str_name===undefined){return;}
              if(foo_value===undefined){return;}
              obj_item.fn_setDomAttribute(str_name, foo_value);      
              return true;
            }
            fn_validateInput(obj_ini){       
              
              if(!obj_project.LocationMatchInstance){                
                return obj_ini;
            }
              //pls gnore this comment
              obj_ini.obj_domProperty.disabled=false;                   
              return obj_ini;
            }
            
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydomattribute