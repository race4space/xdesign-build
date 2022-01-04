var  obj_project, obj_myJson, obj_shared, obj_boot, obj_holder, obj_const, obj_clipboard, obj_path;
var obj_projectTarget;
var obj_projectParent;


obj_shared=new Shared;
obj_myJson=new myJSON(new Object);
obj_boot=new Holder;
obj_holder=new Holder;
obj_const=new Constant;
obj_path=new Path;

document.addEventListener('DOMContentLoaded', (event) => {
  
  obj_project=new Project(obj_boot);      
  window.obj_project=obj_project;//expose main base object to window scope
  obj_project.fn_execute();  
  
});