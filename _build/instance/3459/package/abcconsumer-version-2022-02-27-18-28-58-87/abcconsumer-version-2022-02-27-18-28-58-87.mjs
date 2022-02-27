

/*START COMPONENT//*/
/*id: 352049//*/
/*type: RunTimeCode//*/

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
      
      let str_value=this.fn_getAppPath(str_name_app)+"/"+this.str_name_folder_server+"/"+str_name_file;            
      //console.log("str_value: " + str_value);
      return str_value;
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
    return true;
  }

  fn_validDate(x) {
    let int_num=Date.parse(x);
    if (Number.isNaN(int_num)) {
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


  fn_leadingZero(int_num){
    let str_num=int_num;
    if(int_num<10){str_num="0"+int_num};
    return str_num;
  }
  
  fn_getDate(int_flag){
    switch(int_flag){
      case obj_const.int_dateNow:      
      let date=new Date();
      //Y-m-d H:i:s
      let Y=date.getFullYear();      
      let m=this.fn_leadingZero(date.getMonth()+1);            
      let d=this.fn_leadingZero(date.getDate());            
      let H=this.fn_leadingZero(date.getHours());            
      let i=this.fn_leadingZero(date.getMinutes());            
      let s=this.fn_leadingZero(date.getSeconds());                  
      return Y+"-"+m+"-"+d+" "+H+":"+i+":"+s; 
    }  
  }
  fn_onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  

  fn_formatUniqueList(str_list){    

    let arr_list=str_list.split(",");        
    arr_list=arr_list.map(s => s.replace(/\s+/g, ' ').trim());     
    
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
  fn_formatShortName(str_value){                    
    str_value=str_value.toLowerCase().replace(/-/gi, "_");;                    
    str_value=this.fn_removeSpace(str_value);            
    str_value=this.fn_formatString(str_value, obj_const.int_alphaNumeric);                                      
    return str_value;
  }
  fn_formatShortDate(str_value){                    
    str_value=this.fn_formatDate(str_value);                                      
    return str_value;
  }


  fn_replace(str_source, str_find, str_replace){  
    let re=new RegExp(str_find, "gi");
    return str_source.replace(re, str_replace);
  }
  fn_remove(str_source, str_remove){
    let re=new RegExp(str_remove, "g");
    return str_source.replace(re, "");
  }
  
  fn_trimComma(str){        
    str = str.replace(/(^,)|(,$)/g, "")    
    return str;
  }
  fn_removeSpace(str){        
    str = str.replace(/\s+/g, '');
    return str;
  }

  fn_isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
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

    fn_flipAxis(int_axis){
      if(int_axis==obj_const.int_axisHorizontal){return obj_const.int_axisVertical;}
      if(int_axis==obj_const.int_axisVertical){return obj_const.int_axisHorizontal;}
      return int_axis;

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
      //console.log("fn_setMapItem foo_key: " + foo_key);
      //*
      //console.log(foo_key);
      //console.log(foo_value);      
      obj_map.set(foo_key, foo_value);
      //*/
    }
    fn_getMapItem(obj_map, foo_key){
      return obj_map.get(foo_key);
    }   
    fn_deletetMapItem(obj_map, foo_key){
      //console.log("fn_deletetMapItem foo_key: " + foo_key);
      return obj_map.delete(foo_key);
    }   
    
    fn_debugMap(myMap){   
      console.log("START fn_debugMap");
      for (const [key, value] of myMap.entries()) {
          console.log(key, value);
        }
        console.log("END fn_debugMap");

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

    fn_convertRGBToHex(rgb) {
      // Choose correct separator
      let sep = rgb.indexOf(",") > -1 ? "," : " ";
      // Turn "rgb(r,g,b)" into [r,g,b]
      rgb = rgb.substr(4).split(")")[0].split(sep);
    
      let r = (+rgb[0]).toString(16),
          g = (+rgb[1]).toString(16),
          b = (+rgb[2]).toString(16);
    
      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;
    
      return "#" + r + g + b;
    }
    
    fn_lightenGradient(col, amt) {
      
      var usePound = false;
    
      if (col[0] == "#") {
          col = col.slice(1);
          usePound = true;
      }
    
      var num = parseInt(col,16);
    
      var r = (num >> 16) + amt;
    
      if (r > 255) r = 255;
      else if  (r < 0) r = 0;
    
      var b = ((num >> 8) & 0x00FF) + amt;
    
      if (b > 255) b = 255;
      else if  (b < 0) b = 0;
    
      var g = (num & 0x0000FF) + amt;
    
      if (g > 255) g = 255;
      else if (g < 0) g = 0;
    
      return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    
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

    this.int_axisHorizontal=1;
    this.int_axisVertical=2;
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

        if(this.obj_design.str_idXDesign===undefined){this.fn_setIDXDesign();}
        if(this.obj_design.str_idXDesign===""){this.fn_setIDXDesign();}
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

        if(obj_item.obj_design.int_idRecord==="4757"){
            console.log("START DEBUG PANEL")
            obj_item.fn_debug("xxxx");
            console.log("arr_item: " + obj_item.obj_design.arr_item.length);
            console.log("ENDDEBUG PANEL")
        }
                    
        return obj_item;
    }

    fn_checkIni(obj_ini){

        let str_type, int_idRecord, bln_removeId;        

        //PLACE NUMBER 1 WHEN OBJ INI CAN GET KNOCKED OFF

        int_idRecord=obj_ini.obj_design.int_idRecord;           
        str_type=obj_ini.obj_design.str_type;                                   
        
        
        if(!obj_ini.obj_design.arr_item){ 
            //console.log("obj_ini.obj_design.arr_item is false");           
            obj_ini=new Holder;            
            obj_ini.obj_design.int_idRecord=int_idRecord;           
            obj_ini.obj_design.str_type=str_type;                                   
            obj_ini.bln_removeId=bln_removeId;            
        }        

        //PLACE NUMBER 1 WHEN OBJ INI CAN GET KNOCKED OFF
        
        return obj_ini;
    }

    fn_createChildObject(obj_ini){

        let str_type, int_idRecord, obj_item, bln_removeId;         

        //PLACE NUMBER 2 WHEN OBJ INI CAN GET KNOCKED OFF

        obj_ini=this.fn_checkIni(obj_ini);        
        
        int_idRecord=obj_ini.obj_design.int_idRecord;           
        str_type=obj_ini.obj_design.str_type;                        
        bln_removeId=obj_ini.bln_removeId;

        if(obj_ini){//see fi we can get the correct ini object, partucuarly to ensure the type is correct.
            if(obj_ini.obj_design){
                int_idRecord=parseInt(obj_ini.obj_design.int_idRecord);        
                if(int_idRecord){
                    let ObjectData=obj_shared.fn_getMapItem(obj_InstanceJSONMap,  int_idRecord);//get a reference to the the object that has been published from the db                                            
                    if(ObjectData){
                        //console.log(ObjectData);
                        var NewObjectData=JSON.parse(JSON.stringify(ObjectData));        
                        if(NewObjectData.obj_design){
                            obj_ini=NewObjectData;
                        }
                    }
                }
            }
        } 

        //PLACE NUMBER 2 WHEN OBJ INI CAN GET KNOCKED OFF
        
        obj_ini.bln_removeId=bln_removeId;
        //obj_ini.obj_design.str_type=str_type;

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
        console.log("int_axis: " + obj_design.int_axis);        
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
        console.log("begin debug arr_item");                
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

        let str_type,  str_themeType, str_name, obj_myTheme, obj_myThemeItem, str_nameTheme;
        
        str_type=this.obj_design.str_type;        
        str_themeType=this.obj_design.str_themeType;        
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
        if(!obj_myThemeItem){            
            
            obj_myThemeItem=obj_myTheme.fn_getThemeViaType(str_themeType);                                                     
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

        let str_content=this.fn_getHTMLContent();

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
    fn_getHTMLContent(str_value){              
        
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
    fn_setColor(str_value){
        this.fn_setStyleProperty("color", str_value);
    }    
    
    
    fn_getObjectMatching(str_method){        

        if(this[str_method]){
            return this;
        }   
        let obj_container=this.fn_getParentComponent();                                
        if(obj_container){                    
            return obj_container.fn_getObjectMatching(str_method);
        }
        return false;        
        
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
        if(!this.obj_design.bln_classController){this.obj_design.bln_classController="false";}//undefined or empty string or false                        
        
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
        
        var NewObjectData=JSON.parse(JSON.stringify(ObjectData));        
        NewObjectData.obj_holder=new Holder;                 
        NewObjectData.obj_design.int_modeExecute=this.obj_design.int_modeExecute;//Continuity of Mode                                                                                        
        this.fn_initialize(NewObjectData);//initialize with self from db                                
        return true;
    }    
    fn_stepEnd(){        
        this.fn_createSelf();//create self                
        this.fn_onOpenInstance();//run  baseobvject onopeninstance
    }     
    //START COMPONENT OPERATION FUNCTIONS  
    
    
    fn_getComponent(str_variableName){        
        
        let str_name="obj_" + obj_shared.fn_formatShortName(str_variableName);                                        
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
        str_value=obj_shared.fn_formatShortName(str_value);                    
        this.obj_design.str_type=str_value;
    }          
    fn_defaultNotSet(str_value){
        if(str_value===""){str_value="notset";}
        return str_value;
    }    
    fn_getTag(){
        return this.obj_design.str_tag;
    }
    fn_setTag(str_value, bln_mandatory){
        if(str_value===""){str_value="component";}
        str_value=obj_shared.fn_formatShortName(str_value);        
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
        let str_value=obj_shared.fn_formatShortName(this.obj_design.str_name);        
        this.fn_setVariableName(str_value);                                
    }
    fn_setVariableName(str_value){           
        this.obj_design.str_variableName=str_value;                    
    }
    fn_getVariableName(){        
        return this.obj_design.str_variableName;
    }    
    
    
    /////////////////////START REGISTRATION EVENT
    fn_register(obj_item){ 
        let str_name;
        let str_variableName=obj_item.obj_design.str_variableName;                
        this.fn_registerName(obj_item, str_variableName);        
    }    
    fn_registerName(obj_item, str_variableName){ 
        let str_name;    
        str_name="obj_" + obj_shared.fn_formatShortName(str_variableName);                                
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
    fn_setClassController(bln_value){                   
    }
    fn_getClassController(){                   
        let bln_value=obj_shared.fn_parseBool(this.obj_design.bln_classController);        
        if(!this.fn_proposeClassController()){
            bln_value=false;
        }
        return bln_value;
    }
    fn_proposeClassController(){                           
        let bln_value=true;
        if(this.obj_design.str_type==="component"){
            bln_value=false;
        }        
        return bln_value;
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

        
        if(this[str_action]){            
            this[str_action](obj_post);
        }   
        if(str_actionCallback!==str_action){
            if(this[str_actionCallback]){
                this[str_actionCallback](obj_post);
            }     
        }
        
        obj_notifier=obj_post.ObjectNotifier;                
        if(obj_notifier && obj_notifier!=this){                             
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
        let obj_notifier;
        //console.log("designfile fn_onUnAuthorizeUserStatus: " + obj_post.ObjectNotifier);
        obj_notifier=obj_post.ObjectNotifier;   
        let str_method="fn_onUnAuthorizeUserStatus";             
        if(obj_notifier && obj_notifier!=this) {            
            if(obj_notifier[str_method]){
                obj_notifier[str_method](obj_post);
            }
        }
    }  
    fn_onAuthorizeUserStatus (obj_post){
        let obj_notifier;
        //console.log("designfile fn_onAuthorizeUserStatus: " + obj_post.ObjectNotifier);
        obj_notifier=obj_post.ObjectNotifier;       
        let str_method="fn_onAuthorizeUserStatus"; 
        if(obj_notifier && obj_notifier!=this) {
            if(obj_notifier[str_method]){
                obj_notifier[str_method](obj_post);
            }
        }
    }    
    
    fn_formatPostFetch(obj_post){//could this be overriden to allow for applicaiton specific processing

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
    
        if(obj_post.ObjectData===undefined){            
            //obj_post.ObjectData="{}";
        }
        if(obj_post.RowData===undefined){            
            //obj_post.RowData="[]";
        }
        obj_post.StringObjectData=obj_post.ObjectData;
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

    fn_debugServerPost(obj_post, str_message){
        //overidden
        //console.log("THIS FUNCTION SHOULD BE OVERRIDDEN: AJAX fn_debugServerPost");
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

    fn_formatPost(obj_ini){  

        let obj_post=new Object;
        
        obj_post.URL=obj_ini.str_urlServer                
        obj_post.QueryString=obj_ini.str_queryString;
        obj_post.NotifierId=obj_ini.str_idAJAXNotifier;                        
        obj_post.Action=obj_ini.str_action;                
        obj_post.ActionCallBack=obj_ini.str_actionCallback;                                        
        if(!obj_post.ActionCallBack){            
            obj_post.ActionCallBack=obj_ini.str_action;                
        }        
        obj_post.RecordId=obj_ini.RecordId;
        
        
        
        return obj_post;
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


/*id: 352049//*/
/*type: RunTimeCode//*/
/*END COMPONENT//*/






//START XTRA CLASSES

/*START COMPONENT//*/
/*id: 351993//*/
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

/*id: 351993//*/
/*type: tablecell//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351994//*/
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
/*id: 351994//*/
/*type: tableheader//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351995//*/
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


/*id: 351995//*/
/*type: tablerow//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351973//*/
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

/*id: 351973//*/
/*type: form//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351992//*/
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

/*id: 351992//*/
/*type: table//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351987//*/
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
  fn_bootChildren(){
    //console.log("panel fn_bootChildren");
  }

}//END CLS
//END PANEL

/*id: 351987//*/
/*type: panel//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351991//*/
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
      
      //if(this.obj_design.dataSVG===undefined){this.obj_design.dataSVG=obj_path.fn_getURLAssetFile(this.obj_design.str_type, "default.svg");};          
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
/*id: 351991//*/
/*type: svgblock//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351971//*/
/*type: eazygriditem//*/
  class eazygriditem extends component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }  
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      
      //START INITIALIZE DESIGN
      this.fn_setType("eazygriditem");      
      this.fn_setTag("eazygriditem");                  
      
      if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Grid Item";}      
      this.fn_setIsContainer(true);

      if(this.fn_getStyleProperty("backgroundColor")===undefined){this.obj_domStyle.backgroundColor="#414141";}      
      if(this.obj_design.str_minDim==undefined){this.obj_design.str_minDim="100px";}      
      if(this.obj_design.gridTemplate==undefined){this.fn_setGridTemplate(1);}            
      
      //END  INITIALIZE DESIGN

      //START INITIALIZE STYLE                    
      //END INITIALIZE STYLE        
    }  
    fn_initializePluginDesign(){
      this.obj_designDelegate=new DesignDelegateeazygriditem(this);                        
    }
    fn_setGridTemplate(int_val){
      this.obj_design.gridTemplate="minmax(" + this.obj_design.str_minDim + ", "+int_val+"fr)";
    }            
    
}//END CLS
//END eazygriditem
/*id: 351971//*/
/*type: eazygriditem//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351954//*/
/*type: abcconsumer//*/

//XSTART component/abcconsumer
class abcconsumer extends component{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("abcconsumer");      
    this.fn_setTag("abcconsumer");            
    this.obj_design.bln_isGenericTag=true;
    // this.fn_extends("component");            
    this.obj_holder.bln_debugServer=false;
  }

  fn_onLoad(){ //design project on load
    super.fn_onLoad();      
    this.fn_checkAuthorize();        
  }  

  /////////////////////        
  //START Parent XDesginInterface LoginPanel Template 
  fn_onUnAuthorizeUserStatus(obj_post){
    console.log("AAA PROJECT COMPONENT fn_onUnAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
    let obj_item;  
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }              
    obj_item=this.fn_getComponent("maingrid"); 
    if(obj_item){              
      obj_item.fn_setDisplay(false);
    }          
    obj_item=this.fn_getComponent("loginPanel");     
    if(obj_item){                
      obj_item.fn_showFormAuthorize();
    }     
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(true);
    }          
  }  
  fn_onAuthorizeUserStatus(obj_post){
    //console.log("BBB PROJECT COMPONENT  fn_onAuthorizeUserStatus: " + obj_post.AuthorizeUserStatus);
    let obj_item; 
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }          
    obj_item=this.fn_getComponent("maingrid"); 
    if(obj_item){              
      obj_item.fn_setDisplay("grid");
    } 
    obj_item=this.fn_getComponent("loginPanel");     
    if(obj_item){                
      obj_item.fn_hideFormAuthorize();
    }     
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(true);
    }          
  }  
  /////////////////////       
  fn_endAuthorize(){//project external button will/call this funciton 
    let obj_item=this.fn_getComponent("loginPanel");
    if(obj_item){obj_item.fn_endAuthorize();}      
  }   
  fn_checkAuthorize(){//project onload call this function to update login status
    let obj_item=this.fn_getComponent("loginPanel");
    if(obj_item){obj_item.fn_checkAuthorize();}      
  }    
  fn_onLogIn(){//project can welcome onlogin
    //welcome etc
  }      
  fn_onLogout(){//project can goodbye onlogout
    //good bye etc
  }   
  //END Parent XDesginInterface LoginPanel Template 
  /////////////////////        
}//END CLS
//END TAG
//END component/abcconsumer
/*id: 351954//*/
/*type: abcconsumer//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351955//*/
/*type: abchasserver//*/

            //XSTART component/abchasserver
              class abchasserver extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("abchasserver");      
                  this.fn_setTag("abchasserver");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                }
              }//END CLS
              //END TAG
              //END component/abchasserver
/*id: 351955//*/
/*type: abchasserver//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351959//*/
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
      //console.log("button click")
    }    
  
  fn_setHTMLContent(){
    super.fn_setHTMLContent();        
    this.fn_setText(this.obj_design.str_text);                
  }            
}//END CLS
//END BUTTON

/*id: 351959//*/
/*type: button//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351964//*/
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
                if(bln_debug){obj_instance.fn_debug("COMPLETE XDESIGN1 on Save Component");}   
                this.obj_holder.obj_container.onServerManagerCompleteSave(obj_iniSave); //XDESIGN Program CallBack Function                                 
            }           
        }
        //*/

        if(bln_debug){obj_instance.fn_debug("EXIT");}                
    }    

    fn_save(obj_ini){         

        let bln_debug=false;
        let int_idRecord;
        
        
        let obj_instance=obj_ini.obj_instance;
        if(parseInt(obj_instance.obj_design.int_modeExecute)!==obj_instance.obj_holder.int_modeEdit){            
            //console.log(obj_instance.obj_design.str_tag + ": Mode Not Valid For Operation [" + obj_instance.obj_design.int_modeExecute + "][" + obj_instance.obj_holder.int_modeEdit + "]");
            //this will be the case for runtme components , running within editable components
            return;
        }        

        obj_instance=obj_ini.obj_instance;
        int_idRecord=parseInt(obj_instance.obj_design.int_idRecord);                
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

        
        //obj_instance.obj_designDelegate.fn_updateMap(JSON.parse(obj_post.ObjectData));//update map        
        

        if(bln_debug){obj_instance.fn_debug("BEFORE PUT POST");}
        this.fn_putPost(obj_post);

        if(bln_debug){obj_instance.fn_debug("AFTER PUT POST");}
        
        //Very Important - do not fuck about with this
        obj_instance.obj_design.int_modeExecute=int_modeExecuteCopy;//put back in original mode
        //Very Important - do not fuck about with this       
        
    }
    save(obj_post){ //native callback generally overidden                
        //console.log("Design File Save Existing Record Id Native Call Back")        
        //*
        //console.log("save obj_post.Objectdata: " + obj_post.ObjectData);
        //console.log(obj_post.ObjectData);
        obj_post.ObjectInstance.obj_designDelegate.fn_updateMap(obj_post.ObjectData);//update map        
        if(obj_post.RELOADREQUIRED){
            alert("NEW CLASS : RELOADREQUIRED");
        }
        //*/
    }
    
    saveAs(obj_post){//native callback
        //console.log("Design File SaveAs New  Record Id Native Call Back")
        
        //*
        //START REQUIRED DO NOT REMOVE
        let int_idRecord=parseInt(obj_post.RecordId);        
        obj_post.ObjectInstance.obj_design.int_idRecord=int_idRecord;
        //END REQUIRED DO NOT REMOVE
        //*/
        //console.log("saveAs obj_post.Objectdata: " + obj_post.ObjectData);
        //console.log(obj_post.ObjectData);
        obj_post.ObjectInstance.obj_designDelegate.fn_updateMap(obj_post.ObjectData);//update map        
        
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
            //console.log("obj_post.RecordExtend: " + obj_post.RecordExtend);
            obj_post.RecordId=obj_instance.obj_design.int_idRecord;                        
            obj_post.ProtectedPin=obj_instance.obj_design.bln_protectedPin;            
            obj_post.PalettePin=obj_instance.obj_design.bln_palettePin;     
            obj_post.DynamicPin=obj_instance.obj_design.bln_dynamicPin;                                            
            obj_post.CreatedDate=obj_instance.obj_design.str_createdDate;
            obj_post.ModifiedDate=obj_instance.obj_design.str_modifiedDate;            
            obj_post.LastVersionDate=obj_instance.obj_design.str_lastVersionDate;            
            obj_post.CategoryList=obj_instance.obj_design.str_categoryList;            
            obj_post.CreateRelease=obj_project.obj_holder.bln_createRelease;                        
            //console.log("obj_post.CreateRelease: " + obj_post.CreateRelease);
                        
            //get a list of your dependentid
            //does this need to run on every trip?                                                
            obj_post.DependentId=obj_instance.fn_compileDependentId();
            //console.log(obj_instance.obj_design.str_name + " obj_post.DependentId: " + obj_post.DependentId);

            
            
            
            //get a list of your classlist
            let str_List1=obj_instance.obj_design.str_classList;            
            
            //console.log("START TYPE : " + obj_instance.obj_design.str_type);                       
            //console.log("str_List1: " + str_List1);                       
            
            //get a list of every classlist in your child arr item
            //does this need to run on every trip?                                                
            let str_List2=obj_instance.fn_compileDependentClassList();
            str_List2="";
            //console.log("str_List2: " + str_List2);

            //get a comnbined list of the above
            let str_List3=str_List1 + "," + str_List2;            
            str_List3=obj_shared.fn_remove(","+str_List3+",", ",notset,");
            str_List3=obj_shared.fn_remove(","+str_List3+",", ","+obj_instance.obj_design.str_type+",");                        
            str_List3=obj_shared.fn_trimComma(str_List3);            
            str_List3=obj_shared.fn_formatUniqueList(str_List3);            
            //console.log("str_List3: " + str_List3);
            //console.log("END  TYPE : " + obj_instance.obj_design.str_type);                       
            obj_post.ClassList=str_List3;                        
            obj_post.RecordExtend=obj_instance.obj_design.str_classExtend;            
            obj_post.ClassController=obj_instance.obj_design.bln_classController;                                    

            obj_post.IsRoot=obj_instance.obj_holder.bln_isRoot;//Is Project Instance - set Current Project                        
            if(obj_projectTarget===obj_instance){
                obj_post.ComponentCode=obj_instance.obj_holder.str_componentCode;                
            }
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
        //console.log("obj_post.ProtectedPin: " + obj_post.ProtectedPin);        
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


/*id: 351964//*/
/*type: designfile//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351967//*/
/*type: desktopnavigationbutton//*/

            //XSTART component/desktopnavigationbutton
              class desktopnavigationbutton extends svgblock{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("desktopnavigationbutton");      
                  this.fn_setTag("desktopnavigationbutton", true);            
                  this.obj_design.bln_isGenericTag=true;
                  this.fn_extends("svgblock");            
                  
                  if(this.obj_design.dataSVG===undefined){
                    this.obj_design.dataSVG=obj_path.fn_getURLAssetFile("shared", "exit-button.svg");
                  }         
                  this.obj_holder.str_filter_electricgreen="invert(77%) sepia(47%) saturate(2073%) hue-rotate(40deg) brightness(105%) contrast(106%)";
                  /*
                   #2596be electic blue
                   #389eff electic blue
                   check generator here: 
                   https://codepen.io/sosuke/pen/Pjoqqp
                   //*/

                  if(this.obj_design.str_urlNavigate===undefined){
                    this.obj_design.str_urlNavigate="https://www.mycode.buzz";
                  }
                }
                fn_validateDesignInput(obj_ini){
                  let str_name=obj_ini.obj_design.str_name;
                  let bln_disabled=true;
                  if(str_name==="str_urlNavigate"){
                    bln_disabled=false;
                  }
                  return  bln_disabled;
              
                }        
                fn_onClick(){  
                  
                  let int_pos=window.location.href.indexOf("lokal");//localhost                   
                  let str_urlNavigate;
                  str_urlNavigate="https://console.mycode.buzz";
                  if(int_pos!==-1){str_urlNavigate="http://desk.lokal-mycode.buzz";}                  
                  window.location.href=str_urlNavigate;
                  //window.open(str_urlNavigate);
                }  
              }//END CLS
              //END TAG
              //END component/desktopnavigationbutton
/*id: 351967//*/
/*type: desktopnavigationbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351970//*/
/*type: eazygrid//*/
class eazygrid extends component {
    constructor(obj_ini) {            
      super(obj_ini); // call the super class constructor       
    } 
    fn_initialize(obj_ini){      
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.fn_setType("eazygrid");      
      this.fn_setTag("eazygrid");      
      this.fn_requires("eazygriditem");      
      
      this.fn_setIsContainer(true);      

      if(this.obj_design.int_axis===undefined){      
        //this.obj_design.int_axis= 0;
      }
      
      
      if(this.obj_design.bln_eazyGrid===undefined){this.obj_design.bln_eazyGrid=true;}      
      //if(this.obj_design.bln_isLocalHome===undefined){this.obj_design.bln_isLocalHome=true;}      
      
      if(this.obj_design.str_minDim==undefined){this.obj_design.str_minDim="100px";}      
      if(this.obj_design.str_gridTemplateDefault==undefined){this.obj_design.str_gridTemplateDefault="minmax(" + this.obj_design.str_minDim + ", 1fr)";}
      
      //END  INITIALIZE DESIGN
      
      //START INITIALIZE STYLE                          
      this.obj_domStyle.display="grid";
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
      if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="0px";}      
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="hidden";} 
      if(this.fn_getStyleProperty("backgroundColor")===undefined){this.obj_domStyle.backgroundColor="#2b2c34";}     
      if(this.fn_getStyleProperty("grid-gap")===undefined){this.fn_setStyleProperty("grid-gap", "10px");}
      if(this.fn_getStyleProperty("grid-auto-rows")===undefined){this.fn_setStyleProperty("grid-auto-rows", this.obj_design.str_gridTemplateDefault);}
      if(this.fn_getStyleProperty("grid-auto-columns")===undefined){this.fn_setStyleProperty("grid-auto-columns", this.obj_design.str_gridTemplateDefault);}
      if(this.fn_getStyleProperty("grid-template-rows")===undefined){this.fn_setStyleProperty("grid-template-rows", this.obj_design.str_gridTemplateDefault);}
      if(this.fn_getStyleProperty("grid-template-columns")===undefined){this.fn_setStyleProperty("grid-template-columns", this.obj_design.str_gridTemplateDefault);}                 
      //END INITIALIZE STYLE
    }
    
    fn_beforeAddChildren(){      
      
      
      if(this.obj_design.int_axis===undefined){        
        this.obj_design.int_axis=obj_const.int_axisHorizontal;
        
        let obj_parent=this.fn_getParentComponent();
        if(obj_parent){
          let obj_container=obj_parent.fn_getParentComponent();          
          if(obj_container && obj_container.obj_design.str_type==="eazygrid"){              
              let int_value=obj_container.obj_design.int_axis;                        
              this.obj_design.int_axis=obj_shared.fn_flipAxis(int_value);                            
          }
        }
      }            
    }



    fn_initializePluginDesign(){
      this.obj_designDelegate=new DesignDelegateeazygrid(this);                              
    }
    
    fn_addItem(obj_ini){
      //console.log("fn_addItem");
      let obj_item;        
      if(obj_ini.obj_design.str_type==undefined){
        obj_ini.obj_design.str_type="eazygriditem";
      }       
      
      obj_item=super.fn_addItem(obj_ini)//CallSuper

      this.fn_applyFeatures();
      return obj_item;
    }
    
    fn_getIsEmpty(){
      let arr, obj_item;
      arr=this.obj_design.arr_item;
      if(arr.length>1){
        console.log("arr.length>1")
        return false;
      }
      if(!arr.length){        
        return true;
      }
      obj_item=arr[0];
      if(obj_item.fn_getType()!=="eazygriditem"){
        console.log("obj_item !==eazygriditem")
        return false;
      }
      if(obj_item.obj_design.arr_item.length){
        console.log("(obj_item.obj_design.arr_item.length is true")
        return false;
      }
      return true;
    }
      
      
    
    fn_bootChildren(){//only in boot/pallteItem phase
      
      console.log("fn_bootChildren");
      
      let obj_ini;
      
      
      if(this.obj_design.bln_eazyGrid){        
        
        obj_ini=new Holder;                     
        obj_ini.obj_domStyle.backgroundColor=obj_project.obj_theme.foregroundColor;                        
        //obj_ini.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();                                
        this.fn_addItem(obj_ini);//BootItem     
      
        obj_ini=new Holder;                     
        obj_ini.obj_domStyle.backgroundColor=obj_project.obj_theme.foregroundColor;                        
        //obj_ini.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();                        
        this.fn_addItem(obj_ini);//BootItem                
      }    
    }        
    
    fn_compileTemplate(){      

      this.obj_domStyle.gridTemplateRows=this.obj_design.str_gridTemplateDefault;
      this.obj_domStyle.gridTemplateColumns=this.obj_design.str_gridTemplateDefault;     

      if(this.obj_design.int_axis===undefined){        
        return;
      }
      
      let obj_item;
      let s="";            
      this.obj_design.arr_item.forEach(obj_item => {                
        if(obj_item.obj_design.gridTemplate){
          s+=obj_item.obj_design.gridTemplate;        
          s+=" ";
        }
      });      


      if(s){
        s=s.trim();
      }

      //console.log(" eazygrid s: " + s);      

      switch(this.obj_design.int_axis){
            case(obj_const.int_axisVertical):            
              this.obj_domStyle.gridTemplateColumns=s;              
            break;
            case(obj_const.int_axisHorizontal):            
              this.obj_domStyle.gridTemplateRows=s;
            break;
            default:              
      }      
      if(this.bln_debug){
        let s_debug;
        s_debug="fn_compileTemplate"  +"\n";        
        s_debug+="str_gridTemplateRows: " + this.obj_domStyle.gridTemplateRows  +"\n";
        s_debug+="str_gridTemplateColumns: " + this.obj_domStyle.gridTemplateColumns +"\n";
        //console.log(s_debug);        
      }      
    }
    
    fn_applyFeatures(){
      this.fn_compileTemplate();           
      super.fn_applyFeatures();      
    }    
    
}//END CLS
//END eazygrid
/*id: 351970//*/
/*type: eazygrid//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351976//*/
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

/*id: 351976//*/
/*type: input//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351979//*/
/*type: loginbutton//*/

            //XSTART component/loginbutton
              class loginbutton extends svgblock{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("loginbutton");      
                  this.fn_setTag("loginbutton", true);            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("svgblock");  
                   
                   
                  if(this.obj_design.dataSVG===undefined){this.obj_design.dataSVG=obj_path.fn_getURLAssetFile("shared", "login-button.svg");};          
                  
                  this.obj_holder.str_filter_gray="invert(50%)";
                  this.obj_holder.str_filter_orange="invert(64%) sepia(16%) saturate(4363%) hue-rotate(360deg) brightness(106%) contrast(105%)";
                  //this.obj_holder.str_filter_electricblue="invert(47%) sepia(65%) saturate(535%) hue-rotate(150deg) brightness(94%) contrast(90%)";
                  this.obj_holder.str_filter_electricblue="invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)";
                  this.obj_holder.str_filter_electricgreen="invert(77%) sepia(47%) saturate(2073%) hue-rotate(40deg) brightness(105%) contrast(106%)";
                  
                  

                  this.obj_holder.str_filter_endAuthorize=this.obj_holder.str_filter_gray;                  
                  this.obj_holder.str_filter_startAuthorize=this.obj_holder.str_filter_electricblue;
                  this.obj_holder.str_filter_startAuthorize=this.obj_holder.str_filter_electricgreen;
                  

                  //this.fn_setFilter(this.obj_holder.str_filter_startAuthorize);
                   
                   
                   /*
                   #2596be electic blue
                   #389eff electic blue
                   check generator here: 
                   https://codepen.io/sosuke/pen/Pjoqqp
                   //*/
                }

                fn_onClick(){                                    
                  let obj_notify=this.obj_holder.obj_regisratorProject;                  
                  let str_method="fn_endAuthorize";
                  if(obj_notify && obj_notify[str_method]){
                    obj_notify[str_method]();
                  }      
                  
                  
                }                
              }//END CLS
              //END TAG
              //END component/loginbutton
/*id: 351979//*/
/*type: loginbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351980//*/
/*type: loginpanel//*/
//START component/loginpanel
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
    this.obj_holder.bln_debugServer=false;    
    
    if(this.obj_design.bln_useExternalButton===undefined){this.obj_design.bln_useExternalButton=false;}    
  }
  fn_validateDesignInput(obj_ini){
    let str_name=obj_ini.obj_design.str_name;
    let bln_disabled=true;
    if(str_name==="bln_useExternalButton"){
      bln_disabled=false;
    }
    return  bln_disabled;

  }          
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
  fn_runAction(str_action,  obj_ini){         
    
    let obj_serverManager=this.fn_getComponent("loginPanelServerManager");      
    if(!obj_ini){obj_ini=new Object;}
    obj_ini.str_idAJAXNotifier=this.obj_design.str_idXDesign;            
    obj_ini.str_action=str_action;
    obj_ini.bln_execute=true;      
    obj_serverManager.fn_runAction(obj_ini);          
  }

  fn_checkAuthorize(){        
    this.fn_runAction("runauthstatus", {});            
  }  
  /////////////////////        
  fn_startAuthorize(){//runs on projectload, on loginform submit, on power button press     
    //console.log("LOGIN fn_startAuthorize");

    let obj_item, bln_valid;
    let AuthorizeUserEmail, AuthorizeUserPass;
    AuthorizeUserEmail="";
    AuthorizeUserPass=""; 
    
    let obj_Project=this;
    obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
    if(obj_item){
      AuthorizeUserEmail=obj_item.fn_getValue();
      obj_item.fn_setDisplay(true);        
      obj_item.fn_setDomProperty("autocomplete", "email");        
      obj_item.fn_setDomProperty("type", "email");        
    }
    
    obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
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

    obj_Project.fn_runAction("XDesigner_startAuthorize", obj_auth);            
  }
  XDesigner_startAuthorize(obj_post){                                    
    
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
    
    if(!obj_auth.AuthorizeUserStatus){
      this.fn_onEndAuthorize();              
      return;
    }
    
    let obj_notify=this.obj_holder.obj_regisratorProject;
    let str_method="fn_onLogIn";                   
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method]();
    }
  }

  fn_requireAuthorizeUserEmail(){      
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserEmail");                                    
    let AuthorizeUserEmail;
    if(obj_item){
      obj_item.fn_setDisplay(true);        
      AuthorizeUserEmail=obj_item.fn_getValue();        
    }
    
    let bln_valid=obj_shared.fn_validEmail(AuthorizeUserEmail);      
    if(!bln_valid){        
      this.fn_showFormAuthorize();            
      return false;
    }

    this.fn_setAuthorizeUserEmail(AuthorizeUserEmail);      
    return true;
  }
  
  fn_requireAuthorizeUserPass(){
    
    let AuthorizeUserPass;
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
    if(obj_item){
      obj_item.fn_setDisplay(true);        
      AuthorizeUserPass=obj_item.fn_getValue();
    }
    if(!AuthorizeUserPass){        
      this.fn_showFormAuthorize();
      return false;
    }
    this.fn_setAuthorizeUserPass(AuthorizeUserPass);    
    obj_item.fn_setValue("");              
    return true;
  }
  fn_endAuthorize(){                
    let obj_auth={};      
    
    
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                          
    if(obj_item){obj_item.fn_setDisplay(false);}      
    
    obj_Project.fn_runAction("XDesigner_endAuthorize", obj_auth);
  } 
  XDesigner_endAuthorize(obj_post){      
    this.fn_onEndAuthorize();
  }    

  fn_onEndAuthorize(){      
    let obj_notify=this.obj_holder.obj_regisratorProject;
    let str_method="fn_onLogout";                   
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method]();
    }      

    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("xdesign1_AuthorizeUserPass");                                    
    if(obj_item){        
      obj_item.fn_setValue("");
    }
    this.fn_showFormAuthorize();            
  }
  /////////////////////            
  fn_onUnAuthorizeUserStatus(obj_post){
    //console.log("loginpanel fn_onUnAuthorizeUserStatus");

    this.fn_showFormAuthorize();

    let obj_notify=this.obj_holder.obj_regisratorProject;    
    let str_method="fn_onUnAuthorizeUserStatus";
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method](obj_post);
    }      
      
  }
  fn_onAuthorizeUserStatus(obj_post){
    //console.log("loginpanel  fn_onAuthorizeUserStatus");

    this.fn_hideFormAuthorize();

    let obj_notify=this.obj_holder.obj_regisratorProject;    
    let str_method="fn_onAuthorizeUserStatus";
    if(obj_notify && obj_notify[str_method]){
      obj_notify[str_method](obj_post);
    }          
  }

  fn_showFormAuthorize(){        
    //console.log("login panel fn_showFormAuthorize");

    this.fn_setVisibility(true);
    this.fn_setDisplay("flex");
    
    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("loginpanelform");                                                
    if(obj_item){
      obj_item.fn_setVisibility(true);
      obj_item.fn_setDisplay(true);
    }    
    
    obj_item=obj_Project.fn_getComponent("loginbutton");                                                      
    if(obj_item){
      obj_item.fn_setVisibility(false);
      obj_item.fn_setDisplay(false);      
    }
  }
  fn_hideFormAuthorize(){   
    //console.log("login panel fn_hideFormAuthorize");

    this.fn_setVisibility(true);
    this.fn_setDisplay("flex");

    let obj_Project=this;
    let obj_item=obj_Project.fn_getComponent("loginpanelform");                                                
    if(obj_item){
    obj_item.fn_setVisibility(false);
    obj_item.fn_setDisplay(false);
    }
    
    if(!this.obj_design.bln_useExternalButton){
      obj_item=obj_Project.fn_getComponent("loginbutton");                                                      
      if(obj_item){
        obj_item.fn_setVisibility(true);
        obj_item.fn_setDisplay(true);
      }
    }
  }                     
  /*
  /////////////////////        
  //START Parent XDesginInterface LoginPanel Template - to copy
  fn_onUnAuthorizeUserStatus(){    
    let obj_item;
    //Hide project 
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }          
    obj_item=this.fn_getComponent("ExampleProjectGrid");
    if(obj_item){        
      obj_item.fn_setDisplay(false);
    }
    //Show loginpanel 
    obj_item=this.fn_getComponent("loginPanel"); 
    if(obj_item){                
      obj_item.fn_showFormAuthorize();
    }     
  }        
  fn_onAuthorizeUserStatus(){
    let obj_item;
    //Show project 
    obj_item=this;
    if(obj_item){        
      obj_item.fn_setDisplay(true);
    }          
    obj_item=this.fn_getComponent("ExampleProjectGrid");
    if(obj_item){        
      obj_item.fn_setDisplay("grid");
    }
    //Hide loginpanel 
    obj_item=this.fn_getComponent("loginPanel"); 
    if(obj_item){                
      obj_item.fn_hideFormAuthorize();
    }     
  }        
  /////////////////////
  fn_endAuthorize(){//project external button will/call this funciton 
    let obj_item=this.fn_getComponent("loginPanel");
    if(obj_item){obj_item.fn_endAuthorize();}      
  }    
  fn_checkAuthorize(){//project onload call this function to update login status
    let obj_item=this.fn_getComponent("loginPanel");
    if(obj_item){obj_item.fn_checkAuthorize();}      
  }          
  fn_onLogIn(){//project can welcome onlogin
    //welcome etc
  }        
  fn_onLogout(){//project can goodbye onlogout
    //good bye etc
  }   
  //END Parent XDesginInterface LoginPanel Template - to copy
  /////////////////////        
  //*/
}//END CLS
//END component/loginpanel
/*id: 351980//*/
/*type: loginpanel//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351981//*/
/*type: loginpanelform//*/

            //XSTART component/loginpanelform
              class loginpanelform extends form{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("loginpanelform");      
                  this.fn_setTag("loginpanelform");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("form");            
                }
                fn_onLoad(){
                  super.fn_onLoad();
                  
                  let that=this;
                  this.dom_obj.addEventListener('submit', function(event){                                       
                    //console.log("fn_onLoad");
                      event.preventDefault(); 
                      //return false;                                               
                      
                      let obj_notify=that.obj_holder.obj_regisratorProject;                      
                      if(obj_notify){
                        obj_notify.fn_startAuthorize();      
                      }                      
                      
                  });
                }
              }//END CLS
              //END TAG
              //END component/loginpanelform
/*id: 351981//*/
/*type: loginpanelform//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 351996//*/
/*type: tag//*/

/*id: 351996//*/
/*type: tag//*/
/*END COMPONENT//*/

//END XTRA CLASSES




//START AUTO GENERATED COMPONENT MAP
const obj_ComponentMap = new Map([['tablecell', tablecell],['tableheader', tableheader],['tablerow', tablerow],['form', form],['table', table],['panel', panel],['svgblock', svgblock],['eazygriditem', eazygriditem],['abcconsumer', abcconsumer],['abchasserver', abchasserver],['button', button],['designfile', designfile],['desktopnavigationbutton', desktopnavigationbutton],['eazygrid', eazygrid],['input', input],['loginbutton', loginbutton],['loginpanel', loginpanel],['loginpanelform', loginpanelform],['tag', tag]]);
//END AUTO GENERATED MAP




/*START COMPONENT//*/
/*id: 352051//*/
/*type: TemplateCode//*/

//START Project.js
class Project extends abcconsumer{
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
obj_boot.obj_design.int_idRecord=3459; 
/*END DESIGN BOOT VARIABLE//*/
//END Project.js


/*id: 352051//*/
/*type: TemplateCode//*/
/*END COMPONENT//*/




/*START INSTANCE JSON MAP//*/
var obj_InstanceJSONMap = new Map([
[3451, {"obj_design":{"str_type":"panel","str_name":"My panel","int_idRecord":"3451","str_idXDesign":"myId_21664382","str_idProject":"myId_84955184","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-8 14:24:57","str_modifiedDate":"2022-0-8 14:24:57","bln_createRelease":"false","str_urlServer":"server.php","arr_item":[{"obj_design":{"int_idRecord":"4277","str_type":"desktopnavigationbutton"}}]},"obj_domStyle":{"display":"flex","height":"100%","width":"100%","padding":"10px","overflow":"auto","background-color":"blue"}}],
[3454, {"obj_design":{"str_type":"panel","str_name":"My panel","int_idRecord":"3454","str_idXDesign":"myId_31166661","str_idProject":"myId_15692536","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-8 14:58:59","str_modifiedDate":"2022-0-8 14:58:59","bln_createRelease":"false","arr_item":[{"obj_design":{"int_idRecord":"3461","str_type":"abchasserver"}}],"str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"display":"flex","height":"100%","width":"100%","padding":"10px","overflow":"auto","background-color":"red"}}],
[3455, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3454","str_type":"panel"}}],"str_type":"eazygriditem","str_idXDesign":"myId_53300165","str_idProject":"myId_15692536","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"3455","str_createdDate":"2022-0-8 14:58:55","str_modifiedDate":"2022-0-8 14:58:55","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[3457, {"obj_design":{"str_type":"eazygriditem","str_idXDesign":"myId_68555616","str_idProject":"myId_15692536","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"3457","str_createdDate":"2022-0-8 14:58:55","str_modifiedDate":"2022-0-8 14:58:55","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_createRelease":"false","str_urlServer":"server.php","arr_item":[{"obj_design":{"int_idRecord":"4518","str_type":"panel"}}],"bln_classController":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[3458, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3455","str_type":"eazygriditem"}},{"obj_design":{"int_idRecord":"3457","str_type":"eazygriditem"}}],"str_type":"eazygrid","str_name":"maingrid","int_idRecord":"3458","str_idXDesign":"myId_43534660","str_idProject":"myId_15692536","str_variableName":"maingrid","str_tag":"maingrid","str_createdDate":"2022-0-8 14:58:55","str_modifiedDate":"2022-0-8 14:58:55","bln_eazyGrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)","bln_createRelease":"false","str_urlServer":"server.php","bln_registerAtProject":true,"str_classList":"eazygriditem","int_axis":1,"bln_classController":"false"},"obj_domStyle":{"height":"100%","width":"100%","padding":"0px","overflow":"hidden","background-color":"#2b2c34","grid-gap":"10px","grid-auto-rows":"minmax(100px, 1fr)","grid-auto-columns":"minmax(100px, 1fr)","grid-template-rows":"minmax(100px, 1fr) minmax(100px, 1fr)","grid-template-columns":"minmax(100px, 1fr)","display":"grid"}}],
[3459, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3458","str_type":"eazygrid"}},{"obj_design":{"int_idRecord":3645,"str_type":"loginpanel"}}],"int_idRecord":3459,"str_idXDesign":"myId_15692536","str_name":"ABC Consumer","str_variableName":"abcconsumer","str_type":"abcconsumer","str_tag":"abcconsumer","str_createdDate":"2022-0-8 14:58:18","str_modifiedDate":"2022-0-8 14:58:18","bln_isLocalHome":true,"str_urlServer":"server.php","bln_addToDesktop":true,"str_categoryList":"MyGeneral","bln_palettePin":true,"bln_classController":true},"obj_domStyle":{"display":"block"}}],
[3460, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3451","str_type":"panel"}}],"str_type":"panel","str_name":"My panel","int_idRecord":"3460","str_idXDesign":"myId_21412696","str_idProject":"myId_84955184","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-8 14:24:55","str_modifiedDate":"2022-0-8 14:24:55","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","padding":"10px","overflow":"auto","width":"300px"}}],
[3461, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3460","str_type":"panel"}}],"int_idRecord":"3461","str_idXDesign":"myId_84955184","str_name":"ABC HasServer","str_variableName":"abchasserver","str_type":"abchasserver","str_tag":"abchasserver","str_createdDate":"2022-0-8 14:24:51","str_modifiedDate":"2022-0-8 14:24:51","bln_palettePin":true,"bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_15692536","str_urlServer":"server.php"}}],
[3630, {"obj_design":{"str_type":"input","str_name":"xdesign1_AuthorizeUserEmail","int_idRecord":"3630","str_idXDesign":"myId_13131319","str_idProject":"myId_87716375","str_tag":"input","bln_registerAtProject":true,"str_variableName":"xdesign1_authorizeuseremail","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"},"obj_domProperty":{"type":"email","minlinegth":"5","maxlength":"100","size":"20","placeholder":"email address","required":true},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px","display":"block"}}],
[3631, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3630","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3631","str_idXDesign":"myId_36888371","str_idProject":"myId_11188187","str_tag":"td","str_text":"xdesignblank","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3632, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3631","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3632","str_idXDesign":"myId_98606601","str_idProject":"myId_11188187","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"}}],
[3633, {"obj_design":{"str_type":"input","str_name":"xdesign1_AuthorizeUserPass","int_idRecord":"3633","str_idProject":"myId_87716375","str_tag":"input","bln_registerAtProject":true,"str_variableName":"xdesign1_authorizeuserpass","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_idXDesign":"myId_16744640","str_urlServer":"server.php","bln_classController":"false"},"obj_domProperty":{"minlinegth":"5","maxlength":"100","size":"20","placeholder":"One Time Pass","type":"text"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px","display":"none"}}],
[3634, {"obj_design":{"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3634","str_idXDesign":"myId_33861760","str_idProject":"myId_11188187","str_tag":"td","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-28 7:42:45","str_modifiedDate":"2021-11-28 7:42:45","bln_createRelease":"false","arr_item":[{"obj_design":{"int_idRecord":"3633","str_type":"input"}}],"str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3635, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3634","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3635","str_idXDesign":"myId_87338318","str_idProject":"myId_11188187","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"}}],
[3636, {"obj_design":{"str_type":"input","str_name":"My input","int_idRecord":"3636","str_idXDesign":"myId_67197766","str_idProject":"myId_87716375","str_tag":"input","str_variableName":"myinput","str_createdDate":"2021-11-27 13:8:56","str_modifiedDate":"2021-11-27 13:8:56","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"},"obj_domProperty":{"type":"submit","value":"Sign In"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px"}}],
[3637, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3636","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3637","str_idXDesign":"myId_07738118","str_idProject":"myId_11188187","str_tag":"td","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-27 13:8:56","str_modifiedDate":"2021-11-27 13:8:56","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3638, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3637","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3638","str_idXDesign":"myId_31170818","str_idProject":"myId_11188187","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"}}],
[3639, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3632","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3635","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3638","str_type":"tablerow"}}],"str_type":"table","str_name":"My table","int_idRecord":"3639","str_idXDesign":"myId_01505510","str_idProject":"myId_11188187","str_tag":"table","str_classList":"tablerow,tablecell,tableheader","str_variableName":"mytable","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"}}],
[3640, {"obj_design":{"str_tag":"legend","str_type":"tag","str_content":"<p>XDesigner</p>","bln_typeable":true,"str_idXDesign":"myId_66993314","str_idProject":"myId_11188187","str_name":"My tag","int_idRecord":"3640","blnIsTag":true,"str_text":"<p>XDesigner</p>","str_variableName":"mytag","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"color":"white","background-color":"rgb(65, 65, 65)","padding":"3px 30px"}}],
[3641, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3639","str_type":"table"}},{"obj_design":{"int_idRecord":"3640","str_type":"tag"}}],"str_tag":"fieldset","str_type":"tag","str_idXDesign":"myId_61939443","str_idProject":"myId_11188187","str_name":"My tag","int_idRecord":"3641","blnIsTag":true,"str_variableName":"mytag","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"}}],
[3642, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3641","str_type":"tag"}}],"str_tag":"form","str_type":"loginpanelform","str_idXDesign":"myId_61366636","str_idProject":"myId_87716375","str_name":"loginpanelform","int_idRecord":"3642","blnIsTag":true,"bln_registerAtProject":true,"bln_isLocalHome":true,"str_variableName":"loginpanelform","str_createdDate":"2021-11-29 0:2:58","str_modifiedDate":"2021-11-29 0:2:58","bln_createRelease":"false","str_classExtend":"form","str_urlServer":"server.php"},"obj_domStyle":{"font-fmily":"helvetica"}}],
[3643, {"obj_design":{"str_type":"designfile","str_name":"loginPanelServerManager","int_idRecord":"3643","str_idXDesign":"myId_75250001","str_idProject":"myId_87716375","str_variableName":"loginpanelservermanager","str_tag":"designfile","str_createdDate":"2022-0-19 9:29:0","str_modifiedDate":"2022-0-19 9:29:0","str_urlServer":"/app/xdesign1/server/server.php","bln_createRelease":"false","bln_registerAtProject":true,"bln_classController":"false"}}],
[3644, {"obj_design":{"int_idRecord":"3644","str_idXDesign":"myId_38655048","str_name":"LoginButton","str_type":"loginbutton","str_tag":"loginbutton","bln_isLocalHome":true,"typeSVG":"image/svg+xml","filterSVG":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","str_classExtend":"svgblock","pointerEventSVG":"none","bln_registerAtProject":true,"str_variableName":"loginbutton","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":"false","blnIsTag":true,"str_urlServer":"server.php","str_idProject":"myId_87716375","dataSVG":"/app/shared/asset/power-off.svg"},"obj_domStyle":{"padding":"0px","align-self":"center","width":"25px","height":"25px","margin-left":"auto","margin-right":"30px","display":"none"}}],
[3645, {"obj_design":{"str_type":"loginpanel","str_name":"loginPanel","int_idRecord":3645,"str_idXDesign":"myId_87716375","str_idProject":"myId_11188187","str_tag":"loginpanel","str_classExtend":"panel","bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":"3642","str_type":"loginpanelform"}},{"obj_design":{"int_idRecord":"3643","str_type":"designfile"}},{"obj_design":{"int_idRecord":"3644","str_type":"loginbutton"}}],"bln_registerAtProject":true,"str_variableName":"loginpanel","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":true,"str_urlServer":"server.php","bln_useExternalButton":true,"bln_classController":true,"str_categoryList":"MyToolbox","bln_palettePin":true},"obj_domStyle":{"overflow":"auto","zindex":"10","left":"0px","top":"0px","height":"100%","width":"100%","padding":"10px","flex-direction":"column","align-items":"center","background-color":"rgb(43, 44, 52)","font-family":"helvetica","visibility":"visible","display":"flex"},"int_count":0}],
[4277, {"obj_design":{"int_idRecord":"4277","str_idXDesign":"myId_77224326","str_name":"DesktopNavigationButton","str_variableName":"desktopnavigationbutton","str_type":"desktopnavigationbutton","str_tag":"desktopnavigationbutton","bln_registerAtProject":true,"str_classExtend":"svgblock","str_createdDate":"2022-0-24 8:28:4","str_modifiedDate":"2022-0-24 8:28:4","str_urlServer":"server.php","bln_createRelease":"false","bln_isLocalHome":true,"pointerEventSVG":"none","typeSVG":"image\/svg+xml","dataSVG":"\/app\/shared\/asset\/exit-button.svg","str_urlNavigate":"https:\/\/www.mycode.buzz","str_idProject":"myId_15692536"},"obj_domStyle":{"padding":"0px","align-self":"center","display":"block","data":"this.obj_design.dataSVG=obj_path.fn_getURLAssetFile(this.obj_design.str_type, \"default.svg\")","filter":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","width":"25px","height":"25px","margin-right":"30px","margin-left":"auto"}}],
[4517, {"obj_design":{"int_idRecord":"4517","str_idXDesign":"myId_65115254","str_name":"button","str_variableName":"button","str_type":"button","str_tag":"button","str_content":"My component","str_createdDate":"2022-02-02 19:54:40","str_modifiedDate":"2022-02-02 19:54:40","bln_typeable":true,"str_text":"My component","bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_15692536"},"obj_domProperty":{"innerText":"My component"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4518, {"obj_design":{"int_idRecord":"4518","str_name":"panel","str_variableName":"panel","str_type":"panel","str_tag":"panel","str_createdDate":"2022-02-02 20:10:52","str_modifiedDate":"2022-02-02 20:10:52","bln_createRelease":"false","bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":"4517","str_type":"button"}},{"obj_design":{"int_idRecord":"4682","str_type":"button"}}],"str_idProject":"myId_15692536","str_idXDesign":"myId_66165466"},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","width":"100%","padding":"10px","overflow":"auto"}}],
[4682, {"obj_design":{"int_idRecord":"4682","str_name":"button","str_variableName":"button","str_type":"button","str_tag":"button","str_content":"My component","str_createdDate":"2022-02-02 19:54:40","str_modifiedDate":"2022-02-02 19:54:40","bln_typeable":true,"str_text":"My component","bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_15692536","str_idXDesign":"myId_11644169"},"obj_domProperty":{"innerText":"My component"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}]
]);
/*END INSTANCE JSON MAP//*/


