class DesignDelegateeazygriditem extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){ 
      if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}     
      let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);      
        obj_projectParent.obj_lastGrid=obj_delegator.obj_holder.obj_container;//not part of eazyGrid      
      }        
    fn_addPaletteItem(obj_ini){//required                  
        let obj_delegator=this.obj_delegator;        
        if(obj_delegator.obj_holder.obj_container.obj_design.bln_eazyGrid){          
            switch(obj_ini.obj_design.str_type.toLowerCase()){
              case "eazygrid":                                            
              break;      
            }
          }          
          
        return super.fn_addPaletteItem(obj_ini);        
    }    
    fn_setDesignProperty(str_name, foo_value){
      super.fn_setDesignProperty(str_name, foo_value);      
      if(this.obj_delegator.obj_holder.obj_container){
        this.obj_delegator.obj_holder.obj_container.fn_applyFeatures();
      }
      
    }                            
    
}//END CLS