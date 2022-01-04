class Path {  
  constructor() {  

    this.str_path_document_root="";//client side therefore blank    
    
    this.str_name_folder_warehouse="warehouse";         
    this.str_name_folder_server="server";            
    this.str_name_folder_asset="asset";        
    this.str_name_folder_component="component";
    this.str_name_folder_instance="instance";      
    
    this.str_path_folder_warehouse=this.str_path_document_root+"/"+this.str_name_folder_warehouse;                      
    
    this.str_path_folder_server=this.str_path_folder_warehouse+"/"+this.str_name_folder_server;                 
    this.str_path_folder_asset=this.str_path_folder_warehouse+"/"+this.str_name_folder_asset;            
    this.str_path_folder_component=this.str_path_folder_warehouse+"/"+this.str_name_folder_component;              
    this.str_path_folder_instance=this.str_path_folder_warehouse+"/"+this.str_name_folder_instance;                             
    
    this.str_name_file_app_server=this.fn_getURLServerFile("xdesign1.php");        
    console.log(": this.str_name_file_app_server: " + this.str_name_file_app_server);
  } 

  fn_getURLAssetFile(str_name_file){
    let str_path_file=this.str_path_folder_asset+"/"+str_name_file;                       
    return str_path_file;
  }
  
  fn_getURLServerFile(str_name_file){
    return this.str_path_folder_server+"/"+str_name_file;               
  }
  fn_setURLComponentFile(str_name_component, str_name_file){
    return this.str_path_folder_component+"/"+str_name_component+"/"+str_name_file;
  }    
}