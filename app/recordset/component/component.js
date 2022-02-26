
//XSTART component/recordset
class recordset extends AJAX{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("recordset");      
    this.fn_setTag("recordset");            
    this.obj_design.bln_isGenericTag=true;
    this.fn_extends("AJAX");                    

    this.obj_holder.bln_debugServer=false;

    this.int_offset=0;
    this.int_limit=0;
    
  }
  
  fn_onStateChange(){                       
    this.fn_close();
    return true;
  }   

  fn_runAction(obj_ini){    
    if(!obj_ini){return;}        
    let obj_post=this.fn_formatPost(obj_ini);                                       
    this.fn_putPost(obj_post);
  }

  fn_formatPost(obj_ini){  
    
    let obj_post, str_nameApp, str_urlServer;        
    str_nameApp=this.obj_design.str_name;                 
    str_urlServer=this.obj_design.str_urlServer;                     
    obj_ini.str_urlServer=obj_path.fn_getURLServerFile(str_nameApp, str_urlServer);              
    
    
    obj_post=super.fn_formatPost(obj_ini);
    
    return obj_post;
}   

  fn_runQuery(obj_query){

    if(!obj_query){return;}    
    
    obj_query.str_idAJAXNotifier=this.obj_design.str_idXDesign;                                          
    obj_query.int_offset=this.int_offset;
    obj_query.int_limit=this.int_limit;
    this.fn_runAction(obj_query);
  }

  fn_debugServerPost(obj_post, str_comment){                                                
    
    if(!this.obj_holder.bln_debugServer){return;}
    
    if(str_comment===undefined){str_comment=""}
    let str_title, s;
    s="";
    if(obj_post.Direction){s+=obj_post.Direction + " ";}
    if(obj_post.Action){s+=obj_post.Action + " ";}
    if(obj_post.RecordName && obj_post.RecordName!="New Project"){s+=obj_post.RecordName + " ";}
    if(obj_post.str_comment){s+=obj_post.str_comment + " ";}        
    str_title=s;        
    
    console.groupCollapsed(str_title);
    console.log("obj_post.URL: " + obj_post.URL);        
    console.log("obj_post.Action: " + obj_post.Action);
    console.log("obj_post.ActionCallBack: " + obj_post.ActionCallBack);
    console.log("obj_post.Echo: " + obj_post.Echo);            
    if(obj_post.HasError){            
        console.log("obj_post.ErrorMessage: " + obj_post.ErrorMessage);            
    }
    console.groupCollapsed("OBJECT DATA");                
    console.table(obj_post.ObjectData);                                
    console.groupEnd();
    
    console.groupCollapsed("ROW DATA");
    console.table(obj_post.RowData);
    console.groupEnd();
    

    console.groupEnd();
}

}//END CLS
//END TAG
//END component/recordset