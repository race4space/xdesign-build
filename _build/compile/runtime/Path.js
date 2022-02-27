//START Path.js
class Path {  
  constructor() {        
      
      this.str_path_document_root="";//client side therefore blank       
      this.str_path_folder_start=this.str_path_document_root;
      this.str_name_folder_app="app";             
      this.str_path_folder_app=this.str_path_folder_start+"/"+this.str_name_folder_app;                                  
      
      this.str_name_folder_asset="asset";           
      this.str_name_folder_server="server";              
  } 
  fn_getAppPath(str_name_app){    
      return this.str_path_folder_app+"/"+str_name_app;
  }
  fn_getURLAssetFile(str_name_app, str_name_file){          
      return this.fn_getAppPath(str_name_app)+"/"+this.str_name_folder_asset+"/"+str_name_file;        
  }  
  fn_getURLServerFile(str_name_app, str_name_file){
      
      let str_value=this.fn_getAppPath(str_name_app)+"/"+this.str_name_folder_server+"/"+str_name_file;            
      //console.log("str_value: " + str_value);
      return str_value;
  }
}
//END Path.js