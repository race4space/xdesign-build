
            //XSTART component/programiconbutton
              class programiconbutton extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("programiconbutton");      
                  this.fn_setTag("programiconbutton");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");                              

                   this.obj_design.str_subdomain=obj_ini.obj_design.str_subdomain;
        
                  
                   this.fn_setStyleProperty("display", "block");
                  this.fn_setStyleProperty("height", "80px");
                  this.fn_setStyleProperty("padding", "1em");
                  this.fn_setStyleProperty("border", "5px solid black");
                  this.fn_setStyleProperty("cursor", "pointer");                 
                  this.fn_setStyleProperty("margin-right", "10px");
                  this.fn_setStyleProperty("margin-bottom", "10px");
                  this.fn_setStyleProperty("backgroundColor", "orange");
                  this.fn_setStyleProperty("borderRadius", "10px");
                }
                fn_onClick(){                                    
                  
                }                
                fn_onClick(){                    
                  
                  let int_pos=window.location.href.indexOf("lokal");//localhost                   
                  let str_protocol, str_urlNavigate, bln_localhost;                  
                  if(int_pos!==-1){                    
                    bln_localhost=true;
                  }                  
                  str_protocol="http";
                  if(!bln_localhost){
                    str_protocol+="s";
                  }
                  
                  str_urlNavigate=str_protocol;
                  str_urlNavigate+="://";
                  str_urlNavigate+=this.obj_design.str_subdomain;
                  str_urlNavigate+=".";
                  if(bln_localhost){
                    str_urlNavigate+="lokal-";
                  }
                  str_urlNavigate+="mycode.buzz";                                    
                  window.location.href=str_urlNavigate;                  
                  //window.open(str_urlNavigate);
                }  
              }//END CLS
              //END TAG
              //END component/programiconbutton