
      //XSTART component/xdesign1_managermessenger
        class xdesign1_managermessenger extends xdesign1_managermenu{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managermessenger");      
            this.fn_setTag("xdesign1_managermessenger");                        
            this.fn_extends("xdesign1_managermenu");
          }
          fn_onStateChange(){
            
            if(!super.fn_onStateChange()){return;}      
            
          } 

          fn_onPaletteItemSelected(){    //occurs when we click on an item for example
            //This funciton will simply display the inner hTML opf the selected object
            //If the content changes it will fire up the textarea onchange event fn_linkPaletteTextEditChange and the new content will be parsed using fn_parseHTMLContent
      
            
            let str_text;       
            let obj_selected=obj_project.obj_palettSelected;            
      
            if(obj_selected.obj_design.int_modeExecute!==obj_holder.int_modeEdit){
              this.fn_close();                                    
              return;
            }
            
            str_text=obj_selected.obj_design.str_text;                 

            let obj_texteditor, obj_ini;
            let bln_useHTML, bln_showToolbar;
            
            /*
            obj_texteditor=this.fn_getComponent("xdesign1_messengertexteditor");
            if(!obj_texteditor){                        
              //yikes add text editr
              alert("text editor is not an object");
            } 
            //*/     
            
            
            

            //obj_texteditor.obj_design.bln_useHTML=bln_useHTML;            
            //obj_texteditor.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                                                                      
            //obj_texteditor.obj_design.obj_linkItem=obj_selected;   
            
            this.fn_createTextEditor();  
            obj_texteditor=this.fn_getComponent("xdesign1_messengertexteditor");    
            if(!obj_texteditor){
              return;
            }
            /*
            this.fn_removeAllItems();        
            obj_ini=new Holder;        
            obj_ini.obj_design.bln_useHTML=bln_useHTML;                     
            obj_ini.obj_design.bln_showToolbar=bln_showToolbar;                     
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                                                                      
            obj_ini.obj_design.obj_linkItem=obj_selected;   
            obj_ini.obj_design.str_type="texteditor";                              
            obj_texteditor=this.fn_addItem(obj_ini);//BootItem                
            //*/
            
            obj_texteditor.fn_clearText();
            
            if(str_text){        
              obj_texteditor.fn_putText(str_text);        
            }
            let obj_localHome=obj_selected.fn_getLocalHome();          
            
      
            let bln_locked=false;
            bln_locked=obj_localHome.fn_getLocked();                  

            /*
            console.clear();
            console.log("bln_locked localhome: " + bln_locked);
            //*/
      
            if(obj_selected.obj_design.arr_item.length){
              //console.log("bln_locked: arr item length ");
              bln_locked=true;  
            }
            if(!obj_selected.fn_getIsContainer()){
              //console.log("bln_locked: not a container ");
              bln_locked=true;  
            }
            
            if(obj_selected.obj_design.str_type==="button"){
              //console.log("un locked due to button");
              bln_locked=false;  
            }
            if(bln_locked){
              obj_texteditor.fn_setDisabled();
              this.obj_holder.obj_container.fn_setDisabled();
            }
            else{              
              obj_texteditor.fn_setEnabled();              
              this.obj_holder.obj_container.fn_setEnabled();
            } 
            
            
            if(!obj_selected.fn_getTypeable()){           
              obj_texteditor.fn_setDisabled();              
              this.fn_close();   
            }

          }    
      
          
          fn_linkTextEditChange(){    //occurs when the text changes in the text editr                          
            let obj_itemEvent, obj_item;      
            obj_itemEvent=obj_project.obj_projectEvent;                        
            let str_text=obj_itemEvent.fn_getText();                      
            obj_item=obj_itemEvent.obj_design.obj_linkItem;      
            obj_item.obj_design.str_content=str_text;       
            obj_item.obj_design.str_text=str_text;      
            obj_item.fn_setHTMLContent();            
            //obj_project.fn_onPaletteItemSelected()
          }   
          fn_getDisabledTextEditor(){  

          }
          fn_createTextEditor(){  

            
            let obj_item;
            let obj_dynamicContentHolder=this.fn_getComponent("MessengerDynamicContent");            
            if(!obj_dynamicContentHolder){
              return;
            }
            obj_dynamicContentHolder.fn_prepare();  

            let obj_selected=obj_project.obj_palettSelected;            
            //console.log("obj_selected: " + obj_selected);

            let bln_useHTML, bln_showToolbar, bln_disabled;
            bln_useHTML=true;
            bln_showToolbar=true;
            bln_disabled=false;                       
            switch(obj_selected.obj_design.str_tag){
              case "input":
              case "button":
              bln_useHTML=false;        
              break;              
            } 
            
            if(!obj_selected.fn_getTypeable()){              
              bln_useHTML=false;
              bln_showToolbar=false;
              bln_disabled=true;              
            }         
            

            let obj_ini=new Holder;    
            obj_ini.obj_design.str_name="xdesign1_messengertexteditor";              
            obj_ini.obj_design.str_type="texteditor";                         
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                                                                      
            obj_ini.obj_design.obj_linkItem=obj_selected;   
            obj_ini.obj_design.bln_useHTML=bln_useHTML;                                
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_ini.obj_design.bln_showToolbar=bln_showToolbar;                                
            obj_ini.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPaletteTextEditOnChange";            
            obj_ini.obj_design.str_valueEventChange="fn_linkTextEditChange";                  
            obj_ini.obj_domStyle.height="300px";                            
            obj_ini.obj_domStyle.width="100%";
            obj_ini.obj_domStyle.width="100%";                                            
            obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
            /*
            if(bln_disabled){              
              obj_item.fn_setDisabled(true);
            }else{              
              obj_item.fn_setEnabled(true);
            }
            //*/
            this.fn_register(obj_item);      
          }        
          
      
        }//END CLS
        //END TAG
        //END component/xdesign1_managermessenger