class DesignDelegateProjectInstance extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor          
        
        
    }            
    fn_initialize(obj_delegator){
        super.fn_initialize(obj_delegator);        
        
        if(this.obj_delegator.obj_design.bln_lockComponent==undefined){this.obj_delegator.obj_design.bln_lockComponent=false;}        
        if(this.obj_delegator.obj_design.bln_isLocalHome==undefined){this.obj_delegator.obj_design.bln_isLocalHome=true;}                                
    }      
    fn_onPaletteItemClickCapture(){//event capture        
        //obj_projectParent.obj_palettSelectedLast=obj_projectParent.obj_palettSelected;        
        //console.log("capture obj_projectParent.obj_palettSelectedLast: " + obj_projectParent.obj_palettSelectedLast);

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();//deselect all children starting from base
    }
    fn_destructDesignComponent(){

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();
        alert("should not be occurring ");        
        //should be handled by iframe reload
    } 
    fn_setup(){
        super.fn_setup();                
        if(window.parent){            
            window.parent.obj_project.fn_projectTarget_onLoad();//notify parent design component 
        }
    } 


    
    
}//END CLS