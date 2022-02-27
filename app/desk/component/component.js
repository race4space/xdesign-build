
            //XSTART component/desk
              class desk extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("desk");      
                  this.fn_setTag("desk");            
                  this.fn_requires("button");            
                  this.fn_requires("programiconbutton");                              
                  this.fn_requires("grid");                              
                  this.fn_requires("deskgrid");                              
                  this.fn_requires("loginbutton");                              
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                  this.obj_holder.bln_debugServer=false;
                }
                fn_onLoad(){ //design project on load
                  console.log("ON LOAD");
                  super.fn_onLoad();                        
                  this.fn_runAction("GetListProgram", {});            
                }  
                fn_runAction(str_action,  obj_ini){         

                  let obj_serverManager=this.fn_getComponent("DeskServerManager");     
                  console.log("obj_serverManager: " + obj_serverManager);
                  if(!obj_serverManager){return;}     
                  
                  if(!obj_ini){obj_ini=new Object;}
                  obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;      
                  obj_ini.str_action=str_action;
                  
                  obj_serverManager.fn_runAction(obj_ini);          
                }
                GetListProgram(obj_post){                
                  
                    let obj_dynamicContentHolder=this.fn_getComponent("ListProgramDynamicContent");                        
                    //console.log("GetListProgram: " + obj_dynamicContentHolder);
                    if(!obj_dynamicContentHolder){
                      return;
                    }
                    obj_dynamicContentHolder.fn_prepare();                  
                  
                    
                    let arr_row=obj_post.RowData;    

                    let obj_row, int_idRecord, str_nameRecord, str_typeRecord;
                    let obj_container, obj_ini, obj_item, obj_grid, obj_loginbutton;
                    obj_ini=new Holder;                              

                    obj_ini.obj_design.str_type="block"; 
                    obj_ini.obj_domStyle.display="flex"; 
                    obj_ini.obj_domStyle.height="500px"; 
                    obj_ini.obj_domStyle.width="480px";                     
                    obj_ini.obj_domStyle.flexFlow="row wrap"; 
                    //obj_container=obj_dynamicContentHolder.fn_addItem(obj_ini);

                    obj_container=obj_dynamicContentHolder;
                   
                    /*
                   obj_ini.obj_domStyle.display="grid";                      
                   obj_ini.obj_domStyle.gridGap="10px";                      
                   
                   obj_ini.obj_domStyle.gridTemplateColumns="1fr";
                   obj_ini.obj_domStyle.gridAutoColumns="auto";
                   obj_ini.obj_domStyle.gridAutoFlow="row";                      
                   obj_ini.obj_design.str_type="deskgrid";                                                                           
                    //*/

                      //obj_ini.obj_design.str_type="deskgrid";                                                                                                                       
                      //obj_ini.obj_design.str_type="panel"; 
                      //obj_grid=obj_dynamicContentHolder.fn_addItem(obj_ini);

                      /*
                      obj_ini=new Holder;                              
                      obj_ini.obj_design.str_type="loginbutton";                                                                                                                       
                      obj_ini.obj_design.filterSVG="invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)";                        
                      obj_ini.obj_domStyle.width="100px";                        
                      obj_ini.obj_domStyle.height="100px";                        
                      obj_ini.obj_domStyle.alignSelf="center";                        
                      obj_ini.obj_domStyle.marginLeft="auto";                        
                      obj_ini.obj_domStyle.marginRight="30px";                        
                      //obj_loginbutton=obj_grid.fn_addItem(obj_ini);
                      //*/

                      
                      

                    for(var i=0;i<arr_row.length;i++){                      
                      obj_row=arr_row[i];
                      if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object

                      int_idRecord=obj_row.id;
                      //str_nameRecord=obj_row.InstanceName;
                      //str_typeRecord=obj_row.InstanceType;
        
                      
                      //*                      
                      obj_ini=new Holder;                              
                      obj_ini.obj_design.str_subdomain=obj_row.Subdomain;
                      obj_ini.obj_design.str_name=obj_row.InstanceName;
                      //console.log("obj_row.InstanceName: " + obj_row.InstanceName);
                      obj_ini.obj_design.str_text=obj_row.Subdomain;
                      obj_ini.obj_design.str_type="programiconbutton";
                      obj_ini.obj_design.int_idRecordTarget=int_idRecord;                                                    
                      obj_item=obj_container.fn_addItem(obj_ini);
                      
                      
                    }

                }
                /////////////////////        
                //START Parent XDesginInterface LoginPanel Template 
                fn_onUnAuthorizeUserStatus(obj_post){
                  //console.log("AAA PROJECT COMPONENT fn_onUnAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
                  let obj_item;  
                  obj_item=this;
                  if(obj_item){        
                    obj_item.fn_setDisplay(false);
                  }              
                  obj_item=this.fn_getComponent("maingrid"); 
                  if(obj_item){              
                    obj_item.fn_setDisplay(false);
                  }          
                  obj_item=this.fn_getComponent("loginPanel");     
                  if(obj_item){                
                    obj_item.fn_showFormAuthorize();
                  }     
                  obj_item=this;
                  if(obj_item){        
                    obj_item.fn_setDisplay(true);
                  }          
                }  
                fn_onAuthorizeUserStatus(obj_post){
                  //console.log("BBB PROJECT COMPONENT  fn_onAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
                  let obj_item; 
                  obj_item=this;
                  if(obj_item){        
                    obj_item.fn_setDisplay(false);
                  }          
                  obj_item=this.fn_getComponent("maingrid"); 
                  if(obj_item){              
                    obj_item.fn_setDisplay("grid");
                  } 
                  obj_item=this.fn_getComponent("loginPanel");     
                  if(obj_item){                
                    obj_item.fn_hideFormAuthorize();
                  }     
                  obj_item=this;
                  if(obj_item){        
                    obj_item.fn_setDisplay(true);
                  }   
                }  
                /////////////////////       
                fn_endAuthorize(){//project external button will/call this funciton 
                  let obj_item=this.fn_getComponent("loginPanel");
                  if(obj_item){obj_item.fn_endAuthorize();}      
                }   
                fn_checkAuthorize(){//project onload call this function to update login status
                  let obj_item=this.fn_getComponent("loginPanel");
                  if(obj_item){obj_item.fn_checkAuthorize();}      
                }    
                fn_onLogIn(){//project can welcome onlogin, run action
                  //welcome etc
                  this.fn_runAction("GetListProgram", {});            
                }                 
                fn_onLogout(){//project can goodbye onlogout
                  //good bye etc
                }   
                //END Parent XDesginInterface LoginPanel Template 
                /////////////////////        
              }//END CLS
              //END TAG
              //END component/desk