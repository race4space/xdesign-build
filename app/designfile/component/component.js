class designfile extends AJAX {
    constructor(obj_ini) {        
      super(obj_ini); // call the super class constructor                    
    }    
    fn_initialize(obj_ini){
        
        super.fn_initialize(obj_ini);

        //START INITIALIZE DESIGN            
        this.fn_setType("designfile");      
        this.fn_setTag("designfile", true);                                                                          
        
        //END INITIALIZE DESIGN      
        //START INITIALIZE STYLE                    
        //END INITIALIZE STYLE  
    }  
    /////////////////////                   
    
    /////////////////////            
    
    fn_runSave(obj_instance){                
        
        this.fn_save({obj_instance:obj_instance})
    }
    fn_runDelete(obj_instance){        
        this.fn_delete({obj_instance:obj_instance})
    }
    fn_runPublish(obj_instance){        
        this.fn_publish({obj_instance:obj_instance})
    }
    fn_runAction(obj_ini){    
        if(!obj_ini){return;}        
        let obj_post=this.fn_formatPost(obj_ini);                                       
        this.fn_putPost(obj_post);
    }
    
    fn_saveComponent(obj_iniSave){        

        //MARK INSTANCE
        let obj_ini;
        let bln_debug=false;
        let obj_instance=obj_iniSave.ObjectInstance;                
        
        obj_instance.obj_holder.bln_markSave=true;

        if(bln_debug){obj_instance.fn_debug("ENTER fn_saveComponent");}

        let arr, obj_item, bln_allSaved;
        arr=obj_instance.obj_design.arr_item;        
        //ARE THE CHILDREN SAVED
        bln_allSaved=true;
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];
            if(obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                if(bln_debug){obj_item.fn_debug("CHILD NOT SAVED");}
                obj_ini=new Object;
                obj_ini.ObjectInstance=obj_item;                
                this.fn_saveComponent(obj_ini);
                bln_allSaved=false;                
                return;
            }
        }
        /*
        if(!bln_allSaved){
            if(bln_debug){obj_instance.fn_debug("bln_allSaved is false, return");}
            return;
        }
        //*/
        
        obj_instance.obj_holder.bln_markSave=false;

        //SAVE                
        if(parseInt(obj_instance.obj_design.int_modeExecute)===obj_holder.int_modeEdit){        
            if(bln_debug){obj_instance.fn_debug("ALL CHILD SAVED, I AM EDITABLE");}            
            obj_ini=new Object;
            obj_ini.obj_instance=obj_instance;
            obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;
            obj_ini.str_actionCallback="fn_saveComponent";                        
            this.fn_save(obj_ini);            
            obj_instance.obj_design.int_modeExecute=obj_holder.int_modeReadOnly;
            if(bln_debug){obj_instance.fn_debug("I AM NOT EDITABLE");}                        
        }

        //*
        else{            
            //if(bln_debug){obj_instance.fn_debug("ALL CHILD SAVED, I AM NON EDITABLE");}                
            //IF PARENT IS MARKED, TELL THEM                
            let obj_parent=obj_instance.fn_getParentComponent();                                                                    
            if(obj_parent && obj_parent.obj_holder.bln_markSave){                                                
                    if(bln_debug){obj_parent.fn_debug("PARENT MARKSAVE IS TRUE, CALL PARENT");}                                    
                    obj_ini=new Object;
                    obj_ini.ObjectInstance=obj_parent;                                
                    this.fn_saveComponent(obj_ini);                                        
            }
            else{
                if(bln_debug){
                    if(!obj_parent){                        
                        if(bln_debug){obj_instance.fn_debug("CORRECT PARENT IS FALSE");}                                        
                    }
                    else{                        
                        if(bln_debug){obj_instance.fn_debug("ERROR PARENT IS TRUE");}                                        
                        if(obj_parent.obj_holder.bln_markSave){
                            if(bln_debug){obj_instance.fn_debug("MARKSSAVE IS TRUE");}                                        
                        }
                        else{
                            if(bln_debug){obj_instance.fn_debug("MARKSSAVE IS FALSE");}                                        
                        }
                        
                    }                    
                }             
                if(bln_debug){obj_instance.fn_debug("COMPLETE XDESIGN1 onSaveComponent");}   
                this.obj_holder.obj_container.onSaveComponent(obj_iniSave); //XDESIGN Program CallBack Function                                 
            }           
        }
        //*/

        if(bln_debug){obj_instance.fn_debug("EXIT");}                
    }    

    fn_save(obj_ini){         

        let bln_debug=false;
        
        
        let obj_instance=obj_ini.obj_instance;
        if(parseInt(obj_instance.obj_design.int_modeExecute)!==obj_instance.obj_holder.int_modeEdit){            
            //console.log(obj_instance.obj_design.str_tag + ": Mode Not Valid For Operation [" + obj_instance.obj_design.int_modeExecute + "][" + obj_instance.obj_holder.int_modeEdit + "]");
            //this will be the case for runtme components , running within editable components
            return;
        }        

        obj_instance=obj_ini.obj_instance;
        obj_instance.fn_onBeforeSave();        

        if(bln_debug){obj_instance.fn_debug("ENTER SAVE");}
        
        //str_action could be publish
        obj_ini.str_action="save";
        if(!obj_ini.str_actionCallback){obj_ini.str_actionCallback=obj_ini.str_action;}

        if(parseInt(obj_instance.obj_design.int_idRecord)===0){            
            obj_ini.str_action="saveAs";          
        }

        //Very Important - do not fuck about with this
        let int_modeExecuteCopy=obj_instance.obj_design.int_modeExecute;//make a copy of current mode
        obj_instance.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;//db should be saved in runtime mode
        //Very Important - do not fuck about with this        
        
        let obj_post=this.fn_formatPost(obj_ini);                       

        obj_post.ObjectData=this.fn_actionSerialize(obj_instance);//obj_post.ObjectData is now a JSON String        
        if(bln_debug){obj_instance.fn_debug("BEFORE PUT POST");}
        this.fn_putPost(obj_post);

        if(bln_debug){obj_instance.fn_debug("AFTER PUT POST");}
        
        //Very Important - do not fuck about with this
        obj_instance.obj_design.int_modeExecute=int_modeExecuteCopy;//put back in original mode
        //Very Important - do not fuck about with this
    }
    save(obj_post){ //native callback generally overidden                
    }
    
    saveAs(obj_post){//native callback
        obj_post.ObjectInstance.obj_design.int_idRecord=obj_post.RecordId;        
    }
    openComponentCode(obj_post){//native callback
        //console.log("openComponentCode");        
    }

    fn_openComponentCode(obj_ini){

        //str_action could be publish
        obj_ini.str_action="openComponentCode";                       
        obj_ini.obj_instance=obj_ini.ObjectInstance;         
        let obj_post=this.fn_formatPost(obj_ini);                       
        //obj_post.ObjectData=this.fn_actionSerialize(obj_ini.obj_instance);//obj_post.ObjectData is now a JSON String        
        //this seem worng
        //all we need is the RecordType.
        //revist and check what is actually requiredkk
        this.fn_putPost(obj_post);
    }

    fn_formatPost(obj_ini){

        let obj_regisratorProject, str_nameApp, str_urlServer;

        let obj_post=new Object;   
        
        obj_regisratorProject=this.obj_holder.obj_regisratorProject;
        str_nameApp=obj_regisratorProject.obj_design.str_name;                 
        str_urlServer=obj_regisratorProject.obj_design.str_urlServer;         

        /*
        this.fn_debug("Test");
        console.log("this.obj_holder.obj_regisratorProject: " + this.obj_holder.obj_regisratorProject);        
        console.log("str_nameApp: " + str_nameApp);        
        console.log("str_urlServer: " + str_urlServer);        
        //*/

        if(!obj_regisratorProject){return;}
        if(!str_nameApp){return;}
        if(!str_urlServer){return;}        
        
        str_urlServer=obj_path.fn_getURLServerFile(str_nameApp, str_urlServer);      
        obj_post.URL=str_urlServer
        
        obj_post.NotifierId=obj_ini.str_idAJAXNotifier;                        
        obj_post.Action=obj_ini.str_action;                
        obj_post.ActionCallBack=obj_ini.str_actionCallback;                                        
        if(!obj_post.ActionCallBack){            
            obj_post.ActionCallBack=obj_ini.str_action;                
        }
        obj_post.RecordId=obj_ini.RecordId;//could get complicated if obj_instance supplied                
        obj_post.Query=obj_ini.Query;
        obj_post.ProjectPin=obj_ini.bln_projectPin;        
        obj_post.PalettePin=obj_ini.bln_palettePin;        
        obj_post.CatQuery=obj_ini.str_catQuery;            
        obj_post.DynamicPin=obj_ini.bln_dynamicPin;        
        obj_post.Execute=obj_ini.bln_execute;           

        //only required on logon
        obj_post.AuthorizeUserEmail=obj_ini.AuthorizeUserEmail;        
        obj_post.AuthorizeUserPass=obj_ini.AuthorizeUserPass;   
        //only required on logon

        
        let obj_instance=obj_ini.obj_instance;
        
        if(obj_instance){            
            obj_post.DesignId=obj_instance.obj_design.str_idXDesign;                                
            obj_post.RecordName=obj_instance.obj_design.str_name;
            obj_post.RecordShortName=obj_instance.obj_design.str_variableName;
            
            obj_post.RecordType=obj_instance.obj_design.str_type;            
            obj_post.RecordExtend=obj_instance.obj_design.str_classExtend;
            //console.log("obj_post.RecordExtend: " + obj_post.RecordExtend);
            obj_post.RecordId=obj_instance.obj_design.int_idRecord;            
            obj_post.ToggleProjectPin=obj_instance.obj_design.bln_toggleProjectPin;
            obj_post.ProtectedProjectPin=obj_instance.obj_design.bln_protectedProjectPin;
            obj_post.ProjectPin=obj_instance.obj_design.bln_projectPin;
            obj_post.PalettePin=obj_instance.obj_design.bln_palettePin;     
            obj_post.DynamicPin=obj_instance.obj_design.bln_dynamicPin;                                
            obj_post.LocationID=obj_instance.obj_design.str_locationID;
            obj_post.CreatedDate=obj_instance.obj_design.str_createdDate;
            obj_post.ModifiedDate=obj_instance.obj_design.str_modifiedDate;            
            obj_post.LastVersionDate=obj_instance.obj_design.str_lastVersionDate;            
            obj_post.CategoryList=obj_instance.obj_design.str_categoryList;            

            obj_post.CreateRelease=obj_project.obj_holder.bln_createRelease;                        
                        
            //get a list of your dependentid
            //does this need to run on every trip?                                                
            obj_post.DependentId=obj_instance.fn_compileDependentId();
            //console.log(obj_instance.obj_design.str_name + " obj_post.DependentId: " + obj_post.DependentId);

            
            
            
            //get a list of your classlist
            let str_List1=obj_instance.obj_design.str_classList;            
            //console.log("str_List1: " + str_List1);                       
            
            //get a list of every classlist in your child arr item
            //does this need to run on every trip?                                                
            let str_List2=obj_instance.fn_compileDependentClassList();
            //console.log("str_List2: " + str_List2);

            //get a comnbined list of the above
            let str_List3=obj_shared.fn_formatUniqueList(str_List1 + "," + str_List2);            
            str_List3=obj_shared.fn_remove(str_List3, "notset");
            str_List3=obj_shared.fn_formatString(str_List3, obj_const.int_trimCommas);
            //console.log("str_List3: " + str_List3);
            
            obj_post.ClassList=str_List3;            
            //console.log("obj_post.ClassList: " + obj_post.ClassList)
            obj_post.IsRoot=obj_instance.obj_holder.bln_isRoot;//Is Project Instance - set Current Project                        
            obj_post.ComponentCode=obj_instance.obj_holder.str_componentCode;
        }
        return obj_post;
    }   
    

    fn_delete(obj_ini){        
        if(obj_ini.obj_instance.obj_design.int_idRecord===0){//safety-catch, should be handle before here, dont go to server, go straight to default code open
            console.log("Cannot delete. Record Id is zero.");
            return false;            
        }        
        obj_ini.str_action="delete";
        let obj_post=this.fn_formatPost(obj_ini);               
        this.fn_putPost(obj_post);
        return true;            
    } 
    delete(obj_post){        
        obj_post.ObjectInstance.obj_design.int_idRecord=0;
    } 

    fn_publish(obj_ini){                
        if(obj_ini.obj_instance.obj_design.int_idRecord===0){return;}        
        obj_ini.str_action="versionProject";
        let obj_instance=obj_ini.obj_instance;        
        let obj_post=this.fn_formatPost(obj_ini);               
        obj_post.ObjectData=this.fn_actionSerialize(obj_instance);//obj_post.ObjectData is now a JSON String
        //this seems wrong
        //serialize replacer contains a call to fn_save.
        //when revist, consider running a properer save action and picking up the serilaize dobject from there.
        this.fn_putPost(obj_post);
    }      
    publish(obj_post){
    }
    
    fn_AJAXLocateObjectInstance(obj_post){//overide base class function 
        let int_index;
    
        obj_post.ObjectInstance=false;
        int_index=obj_post.DesignId.indexOf("DesignIdNotSet");        
        if(int_index==-1){                            
            //obj_post.ObjectInstance=obj_project.fn_findItemById(obj_post.DesignId);//try to find in own Project     
            //depracated léooing in own project - certainly no good for saving .
            obj_post.ObjectInstance=obj_projectTarget.fn_findItemById(obj_post.DesignId);//try to find in own Project            
            if(!obj_post.ObjectInstance){
                if(obj_projectTarget){
                    obj_post.ObjectInstance=obj_projectTarget.fn_findItemById(obj_post.DesignId);//try to find in design Project
                }
            }        
        }               
        return obj_post.ObjectInstance;
    }
    
    fn_mySerializeReplacer(){ //when Saving
        
        //DESIGNFILE overide serialize object
    const seen = new WeakSet();
    return (key, value) => {

        switch(key){                
        case "bln_removeId":
            return;  
        case "bln_isComponent":
            return;  
        case "obj_domAttribute":
            //return;          
            break;
        case "dom_obj":
                return;
        case "dom_objContent":
            return;
        case "__quill":
            return;
        case "obj_ini":
            return;        
        case "obj_designDelegate":
            return;        
        case "xxstr_variableName":
            return;        
        case "bln_isGenericTag":
              return;   
        case "bln_isContainer":
            return;        
        case "str_prefix":
              return;        
        case "bln_listenClick":
            return;        
        case "bln_listenChange":
            return;        
        case "int_modeExecute":
        return;                    
        case "str_idXDesign":            
            if(value.indexOf("myId")==0){                
                //return;//Dont save automatically assigned ids
            }        
        break;
        default:            
    }

        switch(value){                                                 
            case "notset":
                return;                    
            case "":
                return;                    
            case false:
                return;                                            
                
        }
        
        //console.log(key + ": " + value);

        if (typeof value === "object" && value !== null) {

            if(!value.constructor){return;}
            if(!value.constructor.name){
                alert("error: value.constructor.name");
                return;                
            }                      
            
            if(value.constructor.name==="Holder"){return;}//Dont serialize this object (or the objects attached to it)

            //*
            let int_length=Object.keys(value).length;
            if(int_length===0){
                //console.log("length: " + int_length);
                return;
            }
            //*/


            if(value.bln_isComponent){                

                let obj_instance=value;  
                let int_idRecord, str_type, str_name;
                
                //if(value!==this.obj_myObject){//referes to the component that intiated the serializaiton ie the component
                if(obj_instance!==this.obj_myObject){//referes to the component that intiated the serializaiton ie the component

                    
                    //This allows Controls not be saved - e.g boot controls
                    //also design control that is a special case, apparently.                        
                    if(obj_instance.obj_design.bln_preventSave){
                        console.log(obj_instance.obj_design.str_name + ": bln_preventSave" + obj_instance.obj_design.bln_preventSave);
                        return;
                    }                    
                
                    
                    
                    int_idRecord=value.obj_design.int_idRecord;
                    str_type=value.obj_design.str_type;
                    value={
                        obj_design:{
                            int_idRecord:int_idRecord,
                            str_type:str_type
                        }
                    }
                }                
            }

            if (seen.has(value)) {
                //return "circular";
                return;
            }   
            seen.add(value);
        }
        //console.log("value: " + value)        
        return value;
        };
    }  

    fn_debugServerPost(obj_post, str_comment){                                        
        
        //console.log("obj_project: " + obj_project.obj_design.int_idRecord);
        if(!obj_project.obj_holder.bln_debugServer){return;}
        
        if(str_comment===undefined){str_comment=""}
        let str_title, s;
        s="";
        if(obj_post.Direction){s+=obj_post.Direction + " ";}
        if(obj_post.Action){s+=obj_post.Action + " ";}
        if(obj_post.RecordName && obj_post.RecordName!="New Project"){s+=obj_post.RecordName + " ";}
        if(obj_post.str_comment){s+=obj_post.str_comment + " ";}        
        str_title=s;        
        
        console.groupCollapsed(str_title);
        let Context=obj_post.Context;
        let foo_val;
        
        //console.log("obj_post.Context: " + obj_post.Context);
        //console.log("obj_post.NotifierId: " + obj_post.NotifierId);
        console.log("obj_post.URL: " + obj_post.URL);        
        console.log("obj_post.Action: " + obj_post.Action);
        console.log("obj_post.ActionCallBack: " + obj_post.ActionCallBack);
        //console.log("obj_post.DesignId: " + obj_post.DesignId);
        //console.log("obj_post.RecordName: " + obj_post.RecordName);
        //console.log("obj_post.RecordType: " + obj_post.RecordType);
        //console.log("obj_post.RecordId: " + obj_post.RecordId);
        //console.log("obj_post.ToggleProjectPin: " + obj_post.ToggleProjectPin);
        //console.log("obj_post.ProtectedProjectPin: " + obj_post.ProtectedProjectPin);
        //console.log("obj_post.ProjectPin: " + obj_post.ProjectPin);
        //console.log("obj_post.PalettePin: " + obj_post.PalettePin);
        //console.log("obj_post.DependentId: " + obj_post.DependentId);
        //console.log("obj_post.ClassList: " + obj_post.ClassList);
        //console.log("obj_post.Query: " + obj_post.Query);
        console.log("obj_post.Echo: " + obj_post.Echo);        
        //console.log("obj_post.Hidden: " + obj_post.Hidden);
        if(obj_post.HasError){            
            console.log("obj_post.ErrorMessage: " + obj_post.ErrorMessage);        
            //alert("obj_post.ErrorMessage: " + obj_post.ErrorMessage);        
        }
        //console.log("obj_post.ComponentCode: " + obj_post.ComponentCode);                

        console.groupCollapsed("OBJECT DATA");                
        console.table(obj_post.ObjectData);                                
        console.groupEnd();
        
        
        console.groupCollapsed("ROW DATA");
        console.table(obj_post.RowData);
        console.groupEnd();
        

        console.groupEnd();
    }
}//END CLS
//END DATA

