
      //XSTART component/xdesign1_managercomponent
        class xdesign1_managercomponent extends xdesign1_managermenu{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managercomponent");      
            this.fn_setTag("xdesign1_managercomponent");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("xdesign1_managermenu");            
          }
          fn_onStateChange(){
            if(!super.fn_onStateChange()){return;} 
            if(!obj_projectTarget){return;}                  

            let bln_value=true;
            if(!obj_project.LocationMatchInstance){bln_value=false;}                 
            this.obj_holder.obj_container.fn_setEnabled(bln_value);                    

            this.fn_createTextEditor();      
          } 
          fn_onPaletteItemSelected(){    
            
            //console.log("fn_onPaletteItemSelected");
            
            
            let str_text;       
            let obj_selected=obj_project.obj_palettSelected;            
            
            if(obj_selected!==obj_projectTarget){              
              this.obj_holder.obj_container.fn_setDisabled();                    
              return;
            }                   

            let bln_value=true;
            if(!obj_project.LocationMatchInstance){bln_value=false;}                 
            this.obj_holder.obj_container.fn_setEnabled(bln_value);                    
            
            
            let str_componentCode=obj_selected.obj_holder.str_componentCode;                  
            if(!str_componentCode){
              this.fn_openComponentCode();
              return;
            }
      
            this.fn_displayComponentCode();
          }    
      
          fn_openComponentCode(){

            //console.log("fn_openComponentCode");
      
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");                  
            let obj_ini=new Object;
            obj_ini.ObjectInstance=obj_projectTarget;         
            obj_ini.str_actionCallback="fn_onOpenComponentCode";            
            obj_ini.str_idAJAXNotifier=obj_project.obj_design.str_idXDesign;            
            obj_serverManager.fn_openComponentCode(obj_ini);
          }
      
          fn_onOpenComponentCode(obj_post){    

            obj_project.fn_setLocationMatchComponentCode(obj_post);
            
            let str_RecordType=obj_post.RecordType;            
            let str_RecordExtend=obj_post.RecordExtend;
            let str_RecordExtendComment="";
      
            
            if(!str_RecordExtend || str_RecordExtend==="notset" || str_RecordType==="component"){
              str_RecordExtend="component";
              str_RecordExtendComment="//";
            }
            
      
            let str_componentCodeDefault=`
            //XSTART component/#RecordType
              class #RecordType extends #RecordExtend{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("#RecordType");      
                  this.fn_setTag("#RecordType");            
                  this.obj_design.bln_isGenericTag=true;
                  #str_RecordExtendComment this.fn_extends("#RecordExtend");            
                }
              }//END CLS
              //END TAG
              //END component/#RecordType`;        
              
              str_componentCodeDefault=str_componentCodeDefault.replace(/#RecordType/gi, str_RecordType.toLowerCase());               
              str_componentCodeDefault=str_componentCodeDefault.replace(/#RecordExtend/gi, str_RecordExtend.toLowerCase());           
              str_componentCodeDefault=str_componentCodeDefault.replace(/#str_RecordExtendComment/gi, str_RecordExtendComment.toLowerCase());           
              
            
              let str_componentCode=obj_post.ComponentCode;                  
              if(!str_componentCode){          
                str_componentCode=str_componentCodeDefault;
              }   
              
            obj_projectTarget.obj_holder.str_componentCode=str_componentCode;       
            this.fn_displayComponentCode();
          }
          fn_displayComponentCode(){    
            
            //console.log("fn_displayComponentCode");
      
            let obj_ini;         
            let str_content; 
            let obj_selected=obj_projectTarget;
            str_content=obj_selected.obj_holder.str_componentCode;      

            let obj_texteditor=this.fn_getComponent("xdesign1_componenttexteditor");
      
            if(!obj_texteditor){                        
              //yikes add text editr
            }      
      
            let bln_useHTML=true;
            obj_texteditor.obj_design.bln_useHTML=bln_useHTML;
            obj_texteditor.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                                                                      
            obj_texteditor.obj_design.obj_linkItem=obj_selected;
      
            obj_texteditor.fn_clearText();
      
            if(str_content){      
              obj_texteditor.fn_putText(str_content);                
            }      
            obj_texteditor.fn_setDisabledEditor();
          }
          
          fn_linkTextEditorOnChange(){}    
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          } 
          fn_createTextEditor(){
      
            let obj_item;
            let obj_dynamicContentHolder=this.fn_getComponent("ComposerDynamicContent");            
            obj_dynamicContentHolder.fn_prepare();  
      
            let obj_ini=new Holder;    
            obj_ini.obj_design.bln_showToolbar=false;             
            obj_ini.obj_design.str_name="xdesign1_componenttexteditor";             
            obj_ini.obj_design.str_type="texteditor";                         
            obj_ini.obj_design.bln_showToolbar=false;                                
            obj_ini.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "xdesign1_managerComponent_TextEditorOnChange";
            obj_ini.obj_design.str_valueEventChange="fn_linkTextEditorOnChange";                              
            obj_ini.obj_domStyle.height="300px";                            
            obj_ini.obj_domStyle.width="100%";
            obj_ini.obj_domStyle.width="100%";                                  
            obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
            this.fn_register(obj_item);      
      
          }   
        }//END CLS
        //END TAG
        //END component/xdesign1_managercomponent