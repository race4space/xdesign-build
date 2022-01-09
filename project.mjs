

/*START COMPONENT//*/
/*id: 222932//*/
/*type: RunTimeCode//*/

//START UserSettings.js
const idXdesignTarget="xdesign-target";
//END UserSettings.js


//START Path.js
class Path {  
  constructor() {  
    this.str_path_document_root="";//client side therefore blank       
    this.str_name_folder_app="app";             
    this.str_name_folder_asset="asset";        
    this.str_name_folder_component="component";
    this.str_name_folder_server="server";          
    this.str_path_folder_app=this.str_path_document_root+"/"+this.str_name_folder_app;                                  
  } 
  fn_getURLAssetFile(str_name_app, str_name_file){    
    return this.str_path_folder_app+"/"+str_name_app+"/"+this.str_name_folder_asset+"/"+str_name_file;        
  }
  fn_getURLComponentFile(str_name_app, str_name_file){    
    return this.str_path_folder_app+"/"+str_name_app+"/"+this.str_name_folder_component+"/"+str_name_file;    
  }    
  fn_getURLServerFile(str_name_app, str_name_file){
    return this.str_path_folder_app+"/"+str_name_app+"/"+this.str_name_folder_server+"/"+str_name_file;    
  }
}
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

        if(this.obj_design.str_idXDesign==undefined){this.obj_design.str_idXDesign=obj_shared.fn_getUniqueId("myId");}                
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
            //console.log("fn_build: " + this.obj_design.str_type);
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

        //console.log("fn_beforeDomProperty__disabled: " + bln_value);

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
        obj_post.URL=obj_path.fn_getURLServerFile(obj_project.obj_design.str_name, "server.php");
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
    fn_onRegisterWithProject(obj_project){//post register
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

        if(this.obj_holder.bln_debug){
            this.fn_debugServerPost(obj_post, "");
        }
        
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
            //console.log(data)
        })
        .catch(err => {
            console.log(err);
            console.log("obj_post.URL: " + obj_post.URL);            
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
        obj_post.ObjectNotifier=obj_project.fn_findItemById(obj_post.NotifierId);                                        
        return obj_post.ObjectNotifier;
    }

    fn_putPostCallbackFetch(data){
        let obj_post=this.fn_formatPostFetch(data);    
        let int_index, obj_notifier, str_action, str_actionCallback; 
        
        if(obj_post.HasError){            
            console.log("HasError: " + obj_post.ErrorMessage);
            return;
        }

        obj_post.ObjectInstance=this.fn_AJAXLocateObjectInstance(obj_post);
        obj_post.ObjectNotifier=this.fn_AJAXLocateObjectNotifier(obj_post);
        

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
            if(obj_notifier[str_actionCallback]){
                obj_notifier[str_actionCallback](obj_post);
            }        
        }

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

        if(bln_debug){
            console.log("AFTER DESERIALIZE");
            console.log("typeof obj_post: " + typeof obj_post);
            console.log("typeof obj_post.ObjectData: " + typeof obj_post.ObjectData);
            console.log("typeof obj_post.RowData: " + typeof obj_post.RowData);
        }        

        if(Array.isArray(obj_post.RowData)){
            obj_post.RowObject=obj_post.RowData[0];//1st Row of RecordSet, for handy access ? otheriwse just use obj_post.RowData[0]
        }
        if(this.obj_holder.bln_debug){
            this.fn_debugServerPost(obj_post, "");
        }

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


/*id: 222932//*/
/*type: RunTimeCode//*/
/*END COMPONENT//*/






//START XTRA CLASSES

/*START COMPONENT//*/
/*id: 223001//*/
/*type: button//*/
class button extends component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.fn_setType("button");      
      this.fn_setTag("button", true);   
      this.fn_setTypeable(true);                     

      this.obj_design.bln_listenClick=true;                      

      if(this.obj_design.str_text===undefined){this.obj_design.str_text=obj_shared.fn_formatString(this.obj_design.str_name, obj_const.int_alpha);}                  
      if(this.obj_design.str_content===""){this.obj_design.str_content=this.obj_design.str_text;}                      

      this.fn_setIsContainer(false);
      
      //END INITIALIZE DESIGN
      
      //START INITIALIZE STYLE            
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}      
      if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                  
      if(this.obj_domStyle.color===undefined){this.obj_domStyle.color="black";}      
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
      if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="1px";}
      if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}        
      //END INITIALIZE STYLE            

      //this.obj_domProperty.disabled=false;
      
    }         
    fn_onClick(){                  
      //this.fn_event();                
    }    
  
  fn_setHTMLContent(){
    super.fn_setHTMLContent();        
    this.fn_setText(this.obj_design.str_text);                
  }            
}//END CLS
//END BUTTON

/*id: 223001//*/
/*type: button//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223021//*/
/*type: tablecell//*/
class tablecell extends component {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.fn_setType("tablecell");      
      this.fn_setTag("td", true);                  

      //START INITIALIZE DOM        
      //if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="1px solid black";}                
      //END INITIALIZE DOM        
      
      //START INITIALIZE STYLE        
      //if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}                   
    
      this.fn_setIsContainer(true);      
      //END INITIALIZE STYLE 
    }     
    xfn_applyTheme(){        
      
      super.fn_applyTheme();      
      this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          
      this.fn_setStyleProperty("color", this.obj_theme.highlightColor);          
      this.fn_setStyleProperty("border", this.obj_theme.cellBorder);                
      this.fn_setStyleProperty("padding", this.obj_theme.cellPadding);                
  } 
  fn_locateItem(str_idXDesign, str_type){
    let arr, obj_item;
    arr=this.obj_design.arr_item;
    for(let i=0;i<arr.length;i++){
        obj_item=arr[i];     
        
        if(obj_item.fn_getType()===str_type){
          if(obj_item.obj_design.str_idXDesign==str_idXDesign){
            return obj_item;
          }
          if(obj_item.obj_design.str_linkId==str_idXDesign){
            return obj_item;
          }
        }
    }
    return false;
  }   
  
}//END CLS
//END tablecell

/*id: 223021//*/
/*type: tablecell//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223022//*/
/*type: tableheader//*/
class tableheader extends tablecell {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    }  
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);      

      this.fn_setType("tableheader");      
      this.fn_setTag("th", true);                  

      this.fn_setIsContainer(true);      
    }
    xfn_applyTheme(){        
      super.fn_applyTheme();
      
      this.fn_setStyleProperty("background-color", "");          
      this.fn_setStyleProperty("border", "");                
      //this.fn_setStyleProperty("background-color", this.obj_theme.headingBackgroundColor);                
      this.fn_setStyleProperty("color", this.obj_theme.headingTextColor);          
  }   
    
}//END CLS
/*id: 223022//*/
/*type: tableheader//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223023//*/
/*type: tablerow//*/
class tablerow extends component{
    constructor(obj_ini) {            
      super(obj_ini); // call the super class constructor                
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.fn_setType("tablerow");      
      this.fn_setTag("tr", true);                  

      //START INITIALIZE DESIGN      
      //END INITIALIZE DESIGN

      this.fn_setIsContainer(true);      
      
    }       
    fn_addItem(obj_ini){
      let obj_item;  

      if(obj_ini.obj_design.str_type===undefined){
        obj_ini.obj_design.str_type="tablecell";                         
      }
      obj_item=super.fn_addItem(obj_ini);//CallSuper          
      return obj_item;
    }
    fn_setCellStyle(str_name, str_value){

      let arr, obj_item;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_item.fn_setStyleProperty(str_name, str_value);            
      }
    }
    fn_locateItem(str_idXDesign, str_type){
      let arr, obj_item, obj_locate;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_locate=obj_item.fn_locateItem(str_idXDesign, str_type);            
          if(obj_locate){
            return obj_locate;
          }
      }
      return false;
    }
}//END CLS


/*id: 223023//*/
/*type: tablerow//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223012//*/
/*type: input//*/
class input extends component {
    constructor(obj_ini) {      
      super(obj_ini);
    }        
    fn_initialize(obj_ini){
      
      super.fn_initialize(obj_ini);
      this.fn_setType("input");      
      this.fn_setTag("input", true);                                    
      this.obj_design.bln_listenChange=true;
      this.obj_design.bln_listenClick=true;
      this.fn_setIsContainer(false);
      
  }     
  fn_getValue(){        
    let str_value=this.fn_getDomProperty("value")+"";
    return str_value;    
  }
  fn_setValue(str_value){ 
    str_value+="";    
    this.fn_setDomProperty("value", str_value);        
  }  
  fn_setPlaceholder(str_value){ 
    str_value+="";    
    this.fn_setDomProperty("placeholder", str_value);        
  }  
  fn_getPlaceholder(){       
    return this.fn_getDomProperty("placeholder");        
  }  
  
  
  fn_onClick(){             
  }
  fn_onChange(){             
    super.fn_onChange();                
    this.fn_setDomProperty("value", this.dom_obj.value);            
  }
  
}//END CLS
//END INPUT

/*id: 223012//*/
/*type: input//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223020//*/
/*type: table//*/
class table extends component {
    constructor(obj_ini) {      
      super(obj_ini); // call the super class constructor        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      this.fn_setType("table");      
      this.fn_setTag("table", true); 
      
      this.fn_requires("tablerow");          
      this.fn_requires("tablecell");          
      this.fn_requires("tableheader");          

      //START INITIALIZE DESIGN      
      //END INITIALIZE DESIGN

      //START INITIALIZE DOM          
      //END INITIALIZE DOM        
      this.fn_setIsContainer(true);      
    }       
    fn_addItem(obj_ini=false){
      let obj_item;        
      if(!obj_ini){
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="tablerow";                   
      }      
      obj_item=super.fn_addItem(obj_ini);//CallSuper          
      return obj_item;
    }
    fn_setCellStyle(str_name, str_value){
      let arr, obj_item;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_item.fn_setCellStyle(str_name, str_value);            
      }
    }
    fn_locateItem(str_idXDesign, str_type){
      if(str_idXDesign===undefined){return;}
      if(str_idXDesign===""){return;}
      let arr, obj_item, obj_locate;
      arr=this.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){
          obj_item=arr[i];              
          obj_locate=obj_item.fn_locateItem(str_idXDesign, str_type);            
          if(obj_locate){
            return obj_locate;
          }
      }
      return false;

    }
}//END CLS
//END IMG

/*id: 223020//*/
/*type: table//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223056//*/
/*type: xdesign1_propertysheet//*/

      //XSTART component/xdesign1_propertysheet
        class xdesign1_propertysheet extends tag{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertysheet");      
            this.fn_setTag("xdesign1_propertysheet");            
            this.obj_design.bln_isGenericTag=true;            

            this.fn_requires("input");     
            this.fn_requires("table");          
          }

          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){//overiding for safety. can reivew overide.                
      
              let obj_table;      
              let str_text=obj_arg.str_text;
              let obj_container=obj_arg.obj_container;
            
              let obj_ini, arr;
              let obj_row, obj_item;
              let obj_input;       
              
            
              obj_ini=new Holder;            
              obj_ini.obj_design.str_type="table";       
              obj_table=obj_container.fn_addItem(obj_ini);//BootItem    
              obj_arg.obj_table=obj_table;
            
              if(str_text){
                obj_row=obj_table.fn_addItem();//BootItem
                obj_ini=new Holder;            
                obj_ini.obj_design.str_type="tableheader";                        
                obj_ini.obj_theme=this.obj_theme;          
                obj_ini.obj_domProperty.colSpan=2;                                  
                obj_item=obj_row.fn_addItem(obj_ini);//BootItem    
                obj_item.fn_setText(str_text);                
              }        
            
              if(obj_arg.str_propertySourceChange){
                this.fn_propertySourceChange(obj_arg);//add new value row    
              }  
              
              //Parent class can call from here
              this.fn_displayPropertySheet(obj_arg);
            }
            
            fn_displayPropertySheet(obj_arg){//to be overriden              
      
              let arr_Property=Object.entries(obj_arg.obj_propertySheet).sort((a, b) => a[0].localeCompare(b[0]));          
              for (let [str_key, foo_val] of arr_Property) {          
                  obj_arg.str_key=str_key;
                  obj_arg.foo_val=foo_val;
                  this.fn_displayPropertySheetRow(obj_arg);
                } 
            }
          
            
            
            fn_displayPropertySheetRow(obj_arg){
          
              let str_key, str_val, foo_val;
              let obj_row, obj_ini, obj_container, obj_cell, obj_input;
              let bln_disabled;      
          
              str_key=obj_arg.str_key;    
              foo_val=obj_arg.foo_val;
              obj_ini=new Holder;
          
              
              foo_val=this.fn_validateInputValue(str_key, foo_val);
          
              if(foo_val===undefined){
                return;
              } 
            
              if(foo_val===""){
                return;
              }   
                
              str_val=foo_val;
              if(typeof foo_val==="object"){     
                if(foo_val){
                  str_val=foo_val.constructor.name;
                }
              }
              
          
              let str_keyDisplay, str_valueDisplay;
              str_keyDisplay=str_key;              
              str_valueDisplay=str_val;

              if(str_keyDisplay==="bln_registerAtProject"){
                //console.log("1 " + str_keyDisplay + ": " + str_valueDisplay)
              }              
              
              obj_row=obj_arg.obj_table.fn_addItem();
              
              //START CREATE NAME CELL
              obj_ini=new Holder;                        
              //obj_ini.obj_design.str_content=str_keyDisplay+":&nbsp;";
              obj_ini.obj_theme=this.obj_theme;        
              obj_ini.obj_domStyle.minWidth="150px";
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem
              obj_container=obj_cell;          
              //END CREATE NAME CELL
          
              //ADD TEXT INPUT TO NAME CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";
              obj_ini.str_subType="text";                              
              obj_ini.obj_domProperty.value=str_keyDisplay;    
              obj_ini.obj_design.str_name=str_key;               
              obj_ini.obj_domProperty.disabled=true;    
              obj_ini.obj_theme=this.obj_theme;        
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                              
              //END TEXT INPUT TO NAME CELL
              
              //START CREATE VALUE CELL
              obj_ini=new Holder;  
              obj_ini.obj_theme=this.obj_theme;        
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
              obj_container=obj_cell;          
              //END CREATE VALUE CELL
          
              //ADD TEXT INPUT TO VALUE CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";
              obj_ini.str_subType="text";                      
              obj_ini.obj_domProperty.value=str_valueDisplay;                                 
              obj_ini.obj_design.str_name=str_key;    
              obj_ini.obj_theme=this.obj_theme;        
              obj_ini.obj_design.str_linkId=obj_arg.obj_item.obj_design.str_idXDesign;            
              obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automaticall to dom        
              obj_ini.obj_design.str_valueEventChange=obj_arg.obj_design.str_valueEventChange;
              bln_disabled=true;            
              if(obj_arg.obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                bln_disabled=false;
              }              
              if(this.obj_design.int_modeExecute===obj_holder.int_modeReadOnly){                
                bln_disabled=true;
              }        
              
              if(typeof foo_val==="object"){        
                bln_disabled=true;
              }
              
              obj_ini.obj_domProperty.disabled=bln_disabled;    
          
              obj_ini=this.fn_validateInput(obj_ini);
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                              
              //END TEXT INPUT TO VALUE CELL
                
            }
          
            fn_validateInputValue(str_name, str_value){      
              return str_value;
            }
          
            fn_validateInput(obj_ini){
              return obj_ini;
            }
          
            
            fn_propertySourceChange(obj_arg){              
              
              let obj_table=obj_arg.obj_table;
              let obj_ini, arr;
              let obj_row, obj_cell;
              let obj_input;
              let bln_disabled;
            
              let obj_item=obj_arg.obj_item;      
              let obj_container=obj_arg.obj_container;
            
              obj_row=obj_table.fn_addItem();//BootItem
            
              //START CREATE NAME CELL
              obj_ini=new Holder; 
              obj_ini.obj_theme=this.obj_theme;              
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
              obj_container=obj_cell;          
              //END CREATE NAME CELL
            
              //ADD TEXT INPUT TO NAME CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";      
              obj_ini.str_subType="text";
              obj_ini.obj_domProperty.value="";    
              obj_ini.obj_design.str_name="str_key";                        
              obj_ini.obj_design.str_linkId=obj_item.obj_design.str_idXDesign;            
              obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automatically to dom        
              obj_ini.obj_design.str_valueEventChange=obj_arg.str_propertySourceChange + "Name";          
              
              
              bln_disabled=true;            
              if(obj_arg.obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                bln_disabled=false;
              }           
              
              if(this.obj_design.int_modeExecute===obj_holder.int_modeReadOnly){                
                bln_disabled=true;
              }

              if(!obj_project.LocationMatchInstance){              
                bln_disabled=true;
              }

              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                             
      
              
              
              //END TEXT INPUT TO NAME CELL
              
              //START CREATE VALUE CELL
              obj_ini=new Holder;     
              obj_ini.obj_theme=this.obj_theme;      
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
              obj_container=obj_cell;          
              //END CREATE VALUE CELL
              
              //ADD TEXT INPUT TO VALUE CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="input";      
              obj_ini.str_subType="text";
              obj_ini.obj_domProperty.value="";
              obj_ini.obj_design.str_name="str_key";                   
              obj_ini.obj_design.str_linkId=obj_item.obj_design.str_idXDesign;            
              obj_ini.obj_design.str_nameEventChange=obj_arg.obj_design.str_nameEventChange;//this will be added automaticall to dom        
              obj_ini.obj_design.str_valueEventChange=obj_arg.str_propertySourceChange + "Value";      
              
              bln_disabled=true;            
              if(obj_arg.obj_item.obj_design.int_modeExecute===obj_holder.int_modeEdit){                
                bln_disabled=false;
              }        
              if(this.obj_design.int_modeExecute===obj_holder.int_modeReadOnly){                
                bln_disabled=true;
              }    
              
              if(!obj_project.LocationMatchInstance){              
                bln_disabled=true;
              }
              
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                              
              //END TEXT INPUT TO VALUE CELL        
            }  
        
      
        }//END CLS
        //END TAG
        //END component/xdesign1_propertysheet
/*id: 223056//*/
/*type: xdesign1_propertysheet//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223051//*/
/*type: xdesign1_propertydesign//*/

      //XSTART component/xdesign1_propertydesign
        class xdesign1_propertydesign extends xdesign1_propertysheet{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                            
            
            this.fn_setType("xdesign1_propertydesign");      
            this.fn_setTag("xdesign1_propertydesign");            
            this.obj_design.bln_isGenericTag=true; 
            this.fn_extends("xdesign1_propertysheet");
          }

          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){   
      
              let obj_selected=obj_arg.obj_selected;
             
              if(!obj_selected){return;}                
        
              if(!obj_selected.fn_isElement()){
                return;
              }
      
              this.fn_removeAllContent();
        
              let obj_container, obj_ini;                      
      
              obj_ini=new Holder;                    
              obj_ini.obj_design.str_type="block";                                
              obj_ini.obj_domStyle.padding="0px";                    
              this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem            
              obj_container=this.obj_sheetHolder;              
              
              //START PROPERTY SHEET
              obj_arg=new Holder;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_container=obj_container;
              obj_arg.str_text=this.obj_design.str_text;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_propertySheet=obj_selected.obj_design;                  
              obj_arg.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange";       
              obj_arg.str_propertySourceChange="fn_propertyDesignChange";//this runs when a new entry is made in the property sheet 
              obj_arg.obj_design.str_valueEventChange="fn_linkDesignChange";//this runs when a value in the property sheet is changed                              
              super.fn_onPaletteItemSelected(obj_arg);
              //END PROPERTY SHEET            
            }         
            
          //this runs when a value in the property sheet is changed
          fn_linkDesignChange(){        
            
              let obj_itemEvent, obj_item, str_name, str_value, foo_value;
              obj_itemEvent=obj_project.obj_projectEvent;    
              
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);                              
              str_name=obj_itemEvent.obj_design.str_name;
              str_value=obj_itemEvent.fn_getValue();
              str_value=this.fn_validateItem(obj_item, str_name, str_value);
              
              this.foo_propertyDesignChangeName=str_name;
              this.foo_propertyDesignChangeValue=str_value;              
              this.fn_actionDesignChange(obj_item);                                            
            }
            
            fn_propertyDesignChangeName(){//when adidng a new item
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);                        
              this.foo_propertyDesignChangeName=foo_value;      
              this.fn_actionDesignChange(obj_item);            
            }
            fn_propertyDesignChangeValue(){//when adding a new item
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);            
              this.foo_propertyDesignChangeValue=foo_value;      
              this.fn_actionDesignChange(obj_item);                              
            }
            fn_actionDesignChange(obj_item){///not deprecasted!
              let str_name, foo_value;
              str_name=this.foo_propertyDesignChangeName;
              foo_value=this.foo_propertyDesignChangeValue;            
              if(str_name===undefined){return;}
              if(foo_value===undefined){return;}      
              obj_item.obj_designDelegate.fn_setDesignProperty(str_name, foo_value);            
              obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                         
              return true;
            }
      
            fn_validateItem(obj_item, str_name, str_value){                        
      
              let obj_instance, bln_val;

              let int_idRecordProjectTarget=obj_projectTarget.obj_design.int_idRecord;
              let int_idRecordProject=obj_project.obj_design.int_idRecord;
              let blnEditXDesigner=false;
              //console.log("int_idRecordProjectTarget: " + int_idRecordProjectTarget);
              //console.log("int_idRecordProject: " + int_idRecordProject);
              if(int_idRecordProjectTarget===int_idRecordProject){
                blnEditXDesigner=true;
              }
        
              switch(str_name){        
                case "str_type":
                  if(obj_item===obj_projectTarget){        
                    obj_projectTarget.obj_holder.str_componentCode=false; 
                    obj_item.obj_holder.bln_changeRecordType=true;                            
                  }   
                  else{   
                    str_value="error";
                  }          
                break;   
                case "str_idXDesign":
                    if(!blnEditXDesigner){                                     
                      obj_instance=obj_projectTarget.fn_findItemById(str_value);                                
                      if(obj_instance){
                        //internal duplicate error                 
                        str_value="internal duplicateerror str_idXDesign";
                      }                
                      obj_instance=obj_project.fn_findItemById(str_value);                                
                      if(obj_instance){
                        //designer duplicate error                 
                        str_value="designer duplicateerror str_idXDesign";
                      }                
                    }
                break;    
                case "bln_registerAtProject":                                           

                      if(!blnEditXDesigner){
                        obj_instance=obj_projectTarget.fn_findItemByVariableName(obj_project.obj_palettSelected.obj_design.str_variableName, obj_project.obj_palettSelected);
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //internal duplicate error                 
                          //console.log("internal duplicate error bln_registerAtProject obj_projectTarget/obj_instance: " + obj_instance + "[" + obj_project.obj_palettSelected.obj_design.str_variableName + "]");
                          obj_instance.fn_debug("internal duplicate error bln_registerAtProject obj_project/obj_instance");
                          str_value=obj_project.obj_palettSelected.fn_getRegisterAtProject();
                        }

                        obj_instance=obj_project.fn_findItemByVariableName(obj_project.obj_palettSelected.obj_design.str_variableName, obj_project.obj_palettSelected);
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //designer duplicate error                                 
                          console.log("designer duplicate error bln_registerAtProject obj_project/obj_instance: " + obj_instance  + "[" + obj_project.obj_palettSelected.obj_design.str_variableName + "]");
                          obj_instance.fn_debug("designer duplicate error bln_registerAtProject obj_project/obj_instance");
                          str_value=obj_project.obj_palettSelected.fn_getRegisterAtProject();
                        }
                      }
                break;                        
                case "str_name": 
                      if(!blnEditXDesigner){               
                        let str_nameShort=this.fn_formatShortName(str_value);     
                        obj_instance=obj_projectTarget.fn_findItemByVariableName(str_nameShort, obj_project.obj_palettSelected);                                                
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //internal duplicate error                                                     
                          console.log("internal duplicate error str_name: " + obj_instance.obj_design.str_name);
                          str_value=obj_project.obj_palettSelected.fn_getName();
                        }                
                        obj_instance=obj_project.fn_findItemByVariableName(str_nameShort, obj_project.obj_palettSelected);                                
                        if(obj_instance && obj_instance!==obj_project.obj_palettSelected){
                          //designer duplicate error                                             
                          console.log("designer  duplicate error str_name: " + obj_instance.obj_design.str_name);                                
                          str_value=obj_project.obj_palettSelected.fn_getName();
                        }                
                      }
                break;              
                case "str_variableName":                     
                      obj_instance=obj_projectTarget.fn_findItemByVariableName(str_value, obj_project.obj_palettSelected);                                                                
                      if(obj_instance){                
                        str_value=obj_project.obj_palettSelected.fn_getVariableName();;
                      }
                break;              
                }     
             
              
              return str_value;
            }
      
            fn_isDuplicateVariableName(){        
              
            }
            
        
            fn_validateInput(obj_ini){       
              
              let bln_isProject=false;
              let obj_selected=obj_project.obj_palettSelected;
              if(obj_selected===obj_projectTarget){//probably ok to leave disabled global if selected component is not the project        
                bln_isProject=true;
              }   
              
              let str_name=obj_ini.obj_design.str_name;

              let bln_disabled;
      
              obj_ini.obj_domProperty.disabled=true; 

              
              if(!obj_project.LocationMatchInstance){                
                  return obj_ini;
              }
              
              if(obj_selected.obj_design.int_modeExecute!==obj_holder.int_modeEdit){                
                return obj_ini;
              }      

              let str_listIn="bln_isContainer,bln_maintainId,bln_registerAtContainer,bln_showToolbar,bln_themeType,bln_toggleProjectPin,bln_typeable,str_nameRegistrator,bln_registerAtProject,bln_palettePin,bln_projectPin,dataSVG,filterSVG,gridTemplate,str_classList,str_classExtend,str_createdDate,str_locationID,str_modifiedDate,str_name,str_nameTheme,str_subType,str_text,str_tag,str_value,";
              let str_listInProjectOnly="bln_createRelease,bln_lockComponent,str_nameRelease,str_type,";
              str_listIn+=str_listInProjectOnly;

              let bln_display;

              bln_disabled=true;
              if(obj_shared.fn_inStr(","+str_name+",", ","+str_listIn+",")){                
                bln_disabled=false;
              }            
              if(!bln_isProject){
                if(obj_shared.fn_inStr(","+str_name+",", ","+str_listInProjectOnly+",")){                
                  bln_disabled=true;
                }            
              }              

              switch(str_name){                        
                case "str_text": 
                  if(obj_selected.fn_getTypeable()){
                    bln_disabled=false;
                  }            
              }

              if(!obj_project.LocationMatchInstance){              
                bln_disabled=true;
              }

              obj_ini.obj_domProperty.disabled=bln_disabled;                    
              
              
              return obj_ini;
            }
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydesign
/*id: 223051//*/
/*type: xdesign1_propertydesign//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223017//*/
/*type: navelement//*/
class navelement extends component {
    constructor(obj_ini) {      
      super(obj_ini);
    }    
    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.fn_setType("div");      
      //this.fn_setTag("div", true);                        
      this.fn_setTag("button", true);                        

      this.obj_design.bln_listenClick=true;
      //END INITIALIZE DESIGN
  
      //START INITIALIZE STYLE      
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="10px";}              
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="10px";}              
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="10px";}                  
      if(this.obj_domStyle.margin===undefined){this.obj_domStyle.margin="10px";}              
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}      
      //END INITIALIZE STYLE  
    }     
    xfn_applyTheme(){
      super.fn_applyTheme();
      this.fn_setStyleProperty("background-color", this.obj_theme.lolightColor);          
      this.fn_setStyleProperty("color", this.obj_theme.lolightColor);       
      this.fn_setStyleProperty("border-radius", "0px");                   
  }   
  xfn_setDisabled(){    
    super.fn_setDisabled();        
    //this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          
    //this.fn_setStyleProperty("color", this.obj_theme.foregroundColor);                      
  }  
  fn_onClick(){
    this.fn_event();                
  }
  
}//END CLS
//END BUTTON

/*id: 223017//*/
/*type: navelement//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223008//*/
/*type: flex//*/
  class flex extends component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.fn_setType("flex");      
      this.fn_setTag("flex");            
      this.fn_setIsContainer(true);      
      //END INITIALIZE DESIGN

      //START INITIALIZE STYLE      
      if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="default";}
      if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="flex";}
      if(this.obj_domStyle.flexWrap===undefined){this.obj_domStyle.flexWrap="wrap";}      
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}      
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="auto";}                   
      //END INITIALIZE STYLE      
    }
}//END CLS
//END FLEX

/*id: 223008//*/
/*type: flex//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223040//*/
/*type: xdesign1_managermenu//*/

      //XSTART component/xdesign1_managermenu
        class xdesign1_managermenu extends flex{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managermenu");      
            this.fn_setTag("xdesign1_managermenu");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("flex");            
            
          }
          fn_onStateChange(){                       
            this.fn_close();
            return true;
          }   
          fn_close(bln_disable=true){
            this.obj_holder.obj_container.fn_close();                        
            if(bln_disable){
              this.obj_holder.obj_container.fn_setDisabled();      
            }
          }
          fn_open(bln_enable=true){
            if(bln_enable){
              this.obj_holder.obj_container.fn_setEnabled();      
            }
            this.obj_holder.obj_container.fn_open();
          }

        }//END CLS
        //END TAG
        //END component/xdesign1_managermenu

/*id: 223040//*/
/*type: xdesign1_managermenu//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223049//*/
/*type: xdesign1_objectmap//*/

      //XSTART component/xdesign1_objectmap
        class xdesign1_objectmap extends tag{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_objectmap");      
            this.fn_setTag("xdesign1_objectmap");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){                                             

            let obj_container, obj_item, obj_ini, arr;
            let obj_table, obj_row, obj_cell;  
            let str_text;                  
            
            if(obj_arg.obj_selected.obj_holder.bln_maintainMap){                                    
              obj_arg.obj_selected.obj_holder.bln_maintainMap=false;                            
            }      
      
            this.fn_removeAllContent(); 
            
            obj_ini=new Holder;                    
            obj_ini.obj_design.str_type="block";                  
            obj_ini.obj_domStyle.padding="0px";                  
            this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem
            
            obj_container=this.obj_sheetHolder;
            
            obj_ini=new Holder;            
            obj_ini.obj_design.str_type="table";                                    
            obj_table=obj_container.fn_addItem(obj_ini);//BootItem      
            this.obj_objectMapTable=obj_table;             
            
            str_text=this.obj_design.str_text;
            if(str_text){              
              obj_row=obj_table.fn_addItem();//BootItem
              
              obj_ini=new Holder;            
              obj_ini.obj_design.str_type="tableheader";                        
              obj_ini.obj_domProperty.colSpan=3;                        
              obj_ini.obj_domProperty.innerText=str_text;              
              obj_row.fn_addItem(obj_ini);//BootItem                  
            }
            
            obj_arg.obj_table=obj_table;          
            
            this.bln_startMap=false;
            if(obj_projectTarget){
              this.bln_startMap=obj_projectTarget.obj_design.arr_item.length        
            }
            
            //START LINK PARENT      
            if(this.bln_startMap){
              this.fn_getLevelParentObjectMap(obj_arg);      
            }
            //END LINK PARENT
      
            //START LINK SELF            
            this.fn_getLevelSelectedObjectMap(obj_arg);                
            //START LINK SELF
      
            //START LINK CHILDREN
            if(this.bln_startMap){
              this.fn_getLevelChildObjectMap(obj_arg);      
            }
            //END LINK CHILDREN                        
          }   
          
          fn_getLevelParentObjectMap(obj_arg){
            
            let obj_selected=obj_arg.obj_selected;
            let obj_table=obj_arg.obj_table;                  
            
            let obj_container, obj_ini, obj_item;
            let obj_row, obj_cell;                  
              
            obj_row=obj_table.fn_addItem();//BootItem         
            
            obj_ini=new Holder;                                                    
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem                  
            obj_container=obj_cell;          

            let bln_disabled=false;
            if(obj_arg.bln_limitTop){bln_disabled=true;}
      
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="navelement";//UP                  
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_moveObjectCompassUp";  
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem                          
            this.objNavElementTop=obj_item;
            //ADD BUTTON TO VALUE CELL
      
            obj_ini=new Holder;                      
            obj_ini.obj_domProperty.colSpan=obj_selected.obj_design.arr_item.length;                    
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem                      
            obj_container=obj_cell;          
      
            let bln_isRoot=false;
            if(obj_selected.obj_holder.obj_container===obj_projectTarget){bln_isRoot=true;}
            if(obj_arg.bln_limitTop && !bln_isRoot){}
            else{
              obj_ini=new Holder;              
              obj_ini.obj_design.str_type="button";                       
              obj_ini.obj_design.str_linkId=obj_selected.obj_holder.obj_container.obj_design.str_idXDesign;        
              obj_ini.obj_design.str_text=obj_selected.obj_holder.obj_container.obj_design.str_tag;
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_linkCompassItem";
              obj_item=obj_container.fn_addItem(obj_ini);//BootItem
            }
          }
          fn_getLevelSelectedObjectMap(obj_arg){
            
            let obj_selected=obj_arg.obj_selected;
            let obj_table=obj_arg.obj_table;            
      
            let obj_container, obj_item, obj_ini, arr_item, int_index;
            let obj_row, obj_cell;
            
            obj_row=obj_table.fn_addItem();//BootItem
            
            //START CREATE VALUE CELL
            obj_ini=new Holder;                 
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem                              
            obj_container=obj_cell;          
            //END CREATE VALUE CELL
      
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="navelement";//UP                  
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;          
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_moveObjectCompassHorizontal";  
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem              
            if(obj_arg.bln_limitLeft && obj_arg.bln_limitRight){obj_item.fn_setDisabled();}
            this.objNavElementMiddle=obj_item;
            
            //START CREATE VALUE CELL
            obj_ini=new Holder;     
            obj_ini.obj_domProperty.colSpan=obj_selected.obj_design.arr_item.length;                  
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem                                  
            obj_container=obj_cell;          
            //END CREATE VALUE CELL
            
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";            
            obj_ini.obj_design.str_nameTheme="buttonhighlight";            
            obj_ini.obj_design.str_text=obj_selected.obj_design.str_tag;//SELF                                        
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;          
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_linkCompassItem";
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem              
            //ADD BUTTON TO VALUE CELL
          }    
          fn_getLevelChildObjectMap(obj_arg){
            let obj_selected=obj_arg.obj_selected;
            let obj_table=obj_arg.obj_table;      
      
            let obj_container, obj_item, obj_ini;
            let obj_row, obj_cell;
      
            
            if(!obj_selected){return;}  
      
            obj_row=obj_table.fn_addItem();//BootItem
            
            obj_ini=new Holder;                                        
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem                            
            obj_container=obj_cell;

            let bln_disabled=false;
            if(obj_arg.bln_limitBottom){bln_disabled=true;}
            
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="navelement";//DOWN                        
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;          
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_moveObjectCompassDown";  
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem                          
            this.objNavElementBottom=obj_item;
            
      
            let arr=obj_selected.obj_design.arr_item;       
            if(!arr.length){
              //START CREATE VALUE CELL
              obj_ini=new Holder;                 
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem                        
              obj_container=obj_cell;          
              //END CREATE VALUE CELL
            }    
          
            for(let i=0;i<arr.length;i++){
              obj_item=arr[i];
              
              //START CREATE VALUE CELL
              obj_ini=new Holder;                   
              obj_cell=obj_row.fn_addItem(obj_ini);//BootItem                        
              obj_container=obj_cell;          
              //END CREATE VALUE CELL              
      
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="button";        
              obj_ini.obj_design.str_text=obj_item.obj_design.str_tag;                                  
              obj_ini.obj_design.str_linkId=obj_item.obj_design.str_idXDesign;          
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_linkCompassItem";  
              obj_container.fn_addItem(obj_ini);//BootItem      
            }            
          }        

          fn_linkCompassItem(obj_target){      
            let obj_itemEvent;                        
      
            //if(!this.bln_startMap){return;}
            
      
            this.fn_clearObjectMapHighlight();      
      
            if(!obj_target){
              obj_itemEvent=obj_project.obj_projectEvent;                                                         
              obj_target=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId); //locate the actual object via the link id                                 
            }            
      
            if(!obj_target){
              alert("CHECK obj_target is false, obj_itemEvent.obj_design.str_linkId is undefined");
              return;
            }
      
            //let bln_maintainMap=true;
            let bln_maintainMap=false;
            
            if(bln_maintainMap){
              this.fn_clearObjectMapHighlight();
              this.fn_setObjectMapHighlight(obj_target, obj_itemEvent);        
              this.fn_setNavElement(obj_target);        
            }
            
            if(obj_target.obj_designDelegate){
              //console.log("fn_linkCompassItem")        
              obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
            }            
          }  
      
          
          fn_moveObjectCompassHome(){//HOME
            let obj_item=obj_projectTarget;
            obj_item.obj_designDelegate.fn_setPaletteSelected();                        
          }        
          fn_moveObjectCompassHorizontal(){//HORIZONTAL
            let obj_item, int_index, obj_container, arr_item;      
            let obj_selected, obj_itemEvent, obj_itemOriginal, obj_target;      
            let bln_maintainMap=true;      
            
            obj_selected=obj_project.obj_palettSelected;//currently selected item
            obj_itemEvent=obj_project.obj_projectEvent;//button that was clicked      
            obj_itemOriginal=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);//item that the button is linked to                        
      
            obj_target=obj_selected;//keep here      
            
            if(obj_selected===obj_itemOriginal.obj_holder.obj_container){//parent, requesting sibling
              bln_maintainMap=false;//requested level is out of view, change map        
            }
      
            if(obj_selected===obj_itemOriginal){//currently selected, requesting sibling
              bln_maintainMap=false;//requested level is out of view, change map        
            }
      
            if(obj_selected.obj_holder.obj_container===obj_itemOriginal){//child requesting sibling
              bln_maintainMap=true;
            }
            
            obj_container=obj_project.obj_palettSelected.obj_holder.obj_container;        
            arr_item=obj_container.obj_design.arr_item;
            if(!obj_container){return};
            obj_item=obj_project.obj_palettSelected;
            int_index=obj_container.fn_findItemIndex(obj_item);
            if(int_index==arr_item.length-1){int_index=-1;}
            obj_item=arr_item[int_index+1];        
            obj_target=obj_item;
      
            if(bln_maintainMap){
              this.fn_clearObjectMapHighlight();
              this.fn_setObjectMapHighlight(obj_target, obj_itemEvent); 
              this.fn_setNavElement(obj_target);             
            }      
            
            obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
          }   
          fn_moveObjectCompassUp(){//UP
            let obj_selected, obj_itemEvent, obj_itemOriginal, obj_target, arr_item, obj_item;      
            let bln_maintainMap=true;
            
            obj_selected=obj_project.obj_palettSelected;//currently selected item
            obj_itemEvent=obj_project.obj_projectEvent;//navigation button that was clicked      
            obj_itemOriginal=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);//item that the button is linked to                        
      
            obj_target=obj_selected;//keep here      
      
            if(!obj_itemOriginal){
              obj_itemEvent.fn_debug("error: obj_itemOriginal is false str_linkId:" + obj_itemEvent.obj_design.str_linkId);        
              return;
            }
            
            if(obj_selected===obj_itemOriginal.obj_holder.obj_container){//parent, requesting parent                
              bln_maintainMap=false;//requested level is out of view, change map
              let obj_container=obj_selected.obj_holder.obj_container;
              if(obj_container){
                obj_target=obj_container;
              }        
            }
      
            if(obj_selected===obj_itemOriginal){//currently selected, requesting parent                
              obj_target=obj_selected.obj_holder.obj_container;
            }
      
            if(obj_selected.obj_holder.obj_container===obj_itemOriginal){//child requesting original selected              
              obj_target=obj_itemOriginal;
            }      
      
            if(bln_maintainMap){
              this.fn_clearObjectMapHighlight();
              this.fn_setObjectMapHighlight(obj_target, obj_itemEvent); 
              this.fn_setNavElement(obj_target);             
            }      
            
            if(obj_target){
              if(obj_target.obj_designDelegate){
                obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
              }
            }
          } 
          fn_moveObjectCompassDown(){//DOWN      
            let obj_selected, obj_itemEvent, obj_itemOriginal, obj_target, arr_item, obj_item;      
            let bln_maintainMap=true;
            
            obj_selected=obj_project.obj_palettSelected;//currently selected item
            obj_itemEvent=obj_project.obj_projectEvent;//button that was clicked      
            obj_itemOriginal=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);//item that the button is linked to                        
      
            obj_target=obj_selected;//keep here
            
            if(obj_selected===obj_itemOriginal.obj_holder.obj_container){//parent, requesting original selected
              obj_target=obj_itemOriginal;
            }
      
            if(obj_selected===obj_itemOriginal){//currently selected, requesting a child                
              obj_target=obj_selected.fn_getLastItem();
            }
      
            if(obj_selected.obj_holder.obj_container===obj_itemOriginal){//child, requesting a subchild        
              bln_maintainMap=false;//requested level is out of view, change map        
              obj_target=obj_selected.fn_getLastItem();  
            }      
      
            if(bln_maintainMap){
              this.fn_clearObjectMapHighlight();
              this.fn_setObjectMapHighlight(obj_target, obj_itemEvent);        
              this.fn_setNavElement(obj_target);        
            }      
            
            if(obj_target.obj_designDelegate){
              obj_target.obj_designDelegate.fn_setPaletteSelected(bln_maintainMap);                        
            }
          } 
          
          
          fn_setNavElement(obj_target){
            
            if(!this.bln_startMap){return;}
            
            obj_target.fn_setLevelLimit();
            
            let obj_levelLimit=obj_target.obj_holder.obj_levelLimit;
            if(obj_levelLimit.bln_limitTop){            
              this.objNavElementTop.fn_setDisabled();
            }        
            else{
              this.objNavElementTop.fn_setEnabled();
            }
            if(obj_levelLimit.bln_limitLeft && obj_levelLimit.bln_limitRight){             
              this.objNavElementMiddle.fn_setDisabled();
            }        
            else{          
              this.objNavElementMiddle.fn_setEnabled();
            }
      
            
            if(obj_levelLimit.bln_limitBottom){             
              this.objNavElementBottom.fn_setDisabled();
            }        
            else{          
              this.objNavElementBottom.fn_setEnabled();
            }
              
          }        
          fn_clearObjectMapHighlight(){   
            if(!this.obj_objectMapTable){return;}//see fn_linkOperation, maptable can be prevented from being created by maintainmap            
          }    
          fn_setObjectMapHighlight(obj_target, obj_itemEvent){
      
            if(!this.obj_objectMapTable){return;}//see fn_linkOperation, maptable can be prevented from being created by maintainmap
            
            let str_type="button";
            let obj_item=this.obj_objectMapTable.fn_locateItem(obj_target.obj_design.str_idXDesign, str_type);                  
            
            return obj_item;
          }    
          
      
          
      }
      //END CLS      
        //END TAG
        //END component/xdesign1_objectmap
        
/*id: 223049//*/
/*type: xdesign1_objectmap//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223048//*/
/*type: xdesign1_objectaction//*/

      //XSTART component/xdesign1_objectaction
        class xdesign1_objectaction extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_objectaction");      
            this.fn_setTag("xdesign1_objectaction");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");
            
            
          }
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){   
              
              let obj_container, obj_item, obj_ini, arr;
            let obj_table, obj_row, obj_cell;
            let str_text;
            let bln_locked, bln_disabled, bln_dynamicPin;
            
            let obj_selected=obj_arg.obj_selected;
            let obj_parent;
            bln_dynamicPin=obj_selected.obj_design.bln_dynamicPin;
            
            this.fn_removeAllContent();
            
            obj_ini=new Holder;                    
            obj_ini.obj_design.str_type="block";                  
            obj_ini.obj_domStyle.padding="0px";      
            obj_ini.obj_domStyle.backgroundColor=this.obj_theme.backgroundColor;
            this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem               
            
            obj_container=this.obj_sheetHolder;
            
      
      
            if(!obj_selected){return;} 
            
            let obj_localHome=obj_selected.fn_getLocalHome();      
            bln_locked=obj_localHome.fn_getLocked();
            
            obj_ini=new Holder;            
            obj_ini.obj_design.str_type="table";                              
            //obj_ini.obj_domProperty.className="xDesignConsoleProperty";
            obj_table=obj_container.fn_addItem(obj_ini);//BootItem       
            
            str_text=this.obj_design.str_text;
            if(str_text){      
              obj_row=obj_table.fn_addItem();//BootItem
              obj_ini=new Holder;            
              obj_ini.obj_design.str_type="tableheader";          
              //obj_ini.obj_theme=this.obj_theme;
              obj_ini.obj_domProperty.colSpan=3;                        
              obj_ini.obj_domProperty.innerText=str_text;                
              obj_row.fn_addItem(obj_ini);//BootItem    
            }           
            
            obj_row=obj_table.fn_addItem();//BootItem
            obj_ini=new Holder;  
            //obj_ini.obj_theme=this.obj_theme;
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
            //obj_cell.fn_setStyleProperty("background-color", this.obj_theme.backgroundColor);          
            obj_container=obj_cell;          
            
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateCopy(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }            
      
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Copy";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                      
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_copyTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validatePaste(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }            
            
            //ADD BUTTON TO VALUE CELL      
            obj_ini=new Holder;
            obj_ini.obj_design.bln_debug123=true;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Paste";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                                  
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_pasteTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateCut(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }
            
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Cut";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_cutTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED            
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateDelete(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }
            
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Delete";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;              
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_deleteTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem               
            //ADD BUTTON TO VALUE CELL
            
      
            //*
            switch(obj_selected.obj_design.str_type.toLowerCase()){
              case "eazygrid":
                this.fn_getEazyGridSwitch(obj_selected, obj_container);
                break;
            }
            //*/
      
            //ADD ROW
            obj_row=obj_table.fn_addItem();//BootItem      
            obj_ini=new Holder;  
            //obj_ini.obj_theme=this.obj_theme;
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
            //obj_cell.fn_setStyleProperty("background-color", this.obj_theme.backgroundColor);          
            obj_container=obj_cell;  

            bln_disabled=false;                  
      
            //ADD BUTTON TO VALUE CELL
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Local Home";          
            //obj_ini.obj_theme=this.obj_theme;            
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                      
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_selectLocalHome";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_container.fn_addItem(obj_ini);//BootItem      
            //ADD BUTTON TO VALUE CELL

            bln_disabled=false;      
            if(!obj_clipboard.fn_validateInsert(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }            

            //ADD BUTTON TO VALUE CELL            
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Insert";          
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_insertTag";  
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            //ADD ROW
            obj_row=obj_table.fn_addItem();//BootItem      
            obj_ini=new Holder;  
            //obj_ini.obj_theme=this.obj_theme;
            obj_cell=obj_row.fn_addItem(obj_ini);//BootItem          
            //obj_cell.fn_setStyleProperty("background-color", this.obj_theme.backgroundColor);          
            obj_container=obj_cell;  
      
            
      
            
            //ADD BUTTON TO VALUE CELL      
            
            //*
            
            if((obj_selected.obj_design.int_modeExecute==obj_holder.int_modeEdit || obj_selected.obj_design.int_idRecord===0)){      
              
            
              bln_disabled=false;      
              if(!this.fn_validateSave(obj_selected, obj_localHome)){  
                bln_disabled=true;    
              }                  
      
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="button";
              obj_ini.obj_design.str_name="Save";          
              //obj_ini.obj_theme=this.obj_theme;
              obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;              
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_saveComponent";  
              if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED              
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_item=obj_container.fn_addItem(obj_ini);//BootItem   
            }
            else if(obj_selected.obj_design.int_modeExecute==obj_holder.int_modeReadOnly){      
      
              bln_disabled=false;      
              if(!this.fn_validateEdit(obj_selected, obj_localHome)){  
                bln_disabled=true;    
              }                  
              
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="button";
              obj_ini.obj_design.str_name="Edit";          
              //obj_ini.obj_theme=this.obj_theme;
              obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                  
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_editTag";  
              if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_item=obj_container.fn_addItem(obj_ini);//BootItem   
            }
      
            bln_disabled=false;      
            if(!this.fn_validateOpen(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }                  
            
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Open";
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                  
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_openComponent";
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem               
      
            //*      
            bln_disabled=false;      
            if(!this.fn_validateSaveAs(obj_selected, obj_localHome)){  
              bln_disabled=true;    
            }                  
            obj_ini=new Holder;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.str_name="Save As";
            //obj_ini.obj_theme=this.obj_theme;
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                  
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            obj_ini.obj_design.str_valueEventClick="fn_saveAsComponent";
            if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            if(!bln_disabled){obj_item=obj_container.fn_addItem(obj_ini);}            
            //*/
            
            //*/
            
            //ADD BUTTON TO VALUE CELL      
          }
          fn_setEazyGridSwitch(){
            
              let obj_eazygrid=obj_project.obj_palettSelected;            
              obj_eazygrid.obj_design.bln_split=obj_shared.fn_flipBool(obj_eazygrid.obj_design.bln_split);    
              obj_eazygrid.fn_compileTemplate();                              
              obj_eazygrid.fn_applyFeatures();//required , or must go in base object additem                             
            }
            
            fn_getEazyGridSwitch(obj_selected, obj_container){
              let obj_ini;
              //ADD BUTTON TO VALUE CELL
              obj_ini=new Holder;
              obj_ini.obj_design.str_type="button";      
              //obj_ini.obj_design.str_name="SPLIT " + obj_selected.obj_design.bln_split;          
              //obj_ini.obj_theme=this.obj_theme;
              obj_ini.obj_design.str_name="ROTATE";    
              obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;          
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_setEazyGridSwitch";
              obj_container.fn_addItem(obj_ini);//BootItem      
              //ADD BUTTON TO VALUE CELL
            }
      
            fn_validateSave(obj_item, obj_localHome){
              let bln_debug=false;

              if(!obj_project.LocationMatchInstance){
                if(bln_debug){console.log("VALIDATE SAVE: LOCATIONMATCH IS FALSE")};
                  return false;
              }
      
              if(!obj_item){        
                  return false;
              }        
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE SAVE: CANNOT SAVE DYNMAIC PIN")};
                  return false;
                }
              
              let bln_locked=obj_localHome.fn_getLocked();        
              if(bln_locked){//cannot manipulate locked component
              //if(bln_locked && obj_localHome!==obj_item){//cannot manipulate locked component
                  if(bln_debug){console.log("VALIDATE SAVE: LOCALHOME IS LOCKED")};
                  return false;
              //}        
              }
      
              if(bln_debug){console.log("VALIDATE SAVE: VALIDATED")};   
              return true;
      
          }
          fn_validateSaveAs(obj_item, obj_localHome){
              let bln_debug=false;              
      
              if(!obj_item){        
                  return false;
              }        
      
              if(obj_item!=obj_projectTarget){
                  return false;
                }
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE SAVE AS: CANNOT SAVE DYNMAIC PIN")};
                  return false;
              }
      
              if(bln_debug){console.log("VALIDATE SAVE AS: VALIDATED")};   
              return true;
          }
          fn_validateEdit(obj_item, obj_localHome){
              let bln_debug=false;              
      
              if(!obj_item){        
                  return false;
              }        
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE EDIT: CANNOT SAVE DYNMAIC PIN")};
                  return false;
                }
              
              let bln_locked=obj_localHome.fn_getLocked();        
              if(bln_locked){//cannot manipulate locked component
                //if(bln_locked && obj_localHome!==obj_item){//cannot manipulate locked component
                  if(bln_debug){console.log("VALIDATE EDIT: LOCALHOME IS LOCKED")};
                  return false;
              //}        
              }              
      
              if(bln_debug){console.log("VALIDATE EDIT: VALIDATED")};   
              return true;
          }
          fn_validateOpen(obj_item, obj_localHome){
              let bln_debug=false;              
      
              if(!obj_item){        
                  return false;
              }        
              if(obj_item.obj_design.int_idRecord===0){
                if(bln_debug){console.log("VALIDATE OPEN: VALIDATED (ID RECORD IS 0)");}      
                return false;
              }            
      
              if(obj_item.obj_design.bln_dynamicPin){
                  if(bln_debug){console.log("VALIDATE OPEN: CANNOT OPEN DYNMAIC PIN")};
                  return false;
                }
              
              let bln_locked=obj_localHome.fn_getLocked();        
              if(bln_locked && obj_item!=obj_localHome){
                  if(bln_debug){console.log("VALIDATE OPEN: LOCALHOME IS LOCKED")};
                  return false;
              }
              if(obj_item==obj_projectTarget){
                  if(bln_debug){console.log("VALIDATE OPEN: SELECTED IS ALREADY OPEN")};
                  return false;
              }
              if(!obj_item.obj_design.bln_projectPin){        
                  if(bln_debug){console.log("VALIDATE OPEN: SELECTED IS NOT PINNED PROJECT")};
                  //return false;
              }
              if(bln_debug){console.log("VALIDATE OPEN: VALIDATED")};   
              return true;
          }
        }
        //END CLS
        //END TAG
        //END component/xdesign1_objectaction
/*id: 223048//*/
/*type: xdesign1_objectaction//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223052//*/
/*type: xdesign1_propertydesignui//*/

      //XSTART component/xdesign1_propertydesignui
        class xdesign1_propertydesignui extends xdesign1_propertydesign{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertydesignui");      
            this.fn_setTag("xdesign1_propertydesignui");            
            this.obj_design.bln_isGenericTag=true; 
            this.fn_extends("xdesign1_propertydesign");           
          }

          fn_displayPropertySheet(obj_arg){//to be overriden      

            let bln_isProject, bln_isThemeProject=false;
            let obj_selected=obj_project.obj_palettSelected;
            if(obj_selected===obj_projectTarget){//probably ok to leave disabled global if selected component is not the project        
              bln_isProject=true;
            }                                   
            if(obj_projectTarget.obj_design.str_type==="theme"){
              bln_isThemeProject=true;
            }

            
      
            
              let str_listIn="bln_maintainId,bln_palettePin,bln_projectPin,bln_registerAtContainer,bln_registerAtProject,bln_typeable,dataSVG,filterSVG,gridTemplate,int_idRecord,str_classExtend,str_classList,str_name,str_nameRegistrator,str_nameTheme,str_subType,str_type,str_tag,str_value,";
              //let str_listInProjectOnly="bln_palettePin,bln_projectPin,";        
              if(obj_selected.fn_getTypeable()){                    
                str_listIn+="str_text,";          
              }
              let str_listInProjectOnly="";
              str_listIn+=str_listInProjectOnly;

              if(bln_isThemeProject){
                str_listIn+="bln_themeType,";
              }
              
      
              let bln_display;
      
              let arr_Property=Object.entries(obj_arg.obj_propertySheet).sort((a, b) => a[0].localeCompare(b[0]));          
              for (let [str_key, foo_val] of arr_Property) {          
                  bln_display=false;
                  if(obj_shared.fn_inStr(","+str_key+",", ","+str_listIn+",")){                
                    bln_display=true;
                  }            
      
                  if(!bln_isProject){
                    if(obj_shared.fn_inStr(","+str_key+",", ","+str_listInProjectOnly+",")){                
                      bln_display=false;
                    }            
                  }
      
                  if(bln_display){
                      obj_arg.str_key=str_key;
                      obj_arg.foo_val=foo_val;
                      this.fn_displayPropertySheetRow(obj_arg);
                    }
                } 
            }
      
            fn_validateInput(obj_ini){
      
              let bln_isProject=false;
              if(obj_project.obj_palettSelected===obj_projectTarget){//probably ok to leave disabled global if selected component is not the project        
                bln_isProject=true;
              }                                   
      
              obj_ini=super.fn_validateInput(obj_ini);
      
              let str_listReadOnly="int_idRecord";
      
              let str_listAllAccess="gridTemplate";
      
              let str_listInProjectOnly="bln_palettePin,bln_projectPin";
      
        
              if(!bln_isProject){//probably ok to leave disabled global if selected component is not the project
                //obj_ini.obj_domProperty.disabled=true;    
              }
              
      
              if(obj_shared.fn_inStr(","+obj_ini.obj_design.str_name+",", ","+str_listAllAccess+",")){
                obj_ini.obj_domProperty.disabled=false;    
              }  
      
              if(obj_shared.fn_inStr(","+obj_ini.obj_design.str_name+",", ","+str_listReadOnly+",")){
                obj_ini.obj_domProperty.disabled=true;    
              }  

              
              if(!obj_project.LocationMatchInstance){                                            
                obj_ini.obj_domProperty.disabled=true;    
              }
              
              
        
              return obj_ini;
            }
          
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydesignui
/*id: 223052//*/
/*type: xdesign1_propertydesignui//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223055//*/
/*type: xdesign1_propertydomstyle//*/

      //XSTART component/xdesign1_propertydomstyle
        class xdesign1_propertydomstyle extends xdesign1_propertysheet{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertydomstyle");      
            this.fn_setTag("xdesign1_propertydomstyle");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("xdesign1_propertysheet");            
          }
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){   
      
              let obj_selected=obj_arg.obj_selected;
             
              if(!obj_selected){return;}                
        
              if(!obj_selected.fn_isElement()){
                return;
              }
      
              this.fn_removeAllContent();
        
              let obj_container, obj_ini;        
              
              
              obj_ini=new Holder;                    
              obj_ini.obj_design.str_type="block";                                
              this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem                      
        
              obj_container=this.obj_sheetHolder;
              
              
              //START PROPERTY SHEET
              obj_arg=new Holder;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_container=obj_container;
              obj_arg.str_text=this.obj_design.str_text;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_propertySheet=obj_selected.obj_domStyle;                  
              obj_arg.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange";
              obj_arg.str_propertySourceChange="fn_propertyDOMStyleChange";//this runs when a new entry is made in the property sheet 
              obj_arg.obj_design.str_valueEventChange="fn_linkDomStyleChange";//this runs when a value in the property sheet is changed      
              obj_arg.str_optionDOMDisplay="DOMStyle";
              super.fn_onPaletteItemSelected(obj_arg);
              //END PROPERTY SHEET            
            }   
      
            fn_displayPropertySheet(obj_arg){      
      
              let str_key, foo_val;
              let str_style, arr_parts, str_part, arr_subParts;
              
              str_style=obj_arg.obj_item.dom_obj.getAttribute("style"); 
              if(!str_style){
                str_style="";            
              }
              
              if(!str_style.length){return;}
          
              arr_parts = str_style.split(";")        
              for (let i=0;i<arr_parts.length;i++) {
                  str_part=arr_parts[i];            
                  if(str_part.length){
                    arr_subParts = str_part.split(':');                            
                    obj_arg.str_key=arr_subParts[0].trim();                    
                    obj_arg.foo_val=obj_arg.obj_item.dom_obj.style[obj_arg.str_key];
                    //console.log("STYLE: " + obj_arg.str_key + ": " + obj_arg.foo_val);          
                    this.fn_displayPropertySheetRow(obj_arg);  
                  }
              }  
            }
          
      
            
          //this runs when a value in the property sheet is changed              
          fn_linkDomStyleChange(){
            
            let obj_itemEvent, obj_item, str_name, str_value;      
            obj_itemEvent=obj_project.obj_projectEvent;      
            
            obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);                        
            str_name=obj_itemEvent.obj_design.str_name;
            str_value=obj_itemEvent.fn_getValue();      
      
            str_value=this.fn_validateItem(obj_item, str_name, str_value);
            if(str_name===undefined){return;}
            if(str_value===undefined){return;}              
      
            obj_item.fn_setStyleProperty(str_name, str_value);  
            obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                         
          }
      
          //this runs when a new entry is made in the property sheet 
          fn_propertyDOMStyleChangeName(){
            let obj_itemEvent, obj_item, str_name, str_value;      
            
            obj_itemEvent=obj_project.obj_projectEvent;      
            obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
            str_name=obj_itemEvent.obj_design.str_name;
            str_value=obj_itemEvent.fn_getValue();      
            
            str_value=this.fn_validateItem(obj_item, str_name, str_value);      
            
            if(str_name===undefined){return;}
            if(str_value===undefined){return;}                    
      
            this.foo_propertyDOMStyleChangeName=str_value;      
            this.fn_propertyDOMStyleChangeCheck(obj_item);            
          }
          //this runs when a new entry is made in the property sheet 
          fn_propertyDOMStyleChangeValue(){
            let obj_itemEvent, obj_item, str_name, str_value;      
            
            obj_itemEvent=obj_project.obj_projectEvent;      
            obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
            str_name=obj_itemEvent.obj_design.str_name;
            let foo_value=obj_itemEvent.fn_getValue();
            foo_value=obj_shared.fn_parseBool(foo_value);       
            this.foo_propertyDOMStyleChangeValue=foo_value;      
            this.fn_propertyDOMStyleChangeCheck(obj_item); 
            obj_item.obj_designDelegate.fn_setPaletteSelected(); 
            //console.log("bbbb");                                  
            
          }
          fn_propertyDOMStyleChangeCheck(obj_item){
            let str_name, foo_value;
            str_name=this.foo_propertyDOMStyleChangeName;
            foo_value=this.foo_propertyDOMStyleChangeValue;      
            if(str_name===undefined){return;}
            if(foo_value===undefined){return;}      
            //console.log("1111");                                  
            obj_item.fn_setStyleProperty(str_name, foo_value);    
            //console.log("2222");                                  
            return true;
          }
          
          fn_validateItem(obj_item, str_name, str_value){                                    
              return str_value;
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydomstyle
/*id: 223055//*/
/*type: xdesign1_propertydomstyle//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223054//*/
/*type: xdesign1_propertydomproperty//*/

      //XSTART component/xdesign1_propertydomproperty
        class xdesign1_propertydomproperty extends xdesign1_propertysheet{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertydomproperty");      
            this.fn_setTag("xdesign1_propertydomproperty");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("xdesign1_propertysheet");            
          }
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){   
      
            let obj_selected=obj_arg.obj_selected;
            
              if(!obj_selected){return;}                
            
              if(!obj_selected.fn_isElement()){
                return;
              }
      
              this.fn_removeAllContent();
        
              let obj_container, obj_ini;        
              
              
              obj_ini=new Holder;                    
              obj_ini.obj_design.str_type="block";                                
              this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem               
        
              obj_container=this.obj_sheetHolder;
      
              
              
              //START PROPERTY SHEET
              obj_arg=new Holder;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_container=obj_container;
              obj_arg.str_text=this.obj_design.str_text;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_propertySheet=obj_selected.obj_domProperty;                  
              obj_arg.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange";
              obj_arg.str_propertySourceChange="fn_propertyDomPropertyChange";//this runs when a new entry is made in the property sheet 
              obj_arg.obj_design.str_valueEventChange="fn_linkDomPropertyChange";//this runs when a value in the property sheet is changed                        
              obj_arg.str_optionDOMDisplay="DOMProperty";
              super.fn_onPaletteItemSelected(obj_arg);
              //END PROPERTY SHEET            
            }   
      
            fn_displayPropertySheet(obj_arg){      
              
              let str_key, foo_val;    
              let arr_Property=obj_arg.obj_item.dom_obj.attributes;
              for(var i = 0; i < arr_Property.length;i++) {
                  
                  obj_arg.str_key=arr_Property[i].name; 
                  //obj_arg.foo_val=arr_Property[i].value;                   
                  //console.log("PROPERTY: " + obj_arg.str_key  + ": " + arr_Property[i].value);
      
                  obj_arg.foo_val=obj_arg.obj_item.dom_obj[obj_arg.str_key];
                  //console.log("PROPERTY: " + obj_arg.str_key  + ": " + obj_arg.foo_val);
                  this.fn_displayPropertySheetRow(obj_arg);          
              } 
            }
          
      
            
          //this runs when a value in the property sheet is changed    
          fn_linkDomPropertyChange(){      
            
              let obj_itemEvent, obj_item, str_name, str_value;      
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              str_value=obj_itemEvent.fn_getValue();                  
              obj_item.fn_setDomProperty(str_name, str_value);                              
              obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                                       
              //obj_item.obj_designDelegate.fn_setPaletteSelected();//may not be necessary to do this                                                         
            }    
            
            //this runs when a new entry is made in the property sheet 
            fn_propertyDomPropertyChangeName(){
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);                  
              this.foo_propertyDomPropertyChangeName=foo_value;      
              this.fn_propertyDomPropertyChangeCheck(obj_item);            
            }
            
            //this runs when a new entry is made in the property sheet 
            fn_propertyDomPropertyChangeValue(){
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);                  
              this.foo_propertyDomPropertyChangeValue=foo_value;      
              this.fn_propertyDomPropertyChangeCheck(obj_item);            
              
            }
            fn_propertyDomPropertyChangeCheck(obj_item){
              let str_name, foo_value;
              str_name=this.foo_propertyDomPropertyChangeName;
              foo_value=this.foo_propertyDomPropertyChangeValue;      
              if(str_name===undefined){return;}
              if(foo_value===undefined){return;}
              obj_item.fn_setDomProperty(str_name, foo_value);      
              obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                                       
              return true;
            }    
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydomproperty
/*id: 223054//*/
/*type: xdesign1_propertydomproperty//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223053//*/
/*type: xdesign1_propertydomattribute//*/

      //XSTART component/xdesign1_propertydomattribute
        class xdesign1_propertydomattribute extends xdesign1_propertysheet{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_propertydomattribute");      
            this.fn_setTag("xdesign1_propertydomattribute");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("xdesign1_propertysheet");            
          }
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          }    
          fn_onPaletteItemSelected(obj_arg){   
      
              let obj_selected=obj_arg.obj_selected;
             
              if(!obj_selected){return;}                
        
              if(!obj_selected.fn_isElement()){
                return;
              }
      
              this.fn_removeAllContent();
        
              let obj_container, obj_ini;        
              
              
              obj_ini=new Holder;                    
              obj_ini.obj_design.str_type="block";                                
              this.obj_sheetHolder=this.fn_addItem(obj_ini);//BootItem               
              
        
              obj_container=this.obj_sheetHolder;
      
              
              this.obj_design.int_modeExecute=obj_holder.int_modeReadOnly;
              
              //START PROPERTY SHEET
              obj_arg=new Holder;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_container=obj_container;
              obj_arg.str_text=this.obj_design.str_text;
              obj_arg.obj_item=obj_selected;
              obj_arg.obj_propertySheet=obj_selected.obj_domAttribute;                 
              obj_arg.str_propertySourceChange="fn_propertyDomAttributeChange";//this runs when a new entry is made in the property sheet 
              obj_arg.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange";        
              obj_arg.obj_design.str_valueEventChange="fn_linkDomAttributeChange";//this runs when a value in the property sheet is changed      
              obj_arg.str_optionDOMDisplay="DOMAttribute";
              super.fn_onPaletteItemSelected(obj_arg);
              //END PROPERTY SHEET            
            }   
      
            fn_displayPropertySheet(obj_arg){      
              
              let str_key, foo_val;
          
              let arr_Property=obj_arg.obj_item.dom_obj.attributes;
              for(var i = 0; i < arr_Property.length; i++) {
        
              obj_arg.str_key=arr_Property[i].name;
              obj_arg.foo_val=arr_Property[i].value;        
              //console.log("ATTRIBUTE: " + obj_arg.str_key + ": " + arr_Property[i].value);
      
              //obj_arg.foo_val=obj_arg.obj_item.dom_obj.getAttribute(obj_arg.str_key);
              //console.log("ATTRIBUTE: " + obj_arg.str_key + ": " + obj_arg.foo_val);
              this.fn_displayPropertySheetRow(obj_arg);  
              
              } 
            }
          
      
            
          //this runs when a value in the property sheet is changed    
          fn_linkDomAttributeChange(){      
            
              let obj_itemEvent, obj_item, str_name, str_value;      
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              str_value=obj_itemEvent.fn_getValue();        
              obj_item.fn_setDomAttribute(str_name, str_value);      
              obj_item.obj_designDelegate.fn_setPaletteSelected();//seems to be necessary to do this                                                         
            }    
            
            //this runs when a new entry is made in the property sheet 
            fn_propertyDomAttributeChangeName(){
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);                  
              this.foo_propertyDomAttributeChangeName=foo_value;      
              this.fn_propertyDomAttributeChangeCheck(obj_item);            
            }
            
            //this runs when a new entry is made in the property sheet 
            fn_propertyDomAttributeChangeValue(){
              let obj_itemEvent, obj_item, str_name, str_value;      
              
              obj_itemEvent=obj_project.obj_projectEvent;      
              obj_item=obj_projectTarget.fn_findItemById(obj_itemEvent.obj_design.str_linkId);            
              str_name=obj_itemEvent.obj_design.str_name;
              let foo_value=obj_itemEvent.fn_getValue();
              foo_value=obj_shared.fn_parseBool(foo_value);            
              this.foo_propertyDomAttributeChangeValue=foo_value;      
              this.fn_propertyDomAttributeChangeCheck(obj_item);            
              obj_item.obj_designDelegate.fn_setPaletteSelected();                                   
            }
            fn_propertyDomAttributeChangeCheck(obj_item){
              let str_name, foo_value;
              str_name=this.foo_propertyDomAttributeChangeName;
              foo_value=this.foo_propertyDomAttributeChangeValue;      
              if(str_name===undefined){return;}
              if(foo_value===undefined){return;}
              obj_item.fn_setDomAttribute(str_name, foo_value);      
              return true;
            }
            fn_validateInput(obj_ini){       
              
              if(!obj_project.LocationMatchInstance){                
                return obj_ini;
            }
              //pls gnore this comment
              obj_ini.obj_domProperty.disabled=false;                   
              return obj_ini;
            }
            
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydomattribute
/*id: 223053//*/
/*type: xdesign1_propertydomattribute//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223009//*/
/*type: form//*/
class form extends component {
    constructor(obj_ini) {      
      super(obj_ini);        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);    
      
      //START INITIALIZE DESIGN
      this.fn_setType("form");      
      this.fn_setTag("form", true);            
      //END INITIALIZE DESIGN
      
      //START INITIALIZE DOM      
      //END INITIALIZE DOM
      
      //START INITIALIZE STYLE                  
      //END  INITIALIZE STYLE  

      this.fn_setIsContainer(true);
  }    

}//END CLS
//END IMG

/*id: 223009//*/
/*type: form//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223019//*/
/*type: svgblock//*/
//XSTART component/svgblock
class svgblock extends component{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);        
  
      //START INITIALIZE DESIGN
      this.obj_design.str_type="svgblock";    
      this.obj_design.str_tag="svgblock";    
      this.obj_design.bln_isGenericTag=true;//maybe need in the future as type is now set to be whatever is requested, rather than tag                      
      this.fn_setIsContainer(false);      
      //if(this.obj_design.filterSVG===undefined){this.obj_design.filterSVG="invert(50%)";}
      if(this.obj_design.filterSVG===undefined){this.obj_design.filterSVG="notset";}
      if(this.obj_design.pointerEventSVG===undefined){this.obj_design.pointerEventSVG="none";}
      
      if(this.obj_design.dataSVG===undefined){this.obj_design.dataSVG=obj_path.fn_getURLAssetFile(obj_project.obj_design.str_name, "default.svg");};          
      if(this.obj_design.typeSVG===undefined){this.obj_design.typeSVG="image/svg+xml"};          
      //START INITIALIZE DESIGN

      //START INITIALIZE STYLE            
      this.obj_domStyle.padding="0px";
      this.obj_domStyle.alignSelf="center";                                  
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100px";}
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100px";}            
      if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="block";}              
      //START INITIALIZE STYLE                    
    }       
    
    fn_setDesignProperty(str_name, str_value){
      super.fn_setDesignProperty(str_name, str_value);     
      this.fn_applyStyle();      
    }    
    fn_applyStyle(){
      super.fn_applyStyle();
      
      let dom_obj=this.dom_obj_svg;
      dom_obj.style.pointerEvents=this.obj_design.pointerEventSVG;          
      if(this.obj_design.filterSVG!=="notset"){
        dom_obj.style.filter=this.obj_design.filterSVG;
      }      

      /*
      //check generator here: https://codepen.io/sosuke/pen/Pjoqqp
      orange
      invert(64%) sepia(16%) saturate(4363%) hue-rotate(360deg) brightness(106%) contrast(105%)
      white
      invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
      //*/
    }

    fn_setFilter(str_value){
      this.fn_setDesignProperty("filterSVG", str_value);
    }

    fn_applyDataSVG(){
      let dom_obj=this.dom_obj_svg;
      dom_obj.data=this.obj_design.dataSVG;          
    }
    
    fn_createSelf(){

      super.fn_createSelf();
      
      let dom_obj;            
      dom_obj=document.createElement("object");                  
      dom_obj.type=this.obj_design.typeSVG;                
      dom_obj.style.padding="0px";                        
      dom_obj.style.marginBottom="0px";                        
      dom_obj.style.marginRight="0px";                              
      dom_obj.style.width="100%";
      dom_obj.style.height="100%";      
      dom_obj.innerHTML=this.obj_design.str_content;          
      this.dom_obj_svg=dom_obj;

      this.fn_applyDataSVG();//will cause display issues if refreshed
      this.dom_obj.append(dom_obj);              
  }
  }//END CLS
/*id: 223019//*/
/*type: svgblock//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223013//*/
/*type: inputandbutton//*/
class inputandbutton extends component {
    constructor(obj_ini) {

        super(obj_ini); // call the super class constructor        
    }    
    fn_initialize(obj_ini){        
        
        super.fn_initialize(obj_ini);               

        this.fn_setType("inputandbutton");      
        this.fn_setTag("inputandbutton");                        
        
        this.fn_setIsContainer(true);

        //START INITIALIZE DESIGN
        if(this.obj_design.str_text===undefined){this.obj_design.str_text=this.obj_design.str_name;}            
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM                
        //END INITIALIZE DOM         
        
        //START INITIALIZE STYLE  
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}              
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.paddingLeft="12px";}            
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="1px";}
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="1px";}
        if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}        
        //END INITIALIZE STYLE
    }    

    fn_applyTheme(){ 
        
        //if(false!=true){return;}
        super.fn_applyTheme();
        this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          
        this.fn_setStyleProperty("color", this.obj_theme.highlightColor);          
    }   
    
    fn_bootChildren(){//only in boot/pallteItem phase

        let obj_ini, obj_input;
        let obj_row, obj_cell, obj_container;

        obj_container=this;
        

        //ADD TEXT INPUT
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="input";        
        obj_ini.obj_domProperty.value="";                         
        obj_ini.obj_domStyle.marginRight="3px";                        
        obj_input=obj_container.fn_addItem(obj_ini);//BootItem                
        //END TEXT INPUT        

        //ADD BUTTON TO VALUE CELL
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="button";                
        obj_ini.obj_design.str_name=this.obj_design.str_text;
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_design.str_linkId=obj_input.obj_design.str_idXDesign;            
        //obj_ini.obj_design.str_nameEventClick=this.obj_design.str_nameEventButtonClick;
        //obj_ini.obj_design.xstr_valuexEventClick=this.obj_design.str_valueEventButtonClick;
        obj_container.fn_addItem(obj_ini);//BootItem                      
        //ADD BUTTON TO VALUE CELL    
    }
    fn_setEnabled(bln_value){
        super.fn_setEnabled(bln_value);

        let obj_item;
        obj_item=this.fn_getComponent("xdesign1_addtagInput");                                    
        if(obj_item){        
            obj_item.fn_setEnabled(bln_value);
        }
        obj_item=this.fn_getComponent("xdesign1_addtagButton");                                    
        if(obj_item){
            obj_item.fn_setEnabled(bln_value);
        }

    }
    
}//END CLS
//END MENUBUTTON

/*id: 223013//*/
/*type: inputandbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223018//*/
/*type: panel//*/
class panel extends component {
  constructor(obj_ini) {
    super(obj_ini); // call the super class constructor
  }    
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);

    //START INITIALIZE DESIGN
    this.fn_setType("panel");      
    this.fn_setTag("panel");            
    this.fn_setIsContainer(true);    
    //END INITIALIZE DESIGN

    //START INITIALIZE STYLE
    if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="flex";}          
    if(this.fn_getStyleProperty("backgroundColor")===undefined){this.obj_domStyle.backgroundColor="orange";}
    if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
    if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}    
    if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}       
    if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="auto";}             
    //END INITIALIZE STYLE      
  }

}//END CLS
//END PANEL

/*id: 223018//*/
/*type: panel//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 222999//*/
/*type: accordion//*/
class accordion extends component {
    constructor(obj_ini) {        
        super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
        super.fn_initialize(obj_ini);

        //START INITIALIZE DESIGN
        this.fn_setType("accordion");      
        this.fn_setTag("accordion");                                
        //END INITIALIZE DESIGN

        let str_name, str_value;
        str_name="width";
        str_value="100%";

        //START INITIALIZE STYLE      
        /*
        if(this.fn_getStyleProperty("width")===undefined){this.fn_setStyleProperty("width", "100%");}        
        //*/  
        //*
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}    
        //*/  
        //END INITIALIZE STYLE                
    }

    fn_bootChildren(){

        
        let obj_ini, obj_menuButton, obj_accordion, str_name;
        obj_accordion=this;

        obj_ini=new Holder;        
        obj_ini.obj_design.str_text="Group 1";              
        obj_ini.obj_design.str_idXDesign=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);//BootItem                      

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test A";                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem                
        
        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Group 2";                              
        obj_ini.obj_design.str_idXDesign=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);//BootItem                      

        obj_ini=new Holder;        
        obj_ini.obj_design.str_text="Test B";                              
        obj_menuButton.fn_addItem(obj_ini);//BootItem                

        /*
        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test C";                                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem                
        
        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Group 3";                                              
        obj_ini.obj_design.str_idXDesign=this.obj_design.str_IdMenuButton;        
        obj_menuButton=obj_accordion.fn_addItem(obj_ini);//BootItem                      

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test D";                                                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test E";                                                              
        obj_menuButton.fn_addItem(obj_ini);//BootItem

        obj_ini=new Holder;
        obj_ini.obj_design.str_text="Test F";                                                                      
        obj_menuButton.fn_addItem(obj_ini);//BootItem
        //*/
    }

    fn_addItem(obj_ini){
        //obj_ini required , used to pass accordion id etc
        
        obj_ini=this.fn_checkIni(obj_ini);        

        let obj_item;  
        obj_ini.obj_theme=this.fn_shallowCopyObject(this.obj_theme);                                  
        obj_ini.obj_design.str_type="menubutton";         
        obj_ini.obj_domStyle.flexDirection="row";           
        obj_ini.obj_domStyle.flexWrap="wrap";                  
        obj_item=super.fn_addItem(obj_ini);//CallSuper
        return obj_item;
    }
    
    //START COMPONENT EVENT HANDLING    
    fn_MenuButtonClick(){

        //console.log("aaaa");                    
        
        this.fn_open(obj_project.obj_projectEvent);    
        obj_project.fn_unsetEvent();                
    }
    fn_open(obj_target){
        
        if(!obj_target){return;}

        //obj_target.fn_open();            
        
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            let obj_item=this.obj_design.arr_item[i];            
            if(obj_item!=obj_target){
                if(!obj_item.obj_design.bln_isPinned){
                    obj_item.fn_close();                    
                }
            }
        }
    }
    //START COMPONENT EVENT HANDLING 
    fn_onClick(){           
        this.fn_event_call(obj_project.obj_holder.str_prefix + "MenuButtonClick");//trap lower                 
    }

}//END CLS
//END ACCORDION
/*id: 222999//*/
/*type: accordion//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223000//*/
/*type: block//*/

      //XSTART component/block
        class block extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                            
            
            this.fn_setType("block");      
            this.fn_setTag("block");            

            this.obj_design.bln_isGenericTag=true;//maybe need in the future as type is now set to be whatever is requested, rather than tag            
            //this.fn_extends("notset");
            this.fn_setIsContainer(true);
            
            
          }
        }//END CLS
        //END TAG
        //END component/block
        
/*id: 223000//*/
/*type: block//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223002//*/
/*type: clipboard//*/

//XSTART component/clipboard
class clipboard extends component{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("clipboard");      
    this.fn_setTag("clipboard");            
    this.obj_design.bln_isGenericTag=true;
    //this.fn_extends("abc");                
    this.fn_clear();

  }

  fn_set(obj_item){//required   
    if(!obj_item){
        this.fn_clear();
        return;            
    }     
    this.bln_hasContent=true;        
    this.obj_item=obj_item;        
  }
  fn_clear(){//required           
      this.bln_hasContent=false;        
      this.obj_item=false;        
  }
  fn_get(){//required        
      return this.obj_item;
  }    
  fn_validateCopy(obj_item, obj_localHome){        

      let bln_debug=false;      

      if(!obj_item){        
          return false;
      }
      if(obj_item===obj_projectTarget){                        
          //if(bln_debug){console.log("VALIDATE COPY: CANNOT COPY PROJECT INSTANCE")};
          return false;
      }      
      
      if(obj_item.obj_design.bln_dynamicPin){
        if(bln_debug){console.log("VALIDATE COPY: CANNOT COPY DYNMAIC PIN")};
        return false;
      }
      
      let bln_locked=obj_localHome.fn_getLocked();        
      if(bln_locked){//cannot manipulate locked component
      //if(bln_locked && obj_localHome!==obj_item){//cannot manipulate locked component
          if(bln_debug){console.log("VALIDATE COPY: LOCALHOME IS LOCKED")};
          return false;
      //}        
      }

      if(bln_debug){console.log("VALIDATE COPY: XVALIDATED")};   
      return true;
  }

  fn_copy(obj_item){//required        
      let obj_copy=this.fn_getCopy(obj_item);        
      this.fn_set(obj_copy);         
  }
  fn_getCopy(obj_item){//required        
      let obj_copy;
      let str_json=JSON.stringify(obj_item, this.fn_cloneReplacer());        
      obj_copy=JSON.parse(str_json);
      obj_copy.obj_holder=new Holder;                        
      return obj_copy;
  }  

  fn_validatePaste(obj_selected, obj_localHome){        

    let bln_debug=false;

    
      let obj_item=this.fn_get();                
      if(!obj_item){     
          if(bln_debug){console.log("VALIDATE PASTE: CLIPBOARD IS BLANK")};   
          return false;
      }  

      if(obj_item.obj_design.bln_dynamicPin){
        if(bln_debug){console.log("VALIDATE PASTE: CANNOT PASTE DYNMAIC PIN")};
        return false;
      }
      
      //console.log(obj_item);

      if(obj_selected===obj_projectTarget){                        
          //CAN PASTE INTO PROJECT INSTANCE
          if(bln_debug){console.log("VALIDATE PASTE: CANNOT PASTE PROJECT INSTANCE")};
          //return false;
      }        
              
      if(bln_debug){console.log("VALIDATE PASTE: GET CONTAINER")};   

      let obj_container=obj_project.fn_getInsertContainer(obj_selected, obj_localHome, obj_item.obj_design.int_idRecord);        
      if(!obj_container){
          if(bln_debug){console.log("VALIDATE PASTE: NO VALID CONTAINER")};   
          return false;
      }

      if(obj_container.obj_design.bln_dynamicPin){            
          return false;
      }

      if(bln_debug){console.log("VALIDATE PASTE: VALIDATED")};   

      return obj_container;
  }  

  fn_paste(obj_container){//required                
      
      //this refers to obj_delegator.obj_designDelegate                
      let obj_item;
      obj_item=this.fn_get();        
      if(!obj_item){
          console.log("CLIPBOARD PASTE ERROR: CLIPBOARD IS BLANK");
          return;
      }        
      this.fn_copy(obj_item);
      obj_item=this.fn_get();                        
      
      if(!obj_container){
          console.log("CLIPBOARD PASTE ERROR: CONTAINER IS FALSE");
          return false;
      }
      
      this.fn_clear();

      let obj_copy=obj_container.fn_addItem(obj_item);//ClientSideItem      
      return obj_copy;        
  }

  fn_validateInsert(obj_insertNextTo, obj_localHome){        

    let bln_debug=false;

    let obj_item=this.fn_get();                


    if(!obj_item){     
        if(bln_debug){console.log("VALIDATE INSERT: CLIPBOARD IS BLANK")};   
        return false;
    }  

    if(obj_item.obj_design.bln_dynamicPin){
      if(bln_debug){console.log("VALIDATE INSERT: CANNOT INSERT DYNMAIC PIN")};
      return false;
    }
    
    //console.log(obj_item);

    if(obj_insertNextTo===obj_projectTarget){                                
        if(bln_debug){console.log("VALIDATE INSERT: CANNOT INSERT BEFORE PROJECT INSTANCE")};
        return false;
    }                    

    if(bln_debug){console.log("VALIDATE INSERT: GET CONTAINER")};   

    let obj_container=obj_insertNextTo.obj_holder.obj_container;
    if(!obj_container){
        if(bln_debug){console.log("VALIDATE INSERT: NO VALID CONTAINER")};   
        return false;
    }

    if(obj_container.obj_design.bln_dynamicPin){            
        return false;
    }
    
    if(bln_debug){console.log("VALIDATE INSERT: VALIDATED")};   

    return obj_insertNextTo;
    }

    fn_insert(obj_insertNextTo){//required                      
        
        //this refers to obj_delegator.obj_designDelegate                
        let obj_item;
        obj_item=this.fn_get();        
        if(!obj_item){
            console.log("CLIPBOARD INSERT ERROR: CLIPBOARD IS BLANK");
            return;
        }   
        
        let obj_container=obj_insertNextTo.obj_holder.obj_container;
        if(!obj_container){
            console.log("CLIPBOARD INSERT ERROR: CONTAINER IS FALSE");
            return false;
        }

        this.fn_copy(obj_item);
        obj_item=this.fn_get();                        

        this.fn_clear();
        
        obj_container.obj_holder.obj_insertNextTo=obj_insertNextTo;
        let obj_copy=obj_container.fn_addItem(obj_item);//ClientSideItem
        
        return obj_copy;        
    }


  fn_validateCut(obj_item, obj_localHome){

      let bln_debug=false;
      
      if(!obj_item){        
          return false;
      }
      if(obj_item===obj_projectTarget){            
          if(bln_debug){console.log("VALIDATE CUT: CANNOT CUT PROJECT INSTANCE")};
          return false;
      }

      if(obj_item.obj_design.bln_dynamicPin){
        if(bln_debug){console.log("VALIDATE CUT: CANNOT CUT DYNMAIC PIN")};
        return false;
      }

      let bln_locked=obj_localHome.fn_getLocked();
      if(bln_locked){//cannot manipulate locked component
      //if(bln_locked && obj_localHome!==obj_item){//cannot manipulate locked component
          if(bln_debug){console.log("VALIDATE CUT: LOCALHOME IS LOCKED")};
          return false;
      //}
      }

      if(bln_debug){console.log("VALIDATE CUT: VALIDATED")};   

      return true;

  }    

  fn_validateDelete(obj_item, obj_localHome){

      let bln_debug=false;      

      if(!obj_item){        
          return false;
      }
      if(obj_item===obj_projectTarget){            
          if(bln_debug){console.log("VALIDATE DELETE: CANNOT DELETE PROJECT INSTANCE")};
          return false;
      }

      if(obj_item.obj_design.bln_dynamicPin){
        if(bln_debug){console.log("VALIDATE DELETE: CANNOT DELETE DYNMAIC PIN")};
        return false;
    }

      let bln_locked=obj_localHome.fn_getLocked();
      if(bln_locked && obj_localHome!==obj_item){//cannot delete locked part of component, except if localhome
          if(bln_debug){console.log("VALIDATE DELETE: LOCALHOME IS LOCKED")};
          return false;
      }

      if(bln_debug){console.log("VALIDATE DELETE: VALIDATED")};   

      return true;
  }    
  fn_cloneReplacer(){        
      //overide serialize object
  const seen = new WeakSet();
  return (key, value) => {  
      
      switch(key){        
          case "obj_ini":
              return;        
          case "obj_designDelegate":
              return;        
          case "int_modeExecute":
              return;        
            case "__quill":
            return;
          case "xxint_idRecord":
              //return;        
              break;
          case "str_idXDesign":        
              if(value.indexOf("myId")==0){
                  return;
              }        
          break;
          }

      if (typeof value === "object" && value !== null) {

            if(!value.constructor){return;}
          if(value.constructor.name==="Holder"){//Dont serialize this object (or the objects attached to it)
              //obj_shared.fn_enumerateObject(value, "Holder");
              return;
          }
          
          if (seen.has(value)) {
              //return "circular";
              return;                    
          }

          seen.add(value);
      }
      return value;
      };
  }  
  
}//END CLS
        //END TAG
        //END component/clipboard
  //START CLIPBOARD FUNCTION
        
/*id: 223002//*/
/*type: clipboard//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223004//*/
/*type: designfile//*/
class designfile extends AJAX {
    constructor(obj_ini) {        
      super(obj_ini); // call the super class constructor                    
    }    
    fn_initialize(obj_ini){
        super.fn_initialize(obj_ini);

        //START INITIALIZE DESIGN            
        this.fn_setType("designfile");      
        this.fn_setTag("designfile", true);                                                           
        this.obj_design.str_url_server=obj_path.fn_getURLServerFile(obj_project.obj_design.str_name, "server.php");
        //END INITIALIZE DESIGN      
        //START INITIALIZE STYLE                    
        //END INITIALIZE STYLE                

        
    }         
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
                break;
            }
        }
        if(!bln_allSaved){
            if(bln_debug){obj_instance.fn_debug("bln_allSaved is false, return");}
            return;
        }
        
        obj_instance.obj_holder.bln_markSave=false;

        //SAVE        
        if(bln_debug){
            
        }            
        if(parseInt(obj_instance.obj_design.int_modeExecute)===obj_holder.int_modeEdit){        
            if(bln_debug){obj_instance.fn_debug("ALL CHILD SAVED, I AM EDITABLE");}            
            obj_ini=new Object;
            obj_ini.obj_instance=obj_instance;
            obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;
            obj_ini.str_actionCallback="fn_saveComponent";                        
            this.fn_save(obj_ini);            
            obj_instance.obj_design.int_modeExecute=obj_holder.int_modeReadOnly;
        }
        else{            
            //if(bln_debug){obj_instance.fn_debug("ALL CHILD SAVED, I AM NON EDITABLE");}                
            //IF PARENT IS MARKED, TELL THEM                
            let obj_parent=obj_instance.fn_getParentComponent();                                                        
            if(obj_parent && obj_parent.obj_holder.bln_markSave){                            
                    if(bln_debug){obj_parent.fn_debug("PARENT");}                
                    if(bln_debug){obj_instance.fn_debug("PARENT MARKSAVE IS TRUE, CALL PARENT");}                                    
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
                        if(bln_debug){obj_parent.fn_debug("*************ERROR PARENT");}                                        
                        if(bln_debug){obj_instance.fn_debug("*************ERROR PARENT MARKSAVE IS FALSE");}                                    
                    }                    
                }             
                if(bln_debug){obj_instance.fn_debug("TOP LEVEL onSaveComponent");}   
                this.obj_holder.obj_container.onSaveComponent(); //CallBack Function                                 
            }           
        }

        if(bln_debug){obj_instance.fn_debug("EXIT");}                
    }    

    fn_save(obj_ini){         
        
        
        let obj_instance=obj_ini.obj_instance;
        if(parseInt(obj_instance.obj_design.int_modeExecute)!==obj_instance.obj_holder.int_modeEdit){            
            //console.log(obj_instance.obj_design.str_tag + ": Mode Not Valid For Operation [" + obj_instance.obj_design.int_modeExecute + "][" + obj_instance.obj_holder.int_modeEdit + "]");
            //this will be the case for runtme components , running within editable components
            return;
        }        

        obj_instance=obj_ini.obj_instance;
        obj_instance.fn_onBeforeSave();        
        
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
        this.fn_putPost(obj_post);
        
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

        

        let obj_post=new Object;         
        obj_post.URL=this.obj_design.str_url_server;
        
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
        obj_post.DynamicPin=obj_ini.bln_dynamicPin;        

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
            obj_post.HiddenProjectPin=obj_instance.obj_design.bln_hiddenProjectPin;
            obj_post.ProjectPin=obj_instance.obj_design.bln_projectPin;
            obj_post.PalettePin=obj_instance.obj_design.bln_palettePin;     
            obj_post.DynamicPin=obj_instance.obj_design.bln_dynamicPin;                                
            obj_post.LocationID=obj_instance.obj_design.str_locationID;
            obj_post.CreatedDate=obj_instance.obj_design.str_createdDate;
            obj_post.ModifiedDate=obj_instance.obj_design.str_modifiedDate;
            obj_post.CreateRelease=obj_instance.obj_design.bln_createRelease;
            obj_post.ReleaseName=obj_instance.obj_design.str_nameRelease;
                        
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
        console.log("obj_post.Action: " + obj_post.Action);
        console.log("obj_post.ActionCallBack: " + obj_post.ActionCallBack);
        //console.log("obj_post.DesignId: " + obj_post.DesignId);
        //console.log("obj_post.RecordName: " + obj_post.RecordName);
        //console.log("obj_post.RecordType: " + obj_post.RecordType);
        //console.log("obj_post.RecordId: " + obj_post.RecordId);
        //console.log("obj_post.ToggleProjectPin: " + obj_post.ToggleProjectPin);
        //console.log("obj_post.HiddenProjectPin: " + obj_post.HiddenProjectPin);
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


/*id: 223004//*/
/*type: designfile//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223005//*/
/*type: dynamiccontent//*/

      //XSTART component/dynamiccontent
        class dynamiccontent extends flex{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("dynamiccontent");      
            this.fn_setTag("dynamiccontent", true);            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("flex");            

            //START INITIALIZE DESIGN                       
            this.obj_design.bln_registerAtContainer=true;
            //END  INITIALIZE DESIGN

            //START INITIALIZE STYLE            
            /*
            if(this.fn_getStyleProperty("background-color")===undefined){this.fn_setStyleProperty("background-color", "red");}
            if(this.fn_getStyleProperty("padding")===undefined){this.fn_setStyleProperty("padding", "10px");}            
            //*/

            //*            
            //*/
            //END  INITIALIZE STYLE  
          }
          fn_prepare(){
            this.fn_removeChildren();             
          }          
          fn_onBeforeSave(){            
            this.fn_prepare();            
          }
        }//END CLS
        //END TAG
        //END component/dynamiccontent
/*id: 223005//*/
/*type: dynamiccontent//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223010//*/
/*type: grid//*/
class grid extends component {
    constructor(obj_ini) {            
      super(obj_ini); // call the super class constructor       
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);      

      //START INITIALIZE DESIGN
      this.fn_setType("grid");      
      this.fn_setTag("grid");            
      
      this.fn_setIsContainer(true);      
      
      if(this.obj_design.str_minDim==undefined){this.obj_design.str_minDim="100px";}      
      //if(this.obj_design.bln_isLocalHome===undefined){this.obj_design.bln_isLocalHome=true;}      
      
      
      //END  INITIALIZE DESIGN
      
      //START INITIALIZE STYLE        
      this.obj_domStyle.display="grid";
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="0px";}            
      if(this.fn_getStyleProperty("grid-gap")===undefined){this.fn_setStyleProperty("grid-gap", "10px");}
      if(this.fn_getStyleProperty("grid-auto-rows")===undefined){this.fn_setStyleProperty("grid-auto-rows", this.obj_design.str_gridTemplateDefault);}
      if(this.fn_getStyleProperty("grid-auto-columns")===undefined){this.fn_setStyleProperty("grid-auto-columns", this.obj_design.str_gridTemplateDefault);}      
      if(this.fn_getStyleProperty("grid-template-rows")===undefined){this.fn_setStyleProperty("grid-template-rows", this.obj_design.str_gridTemplateDefault);}            
      if(this.fn_getStyleProperty("grid-template-columns")===undefined){this.fn_setStyleProperty("grid-template-columns", this.obj_design.str_gridTemplateDefault);}                  
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="hidden";}
      
      //END INITIALIZE STYLE
    }     

    fn_initializePluginDesign(){
      this.obj_designDelegate=new DesignDelegategrid(this);                              
    }    
    fn_getIsEmpty(){
      let arr, obj_item;
      arr=this.obj_design.arr_item;
      if(!arr.length){        
        return true;
      }   
      return false;
    }
}//END CLS
//END grid
/*id: 223010//*/
/*type: grid//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223014//*/
/*type: loginpanel//*/

  //XSTART component/loginpanel
  class loginpanel extends panel{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      this.fn_setType("loginpanel");      
      this.fn_setTag("loginpanel");            
      this.obj_design.bln_isGenericTag=true;
      this.fn_extends("panel");                  
      this.obj_holder.UserDaysAuthorize=5;
      this.int_count=0;
    }
    fn_setDisabled(){              
      super.fn_setDisabled();
    }
    //START SETTINGS MANAGER EVENTS          
    //START CHECK AUTHORIZE
    /////////////////////        
    fn_setAuthorizeUserEmail(AuthorizeUserEmail){
      this.obj_holder.AuthorizeUserEmail=AuthorizeUserEmail;
    }                
    fn_setAuthorizeUserPass(AuthorizeUserPass){                          
      this.obj_holder.AuthorizeUserPass=AuthorizeUserPass;
    }              
    fn_setAuthorizeUserStatus(AuthorizeUserStatus){                          
      this.obj_holder.AuthorizeUserStatus=AuthorizeUserStatus;
    }              
    /////////////////////        
    fn_getAuthorizeObject(){
      return {        
        AuthorizeSessionKey:obj_shared.fn_getCookie("AuthorizeSessionKey"),
        AuthorizeUserEmail:this.obj_holder.AuthorizeUserEmail,
        AuthorizeUserPass:this.obj_holder.AuthorizeUserPass,
        AuthorizeUserStatus:this.obj_holder.AuthorizeUserStatus
      };
    }    
    fn_setAuthorizeObject(obj_post){
        
        let bln_valid;
        bln_valid=obj_shared.fn_validEmail(obj_post.AuthorizeUserEmail);
        if(!bln_valid){obj_post.AuthorizeUserEmail="";}
        this.fn_setAuthorizeUserEmail(obj_post.AuthorizeUserEmail);
        
        bln_valid=obj_shared.fn_validNumber(obj_post.AuthorizeUserPass);
        if(!bln_valid){obj_post.AuthorizeUserPass="";}
        this.fn_setAuthorizeUserPass(obj_post.AuthorizeUserPass);

        let bln_value=obj_shared.fn_parseBool(obj_post.AuthorizeUserStatus)
        this.fn_setAuthorizeUserStatus(bln_value);        
    }    
    fn_debugAuthorize(){
      let obj_auth=this.fn_getAuthorizeObject();
      console.log("/////////fn_debug Authorize/////////");
      console.log("AuthorizeSessionKey: " + obj_auth.AuthorizeSessionKey);
      console.log("AuthorizeUserEmail: " + obj_auth.AuthorizeUserEmail);
      console.log("AuthorizeUserPass: " + obj_auth.AuthorizeUserPass);      
      console.log("AuthorizeUserStatus: " + obj_auth.AuthorizeUserStatus);      
    }
    /////////////////////        

    
    //END CHECK AUTHORIZE
    

    fn_checkAuthorize(){
      //let obj_auth=this.fn_getAuthorizeObject();
      obj_project.fn_runAction("XDesigner_checkAuthorize", {});            
    }
    fn_onCheckAuthorize(obj_post){
      this.fn_setAuthorizeObject(obj_post);//set values from server on client
      this.fn_processAuthorize();      
    }
    fn_processAuthorize(obj_post){            
      let obj_auth=this.fn_getAuthorizeObject();//get client values            
      if(!obj_auth.AuthorizeUserStatus){
        this.fn_onEndAuthorize();              
        return;
      }
      this.fn_hideFormAuthorize();
      obj_project.fn_XDesigner_onLogIn();      
    }
    

    //START ACTION AUTHORIZE          
    fn_startAuthorize(){//runs on projectload, on loginform submit, on loginbutton press     

      let obj_item, bln_valid;
      let AuthorizeUserEmail, AuthorizeUserPass;
      AuthorizeUserEmail="";
      AuthorizeUserPass="";            
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
      if(obj_item){
        AuthorizeUserEmail=obj_item.fn_getValue();
        obj_item.fn_setDisplay(true);        
        obj_item.fn_setDomProperty("autocomplete", "email");        
        obj_item.fn_setDomProperty("type", "email");        
      }
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
      if(obj_item){
        AuthorizeUserPass=obj_item.fn_getValue();                        
        obj_item.fn_setDomProperty("placeholder", "One Time Pass");        
        obj_item.fn_setDomProperty("inputmode", "numeric");        
        obj_item.fn_setDomProperty("pattern", "[0-9]*");        
        obj_item.fn_setDomProperty("autocomplete", "one-time-code");        
        obj_item.fn_setDomProperty("type", "text");        
      }            

      bln_valid=obj_shared.fn_validEmail(AuthorizeUserEmail);
      if(!bln_valid){      
        return;
      }
      
      let obj_auth={        
        AuthorizeUserEmail:AuthorizeUserEmail,
        AuthorizeUserPass:AuthorizeUserPass
      };

      this.fn_setAuthorizeObject(obj_auth);
      this.fn_getAuthorizeObject(obj_auth);

      obj_project.fn_runAction("XDesigner_startAuthorize", obj_auth);            
    }
    fn_onStartAuthorize(obj_post){
      
      let bln_value;          
      
      this.fn_setAuthorizeObject(obj_post);//set values from server on client
      let obj_auth=this.fn_getAuthorizeObject();//get client values      
      
      let bln_valid=obj_shared.fn_validEmail(obj_auth.AuthorizeUserEmail);
      if(!bln_valid){
        bln_value=this.fn_requireAuthorizeUserEmail();        
        if(!bln_value){return false;}
      }

      if(!obj_auth.AuthorizeUserPass){
        bln_value=this.fn_requireAuthorizeUserPass();        
        if(!bln_value){return false;}                
      }        

      this.fn_processAuthorize();
    }

    fn_requireAuthorizeUserEmail(){      
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
      let AuthorizeUserEmail;
      if(obj_item){
        obj_item.fn_setDisplay(true);        
        AuthorizeUserEmail=obj_item.fn_getValue();        
      }
      
      let bln_valid=obj_shared.fn_validEmail(AuthorizeUserEmail);      
      if(!bln_valid){        
        this.fn_displayFormAuthorize();            
        return false;
      }

      this.fn_setAuthorizeUserEmail(AuthorizeUserEmail);      
      return true;
    }
    
    fn_requireAuthorizeUserPass(){
      
      let AuthorizeUserPass;
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
      if(obj_item){
        obj_item.fn_setDisplay(true);        
        AuthorizeUserPass=obj_item.fn_getValue();
      }
      if(!AuthorizeUserPass){        
        this.fn_displayFormAuthorize();
        return false;
      }
      this.fn_setAuthorizeUserPass(AuthorizeUserPass);    
      obj_item.fn_setValue("");              
      return true;
    }
    

    fn_hideFormAuthorize(){      
      this.fn_setVisibility(false);
      this.fn_setDisplay(false);
      obj_project.fn_XDesigner_onHideLogIn();      
    }                     
    
    fn_endAuthorize(){                
      let obj_auth={};      
      
      //important, dont hide pass field in processlogin or fn_onEndAuthorize
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
      if(obj_item){obj_item.fn_setDisplay(false);}      
      //important, dont hide pass field in processlogin or fn_onEndAuthorize
      
      obj_project.fn_runAction("XDesigner_endAuthorize", obj_auth);
    }    

    fn_onEndAuthorize(){      
      obj_project.fn_XDesigner_onLogOut();      
      let obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
      if(obj_item){        
        obj_item.fn_setValue("");
      }
      this.fn_displayFormAuthorize();            
    }

    fn_displayFormAuthorize(){                  
      this.fn_setVisibility(true);
      this.fn_setDisplay("flex");
      obj_project.fn_XDesigner_onShowLogIn();      
    }
    orig_backupstrart_auth(){//runs on projectload, on loginform submit, on loginbutton press      
      
      let obj_item;
      AuthorizeUserEmailSubmit="";
      AuthorizeUserPassSubmit="";            
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeSubmitEmail");                                    
      if(obj_item){AuthorizeUserEmailSubmit=obj_item.fn_getValue();}
      obj_item=obj_project.fn_getComponent("xdesign1_AuthorizeSubmitPass");                                    
      if(obj_item){AuthorizeUserPassSubmit=obj_item.fn_getValue();}            

      if(AuthorizeUserEmailSubmit===""){return;}
      if(AuthorizeUserPassSubmit===""){return;}
      
      let obj_auth={        
        AuthorizeUserEmailSubmit:AuthorizeUserEmailSubmit,
        AuthorizeUserPassSubmit:AuthorizeUserPassSubmit
      };
      obj_project.fn_runAction("XDesigner_startAuthorize", obj_auth);            
    }
    //END ACTION AUTHORIZE
  }//END CLS
  //END TAG
  //END component/loginpanel
/*id: 223014//*/
/*type: loginpanel//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223015//*/
/*type: menubutton//*/
class menubutton extends component {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor        

        
    }    
    fn_initialize(obj_ini){                
        
        super.fn_initialize(obj_ini);
        
        this.fn_setType("menubutton");      
        this.fn_setTag("button", true);      

        this.fn_setIsContainer(true);

        //START INITIALIZE DESIGN
        this.bln_isOpen=obj_ini.bln_isOpen;
        if(this.bln_isOpen===undefined){this.bln_isOpen=false}                                        

        this.obj_design.bln_listenClick=true;
        this.obj_design.str_nameEventClick=this.obj_holder.str_prefix + "MenuButtonClick";  
        this.obj_design.str_valueEventClick="fn_MenuButtonClick";                  

        if(this.obj_design.str_text===undefined){this.obj_design.str_text=this.obj_design.str_name;}            
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM
        
        
        //END INITIALIZE DOM
        
        //START INITIALIZE STYLE        
        /*
        if(this.fn_getStyleProperty("flex-wrap")===undefined){this.fn_setStyleProperty("flex-wrap", "wrap");}
        if(this.fn_getStyleProperty("display")===undefined){this.fn_setStyleProperty("display", "block");}
        if(this.fn_getStyleProperty("width")===undefined){this.fn_setStyleProperty("width", "100%");}
        if(this.fn_getStyleProperty("height")===undefined){this.fn_setStyleProperty("height", "45px");}
        if(this.fn_getStyleProperty("padding")===undefined){this.fn_setStyleProperty("padding", "3px 12px");}
        if(this.fn_getStyleProperty("border")===undefined){this.fn_setStyleProperty("border", "0px solid black");}
        if(this.fn_getStyleProperty("font-size")===undefined){this.fn_setStyleProperty("font-size", "12pt");}        
        if(this.fn_getStyleProperty("cursor")===undefined){this.fn_setStyleProperty("cursor", "pointer");}
        if(this.fn_getStyleProperty("margin-right")===undefined){this.fn_setStyleProperty("margin-right", "1px");}
        if(this.fn_getStyleProperty("margin-bottom")===undefined){this.fn_setStyleProperty("margin-bottom", "1px");}
        //*/  

        //*
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="block";}
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="45px";}    
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}
        if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                          
        if(this.obj_domStyle.fontSize===undefined){this.obj_domStyle.fontSize="12pt";}        
        if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="1px";}      
        if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}      
        //*/  
        //END INITIALIZE STYLE

        
    }        
    
    fn_createSelf(){

        super.fn_createSelf();
        
        let dom_obj;
        dom_obj=document.createElement("div");        
        this.dom_obj.parentNode.insertBefore(dom_obj, this.dom_obj.nextSibling);                
        dom_obj.style.display="none";
        this.dom_objContentContainer=dom_obj;            

        dom_obj=document.createElement("flex");
        dom_obj.style.display="flex";        
        dom_obj.style.flexWrap=this.obj_domStyle.flexWrap;        
        dom_obj.style.padding="0px";                        
        dom_obj.style.marginBottom="0px";                        
        dom_obj.style.marginRight="0px";                        
        dom_obj.style.width="100%";
        dom_obj.innerHTML=this.obj_design.str_content;
        this.dom_objContent=dom_obj;
        this.dom_flex=dom_obj;
        this.dom_objContentContainer.append(dom_obj);        
    }
    
    fn_addItem(obj_ini){
        let obj_item;        
        if(obj_ini.obj_design.str_type===undefined){
            obj_ini.obj_design.str_type="button";                   
        }        
        obj_ini.obj_theme=this.fn_shallowCopyObject(this.obj_theme);                                  
        obj_item=super.fn_addItem(obj_ini);//CallSuper
        
        return obj_item;
    }
    fn_onLoad(){
        super.fn_onLoad();        
        if(this.bln_isOpen){
            this.fn_open();        
        }
    }    
    fn_openContainer(){//not currently in use, assumes container has this funciton
        this.obj_holder.obj_container.fn_open(this);
        
    }
    fn_open(){  
        if(this.obj_domProperty.disabled){            
            return;
        }
        let style=this.dom_objContentContainer.style;
        style.display="block";
        this.bln_isOpen=true;
        //alert("fn_open: " + this.obj_domProperty.innerText);
    }
    fn_close(){                       
        let style=this.dom_objContentContainer.style;
        style.display="none";
        this.bln_isOpen=false;        
        //alert("fn_close: " + this.obj_domProperty.innerText);
    }
    fn_toggle(){                
        if(this.bln_isOpen){this.fn_close();}
        else{this.fn_open();}
    }        
    fn_setHTMLContent(){
        super.fn_setHTMLContent();    
        this.fn_setText(this.obj_design.str_text);                
    } 
    fn_onClick(){          
        //this.fn_event();                
        this.fn_toggle();
    }


      
    
}//END CLS
//END MENUBUTTON

/*id: 223015//*/
/*type: menubutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223025//*/
/*type: texteditor//*/
class texteditor extends component {
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);        

      this.fn_setType("texteditor");      
      this.fn_setTag("texteditor");                  

      this.obj_design.bln_listenChange=true;      
      
      
      if(this.obj_design.str_nameEditorTheme===undefined){
        this.obj_design.str_nameEditorTheme="snow";
      };
      if(this.obj_design.bln_showToolbar===undefined){
        this.obj_design.bln_showToolbar=false;
      };      
      if(this.obj_design.bln_useHTML===undefined){
        this.obj_design.bln_useHTML=true;
      };                  
    }

    fn_bootChildren(){//only in boot/pallteItem phase 

      let bln_showToolbar=this.obj_design.bln_showToolbar;
      let bln_useHTML=this.obj_design.bln_useHTML;
      if(bln_showToolbar=="notset"){
        bln_showToolbar=false;
      }
      if(!bln_useHTML){
        bln_showToolbar=false;
      }    
      //if(bln_showToolbar){bln_showToolbar='#toolbar-container';}  


      /*
      var xFont = Quill.import('formats/font');
      xFont.whitelist = ['mirza', 'roboto'];
      Quill.register(xFont, true);
      //*/
      
      /*
      var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                       
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          
        [{ 'font': ['Verdana'] }],                             // Here, how do I specify custom font families??
        [{ 'align': [] }],
      
      ];
      //*/

      

      //if(bln_showToolbar){bln_showToolbar=toolbarOptions;}  
      
        let quill = new Quill(this.dom_obj, {
          theme: this.obj_design.str_nameEditorTheme,          
          modules: {
            toolbar:bln_showToolbar,
            keyboard: {
              bindings: {
                'tab': {
                  key: 9,
                  handler: function(range, context) {
                    return true;
                  }
                },
                
                13: {//disallow enter key if non HTML
                  key: 13,
                  handler: function(range, context) {
                    return bln_useHTML;
                  }
                }

              }
            }            
          }
        });

      quill.root.setAttribute('spellcheck', false);      
      this.obj_holder.obj_quill=quill;

      let that =this;
      quill.on('text-change', function(delta, oldDelta, source) {                        
        that.fn_onEditorChange();        
      });
    }
    fn_setDisabledEditor(){      
      this.obj_holder.obj_quill.disable();
    }      
    fn_setEnabledEditor(){      
      this.obj_holder.obj_quill.enable();
    }      
    fn_addText(str_text){        
      this.fn_putText(str_text, true);                
    }
    fn_setText(str_text){        
      this.fn_putText(str_text);                
    }    
    fn_putText(str_text, bln_add=false){      
      //console.log("fn_putText");
      if(str_text==="xdesignblank"){
        str_text="";              
      }                
      if(str_text==="notset"){
        str_text="";
      }
      
      let obj_quill=this.obj_holder.obj_quill;
      obj_quill.bln_cancelEvent=true;
      if(!bln_add){
        obj_quill.root.innerHTML=str_text;          
      }
      else{
        obj_quill.root.innerHTML=obj_quill.root.innerHTML + this.fn_getNewLine()+str_text;          

      }
      
      obj_quill.blur();        
    }
    fn_getNewLine(){      
      return "";
      /*
      if(this.obj_design.bln_useHTML){
        return "<br>";
      }
      return "\n";
      //*/
    }
    
    fn_clearText(){      
      //console.log("fn_clearText");
      let obj_quill=this.obj_holder.obj_quill;
      obj_quill.bln_cancelEvent=true;
      obj_quill.deleteText(0,obj_quill.getLength());
      this.obj_holder.obj_quill.blur();    
    }
    fn_getText(){  
      //console.log("fn_getText");    
      let str_text;
      if(this.obj_design.bln_useHTML){
        str_text=this.obj_holder.obj_quill.root.innerHTML;
        if(str_text==="<p><br></p>"){
          str_text="";
        }
        
      } 
      else{
        str_text=this.obj_holder.obj_quill.getText();                
        //str_text=str_text.trimRight("\n");        
        str_text=str_text.trim();
      }            
      //console.log("str_text: [" + str_text + "]");

      if(str_text===""){
        str_text="xdesignblank";      
      }      
      return str_text;
    }
    fn_onEditorChange(){ 
      let obj_quill=this.obj_holder.obj_quill; 
      if(obj_quill.bln_cancelEvent){
        obj_quill.bln_cancelEvent=false;
        return;
      }
      //console.log("fn_onEditorChange");
      let changeEvent = new Event('change', { bubbles: true, cancelable: false});
      this.dom_obj.dispatchEvent(changeEvent);            
    }
    
    fn_onChange(){ //required to be in place, as the original event was fired on a 3rd party control (the wysiwyg texteditor)
      obj_project.obj_projectEvent=this;
    }           
    fn_setDisabled(bln_value){          
      super.fn_setDisabled(bln_value);      
      this.fn_setDisabledEditor();      
    }   
    fn_setEnabled(bln_value){                  
      super.fn_setEnabled(bln_value);
      this.fn_setEnabledEditor();      
    }   
    
}//END CLS
//END TAG
/*id: 223025//*/
/*type: texteditor//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223027//*/
/*type: theme//*/

      //XSTART component/theme
        class theme extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("theme");      
            this.fn_setTag("theme");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }          
          fn_onLoad(){          
              super.fn_onLoad();                                            
            
          }           
        }//END CLS
        //END TAG
        //END component/theme
/*id: 223027//*/
/*type: theme//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223029//*/
/*type: xdesign1//*/
  //XSTART component/xdesign1
  class xdesign1 extends component{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);                
      
      
      this.fn_setType("xdesign1");      
      this.fn_setTag("xdesign1");            
      this.obj_design.bln_isGenericTag=true;
      //this.fn_extends("abc");            
      this.obj_design.bln_listenChange=true;                                
      
      this.obj_holder.bln_debugEvent=false;
      this.obj_holder.bln_debugServer=true;                            
      
    }

    fn_getDebugEvent(){
      return this.obj_holder.bln_debugEvent;
    }

    fn_register(obj_item){                         
      
      super.fn_register(obj_item);
      switch(obj_item.obj_design.str_variableName){            
        case 'xdesign1_clipboard':
        obj_clipboard=obj_item;
        break;            
      }
    }

    
    fn_onLoad(){ //design project on load
        //see fn_projectTarget_onLoad for design target  on load  
        super.fn_onLoad();  
        //console.log("xdesign on load");    
        this.fn_onStateChange();                
        
        this.fn_XDesigner_checkLogIn();        
    }  

    fn_setLocationMatchInstance(obj_post){            
      let bln_value, bln_match;
      bln_value=obj_post.LocationMatchInstance;
      bln_match=true;                                    
      if(bln_value===undefined){bln_match=true;}
      if(bln_value===false){bln_match=false;}            
      this.LocationMatchInstance=bln_match;            
    }
    fn_getLocationMatchInstance(){            
      return this.LocationMatchInstance;          
    }

    fn_setLocationMatchComponentCode(obj_post){            
      let bln_value, bln_match;
      bln_value=obj_post.LocationMatchComponentCode;
      bln_match=true;                                    
      if(bln_value===undefined){bln_match=true;}
      if(bln_value===false){bln_match=false;}            
      this.LocationMatchComponentCode=bln_match;            
    }
    fn_getLocationMatchComponentCode(){            
      return this.LocationMatchComponentCode;          
    }
    
    fn_unLoad(){

      //set reference to design frames publish object, called when that object has loaded in the frame
      if(obj_projectTarget){
        obj_projectTarget=false;  
      }
      this.obj_palettSelected=false;
      //note  obj_projectTarget.obj_designDelegate will still be undefined at thsi point.                

      this.fn_onStateChange();                     

      this.fn_close();

      
    }

    fn_close(){

      let obj_item;
      obj_item=this.obj_holder.obj_xdesign1_managersettings;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managerproject;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managerpalette;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managercomponent;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managermessenger;
      if(obj_item){obj_item.fn_close();}            
      obj_item=this.obj_holder.obj_xdesign1_managertag;
      if(obj_item){obj_item.fn_close();}
    }

    fn_projectTarget_onLoad(){   //project target

      //set reference to design frames publish object, called when that object has loaded in the frame
      obj_projectTarget=this.obj_holder.obj_xdesign1_padiframe.dom_obj.contentWindow.obj_project;                         
      if(!obj_projectTarget){
        console.log("Error: obj_projectTarget is false");
      }
      //note  obj_projectTarget.obj_designDelegate will still be undefined at thsi point.  
      this.fn_onStateChange();      
    }    
    
    fn_onStateChange(){                
      
      this.obj_holder.obj_xdesign1_managersettings.fn_onStateChange();  
      this.obj_holder.obj_xdesign1_managerproject.fn_onStateChange();
      this.obj_holder.obj_xdesign1_managermessenger.fn_onStateChange();
      this.obj_holder.obj_xdesign1_managerpalette.fn_onStateChange();    
      this.obj_holder.obj_xdesign1_managertag.fn_onStateChange();    
      this.obj_holder.obj_xdesign1_managercomponent.fn_onStateChange();  
    }          
    fn_onPaletteItemSelected(){             
      
      let obj_item=this.obj_palettSelected;     
      if(!obj_item){return;}               
      
      this.obj_holder.obj_xdesign1_managerproject.fn_onPaletteItemSelected();
      this.obj_holder.obj_xdesign1_managerpalette.fn_onPaletteItemSelected();
      this.obj_holder.obj_xdesign1_managertag.fn_onPaletteItemSelected();              
      this.obj_holder.obj_xdesign1_managermessenger.fn_onPaletteItemSelected();
      this.obj_holder.obj_xdesign1_managercomponent.fn_onPaletteItemSelected();

      
    }  
    fn_onPaletteItemDeSelected(){
      let obj_item=obj_project.obj_palettSelected;   
      if(!obj_item){return;}
      /*
      this.obj_holder.obj_managerTag.fn_onPaletteItemDeSelected();  
      //*/
    }    
    fn_removeId(obj_item){
      console.log("project palette fn_removeId");
      this.obj_holder.obj_xdesign1_managerpalette.fn_removeId(obj_item);
    }      
    fn_getGlass(){
      return this.obj_holder.obj_xdesign1_padiframe.dom_obj.contentWindow;
    }
    fn_runAction(str_action,  obj_ini){         

      let obj_serverManager=this.obj_holder.obj_xdesign1_designfile;              
      if(!obj_ini){obj_ini=new Object;}
      obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;      
      obj_ini.str_action=str_action;
      obj_serverManager.fn_runAction(obj_ini);          
    }
    fn_consoleLog(str_text){
      this.obj_holder.obj_xdesign1_managersettings.fn_consoleLog(str_text);            
    }
    
    //EVENTS
    //START TAG MANAGER EVENTS          
    fn_setEazyGridSwitch(){
      return this.obj_holder.obj_xdesign1_managertag.fn_setEazyGridSwitch();
    }          
    fn_editTag(){    
      this.obj_holder.obj_xdesign1_managertag.fn_editTag();
    }
    fn_unlockPaletteSelected(){    
      this.obj_holder.obj_xdesign1_managertag.fn_unlockPaletteSelected();
    }
    fn_lockPaletteSelected(){    
      this.obj_holder.obj_xdesign1_managertag.fn_lockPaletteSelected();
    }
    fn_selectLocalHome(){
      return this.obj_holder.obj_xdesign1_managertag.fn_selectLocalHome();      
    }
    fn_clearPaletteSelect(){
      return this.obj_holder.obj_xdesign1_managertag.fn_clearPaletteSelect();      
    }
    fn_cutTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_cutTag();      
    }
    fn_deleteTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_deleteTag();      
    }
    fn_copyTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_copyTag();      
    }
    fn_pasteTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_pasteTag();      
    }
    fn_insertTag(){
      return this.obj_holder.obj_xdesign1_managertag.fn_insertTag();      
    }              
    fn_moveObjectCompassUp(){  
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassUp();
    }
    fn_moveObjectCompassDown(){  
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassDown();
    }          
    fn_moveObjectCompassHome(){
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassHome();
    }
    fn_moveObjectCompassHorizontal(){
      return this.obj_holder.obj_xdesign1_managertag.obj_holder.obj_xdesign1_objectmap.fn_moveObjectCompassHorizontal();
    }
    fn_linkCompassItem(){                        
      return this.obj_holder.obj_xdesign1_managertag.fn_linkCompassItem();
    }
    //END TAG MANAGER EVENTS
    
    //START PALETTE MANAGER EVENTS
    fn_getInsertContainer(obj_item, int_idRecord){
      return this.obj_holder.obj_xdesign1_managerpalette.fn_getInsertContainer(obj_item, int_idRecord); 
    }
    fn_addPaletteTagFromInput(){           
      return this.obj_holder.obj_xdesign1_managerpalette.fn_addPaletteTagFromInput();          
    }
    fn_addComponentItem(obj_ini){//refers to adding custom components from palett via button
      return this.obj_holder.obj_xdesign1_managerpalette.fn_addComponentItem();
    }
    fn_getListPalettePinnedComponent(){ //BUTTON EVENT
      return this.obj_holder.obj_xdesign1_managerpalette.fn_getListPinnedComponent();        
    }
    getListPalettePinnedComponent(obj_post){  
      this.obj_holder.obj_xdesign1_managerpalette.fn_onGetListPalettePinnedComponent(obj_post);
    }
    //END PALETTE MANAGER EVENTS
    //START PROJECT MANAGER EVENTS          
    fn_saveProject(){   //save the project in the iframe  
      this.obj_holder.obj_xdesign1_managerproject.fn_saveProject();    
    }
    fn_saveComponent(){ //save Selected Item                 
      this.obj_holder.obj_xdesign1_managerproject.fn_saveComponent(obj_project.obj_palettSelected);
    }
    fn_saveAsComponent(){        
      this.obj_holder.obj_xdesign1_managerproject.fn_saveasProject();
    }
    onSaveComponent(){//callback function from save function
      this.obj_holder.obj_xdesign1_managerproject.fn_onSaveComponent();  
      if(obj_project){
        if(obj_project.obj_palettSelected){                
          obj_project.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();                                        
        }
      }  
    }
    fn_openComponent(){      
      this.obj_holder.obj_xdesign1_managerproject.fn_openComponent();
    }
    fn_getListProject(){  //not required
      this.obj_holder.obj_xdesign1_managerproject.getListProject();        
    }
    getListProject(obj_post){//run action callback
      this.obj_holder.obj_xdesign1_managerproject.fn_onGetListProject(obj_post);
    }
    
    fn_releaseProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_releaseProject();        
    }
    releaseProject(obj_post){  
      this.obj_holder.obj_xdesign1_managerproject.fn_onReleaseProject(obj_post);        
    }
    fn_publishProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_publishProject();        
    }
    publishProject(obj_post){  
      this.obj_holder.obj_xdesign1_managerproject.fn_onPublishProject(obj_post);        
    }
    fn_deleteProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_deleteProject();      
    }
    deleteProject(){  
      this.obj_holder.obj_xdesign1_managerproject.fn_onDeleteProject();      
    }
    fn_toggleProjectPin(){//button event 
      this.obj_holder.obj_xdesign1_managerproject.fn_toggleProjectPin();
    }
    toggleProjectPin(){//run action callback
      this.obj_holder.obj_xdesign1_managerproject.fn_onToggleProjectPin();
    }          
    fn_newProject(){      
      this.obj_holder.obj_xdesign1_managerproject.fn_newProject();
    } 
    newProject(obj_post){             
      this.obj_holder.obj_xdesign1_managerproject.fn_onNewProject(obj_post);  
    }
    fn_openProject(int_idRecord){      
      this.obj_holder.obj_xdesign1_managerproject.fn_openProject(int_idRecord);            
    }
    openProject(obj_post){      
      this.obj_holder.obj_xdesign1_managerproject.fn_onOpenProject(obj_post);                        
    }
    //END PROJECT MANAGER EVENTS

    

    fn_XDesigner_createBackup(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_createBackup();  
    }
    XDesigner_createBackup(obj_post){ 
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_createBackup(obj_post);
    }
    fn_XDesigner_release(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_release();  
    }
    XDesigner_release(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_release(obj_post);
    }

    
    fn_XDesigner_move(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_move();  
    }
    XDesigner_move(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_move(obj_post);
    }
    fn_XDesigner_maintain(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_maintain();  
    }
    XDesigner_maintain(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_maintain(obj_post);
    }
    fn_XDesigner_compile(){
      this.obj_holder.obj_xdesign1_managersettings.fn_XDesigner_compile();  
    }
    XDesigner_compile(obj_post){
      this.obj_holder.obj_xdesign1_managersettings.fn_onXDesigner_compile(obj_post);
    }
    fn_importAll(){
      this.obj_holder.obj_xdesign1_managersettings.fn_importAll();                        
    }
    importAll(){
      this.obj_holder.obj_xdesign1_managersettings.fn_onimportAll();  
    }          
    //END  SETTINGS MANAGER EVENTS
    //START  COMPONENT MANAGER EVENTS
    fn_onOpenComponentCode(obj_post){  
      return this.obj_holder.obj_xdesign1_managercomponent.fn_onOpenComponentCode(obj_post);
    }
    //END COMPONENT MANAGER EVENTS

    //START PROPERTY SHEET EVENT HANDLING                    
    fn_linkDomStyleChange(){            
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDomStyleChange();            
    }
    fn_linkDomPropertyChange(){
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDomPropertyChange();
    }
    fn_linkDomAttributeChange(){
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDomAttributeChange();                        
    }          
    fn_linkDesignChange(){  
      return this.obj_holder.obj_xdesign1_managertag.fn_linkDesignChange();            
    }
    fn_linkTextEditChange(){            
      return this.obj_holder.obj_xdesign1_managermessenger.fn_linkTextEditChange();            
    }
    fn_propertyDOMStyleChangeName(){            
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDOMStyleChangeName();                      
    }
    fn_propertyDOMStyleChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDOMStyleChangeValue();                      
    }
    fn_propertyDomPropertyChangeName(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomPropertyChangeName();                      
    }
    fn_propertyDomPropertyChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomPropertyChangeValue();                                  
    }
    fn_propertyDomAttributeChangeName(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomAttributeChangeName();                      
    }
    fn_propertyDomAttributeChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDomAttributeChangeValue();
    }          
    fn_propertyDesignChangeName(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDesignChangeName();            
    }
    fn_propertyDesignChangeValue(){
      return this.obj_holder.obj_xdesign1_managertag.fn_propertyDesignChangeValue();                        
    }
    //END PROPERTY SHEET EVENT HANDLING

    ///////////////////////////
    ///////////////////////////
    //START PROJECT LOGIN FUNCTIONS
    //START LOGIN
    
    fn_XDesigner_checkLogIn(){      
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){obj_item.fn_checkAuthorize();}      
    }    
    fn_XDesigner_startLogIn(){      
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){obj_item.fn_startAuthorize();}      
    }    
    fn_XDesigner_onHideLogIn(){
      let obj_item=this.fn_getComponent("xdesign1_manageriframe");                                    
      if(obj_item){obj_item.fn_setDisplay(true);}

      obj_item=this.fn_getComponent("xdesign1_controlPanel");                                    
      if(obj_item){obj_item.fn_setDisplay(true);}
    }       
    fn_XDesigner_onLogIn(){      
      let obj_item;

      this.fn_consoleLog("Welcome");
      
      this.fn_onStateChange();                     

      let obj_auth=this.fn_XDesigner_getLogIn();            

      obj_item=this.fn_getComponent("xdesign1_managersettings");                                          
      if(obj_item){        
        obj_item.fn_open();
        obj_item.fn_close(false);
        obj_item.fn_XDesigner_onLogIn(obj_auth);
      }
      obj_item=this.fn_getComponent("xdesign1_managerproject");                                    
      if(obj_item){
        obj_item.fn_open();
        obj_item.fn_XDesigner_onLogIn(obj_auth);
      }      
    }    
    
    //END LOGIN
    //START LOGOUT
    fn_XDesigner_startLogOut(){  
      
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){obj_item.fn_endAuthorize();}      
    }  
    fn_XDesigner_onShowLogIn(){
      let obj_item=this.fn_getComponent("xdesign1_manageriframe");
      
      if(obj_item){                
        obj_item.fn_setDisplay(false);
      }      

      obj_item=this.fn_getComponent("xdesign1_controlPanel");                                    
      if(obj_item){obj_item.fn_setDisplay(false);}

    }    
    fn_XDesigner_onLogOut(){

      let obj_item;      
      
      let obj_auth=this.fn_XDesigner_getLogIn();            

      obj_item=this.fn_getComponent("xdesign1_managerproject");                                    
      if(obj_item){        
        obj_item.fn_XDesigner_onLogOut(obj_auth);
      }      

      this.fn_consoleLog("You are now logged out");
    }    
    //END LOGOUT
    //START CHECK LOGIN STATUS    
    fn_XDesigner_getLogIn(){
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){return obj_item.fn_getAuthorizeObject();}
      return false;      
    }   
    //END CHECK LOGIN STATUS
    //START LOGIN SERVER    
    XDesigner_checkAuthorize(obj_post){                  
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){obj_item.fn_onCheckAuthorize(obj_post);}      
    }        
    XDesigner_startAuthorize(obj_post){                  
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){obj_item.fn_onStartAuthorize(obj_post);}      
    }        
    XDesigner_endAuthorize(obj_post){
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){obj_item.fn_onEndAuthorize(obj_post);}            
    } 
    XDesigner_sendOTP(obj_post){
      let obj_item=this.fn_getComponent("loginPanel");
      if(obj_item){obj_item.fn_onSendOTP(obj_post);}            
    } 
    
    //END LOGIN SERVER
    //END PROJECT LOGIN FUNCTIONS
    ///////////////////////////
    ///////////////////////////

    //START COMPONENT EVENT HANDLING
    fn_onChange(){            
      this.fn_event_call(obj_project.obj_holder.str_prefix + "myDesignerPropertySheetOnChange");//see if the event occurred on a dom that has registered this event                     
      this.fn_event_call(obj_project.obj_holder.str_prefix + "myDesignerPaletteTextEditOnChange");//see if the event occurred on a dom that has registered this event         
      this.fn_event_call(obj_project.obj_holder.str_prefix + "boot_managerComponent_TextEditorOnChange");//see if the event occurred on a dom that has registered this event         
    
    }
    fn_onClick(){              
      
      this.fn_event_call(obj_project.obj_holder.str_prefix + "myDesignerButtonClick");//see if the event occurred on a dom that has registered this event         
    }
    //END COMPONENT EVENT HANDLING   
    
  }//END CLS
  //END TAG
  //END component/xdesign1
/*id: 223029//*/
/*type: xdesign1//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223030//*/
/*type: xdesign1_addtag//*/

            //XSTART component/xdesign1_addtag
              class xdesign1_addtag extends inputandbutton{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_addtag");      
                  this.fn_setTag("xdesign1_addtag");            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("inputandbutton");            
                }

                fn_onClick(){                  
                  
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_addtag
/*id: 223030//*/
/*type: xdesign1_addtag//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223031//*/
/*type: xdesign1_addtagbutton//*/

            //XSTART component/xdesign1_addtagbutton
              class xdesign1_addtagbutton extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_addtagbutton");      
                  this.fn_setTag("xdesign1_addtagbutton");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }

                fn_onClick(){                                   
                  //this.fn_event();                                       
                  obj_project.fn_addPaletteTagFromInput();           
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_addtagbutton
/*id: 223031//*/
/*type: xdesign1_addtagbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223032//*/
/*type: xdesign1_addtaginput//*/

            //XSTART component/xdesign1_addtaginput
              class xdesign1_addtaginput extends input{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_addtaginput");      
                  this.fn_setTag("xdesign1_addtaginput");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("input");            
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_addtaginput
/*id: 223032//*/
/*type: xdesign1_addtaginput//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223034//*/
/*type: xdesign1_deleteproject//*/

      //XSTART component/xdesign1_deleteproject
        class xdesign1_deleteproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_deleteproject");      
            this.fn_setTag("xdesign1_deleteproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){    
            obj_project.fn_deleteProject();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_deleteproject
/*id: 223034//*/
/*type: xdesign1_deleteproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223035//*/
/*type: xdesign1_import//*/

      //XSTART component/xdesign1_import
        class xdesign1_import extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_import");      
            this.fn_setTag("xdesign1_import");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("button");            
          }
          fn_onClick(){      
            obj_project.fn_importAll();
          }
          
        }//END CLS
        //END TAG
        //END component/xdesign1_import
/*id: 223035//*/
/*type: xdesign1_import//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223036//*/
/*type: xdesign1_login//*/

            //XSTART component/xdesign1_login
              class xdesign1_login extends svgblock{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_login");      
                  this.fn_setTag("xdesign1_btnLogin", true);            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("svgblock");            

                  this.obj_holder.str_filter_gray="invert(50%)";
                  this.obj_holder.str_filter_orange="invert(64%) sepia(16%) saturate(4363%) hue-rotate(360deg) brightness(106%) contrast(105%)";
                  //this.obj_holder.str_filter_electricblue="invert(47%) sepia(65%) saturate(535%) hue-rotate(150deg) brightness(94%) contrast(90%)";
                  this.obj_holder.str_filter_electricblue="invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)";
                  
                  

                  this.obj_holder.str_filter_endAuthorize=this.obj_holder.str_filter_gray;                  
                  this.obj_holder.str_filter_startAuthorize=this.obj_holder.str_filter_electricblue;

                  //this.fn_setFilter(this.obj_holder.str_filter_startAuthorize);
                   
                   
                   /*
                   #2596be electic blue
                   #389eff electic blue
                   check generator here: 
                   https://codepen.io/sosuke/pen/Pjoqqp
                   //*/
                }

                fn_onClick(){                                    
                  obj_project.fn_XDesigner_startLogOut();
                  
                }                
              }//END CLS
              //END TAG
              //END component/xdesign1_login
/*id: 223036//*/
/*type: xdesign1_login//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223037//*/
/*type: xdesign1_loginform//*/

//XSTART component/xdesign1_loginform
  class xdesign1_loginform extends component{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);                
      
      
      this.fn_setType("xdesign1_loginform");      
      this.fn_setTag("xdesign1_loginform");            
      this.obj_design.bln_isGenericTag=true;
      // this.fn_extends("component");            
    }
    fn_onLoad(){
      super.fn_onLoad();
      
      this.dom_obj.addEventListener('submit', function(event){                                       
        //console.log("fn_onLoad");
          event.preventDefault(); 
          //return false;                                               
          obj_project.fn_XDesigner_startLogIn();
      });
    }
  }//END CLS              
  //END TAG
  //END component/xdesign1_loginform
/*id: 223037//*/
/*type: xdesign1_loginform//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223038//*/
/*type: xdesign1_managercomponent//*/

      //XSTART component/xdesign1_managercomponent
        class xdesign1_managercomponent extends xdesign1_managermenu{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managercomponent");      
            this.fn_setTag("xdesign1_managercomponent");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("xdesign1_managermenu");            
          }
          fn_onStateChange(){
            if(!super.fn_onStateChange()){return;} 
            if(!obj_projectTarget){return;}                  

            let bln_value=true;
            if(!obj_project.LocationMatchInstance){bln_value=false;}                 
            this.obj_holder.obj_container.fn_setEnabled(bln_value);                    

            this.fn_createTextEditor();      
          } 
          fn_onPaletteItemSelected(){    
            
            //console.log("fn_onPaletteItemSelected");
            
            
            let str_text;       
            let obj_selected=obj_project.obj_palettSelected;            
            
            if(obj_selected!==obj_projectTarget){              
              this.obj_holder.obj_container.fn_setDisabled();                    
              return;
            }                   

            let bln_value=true;
            if(!obj_project.LocationMatchInstance){bln_value=false;}                 
            this.obj_holder.obj_container.fn_setEnabled(bln_value);                    
            
            
            let str_componentCode=obj_selected.obj_holder.str_componentCode;                  
            if(!str_componentCode){
              this.fn_openComponentCode();
              return;
            }
      
            this.fn_displayComponentCode();
          }    
      
          fn_openComponentCode(){

            //console.log("fn_openComponentCode");
      
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");                  
            let obj_ini=new Object;
            obj_ini.ObjectInstance=obj_projectTarget;         
            obj_ini.str_actionCallback="fn_onOpenComponentCode";            
            obj_ini.str_idAJAXNotifier=obj_project.obj_design.str_idXDesign;            
            obj_serverManager.fn_openComponentCode(obj_ini);
          }
      
          fn_onOpenComponentCode(obj_post){    

            obj_project.fn_setLocationMatchComponentCode(obj_post);
            
            let str_RecordType=obj_post.RecordType;            
            let str_RecordExtend=obj_post.RecordExtend;
            let str_RecordExtendComment="";
      
            
            if(!str_RecordExtend || str_RecordExtend==="notset" || str_RecordType==="component"){
              str_RecordExtend="component";
              str_RecordExtendComment="//";
            }
            
      
            let str_componentCodeDefault=`
            //XSTART component/#RecordType
              class #RecordType extends #RecordExtend{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("#RecordType");      
                  this.fn_setTag("#RecordType");            
                  this.obj_design.bln_isGenericTag=true;
                  #str_RecordExtendComment this.fn_extends("#RecordExtend");            
                }
              }//END CLS
              //END TAG
              //END component/#RecordType`;        
              
              str_componentCodeDefault=str_componentCodeDefault.replace(/#RecordType/gi, str_RecordType.toLowerCase());               
              str_componentCodeDefault=str_componentCodeDefault.replace(/#RecordExtend/gi, str_RecordExtend.toLowerCase());           
              str_componentCodeDefault=str_componentCodeDefault.replace(/#str_RecordExtendComment/gi, str_RecordExtendComment.toLowerCase());           
              
            
              let str_componentCode=obj_post.ComponentCode;                  
              if(!str_componentCode){          
                str_componentCode=str_componentCodeDefault;
              }   
              
            obj_projectTarget.obj_holder.str_componentCode=str_componentCode;       
            this.fn_displayComponentCode();
          }
          fn_displayComponentCode(){    
            
            //console.log("fn_displayComponentCode");
      
            let obj_ini;         
            let str_content; 
            let obj_selected=obj_projectTarget;
            str_content=obj_selected.obj_holder.str_componentCode;      

            let obj_texteditor=this.fn_getComponent("xdesign1_componenttexteditor");
      
            if(!obj_texteditor){                        
              //yikes add text editr
            }      
      
            let bln_useHTML=true;
            obj_texteditor.obj_design.bln_useHTML=bln_useHTML;
            obj_texteditor.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                                                                      
            obj_texteditor.obj_design.obj_linkItem=obj_selected;
      
            obj_texteditor.fn_clearText();
      
            if(str_content){      
              obj_texteditor.fn_putText(str_content);                
            }      
            obj_texteditor.fn_setDisabledEditor();
          }
          
          fn_linkTextEditorOnChange(){}    
          fn_onPaletteItemDeSelected(){//overiding for safety. can reivew overide.      
          } 
          fn_createTextEditor(){
      
            let obj_item;
            let obj_dynamicContentHolder=this.fn_getComponent("ComposerDynamicContent");            
            obj_dynamicContentHolder.fn_prepare();  
      
            let obj_ini=new Holder;    
            obj_ini.obj_design.bln_showToolbar=false;             
            obj_ini.obj_design.str_name="xdesign1_componenttexteditor";             
            obj_ini.obj_design.str_type="texteditor";                         
            obj_ini.obj_design.bln_showToolbar=false;                                
            obj_ini.obj_design.str_nameEventChange=obj_project.obj_holder.str_prefix + "xdesign1_managerComponent_TextEditorOnChange";
            obj_ini.obj_design.str_valueEventChange="fn_linkTextEditorOnChange";                              
            obj_ini.obj_domStyle.height="300px";                            
            obj_ini.obj_domStyle.width="100%";
            obj_ini.obj_domStyle.width="100%";                                  
            obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
            this.fn_register(obj_item);      
      
          }   
        }//END CLS
        //END TAG
        //END component/xdesign1_managercomponent
/*id: 223038//*/
/*type: xdesign1_managercomponent//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223039//*/
/*type: xdesign1_manageriframe//*/

      //XSTART component/xdesign1_manageriframe
        class xdesign1_manageriframe extends component{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                            
            
            this.fn_setType("xdesign1_manageriframe");      
            this.fn_setTag("xdesign1_manageriframe");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }

          fn_navigateToProjectInstance(str_url_folder){            
            let obj_glass=obj_project.fn_getGlass();      
            let str_url=str_url_folder + "/index.html?mode=edit";
            obj_glass.location.href=str_url;            
          }          
          fn_onRegisterWithProject(){                
            this.fn_reset();                       
          }
          fn_reset(){    
            let str_url=obj_path.fn_getURLAssetFile(obj_project.obj_design.str_name, "welcome.html");
            this.fn_navigateURL(str_url);                       
          }
          fn_navigateURL(str_url){            
            let obj_glass=obj_project.fn_getGlass();      
            obj_glass.location.href=str_url;                        
          }          
          
          
          
          
      
        }//END CLS
        //END TAG
        //END component/xdesign1_manageriframe
/*id: 223039//*/
/*type: xdesign1_manageriframe//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223041//*/
/*type: xdesign1_managermessenger//*/

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
            
            if(!obj_projectTarget){return;}                  
            this.obj_holder.obj_container.fn_setEnabled();                    
            //this.fn_createTextEditor();      
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
/*id: 223041//*/
/*type: xdesign1_managermessenger//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223042//*/
/*type: xdesign1_managerpalette//*/

//XSTART component/xdesign1_managerpalette
class xdesign1_managerpalette extends xdesign1_managermenu{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("xdesign1_managerpalette");      
    this.fn_setTag("xdesign1_managerpalette");                        
    this.fn_extends("xdesign1_managermenu");            
  }
  fn_onStateChange(){      
    
    if(!super.fn_onStateChange()){return;} 
    if(!obj_projectTarget){return;}   

    let bln_value;

    bln_value=true;               
    if(!obj_project.LocationMatchInstance){
      bln_value=false;
    }                 

    let obj_item;                        
    obj_item=this.fn_getComponent("xdesign1_addtag");
    if(obj_item){      
      obj_item.fn_setEnabled(bln_value);
    }               
    
    this.obj_holder.obj_container.fn_setEnabled(bln_value);    
                    
    this.fn_getListPinnedComponent();                

  }

  fn_getListPinnedComponent(){      
    obj_project.fn_runAction("getListPalettePinnedComponent");      
  }
  fn_onGetListPalettePinnedComponent(obj_post){          
    //console.log("fn_onGetListPalettePinnedComponent");            
    let arr_row=obj_post.RowData;    
    this.fn_listPinnedComponent(arr_row);
  }
  fn_listPinnedComponent(arr_row){

    let obj_ini, obj_item, obj_dynamicContentHolder;                        
    
    obj_dynamicContentHolder=this.fn_getComponent("ListPaletteDynamicContent");                        
    if(!obj_dynamicContentHolder){
      return;
    }
    obj_dynamicContentHolder.fn_prepare();                  

    let bln_disabled=false;
    if(!obj_project.LocationMatchInstance){bln_disabled=true;}//CHECK SERVER LOCKED                        
      
    
    let obj_row, int_idRecord, str_nameRecord, str_typeRecord;
    for(var i=0;i<arr_row.length;i++){
      obj_row=arr_row[i];
      if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object

      int_idRecord=obj_row.id;
      str_nameRecord=obj_row.Name;
      str_typeRecord=obj_row.Type;
      
      obj_ini=new Holder;        
      //obj_ini.obj_design.str_name="xdesign1 " + obj_row.Name;
      obj_ini.obj_design.str_name="xdesign1_buttonAddPaletteItem" + obj_row.Name;
      obj_ini.obj_design.str_text=obj_row.Name;
      obj_ini.obj_design.str_type="button";
      obj_ini.obj_design.int_idRecordTarget=int_idRecord;        
      obj_ini.obj_design.str_typeRecordTarget=str_typeRecord;
      obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
      obj_ini.obj_design.str_valueEventClick="fn_addComponentItem";                    
      obj_ini.obj_domProperty.disabled=bln_disabled;         
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
    }

    
    if(obj_projectTarget){
      obj_projectTarget.obj_designDelegate.fn_setPaletteSelected();        
    }
  }

  fn_onPaletteItemSelected(){                                             
    let obj_container=obj_project.obj_palettSelected;
    let bln_valid=this.fn_validateContainer(obj_container);   

    if(!obj_project.LocationMatchInstance){bln_valid=false;}                 
                             
    if(!bln_valid){              
      this.obj_holder.obj_container.fn_close();                    
      this.obj_holder.obj_container.fn_setDisabled();        
    }
    else{            
      this.obj_holder.obj_container.fn_setEnabled(true);                                              
    }
    
    this.fn_setPaletteEnabled(obj_container);
  }
  fn_validateContainer(obj_container, int_idRecordSearch=0){



    let bln_debug_error=false;      
    let bln_debug_valid=false;      
    let bln_isContainer;

    //At no point in the containers id lineage should int_idRecord occurr
    //(or possibly any of id records children)          
    if(!obj_container){//new component
      if(bln_debug_error){console.log("VALIDATE CONTAINER: CONTAINER IS FALSE");}
      return false;
    }   
    
    bln_isContainer=obj_container.fn_getIsContainer();            
    if(!bln_isContainer){//new component
      if(obj_container.obj_design.bln_isGenericTag && bln_isContainer===undefined){
        if(bln_debug_valid){console.log("VALIDATE CONTAINER: CHECK GENERIC TAG IS A CONTAINER");}  
        bln_isContainer=this.fn_genericTagIsContainer(obj_container.obj_design.str_tag);
      }
      if(bln_debug_error){console.log("VALIDATE CONTAINER: THIS ITEM IS NOT A CONTAINER");}
      return false;
    }      
    
    if(obj_container.fn_getLocked()){//new component
      if(bln_debug_error){console.log("VALIDATE CONTAINER: THIS CONTAINER IS LOCKED");}      
      return false;
    }                  
    
    if(parseInt(obj_container.obj_design.int_modeExecute)!==obj_holder.int_modeEdit){//new component              
      if(bln_debug_error){console.log("VALIDATE CONTAINER: THIS CONTAINER IS NOT EDITABLE");}      
      return false;
    }            

    if(int_idRecordSearch===0){//new component
      if(bln_debug_valid){console.log("VALIDATE CONTAINER: VALIDATED (ID SEARCH IS 0)");}      
      return true;
    }      
    if(obj_container.obj_design.int_idRecord===0){//new component        
      if(bln_debug_valid){console.log("VALIDATE CONTAINER: VALIDATED (ID RECORD IS 0)");}      
      return true;
    }            
    
    let bln_inHistory=obj_container.fn_searchIdHistory(obj_container, int_idRecordSearch);
    if(bln_inHistory){        
      if(bln_debug_error){console.log("VALIDATE CONTAINER: CANNOT INSERT PARENT INTO CHILD");}
      return false;
    }

    if(bln_debug_valid){console.log("VALIDATE CONTAINER: THIS CONTAINER IS VALIDATED");}
    return true;
  }          
  fn_addComponentItem(){//component Item 

    let obj_itemEvent, obj_item, str_tag, obj_ini, int_idRecord;
    obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button      
    str_tag=obj_itemEvent.dom_obj.innerText;
    obj_ini=new Holder;
    obj_ini.obj_design.str_type=obj_itemEvent.obj_design.str_typeRecordTarget;      
    obj_ini.obj_design.str_name=obj_itemEvent.obj_design.str_nameRecordTarget;      
    obj_ini.obj_design.int_modeExecute=obj_ini.int_modeReadOnly;                        
    int_idRecord=obj_itemEvent.obj_design.int_idRecordTarget;
    obj_ini.obj_design.int_idRecord=int_idRecord;           
    obj_item=this.fn_addPaletteItem(obj_ini);//ids are removed (if not locked) and new object set to selected, in designDelegate.fn_addPaletteItem
    return obj_item;     
  }        
  fn_addPaletteItem(obj_ini){

    let obj_container, obj_item;
    let str_type, str_type_container, bln_canInsert;      
    
    obj_container=obj_project.obj_palettSelected;
    if(!obj_container){return;}//e.g if no project thas been started
    let obj_localHome=obj_container.fn_getLocalHome();

    obj_container=this.fn_getInsertContainer(obj_container, obj_localHome, obj_ini.obj_design.int_idRecord);
    if(!obj_container){return;}

    str_type=obj_ini.obj_design.str_type.toLowerCase();
    str_type_container=obj_container.obj_design.str_type.toLowerCase();
    bln_canInsert=this.fn_validateInsertContainer(str_type, obj_container);
    if(!bln_canInsert){
      console.log("fn_addPaletteItem CANNOT INSERT ITEM: " + str_type + ": " + str_type_container);
      return;
    }
    
    switch(obj_ini.obj_design.str_type.toLowerCase()){        
      case "eazygriditem":
        obj_container=obj_project.obj_lastGrid;
      break;
      case "img":
        if(obj_ini.obj_domProperty.src===undefined){obj_ini.obj_domProperty.src=obj_path.fn_getURLAssetFile("eazylogo.png");}
        break;
      default:
    }
    //ADD ITEM
    //This will need to have obj_ini.obj_design.int_idRecord, if adding an saved instance component
    obj_item=obj_container.obj_designDelegate.fn_addPaletteItem(obj_ini);
    
    if(!obj_item){
      console.log("obj_item is false, check dynamic content")
      return;
    }
    if(this.fn_validateContainer(obj_item, obj_ini.obj_design.int_idRecord)){
      //obj_item.obj_designDelegate.fn_setPaletteSelected();      
    }
    else{
      //obj_container.obj_designDelegate.fn_setPaletteSelected();  //set eithe ritem or parent as selected    
    } 
    obj_item.obj_designDelegate.fn_setPaletteSelected();      
    //ADD ITEM      

    switch(obj_item.fn_getType()){
      case "eazygrid":
        obj_project.obj_lastGrid=obj_item;//not part of eazyGrid
      break;
    }
  
    switch(obj_item.fn_getType()){
      case "eazygrid":
        obj_projectTarget.fn_applyTheme();
      break;
      case "eazygriditem":
        obj_projectTarget.fn_applyTheme();
      break;
    }

    return obj_item;
  }
  fn_addPaletteTagFromInput(){
    let obj_itemEvent, obj_item, obj_ini, str_tag, str_type, str_value, str_linkId;
    let foo_val, obj_tag, str_content;      

    
    /*
    obj_itemEvent=obj_project.obj_projectEvent;//obj_itemEvent is the button
    str_linkId=obj_itemEvent.obj_design.str_linkId;//str_linkId is the input
    if(str_linkId===undefined){//likely just the input which was clicked
      alert("str_linkId: " + str_linkId);
      return;
    }    
    obj_item=obj_project.fn_findItemById(str_linkId);//this is the input
    //*/

    obj_item=this.fn_getComponent("xdesign1_addtagInput");                                    
    if(!obj_item){return;}
    
    
    str_value=obj_item.dom_obj.value;          
    str_tag=str_value;
    str_type=str_tag;
    
    obj_ini=new Holder;      
    obj_ini.obj_design.bln_isGenericTag=true;//this affects canhavechildren. turn off for specifc tags. which we have class files for.
    obj_ini.obj_design.str_tag=str_tag;           

    
    foo_val=obj_ComponentMap.get(str_tag);                            
    //if we have a class defintion
    if(foo_val){
      obj_ini.obj_design.bln_isGenericTag=false;
    }
    else{
      str_type="tag";
      
    }
    //console.log("str_type: " + str_type);

    obj_ini.obj_design.str_type=str_type;

    str_content="Place your [" + str_tag + "] content here";
    str_content="";
    obj_ini.obj_design.str_content=str_content;

    switch(str_type.toLowerCase()){
      case "p":
          obj_ini.obj_design.str_content=str_content;
        break;
      case "h1":
          obj_ini.obj_design.str_content=str_content;
      break;
      case "li":
          obj_ini.obj_design.str_content=str_content;
      break;
      default:
    }

    obj_tag=this.fn_addPaletteItem(obj_ini);
    return obj_tag;
  }
  
  fn_getInsertContainer(obj_container, obj_localHome, int_idRecord){                  

    let bln_valid=this.fn_validateContainer(obj_container, int_idRecord);            

    if(!bln_valid){        
      return false;
    }
    return obj_container;
    
    /*
    if(!bln_valid){        
      if(!obj_container){        
        return false;
      }            
      obj_container=obj_container.fn_getParentComponent();//parent or false                
      if(!obj_container){        
        return false;
      }        
      if(obj_container==obj_localHome && obj_localHome.fn_getLocked()){//dont go past local lockled home
        return false;
      }
        //dont go up past localhome
      obj_container=this.fn_getInsertContainer(obj_container, obj_localHome, int_idRecord);
    }
    return obj_container;
    //*/
  }
  fn_setPaletteEnabled(obj_container){    

    let arr, obj_item;
    let str_type, str_type_container, bln_canInsert;

    let obj_dynamicContentHolder=this.fn_getComponent("ListPaletteDynamicContent");                        
    if(!obj_dynamicContentHolder){
      return;
    }
    
    let obj_component=obj_dynamicContentHolder;
    arr=obj_component.obj_design.arr_item;                                  
    for(let i=0;i<arr.length;i++){
        obj_item=obj_component.obj_design.arr_item[i];          
        //console.log("obj_item: " + obj_item);
        if(obj_item){            
          str_type=obj_item.obj_design.str_typeRecordTarget;
          if(!str_type){str_type="";}    
          str_type_container=obj_container.obj_design.str_type;
          bln_canInsert=this.fn_validateInsertContainer(str_type, obj_container);                                
          if(!bln_canInsert){            
            obj_item.fn_setDisabled();            
            //console.log("fn_setDisabled str_type: " + str_type);
          }
          else{
            obj_item.fn_setEnabled();
            //console.log("fn_setEnabled str_type: " + str_type);
          }
        }
    }                
  }  
  fn_validateInsertContainer(str_type, obj_container){
      
    let str_typeToInsert, str_type_container, bln_value, str_listIn;

    str_typeToInsert=str_type.toLowerCase();    
    str_type_container=obj_container.obj_design.str_type.toLowerCase();

    bln_value=false;        
    switch(str_type_container){                      
      case "eazygrid":                          
        str_listIn="eazygriditem,loginpanel";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;              
    break;        
      case "table":                          
        str_listIn="tablerow,tablebody,tablehead,tablefoot";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;        
      case "tablerow":                          
        str_listIn="tablecell,tableheader";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      case "tablefoot":                          
        str_listIn="tablerow";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      case "tablebody":                          
        str_listIn="tablerow";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      case "tablehead":                          
        str_listIn="tablerow";
        if(obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          bln_value=true;
        }                      
      break;                
      default:
        //set true to insert all else, other than the below list
        str_listIn="tablerow,tablecell,tableheader,tablehead,tablefoot,eazygriditem,loginpanel";
        if(!obj_shared.fn_inStr(","+str_typeToInsert+",", ","+str_listIn+",")){                
          //console.log(str_type_container + ": " + str_typeToInsert);
          bln_value=true;
        }                                
    }    
    
    switch(str_typeToInsert){                      
      case "loginpanel":           
        //bln_value=false;
        str_listIn="grid";
        if(!obj_shared.fn_inStr(","+obj_container.obj_domStyle.display+",", ","+str_listIn+",")){                        
          bln_value=true;
        }            
      break;                       
    }


    return bln_value;
  }  

  fn_removeId(obj_item){      
    
    console.log("manager palette fn_removeId");

    let bln_locked=obj_item.obj_design.bln_lockComponent;              
    bln_locked=obj_shared.fn_parseBool(bln_locked);
    if(bln_locked){        
      console.log("fn_removeId bln_locked");
      return;
    } 

    obj_item.obj_design.int_idRecord=0;      
    obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;              

    var arr_item=obj_item.obj_design.arr_item;
    console.log("arr_item: " +  arr_item.length);
    
    for(var i=0;i<arr_item.length;i++){            
        obj_item=arr_item[i];
        console.log("i: " +  i);
        console.log("int_idRecord: " +  obj_item.obj_design.int_idRecord);        
        this.fn_removeId(obj_item);
    }
  }
}//END CLS
//END TAG
//END component/xdesign1_managerpalette
/*id: 223042//*/
/*type: xdesign1_managerpalette//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223043//*/
/*type: xdesign1_managerproject//*/

      //XSTART component/xdesign1_managerproject
        class xdesign1_managerproject extends xdesign1_managermenu{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managerproject");      
            this.fn_setTag("xdesign1_managerproject");            
            this.obj_design.bln_isGenericTag=true;            
            //this.fn_extends("abc");            
          }
          fn_XDesigner_onLogIn(obj_auth){            
            //this.fn_newProject();
          }
          fn_XDesigner_onLogOut(obj_auth){
            //this.fn_newProject();
          }
          fn_onStateChange(){                        
            
            if(!super.fn_onStateChange()){return;} 
            let bln_value, bln_valueFlip;
            bln_value=false;                        
            if(obj_projectTarget){              
              if(obj_projectTarget.obj_design.int_idRecord){
                bln_value=true;               
              }
            }                                    

            //CHECK PROJECT SERVER LOCKED                              
            if(!obj_project.LocationMatchInstance){
              bln_value=false;
            }                 
            
            
            bln_valueFlip==obj_shared.fn_flipBool(bln_value);            

            let obj_item;                        
            obj_item=this.obj_holder.obj_xdesign1_deleteproject;                        
            if(obj_item){obj_item.fn_setEnabled(bln_value)};            
            obj_item=this.obj_holder.obj_xdesign1_publishproject;       
            if(obj_item){obj_item.fn_setEnabled(bln_value)};            
            obj_item=this.obj_holder.obj_xdesign1_releaseproject;       
            if(obj_item){obj_item.fn_setEnabled(bln_value)};            
            
            this.obj_holder.obj_container.fn_setEnabled();        
            this.fn_getListProject();
            
          }
          fn_listProject(arr_row){            
            
            //console.log("fn_listProject");            
      
            let obj_ini, obj_item, obj_dynamicContentHolder;                        
            let obj_row;
            
            obj_dynamicContentHolder=this.fn_getComponent("ListProjectDynamicContent");            
            if(!obj_dynamicContentHolder){
              return;
            }
            obj_dynamicContentHolder.fn_prepare();            
      
            for(var i=0;i<arr_row.length;i++){        
              obj_row=arr_row[i];
              
              if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object
              obj_ini=new Holder;
              obj_ini.obj_design.bln_dynamicPin=true;                            
              obj_ini.obj_design.str_name="xdesign1_buttonOpenProject" + obj_row.Name;
              obj_ini.obj_design.str_text=obj_row.Name;
              obj_ini.obj_design.str_type="button";
              obj_ini.obj_design.int_idRecordTarget=obj_row.id;
              obj_ini.obj_design.str_typeRecord=obj_row.Type;
              obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
              obj_ini.obj_design.str_valueEventClick="fn_openProject";
              obj_ini.obj_domProperty.disabled=false;      
              obj_ini.obj_design.int_idRecordTarget=obj_row.id;              
              obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);//BootItem                                                 
            }
          }              
          //Event
          fn_getListProject(){
            //console.log("fn_getListProject");
            obj_project.fn_runAction("getListProject");
          }
          fn_onGetListProject(obj_post){
            let arr_row=obj_post.RowData;
            this.fn_listProject(arr_row);
          }
          fn_releaseProject(){

            console.log("fn_releaseProject");

            if(!obj_projectTarget){
              return;
            }

            obj_project.fn_close();

            obj_project.fn_runAction("releaseProject");
          }
          fn_onReleaseProject(obj_post){
            console.log("Released Project: " + obj_projectTarget.obj_design.str_name);                        
            obj_project.fn_onStateChange();                        
          }
          fn_publishProject(){      

            console.log("fn_publishProject");

            if(!obj_projectTarget){
              return;
            }

            obj_project.fn_close();
      
            
            let obj_serverManager=obj_project.obj_holder.obj_xdesign1_designfile;
            let obj_ini=new Object;
            obj_ini.obj_instance=obj_projectTarget;
            obj_ini.str_idAJAXNotifier=obj_project.obj_design.str_idXDesign;
            obj_ini.str_actionCallback="publishProject";
            obj_serverManager.fn_publish(obj_ini);
            
          }
          fn_onPublishProject(obj_post){
            console.log("Published Project: " + obj_projectTarget.obj_design.str_name);            
            console.log("URLProjectVersion: " + obj_post.URLProjectVersion);                        
            obj_project.fn_onStateChange();            
            this.fn_viewInBrowser(obj_post.URLProjectVersion);
          }
          fn_viewInBrowser(str_url){            
            let o=window.open(str_url, "xDesignViewInBrowser");
            if(o){o.focus()}
          }
          fn_openComponent(){      
            let int_idRecord=obj_project.obj_palettSelected.obj_design.int_idRecord;      
            this.fn_openProject(int_idRecord);
          }  
          fn_openProject(int_idRecord){//Add Project Item From Project Menu

            obj_project.fn_unLoad();                                 
           
            //if(this.obj_menuButton){this.obj_menuButton.fn_close();}
            let obj_itemEvent; 
            //int_idRecord can be set when this funciton is called from script
            
            if(int_idRecord===undefined){
              //set int_idRecord from event button click
              obj_itemEvent=obj_project.obj_projectEvent;                            
              int_idRecord=obj_itemEvent.obj_design.int_idRecordTarget;                   
              obj_project.fn_unsetEvent();                
            }
      
            
            let obj_post;            
            obj_post={
              RecordId:int_idRecord
            };
            obj_project.fn_runAction("openProject", obj_post);
          }    
          fn_deleteProject(){//to delete the loaded instance

            //console.log("fn_deleteProject");

            if(!obj_projectTarget){
              return;
            }

            obj_project.fn_close();
      
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");            
            let obj_ini=new Object;
            obj_ini.obj_instance=obj_projectTarget;      
            obj_ini.str_idAJAXNotifier=obj_project.obj_design.str_idXDesign;            
            obj_ini.str_actionCallback="deleteProject";                              
            let bln_success=obj_serverManager.fn_delete(obj_ini);      
            if(!bln_success){
              obj_project.fn_onStateChange();
            }
          }
          fn_onDeleteProject(){
      
            console.log("Deleted Project");
            obj_project.fn_onStateChange();      
            this.fn_newProject();
          }
          fn_newProject(){//BUTTON PRESS            
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("newProject");
          }    
          fn_onNewProject(obj_post){  
            obj_project.fn_onStateChange();      
            this.fn_onOpenProject(obj_post);
          }    
          fn_onOpenProject(obj_post){      
            
            obj_project.fn_setLocationMatchInstance(obj_post);
            
      
            obj_clipboard.fn_clear();                   
            obj_project.obj_holder.obj_xdesign1_manageriframe.fn_navigateToProjectInstance(obj_post.URLProjectVersion);            
            this.obj_holder.obj_container.fn_close();              
            
            this.obj_holder.obj_container.fn_setText(obj_post.RecordName);                  
            obj_project.fn_onStateChange();      

            obj_project.fn_consoleLog("Loaded: " + obj_post.RecordName);
            //console.log("Loaded: " + obj_post.RecordName);            
          }    
          fn_onPaletteItemSelected(){
            //console.log("fn_onPaletteItemSelected");            
          }          
          fn_toggleProjectPin(){
            obj_project.fn_runAction("toggleProjectPin");
          }
          fn_onToggleProjectPin(){                  
            obj_project.fn_onStateChange();
          }  
          fn_saveasProject(){//This relates to saving a component within the Project Isntance ie from the aciton button                       
    
            let obj_item, str_name;
      
            obj_item=obj_project.obj_palettSelected;
            
            obj_item.fn_setLocked(false);      
            obj_project.fn_removeId(obj_item);
            obj_item.fn_setLocked(true);                  
      
            let str_addon=" Copy";      
            str_name=this.fn_getAddOnString(obj_item.fn_getName(), str_addon);      
            obj_item.fn_setName(str_name);      
            
            this.obj_holder.obj_container.fn_setText(str_name);
            obj_project.fn_saveProject();            
          } 
          fn_getAddOnString(str_orig, str_addon){
            let str_new;
            
            str_new=str_orig.replace(str_addon, "");
            str_new+=str_addon;
            return str_new;
          }      
          fn_saveProject(){
            //globabl save utility, not currently in use, due to the save hole
            //requires to "look" for non saved areas
      
            obj_project.fn_close();
            
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");      
            let obj_ini=new Object;
            obj_ini.ObjectInstance=obj_projectTarget;                   
            obj_serverManager.fn_saveComponent(obj_ini);
          }
          fn_saveComponent(obj_item){//This relates to saving a component within the Project Isntance ie from the action button      
            
            let obj_parent=obj_item.obj_holder.obj_container;            
            let obj_serverManager=obj_project.fn_getComponent("xdesign1_designfile");      
            let obj_ini=new Object;
            obj_ini.ObjectInstance=obj_item;                 
            obj_item.obj_designDelegate.fn_setPaletteSelected();
            obj_serverManager.fn_saveComponent(obj_ini);           
          }
          fn_onSaveComponent(){//CallBack Function from designfile            
            this.obj_holder.obj_container.fn_setText(obj_projectTarget.obj_design.str_name);            
            this.fn_onStateChange();           
            console.log("Saved: " + obj_project.obj_palettSelected.obj_design.str_name);
          }              
          fn_close(){                        
            super.fn_close();
          }

        }//END CLS
        //END TAG
        //END component/xdesign1_managerproject
/*id: 223043//*/
/*type: xdesign1_managerproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223044//*/
/*type: xdesign1_managersettings//*/

      //XSTART component/xdesign1_managersettings
        class xdesign1_managersettings extends xdesign1_managermenu{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_managersettings");      
            this.fn_setTag("xdesign1_managersettings");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("xdesign1_managermenu");                        
          }

          
          fn_XDesigner_onLogIn(obj_auth){            
            let obj_item;
            let bln_displaySysAdmin=false;            
            let bln_visibleUserAuthor=false;
            
            obj_auth.AuthorizeStatusUserAuthor=true;
            obj_auth.AuthorizeStatusSysAdmin=true;
            if(obj_auth.AuthorizeStatusUserAuthor){                          
              bln_visibleUserAuthor=true;              
              if(obj_auth.AuthorizeStatusSysAdmin){                          
                bln_displaySysAdmin=true;
              }
            }
            else{
              obj_item=this.fn_getComponent("xdesign1_console");
              if(obj_item){obj_item.fn_setDisplay(true)};  

              obj_project.fn_consoleLog("Please login");

              obj_item=obj_project.fn_getComponent("loginPanel");                        
              if(obj_item){obj_item.fn_setVisibility(false);}            
            }

            obj_item=this.obj_holder.obj_xdesign1_import;
            if(obj_item){obj_item.fn_setVisibility(bln_visibleUserAuthor)};            

            obj_item=this.obj_holder.obj_xdesign1_xmaintain;
            if(obj_item){obj_item.fn_setVisibility(bln_visibleUserAuthor)};      
          
            obj_item=this.obj_holder.obj_xdesign1_xcreatebackup;
            if(obj_item){obj_item.fn_setDisplay(bln_displaySysAdmin)};                        
          
            obj_item=this.obj_holder.obj_xdesign1_xcompile;
            if(obj_item){obj_item.fn_setDisplay(bln_displaySysAdmin)};            

            obj_item=this.obj_holder.obj_xdesign1_move;
            if(obj_item){obj_item.fn_setDisplay(bln_displaySysAdmin)};            

            obj_item=this.obj_holder.obj_xdesign1_release;
            if(obj_item){obj_item.fn_setDisplay("none")};            
          }
          
          //START XDESIGNER SPECIFIC EVENT          
          fn_onStateChange(){     
            //this runs onload
            //this run when the state of the applicationa as a whole changes                        
            
            if(!super.fn_onStateChange()){}                        
            this.obj_holder.obj_container.fn_setEnabled();
            
          }            
          fn_importAll(){                
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("importAll");            
          }    
          fn_onimportAll(){                
            obj_project.fn_consoleLog("Complete Import All");
            obj_project.fn_onStateChange();   
            this.fn_open();
          }  
          fn_XDesigner_release(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_release");            
          }    
          fn_onXDesigner_release(){                 
            obj_project.fn_consoleLog("Complete Release");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          fn_XDesigner_move(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_move");            
          }    
          fn_onXDesigner_move(){                 
            obj_project.fn_consoleLog("Complete Move");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          
          fn_XDesigner_maintain(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_maintain");            
          }    
          fn_onXDesigner_maintain(){                 
            obj_project.fn_consoleLog("Complete Maintain");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          fn_XDesigner_compile(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_compile");
          }    
          fn_onXDesigner_compile(){                 
            obj_project.fn_consoleLog("Complete Compile");
            obj_project.fn_onStateChange();
            this.fn_open();
          }                          
          fn_XDesigner_createBackup(){    
            obj_project.fn_unLoad();                           
            obj_project.fn_runAction("XDesigner_createBackup");
          }    
          fn_onXDesigner_createBackup(obj_post){                 
            obj_project.fn_consoleLog("Complete Create Backup: " + obj_project.obj_design.str_name);
            obj_project.fn_onStateChange();   
            this.fn_open();
          }          
          

          fn_consoleLog(str_text){
            let obj_item;
            obj_item=this.fn_getComponent("xdesign1_console");
            obj_item.fn_setDisplay(true);
            if(obj_item){
              obj_item.fn_setText(str_text);
              //obj_item.fn_addText(str_text);
            }

          }    
          

        }//END CLS
        //END TAG
        //END component/xdesign1_managersettings
/*id: 223044//*/
/*type: xdesign1_managersettings//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223045//*/
/*type: xdesign1_managertag//*/

  //XSTART component/xdesign1_managertag
  class xdesign1_managertag extends xdesign1_managermenu{
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      this.fn_setType("xdesign1_managertag");      
      this.fn_setTag("xdesign1_managertag");            
      this.obj_design.bln_isGenericTag=true;
      this.fn_extends("xdesign1_managermenu");            
      
      this.fn_requires("xdesign1_objectmap");                  
      this.fn_requires("xdesign1_objectaction");    
      this.fn_requires("xdesign1_propertydesignui");    
      this.fn_requires("xdesign1_propertydomstyle");    
      this.fn_requires("xdesign1_propertydomproperty");    
      this.fn_requires("xdesign1_propertydomattribute");    
      this.fn_requires("xdesign1_propertydesign");
    }
    fn_onStateChange(){
      if(!super.fn_onStateChange()){return;}       
      if(!obj_projectTarget){return;}                 
      
      let bln_value=true;      
      if(!obj_project.LocationMatchInstance){bln_value=false;}                 
      this.obj_holder.obj_container.fn_setEnabled(bln_value);
    } 
    fn_onPaletteItemSelected(){

      let obj_item;  

      this.fn_addDynamicItems();      
      
      let obj_selected=obj_project.obj_palettSelected;                
      let obj_arg=this.fn_shallowCopyObject(obj_selected.obj_holder.obj_levelLimit);                
      obj_arg.obj_selected=obj_selected;            
      
      obj_item=this.obj_holder.obj_xdesign1_objectmap;            
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}                

      obj_item=this.obj_holder.obj_xdesign1_objectaction;            
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydesignui;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        
      
      obj_item=this.obj_holder.obj_xdesign1_propertydomstyle;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydomproperty;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydomattribute;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      obj_item=this.obj_holder.obj_xdesign1_propertydesign;
      if(obj_item){obj_item.fn_onPaletteItemSelected(obj_arg);}        

      let bln_value=true;      
      if(!obj_project.LocationMatchInstance){bln_value=false;}                 
      this.obj_holder.obj_container.fn_setEnabled(bln_value);      
      this.obj_holder.obj_container.fn_open();

    }

    fn_addDynamicItems(){    

      let obj_ini, obj_item, obj_dynamicContentHolder;  
      
      obj_dynamicContentHolder=this.fn_getComponent("ListTagDynamicContent");
      
      if(!obj_dynamicContentHolder){
        return;
      }     

      obj_dynamicContentHolder.fn_prepare();        
      
      
      obj_ini=new Holder;                            
      obj_ini.obj_design.str_name="xdesign1_objectmap";                 
      obj_ini.obj_design.str_text="MAP";                        
      obj_ini.obj_design.str_tag="xdesign1_objectmap";                               
      obj_ini.obj_design.str_type="xdesign1_objectmap";       
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);      
      this.fn_register(obj_item);      
      
      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_objectaction";              
      obj_ini.obj_design.str_text="ACTION";                      
      obj_ini.obj_design.str_tag="xdesign1_objectaction";                     
      obj_ini.obj_design.str_type="xdesign1_objectaction";                   
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);      

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydesignui";         
      obj_ini.obj_design.str_text="DESIGN UI";                       
      obj_ini.obj_design.str_type="xdesign1_propertydesignui";       
      obj_ini.obj_design.str_tag="xdesign1_propertydesignui";                         
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);      
      
      obj_ini=new Holder;                    
      obj_ini.obj_design.str_name="xdesign1_propertydomstyle";    
      obj_ini.obj_design.str_text="STYLE";                        
      obj_ini.obj_design.str_type="xdesign1_propertydomstyle";       
      obj_ini.obj_design.str_tag="xdesign1_propertydomstyle";        
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);           
      this.fn_register(obj_item);

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydomproperty";    
      obj_ini.obj_design.str_text="PROPERTY";                           
      obj_ini.obj_design.str_type="xdesign1_propertydomproperty";       
      obj_ini.obj_design.str_tag="xdesign1_propertydomproperty";                   
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);           
      this.fn_register(obj_item);

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydomattribute";   
      obj_ini.obj_design.str_text="ATTRIBUTE";                           
      obj_ini.obj_design.str_type="xdesign1_propertydomattribute";       
      obj_ini.obj_design.str_tag="xdesign1_propertydomattribute";                   
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);

      obj_ini=new Holder;                
      obj_ini.obj_design.str_name="xdesign1_propertydesign";         
      obj_ini.obj_design.str_text="DESIGN";                       
      obj_ini.obj_design.str_type="xdesign1_propertydesign";       
      obj_ini.obj_design.str_tag="xdesign1_propertydesign";                         
      obj_item=obj_dynamicContentHolder.fn_addItem(obj_ini);
      this.fn_register(obj_item);
    }
    fn_linkCompassItem(obj_target){                     

      this.obj_holder.obj_xdesign1_objectmap.fn_linkCompassItem(obj_target);
    }
    fn_copyTag(){

      let obj_item=obj_project.obj_palettSelected;      
      let obj_localHome=obj_item.fn_getLocalHome();

      if(!obj_clipboard.fn_validateCopy(obj_item, obj_localHome)){return;}
      
      obj_clipboard.fn_copy(obj_item);
      let obj_copy=obj_clipboard.fn_get();     
      
      this.fn_removeId(obj_copy);      
      obj_copy.obj_design.bln_palettePin=false;        
      obj_copy.obj_design.bln_projectPin=false;              
      

      obj_item.obj_designDelegate.fn_setPaletteSelected();       
    }
    fn_removeId(obj_item){   
      
      console.log("manager tag fn_removeId");

      let bln_locked=obj_item.obj_design.bln_lockComponent;              
      bln_locked=obj_shared.fn_parseBool(bln_locked);
      if(bln_locked){        
        return;
      } 

      //let obj_localHome=obj_selected.fn_getLocalHome();      
      //bln_locked=obj_localHome.fn_getLocked();
      
      
      obj_item.obj_design.int_idRecord=0;      
      obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;              

      let arr=obj_item.obj_design.arr_item;
      for(let i=0;i<arr.length;i++){            
          this.fn_removeId(arr[i]);
      }
    } 
    fn_pasteTag(){      
      let obj_item=obj_project.obj_palettSelected;            
      let obj_localHome=obj_item.fn_getLocalHome();
      let obj_container=obj_clipboard.fn_validatePaste(obj_item, obj_localHome);
      if(!obj_container){return;}

      obj_item=obj_clipboard.fn_paste(obj_container);       
      //obj_item.obj_designDelegate.fn_removeId();
      //obj_clipboard.fn_clear();                                            
      
      //obj_container.obj_design.int_modeExecute=obj_holder.int_modeEdit;      
      //obj_container.obj_designDelegate.fn_setPaletteSelected();          
      obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;      
      obj_item.obj_designDelegate.fn_setPaletteSelected();          
    }
    fn_insertTag(){      
      let obj_item=obj_project.obj_palettSelected;            
      let obj_localHome=obj_item.fn_getLocalHome();
      let obj_insertNextTo=obj_clipboard.fn_validateInsert(obj_item, obj_localHome);
      if(!obj_insertNextTo){return;}
      
      obj_item=obj_clipboard.fn_insert(obj_insertNextTo);                   
      //obj_item.obj_designDelegate.fn_removeId();
      //obj_clipboard.fn_clear();                                                  
      obj_item.obj_designDelegate.fn_setPaletteSelected();          
    }
    fn_cutTag(){
      let obj_item=obj_project.obj_palettSelected;      
      let obj_localHome=obj_item.fn_getLocalHome();

      if(!obj_clipboard.fn_validateCut(obj_item, obj_localHome)){return;}
      obj_clipboard.fn_copy(obj_item);
      this.fn_deleteTag();
    }
    fn_deleteTag(){
      let obj_item=obj_project.obj_palettSelected;            
      let obj_localHome=obj_item.fn_getLocalHome();
      let bln_status=obj_clipboard.fn_validateDelete(obj_item, obj_localHome);
      if(!bln_status){return;}

      let obj_container=obj_item.obj_holder.obj_container;
      obj_item.obj_designDelegate.fn_setPaletteDeSelected();                      
      obj_container.fn_removeItem(obj_item);

      obj_container.obj_design.int_modeExecute=obj_holder.int_modeEdit;      

      /*
      obj_item=obj_container.fn_getEndItem();//return the item or its last child for seleciton                                      
      obj_item.obj_designDelegate.fn_setPaletteSelected();      
      obj_item.fn_debug("END ITEM");
      //*/

      obj_container.obj_designDelegate.fn_setPaletteSelected();      
    }    
    fn_selectLocalHome(){      
      let obj_localHome=obj_project.obj_palettSelected.fn_getNextLocalHome();      
      obj_localHome.obj_designDelegate.fn_setPaletteSelected();
    }    
    fn_editTag(){
      let obj_item=obj_project.obj_palettSelected;            
      obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;      
      obj_item.obj_designDelegate.fn_setChildrenModeExecute(obj_holder.int_modeEdit);//new change to also set children to editable
      obj_item.obj_designDelegate.fn_setPaletteSelected();       
    }    
    fn_setEazyGridSwitch  (){
      return this.obj_holder.obj_xdesign1_objectaction.fn_setEazyGridSwitch();
    }        
    //START PROPERTY SHEET EVENT HANDLING                    
    fn_linkDomAttributeChange(){      
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_linkDomAttributeChange();
    }
    fn_linkDesignChange(){      
      return this.obj_holder.obj_xdesign1_propertydesign.fn_linkDesignChange();
    }
    fn_linkDomStyleChange(){
      return this.obj_holder.obj_xdesign1_propertydomstyle.fn_linkDomStyleChange();      
    }
    fn_linkDomPropertyChange(){
      return this.obj_holder.obj_xdesign1_propertydomproperty.fn_linkDomPropertyChange();      
    } 
    fn_linkDomAttributeChange(){
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_linkDomAttributeChange();      

    }           
    fn_propertyDOMStyleChangeName(){
      return this.obj_holder.obj_xdesign1_propertydomstyle.fn_propertyDOMStyleChangeName();      
    }
    fn_propertyDOMStyleChangeValue(){
      return this.obj_holder.obj_xdesign1_propertydomstyle.fn_propertyDOMStyleChangeValue();                  
    }
    fn_propertyDomPropertyChangeName(){
      return this.obj_holder.obj_xdesign1_propertydomproperty.fn_propertyDomPropertyChangeName();            
    }
    fn_propertyDomPropertyChangeValue(){      
      return this.obj_holder.obj_xdesign1_propertydomproperty.fn_propertyDomPropertyChangeValue();                  
    }
    fn_propertyDomAttributeChangeName(){
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_propertyDomAttributeChangeName();                  
    }
    fn_propertyDomAttributeChangeValue(){
      return this.obj_holder.obj_xdesign1_propertydomattribute.fn_propertyDomAttributeChangeValue();                        
    }      
    fn_propertyDesignChangeName(){      
      return this.obj_holder.obj_xdesign1_propertydesign.fn_propertyDesignChangeName();                            
    }
    fn_propertyDesignChangeValue(){
      return this.obj_holder.obj_xdesign1_propertydesign.fn_propertyDesignChangeValue();                                  
    }
    //END PROPERTY SHEET EVENT HANDLING                    
  }//END CLS
  //END TAG
  //END component/xdesign1_managertag
/*id: 223045//*/
/*type: xdesign1_managertag//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223046//*/
/*type: xdesign1_move//*/

            //XSTART component/xdesign1_move
              class xdesign1_move extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_move");      
                  this.fn_setTag("xdesign1_move");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){      
                  obj_project.fn_XDesigner_move();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_move
/*id: 223046//*/
/*type: xdesign1_move//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223047//*/
/*type: xdesign1_newproject//*/

      //XSTART component/xdesign1_newproject
        class xdesign1_newproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_newproject");      
            this.fn_setTag("xdesign1_newproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){  
            obj_project.fn_newProject();
          }
          
          
        }//END CLS
        //END TAG
        //END component/xdesign1_newproject
/*id: 223047//*/
/*type: xdesign1_newproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223050//*/
/*type: xdesign1_pinproject//*/

      //XSTART component/xdesign1_pinproject
        class xdesign1_pinproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_pinproject");      
            this.fn_setTag("xdesign1_pinproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){      
            obj_project.fn_toggleProjectPin();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_pinproject
/*id: 223050//*/
/*type: xdesign1_pinproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223057//*/
/*type: xdesign1_publishproject//*/

      //XSTART component/xdesign1_publishproject
        class xdesign1_publishproject extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_publishproject");      
            this.fn_setTag("xdesign1_publishproject");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }

          fn_onClick(){      
            obj_project.fn_publishProject();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_publishproject
/*id: 223057//*/
/*type: xdesign1_publishproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223058//*/
/*type: xdesign1_release//*/

            //XSTART component/xdesign1_release
              class xdesign1_release extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_release");      
                  this.fn_setTag("xdesign1_release");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){      
                  obj_project.fn_XDesigner_release();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_release
/*id: 223058//*/
/*type: xdesign1_release//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223059//*/
/*type: xdesign1_xcompile//*/

      //XSTART component/xdesign1_xcompile
        class xdesign1_xcompile extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_xcompile");      
            this.fn_setTag("xdesign1_xcompile");            
            this.obj_design.bln_isGenericTag=true;
            this.fn_extends("button");            
          }
          fn_onClick(){      
            obj_project.fn_XDesigner_compile();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_xcompile
/*id: 223059//*/
/*type: xdesign1_xcompile//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223060//*/
/*type: xdesign1_xcreatebackup//*/

      //XSTART component/xdesign1_xcreatebackup
        class xdesign1_xcreatebackup extends button{
          constructor(obj_ini) {      
            super(obj_ini);        
          } 
          fn_initialize(obj_ini){
            super.fn_initialize(obj_ini);                
            
            
            this.fn_setType("xdesign1_xcreatebackup");      
            this.fn_setTag("xdesign1_xcreatebackup");            
            this.obj_design.bln_isGenericTag=true;
            //this.fn_extends("abc");            
          }
          fn_onClick(){      
            obj_project.fn_XDesigner_createBackup();
          }
        }//END CLS
        //END TAG
        //END component/xdesign1_xcreatebackup
/*id: 223060//*/
/*type: xdesign1_xcreatebackup//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 223061//*/
/*type: xdesign1_xmaintain//*/

            //XSTART component/xdesign1_xmaintain
              class xdesign1_xmaintain extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_xmaintain");      
                  this.fn_setTag("xdesign1_xmaintain");            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("button");            
                }
                fn_onClick(){      
                  obj_project.fn_XDesigner_maintain();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_xmaintain
/*id: 223061//*/
/*type: xdesign1_xmaintain//*/
/*END COMPONENT//*/

//END XTRA CLASSES




//START AUTO GENERATED COMPONENT MAP
const obj_ComponentMap = new Map([['button', button],['tablecell', tablecell],['tableheader', tableheader],['tablerow', tablerow],['input', input],['table', table],['xdesign1_propertysheet', xdesign1_propertysheet],['xdesign1_propertydesign', xdesign1_propertydesign],['navelement', navelement],['flex', flex],['xdesign1_managermenu', xdesign1_managermenu],['xdesign1_objectmap', xdesign1_objectmap],['xdesign1_objectaction', xdesign1_objectaction],['xdesign1_propertydesignui', xdesign1_propertydesignui],['xdesign1_propertydomstyle', xdesign1_propertydomstyle],['xdesign1_propertydomproperty', xdesign1_propertydomproperty],['xdesign1_propertydomattribute', xdesign1_propertydomattribute],['form', form],['svgblock', svgblock],['inputandbutton', inputandbutton],['panel', panel],['accordion', accordion],['block', block],['clipboard', clipboard],['designfile', designfile],['dynamiccontent', dynamiccontent],['grid', grid],['loginpanel', loginpanel],['menubutton', menubutton],['texteditor', texteditor],['theme', theme],['xdesign1', xdesign1],['xdesign1_addtag', xdesign1_addtag],['xdesign1_addtagbutton', xdesign1_addtagbutton],['xdesign1_addtaginput', xdesign1_addtaginput],['xdesign1_deleteproject', xdesign1_deleteproject],['xdesign1_import', xdesign1_import],['xdesign1_login', xdesign1_login],['xdesign1_loginform', xdesign1_loginform],['xdesign1_managercomponent', xdesign1_managercomponent],['xdesign1_manageriframe', xdesign1_manageriframe],['xdesign1_managermessenger', xdesign1_managermessenger],['xdesign1_managerpalette', xdesign1_managerpalette],['xdesign1_managerproject', xdesign1_managerproject],['xdesign1_managersettings', xdesign1_managersettings],['xdesign1_managertag', xdesign1_managertag],['xdesign1_move', xdesign1_move],['xdesign1_newproject', xdesign1_newproject],['xdesign1_pinproject', xdesign1_pinproject],['xdesign1_publishproject', xdesign1_publishproject],['xdesign1_release', xdesign1_release],['xdesign1_xcompile', xdesign1_xcompile],['xdesign1_xcreatebackup', xdesign1_xcreatebackup],['xdesign1_xmaintain', xdesign1_xmaintain]]);
//END AUTO GENERATED MAP




/*START COMPONENT//*/
/*id: 222934//*/
/*type: TemplateCode//*/

//START Project.js
class Project extends xdesign1{
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
        
        /*
        THe use of this wrapper function allows items to be called form database , rather than hard-written into the code.        
        //e.g it allows the use of a simple Main procedure "new wrapper" which is name agnostic.
        //*/
    }  
    fn_onLoad(){
        super.fn_onLoad();        
        //console.log("Project Loaded: " + this.obj_design.str_name);
        //alert(obj_projectTarget)
    }
    fn_initialize(obj_ini){        
        super.fn_initialize(obj_ini);
        
        //START INITIALIZE DESIGN        
        if(this.obj_design.int_idRecord==undefined){this.obj_design.int_idRecord=0;}        

        if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Project";}       

        
        //if(this.obj_domStyle.display==undefined){this.obj_domStyle.display="block";}        
        

        this.obj_holder.bln_isRoot=true;
        
        if(this.obj_design.bln_isContainer==undefined){this.obj_design.bln_isContainer=true;}
        //this.fn_setIsContainer(true);                 
        
        
        
        this.fn_loadBootVariables();
        //END INITIALIZE DESIGN

        //START INITIALIZE DOM PROPERTY                
        //END INITIALIZE DOM PROPERTY

        //START INITIALIZE DOM ATTRIBUTE
        //END INITIALIZE DOM ATTRIBUTE
        
        //START INITIALIZE STYLE
        //END INITIALIZE STYLE

        //START INITIALIZE THEME           
        //END INITIALIZE THEME                
    }   

    fn_setParentComponent(obj_parent){    
        console.log("PROJECT dont set Parent Component");
    }

    fn_getMyThemeItem(obj_myThemeProject){//project is always themed by direct referral to the the them project
        return obj_myThemeProject;        
    }

    fn_getisBootMode(){
        let str_mode=this.fn_getMode();
        if(str_mode==="boot"){return true;}
        return false;
    }
    
    fn_getisRuntimeMode(){

        let str_mode=this.fn_getMode();
        if(str_mode===null){return true;}
        return false;
    }
    fn_getisEditMode(){

        let str_mode=this.fn_getMode();
        if(str_mode==="edit"){return true;}
        return false;
    }
    fn_getMode(){

        let params;
        params = new URLSearchParams(location.search.toLowerCase());                
        return params.get('mode');        
    }    

    fn_loadBootVariables(){

        let str_mode=this.fn_getMode();

        switch(str_mode){            
            case "edit":
                this.obj_design.int_modeExecute=this.obj_holder.int_modeEdit;                                                                
                break;         
            case "boot":
                this.obj_design.int_modeExecute=this.obj_holder.int_modeBoot;                                                                
                break;         
            default:
                this.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;                                
        }                        
        
        let int_idRecord;        
        int_idRecord=this.obj_design.int_idRecord;
        this.obj_design.int_idRecord=parseInt(int_idRecord);        

    }
    
    fn_createSelf(){        
        this.fn_setTagOption();
        super.fn_createSelf();        
    }        
    
    xfn_applyTheme(){//for the moment empty to prevent theme being uncessily applied, needs theme moved to obj_holder        
    }       
    fn_initializePluginDesign(){                  
        this.obj_designDelegate=new DesignDelegateProjectInstance(this);//this will call the design programs component onload event                          
        //this.obj_designDelegate.fn_setPaletteSelected();        
    }  
    fn_applyTheme(){
        //apply theme to all child objects of type eazygrid and eazygriditem
        this.fn_setItemStyleProperty("eazygrid", "backgroundColor", this.obj_theme.backgroundColor);
        this.fn_setItemStyleProperty("eazygriditem", "backgroundColor", this.obj_theme.foregroundColor);        
     } 
     fn_viewInBrowser(){
        let o=window.open("../../myProject/", "xDesignViewInBrowser");
        if(o){o.focus()}
    }          
    
     //END Project Instance Functions

     fn_setTagOption(){

        /*COMPONENT TAG    
        //Following options for Project Wrapper:            
        1. Use No Tag
        2. Creating A Tag                 
        2. Use Exisitng Tag and Allow/DisAllow manipulation of this e.g color, padding etc
        //*/
        
        //Create own publish tag 
        //If used, publish does create its own tag , which will prevent any ammendments being made to its  parent HTML        
        //POSITION SELF
        this.dom_obj = document.createElement(this.obj_design.str_tag);                          
        //APPLIES ONLY TO PUBLISH AS IT IS THE ONLY ITEM THAT IS NOT INSERTED VIA ADDITEM
        //now position element in parent Dom                
        let dom_element=document.getElementById(idXdesignTarget);
        if(!dom_element){dom_element=document.body;}        
        obj_shared.fn_removeAllChildNodes(dom_element);
        dom_element.append(this.dom_obj);             
        //POSITION SELF
    }    
  }//END OF CLS

  /*START DESIGN BOOT VARIABLE//*/
obj_boot.obj_design.int_idRecord=2406; 
/*END DESIGN BOOT VARIABLE//*/
//END Project.js


/*id: 222934//*/
/*type: TemplateCode//*/
/*END COMPONENT//*/




/*START INSTANCE JSON MAP//*/
var obj_InstanceJSONMap = new Map([
[2406, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":3076,"str_type":"theme"}},{"obj_design":{"int_idRecord":2407,"str_type":"designfile"}},{"obj_design":{"int_idRecord":"2408","str_type":"grid"}},{"obj_design":{"int_idRecord":2461,"str_type":"clipboard"}}],"int_idRecord":2406,"str_name":"xdesign","str_type":"xdesign1","str_tag":"xdesign1","bln_projectPin":true,"bln_lockComponent":true,"bln_isLocalHome":true,"str_idXDesign":"myId_11188187","str_idProject":"myId_11188187","bln_typeable":true,"str_homeLocation":true,"str_createdDate":"1001-01-01","str_modifiedDate":"1001-01-01","str_locationID":"xdesign","str_variableName":"xdesign","bln_createRelease":true},"obj_domStyle":{"background-color":"rgb(43, 44, 52)","font-family":"Helvetica, Arial, sans-serif","display":"block"}}],
[2407, {"obj_design":{"str_type":"designfile","str_name":"xdesign1_designFile","int_idRecord":2407,"str_tag":"designfile","bln_registerAtProject":true,"str_idXDesign":"myId_61181133","str_idProject":"myId_11188187","bln_isLocalHome":true}}],
[2408, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":3192,"str_type":"loginpanel"}},{"obj_design":{"int_idRecord":2409,"str_type":"xdesign1_manageriframe"}},{"obj_design":{"int_idRecord":2411,"str_type":"block"}}],"str_type":"grid","str_name":"xdesign1_gridMain","int_idRecord":"2408","str_tag":"xdesign1gridmain","str_minDim":"100px","str_idXDesign":"myId_17163636","str_idProject":"myId_11188187","str_variableName":"xdesign1_gridmain","str_createdDate":"2021-11-31 16:14:22","str_modifiedDate":"2021-11-31 16:14:22","bln_createRelease":"false"},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","grid-gap":"10px","overflow":"hidden","gap":"1px","align-items":"center","grid-template-rows":"repeat(auto-fit, minmax(300px, 1fr))","grid-template-columns":"repeat(auto-fit, minmax(240px, 1fr))","position":"relative"}}],
[2409, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2410,"str_type":"tag"}}],"str_type":"xdesign1_manageriframe","str_name":"xdesign1_manageriframe","int_idRecord":2409,"str_tag":"xdesign1_manageriframe","bln_registerAtProject":true,"bln_isLocalHome":true,"str_idXDesign":"myId_91116698","str_idProject":"myId_11188187","str_variableName":"xdesign1_manageriframe","str_createdDate":"2021-11-31 16:14:22","str_modifiedDate":"2021-11-31 16:14:22","bln_createRelease":"false"},"obj_domStyle":{"height":"100%","width":"100%","position":"static","display":"none"}}],
[2410, {"obj_design":{"str_tag":"iframe","str_type":"tag","str_name":"xdesign1_padiframe","int_idRecord":2410,"bln_registerAtProject":true,"str_idXDesign":"myId_31688717","str_idProject":"myId_11188187","bln_isLocalHome":true,"blnIsTag":true},"obj_domProperty":{"name":"xdesign-frame"},"obj_domStyle":{"border":"10px outset grey","height":"100%","width":"100%"}}],
[2411, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2421,"str_type":"accordion"}}],"str_type":"block","str_name":"xdesign1_controlPanel","int_idRecord":2411,"str_tag":"xdesign1_controlpanel","bln_isLocalHome":true,"str_idXDesign":"myId_46836631","str_idProject":"myId_11188187","bln_registerAtProject":true,"str_variableName":"xdesign1_controlpanel","str_createdDate":"2021-11-31 16:14:22","str_modifiedDate":"2021-11-31 16:14:22","bln_createRelease":"false"},"obj_domStyle":{"display":"none"}}],
[2413, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2435,"str_type":"xdesign1_managersettings"}}],"str_text":"Console","str_type":"menubutton","str_name":"xdesign1_settingsMenuButton","str_tag":"button","int_idRecord":2413,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_isLocalHome":true,"str_idXDesign":"myId_65686136","str_idProject":"myId_11188187","str_nameTheme":"appmenubutton"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Console"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","background-color":"rgb(65, 65, 65)","cursor":"pointer","color":"white"}}],
[2416, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2456,"str_type":"xdesign1_managerproject"}}],"str_text":"Project","str_type":"menubutton","str_name":"xdesign1_projectMenuButton","str_tag":"button","int_idRecord":2416,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_isLocalHome":true,"str_idXDesign":"myId_13201826","str_idProject":"myId_11188187","str_nameTheme":"appmenubutton"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Project"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","background-color":"#414141","cursor":"pointer","color":"white"}}],
[2420, {"obj_design":{"str_text":"Messenger","str_type":"menubutton","str_name":"xdesign1_messengerMenuButton","str_tag":"button","int_idRecord":2420,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_isLocalHome":true,"str_idXDesign":"myId_66363650","str_idProject":"myId_11188187","arr_item":[{"obj_design":{"int_idRecord":"2668","str_type":"xdesign1_managerproject"}}]},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Messenger"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white"},"bln_isOpen":true}],
[2421, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2413,"str_type":"menubutton"}},{"obj_design":{"int_idRecord":2416,"str_type":"menubutton"}},{"obj_design":{"int_idRecord":2420,"str_type":"menubutton"}},{"obj_design":{"int_idRecord":2671,"str_type":"menubutton"}},{"obj_design":{"int_idRecord":"2702","str_type":"menubutton"}},{"obj_design":{"int_idRecord":"2962","str_type":"menubutton"}}],"str_type":"accordion","str_name":"xdesign1_controlAccordion","int_idRecord":2421,"str_tag":"accordion","str_idXDesign":"myId_43777613","str_idProject":"myId_11188187","bln_isLocalHome":true},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","width":"100%","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-radius":"4px","display":"block","height":"100%","padding":"10px"}}],
[2435, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3227","str_type":"block"}},{"obj_design":{"int_idRecord":"3228","str_type":"block"}}],"int_idRecord":2435,"str_name":"xdesign1_managersettings","str_type":"xdesign1_managersettings","str_tag":"xdesign1_managersettings","bln_registerAtProject":true,"str_classExtend":"xdesign1_managermenu","bln_palettePin":true,"bln_isLocalHome":true,"str_idXDesign":"myId_38639474","str_idProject":"myId_11188187","position":"relative","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26"},"obj_domStyle":{"flex-wrap":"wrap","position":"relative","flex-direction":"column","display":"flex","flex-flow":"column wrap","width":"100%","overflow":"auto","cursor":"default"}}],
[2443, {"obj_design":{"str_type":"xdesign1_xcreatebackup","str_name":"xdesign1_xcreatebackup","int_idRecord":2443,"str_tag":"button","str_content":"My button","str_classExtend":"button","str_text":"XCreate Backup","bln_isLocalHome":true,"str_idXDesign":"myId_38873086","str_idProject":"myId_11188187","str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"XCreate Backup"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white","display":"block"}}],
[2445, {"obj_design":{"str_type":"xdesign1_import","str_name":"xdesign1_import","int_idRecord":2445,"str_tag":"button","str_content":"My button","str_classExtend":"button","str_text":"Import","bln_isLocalHome":true,"str_idXDesign":"myId_67783374","str_idProject":"myId_11188187","bln_registerAtContainer":true,"str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"Import"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[2456, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2457,"str_type":"xdesign1_newproject"}},{"obj_design":{"int_idRecord":2465,"str_type":"xdesign1_pinproject"}},{"obj_design":{"int_idRecord":2501,"str_type":"xdesign1_deleteproject"}},{"obj_design":{"int_idRecord":2503,"str_type":"xdesign1_publishproject"}},{"obj_design":{"int_idRecord":2610,"str_type":"dynamiccontent"}}],"str_type":"xdesign1_managerproject","str_name":"xdesign1_managerproject","int_idRecord":2456,"str_tag":"xdesign1_managerproject","bln_registerAtProject":true,"str_classExtend":"flex","bln_isLocalHome":true,"str_idXDesign":"myId_66613684","str_idProject":"myId_11188187","str_createdDate":"2021-11-17 10:24:14","str_modifiedDate":"2021-11-17 10:24:14","bln_createRelease":"false"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto","cursor":"default"}}],
[2457, {"obj_design":{"str_type":"xdesign1_newproject","str_name":"xdesign1_newproject","int_idRecord":2457,"str_tag":"button","str_content":"My button","str_classExtend":"button","str_text":"New","bln_isLocalHome":true,"bln_registerAtContainer":true,"str_idXDesign":"myId_80466641","str_idProject":"myId_11188187"},"obj_domProperty":{"innerText":"New"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[2461, {"obj_design":{"str_type":"clipboard","str_name":"xdesign1_clipboard","int_idRecord":2461,"str_tag":"clipboard","bln_registerAtProject":true,"str_idXDesign":"myId_64136103","str_idProject":"myId_11188187","bln_isLocalHome":true}}],
[2465, {"obj_design":{"int_idRecord":2465,"str_name":"xdesign1_pinproject","str_type":"xdesign1_pinproject","str_tag":"button","str_content":"xdesign_pinproject","bln_registerAtContainer":true,"str_classExtend":"button","bln_isLocalHome":true,"str_text":"Pin","str_idXDesign":"myId_28661440","str_idProject":"myId_11188187"},"obj_domProperty":{"innerText":"Pin"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[2501, {"obj_design":{"int_idRecord":2501,"str_name":"xdesign1_deleteproject","str_type":"xdesign1_deleteproject","str_tag":"button","str_content":"Delete","bln_registerAtContainer":true,"str_classExtend":"button","str_text":"Delete","bln_isLocalHome":true,"str_idXDesign":"myId_66646482","str_idProject":"myId_11188187","str_createdDate":"2021-11-17 10:24:14","str_modifiedDate":"2021-11-17 10:24:14","bln_typeable":true},"obj_domProperty":{"innerText":"Delete"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","pointer-events":"auto","cursor":"pointer","color":"white"}}],
[2503, {"obj_design":{"int_idRecord":2503,"str_name":"xdesign1_publishproject","str_type":"xdesign1_publishproject","str_tag":"button","str_content":"Publish","bln_registerAtContainer":true,"str_classExtend":"button","str_text":"Version","bln_isLocalHome":true,"str_idXDesign":"myId_46163620","str_idProject":"myId_11188187","str_createdDate":"2021-11-17 10:24:14","str_modifiedDate":"2021-11-17 10:24:14","bln_typeable":true,"str_variableName":"xdesign1_publishproject","bln_createRelease":"false"},"obj_domProperty":{"innerText":"Version"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","pointer-events":"auto","cursor":"pointer","color":"white"}}],
[2610, {"obj_design":{"str_type":"dynamiccontent","str_name":"ListProjectDynamicContent","int_idRecord":2610,"str_idXDesign":"myId_17646876","str_idProject":"myId_11188187","str_tag":"dynamiccontent","bln_registerAtContainer":true,"str_classExtend":"flex","bln_isLocalHome":true},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto","padding":"0px"}}],
[2667, {"obj_design":{"str_type":"dynamiccontent","str_name":"MessengerDynamicContent","int_idRecord":"2667","str_idProject":"myId_11188187","str_tag":"dynamiccontent","bln_registerAtContainer":true,"str_classExtend":"flex","bln_isLocalHome":true,"str_idXDesign":"myId_87416864"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto","padding":"0px"}}],
[2668, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"2667","str_type":"dynamiccontent"}}],"str_type":"xdesign1_managermessenger","str_name":"xdesign1_managermessenger","int_idRecord":2668,"str_tag":"xdesign1_managermessenger","bln_registerAtProject":true,"str_classExtend":"xdesign1_managermenu","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_idXDesign":"myId_94643494"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto"}}],
[2669, {"obj_design":{"str_type":"dynamiccontent","str_name":"ListPaletteDynamicContent","int_idRecord":2669,"str_idProject":"myId_11188187","str_tag":"dynamiccontent","bln_registerAtContainer":true,"str_classExtend":"flex","bln_isLocalHome":true,"str_idXDesign":"myId_56316681"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto","padding":"0px"}}],
[2670, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"2690","str_type":"inputandbutton"}},{"obj_design":{"int_idRecord":2669,"str_type":"dynamiccontent"}}],"str_type":"xdesign1_managerpalette","str_name":"xdesign1_managerpalette","int_idRecord":2670,"str_tag":"xdesign1_managerpalette","bln_registerAtProject":true,"str_classExtend":"xdesign1_managermenu","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_idXDesign":"myId_77516056"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto"}}],
[2671, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2670,"str_type":"xdesign1_managerpalette"}}],"str_text":"Palette","str_type":"menubutton","str_name":"xdesign1_paletteMenuButton","str_tag":"button","int_idRecord":2671,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_idXDesign":"myId_07006353","str_nameTheme":"thememenubutton"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Palette"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","background-color":"rgb(65, 65, 65)","pointer-events":"auto","cursor":"default","color":"white"}}],
[2688, {"obj_design":{"str_type":"xdesign1_addtaginput","str_idXDesign":"myId_03111770","str_idProject":"myId_11188187","str_name":"xdesign1_addtagInput","str_tag":"input","int_idRecord":2688,"str_nameRegistrator":"xdesign1_managerpalette","str_classExtend":"input","bln_isLocalHome":true,"bln_registerAtContainer":true,"str_createdDate":"2021-11-18 9:4:54","str_modifiedDate":"2021-11-18 9:4:54"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px"}}],
[2689, {"obj_design":{"str_type":"xdesign1_addtagbutton","str_name":"xdesign1_addtagButton","str_linkId":"myId_03111770","str_idXDesign":"myId_91100671","str_idProject":"myId_11188187","str_tag":"button","str_content":"My inputandbutton","int_idRecord":2689,"str_text":"Tag","str_nameRegistrator":"xdesign1_managerpalette","str_classExtend":"button","bln_isLocalHome":true,"bln_registerAtContainer":true,"str_createdDate":"2021-11-18 9:4:54","str_modifiedDate":"2021-11-18 9:4:54","bln_typeable":true},"obj_domProperty":{"innerText":"Tag"},"obj_domStyle":{"padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","height":"40px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[2690, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"2688","str_type":"input"}},{"obj_design":{"int_idRecord":"2689","str_type":"button"}}],"str_type":"xdesign1_addtag","str_name":"xdesign1_addtag","int_idRecord":2690,"str_idXDesign":"myId_11396136","str_idProject":"myId_11188187","str_tag":"inputandbutton","str_text":"My inputandbutton","str_nameRegistrator":"xdesign1_managerpalette","str_classExtend":"button","bln_isLocalHome":true},"obj_domProperty":{"str_nameEventButtonClick":"xDesign_myDesignerButtonClick","str_valueEventButtonClick":"fn_addPaletteTagFromInput"},"obj_domStyle":{"height":"40px","padding-left":"12px","margin-right":"1px","margin-bottom":"1px"}}],
[2700, {"obj_design":{"str_type":"dynamiccontent","str_name":"ListTagDynamicContent","int_idRecord":"2700","str_idProject":"myId_11188187","str_tag":"dynamiccontent","bln_registerAtContainer":true,"str_classExtend":"flex","bln_isLocalHome":true,"str_idXDesign":"myId_59364691"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto","padding":"0px","cursor":"default"}}],
[2701, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"2700","str_type":"dynamiccontent"}}],"str_type":"xdesign1_managertag","str_name":"xdesign1_managertag","int_idRecord":2701,"str_tag":"xdesign1_managertag","bln_registerAtProject":true,"str_classExtend":"xdesign1_managermenu","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_idXDesign":"myId_42111931","str_classList":"xdesign1_objectmap,obj_xdesign1_objectaction,obj_xdesign1_propertydesignui,obj_xdesign1_propertydomstyle,obj_xdesign1_propertydomproperty,obj_xdesign1_propertydomattribute,obj_xdesign1_propertydesign"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto"}}],
[2702, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2701,"str_type":"xdesign1_managertag"}}],"str_text":"Tag","str_type":"menubutton","str_name":"xdesign1_tagMenuButton","str_tag":"button","int_idRecord":"2702","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_idXDesign":"myId_12142341"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Tag"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","background-color":"#414141","cursor":"pointer","color":"white"},"bln_isOpen":true}],
[2960, {"obj_design":{"str_type":"dynamiccontent","str_name":"ComposerDynamicContent","int_idRecord":"2960","str_idProject":"myId_11188187","str_tag":"dynamiccontent","bln_registerAtContainer":true,"str_classExtend":"flex","bln_isLocalHome":true,"str_idXDesign":"myId_33313103"},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto","padding":"0px"}}],
[2961, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"2960","str_type":"dynamiccontent"}}],"str_type":"xdesign1_managercomponent","str_name":"xdesign1_managercomponent","int_idRecord":2961,"str_tag":"xdesign1_managercomponent","bln_registerAtProject":true,"str_classExtend":"flex","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_idXDesign":"myId_32224212","bln_palettePin":true,"bln_maintainId":true},"obj_domStyle":{"display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto"}}],
[2962, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"2961","str_type":"xdesign1_managertag"}}],"str_text":"Component","str_type":"menubutton","str_name":"xdesign1_componentMenuButton","str_tag":"button","int_idRecord":"2962","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_idXDesign":"myId_70931914"},"obj_domProperty":{"disabled":true,"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Component"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-radius":"4px","background-color":"#414141"}}],
[2981, {"obj_design":{"str_type":"xdesign1_xcompile","str_name":"xdesign1_xcompile","int_idRecord":2981,"str_idXDesign":"myId_67296791","str_idProject":"myId_11188187","str_tag":"button","str_content":"My button","str_text":"XCompile","str_classExtend":"button","bln_isLocalHome":true,"str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"XCompile"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-r-adius":"4px","border-radius":"4px","background-color":"#414141"}}],
[2985, {"obj_design":{"str_type":"xdesign1_xmaintain","str_name":"xdesign1_xmaintain","int_idRecord":"2985","str_idXDesign":"myId_44107576","str_idProject":"myId_11188187","str_tag":"button","str_content":"My button","str_text":"XMaintain","str_classExtend":"button","bln_isLocalHome":true,"str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"XMaintain"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-r-adius":"4px","border-radius":"4px","background-color":"#414141"}}],
[3056, {"obj_design":{"str_type":"texteditor","str_name":"xdesign1_console","int_idRecord":"3056","str_idXDesign":"myId_61855568","str_idProject":"myId_11188187","str_tag":"xdesign1_console","str_nameEditorTheme":"snow","str_nameRegistrator":"xdesign1_managersettings","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26","bln_useHTML":true},"obj_domStyle":{"color":"white","width":"100%","height":"100%","display":"block"}}],
[3057, {"obj_design":{"str_type":"xdesign1_move","str_name":"xdesign1_move","int_idRecord":3057,"str_idProject":"myId_11188187","str_tag":"button","str_content":"My button","str_text":"XMove","str_classExtend":"button","bln_isLocalHome":true,"str_idXDesign":"myId_16143821","str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"XMove"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-r-adius":"4px","border-radius":"4px","background-color":"#414141"}}],
[3076, {"obj_design":{"int_idRecord":3076,"str_idXDesign":"myId_93777233","str_name":"xdesign1_theme","str_type":"theme","str_tag":"xdesign1_theme","bln_projectPin":true,"bln_palettePin":true,"bln_maintainId":true,"bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":"3080","str_type":"grid"}}],"bln_registerAtProject":true},"obj_domStyle":{"background-color":"rgb(43, 44, 52)","font-family":"Helvetica, Arial, sans-serif","display":"block"},"obj_projectEvent":{"obj_design":{"int_idRecord":"3081","str_type":"button"}}}],
[3077, {"obj_design":{"str_text":"My Button","str_type":"button","str_idProject":"myId_93777233","str_name":"xdesign1_thememenubutton","str_tag":"button","str_content":"Test A","int_idRecord":"3077","str_idXDesign":"myId_76779915","bln_registerAtProject":true,"str_nameTheme":"themebutton","bln_themeType":true},"obj_domProperty":{"innerText":"My Button"},"obj_domStyle":{"padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","height":"40px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[3078, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3077","str_type":"button"}},{"obj_design":{"int_idRecord":"3081","str_type":"button"}}],"str_text":"Group 1","str_type":"menubutton","str_idProject":"myId_93777233","str_name":"xdesign1_menubutton","str_tag":"button","int_idRecord":"3078","bln_registerAtProject":true,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_idXDesign":"myId_78777777","bln_themeType":true},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Group 1"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","color":"white","background-color":"rgb(65, 65, 65)"}}],
[3079, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3078","str_type":"menubutton"}}],"str_type":"accordion","str_name":"xdesign1_themeaccordion","int_idRecord":"3079","str_idProject":"myId_93777233","str_tag":"accordion","str_idXDesign":"myId_93090697","str_nameTheme":"themeaccordion"},"obj_domStyle":{"width":"100%"}}],
[3080, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3079","str_type":"accordion"}},{"obj_design":{"int_idRecord":"3090","str_type":"texteditor"}},{"obj_design":{"int_idRecord":"3235","str_type":"block"}}],"str_type":"grid","str_name":"My grid","int_idRecord":"3080","str_idXDesign":"myId_65679653","str_idProject":"myId_93777233","str_tag":"grid","str_minDim":"100px"},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","grid-gap":"10px","overflow":"hidden","background-color":"blue"}}],
[3081, {"obj_design":{"str_type":"button","str_name":"xdesign1_themebuttonhighlight","int_idRecord":"3081","str_idXDesign":"myId_87384737","str_idProject":"myId_93777233","str_tag":"button","str_content":"My Button Highlight","bln_registerAtProject":true,"str_text":"My Button Highlight","str_nameTheme":"buttonhighlight","bln_themeType":true},"obj_domProperty":{"innerText":"My Button Highlight"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","border-radius":"4px"}}],
[3082, {"obj_design":{"str_type":"tableheader","str_name":"xdesign1_themetableheader","int_idRecord":"3082","str_idXDesign":"myId_73614749","str_idProject":"myId_93777233","str_tag":"th","bln_registerAtProject":true,"str_text":"HEADER","str_nameTheme":"themetableheader","bln_themeType":true},"obj_domProperty":{"innerText":"HEADER"},"obj_domStyle":{"color":"gray","padding":"10px"}}],
[3083, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3082","str_type":"tableheader"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3083","str_idXDesign":"myId_30358383","str_idProject":"myId_93777233","str_tag":"tr"}}],
[3084, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3083","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3089","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3234","str_type":"tablerow"}}],"str_type":"table","str_name":"xdesign1_themetable","int_idRecord":"3084","str_idXDesign":"myId_71098770","str_idProject":"myId_93777233","str_tag":"table","bln_registerAtProject":true,"str_nameTheme":"themetable","bln_themeType":true}}],
[3088, {"obj_design":{"str_type":"tablecell","str_name":"xdesign1_themetablecell","int_idRecord":"3088","str_idXDesign":"myId_53441743","str_idProject":"myId_93777233","str_tag":"td","str_nameTheme":"themetablecell","bln_registerAtProject":true,"bln_themeType":true,"str_text":"Label"},"obj_domProperty":{"innerText":"Label"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3089, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3088","str_type":"tablecell"}},{"obj_design":{"int_idRecord":"3230","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3089","str_idXDesign":"myId_11375561","str_idProject":"myId_93777233","str_tag":"tr"}}],
[3090, {"obj_design":{"str_type":"texteditor","str_name":"xdesign1_themetexteditor","int_idRecord":"3090","str_idXDesign":"myId_72220016","str_idProject":"myId_93777233","str_tag":"texteditor","bln_registerAtProject":true,"str_nameEditorTheme":"snow","str_nameTheme":"themetexteditor","bln_themeType":true},"obj_domStyle":{"color":"white","width":"100%","height":"100%"}}],
[3177, {"obj_design":{"int_idRecord":3177,"str_idXDesign":"myId_38655048","str_name":"xdesign1_login","str_type":"xdesign1_login","str_tag":"xdesign1_btnlogin","bln_isLocalHome":true,"str_idProject":"myId_11188187","dataSVG":"/app/xdesign/asset/power-off.svg","typeSVG":"image/svg+xml","filterSVG":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","str_classExtend":"svgblock","pointerEventSVG":"none","bln_registerAtProject":true,"str_variableName":"xdesign1_login","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":"false","blnIsTag":true},"obj_domStyle":{"padding":"0px","align-self":"center","display":"block","width":"25px","height":"25px","margin-left":"auto","margin-right":"30px"}}],
[3192, {"obj_design":{"str_type":"loginpanel","str_name":"loginPanel","int_idRecord":3192,"str_idXDesign":"myId_87716375","str_idProject":"myId_11188187","str_tag":"loginpanel","str_classExtend":"panel","bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":3236,"str_type":"xdesign1_loginform"}}],"bln_registerAtProject":true,"str_variableName":"loginpanel","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":"false","bln_palettePin":true},"obj_domStyle":{"overflow":"auto","zindex":"10","left":"0px","top":"0px","height":"100%","width":"100%","padding":"10px","flex-direction":"column","align-items":"center","background-color":"rgb(43, 44, 52)","font-family":"helvetica","visibility":"hidden","display":"none"},"int_count":0}],
[3197, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3246","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3197","str_idXDesign":"myId_36888371","str_idProject":"myId_11188187","str_tag":"td","str_text":"xdesignblank","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3198, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3197","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3198","str_idXDesign":"myId_98606601","str_idProject":"myId_11188187","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"}}],
[3201, {"obj_design":{"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3201","str_idXDesign":"myId_33861760","str_idProject":"myId_11188187","str_tag":"td","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-28 7:42:45","str_modifiedDate":"2021-11-28 7:42:45","bln_createRelease":"false","arr_item":[{"obj_design":{"int_idRecord":"3402","str_type":"input"}}]},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3202, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3201","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3202","str_idXDesign":"myId_87338318","str_idProject":"myId_11188187","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"}}],
[3203, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3198","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3202","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3207","str_type":"tablerow"}}],"str_type":"table","str_name":"My table","int_idRecord":"3203","str_idXDesign":"myId_01505510","str_idProject":"myId_11188187","str_tag":"table","str_classList":"tablerow,tablecell,tableheader","str_variableName":"mytable","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"}}],
[3206, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3305","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3206","str_idXDesign":"myId_07738118","str_idProject":"myId_11188187","str_tag":"td","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-27 13:8:56","str_modifiedDate":"2021-11-27 13:8:56","bln_createRelease":"false"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3207, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3206","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3207","str_idXDesign":"myId_31170818","str_idProject":"myId_11188187","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"}}],
[3227, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2443,"str_type":"xdesign1_xcreatebackup"}},{"obj_design":{"int_idRecord":2445,"str_type":"xdesign1_import"}},{"obj_design":{"int_idRecord":2981,"str_type":"xdesign1_xcompile"}},{"obj_design":{"int_idRecord":"2985","str_type":"xdesign1_xmaintain"}},{"obj_design":{"int_idRecord":3057,"str_type":"xdesign1_move"}},{"obj_design":{"int_idRecord":"3381","str_type":"xdesign1_move"}},{"obj_design":{"int_idRecord":3177,"str_type":"xdesign1_login"}}],"str_type":"block","str_name":"My block","int_idRecord":"3227","str_idProject":"myId_11188187","str_tag":"block","str_idXDesign":"myId_30136815","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26"},"obj_domStyle":{"display":"flex","flow-flow":"row wrap","flex-flow":"row wrap"}}],
[3228, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3056","str_type":"texteditor"}}],"str_type":"block","str_name":"My block","int_idRecord":"3228","str_idProject":"myId_11188187","str_tag":"block","str_idXDesign":"myId_46803442","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26"},"obj_domStyle":{"display":"flex","flow-flow":"row wrap","flex-flow":"row wrap"}}],
[3229, {"obj_design":{"str_type":"input","str_name":"My input","int_idRecord":"3229","str_idProject":"myId_93777233","str_tag":"input","bln_themeType":true,"str_idXDesign":"myId_94454041"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px"}}],
[3230, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3229","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3230","str_idXDesign":"myId_81377959","str_idProject":"myId_93777233","str_tag":"td"}}],
[3231, {"obj_design":{"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3231","str_idXDesign":"myId_28827369","str_idProject":"myId_93777233","str_tag":"td"}}],
[3232, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"3232","str_idXDesign":"myId_49595816","str_idProject":"myId_93777233","str_tag":"button","str_content":"My button","str_text":"My button"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[3233, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3232","str_type":"button"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3233","str_idXDesign":"myId_10183300","str_idProject":"myId_93777233","str_tag":"td"}}],
[3234, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3231","str_type":"tablecell"}},{"obj_design":{"int_idRecord":"3233","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3234","str_idXDesign":"myId_83868966","str_idProject":"myId_93777233","str_tag":"tr"}}],
[3235, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3084","str_type":"table"}}],"str_type":"block","str_name":"My block","int_idRecord":"3235","str_idXDesign":"myId_01101168","str_idProject":"myId_93777233","str_tag":"block"},"obj_domStyle":{"display":"block","backgroundcolor":"red","background-color":"red"}}],
[3236, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3303","str_type":"tag"}}],"str_tag":"form","str_type":"xdesign1_loginform","str_idXDesign":"myId_61366636","str_idProject":"myId_11188187","str_name":"xdesign1_LoginForm","int_idRecord":3236,"blnIsTag":true,"bln_registerAtProject":true,"bln_isLocalHome":true,"str_variableName":"xdesign1_loginform","str_createdDate":"2021-11-29 0:2:58","str_modifiedDate":"2021-11-29 0:2:58","bln_createRelease":"false","str_classExtend":"form"},"obj_domStyle":{"font-fmily":"helvetica"}}],
[3246, {"obj_design":{"str_type":"input","str_name":"xdesign1_AuthorizeUserEmail","int_idRecord":"3246","str_idXDesign":"myId_13131319","str_idProject":"myId_11188187","str_tag":"input","bln_registerAtProject":true,"str_variableName":"xdesign1_authorizeuseremail","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"},"obj_domProperty":{"type":"email","minlinegth":"5","maxlength":"100","size":"20","placeholder":"email address","required":true},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px","display":"block"}}],
[3303, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3203","str_type":"table"}},{"obj_design":{"int_idRecord":"3304","str_type":"tag"}}],"str_tag":"fieldset","str_type":"tag","str_idXDesign":"myId_61939443","str_idProject":"myId_11188187","str_name":"My tag","int_idRecord":"3303","blnIsTag":true,"str_variableName":"mytag","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"}}],
[3304, {"obj_design":{"str_tag":"legend","str_type":"tag","str_content":"<p>XDesigner</p>","bln_typeable":true,"str_idXDesign":"myId_66993314","str_idProject":"myId_11188187","str_name":"My tag","int_idRecord":"3304","blnIsTag":true,"str_text":"<p>XDesigner</p>","str_variableName":"mytag","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"},"obj_domStyle":{"color":"white","background-color":"rgb(65, 65, 65)","padding":"3px 30px"}}],
[3305, {"obj_design":{"str_type":"input","str_name":"My input","int_idRecord":"3305","str_idXDesign":"myId_67197766","str_idProject":"myId_11188187","str_tag":"input","str_variableName":"myinput","str_createdDate":"2021-11-27 13:8:56","str_modifiedDate":"2021-11-27 13:8:56","bln_createRelease":"false"},"obj_domProperty":{"type":"submit","value":"Sign In"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px"}}],
[3381, {"obj_design":{"str_type":"xdesign1_release","str_name":"xdesign1_release","int_idRecord":3381,"str_idProject":"myId_11188187","str_tag":"button","str_content":"My button","str_text":"XRelease","str_classExtend":"button","bln_isLocalHome":true,"str_nameRegistrator":"xdesign1_managersettings","str_createdDate":"2021-11-19 20:4:47","str_modifiedDate":"2021-11-19 20:4:47","bln_typeable":true,"str_idXDesign":"myId_40689098"},"obj_domProperty":{"innerText":"XRelease"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-r-adius":"4px","border-radius":"4px","background-color":"#414141","display":"none"}}],
[3402, {"obj_design":{"str_type":"input","str_name":"xdesign1_AuthorizeUserPass","int_idRecord":"3402","str_idProject":"myId_11188187","str_tag":"input","bln_registerAtProject":true,"str_variableName":"xdesign1_authorizeuserpass","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_idXDesign":"myId_16744640"},"obj_domProperty":{"minlinegth":"5","maxlength":"100","size":"20","placeholder":"One Time Pass","type":"text"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px","display":"none"}}]
]);
/*END INSTANCE JSON MAP//*/


