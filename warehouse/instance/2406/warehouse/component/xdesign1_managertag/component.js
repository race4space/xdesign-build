
  //XSTART component/xdesign1_managertag
  class xdesign1_managertag extends xdesign1_managermenu{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      this.fn_setType("xdesign1_managertag");      
      this.fn_setTag("xdesign1_managertag");            
      this.obj_design.bln_isGenericTag=true;
      this.fn_extends("xdesign1_managermenu");            
      
      this.fn_requires("xdesign1_objectmap");                  
      this.fn_requires("xdesign1_objectaction");    
      this.fn_requires("xdesign1_propertydesignui");    
      this.fn_requires("xdesign1_propertydomstyle");    
      this.fn_requires("xdesign1_propertydomproperty");    
      this.fn_requires("xdesign1_propertydomattribute");    
      this.fn_requires("xdesign1_propertydesign");
    }
    fn_onStateChange(){
      if(!super.fn_onStateChange()){return;}       
      if(!obj_projectTarget){return;}                 
      
      let bln_value=true;      
      if(!obj_project.LocationMatchInstance){bln_value=false;}                 
      this.obj_holder.obj_container.fn_setEnabled(bln_value);
    } 
    fn_onPaletteItemSelected(){

      let obj_item;  

      this.fn_addDynamicItems();      
      
      let obj_selected=obj_project.obj_palettSelected;                
      let obj_arg=this.fn_shallowCopyObject(obj_selected.obj_holder.obj_levelLimit);                
      obj_arg.obj_selected=obj_selected;            
      
      obj_item=this.obj_holder.obj_xdesign1_objectmap;            
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}                

      obj_item=this.obj_holder.obj_xdesign1_objectaction;            
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydesignui;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        
      
      obj_item=this.obj_holder.obj_xdesign1_propertydomstyle;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydomproperty;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydomattribute;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydesign;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      let bln_value=true;      
      if(!obj_project.LocationMatchInstance){bln_value=false;}                 
      this.obj_holder.obj_container.fn_setEnabled(bln_value);      
      this.obj_holder.obj_container.fn_open();

    }

    fn_addDynamicItems(){    

      let obj_ini, obj_item, obj_dynamicContentHolder;  
      
      obj_dynamicContentHolder=this.fn_getComponent("ListTagDynamicContent");
      
      if(!obj_dynamicContentHolder){
        return;
      }     

      obj_dynamicContentHolder.fn_prepare();        
      
      
      obj_ini=new Holder;                            
      obj_ini.obj_design.str_name="xdesign1_objectmap";                 
      obj_ini.obj_design.str_text="MAP";                        
      obj_ini.obj_design.str_tag="xdesign1_objectmap";                               
      obj_ini.obj_design.str_type="xdesign1_objectmap";       
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);      
      this.fn_register(obj_item);      
      
      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_objectaction";              
      obj_ini.obj_design.str_text="ACTION";                      
      obj_ini.obj_design.str_tag="xdesign1_objectaction";                     
      obj_ini.obj_design.str_type="xdesign1_objectaction";                   
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);      

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydesignui";         
      obj_ini.obj_design.str_text="DESIGN UI";                       
      obj_ini.obj_design.str_type="xdesign1_propertydesignui";       
      obj_ini.obj_design.str_tag="xdesign1_propertydesignui";                         
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);      
      
      obj_ini=new Holder;                    
      obj_ini.obj_design.str_name="xdesign1_propertydomstyle";    
      obj_ini.obj_design.str_text="STYLE";                        
      obj_ini.obj_design.str_type="xdesign1_propertydomstyle";       
      obj_ini.obj_design.str_tag="xdesign1_propertydomstyle";        
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);           
      this.fn_register(obj_item);

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydomproperty";    
      obj_ini.obj_design.str_text="PROPERTY";                           
      obj_ini.obj_design.str_type="xdesign1_propertydomproperty";       
      obj_ini.obj_design.str_tag="xdesign1_propertydomproperty";                   
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);           
      this.fn_register(obj_item);

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydomattribute";   
      obj_ini.obj_design.str_text="ATTRIBUTE";                           
      obj_ini.obj_design.str_type="xdesign1_propertydomattribute";       
      obj_ini.obj_design.str_tag="xdesign1_propertydomattribute";                   
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydesign";         
      obj_ini.obj_design.str_text="DESIGN";                       
      obj_ini.obj_design.str_type="xdesign1_propertydesign";       
      obj_ini.obj_design.str_tag="xdesign1_propertydesign";                         
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);
    }
    fn_linkCompassItem(obj_target){                     

      this.obj_holder.obj_xdesign1_objectmap.fn_linkCompassItem(obj_target);
    }
    fn_copyTag(){

      let obj_item=obj_project.obj_palettSelected;      
      let obj_localHome=obj_item.fn_getLocalHome();

      if(!obj_clipboard.fn_validateCopy(obj_item, obj_localHome)){return;}
      
      obj_clipboard.fn_copy(obj_item);
      let obj_copy=obj_clipboard.fn_get();     
      
      this.fn_removeId(obj_copy);      
      obj_copy.obj_design.bln_palettePin=false;        
      obj_copy.obj_design.bln_projectPin=false;              
      

      obj_item.obj_designDelegate.fn_setPaletteSelected();       
    }
    fn_removeId(obj_item){  

      let bln_locked=obj_item.obj_design.bln_lockComponent;              
      bln_locked=obj_shared.fn_parseBool(bln_locked);
      if(bln_locked){        
        return;
      } 

      //let obj_localHome=obj_selected.fn_getLocalHome();      
      //bln_locked=obj_localHome.fn_getLocked();
      
      
      obj_item.obj_design.int_idRecord=0;      
      obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;              

      let arr=obj_item.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){            
          this.fn_removeId(arr[i]);
      }
    } 
    fn_pasteTag(){      
      let obj_item=obj_project.obj_palettSelected;            
      let obj_localHome=obj_item.fn_getLocalHome();
      let obj_container=obj_clipboard.fn_validatePaste(obj_item, obj_localHome);
      if(!obj_container){return;}

      obj_item=obj_clipboard.fn_paste(obj_container);       
      //obj_item.obj_designDelegate.fn_removeId();
      //obj_clipboard.fn_clear();                                            
      
      //obj_container.obj_design.int_modeExecute=obj_holder.int_modeEdit;      
      //obj_container.obj_designDelegate.fn_setPaletteSelected();          
      obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;      
      obj_item.obj_designDelegate.fn_setPaletteSelected();          
    }
    fn_insertTag(){      
      let obj_item=obj_project.obj_palettSelected;            
      let obj_localHome=obj_item.fn_getLocalHome();
      let obj_insertNextTo=obj_clipboard.fn_validateInsert(obj_item, obj_localHome);
      if(!obj_insertNextTo){return;}
      
      obj_item=obj_clipboard.fn_insert(obj_insertNextTo);                   
      //obj_item.obj_designDelegate.fn_removeId();
      //obj_clipboard.fn_clear();                                                  
      obj_item.obj_designDelegate.fn_setPaletteSelected();          
    }
    fn_cutTag(){
      let obj_item=obj_project.obj_palettSelected;      
      let obj_localHome=obj_item.fn_getLocalHome();

      if(!obj_clipboard.fn_validateCut(obj_item, obj_localHome)){return;}
      obj_clipboard.fn_copy(obj_item);
      this.fn_deleteTag();
    }
    fn_deleteTag(){
      let obj_item=obj_project.obj_palettSelected;            
      let obj_localHome=obj_item.fn_getLocalHome();
      let bln_status=obj_clipboard.fn_validateDelete(obj_item, obj_localHome);
      if(!bln_status){return;}

      let obj_container=obj_item.obj_holder.obj_container;
      obj_item.obj_designDelegate.fn_setPaletteDeSelected();                      
      obj_container.fn_removeItem(obj_item);

      obj_container.obj_design.int_modeExecute=obj_holder.int_modeEdit;      

      /*
      obj_item=obj_container.fn_getEndItem();//return the item or its last child for seleciton                                      
      obj_item.obj_designDelegate.fn_setPaletteSelected();      
      obj_item.fn_debug("END ITEM");
      //*/

      obj_container.obj_designDelegate.fn_setPaletteSelected();      
    }    
    fn_selectLocalHome(){      
      let obj_localHome=obj_project.obj_palettSelected.fn_getNextLocalHome();      
      obj_localHome.obj_designDelegate.fn_setPaletteSelected();
    }    
    fn_editTag(){
      let obj_item=obj_project.obj_palettSelected;            
      obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;      
      obj_item.obj_designDelegate.fn_setChildrenModeExecute(obj_holder.int_modeEdit);//new change to also set children to editable
      obj_item.obj_designDelegate.fn_setPaletteSelected();       
    }    
    fn_setEazyGridSwitch  (){
      return this.obj_holder.obj_xdesign1_objectaction.fn_setEazyGridSwitch();
    }        
    //START PROPERTY SHEET EVENT HANDLING                    
    fn_linkDomAttributeChange(){      
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_linkDomAttributeChange();
    }
    fn_linkDesignChange(){      
      return this.obj_holder.obj_xdesign1_propertydesign.fn_linkDesignChange();
    }
    fn_linkDomStyleChange(){
      return this.obj_holder.obj_xdesign1_propertydomstyle.fn_linkDomStyleChange();      
    }
    fn_linkDomPropertyChange(){
      return this.obj_holder.obj_xdesign1_propertydomproperty.fn_linkDomPropertyChange();      
    } 
    fn_linkDomAttributeChange(){
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_linkDomAttributeChange();      

    }           
    fn_propertyDOMStyleChangeName(){
      return this.obj_holder.obj_xdesign1_propertydomstyle.fn_propertyDOMStyleChangeName();      
    }
    fn_propertyDOMStyleChangeValue(){
      return this.obj_holder.obj_xdesign1_propertydomstyle.fn_propertyDOMStyleChangeValue();                  
    }
    fn_propertyDomPropertyChangeName(){
      return this.obj_holder.obj_xdesign1_propertydomproperty.fn_propertyDomPropertyChangeName();            
    }
    fn_propertyDomPropertyChangeValue(){      
      return this.obj_holder.obj_xdesign1_propertydomproperty.fn_propertyDomPropertyChangeValue();                  
    }
    fn_propertyDomAttributeChangeName(){
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_propertyDomAttributeChangeName();                  
    }
    fn_propertyDomAttributeChangeValue(){
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_propertyDomAttributeChangeValue();                        
    }      
    fn_propertyDesignChangeName(){      
      return this.obj_holder.obj_xdesign1_propertydesign.fn_propertyDesignChangeName();                            
    }
    fn_propertyDesignChangeValue(){
      return this.obj_holder.obj_xdesign1_propertydesign.fn_propertyDesignChangeValue();                                  
    }
    //END PROPERTY SHEET EVENT HANDLING                    
  }//END CLS
  //END TAG
  //END component/xdesign1_managertag