
//XSTART component/clipboard
class clipboard extends component{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("clipboard");      
    this.fn_setTag("clipboard");            
    this.obj_design.bln_isGenericTag=true;
    //this.fn_extends("abc");                
    this.fn_clear();

  }

  fn_set(obj_copy, obj_template){//required   
    if(!obj_copy){
        this.fn_clear();
        return;            
    }     

    let str_categoryList=obj_copy.obj_design.str_categoryList;       
    obj_copy.bln_removeId=true;     
    obj_project.fn_removeId(obj_copy);        
    obj_copy.obj_design.str_categoryList=str_categoryList;      

    this.bln_hasContent=true;        
    this.obj_item=obj_copy;        
    this.obj_template=obj_template;  
  }
  fn_clear(){//required           
      this.bln_hasContent=false;        
      this.obj_item=false;        
      this.obj_template=false;            
  }
  fn_get(){//required        
      return this.obj_item;
  }    
  fn_validateCopy(obj_item){        

    let bln_debug=false;      

    if(!obj_item){        
        return false;
    }

    //Item must be in editmode
    if((obj_item.obj_design.int_modeExecute!==obj_holder.int_modeEdit)){        
        return false;
    }    
        
    if(obj_item===obj_projectTarget){                        
        if(bln_debug){console.log("VALIDATE COPY: CANNOT MANIPULATE PROJECT INSTANCE")};
        return false;
    }      

    if(bln_debug){console.log("VALIDATE COPY: VALIDATED")};   
    return true;
  }

  fn_copy(obj_item){//required  
    
    if(!this.fn_validateCopy(obj_item)){return;}            
    let obj_copy=this.fn_getCopy(obj_item);        
    this.fn_set(obj_copy, obj_item);         
  }
  fn_getCopy(obj_item){//required        
      let obj_copy;
      let str_json=JSON.stringify(obj_item, this.fn_cloneReplacer());        
      //console.log("str_json: " + str_json);
      obj_copy=JSON.parse(str_json);
      obj_copy.obj_holder=new Holder;                              
      return obj_copy;
  }  

  fn_validatePaste(obj_selected){        

    let bln_debug=false;

    
      let obj_item=this.fn_get();                
      if(!obj_item){     
          if(bln_debug){console.log("VALIDATE PASTE: CLIPBOARD IS BLANK")};   
          return false;
      }        
              
      if(bln_debug){console.log("VALIDATE PASTE: GET CONTAINER")};   
    
      let obj_container=obj_project.fn_validateContainer(obj_selected, obj_item.obj_design.int_idRecord);                      
      if(!obj_container){
          if(bln_debug){console.log("VALIDATE PASTE: NO VALID CONTAINER")};   
          return false;
      }

      if(obj_container.obj_design.bln_dynamicPin){            
        if(bln_debug){console.log("VALIDATE PASTE: CANOT PASTE INTO DYNAMIC PIN")};   
          return false;
      }

      if(bln_debug){console.log("VALIDATE PASTE: VALIDATED")};   

      return obj_container;
  }  

  fn_paste(obj_container){//required                
      
      //this refers to obj_delegator.obj_designDelegate                
      let obj_item;
      obj_item=this.fn_get();        
      if(!obj_item){
          console.log("CLIPBOARD PASTE ERROR: CLIPBOARD IS BLANK");
          return;
      }        

      //why is it necessary to destroy the orginal copy ?
      //this.fn_copy(obj_item);
      //obj_item=this.fn_get();                        
      
      if(!obj_container){
          console.log("CLIPBOARD PASTE ERROR: CONTAINER IS FALSE");
          return false;
      }      

      //*
      let obj_template=this.obj_template;
      this.fn_clear();      
      this.fn_copy(obj_template);//not sure why we cannot re-use the template   
      //*/
      

      
      let obj_copy=obj_container.fn_addItem(obj_item);//ClientSideItem            
      return obj_copy;        
  }

  fn_validateInsert(obj_insertNextTo){        

    let bln_debug=false;

    let obj_item=this.fn_get();    

    if(!obj_item){     
        if(bln_debug){console.log("VALIDATE INSERT: CLIPBOARD IS BLANK")};   
        return false;
    }  

    //Item must be in editmode
    if((obj_item.obj_design.int_modeExecute!==obj_holder.int_modeEdit)){        
        return false;
    }


    if(obj_item.obj_design.bln_dynamicPin){
      if(bln_debug){console.log("VALIDATE INSERT: CANNOT INSERT DYNMAIC PIN")};
      return false;
    }
    
    //console.log(obj_item);

    if(obj_insertNextTo===obj_projectTarget){                                
        if(bln_debug){console.log("VALIDATE INSERT: CANNOT INSERT BEFORE PROJECT INSTANCE")};
        return false;
    }                    

    if(bln_debug){console.log("VALIDATE INSERT: GET CONTAINER")};   


    let obj_container=obj_insertNextTo.fn_getParentComponent();
    if(!obj_container){
        if(bln_debug){console.log("VALIDATE INSERT: NO VALID CONTAINER PARENT IS FALSE")};   
        return false;
    }

    obj_container=obj_project.fn_validateContainer(obj_container, obj_item.obj_design.int_idRecord);                          
    if(!obj_container){
        if(bln_debug){console.log("VALIDATE INSERT: NO VALID CONTAINER")};   
        return false;
    }

    if(obj_container.obj_design.bln_dynamicPin){            
        return false;
    }
    
    if(bln_debug){console.log("VALIDATE INSERT: VALIDATED")};   

    return obj_insertNextTo;
    }

    fn_insert(obj_insertNextTo){//required                      
        
        //this refers to obj_delegator.obj_designDelegate                
        let obj_item;
        obj_item=this.fn_get();        
        if(!obj_item){
            console.log("CLIPBOARD INSERT ERROR: CLIPBOARD IS BLANK");
            return;
        }   
        
        let obj_container=obj_insertNextTo.obj_holder.obj_container;
        if(!obj_container){
            console.log("CLIPBOARD INSERT ERROR: CONTAINER IS FALSE");
            return false;
        }     

        this.fn_copy(obj_item);
        obj_item=this.fn_get();                        

        this.fn_clear();
        
        obj_container.obj_holder.obj_insertNextTo=obj_insertNextTo;
        let obj_copy=obj_container.fn_addItem(obj_item);//ClientSideItem
        
        return obj_copy;        
    }

  fn_validateDelete(obj_selected){

      let bln_debug=false;      

      if(!obj_selected){        
          return false;
      }

      //Item must be in editmode
      if((obj_selected.obj_design.int_modeExecute!==obj_holder.int_modeEdit)){        
        return false;
    }

      if(obj_selected===obj_projectTarget){            
          if(bln_debug){console.log("VALIDATE DELETE: CANNOT DELETE PROJECT INSTANCE")};
          return false;
      }       
      
      if(bln_debug){console.log("VALIDATE DELETE: VALIDATED")};   

      return true;
  }    
  fn_cloneReplacer(){        
      //overide serialize object
  const seen = new WeakSet();
  return (key, value) => {  
      
      switch(key){        
          case "obj_ini":
              return;        
          case "obj_designDelegate":
              return;        
          case "int_modeExecute":
              return;        
            case "__quill":
            return;
          case "xxint_idRecord":
              //return;        
              break;
          case "str_idXDesign":        
              if(value.indexOf("myId")===0){//if present
                  //return;
              }        
          break;
          }

      if (typeof value === "object" && value !== null) {

            if(!value.constructor){return;}
          if(value.constructor.name==="Holder"){//Dont serialize this object (or the objects attached to it)
              //obj_shared.fn_enumerateObject(value, "Holder");
              return;
          }
          
          if (seen.has(value)) {
              //return "circular";
              return;                    
          }

          seen.add(value);
      }
      return value;
      };
  }  
  
}//END CLS
        //END TAG
        //END component/clipboard
  //START CLIPBOARD FUNCTION
        