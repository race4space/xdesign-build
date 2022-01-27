
            //XSTART component/loginpanelform
              class loginpanelform extends form{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("loginpanelform");      
                  this.fn_setTag("loginpanelform");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("form");            
                }
                fn_onLoad(){
                  super.fn_onLoad();
                  
                  let that=this;
                  this.dom_obj.addEventListener('submit', function(event){                                       
                    //console.log("fn_onLoad");
                      event.preventDefault(); 
                      //return false;                                               
                      
                      let obj_notify=that.obj_holder.obj_regisratorProject;                      
                      if(obj_notify){
                        obj_notify.fn_startAuthorize();      
                      }                      
                      
                  });
                }
              }//END CLS
              //END TAG
              //END component/loginpanelform