class DesignDelegateeazygrid extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){      
        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}
        let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);              
        obj_projectParent.obj_lastGrid=obj_delegator;      
    }    
    fn_cutPaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_cutPaletteItem")
        super.fn_cutPaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();        
      }
      fn_deletePaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_deletePaletteItem")
        super.fn_deletePaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();        
      }

    
}//END CLS