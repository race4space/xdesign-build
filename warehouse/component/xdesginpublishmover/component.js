
            //XSTART component/xdesginpublishmover
              class xdesginpublishmover extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesginpublishmover");      
                  this.fn_setTag("xdesginpublishmover");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                }

                fn_onRegisterProjectItem(obj_item){
                  super.fn_onRegisterProjectItem(obj_item);

                }

                fn_runAction(str_action,  obj_ini){      
                  let obj_serverManager=this.obj_holder.obj_servermanager;              
                  if(!obj_ini){obj_ini=new Object;}
                  obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;      
                  obj_ini.str_action=str_action;
                  obj_serverManager.fn_runAction(obj_ini);          
                }
                

                fn_onClick(){                        
                  this.fn_runAction("XDesigner_move");      
                }
              }//END CLS
              //END TAG
              //END component/xdesginpublishmover