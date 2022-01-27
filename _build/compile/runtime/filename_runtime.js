
//START UserSettings.js
const idXdesignTarget="xdesign-target";
//END UserSettings.js


//START Path.js
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
      return this.fn_getAppPath(str_name_app)+"/"+this.str_name_folder_server+"/"+str_name_file;            
  }
}
//END Path.js
//END Path.js


//START Shared.js
class Shared{
  constructor(){
  }

  fn_validNumber(x) {
    if (Number.isNaN(x)) {
      return false;
    }
    if (isNaN(x)) {
      return false;
    }
    return true;
  }
  

  
  fn_validEmail(str_email){      
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(str_email); 
  }

  fn_expireCookie(cname) {
    this.fn_setCookie(cname, "", 0);            
  }
  fn_setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ";SameSite=Lax";
  }

  fn_getCookie(cname) {            
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  fn_onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  
  fn_getDate(int_flag){
    switch(int_flag){
      case obj_const.int_dateNow:      
      let d=new Date();
      return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(); 
    }
  
  }

  fn_formatUniqueList(str_list){
    let arr_list=str_list.split(",");
    arr_list=arr_list.map(s => s.trim());        
    let arr_unique = arr_list.filter(this.fn_onlyUnique);            
    str_list=arr_unique.toString();
    return str_list;
}
fn_formatString(str_value, int_flag){
  
  switch(int_flag){
    case obj_const.int_alpha:      
    return str_value.replace(/[^A-Z a-z_]+/g, "");        
    case obj_const.int_alphaComma:      
    return str_value.replace(/[^A-Z a-z,_]+/g, "");            
    case obj_const.int_alphaNumeric:      
    return str_value.replace(/[^A-Za-z0-9_]+/g, "");        
    case obj_const.int_alphaNumericComma:      
    return str_value.replace(/[^A-Za-z0-9,_]+/g, "");            
    case obj_const.int_trimCommas:          
    return str_value.replace(/^,|,$/gi,"");            
  }
}
fn_formatDate(str_value){
  
  return str_value.replace(/[^A-Za-z0-9 :\-_]+/g, "");            
  //return str_value;
}

fn_replace(str_source, str_find, str_replace){  
  let re=new RegExp(str_find, "gi");
  return str_source.replace(re, str_replace);
}
fn_remove(str_source, str_remove){
  let re=new RegExp(str_remove, "g");
  return str_source.replace(re, "");
}
fn_removeSpace(str){        
  str = str.replace(/\s+/g, '');
  return str;
}

fn_isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
fn_hasMembersObject(obj) {
  return Object.keys(obj).length !== 0;
}

fn_capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

fn_inStr(str_needle, str_haystack){

  let int_pos=str_haystack.indexOf(str_needle);
  if(int_pos===-1){return false;}
  return true;
}

fn_isEmptyObject(empty) { 
  if(Object.keys(empty).length === 0 && empty.constructor === Object){
    return true;
  } 
  return false;
}

 fn_removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

fn_camelCaseToHyphen(str) { 

    return str.replace(/([A-Z])/g, "-$1").toLowerCase();  
}

fn_debug(obj_myObj, str_message=""){
  this.fn_enumerateObject(obj_myObj, str_message="");
}

fn_debugArrayItem(item, index) {
  console.log("array item: " + index + ": " + item); 
}


fn_enumerateObject(obj_myObj, str_message=""){

    console.groupCollapsed("ENUMERATE OBJECT :" + str_message);

    for (let [key, foo_value] of Object.entries(obj_myObj)) {
        console.log(`${key}: ${foo_value}`);
        console.log("typeof : " + typeof foo_value);
        //if (typeof foo_value === "object" && foo_value !== null && (key=="obj_design" || key=="obj_domProperty") )  {
        //if (typeof foo_value === "object" && foo_value !== null && (key=="obj_design"))  {
        //if (typeof foo_value === "object" && foo_value !== null && (key.indexOf("obj_")===0))  {          
        switch(typeof foo_value){
          case "object":
            this.fn_enumerateObject(foo_value, "");
            break;
          case "array":
            foo_value.forEach(this.fn_debugArrayItem);
            break;
          default:
            //console.log(`${key}: ${foo_value}`);
        }        
    }
    console.groupEnd();
  }
  fn_iteratePropertyNames(obj){
    do Object.getOwnPropertyNames(obj).forEach(function(name) {
        console.log(name);
    });
    while(obj = Object.getPrototypeOf(obj));
  }

  fn_findInObject(obj_myObj, str_search){
    for (let [key, foo_value] of Object.entries(obj_myObj)) {
        console.log(`${key}: ${foo_value}`);
    }
  }

  fn_getUniqueId(str_value){
    let generator = new IDGenerator();
    return str_value +"_" + generator.generate();
  }
   fn_getRandom(number) {
    return Math.floor(Math.random() * (number+1));
  }

  fn_getRandomColor() {
    return 'rgb(' + this.fn_getRandom(255) + ',' + this.fn_getRandom(255) + ',' + this.fn_getRandom(255) + ')';
  }


  fn_flipBool(bln_val){
    if(bln_val){return false;}
    else{return true;}
  }
  fn_parseBool(foo_val){  

    switch(typeof(foo_val)){      
      case undefined:
          return false;                         
      case "undefined":
          return false;                         
      case "boolean":
          return foo_val;                         
      case "string":
        switch(foo_val.toLowerCase()){      
          case "false":
            return false;                
          case "0":
            return false;        
          case "no":
            return false;        
          case "true":
            return true;        
          case "1":
            return true;        
          case "yes":
            return true;                       
          default:
            // other string e.g. "green"
            return foo_val;     
        }            
      default:        
        return foo_val;           
    }
  }

  getAllFuncs(toCheck) {
    var props = [];
    var obj = toCheck;
    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function(e, i, arr) {
       if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
    });
  }

  fn_removeArrOfArrays(arr_first, arrOfArrays) {
    let str_value1, str_value2;
    let i, j;
    for (i=0; i<arr_first.length; i++) {
        str_value1=arr_first[i];

        for (j=0; j<arrOfArrays.length; j++) {
          str_value2=arrOfArrays[j][0];
          if(str_value1===str_value2){
            arrOfArrays.splice(j, 1);
          }
        }

    }
    return arrOfArrays;
}

  fn_setMapItem(obj_map, foo_key, foo_value){
    obj_map.set(foo_key, foo_value);
  }
  fn_getMapItem(obj_map, foo_key){
    return obj_map.get(foo_key);
  }   
  fn_loopmap(myMap){   
    console.log("START fn_loopmap");
    for (const [key, value] of myMap.entries()) {
        console.log(key, value);
      }
      console.log("END fn_loopmap");

  }   

  // Parameters:
  // code 								- (string) code you wish to format
  // stripWhiteSpaces			- (boolean) do you wish to remove multiple whitespaces coming after each other?
  // stripEmptyLines 			- (boolean) do you wish to remove empty lines?
  fn_formatCode(code, stripWhiteSpaces=true, stripEmptyLines=true) {
    //"use strict";
    var whitespace          = ' '.repeat(4);             // Default indenting 4 whitespaces
    var currentIndent       = 0;
    var char                = null;
    var nextChar            = null;


    var result = '';
    for(var pos=0; pos <= code.length; pos++) {
        char            = code.substr(pos, 1);
        nextChar        = code.substr(pos+1, 1);

        // If opening tag, add newline character and indention
        if(char === '<' && nextChar !== '/') {
            result += '\n' + whitespace.repeat(currentIndent);
            currentIndent++;
        }
        // if Closing tag, add newline and indention
        else if(char === '<' && nextChar === '/') {
            // If there're more closing tags than opening
            if(--currentIndent < 0) currentIndent = 0;
            result += '\n' + whitespace.repeat(currentIndent);
        }

        // remove multiple whitespaces
        else if(stripWhiteSpaces === true && char === ' ' && nextChar === ' ') char = '';
        // remove empty lines
        else if(stripEmptyLines === true && char === '\n' ) {
            //debugger;
            if(code.substr(pos, code.substr(pos).indexOf("<")).trim() === '' ) char = '';
        }

        result += char;
    }
    return result;
  }
}//END CLS

//START SHARED GLOBAL SCOPE
function IDGenerator() {

  this.length = 8;
  this.timestamp = +new Date;

  var _getRandomInt = function( min, max ) {
   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  this.generate = function() {
    var ts = this.timestamp.toString();
    var parts = ts.split( "" ).reverse();
    var id = "";

    for( var i = 0; i < this.length; ++i ) {
     var index = _getRandomInt( 0, parts.length - 1 );
     id += parts[index];
    }

    return id;
  }
}

String.prototype.trimLeft = function(str_char) {
  if (str_char === undefined)
  str_char = "\s";  
return this.replace(new RegExp("^" + str_char + "+"), "");
};

String.prototype.trimRight = function(str_char) {
  if (str_char === undefined)
  str_char = "\s";  
return this.replace(new RegExp("" + str_char + "+$"), "");
};
//END SHARED GLOBAL SCOPE

//END Shared.js


//START LevelObject.js
class LevelObject {
    constructor() {      
    }  
    fn_isObject(foo_val){
      if(typeof foo_val === 'object' && foo_val !== null){
        return true;
      }
      return false;
    }                  
    fn_flipBool(bln_bool){
      if(bln_bool){return false;}
      return true;
    }
    fn_debug(obj_debug=false, str_message=""){

      if(!obj_debug){
        obj_debug=this;
      }
      console.groupCollapsed("DEBUG OBJECT " + str_message);    
      console.log("obj_design.str_type: " + obj_debug.obj_design.str_type);
      console.log("str_name: " + obj_debug.obj_design.str_name);
      console.log("obj_design.str_tag: " + obj_debug.obj_design.str_tag);
      console.log("str_idXDesign: " + obj_debug.obj_design.str_idXDesign);
      console.groupEnd();
      //this.fn_enumerateObject(obj_debug, "LEVEL OBJECT DEBUG")
    }    
   fn_enumerateObject(obj_myObj, str_message="level enumerate"){            
    
      console.groupCollapsed("ENUMERATE OBJECT " + str_message);    
  
      for (let [key, foo_value] of Object.entries(obj_myObj)) {        
          console.log(`${key}: ${foo_value}`);        
          if (typeof foo_value === "object" && foo_value !== null) {            
              //fn_enumerateObject(foo_value, "");
          }
          else{
              //console.log(`${key}: ${foo_value}`);        
          }
      }    
      console.groupEnd();
  }  
  fn_shallowCopyObject(source){      
    return Object.assign({}, source);  
  }  
}
//END CLASS
//END LevelObject.js


//START Holder.js
class Holder extends LevelObject{  
    constructor() {      
      super();            
      this.int_modeReadOnly=1;       
      this.int_modeEdit=2;       
      this.int_modeBoot=3;             
      this.int_modeRuntime=10;             
      
      this.obj_design={
        arr_item:[]
      }

      this.obj_domStyle={};   
      this.obj_domProperty={};         
      this.obj_domAttribute={};         
      this.obj_theme={};   
    } 
    fn_getShortName(){            
      return this.obj_design.str_name.toLowerCase().replace(/\s/g, '');    
    }
}

class Constant extends LevelObject{  
  constructor() {      
    super();            
    
    this.int_alpha=10; 
    this.int_alphComma=20; 
    this.int_alphaNumeric=30; 
    this.int_alphaNumericComma=40;   
    this.int_trimCommas=41;   

    this.int_dateNow=10;   
  }   
}
//END Holder.js


//START BaseObject.js
class BaseObject extends LevelObject{
    constructor(obj_ini) {
        super(obj_ini); 
        
        this.fn_initialize(obj_ini);
    }    
    fn_initialize(obj_ini){                           
        
        this.obj_ini=obj_ini;//required   
        if(!this.obj_holder){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_holder=new Holder;//required
        }     
        //this.obj_holder.bln_loaded=false;
        
        //START INITIALIZE DESIGN
        this.obj_design=obj_ini.obj_design;                
        if(!this.obj_design){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_design={};//required        
        }     
        if(this.obj_design.arr_item===undefined){
            this.obj_design.arr_item=[];
        }      
        if(this.obj_design.arr_item.length===0){
            //this.obj_design.arr_item=[];
        }           
        
        //this.fn_setIsContainer(false);               

        if(this.obj_design.str_idXDesign==undefined){this.fn_setIDXDesign();}
        if(obj_project){
            let str_idProject, str_idXDesign;
            str_idProject=this.obj_design.str_idProject;
            str_idXDesign=obj_project.obj_design.str_idXDesign;
            if(str_idProject==undefined && this!==obj_project){this.obj_design.str_idProject=str_idXDesign;}                        
        }
        
        if(this.obj_design.str_name==undefined){this.obj_design.str_name=undefined;}//ensure visible placeholder at front of object defintion
        if(this.obj_design.str_nameRegistrator==undefined){this.obj_design.str_nameRegistrator="notset";}//ensure visible placeholder at front of object defintion
        if(this.obj_design.str_variableName==undefined){this.obj_design.str_variableName="notset";}//ensure visible placeholder at front of object defintion
        
        
        
        if(this.obj_design.str_type==undefined){this.obj_design.str_type=undefined;}//ensure visible placeholder at front of object defintion
        if(this.obj_design.str_tag==undefined){this.obj_design.str_tag=undefined;}//ensure visible placeholder at front of object defintion                               
        
        
        if(this.obj_design.str_content===undefined){this.obj_design.str_content="";}                
        
        
        //if(this.obj_design.str_content==="<p><br></p>"){this.obj_design.str_content="";}
        
        //No need to show if negative                 
        this.obj_design.bln_dynamicPin=obj_ini.obj_design.bln_dynamicPin;        
        
        
        this.obj_design.int_modeExecute=obj_ini.obj_design.int_modeExecute;         
        if(this.obj_design.int_modeExecute===undefined){this.obj_design.int_modeExecute=undefined;}  
             

        //Start Click Event
        this.obj_design.bln_listenClick=obj_ini.obj_design.bln_listenClick;
        if(this.obj_design.bln_listenClick===undefined){this.obj_design.bln_listenClick=undefined;}        
        
        if(obj_ini.obj_design.str_nameEventClick){this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventClick;}//this will usually be set by the container
        if(obj_ini.obj_design.str_valueEventClick){this.obj_design.str_valueEventClick=obj_ini.obj_design.str_valueEventClick;}//this will usually be set by the container
        //End Click Event


        //Start Change Event
        this.obj_design.bln_listenChange=obj_ini.obj_design.bln_listenChange;
        if(this.obj_design.bln_listenChange===undefined){this.obj_design.bln_listenChange=undefined;}        
        
        if(obj_ini.obj_design.str_nameEventChange){this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventChange;}//this will usually be set by the container
        if(obj_ini.obj_design.str_valueEventChange){this.obj_design.str_valueEventChange=obj_ini.obj_design.str_valueEventChange;}//this will usually be set by the container        
        //End Click Event
        
        //Start Event Management
        //Optional: LinkId refers to the target component for the event
        //often used for to link a component to a  dynamicContent control.
        this.obj_design.str_linkId=obj_ini.obj_design.str_linkId;
        if(this.obj_design.str_linkId===undefined){this.obj_design.str_linkId=undefined;}       
        //End Event Management
        
        
        //END INITIALIZE DESIGN        
        
        //START INITIALIZE DOM PROPERTY
        this.obj_domProperty=obj_ini.obj_domProperty;                              
        if(!this.obj_domProperty){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_domProperty={};//required
        }     
        //END INITIALIZE DOM PROPERTY

        //START INITIALIZE DOM ATTRIBUTE
        this.obj_domAttribute=obj_ini.obj_domAttribute;   
        if(!this.obj_domAttribute){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_domAttribute={};//required
        }                                     
        //END INITIALIZE DOM ATTRIBUTE
        
        //START INITIALIZE STYLE        
        /*
        DONT set str_height, str_width, str_padding on base object         
        AVOID specified values here. Leave them undefined. Allow sub class to overidde undefined.
        //*/
        this.obj_domStyle=obj_ini.obj_domStyle;
        if(!this.obj_domStyle){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_domStyle={};//required
        }     
        //END INITIALIZE STYLE        

        //START INITIALIZE THEME
        //this.obj_theme=obj_ini.obj_theme;                      
        //END INITIALIZE THEME   
        if(!this.obj_theme){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_theme={};//required
        }     
        

        
    }    

    fn_setIDXDesign(){
        
        this.obj_design.str_idXDesign=obj_shared.fn_getUniqueId("myId");
        
    }

    //START CONTAINER FUNCTION
    fn_addItem(obj_ini){
        
        if(obj_ini==undefined){
            return;
        }
        
        if(this.obj_design.bln_dynamicPin){         
            obj_ini.obj_design.bln_dynamicPin=true;
        }

        let obj_item=this.fn_createChildObject(obj_ini);
        
        this.fn_createChildDom(obj_item);
        //creae dom object into HTML
        
        //END CREATE DOM ELEMENT        
        obj_item.fn_execute();
                    
        return obj_item;
    }

    fn_checkIni(obj_ini){

        let str_type, int_idRecord, bln_removeId;        

        int_idRecord=obj_ini.obj_design.int_idRecord;           
        str_type=obj_ini.obj_design.str_type;                           
        
        
        if(!obj_ini.obj_design.arr_item){            
            obj_ini=new Holder;            
            obj_ini.obj_design.int_idRecord=int_idRecord;           
            obj_ini.obj_design.str_type=str_type;                       
            //obj_shared.fn_enumerateObject(obj_ini, "test");            
        }        
        
        return obj_ini;
    }

    fn_createChildObject(obj_ini){

        let str_type, int_idRecord, obj_item, bln_removeId;        
        
        obj_ini=this.fn_checkIni(obj_ini);
        
        int_idRecord=obj_ini.obj_design.int_idRecord;           
        str_type=obj_ini.obj_design.str_type;                
        
        if(obj_ini){//see fi we can get the correct ini object, partucuarly to ensure the type is correct.
            if(obj_ini.obj_design){
                int_idRecord=parseInt(obj_ini.obj_design.int_idRecord);        
                let ObjectData=obj_shared.fn_getMapItem(obj_InstanceJSONMap,  int_idRecord);//get a reference to the the object that has been published from the db        
                if(ObjectData){
                    if(ObjectData.obj_design){
                        obj_ini=ObjectData;
                    }
                }
            }
        } 
        

        str_type=obj_ini.obj_design.str_type;                           
        //console.log("str_type: " + str_type);
        if(str_type==="theme"){//hide any theme                                 
            if(obj_ini.obj_domStyle){                
                obj_ini.obj_domStyle.display="none";            
            }
        }        
        
        try {                        
            obj_item = new (obj_ComponentMap.get(str_type))(obj_ini);            
            //obj_item = new (obj_ComponentMap.get(str_type))();            
        }        
        catch(err) {                           
            if(str_type!=="tag"){
                console.log("SUBSTITUTING Tag: " + obj_ini.obj_design.str_type);            
            }
            obj_item = new tag(obj_ini);                        
        }   
        
        //create the dom with the informaiton saved into parent component
        if(!obj_item){
            console.log("Error: Object Creation");
            return;
        }
        
        
        obj_item.fn_setParentComponent(this);        
        
        if(obj_item.obj_design.int_modeExecute===undefined){      //baseobjects will get parents modeExecute
            obj_item.obj_design.int_modeExecute=this.obj_design.int_modeExecute;              
        }              

        return obj_item;
    }

    fn_createChildDom(obj_item){//not overiddn

        let str_type=obj_item.fn_getType();              
        //let str_tag=obj_item.fn_getTag();

        //Following options:            
        //START CREATE DOM ELEMENT
        //To Do
        //1. Creating Own Tag                 
        //2. Use Exisitng Tag and Allow/DisAllow manipulation of this e.g color, padding etc
        //*/
        let int_index, int_remove=0;        
        switch(str_type){  
            case "tablerow"://assumes table is adding                                
                //POSITION DOM ELEMENT                
                int_index=this.obj_design.arr_item.length;
                this.obj_design.arr_item.splice(int_index, int_remove, obj_item);                
                obj_item.dom_obj = this.dom_obj.insertRow();                                
            break;            
            case "tablecell"://assumes row is adding
                //POSITION DOM ELEMENT                
                int_index=this.obj_design.arr_item.length;
                this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
                obj_item.dom_obj = this.dom_obj.insertCell();                
            break;                                    
            default:
                switch(str_type){//.nodeType
                    case "textnode":
                        obj_item.dom_obj = document.createTextNode(obj_item.obj_design.str_content);                        
                        break;
                    case "comment":
                    obj_item.dom_obj = document.createComment(obj_item.obj_design.str_content);                                                      
                        break;
                    default:
                        obj_item.dom_obj = document.createElement(obj_item.obj_design.str_tag);                                                      
                        break;
                }                                            
                //POSITION DOM ELEMENT                                
                this.fn_positionDomElement(obj_item);
                //We need to get the item dom into the page, as fn_create_self may be overriden        
        }
        
        obj_item.dom_objContent=obj_item.dom_obj;//potentially not necessary as this should be set in createSelf
        obj_item.bln_removeId=this.bln_removeId;        
    }

    fn_positionDomElement(obj_item){  
        //Part of  the Add Item Process
        //allows child item to be inserted at a position in the item array and the parent container
        
        let int_index, int_remove=0;
        let int_index_before, int_index_after, int_index_object;

        let bln_InsertPosition=obj_item.obj_holder.bln_InsertPosition;

        if(this.obj_holder.obj_insertNextTo){
            let obj_insertNextTo=this.obj_holder.obj_insertNextTo;
            int_index = this.fn_findItemIndex(obj_insertNextTo);
            obj_insertNextTo.dom_objContent.before(obj_item.dom_obj);
            this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
            this.obj_holder.obj_insertNextTo=false;
            return;

        }

        /*
        if(obj_clipboard){            
            let obj_insertNextTo=obj_clipboard.obj_holder.obj_insertNextTo;                        
            if(obj_insertNextTo){
                obj_item.fn_debug("insert item 1 : obj_item to insert")
                int_index = this.fn_findItemIndex(obj_insertNextTo);                                                        
                obj_insertNextTo.fn_debug("insert item: obj_insertNextTo")
                console.log("int_index: " + int_index);                
                //obj_item.fn_debug("insert item 2 : obj_item to insert")
                obj_insertNextTo.dom_objContent.before(obj_item.dom_obj);
                this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
                obj_clipboard.obj_holder.obj_insertNextTo=false;
                return;
            }
        }
        //*/
        
        if(bln_InsertPosition===undefined){
            bln_InsertPosition=true;
        }

        if(obj_item.obj_design.str_type==="theme"){
            bln_InsertPosition=false;
        }
        
        
        if(bln_InsertPosition){//End
            int_index=this.obj_design.arr_item.length;
            this.dom_objContent.append(obj_item.dom_obj);                
        }
        else{//Start
            int_index=0;
            this.dom_objContent.prepend(obj_item.dom_obj);
        }                

        this.obj_design.arr_item.splice(int_index, int_remove, obj_item);

        /* 
        //useful for future insert funciton ?
        if(obj_ini.obj_ItemTemplate){//to do with the mask maybe
        int_index_object = this.fn_findItemIndex(obj_ini.obj_ItemTemplate);
        if(bln_InsertPosition){//After
        int_index=int_index_object+1;
        obj_ini.obj_ItemTemplate.fn_positionAfter(obj_item);
        }
        else{//Before
        int_index=int_index_object;
        obj_ini.obj_ItemTemplate.dom_objContent.before(obj_item.dom_obj);
        }
        this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
        }
        //*/
    }
    //END CONTAINER FUNCTION
    
    
    //START CHILD FUNCTION
    fn_isElement(){return this.dom_obj.nodeType===1;}
    
    fn_execute(){//overidden by component object - but not called by component object
     // should always be overidden so not necxessay to have any funciton here
    }        

    fn_createSelf(){//can be overidden, but should be called 
        

        //dom object must be in place by now        

        if(!this.fn_isElement()){return;}        

        this.dom_objContent=this.dom_obj;//can be overidden to be another than own dom obj

        //let str_designMarker=obj_project.obj_holder.str_prefix;//needs to go into design object        
        //this.dom_obj.setAttribute("str_designMarker + "id"", this.obj_design.str_idXDesign);                            
        //this.dom_obj.setAttribute("idXDesign", this.obj_design.str_idXDesign);                    
        
        this.fn_setEventAttributes();        
        
        if(this.obj_design.str_linkId!==undefined){
            this.dom_obj.setAttribute("linkId", this.obj_design.str_linkId);                      
        }
        
        
        this.fn_setHTMLContent();
        

        //BY THIS POINT THE ITEM WILL HAVE AN ELEMENT, INSERTED IN THE DOM                
        this.fn_onLocateInDom();
        
    }
    fn_onLocateInDom(){//overidden to do nothing in project instance          
        //this is essential to fire on any published object.
        //called at end of create self
        //console.log(this.obj_design.str_type);        
        
        
        this.fn_ListenEvent();
    }  
    
    fn_beforeAddChildren(){        
    }

    fn_onOpenInstance(){//not overidden by component
        
        //quesiton: should we validate with project before or after loading children
        //currently it is before

        this.fn_beforeAddChildren();
        
        if(this.obj_design.arr_item.length===0){
            //for component, if no server trip, (due to recordid=0), length will be zero. Otherwise , the server trip will have completed, arr_item will be full
            //other objects can have default add children methods
            //therefoere we avoid the need to overide this for component using intiIdRecord=0            
            this.fn_bootChildren();                        
        }
        else{
          this.fn_loadChildren();//if obj_design.arr_item is in place, eg from JSON seriolization
        } 
        
        
        this.fn_onLoad();//validate //pulgins //etc after loading children
    }

    fn_loadChildren(){

        let obj_ini, obj_item;
        let arr_ini;
        arr_ini=this.obj_design.arr_item.slice();//creat ea temporary copy of obj_design.arr_item which will contain "ini objects"
        this.obj_design.arr_item=[];//reset this arr item to empty array .

        arr_ini.forEach(obj_ini => {            
            if(obj_ini){
                //obj_shared.fn_enumerateObject(obj_ini.obj_design, "BaseObject fn_loadChildren");                                                                
            }
            else{                                
                if (obj_ini === null){
                    console.log("BaseObject fn_loadChildren OBJ INI IS NULL");                                                
                }
            }
            obj_item=this.fn_addItem(obj_ini);//ServerSideItem or BootItem
            
            
         });

         
        /*
        let arr_item=this.obj_design.arr_item;
        if(arr_item.length){
            this.obj_holder.obj_lastItem=this.obj_design.arr_item[0];
        }
        //*/

    } 
    
    
    fn_onLoad(){//can be overriden , but should be called                      

        
        this.fn_applyFeatures();//apply style, them, domproperties etc // this appears to not ref to children
        this.fn_initializePlugins();//attach design helpers etc                
        this.fn_actionRegister();//attach design helpers etc                        
        
        //this is the end of the object creation process
        //this.obj_holder.bln_loaded=true; 
        let arr, obj_item
        arr=this.obj_design.arr_item;                        
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];                        
            obj_item.fn_onLoadParent();            
        }                   
        
    }   
    fn_initializePlugins(){//can be overidden                
        
        let bln_isBootMode=obj_project.fn_getisBootMode();        
        let dom_frameElement=window.frameElement;        
        if(!dom_frameElement){
            return;
        }
        let str_name=dom_frameElement.getAttribute("name");        
        if(str_name==="xdesign-frame" && !bln_isBootMode){//ie a project that is being designed}        
            if(this.obj_design.int_modeExecute<10){
                this.fn_initializePluginDesign();//can be overidden                
                this.obj_designDelegate.fn_setup();//must be 2 separatre functions                                
            }
        }
    }    
    fn_initializePluginDesign(){//overidden by ProjectInstance and GridItem                        
        this.obj_designDelegate=new DesignDelegate(this);                
    }
    fn_onLoadParent(){}//should be overidden        
    
    fn_actionRegister(){
        
        let obj_item, obj_container;
        
        if(this.obj_design.bln_registerAtContainer===true){
            obj_container=this.obj_holder.obj_container;        
            if(obj_container){                        
                obj_container.fn_registerContainedObject(this);                        
            }
        }        
        if(this.obj_design.str_nameRegistrator!=="notset"){                  
            obj_item=obj_project.fn_findItemByVariableName(this.obj_design.str_nameRegistrator);             
            if(obj_item){                                                
                obj_item.fn_registerObject(this);                        
            }
        }           
        if(this.obj_design.bln_registerAtProject===true &&(this!==obj_project)){              
            obj_item=false;  
            let str_idProject=this.obj_design.str_idProject;
            let str_idXDesign=this.obj_design.str_idXDesign;
            if(str_idProject && (str_idProject!==str_idXDesign)){
                obj_item=obj_project.fn_findItemById(str_idProject);
            }           
            if(!obj_item){
                obj_item=obj_project;
            }
            if(obj_item){                                     
                obj_item.fn_registerProjectObject(this);                                                    
            }
            
        }
    }
    
    fn_debugDesign(obj_design, str_title=""){                
        
        console.groupCollapsed(str_title);        
        console.log("int_idRecord: " + obj_design.int_idRecord);                
        console.log("str_idXDesign: " + obj_design.str_idXDesign);
        console.log("int_modeExecute: " + obj_design.int_modeExecute);                              
        console.log("bln_isLocalHome: " + obj_design.bln_isLocalHome);                              
        console.log("str_name: " + obj_design.str_name);        
        console.log("str_type: " + obj_design.str_type);        
        console.log("str_tag: " + obj_design.str_tag);        
        console.log("str_classList: " + obj_design.str_classList);        
        console.log("str_nameEventClick: " + obj_design.str_nameEventClick);        
        console.log("str_valueEventClick: " + obj_design.str_valueEventClick);                              
        console.groupEnd();
    }

    fn_debugDom(dom_obj, str_title=""){                
        
        if(!dom_obj){
            console.log("dom_obj is not yet in place");                    
            return;
        }
        console.groupCollapsed(str_title);                
        console.log("outerHTML: " + dom_obj.outerHTML);                
        console.groupEnd();
    }    

    fn_debugTypeItems(){
        let arr, obj_item
        arr=this.obj_design.arr_item;        
        this.fn_debug("DEBUG: " + this.obj_design.str_type);
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];
            obj_item.fn_debugItems();            
        }        
    }    

    fn_debug(str_title=""){                
        
        if(str_title===undefined){str_title=this.obj_design.str_name;}
        let str_name=this.obj_design.str_name;
        if(str_name===undefined){str_name="";}        
        if(str_name){str_title+=": " + str_name;}
        console.groupCollapsed(str_title);        
        console.log("typeof: " + typeof this);
        console.log("constructor: " + this.constructor.name);
        console.log("obj_designDelegate: " + this.obj_designDelegate);                
        this.fn_debugDesign(this.obj_design, "Design");              
        this.fn_debugDom(this.dom_obj, "Dom");   


        let arr, obj_item
        arr=this.obj_design.arr_item;        
        //this.fn_debug("DEBUG: " + this.obj_design.str_type);
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];
            if(obj_item.fn_debug){
                obj_item.fn_debug();            
            }
        }        
        console.groupEnd();
    }
    
    fn_debugAlert(){
        let s="";
        s+="typeof: " + typeof this + "\r";
        s+="str_idXDesign: " + this.obj_design.str_idXDesign + "\r";
        s+="str_type: " + this.obj_design.str_type + "\r";
        alert(s);
    }    
    

    fn_compileDependentClassList(){
        let str_val="";        
        str_val+=this.fn_listDependentClass();//Get List of Compone Ids
        str_val=str_val.slice(0,-1);         
        return str_val;
    }
    fn_listDependentClass(){        
        let str_val="";
        let arr=this.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];
            if(obj_item.bln_isComponent){
                str_val+=obj_item.fn_listClass();                
            }
            str_val+=obj_item.fn_listDependentClass();
        }                
        return str_val;
    }

    fn_listClass(){

        let str_val, str_classList, str_delim;
        str_val="";
        str_delim=",";                
        str_classList=this.obj_design.str_classList;        
        if(str_classList && str_classList!=="notset"){                
            str_val=str_classList.trim() + str_delim;        
        }
        return str_val;
    }
    
    fn_compileDependentId(){
        let str_val="";        
        str_val+=this.fn_listDependentId();//Get List of Compone Ids
        str_val=str_val.slice(0,-1);         
        return str_val;
    }

    fn_listDependentId(){        
        let str_val="";
        let arr=this.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];
            if(obj_item.bln_isComponent){
                str_val+=obj_item.fn_listId();                
            }
            //str_val+=obj_item.fn_listDependentId();
            //dont list child dependents as this may change by external edit of child components
            //we need to rely on a server side aclomergeration
        }                
        return str_val;
    }

    fn_listId(){

        let str_val, int_idRecord, str_delim;
        str_val="";
        str_delim=",";                
        int_idRecord=this.obj_design.int_idRecord;
        if(int_idRecord){                
            str_val=int_idRecord + str_delim;
            //this.fn_debug("Dependentid");
        }
        return str_val;
    }


    fn_validIdHistory(){

        let int_id_record=this.obj_design.int_idRecord;
        if(!int_id_record){return true;}
        let obj_container=this.fn_getParentComponent();
        if(!obj_container){return true;}
        let bln_exist=this.fn_searchIdHistory(obj_container, int_id_record);
        if(bln_exist){return false;}
        return true;
    }

    fn_searchIdHistory(obj_item, str_listIdRecordSearch){

        let bln_debug=false;      
        
        
        let int_idRecord=obj_item.obj_design.int_idRecord;
        
            
        str_listIdRecordSearch+="";
        int_idRecord+="";

        let str_testA="," + int_idRecord + ",";
        let str_testB="," + str_listIdRecordSearch + ",";        
        let bln_val=obj_shared.fn_inStr(str_testA, str_testB);        

        if(bln_debug){            
            console.log("str_listIdRecordSearch: " + str_listIdRecordSearch);
            console.log("int_idRecord: " + int_idRecord);
        }
        
        if(bln_val){            
            return true;
        }
        let obj_parent=obj_item.fn_getParentComponent();
        if(!obj_parent){return false;}

        return this.fn_searchIdHistory(obj_parent, str_listIdRecordSearch);        
    }

    fn_setParentComponent(obj_parent){        
        this.obj_holder.obj_container=obj_parent; 
    }
   

    fn_getParentComponent(){

        let obj_parent=this.obj_holder.obj_container;
        if(obj_parent && obj_parent.bln_isComponent){
            return obj_parent;
        }
        return false;

    }
    
    
    fn_popItem(){
        if(!this.dom_objContent.lastChild){
            return;
        }
        this.dom_objContent.removeChild(this.dom_obj.lastChild);
    }
    fn_positionAfter(obj_item){
        this.dom_objContent.after(obj_item.dom_obj);
    }    
    
    fn_removeChildren(){
        this.fn_removeAllItems();        
    }

    fn_bootChildren(){//in boot phase , and often overidden        
    }    

    fn_removeAllContent(){        
        this.obj_design.str_content="";
        this.dom_objContent.innerHTML="";
        this.dom_objContent.data="";
        this.obj_design.arr_item=[];        
    }  
    
    fn_removeAllItems(){//use this fuinction to completely clear the children of a container

        let arr, obj_item
        arr=this.obj_design.arr_item;
        this.fn_removeAllContent();//issue here ? as this will set arr to new array
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];            
            if(!obj_item){
                //alert("!obj_item");
            }
            else{
                this.fn_removeItem(obj_item);
            }
        }
    }     

    
    
    fn_removeItem(obj_item){

        obj_item.fn_removeAllItems();
        
        let arr, int_index;
        arr=this.obj_design.arr_item;
        int_index=0;
        if(arr.length){
            int_index=this.obj_design.arr_item.indexOf(obj_item);            
            if (int_index!==(-1)) {
                arr.splice(int_index, 1);                        
            }
            else{
                alert("should never see");//should never see
            }
        }
        obj_item.fn_onRemove();        
        return int_index;
    }   

    fn_onRemove(){
        this.dom_obj.remove();        
    }    

    
    
    fn_getIsContainer(bln_val){
        //equivalent of can have chlidren        
        return this.obj_design.bln_isContainer;
    }    
    
    fn_setIsContainer(bln_val){
        //equivalent of can have chlidren        
        this.obj_design.bln_isContainer=bln_val;                
    }    
    fn_copyArray(arr_source){
        return arr_source.slice();
    }   
    
    fn_getLastItem(){        

        let obj_target=this.obj_holder.obj_lastItem;
        let arr_item=this.obj_design.arr_item;        
        if(!arr_item.length){return false;}        
        if(!obj_target){
            obj_target=arr_item[0];
        }
        return obj_target;
    }     
    fn_getEndItem(){
        
        let arr, obj_item;
        arr=this.obj_design.arr_item;        
        obj_item=this;
        if(arr.length){
            obj_item=arr[arr.length-1];                        
            //obj_item=obj_item.fn_getEndItem();
        }
        return obj_item;
    }

    fn_getStartItem(){
        
        let arr, obj_item;
        arr=this.obj_design.arr_item;        
        obj_item=this;
        if(arr.length){
            obj_item=arr[0];                                    
        }
        return obj_item;
    }

    fn_getLimitLeft(){            
        
        let obj_container, int_index;
        obj_container=this.obj_holder.obj_container;
        if(!obj_container){return true;};
        int_index=obj_container.fn_findItemIndex(this);
        if(int_index<=0){return true;}            
        return false;
      }
      fn_getLimitRight(){                                
        let obj_container, int_index;
        obj_container=this.obj_holder.obj_container;
        if(!obj_container){return true;};
        int_index=obj_container.fn_findItemIndex(this);
        if(int_index===obj_container.obj_design.arr_item.length-1){return true;}
        return false;
      }      
      fn_getLimitTop(){                        
        let obj_container=this.obj_holder.obj_container;        
        if(!this.obj_holder.obj_container){return true;}      
        if(this===obj_project){return true;}                        
        return false;
      }
      fn_getLimitBottom(){                
        let arr=this.obj_design.arr_item;       
        let bln_has_grandChildren;
        if(!arr.length){return true;}        
        return false;
      }
      fn_getLimitGrandChild(){
        let bln_has_grandChild=this.fn_hasGrandChild();
        if(!bln_has_grandChild){return true;}        
        return false;
      }
      fn_hasGrandChild(){        
        let arr, int_val, obj_item;        
        arr=this.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];
            int_val=obj_item.obj_design.arr_item.length;
            if(int_val>0){return true;}
        }
        return false;
    }
    fn_setLevelLimit(){        
        
        let obj_levelLimit=new Object;              
        obj_levelLimit.obj_item=this;        
        obj_levelLimit.bln_limitTop=this.fn_getLimitTop();      
        obj_levelLimit.bln_limitLeft=this.fn_getLimitLeft();      
        obj_levelLimit.bln_limitRight=this.fn_getLimitRight();      
        obj_levelLimit.bln_limitBottom=this.fn_getLimitBottom();     
        obj_levelLimit.bln_limitGrandChild=this.fn_getLimitGrandChild();     
        obj_levelLimit.bln_hasAllLimit=false;
        if(obj_levelLimit.bln_limitTop && obj_levelLimit.bln_limitLeft && obj_levelLimit.bln_limitRight && obj_levelLimit.bln_limitBottom){
            obj_levelLimit.bln_hasAllLimit=true;            
        }
        this.obj_holder.obj_levelLimit=obj_levelLimit;        
    }

    fn_findItemByIdRecord(int_idRecord){        
        var obj_match, obj_item;
        if(this.obj_design.int_idRecord===int_idRecord){
            return this;
        }
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            obj_item=this.obj_design.arr_item[i];            
            obj_match=obj_item.fn_findItemByIdRecord(int_idRecord);
            if(obj_match){
                break;
            }
        }
        if(obj_match){return obj_match;}
        return false;
    }

    fn_isDuplicateObject(obj_a, obj_b){
        let bln_value=true;
        if(obj_a==obj_b){bln_value=false;}
        return bln_value;
    }
    
    fn_findItemById(str_value){        
        var obj_match, obj_item;
        if(this.obj_design.str_idXDesign==str_value){
            return this;
        }
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            obj_item=this.obj_design.arr_item[i];            
            obj_match=obj_item.fn_findItemById(str_value);
            if(obj_match){
                break;
            }
        }
        if(obj_match){return obj_match;}
        return false;
    }
    fn_findItemByVariableName(str_value, obj_exclude=false){        
        var obj_match, obj_item;

        
        if(this.obj_design.str_variableName===str_value){   
            if(obj_exclude && obj_exclude===this){}
            else return this;            
        }
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            obj_item=this.obj_design.arr_item[i];                         
            obj_match=obj_item.fn_findItemByVariableName(str_value, obj_exclude);
            if(obj_match){break;}
        }
        if(obj_match){return obj_match;}
        return false;
    }
    fn_findItemIndex(obj_item){
        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            if(arr[i]===obj_item){
                return i;
            }
        }
        return -1;
    }
    
    fn_applyTheme(){                
    }    

    fn_applyFeatures(){
        
        let obj_myTheme=obj_project.fn_getComponent("myRegisteredXTheme");
        if(this===obj_project)        {
            if(obj_myTheme){
                //console.log("PROJECT THEME: " + obj_myTheme.obj_design.str_name);
            }
        }        

        if(obj_myTheme && obj_project.obj_design.str_type!=="theme"){
                this.fn_applyMyTheme();               
        }
        else{
            //this.fn_debug("PROJECT THEME IS FALSE: " + obj_project.obj_design.str_type);
        }        
        
        
        this.fn_applyDesign();                                                                         
        this.fn_applyDomProperty();                                                                         
        //this.fn_applyDomAttribute();
        this.fn_applyStyle();       
    }

    fn_applyDesign(){//overidden        
    }
    
    fn_applyMyTheme(){         

        let str_type,  str_name, obj_myTheme, obj_myThemeItem, str_nameTheme;
        
        str_type=this.obj_design.str_type;        
        if(str_type==="theme"){return;}        
        
        obj_myTheme=obj_project.fn_getComponent("myRegisteredXTheme");                
        if(!obj_myTheme){
            //this.fn_debug("PROJECT THEME IS FALSE" + this.obj_design.str_name);
            return;
        }
        //this.fn_debug("THEME NAME: " + obj_myTheme.obj_design.str_name);
        
        str_name=this.obj_design.str_name;
        str_nameTheme=this.obj_design.str_nameTheme;        
        if(!str_nameTheme){str_nameTheme="notset"};

        if(!obj_myThemeItem){         
            obj_myThemeItem=this.fn_getMyThemeItem(obj_myTheme);            
            if(obj_myThemeItem){                
                //this.fn_debug("FOUND THEME VIA GET ITEM: " + obj_myThemeItem.obj_design.str_name);
            }
        }        

        if(!obj_myThemeItem){                          
            obj_myThemeItem=obj_myTheme.fn_getComponent(str_name);                    
            if(obj_myThemeItem){
                //this.fn_debug("FOUND THEME ITEM VIA GETCOMPONENT: " + obj_myThemeItem.obj_design.str_name);                        
            }            
        }        

        if(!obj_myThemeItem && str_nameTheme!=="notset"){            
            obj_myThemeItem=obj_myTheme.fn_getThemeViaTag(str_nameTheme);                                                        
            if(obj_myThemeItem){
                //this.fn_debug("FOUND THEME ITEM VIA TAG: " + obj_myThemeItem.obj_design.str_name);                        
            }
        }        
        
        if(!obj_myThemeItem){            
            obj_myThemeItem=obj_myTheme.fn_getThemeViaType(str_type);                                                     
            if(obj_myThemeItem){
                //this.fn_debug("FOUND THEME ITEM VIA TYPE: " + obj_myThemeItem.obj_design.str_name);                           
            }
        }
        
        if(obj_myThemeItem){            
            let str_display=this.obj_domStyle.display;
            this.obj_domStyle=this.fn_shallowCopyObject(obj_myThemeItem.obj_domStyle);
            this.obj_domStyle.display=str_display;            
        }
    }

    fn_getMyThemeItem(obj_myTheme){return false}//overidden, currently only by project

    fn_getThemeViaType(str_value){        

        var obj_match, obj_item;
        
        if(this.obj_design.bln_themeType){               
            if(this.obj_design.str_type===str_value){               
                return this;            
            }
        }
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            obj_item=this.obj_design.arr_item[i];                         
            obj_match=obj_item.fn_getThemeViaType(str_value);
            if(obj_match){break;}
        }
        if(obj_match){return obj_match;}
        return false;
    }
    
    fn_getThemeViaTag(str_value){        
        var obj_match, obj_item;
        
        if(this.obj_design.bln_themeType){               
            if(this.obj_design.str_nameTheme===str_value){               
                return this;                        
            }
        }
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            obj_item=this.obj_design.arr_item[i];                         
            obj_match=obj_item.fn_getThemeViaTag(str_value);
            if(obj_match){break;}
        }
        if(obj_match){return obj_match;}
        return false;
    }
    



    

    fn_applyStyle(){        
        let arr_Property=Object.entries(this.obj_domStyle);      
        for (let [str_key, foo_val] of arr_Property) {    
            //make sure camelCase is converted to hyphen prior to this function            
            //console.log(this.obj_design.str_name + ": " + str_key + ": " + foo_val);            
          this.fn_setStyleProperty(str_key, foo_val);          
        }
    }       

    fn_getStyleProperty(str_name){        
        str_name=obj_shared.fn_camelCaseToHyphen(str_name);// check camel case to hyphen
        return this.obj_domStyle[str_name];
    }

    fn_removeStyleAttribute(str_name){        
        if(this.dom_obj){
            this.dom_obj.style.removeProperty(str_name);
        }
        delete this.obj_domStyle[str_name];
    }

    fn_setStyleProperty(str_name, str_value, str_priority){

        delete this.obj_domStyle[str_name];//remove the item from virtualdom (e.g. camelCased property name)
        
        //*
        if(!str_value){//allow undefined for most style attributes                                      
            this.fn_removeStyleAttribute(str_name);            
            return;
        } 
        //*/     
        
        str_name=obj_shared.fn_camelCaseToHyphen(str_name);// check camel case to hyphen
        
        switch(this.fn_getType()){
            case "eazygrid":
                if(str_name==="background-color"){                    
                    this.fn_setItemStyleProperty("eazygrid", "background-color", str_value);        
                }
            break;            
        }        

        this.obj_domStyle[str_name]=str_value;        
        //if(this.dom_obj){this.dom_obj.style[str_name]=str_value;}
        if(this.dom_obj){this.dom_obj.style.setProperty(str_name, str_value, str_priority);}
    }    
    
    fn_applyDomProperty(){                     
        let arr_Property=Object.entries(this.obj_domProperty);      
        for (let [str_key, foo_val] of arr_Property) {                       
            this.fn_setDomProperty(str_key, foo_val);            
        }        
    }
    
    fn_getDomProperty(str_name){           
        return this.obj_domProperty[str_name];
    }

    fn_removeDomProperty(str_name){        
        if(this.dom_obj){            
            this.dom_obj.removeAttribute(str_name);               
            this.dom_obj[str_name]=undefined;                                      
        }
        delete this.obj_domProperty[str_name];
        //delete this.obj_domAttribute[str_name];
    }

    fn_setDomProperty(str_name, str_value){        
        
        delete this.obj_domProperty[str_name];//remove the item from virtualdom 
        
        this.obj_domProperty[str_name]=str_value;
        
        //currently in use, only by disabled
        if(str_name==="disabled"){
            //if(this.obj_design.bln_debug123){
                try{this["fn_beforeDomProperty_" + str_name](str_value);}
                catch(e){}
            //}
        }
        
        if(this.dom_obj){
            this.dom_obj.setAttribute(str_name, str_value);
            this.dom_obj[str_name]=str_value;//this is required for html button innerText to work              
        }                

        /*
        //currently nver required
        try{this["fn_onDomProperty_" + str_name](str_value);}        
        catch(e){}
        //*/
    }    
    fn_beforeDomProperty_disabled(bln_value){

        let obj_enabled;                        
        if(!this.obj_design.obj_enabled){            
            obj_enabled=new Object;        
            obj_enabled.pointerEvents=this.fn_getStyleProperty("pointer-events");                          
            if(obj_enabled.pointerEvents==="none"){obj_enabled.pointerEvents="auto";}
            obj_enabled.cursor=this.fn_getStyleProperty("cursor");                  
            obj_enabled.color=this.fn_getStyleProperty("color"); 
            if(obj_enabled.color===undefined){obj_enabled.color="black";}                        
            this.obj_design.obj_enabled=obj_enabled;
        }
        obj_enabled=this.obj_design.obj_enabled;

        //console.log("fn_beforeDomProperty_disabled: " + bln_value);

        switch(bln_value){
            case true:        
            
                this.fn_setStyleProperty("pointer-events", "none");                  
                this.fn_setStyleProperty("cursor", "default");                        
                this.fn_setStyleProperty("color", "gray");                 
                break;
            case false:                
                this.fn_setStyleProperty("pointer-events", obj_enabled.pointerEvents);          
                this.fn_setStyleProperty("cursor", obj_enabled.cursor);          
                this.fn_setStyleProperty("color", obj_enabled.color);                
                break;
        }
    }

    fn_setEnabled(bln_value=true){          

        if(!bln_value){            
            this.fn_setDisabled();
            return;
        }        
        
        this.fn_setDomProperty("disabled", false);                       
    }      

    fn_setDisabled(bln_value=true){ 
        
        if(!bln_value){
            this.fn_setEnabled();
            return;
        }        
        
        this.fn_setDomProperty("disabled", true);                          
    }        


    xfn_applyDomAttribute(){//domattributes setting all now via domproperty                     
        let arr_Property=Object.entries(this.obj_domAttribute);      
        for (let [str_key, foo_val] of arr_Property) {                       
            //this.fn_setDomAttribute(str_key, foo_val);                    
        }        
    }

    fn_removeDomAttribute(str_name){       
        if(this.dom_obj){                
            this.dom_obj.removeAttribute(str_name);       
        }
    }
    
    fn_setDomAttribute(str_name, str_value){//deprecated in favour of Property        

        delete this.obj_domAttribute[str_name];//remove the item from virtualdom 

        

        if(!str_value){//allow undefined for most style attributes                                      
            
            this.fn_removeDomAttribute(str_name);            
            return;
        }      

        this.obj_domAttribute[str_name]=str_value;                             

        if(this.dom_obj){
            this.dom_obj.setAttribute(str_name, str_value);
            this.dom_obj[str_name]=str_value;//this is required for html button innerText to work              
        }        
    }

    fn_setDesignProperty(str_name, str_value){                
        //console.log("fn_setDesignProperty: " + str_name + "[" + str_value + "]");
        this.obj_design[str_name]=str_value;
    }

    fn_getDesignProperty(str_name){                
        let foo_value=this.obj_design[str_name];
        foo_value=obj_shared.fn_parseBool(foo_value);            
        return foo_value;
    }
    fn_getType(){                
        return this.obj_design.str_type.toLowerCase();
    }
    fn_getTag(){                
        return this.obj_design.str_tag.toLowerCase();
    }    
    fn_setText(str_text){//can be overidden, but should be called
        if(str_text==="xdesignblank"){
            str_text="";              
          }                
        this.obj_design.str_text=str_text;                 
        this.fn_setDomProperty("innerText", str_text);                    
    }
    fn_getText(str_text){//should be overidden, but called
        return this.obj_design.str_text;
    }
    
    fn_setItemStyleProperty(str_type, str_name, str_value){          

        let obj_item, arr;
        arr=this.obj_design.arr_item;        
        for(var i=0;i<arr.length;i++){
            obj_item=arr[i];              
            if(obj_item.fn_getType()===str_type){                                
                obj_item.fn_setStyleProperty(str_name, str_value);      
            }
            obj_item.fn_setItemStyleProperty(str_type, str_name, str_value);
            
        }
    }

    

    
    
    fn_getHTMLContent(){        
        let str_content=this.obj_design.str_content;        
        return str_content;
    } 

    
    
    fn_setHTMLContent(){

        let str_content=this.fn_getContent();

        if(str_content==="nocontent"){
                return;
        }

        if(this.obj_design.arr_item.length){
            return;
        }
        this.fn_removeAllContent();        
        this.fn_setContent(str_content); 
        if(this.obj_design.str_tag==="script"){
            //this.dom_objContent.textContent=str_content;   
            console.log("str_content: " + str_content);
        }
        else{
            this.dom_objContent.innerHTML=str_content;        
        }
        
    }                
    fn_getContent(str_value){              
        
        str_value=this.obj_design.str_content;
        
        if(str_value==="xdesignblank"){
            return "";
        }
        else if(!str_value || str_value===undefined){
            return "nocontent";
        }        
        return str_value;

    }   
    fn_setContent(str_value){                
        if(str_value==="xdesignblank"){
            str_value="";
        }
        this.obj_design.str_content=str_value;
    }   

    fn_setDisplay(foo_val=true){  

        let str_value;
        if(foo_val===true){                          
            str_value="block";
        }
        else if(foo_val===false){                          
            str_value="none";
        }    
        else{
            str_value=foo_val;
        }    
        this.fn_setStyleProperty("display", str_value);                                
    }          
    fn_setVisibility(foo_val=true){  

        let str_value;
        if(foo_val===true){                          
            str_value="visible";
        }
        else if(foo_val===false){                          
            str_value="hidden";
        }    
        else{
            str_value=foo_val;
        }            
        this.fn_setStyleProperty("visibility", str_value);                                            
    }          
    
    
    
    

    fn_getNextLocalHome(){                        
        
        let bln_isLocalHome=this.fn_isLocalHome();
        let obj_parent=this.fn_getParentComponent();//parent or false        

        let obj_item=this;
        if(bln_isLocalHome && obj_parent){        
            obj_item=obj_parent;            
        }
        return obj_item.fn_getLocalHome();
    }    
    fn_getLocalHome(){        

        let bln_isLocalHome=this.fn_isLocalHome();
        let obj_parent=this.fn_getParentComponent();//parent or false
        if(bln_isLocalHome || !obj_parent){
            return this;
        }
        return obj_parent.fn_getLocalHome();        
    }  
    xfn_getNextLocalHome(){                
        return this.fn_getLocalHome(true);
    }    
    xfn_getLocalHome(bln_nextLocalHome=false){        

        let bln_isLocalHome=this.fn_isLocalHome();
        if(bln_isLocalHome){if(!bln_nextLocalHome){return this;}}

        let obj_parent=this.fn_getParentComponent();//parent or false
        if(!obj_parent){            
            return this;
        }
        return obj_parent.fn_getLocalHome();        
    }      
    fn_isLocalHome(){        
        return this.obj_design.bln_isLocalHome;
    }
    fn_setLocked(bln_status){//should be run on local home only 
        this.obj_design.bln_lockComponent=bln_status;
    }   
    fn_getLocked(){//should be run on local home only 
        if(this==obj_project){return false;}
        return obj_shared.fn_parseBool(this.obj_design.bln_lockComponent);//dont switch to getDesginAttrib as this may be called by a "ini object witout funcitons"        
    }        
}//END CLS
//END BaseObject.js


//START Component.js
class component extends BaseObject {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
    }
    fn_initialize(obj_ini){//COMPONENT: fn_initialize is called again upon component.openInstance from db
        super.fn_initialize(obj_ini);

        
        //START INITIALIZE DESIGN
        this.obj_design.int_idRecord=obj_ini.obj_design.int_idRecord;
        if(this.obj_design.int_idRecord==undefined){this.obj_design.int_idRecord=0;}
        
        if(this.obj_design.int_modeExecute===undefined){                                    
            this.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;        
            let dom_frameElement=window.frameElement;                
            if(dom_frameElement){
            let str_name=dom_frameElement.getAttribute("name");        
                if(str_name==="xdesign-frame"){//ie a project that is being designed}        
                    this.obj_design.int_modeExecute=this.obj_holder.int_modeReadOnly;                                
                    if(this.obj_design.int_idRecord===0){
                        this.obj_design.int_modeExecute=this.obj_holder.int_modeEdit;
                    }
                }
            }
        }  
        
        if(this.obj_design.str_type===undefined){this.obj_design.str_type="component";}                

        let str_name=this.obj_design.str_name;
        if(str_name==undefined){
            str_name="My " + this.obj_design.str_type;
            //str_name=obj_shared.fn_getUniqueId(str_name);
        }         
        this.fn_setName(str_name);
        this.fn_setRegisterAtProject(this.obj_design.bln_registerAtProject);
        this.fn_setRegisterAtContainer(this.obj_design.bln_registerAtContainer);
        

        if(this.obj_design.str_tag===undefined){this.obj_design.str_tag="component";}                                        
        if(this.fn_getIsContainer()==undefined){this.fn_setIsContainer(true);}        
        this.bln_isComponent=true;                
        if(!this.obj_design.str_classList){this.obj_design.str_classList="notset";}//undefined or empty string or false
        if(!this.obj_design.str_classExtend){this.obj_design.str_classExtend="notset";}//undefined or empty string or false                        
        if(!this.obj_design.str_createdDate){this.obj_design.str_createdDate=obj_shared.fn_getDate(obj_const.int_dateNow);}//undefined or empty string or false                
        if(!this.obj_design.str_modifiedDate){this.obj_design.str_modifiedDate=obj_shared.fn_getDate(obj_const.int_dateNow);}//undefined or empty string or false                

        
        
        
        
        this.obj_design.bln_listenClick=true;                        
        this.obj_holder.str_prefix="xDesign_";                
        
        //END INITIALIZE DESIGN

        //START INITIALIZE STYLE
        //if(this.fn_getStyleProperty("fontFamily")===undefined){this.obj_domStyle.fontFamily="Helvetica";}
        //END INITIALIZE STYLE
    }   
    
    fn_execute(){        

        if(!this.obj_design.int_idRecord){
            this.fn_stepEnd();
            return;
        }       
        
        if(!this.fn_validIdHistory()){
            this.fn_stepEnd();
            return;
        }   

        //check on client        
        
        if(this.fn_loadJSONInstanceFromClient()){                        
            //console.log("fn_loadJSONInstanceFromClient: " + this.obj_design.int_idRecord);
            this.fn_stepEnd();
            return;
        } 

        //goto to server
        this.fn_loadJSONInstanceFromServer();
    }

    fn_loadJSONInstanceFromServer(){      
        //we need to wait for trip back from server before loading any children
        this.obj_design.arr_item=[];            

        //console.log("fn_loadJSONInstanceFromServer: " + this.obj_design.int_idRecord);
        let obj_ini=new Holder;            
        let obj_AJAX=new AJAX(obj_ini);
        let obj_post=new Object;                         
        obj_post.URL=obj_path.fn_getURLServerFile("xdesign1", "server.php");
        obj_post.NotifierId=this.obj_design.str_idXDesign;                        
        obj_post.Action="getInstance";                
        obj_post.ActionCallBack="fn_loadJSONInstanceFromServerCallBack";                
        obj_post.RecordId=this.obj_design.int_idRecord;//could get complicated if obj_instance supplied                            
        obj_AJAX.fn_putPost(obj_post);        
    }
    fn_loadJSONInstanceFromServerCallBack(obj_post){        
        let int_id_record=obj_post.RecordId;                
        let ObjectData=obj_post.ObjectData; 
        if(obj_post.HasError && obj_post.ErrorMessage==="RecordIdNotExist"){                        
            this.fn_stepEnd();
            return;
        }        
        this.fn_loadJSONInstance(ObjectData);        
        this.fn_addToClientMap(int_id_record, ObjectData);                                     
        this.fn_stepEnd();
    }    
    fn_addToClientMap(int_id_record, ObjectData){                        
        obj_shared.fn_setMapItem(obj_InstanceJSONMap, int_id_record, ObjectData);                
        //obj_shared.fn_loopmap(obj_InstanceJSONMap);        
    }    
    fn_loadJSONInstanceFromClient(){
        let int_id_record=parseInt(this.obj_design.int_idRecord);                
        let ObjectData=obj_shared.fn_getMapItem(obj_InstanceJSONMap,  int_id_record);//get a reference to the the object that has been published from the db        
        return this.fn_loadJSONInstance(ObjectData);
    }
    fn_loadJSONInstance(ObjectData){ 

        if(!ObjectData){return false;}
        if(!ObjectData.obj_design){return true;}
        //indicate success, but dont initialize with a blank object                
        //may be a blank object if instance id has been renamed/deleted/corrupted etc on the server
        let NewObjectData=JSON.parse(JSON.stringify(ObjectData));//create a copy of the object that has been published from the db //not sure why
        NewObjectData.obj_design.int_modeExecute=this.obj_design.int_modeExecute;//Continuity of Mode                                                                                
        this.fn_initialize(NewObjectData);//initialize with self from db                                
        return true;
    }    
    fn_stepEnd(){        
        this.fn_createSelf();//create self                
        this.fn_onOpenInstance();//run  baseobvject onopeninstance
    } 

    //orig execute - deprecated
    fn_executeorgi(){//overides base object execute                
        if(this.obj_design.int_idRecord){
            this.fn_openInstance();}
        //grab instance first and intiialize                
        this.fn_createSelf();//create self                
        this.fn_onOpenInstance();//run  baseobvject onopeninstance
    }      
    fn_openInstanceorig(){//wont run on boot as will not have a record id        
        if(!this.fn_validIdHistory()){return;}
        let ObjectData=obj_InstanceJSONMap.get(parseInt(this.obj_design.int_idRecord));//get a reference to the the object that has been published from the db
        if(!ObjectData || (ObjectData && !ObjectData.obj_design)){return;}//dont intialize with blank object                
        let NewObjectData=JSON.parse(JSON.stringify(ObjectData));//create a copy of the object that has been published from the db
        NewObjectData.obj_design.int_modeExecute=this.obj_design.int_modeExecute;//Continuity of Mode                                                
        this.fn_initialize(NewObjectData);//initialize with self from db                                
    }    
    //orig execute - deprecated
    
    
    
    //START COMPONENT OPERATION FUNCTIONS  
    
    
    fn_getComponent(str_variableName){        
        
        let str_name="obj_" + this.fn_formatShortName(str_variableName);                                        
        return this.obj_holder[str_name];
    }      
    

    fn_getRecordStatus(){//deprecated, not used ?
        alert("check defunct")

        let arr, obj_item, bln_recordStatus;
        arr=this.obj_design.arr_item;
        
        if(this.bln_isComponent){
            if(!this.obj_design.int_idRecord){
                return false;
            }
        }      
        //*          
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];

            bln_recordStatus=obj_item.fn_getRecordStatus();
            if(!bln_recordStatus){
                obj_item.fn_debug("CHILD NOT SAVED");
                return false;
            }            
        } 
        //*/       
        return true;
    }    

    fn_onBeforeSave(){}//to be overidden

    fn_extends(str_nameClass){        

        this.obj_design.str_classExtend=str_nameClass;

        //this.fn_addClass(str_nameClass);        
        //this.fn_addClass(this.obj_design.str_type);        
    }

    fn_requires(str_nameClass){        
        this.fn_addClass(str_nameClass);        
    }

    fn_addClass(str_nameClass){ 
        let str_classList=this.obj_design.str_classList;
        let int_index;
        let s1, s2;
        s1=","+str_classList+",";
        s2=","+str_nameClass+",";
        int_index=s1.indexOf(s2);                
        if(int_index!==-1){
            return;
        }
        if(str_classList==="notset"){
            str_classList="";
        }
        if(str_classList!==""){
            str_classList+=",";            
        }
        str_classList+=str_nameClass;
        this.obj_design.str_classList=str_classList;        
    }
    
    fn_getType(){
        return this.obj_design.str_type;
    }          
    fn_setType(str_value){    

        if(str_value===""){str_value="tag";}                            
        str_value=this.fn_formatShortName(str_value);                    
        this.obj_design.str_type=str_value;
    }          
    fn_defaultNotSet(str_value){
        if(str_value===""){str_value="notset";}
        return str_value;
    }    
    fn_defaultNotSetDate(str_value){
        if(str_value===""){
            str_value=obj_shared.fn_getDate(obj_const.int_dateNow);
        }
        return str_value;
    }    
    fn_setClassExtend(str_value){
        str_value=this.fn_defaultNotSet(str_value);                
        str_value=this.fn_formatShortName(str_value);                    
        this.obj_design.str_classExtend=str_value;
    }
    fn_setLocationID(str_value){
        str_value=this.fn_defaultNotSet(str_value);        
        str_value=this.fn_formatShortName(str_value);                    
        this.obj_design.str_locationID=str_value;
    }
    fn_setCreatedDate(str_value){
        str_value=this.fn_defaultNotSetDate(str_value);                
        str_value=this.fn_formatShortDate(str_value);                    
        this.obj_design.str_createdDate=str_value;
    }
    fn_setModifiedDate(str_value){
        str_value=this.fn_defaultNotSetDate(str_value);                
        str_value=this.fn_formatShortDate(str_value);                    
        this.obj_design.str_modifiedDate=str_value;
    }
    fn_setClassList(str_value){        
        
        str_value=this.fn_defaultNotSet(str_value);        
        str_value=str_value.toLowerCase();
        str_value=obj_shared.fn_replace(str_value, " ", ",");                        
        str_value=obj_shared.fn_formatString(str_value, obj_const.int_alphaComma);                        
        str_value=obj_shared.fn_formatUniqueList(str_value);                
        this.obj_design.str_classList=str_value;
    }
    
    fn_getTag(){
        return this.obj_design.str_tag;
    }
    fn_setTag(str_value, bln_mandatory){
        if(str_value===""){str_value="component";}
        str_value=this.fn_formatShortName(str_value);        
        if(this.obj_design.str_tag===undefined || this.obj_design.str_tag==="component"){        
            this.obj_design.str_tag=str_value;      
        }              
        if(bln_mandatory){
            this.obj_design.str_tag=str_value;      
        }
        
    }    
    fn_getName(){
        return this.obj_design.str_name;
    }
    fn_setName(str_name){        
        this.obj_design.str_name=str_name;                
        let str_value=this.fn_formatShortName(this.obj_design.str_name);        
        this.fn_setVariableName(str_value);                                
    }
    fn_setVariableName(str_value){           
        this.obj_design.str_variableName=str_value;                    
    }
    fn_getVariableName(){        
        return this.obj_design.str_variableName;
    }    
    fn_formatShortName(str_value){                    
        str_value=str_value.toLowerCase().replace(/-/gi, "_");;                    
        str_value=obj_shared.fn_removeSpace(str_value);            
        str_value=obj_shared.fn_formatString(str_value, obj_const.int_alphaNumeric);                                      
        return str_value;
    }
    fn_formatShortDate(str_value){                    
        //str_value=str_value.toLowerCase().replace(/-/gi, "_");;                    
        //str_value=obj_shared.fn_removeSpace(str_value);            
        str_value=obj_shared.fn_formatDate(str_value);                                      
        return str_value;
    }

    /////////////////////START REGISTRATION EVENT
    fn_register(obj_item){ 
        let str_name;
        let str_variableName=obj_item.obj_design.str_variableName;                
        this.fn_registerName(obj_item, str_variableName);        
    }    
    fn_registerName(obj_item, str_variableName){ 
        let str_name;    
        str_name="obj_" + this.fn_formatShortName(str_variableName);                                
        this.obj_holder[str_name]=obj_item;                                
    }    
    /////////////////////END REGISTRATION EVENT
    ///////////////////// START REGISTRATOR EVENTS 
    fn_registerObject(obj_item){ //object is registering a child                  
        this.fn_register(obj_item);                
        this.fn_onRegisterItem(obj_item);
    }
    fn_registerContainedObject(obj_item){ //Container is registering a child          
        this.fn_register(obj_item);        
        this.fn_onRegisterContainedObject(obj_item);
    }
    fn_registerProjectObject(obj_item){  //Project is registering a child      
        if(obj_item===obj_project){//never see
            alert("PROJECT/CHILD ARE EQUAL");                                
            return;
        }
        if(obj_item===this){//never see
            alert("ATTEMPT TO SELF REGISTER PROJECT WITH PROJECTOBJECT");                                
            return;
        }
        
        this.fn_register(obj_item);        
        this.fn_onRegisterProjectItem(obj_item);
    }
    ///////////////////// END REGISTRATOR EVENTS 
    
    ///////////////////// START PARENT POST REGISTER EVENTS
    fn_onRegisterItem(obj_item){ //post register        
        //this.fn_debug("POST OBJECT REGISTRATION OF: " + obj_item.obj_design.str_name);
        obj_item.fn_onRegisterWithObject(this);
    }
    fn_onRegisterContainedObject(obj_item){        
        //this.fn_debug("POST CONTAINER REGISTRATION OF: " + obj_item.obj_design.str_name);
        obj_item.fn_onRegisterWithContainer(this);
    }
    fn_onRegisterProjectItem(obj_item){                        
        //this.fn_debug("POST PROJECT REGISTRATION OF: " + obj_item.obj_design.str_name);
        obj_item.fn_onRegisterWithProject(this);
        if(obj_item.obj_design.str_type==="theme"){                                
            this.fn_registerName(obj_item, "myRegisteredXTheme");                        
        }
    }
    ///////////////////// END PARENT POST REGISTER EVENTS
    ///////////////////// START CHILD POST REGISTER EVENTS
    fn_onRegisterWithObject(obj_registrator){//post register
        this.obj_holder.obj_registrator=obj_registrator;        
    }
    fn_onRegisterWithContainer(obj_container){//post register
        //
    }
    fn_onRegisterWithProject(obj_regisratorProject){//post register        
        this.obj_holder.obj_regisratorProject=obj_regisratorProject;                
        //
    }    
    ///////////////////// END CHILD POST REGISTER EVENTS
    
    /////////////////////START REGISTRATION GETTER SETTER
    fn_setRegisterAtProject(bln_value){           
        if(bln_value==undefined){bln_value=false;}        
        this.obj_design.bln_registerAtProject=bln_value;                    
    }
    fn_getRegisterAtProject(){
        return this.obj_design.bln_registerAtProject;
    }
    fn_setRegisterAtContainer(bln_value){           
        if(bln_value==undefined){bln_value=false;}        
        this.obj_design.bln_registerAtContainer=bln_value;                    
    }
    fn_getRegisterAtContainer(){
        return this.obj_design.bln_registerAtContainer;
    }
    /////////////////////END REGISTRATION GETTER SETTER
    
    fn_setTypeable(bln_value){           
        if(bln_value==undefined){bln_value=false;}        
        this.obj_design.bln_typeable=bln_value;                    
    }
    fn_getTypeable(bln_value){                   
        return this.obj_design.bln_typeable;                    
    }
    
    
    //START COMPONENT EVENT HANDLING - CONSIDER MOVING to BASEOBJECT IF NECESSARY    
    fn_ListenEvent(){
        //allows this object to catch the event     
        //called on LocateInDom
        
        let that=this;

        if(this.obj_design.bln_listenClick){                    
            this.dom_obj.addEventListener('click', function(event){                                       
                //event.preventDefault();
                that.fn_setEvent(event);                
                that.fn_onClick();
                if(that===obj_project){             
                    that.fn_unsetEvent();      
                  }
            });
        }
        
        if(this.obj_design.bln_listenChange){                    
            this.dom_obj.addEventListener('change', function(event){                                       
                //event.preventDefault();
                obj_project.obj_nativeEvent=event;
                that.fn_onChange();                
            });
        }        
    }
    fn_setEvent(event){    
            
        if(!obj_project.obj_projectEvent){                  
            obj_project.obj_nativeEvent=event;
          obj_project.obj_projectEvent=this;          
        }           
        
      }
      fn_unsetEvent(){              
          obj_project.obj_nativeEvent=false;
          obj_project.obj_projectEvent=false;
        
      }
    fn_onClick(){    
        //must call this funciton - perhaps a subclass has it - check
        //canonot call fn_event here as wrong obj_projectEvent will be registered         
        //this.fn_event();                
    }
    fn_onChange(){               
        //must call this funciton - perhaps a subclass has it - check        
        //must call fn_event here - perhaps a subclass is relying on  it - check        
        this.fn_event();                
    }
    fn_event(){            
        obj_project.obj_projectEvent=this;
    }              
    
    fn_getvalueEvent(o_target, str_nameEvent){        
        //console.log("str_nameEvent: " + str_nameEvent);
        //console.log("o_target: " + o_target);
        if(!o_target){
            return;
        }
        let str_valueEvent=o_target.getAttribute(str_nameEvent);
        /*
        console.log(o_target.outerHTML);
        console.log("str_nameEvent: " + str_nameEvent);        
        console.log("str_valueEvent: " + str_valueEvent);
        //*/
        return str_valueEvent;
    }
    fn_event_call(str_nameEvent){
        
        let e, str_valueEvent;
        e=window.event;
        //e=obj_project.obj_nativeEvent;        
        str_valueEvent=this.fn_getvalueEvent(e.target, str_nameEvent);        
        if(!str_valueEvent){            
            str_valueEvent=this.fn_getvalueEvent(e.target.parentNode, str_nameEvent);
        }              
        
        
        if(!str_valueEvent){
            //this.fn_unsetEvent();                
            return;
        }        
        try{
            this[str_valueEvent]();
        }
        catch(e){
            alert("fn_event_call error: " + str_nameEvent + ": " + str_valueEvent);
            console.log(e);
        }
        //this.fn_unsetEvent();                

    }    

    fn_setEventAttributes(){//allows parent component to catch the event via fn_event_call
        
        // this allows the event to be regsitered to a parent component, than the child object the event occurred on                                         
        let str_name, str_value;

        str_name=this.obj_design.str_nameEventClick;
        str_value=this.obj_design.str_valueEventClick;
        if(str_name!==undefined && str_name!=="notset"){            
            //this.dom_obj.setAttribute(str_name, str_value);
            this.fn_setDomProperty(str_name, str_value);                        
        }        
        
        str_name=this.obj_design.str_nameEventChange;
        str_value=this.obj_design.str_valueEventChange;
        if(str_name!==undefined){            
            //this.dom_obj.setAttribute(str_name, str_value);
            this.fn_setDomProperty(str_name, str_value);                        
        }
    }        
    //END COMPONENT EVENT HANDLING
    //END COMPONENT OPERATION FUNCTIONS
}//END CLS
//END Component.js


//START AJAX.js
class AJAX extends component {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
    }
    fn_initialize(obj_ini){
        super.fn_initialize(obj_ini);

        this.obj_holder.bln_debug=true;
        //this.obj_design.bln_hiddenProjectPin=true;    
    }
    
    ///START AJAX     
    fn_putPost(obj_post){
        
        obj_post.Direction="SEND";
        if(obj_post.Action===undefined){      
        console.log("Error: Data Put Post: Action is not specified");
        return;
        }

        
        this.fn_debugServerPost(obj_post, "");
        
        
        if(obj_post.URL===undefined){
            console.log("obj_post.URL is undefined");        
            return;
        }

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        obj_post.method="POST";
        obj_post.headers=myHeaders;
        obj_post.body=JSON.stringify(obj_post);
        
        this.fn_runDataFetch(obj_post);
    }

    fn_runDataFetch(obj_post){

        fetch(obj_post.URL, obj_post)
        .then(Response=> {
            //this.fn_debugServerResponse(Response, true);
            return Response.json();
        })
        .then(data => {            
            this.fn_putPostCallbackFetch(data);
            //console.log(data);
        })
        .catch(err => {
            console.log(err);
            console.log("obj_post.URL: " + obj_post.URL);                        
            console.log("obj_post.body: " + obj_post.body);
            //this.fn_debugServerResponse(Response, true);
        })
        
    }

    fn_AJAXLocateObjectInstance(obj_post){//generally overidden
        let int_index;

        obj_post.ObjectInstance=false;
        int_index=obj_post.DesignId.indexOf("myId");
        if(int_index!==-1){                            
            obj_post.ObjectInstance=obj_project.fn_findItemById(obj_post.DesignId);//try to find in own Project        
        }       
        return obj_post.ObjectInstance;
    }

    fn_AJAXLocateObjectNotifier(obj_post){        
        obj_post.ObjectNotifier=false; 
        //console.log("obj_post.NotifierId: " + obj_post.NotifierId);       
        obj_post.ObjectNotifier=obj_project.fn_findItemById(obj_post.NotifierId);                                        
        return obj_post.ObjectNotifier;
    }

    fn_putPostCallbackFetch(data){
        let obj_post=this.fn_formatPostFetch(data);            
        
        if(obj_post.HasError){            
            console.log("HasError: " + obj_post.ErrorMessage);
            return;
        }

        obj_post.ObjectInstance=this.fn_AJAXLocateObjectInstance(obj_post);
        obj_post.ObjectNotifier=this.fn_AJAXLocateObjectNotifier(obj_post);
        
        this.fn_callbackFetch(obj_post);        
    }    
    
    fn_callbackFetch(obj_post){      
        let obj_notifier, str_action, str_actionCallback;   
        str_action=obj_post.Action;                
        str_actionCallback=obj_post.ActionCallBack;      

        obj_notifier=this;
        if(obj_notifier){            
            if(obj_notifier[str_action]){
                obj_notifier[str_action](obj_post);
            }        
        }
        
        obj_notifier=obj_post.ObjectNotifier;        
        if(obj_notifier){                        
            //obj_notifier.fn_callbackFetch(obj_post);
            if(obj_notifier[str_actionCallback]){
                obj_notifier[str_actionCallback](obj_post);
            }
        }

        obj_post.AuthorizeUserStatus=obj_shared.fn_parseBool(obj_post.AuthorizeUserStatus);
        //console.log("ajax obj_post.AuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
        if(!obj_post.AuthorizeUserStatus){
            //console.log("ajax  obj_post.AuthorizeUserStatus is false");
            this.fn_onUnAuthorizeUserStatus(obj_post);            
        }
        else{
            //console.log("ajax  obj_post.AuthorizeUserStatus is true");
            this.fn_onAuthorizeUserStatus(obj_post);            
        }
    }
    fn_onUnAuthorizeUserStatus(obj_post){
        console.log("OVERIDDEN - SHOULD NEVER SEE fn_onUnAuthorizeUserStatus");
    }    
    fn_onAuthorizeUserStatus(obj_post){
        console.log("OVERIDDEN - SHOULD NEVER SEE fn_onAuthorizeUserStatus");
    }    
    
    fn_formatPostFetch(obj_post, bln_expanded=false){//could this be overriden to allow for applicaiton specific processing

        let bln_debug =false;

        obj_post.Direction="RECEIVE";  
        if(bln_debug){
            console.log("BEFORE DESERIALIZE");
            console.log("typeof obj_post: " + typeof obj_post);
            console.log("typeof obj_post.ObjectData: " + typeof obj_post.ObjectData);
            console.log("typeof obj_post.RowData: " + typeof obj_post.RowData);
        }        

        if(bln_debug){
            obj_shared.fn_debug(obj_post, "obj_post");
        }
    

        obj_post.ObjectData=obj_myJson.fn_deserialize(obj_post.ObjectData, "ObjectData");          
        obj_post.RowData=obj_myJson.fn_deserialize(obj_post.RowData, "RowData");//Array of  Recordset Rows          
        //if(!obj_post.DesignId){obj_post.DesignId="";}
        

        if(bln_debug){
            console.log("AFTER DESERIALIZE");
            console.log("typeof obj_post: " + typeof obj_post);
            console.log("typeof obj_post.ObjectData: " + typeof obj_post.ObjectData);
            console.log("typeof obj_post.RowData: " + typeof obj_post.RowData);
        }        

        if(Array.isArray(obj_post.RowData)){
            obj_post.RowObject=obj_post.RowData[0];//1st Row of RecordSet, for handy access ? otheriwse just use obj_post.RowData[0]
        }
        
        this.fn_debugServerPost(obj_post, "");
        

        return obj_post;
    }


    fn_actionSerialize(obj_myObject){                  
        

        /*/
        let fn_serializeReplacer;      
            this.fn_serializeReplacer=this.fn_serializeReplacerDefault;
            if(obj_myObject.fn_serializeReplacer!==undefined){        
                this.fn_serializeReplacer=obj_myObject.fn_serializeReplacer;
            }      
            
        //*/
        this.obj_myObject=obj_myObject;
        let str_json=JSON.stringify(obj_myObject, this.fn_mySerializeReplacer());                                  
        return str_json;      
    }
    fn_deserialize(obj_post, str_json, str_message){      
        let obj_json={};
        try {
        obj_json=JSON.parse(str_json);
        } catch (error) {
            console.error("*****START ERROR AJAX DeSerialize*****");            
            console.error("message: " + str_message);
            console.error("Error: " + error);
            console.error("str_json: " + str_json);
            console.error("*****END ERROR AJAX DeSerialize*****\n\n");
        }      
        return obj_json;
    }
    fn_formatPost(){//to be overriden by component.
        let obj_post=new Object;         
        return obj_post;
    }       

    fn_debugServerPost(obj_post, str_title){//to be overidden by component
    }
}//END CLS
//END AJAX.js


//START Tag.js
class tag extends component{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);        

    //this.obj_design.str_type="tag";      
    this.obj_design.str_type=obj_ini.obj_design.str_type;    
    this.obj_design.str_tag=obj_ini.obj_design.str_tag;    
    this.obj_design.bln_isGenericTag=true;//maybe need in the future as type is now set to be whatever is requested, rather than tag
    if(this.obj_design.str_type===undefined){
      alert("this.obj_design.str_type===undefined");
      this.obj_design.str_type="tag";
    }        
    if(this.obj_design.str_tag===undefined){
      alert("this.obj_design.str_tag===undefined");
      this.obj_design.str_tag="tag";
    }        

    this.obj_design.blnIsTag=true;

    if(this.obj_design.tagTitle!==undefined){
      alert(this.obj_design.tagTitle)
      this.obj_domProperty.innerText=this.obj_design.tagTitle;      
      this.obj_design.str_tag=this.obj_design.tagTitle;            
    }    
    this.fn_setIsContainer(obj_ini.obj_design.bln_isContainer);
  }        

  //cannot call fn_onClick here this as otherwise the wrong "tag" will likely be set   

}//END CLS
//END Tag.js


//START Debug.js
  class Debug {
    constructor() {      
    }        

    fn_debugServerResponse(Response, bln_expanded=false){        

        
        let str_title="DEBUG SERVER RESPONSE";
        //if(!bln_expanded){console.groupCollapsed(str_title);}
        //else{console.group(str_title);}
        console.group(str_title);

        console.log("Response.headers: " + Response.headers);
        console.log("Response.ok: " + Response.ok);
        console.log("Response.redirected : " + Response.redirected);
        console.log("Response.status : " + Response.status);
        console.log("Response.statusText : " + Response.statusText);
        console.log("Response.trailers : " + Response.trailers);
        console.log("Response.type : " + Response.type);
        console.log("Response.url : " + Response.url);
        console.log("Response.useFinalURL : " + Response.useFinalURL);
        //console.log("Response.body : " + Response.body);
        //console.log("Response.bodyUsed : " + Response.bodyUsed);
        //console.log("Response.formData : " + Response.formData());
        //console.log("Response.json : " + Response.json());
        //console.log("Response.text : " + Response.text());
        console.groupEnd();

    }    
}//END CLS


//END Debug.js


//START myJSON.js
class myJSON  {
    constructor() {      
    }
    fn_serialize(obj_myObject){                  
      let fn_serializeReplacer;      
      this.fn_serializeReplacer=this.fn_serializeReplacerDefault;
      if(obj_myObject.fn_serializeReplacer!==undefined){        
        this.fn_serializeReplacer=obj_myObject.fn_serializeReplacer;
      }            
      this.obj_myObject=obj_myObject;
      let str_json=JSON.stringify(obj_myObject, this.fn_serializeReplacer())
      str_json=str_json.replace("xcludex", );
      
      return str_json;      
    }
    fn_deserialize(str_json, str_message){  
      
      let bln_debug =false;
      
      let obj_json={};
      try {
        obj_json=JSON.parse(str_json);
      } catch (error) {
          console.error("*****START ERROR myJSON DeSerialize*****");          
          console.error("ClientSide Information: " + str_message);
          console.error("Error: " + error);
          console.error("str_json: " + str_json);          
          console.error("*****END ERROR myJSON DeSerialize*****\n\n");
      }      
      return obj_json;
    }
    fn_serializeReplacerDefault = () => {
      //myJSON default serialize object
      
        const seen = new WeakSet();
        return (key, value) => {
          switch(key){
              case "obj_ini":
              return undefined;
              break;
          }
          //console.log(key + ": " + value);
          if (typeof value === "object" && value !== null) {

              //fn_enumerateObject(value, "myJSON fn_serializeReplacerDefault");
              //const found = this.arr_exclude.find(element => element === value);
              //if (found) {return "";}
              if (seen.has(value)) {
                return "circular";
                //return;
              }
              seen.add(value);
          }
          return value;
        };
    };
  }//END CLS

//END myJSON.js


//START Main.js
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
//END Main.js

