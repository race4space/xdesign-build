class tablecell extends component {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.fn_setType("tablecell");      
      this.fn_setTag("td", true);                  

      //START INITIALIZE DOM        
      //if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="1px solid black";}                
      //END INITIALIZE DOM        
      
      //START INITIALIZE STYLE        
      //if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}                   
    
      this.fn_setIsContainer(true);      
      //END INITIALIZE STYLE 
    }     
    xfn_applyTheme(){        
      
      super.fn_applyTheme();      
      this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          
      this.fn_setStyleProperty("color", this.obj_theme.highlightColor);          
      this.fn_setStyleProperty("border", this.obj_theme.cellBorder);                
      this.fn_setStyleProperty("padding", this.obj_theme.cellPadding);                
  } 
  fn_locateItem(str_idXDesign, str_type){
    let arr, obj_item;
    arr=this.obj_design.arr_item;
    for(let i=0;i<arr.length;i++){
        obj_item=arr[i];     
        
        if(obj_item.fn_getType()===str_type){
          if(obj_item.obj_design.str_idXDesign==str_idXDesign){
            return obj_item;
          }
          if(obj_item.obj_design.str_linkId==str_idXDesign){
            return obj_item;
          }
        }
    }
    return false;
  }   
  
}//END CLS
//END tablecell
