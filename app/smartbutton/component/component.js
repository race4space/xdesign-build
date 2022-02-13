
//XSTART component/smartbutton
class smartbutton extends recordset{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("smartbutton");      
    this.fn_setTag("smartbutton");            
    this.obj_design.bln_isGenericTag=true;
    this.fn_extends("menubutton");            
  }
  fn_bootChildren(){
    let obj_ini;
    obj_ini=new Holder;                                                                           
    obj_ini.obj_design.str_type="menubutton";                                       
    this.obj_holder.obj_recordset=this.fn_addItem(obj_ini);//BootItem     
  }
  fn_onload(){
    console.log("this.obj_holder.obj_recordset: " + this.obj_holder.obj_recordset);

  }
  fn_open(){
    let obj_container=this.fn_getParentComponent();        
    let str_method="fn_open";        
    if(obj_container && obj_container[str_method]){
        obj_container[str_method]();
    }      
  }
  fn_close(){
    let obj_container=this.fn_getParentComponent();        
    let str_method="fn_close";        
    if(obj_container && obj_container[str_method]){
        obj_container[str_method]();
    }             
  }
}//END CLS
//END TAG
//END component/smartbutton