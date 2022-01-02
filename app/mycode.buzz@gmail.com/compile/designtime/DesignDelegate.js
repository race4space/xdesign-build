class DesignDelegate{
    constructor(obj_delegator) {                          
        this.fn_initialize(obj_delegator);                        
        if(window.parent){
            obj_projectParent=window.parent.obj_project;//set reference to parent publish object from this iframe            
        }
    }    
    fn_initialize(obj_delegator){
        this.obj_delegator=obj_delegator;
        let obj_design=this.obj_delegator.obj_design;

        if(obj_design.bln_hiddenProjectPin===undefined){obj_design.bln_hiddenProjectPin=false;}                        
        if(obj_design.bln_projectPin===undefined){obj_design.bln_projectPin=false;}
        if(obj_design.bln_palettePin===undefined){obj_design.bln_palettePin=false;}                
        if(obj_design.bln_hiddenProjectPin===undefined){obj_design.bln_hiddenProjectPin=false;}
        if(obj_design.bln_toggleProjectPin===undefined){obj_design.bln_toggleProjectPin=false;}
        if(obj_design.bln_maintainId===undefined){obj_design.bln_maintainId=false;}
        if(obj_design.bln_registerAtProject===undefined){obj_design.bln_registerAtProject=false;}
        if(obj_design.bln_registerAtContainer===undefined){obj_design.bln_registerAtContainer=false;}
        if(obj_design.bln_themeType===undefined){obj_design.bln_themeType=false;}
        if(obj_design.bln_typeable===undefined){            
            let str_listIn="div,p,span,td,th";
            let bln_typeable=false;
            if(obj_shared.fn_inStr(","+obj_design.str_tag+",", ","+str_listIn+",")){bln_typeable=true;}
            if(obj_design.bln_typeable===undefined){obj_design.bln_typeable=bln_typeable;}                                 
        }
        if(!obj_design.str_locationID){obj_design.str_locationID="notset";}//undefined or empty string or false                        
        if(!obj_design.bln_createRelease){obj_design.bln_createRelease="false";}//reset any previou true settings        
        if(!obj_design.str_nameRelease){obj_design.str_nameRelease="notset";}//reset any previou true settings        
        
        if(obj_design.str_text==undefined){obj_design.str_text="notset";}//Menu Button Only                      
        //if(obj_design.str_nameEventClick==undefined){obj_design.str_nameEventClick="notset";}
        //if(obj_design.str_valueEventClick==undefined){obj_design.str_valueEventClick="notset";}
        if(obj_design.str_nameTheme==undefined){obj_design.str_nameTheme="notset";}       
        
        
        //this.fn_setClipBoardContent(false);

        //obj_delegator will be the button etc , ie the control which has been added        
    }      
    fn_addPaletteItem(obj_ini){//required  as is overidden by eazygrid etc                        
        let obj_delegator=this.obj_delegator;

        let obj_item;         
        obj_item=obj_delegator.fn_addItem(obj_ini);//ServerSideItem                                

        if(!obj_item){            
            console.log("obj_item is false, check dynamic content")
            return;
        }

        //*
        let bln_maintainId=obj_item.obj_design.bln_maintainId;                
        if(!bln_maintainId){                    
            obj_projectParent.fn_removeId(obj_item);
        }        
        obj_item.obj_design.bln_palettePin=false;        
        obj_item.obj_design.bln_projectPin=false;              
      

        //MAY NOT HAVE COMPLETE OBJECT INITIALIZATION , IF SERVER GRAB
        //DO NOT CALL SET PALETTE SELECTED HERE
        return obj_item;
    }
    
    fn_setup(){//is overriden by project instance 
        //lastStep                        
        //AFTER OBJECT INITIALIZATION
        this.fn_listenEventDesign();          
        //this.fn_setPaletteSelected();        
        //this.fn_setPaletteSelectedLocalHome();
        
        //PaletteSelected is first set in Palette fn_listPinnedComponent
    }    
    fn_listenEventDesign(){

        let obj_delegator=this.obj_delegator;
        //obj_delegator will be the button etc , ie the control which has been added
        
        //this refers to obj_delegator.obj_designDelegate
        let that=this;        

        obj_delegator.dom_obj.addEventListener('mouseenter', function(e){                        
            that.fn_designEventMouseenter();
        });
        obj_delegator.dom_obj.addEventListener('mouseleave', function(e){                        
            that.fn_designEventMouseleave();
        });                
        obj_delegator.dom_obj.addEventListener('click', function(e){                        
            that.fn_designEventClickCapture();
        }, true);
        obj_delegator.dom_obj.addEventListener('click', function(e){                        
            that.fn_designEventClickBubble();
        }, false);
        
        let obj_item;
        let arr=obj_delegator.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            obj_item=obj_delegator.obj_design.arr_item[i];  
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_listenEventDesign();
            }
        }        
    }

    

    
    fn_onPaletteItemClickCapture(){//event capture, overidden for base element             
    }
        
    fn_onPaletteItemClickBubble(){//event capture 
        
        //console.log("fn_onPaletteItemClickBubble");
        
        if(obj_projectParent.obj_palettSelected){            
            return;
            //select only first item
        }   
        //alert("fn_onPaletteItemClickBubble");

        ////this refers to obj_delegator.obj_designDelegate
        //console.log("fn_onPaletteItemClickBubble")        

        /*
        // A implmentation: set selected to local home, if unlocked set chlidren to editable        
        let obj_localHome=this.obj_delegator.fn_getLocalHome();        
        let bln_locked=obj_localHome.fn_getLocked();        
        if(!bln_locked){            
            obj_localHome.obj_design.int_modeExecute=obj_holder.int_modeEdit;
            obj_localHome.obj_designDelegate.fn_setChildrenModeExecute(obj_holder.int_modeEdit);//new change to also set children to editable                    
            this.fn_setPaletteSelectedLocalHome();
        }
        else{//local home is locked , lets select that            
            obj_localHome.obj_designDelegate.fn_setPaletteSelected();
        }
        //*/

        //*
        // B implmentation: simply set item that was clicked to selected
        this.fn_setPaletteSelected();
        //*/   
        
    }
    fn_setPaletteSelectedLocalHome(){

        //console.log("fn_setPaletteSelectedLocalHome");
        
        let obj_localHome;

        obj_localHome=this.obj_delegator.fn_getLocalHome();        

        let obj_delegator=this.obj_delegator;
        
        let obj_item=obj_projectParent.obj_palettSelectedLast;//we need to do this as the item clicked will run the event each time
        if(obj_item){                        
            if(obj_item.fn_isLocalHome()){
                obj_delegator=obj_item;
            }
        }
        
        obj_localHome=obj_delegator.fn_getNextLocalHome();        
        
        obj_localHome.obj_designDelegate.fn_setPaletteSelected();
    }
    
    
    fn_setChildrenModeExecute(int_modeExecute){          

        let obj_item, arr;
        arr=this.obj_delegator.obj_design.arr_item;        
        for(var i=0;i<arr.length;i++){
            obj_item=arr[i];           
            if(obj_item.fn_isLocalHome()){//dont affect other projects
                continue;
            }
            obj_item.obj_design.int_modeExecute=int_modeExecute;            
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_setChildrenModeExecute(int_modeExecute);
            }
        }
    }     
    fn_setPaletteSelected(bln_maintainMap){                  

        //console.log("design delgate fn_setPaletteSelected");
        let bln_debug=true;
        
        let obj_delegator=this.obj_delegator;          

        //if(bln_debug){obj_delegator.fn_debug("fn_setPaletteSelected");}        

        //this refers to obj_delegator.obj_designDelegate
        obj_delegator.fn_setLevelLimit();                              
        
        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}
        

        /* deprecated 2021-09-06
        //something to do with input subitem
        if(!bln_maintainMap && obj_delegator!==obj_project){
            if(obj_delegator.obj_holder.obj_levelLimit.bln_limitBottom){          
                let obj_container=obj_delegator.obj_holder.obj_container;
                obj_container.obj_holder.obj_subItem=obj_delegator;
                if(obj_container.obj_designDelegate){
                    if(bln_debug){console.log("bln_LimitBottom set SUBITEM selected");}                                                
                    obj_container.obj_designDelegate.fn_setPaletteSelected(false);//not quite sure what this is doing 
                }
                if(bln_debug){console.log("RETURN bln_LimitBottom");}                            
                return;      
            }        
        }
        //*/

        obj_delegator.obj_holder.bln_maintainMap=bln_maintainMap;        
        
        if(obj_project.obj_designDelegate){            
            obj_project.obj_designDelegate.fn_deSelectPaletteItems();
        }                       
        
        
        obj_projectParent.obj_palettSelected=obj_delegator;         
        obj_projectParent.obj_palettSelectedLast=obj_projectParent.obj_palettSelected;                  
        
        //if(bln_debug){obj_projectParent.obj_palettSelected.fn_debug("bubble obj_projectParent.obj_palettSelected");}        
        
        if(obj_delegator.obj_holder.obj_container){                        
            obj_delegator.obj_holder.obj_container.obj_holder.obj_lastItem=obj_delegator;            
        }    
        
        if(obj_delegator.obj_design.bln_dynamicPin){
            //obj_delegator.obj_design.int_modeExecute=obj_holder.int_modeReadOnly;
        }
        
        obj_projectParent.fn_onPaletteItemSelected();//update environment, property sheets etc        

        //console.log("aaaaa");
        
        
        /*
        //something to do with input subitem
        if(obj_delegator.obj_holder.obj_subItem){
            if(bln_debug){obj_projectParent.obj_palettSelected.fn_debug("fn_setPaletteSelected obj_subItem: fn_linkCompassItem");}        
            let obj_subItem=obj_delegator.obj_holder.obj_subItem;                        
            obj_projectParent.fn_linkCompassItem(obj_subItem);
            obj_delegator.obj_holder.obj_subItem=false;
        }
        //*/
        


    } 
    
    fn_deSelectPaletteItems(){        
        
        let obj_delegator=this.obj_delegator;

        if(!obj_projectParent.obj_palettSelected){                        
            return;//added 2021-09--12
        }
        //this refers to obj_delegator.obj_designDelegate
        this.fn_setPaletteDeSelected();        
        let arr=obj_delegator.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=obj_delegator.obj_design.arr_item[i];            
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_deSelectPaletteItems();
            }
        }
    } 
    
    fn_destructDesignComponent(){//cannot go to base object , as used by design process
        let obj_delegator=this.obj_delegator;
        obj_delegator.fn_removeAllContent();        
    }       
    fn_setPaletteDeSelected(){          

        //console.log("fn_setPaletteDeSelected");

        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteDeSelected");return;}
        
        obj_projectParent.fn_onPaletteItemDeSelected();//update environment        
        obj_projectParent.obj_palettSelected=false;
        
        //console.log("fn_setPaletteDeSelected: " + this.obj_design.str_type);             
        
    }        
    fn_designEventScroll(){        
    }    
    fn_designEventMouseenter(){
    }
    fn_designEventMouseleave(){            
    }
    
    fn_designEventClickCapture(){        
        //this refers to obj_delegator.obj_designDelegate        
        this.fn_onPaletteItemClickCapture();
    }
    fn_designEventClickBubble(){        
        //this refers to obj_delegator.obj_designDelegate
        this.fn_onPaletteItemClickBubble();
    }    
    fn_preparePublish(){

        let obj_delegator=this.obj_delegator;
        
        let arr, obj_item;

        if(!obj_delegator.fn_isElement()){
            return;
        }
        
        //let str_designMarker=obj_projectParent.obj_holder.str_prefix;
        //obj_delegator.dom_obj.removeAttribute(str_designMarker + "id");
        //obj_delegator.dom_obj.removeAttribute("idXDesign");
        
        arr=obj_delegator.obj_design.arr_item;
        
        for(let i=0;i<arr.length;i++){
            obj_item=obj_delegator.obj_design.arr_item[i];                                      
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_preparePublish();            
            }
        }
    }

    fn_viewHTML(){

        let obj_delegator=this.obj_delegator;

        //this refers to obj_delegator.obj_designDelegate
        this.fn_preparePublish();        
        obj_delegator.obj_holder.str_html=obj_delegator.dom_obj.outerHTML;
        alert(obj_delegator.obj_holder.str_html);

    } 

    

    
    fn_parseHTMLContent(str_content=""){                

        //this refers to the "real" target object
        let obj_delegator=this.obj_delegator;

        if(!obj_delegator.fn_isElement()){            
            obj_delegator.dom_obj.data=str_content;
            return;
        }

        obj_delegator.fn_removeAllContent();
        let dom_obj=document.createElement("div");
        
        dom_obj.innerHTML=str_content;   
        
        //console.log("str_content:" + str_content);
        
        var oCol = dom_obj.childNodes;
        for (var i = 0; i < oCol.length; i++) {

            let dom_child, attrib, str_name, str_value, str_type, str_tag, str_text, str_length;
            let obj_ini, obj_item;
            
            dom_child = oCol[i];    
            
            obj_ini=new Holder;                       

            str_text="";            

            switch(dom_child.nodeType){
                case 1://element node                    
                    str_type=dom_child.tagName.toLowerCase();                    
                    str_tag=str_type;                                                    
                    console.log("ELEMENTNODE");                    
                    
                break;
                case 3://3 for text node,                    
                    str_type="textnode";
                    str_tag="text";         
                    str_text=dom_child.data;                       
                    str_length=str_text.length;
                    console.log("textnode"); 
                    /*
            console.log("str_type:" + str_type);
            console.log("str_tag:" + str_tag);
            console.log("str_text:[" + str_text + "]");
            console.log("str_length:[" + str_length + "]");
            //obj_shared.fn_enumerateObject(obj_ini);            
            //*/                               
            
                if (str_text.match(/^\s*$/)){
                console.log("Blank Text Node");
                //continue;
                }
                break;                
                case 8://8 for comment node,
                    str_type="comment";
                    str_tag="<!--"
                    str_text=dom_child.data;                                        
                    console.log("comment node");                                                         
                break;                
                default:
                    //console.log("node Type: " + dom_child.nodeType);
                    str_type="tag";
                    str_tag="tag";
                    console.log("tag node");
                    //continue;
            }            

            obj_ini.obj_design.str_type=str_type;
            obj_ini.obj_design.str_tag=str_tag;
            obj_ini.obj_design.str_content=str_text;
            
            //obj_ini.obj_design.str_text="aaa";                
            obj_delegator.obj_designDelegate.fn_parseHTMLContentCreateStyle(dom_child, obj_ini.obj_domStyle);
                
            //*
            if(dom_child.attributes){
            for (var j = 0; j < dom_child.attributes.length; j++) {
                attrib = dom_child.attributes[j];                 
                str_name=attrib.name;                                
                if(str_name){
                    str_value=attrib.value;                
                    if(str_name=="style"){}
                    else{
                        
                        obj_ini.obj_domProperty[str_name]=str_value;            
                        //obj_ini.obj_domAttribute[str_name]=str_value;            
                        //console.log("attrib: " + str_name + ":" + str_value);
                    }
                }
            }
            }   
            //*/            

            /*
            console.log("str_type:" + str_type);
            console.log("str_tag:" + str_tag);
            console.log("str_text:" + str_text);
            //obj_shared.fn_enumerateObject(obj_ini);            
            //*/
            
            
            obj_item=obj_delegator.fn_addItem(obj_ini);//ServerSideItem  

            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_listenEventDesign(); 
            }
            
            if(obj_item.fn_isElement()){
                obj_item.obj_designDelegate.fn_parseHTMLContent(dom_child.innerHTML);
            }
        }
        dom_obj.remove();
        
    }             
    
    fn_parseHTMLContentCreateStyle(dom_obj, obj_domStyle){

        let obj_delegator=this.obj_delegator;

        if(!dom_obj){return;}
        if(!dom_obj.getAttribute){return;}

        let style=dom_obj.style;
        let str_style, str_name, str_value;
        let i, arr_parts, arr_subParts, str_part;        
        str_style=dom_obj.getAttribute("style");        
        
        if(!str_style){
            str_style="";            
        }
        //console.log("str_style: " + str_style);        
        if(!str_style.length){return;}
        arr_parts = str_style.split(";")        
        for (i=0;i<arr_parts.length;i++) {
            str_part=arr_parts[i];            
            if(str_part.length){
                arr_subParts = str_part.split(':');                            
                str_name=arr_subParts[0].trim();
                str_value=arr_subParts[1].trim();
                //console.log("style: " + str_name + ":" + str_value);
                obj_domStyle[str_name]=str_value;
                //console.log("style set: " + str_name + ":" + obj_domStyle[str_name]);
            }
        }
    }     

    fn_defaultNotSet(str_value){
        if(str_value===""){str_value="notset";}
        return str_value;
    }    
    
    fn_setDesignProperty(str_name, foo_value){  

        switch(str_name){                                                    
            case "str_classExtend":            
                this.obj_delegator.fn_setClassExtend(foo_value);                                                
                return; 
            case "str_classList":            
                this.obj_delegator.fn_setClassList(foo_value);                                                                
                return;                
            case "str_locationID":            
                this.obj_delegator.fn_setLocationID(foo_value);                                                
                return; 
            case "str_createdDate":            
                this.obj_delegator.fn_setCreatedDate(foo_value);                                                
                return; 
            case "str_modifiedDate":            
                this.obj_delegator.fn_setModifiedDate(foo_value);                                                
                return; 
            case "str_name":                
                this.obj_delegator.fn_setName(foo_value);                                
                return;
            case "str_nameRegistrator":                
                foo_value=this.fn_defaultNotSet(foo_value);                        
                break;            
            case "str_tag":
                this.obj_delegator.fn_setTag(foo_value, true);                                                
                return;  
            case "str_text":                
                this.obj_delegator.fn_setText(foo_value);
                return;
            case "str_type":                                 
                this.obj_delegator.fn_setType(foo_value);                                                
                return;              
        }

        let bln_valid=true;
        switch(str_name){                
            default:
                foo_value=obj_shared.fn_parseBool(foo_value);                               
        }

        if(bln_valid){           
            
            this.obj_delegator.fn_setDesignProperty(str_name, foo_value);
            //this.obj_delegator.obj_design[str_name]=foo_value;              
        }
        
        
    }

      
    //END DESIGN FUNCTIONS AND EVENTS
    
    
}//END CLS