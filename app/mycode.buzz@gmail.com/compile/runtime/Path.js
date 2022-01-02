class Path {  
  constructor() {  

    this.str_path_document_root="";//client side therefore blank    

    this.str_name_folder_user="mycode.buzz@gmail.com";     
    this.str_name_folder_asset="asset";
    this.str_name_folder_app="app";
    this.str_name_folder_server="server";            
    this.str_name_folder_component="component";
    this.str_name_folder_instance="instance";      

    this.str_path_folder_app=this.str_path_document_root+"/"+this.str_name_folder_app;                      
    this.str_path_folder_user=this.str_path_folder_app+"/"+this.str_name_folder_user;                                    
    this.str_path_folder_user_component=this.str_path_folder_user+"/"+this.str_name_folder_component;              
    this.str_path_folder_user_instance=this.str_path_folder_user+"/"+this.str_name_folder_instance;                             
    
    this.str_path_folder_user_asset=this.str_path_folder_user+"/"+this.str_name_folder_asset;            
    this.str_path_folder_user_server=this.str_path_folder_user+"/"+this.str_name_folder_server;                 
    
    this.str_name_file_app_server=this.fn_getURLServerFile("server-manager.php");        
  } 

  fn_getURLAssetFile(str_name_file){
    let str_path_file=this.str_path_folder_user_asset+"/"+str_name_file;                       
    return str_path_file;
  }
  
  fn_getURLServerFile(str_name_file){
    return this.str_path_folder_user_server+"/"+str_name_file;               
  }
  fn_setURLComponentFile(str_name_component, str_name_file){
    return this.str_path_folder_user_component+"/"+str_name_component+"/"+str_name_file;
  }    
}