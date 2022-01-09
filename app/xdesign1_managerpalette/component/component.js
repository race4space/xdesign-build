
//XSTART component/xdesign1_managerpalette
class xdesign1_managerpalette extends xdesign1_managermenu{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("xdesign1_managerpalette");      
    this.fn_setTag("xdesign1_managerpalette");                        
    this.fn_extends("xdesign1_managermenu");            
  }
  fn_onStateChange(){      
    
    if(!super.fn_onStateChange()){return;} 
    if(!obj_projectTarget){return;}   

    let bln_value;

    bln_value=true;               
    if(!obj_project.LocationMatchInstance){
      bln_value=false;
    }                 

    let obj_item;                        
    obj_item=this.fn_getComponent("xdesign1_addtag");
    if(obj_item){      
      obj_item.fn_setEnabled(bln_value);
    }               
    
    this.obj_holder.obj_container.fn_setEnabled(bln_value);    
                    
    this.fn_getListPinnedComponent();                

  }

  fn_getListPinnedComponent(){      
    obj_project.fn_runAction("getListPalettePinnedComponent");      
  }
  fn_onGetListPalettePinnedComponent(obj_post){          
    //console.log("fn_onGetListPalettePinnedComponent");            
    let arr_row=obj_post.RowData;    
    this.fn_listPinnedComponent(arr_row);
  }
  fn_listPinnedComponent(arr_row){

    let obj_ini, obj_item, obj_dynamicContentHolder;                        
    
    obj_dynamicContentHolder=this.fn_getComponent("ListPaletteDynamicContent");                        
    if(!obj_dynamicContentHolder){
      return;
    }
    obj_dynamicContentHolder.fn_prepare();                  

    let bln_disabled=false;
    if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
      
    
    let obj_row, int_idRecord, str_nameRecord, str_typeRecord;
    for(var i=0;i<arr_row.length;i++){
      obj_row=arr_row[i];
      if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object

      int_idRecord=obj_row.id;
      str_nameRecord=obj_row.Name;
      str_typeRecord=obj_row.Type;
      
      obj_ini=new Holder;        
      //obj_ini.obj_design.str_name="xdesign1 " + obj_row.Name;
      obj_ini.obj_design.str_name="xdesign1_buttonAddPaletteItem" + obj_row.Name;
      obj_ini.obj_design.str_text=obj_row.Name;
      obj_ini.obj_design.str_type="button";
      obj_ini.obj_design.int_idRecordTarget=int_idRecord;        
      obj_ini.obj_design.str_typeRecordTarget=str_typeRecord;
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_addComponentItem";                    
      obj_ini.obj_domProperty.disabled=bln_disabled;         
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
    }

    
    if(obj_projectTarget){
      obj_projectTarget.obj_designDelegate.fn_setPaletteSelected();        
    }
  }

  fn_onPaletteItemSelected(){                                             
    let obj_container=obj_project.obj_palettSelected;
    let bln_valid=this.fn_validateContainer(obj_container);   

    if(!obj_project.LocationMatchInstance){bln_valid=false;}                 
                             
    if(!bln_valid){              
      this.obj_holder.obj_container.fn_close();                    
      this.obj_holder.obj_container.fn_setDisabled();        
    }
    else{            
      this.obj_holder.obj_container.fn_setEnabled(true);                                              
    }
    
    this.fn_setPaletteEnabled(obj_container);
  }
  fn_validateContainer(obj_container, int_idRecordSearch=0){



    let bln_debug_error=false;      
    let bln_debug_valid=false;      
    let bln_isContainer;

    //At no point in the containers id lineage should int_idRecord occurr
    //(or possibly any of id records children)          
    if(!obj_container){//new component
      if(bln_debug_error){console.log("VALIDATE CONTAINER: CONTAINER IS FALSE");}
      return false;
    }   
    
    bln_isContainer=obj_container.fn_getIsContainer();            
    if(!bln_isContainer){//new component
      if(obj_container.obj_design.bln_isGenericTag && bln_isContainer===undefined){
        if(bln_debug_valid){console.log("VALIDATE CONTAINER: CHECK GENERIC TAG IS A CONTAINER");}  
        bln_isContainer=this.fn_genericTagIsContainer(obj_container.obj_design.str_tag);
      }
      if(bln_debug_error){console.log("VALIDATE CONTAINER: THIS ITEM IS NOT A CONTAINER");}
      return false;
    }      
    
    if(obj_container.fn_getLocked()){//new component
      if(bln_debug_error){console.log("VALIDATE CONTAINER: THIS CONTAINER IS LOCKED");}      
      return false;
    }                  
    
    if(parseInt(obj_container.obj_design.int_modeExecute)!==obj_holder.int_modeEdit){//new component              
      if(bln_debug_error){console.log("VALIDATE CONTAINER: THIS CONTAINER IS NOT EDITABLE");}      
      return false;
    }            

    if(int_idRecordSearch===0){//new component
      if(bln_debug_valid){console.log("VALIDATE CONTAINER: VALIDATED (ID SEARCH IS 0)");}      
      return true;
    }      
    if(obj_container.obj_design.int_idRecord===0){//new component        
      if(bln_debug_valid){console.log("VALIDATE CONTAINER: VALIDATED (ID RECORD IS 0)");}      
      return true;
    }            
    
    let bln_inHistory=obj_container.fn_searchIdHistory(obj_container, int_idRecordSearch);
    if(bln_inHistory){        
      if(bln_debug_error){console.log("VALIDATE CONTAINER: CANNOT INSERT PARENT INTO CHILD");}
      return false;
    }

    if(bln_debug_valid){console.log("VALIDATE CONTAINER: THIS CONTAINER IS VALIDATED");}
    return true;
  }          
  fn_addComponentItem(){//component Item 

    let obj_itemEvent, obj_item, str_tag, obj_ini, int_idRecord;
    obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button      
    str_tag=obj_itemEvent.dom_obj.innerText;
    obj_ini=new Holder;
    obj_ini.obj_design.str_type=obj_itemEvent.obj_design.str_typeRecordTarget;      
    obj_ini.obj_design.str_name=obj_itemEvent.obj_design.str_nameRecordTarget;      
    obj_ini.obj_design.int_modeExecute=obj_ini.int_modeReadOnly;                        
    int_idRecord=obj_itemEvent.obj_design.int_idRecordTarget;
    obj_ini.obj_design.int_idRecord=int_idRecord;           
    obj_item=this.fn_addPaletteItem(obj_ini);//ids are removed (if not locked) and new object set to selected, in designDelegate.fn_addPaletteItem
    return obj_item;     
  }        
  fn_addPaletteItem(obj_ini){

    let obj_container, obj_item;
    let str_type, str_type_container, bln_canInsert;      
    
    obj_container=obj_project.obj_palettSelected;
    if(!obj_container){return;}//e.g if no project thas been started
    let obj_localHome=obj_container.fn_getLocalHome();

    obj_container=this.fn_getInsertContainer(obj_container, obj_localHome, obj_ini.obj_design.int_idRecord);
    if(!obj_container){return;}

    str_type=obj_ini.obj_design.str_type.toLowerCase();
    str_type_container=obj_container.obj_design.str_type.toLowerCase();
    bln_canInsert=this.fn_validateInsertContainer(str_type, obj_container);
    if(!bln_canInsert){
      console.log("fn_addPaletteItem CANNOT INSERT ITEM: " + str_type + ": " + str_type_container);
      return;
    }
    
    switch(obj_ini.obj_design.str_type.toLowerCase()){        
      case "eazygriditem":
        obj_container=obj_project.obj_lastGrid;
      break;
      case "img":
        if(obj_ini.obj_domProperty.src===undefined){obj_ini.obj_domProperty.src=obj_path.fn_getURLAssetFile("eazylogo.png");}
        break;
      default:
    }
    //ADD ITEM
    //This will need to have obj_ini.obj_design.int_idRecord, if adding an saved instance component
    obj_item=obj_container.obj_designDelegate.fn_addPaletteItem(obj_ini);
    
    if(!obj_item){
      console.log("obj_item is false, check dynamic content")
      return;
    }
    if(this.fn_validateContainer(obj_item, obj_ini.obj_design.int_idRecord)){
      //obj_item.obj_designDelegate.fn_setPaletteSelected();      
    }
    else{
      //obj_container.obj_designDelegate.fn_setPaletteSelected();  //set eithe ritem or parent as selected    
    } 
    obj_item.obj_designDelegate.fn_setPaletteSelected();      
    //ADD ITEM      

    switch(obj_item.fn_getType()){
      case "eazygrid":
        obj_project.obj_lastGrid=obj_item;//not part of eazyGrid
      break;
    }
  
    switch(obj_item.fn_getType()){
      case "eazygrid":
        obj_projectTarget.fn_applyTheme();
      break;
      case "eazygriditem":
        obj_projectTarget.fn_applyTheme();
      break;
    }

    return obj_item;
  }
  fn_addPaletteTagFromInput(){
    let obj_itemEvent, obj_item, obj_ini, str_tag, str_type, str_value, str_linkId;
    let foo_val, obj_tag, str_content;      

    
    /*
    obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button
    str_linkId=obj_itemEvent.obj_design.str_linkId;//str_linkId is the input
    if(str_linkId===undefined){//likely just the input which was clicked
      alert("str_linkId: " + str_linkId);
      return;
    }    
    obj_item=obj_project.fn_findItemById(str_linkId);//this is the input
    //*/

    obj_item=this.fn_getComponent("xdesign1_addtagInput");                                    
    if(!obj_item){return;}
    
    
    str_value=obj_item.dom_obj.value;          
    str_tag=str_value;
    str_type=str_tag;
    
    obj_ini=new Holder;      
    obj_ini.obj_design.bln_isGenericTag=true;//this affects canhavechildren. turn off for specifc tags. which we have class files for.
    obj_ini.obj_design.str_tag=str_tag;           

    
    foo_val=obj_ComponentMap.get(str_tag);                            
    //if we have a class defintion
    if(foo_val){
      obj_ini.obj_design.bln_isGenericTag=false;
    }
    else{
      str_type="tag";
      
    }
    //console.log("str_type: " + str_type);

    obj_ini.obj_design.str_type=str_type;

    str_content="Place your [" + str_tag + "] content here";
    str_content="";
    obj_ini.obj_design.str_content=str_content;

    switch(str_type.toLowerCase()){
      case "p":
          obj_ini.obj_design.str_content=str_content;
        break;
      case "h1":
          obj_ini.obj_design.str_content=str_content;
      break;
      case "li":
          obj_ini.obj_design.str_content=str_content;
      break;
      default:
    }

    obj_tag=this.fn_addPaletteItem(obj_ini);
    return obj_tag;
  }
  
  fn_getInsertContainer(obj_container, obj_localHome, int_idRecord){                  

    let bln_valid=this.fn_validateContainer(obj_container, int_idRecord);            

    if(!bln_valid){        
      return false;
    }
    return obj_container;
    
    /*
    if(!bln_valid){        
      if(!obj_container){        
        return false;
      }            
      obj_container=obj_container.fn_getParentComponent();//parent or false                
      if(!obj_container){        
        return false;
      }        
      if(obj_container==obj_localHome && obj_localHome.fn_getLocked()){//dont go past local lockled home
        return false;
      }
        //dont go up past localhome
      obj_container=this.fn_getInsertContainer(obj_container, obj_localHome, int_idRecord);
    }
    return obj_container;
    //*/
  }
  fn_setPaletteEnabled(obj_container){    

    let arr, obj_item;
    let str_type, str_type_container, bln_canInsert;

    let obj_dynamicContentHolder=this.fn_getComponent("ListPaletteDynamicContent");                        
    if(!obj_dynamicContentHolder){
      return;
    }
    
    let obj_component=obj_dynamicContentHolder;
    arr=obj_component.obj_design.arr_item;                                  
    for(let i=0;i<arr.length;i++){
        obj_item=obj_component.obj_design.arr_item[i];          
        //console.log("obj_item: " + obj_item);
        if(obj_item){            
          str_type=obj_item.obj_design.str_typeRecordTarget;
          if(!str_type){str_type="";}    
          str_type_container=obj_container.obj_design.str_type;
          bln_canInsert=this.fn_validateInsertContainer(str_type, obj_container);                                
          if(!bln_canInsert){            
            obj_item.fn_setDisabled();            
            //console.log("fn_setDisabled str_type: " + str_type);
          }
          else{
            obj_item.fn_setEnabled();
            //console.log("fn_setEnabled str_type: " + str_type);
          }
        }
    }                
  }  
  fn_validateInsertContainer(str_type, obj_container){
      
    let str_typeToInsert, str_type_container, bln_value, str_listIn;

    str_typeToInsert=str_type.toLowerCase();    
    str_type_container=obj_container.obj_design.str_type.toLowerCase();

    bln_value=false;        
    switch(str_type_container){                      
      case "eazygrid":                          
        str_listIn="eazygriditem,loginpanel";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;              
    break;        
      case "table":                          
        str_listIn="tablerow,tablebody,tablehead,tablefoot";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;        
      case "tablerow":                          
        str_listIn="tablecell,tableheader";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      case "tablefoot":                          
        str_listIn="tablerow";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      case "tablebody":                          
        str_listIn="tablerow";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      case "tablehead":                          
        str_listIn="tablerow";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      default:
        //set true to insert all else, other than the below list
        str_listIn="tablerow,tablecell,tableheader,tablehead,tablefoot,eazygriditem,loginpanel";
        if(!obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          //console.log(str_type_container + ": " + str_typeToInsert);
          bln_value=true;
        }                                
    }    
    
    switch(str_typeToInsert){                      
      case "loginpanel":           
        //bln_value=false;
        str_listIn="grid";
        if(!obj_shared.fn_inStr(","+obj_container.obj_domStyle.display+",", ","+str_listIn+",")){                        
          bln_value=true;
        }            
      break;                       
    }


    return bln_value;
  }  

  fn_removeId(obj_item){      
    
    console.log("manager palette fn_removeId");

    let bln_locked=obj_item.obj_design.bln_lockComponent;              
    bln_locked=obj_shared.fn_parseBool(bln_locked);
    if(bln_locked){        
      console.log("fn_removeId bln_locked");
      return;
    } 

    obj_item.obj_design.int_idRecord=0;      
    obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;              

    var arr_item=obj_item.obj_design.arr_item;
    console.log("arr_item: " +  arr_item.length);
    
    for(var i=0;i<arr_item.length;i++){            
        obj_item=arr_item[i];
        console.log("i: " +  i);
        console.log("int_idRecord: " +  obj_item.obj_design.int_idRecord);        
        this.fn_removeId(obj_item);
    }
  }
}//END CLS
//END TAG
//END component/xdesign1_managerpalette