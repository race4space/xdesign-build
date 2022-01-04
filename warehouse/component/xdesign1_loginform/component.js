
//XSTART component/xdesign1_loginform
  class xdesign1_loginform extends component{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);                
      
      
      this.fn_setType("xdesign1_loginform");      
      this.fn_setTag("xdesign1_loginform");            
      this.obj_design.bln_isGenericTag=true;
      // this.fn_extends("component");            
    }
    fn_onLoad(){
      super.fn_onLoad();
      
      this.dom_obj.addEventListener('submit', function(event){                                       
        //console.log("fn_onLoad");
          event.preventDefault(); 
          //return false;                                               
          obj_project.fn_XDesigner_startLogIn();
      });
    }
  }//END CLS              
  //END TAG
  //END component/xdesign1_loginform