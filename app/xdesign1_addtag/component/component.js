
            //XSTART component/xdesign1_addtag
              class xdesign1_addtag extends inputandbutton{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_addtag");      
                  this.fn_setTag("xdesign1_addtag");            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("inputandbutton");   

                  this.obj_design.str_name="xdesign1_addtag";      
                  this.obj_design.str_text="Tag";   
                }

                fn_bootChildren(){//only in boot/pallteItem phase

                  let obj_ini, obj_input;
                  let obj_row, obj_cell, obj_container;
          
                  obj_container=this;
                  
          
                  //ADD TEXT INPUT
                  obj_ini=new Holder;
                  obj_ini.obj_design.str_type="input"; 
                  obj_ini.obj_design.str_name="xdesign1_addtaginput";                  
                  obj_ini.obj_domProperty.value="";                                           
                  obj_ini.obj_design.str_nameRegistrator=this.obj_design.str_nameRegistrator;                                          
                  obj_ini.obj_domStyle.marginRight="3px";                                          
                  obj_input=obj_container.fn_addItem(obj_ini);//BootItem                
                  //END TEXT INPUT        
          
                  //ADD BUTTON TO VALUE CELL
                  obj_ini=new Holder;
                  obj_ini.obj_design.str_type="xdesign1_addtagbutton";                
                  obj_ini.obj_design.str_themeType="button";                
                  obj_ini.obj_design.str_text=this.obj_design.str_text;                  
                  obj_ini.obj_design.str_linkId=obj_input.obj_design.str_idXDesign;                                      
                  obj_container.fn_addItem(obj_ini);//BootItem                      
                  //ADD BUTTON TO VALUE CELL    
              }

                fn_onClick(){                  
                  
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_addtag