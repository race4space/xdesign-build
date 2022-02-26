

/*START COMPONENT//*/
/*id: 349394//*/
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


/*id: 349394//*/
/*type: RunTimeCode//*/
/*END COMPONENT//*/





/*START COMPONENT//*/
/*id: 349395//*/
/*type: DesigntimeCode//*/

//START DesignDelegate.js
class DesignDelegate{
    constructor(obj_delegator) {                          
        this.fn_initialize(obj_delegator);                        
        if(window.parent){
            obj_projectParent=window.parent.obj_project;//set reference to parent publish object from this iframe            
        }
    }    
    fn_initialize(obj_delegator){
        this.obj_delegator=obj_delegator;
        let obj_design=this.obj_delegator.obj_design;

        if(obj_design.bln_protectedPin===undefined){obj_design.bln_protectedPin=false;}                                        
        if(obj_design.bln_palettePin===undefined){obj_design.bln_palettePin=false;}                                
        if(obj_design.bln_maintainId===undefined){obj_design.bln_maintainId=false;}
        if(obj_design.bln_registerAtProject===undefined){obj_design.bln_registerAtProject=false;}
        if(obj_design.bln_registerAtContainer===undefined){obj_design.bln_registerAtContainer=false;}        
        if(obj_design.str_urlServer===undefined){obj_design.str_urlServer="notset";}                
        if(obj_design.bln_themeType===undefined){obj_design.bln_themeType=false;}
        if(obj_design.str_themeType===undefined){obj_design.str_themeType="notset";}        
        if(obj_design.bln_typeable===undefined){            
            let str_listIn="div,p,span,td,th";
            let bln_typeable=false;
            if(obj_shared.fn_inStr(","+obj_design.str_tag+",", ","+str_listIn+",")){bln_typeable=true;}
            if(obj_design.bln_typeable===undefined){obj_design.bln_typeable=bln_typeable;}                                 
        }
        if(obj_design.str_categoryList===undefined){obj_design.str_categoryList="notset";}                        
        if(!obj_design.str_nameRelease){obj_design.str_nameRelease="notset";}//reset any previou true settings                
        
        if(obj_design.str_text==undefined){obj_design.str_text="notset";}//Menu Button Only                      
        //if(obj_design.str_nameEventClick==undefined){obj_design.str_nameEventClick="notset";}
        //if(obj_design.str_valueEventClick==undefined){obj_design.str_valueEventClick="notset";}
        if(obj_design.str_nameTheme==undefined){obj_design.str_nameTheme="notset";}       
        if(obj_design.str_lastVersionDate==undefined){obj_design.str_lastVersionDate="notset";}       
        
        
        //this.fn_setClipBoardContent(false);

        //obj_delegator will be the button etc , ie the control which has been added        
    }      
    fn_addPaletteItem(obj_ini){//required  as is overidden by eazygrid etc                        
        let obj_delegator=this.obj_delegator;

        let obj_item;                         
        
        obj_delegator.bln_removeId=true;  
        obj_ini.bln_removeId=true;          
        obj_item=obj_delegator.fn_addItem(obj_ini);//ServerSideItem                                                
        
        if(!obj_item){            
            console.log("obj_item is false, check dynamic content")
            return;
        }        

        //MAY NOT HAVE COMPLETE OBJECT INITIALIZATION , IF SERVER GRAB
        //DO NOT CALL SET PALETTE SELECTED HERE
        return obj_item;
    }
    
    fn_setup(){//is overriden by project instance 
        //lastStep                        
        //AFTER OBJECT INITIALIZATION
        this.fn_listenEventDesign();                          
        //PaletteSelected is first set in Palette fn_listPinnedComponent       
        
        this.fn_removeId();
    }    
    
    fn_onLoadItem(obj_item){                        
    }
    fn_removeId(){      

        let obj_delegator=this.obj_delegator;
        this.fn_removeIdFromItem(obj_delegator);
    }
    fn_removeIdFromItem(obj_item){      

        //calld from a number of funcitons including setup        

        let bln_locked=obj_item.obj_design.bln_lockComponent;              
        bln_locked=obj_shared.fn_parseBool(bln_locked);
        if(bln_locked){        
          //console.log("bln_locked");
          return;
        } 

        let bln_removeId=obj_item.bln_removeId;
        bln_removeId=obj_shared.fn_parseBool(bln_removeId);                               

        if(!bln_removeId){
            //console.log("bln_removeId is false");
            //obj_item.fn_debug("bln_removeId is false");
            return;
        }
        else{
            //console.log("bln_removeId is true");
        }

        obj_item.bln_removeId=false;  

        let bln_maintainId=obj_item.obj_design.bln_maintainId ;                                
        bln_maintainId=obj_shared.fn_parseBool(bln_maintainId);                               
        if(bln_maintainId){
            return;
        }        

        
        
    
        obj_item.obj_design.int_idRecord=0; 
        obj_item.obj_design.bln_palettePin=false;                
        obj_item.obj_design.str_categoryList=false;              
        obj_item.obj_design.int_modeExecute=obj_holder.int_modeEdit;                            
        obj_item.obj_design.bln_classController=false;                            
        
        obj_item.obj_design.str_idXDesign="";
        let str_method="fn_setIDXDesign";
        if(obj_item && obj_item[str_method]){
            obj_item[str_method]();
        }
        
        let arr=obj_item.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];          
            obj_item.bln_removeId=true;                            
            this.fn_removeIdFromItem(obj_item);            
        }
    }
    
    fn_debugMap(){
        obj_shared.fn_debugMap(obj_InstanceJSONMap);
    }
    fn_updateMap(ObjectData){

        //console.log("fn_updateMap");

        
        let obj_delegator=this.obj_delegator;        
        let int_idRecord=parseInt(obj_delegator.obj_design.int_idRecord);                
        let obj_test;

        obj_test=obj_shared.fn_getMapItem(obj_InstanceJSONMap, int_idRecord);        
        //console.log("1 obj_test: " + obj_test);
        //console.log(obj_test);

        obj_shared.fn_setMapItem(obj_InstanceJSONMap, int_idRecord, ObjectData);                        
        
        obj_test=obj_shared.fn_getMapItem(obj_InstanceJSONMap, int_idRecord);        
        //console.log("2 obj_test: " + obj_test);
        //console.log(obj_test);
        
        //obj_shared.fn_debugMap(obj_InstanceJSONMap);

    }
    fn_listenEventDesign(){

        let obj_delegator=this.obj_delegator;
        //obj_delegator will be the button etc , ie the control which has been added
        
        //this refers to obj_delegator.obj_designDelegate
        let that=this;        

        obj_delegator.dom_obj.addEventListener('mouseenter', function(e){                        
            that.fn_designEventMouseenter();
        });
        obj_delegator.dom_obj.addEventListener('mouseleave', function(e){                        
            that.fn_designEventMouseleave();
        });                
        obj_delegator.dom_obj.addEventListener('click', function(e){                        
            that.fn_designEventClickCapture();
        }, true);
        obj_delegator.dom_obj.addEventListener('click', function(e){                        
            that.fn_designEventClickBubble();
        }, false);
        
        let obj_item;
        let arr=obj_delegator.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            obj_item=obj_delegator.obj_design.arr_item[i];  
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_listenEventDesign();
            }
        }        
    }

    

    
    fn_onPaletteItemClickCapture(){//event capture, overidden for base element             
    }
        
    fn_onPaletteItemClickBubble(){//event capture        
        
        
        if(obj_projectParent.obj_palettSelected){            
            return;            
        }           
        
        // set item that was clicked to selected
        this.fn_setPaletteSelected();
        
        
    }
    fn_setPaletteSelectedLocalHome(){
        
        let obj_localHome;

        obj_localHome=this.obj_delegator.fn_getLocalHome();        

        let obj_delegator=this.obj_delegator;
        
        let obj_item=obj_projectParent.obj_palettSelectedLast;//we need to do this as the item clicked will run the event each time
        if(obj_item){                        
            if(obj_item.fn_isLocalHome()){
                obj_delegator=obj_item;
            }
        }
        
        obj_localHome=obj_delegator.fn_getNextLocalHome();        
        
        obj_localHome.obj_designDelegate.fn_setPaletteSelected();
    }
    
    
    fn_setChildrenModeExecute(int_modeExecute){          

        let obj_item, arr;
        arr=this.obj_delegator.obj_design.arr_item;        
        for(var i=0;i<arr.length;i++){
            obj_item=arr[i];           
            if(obj_item.fn_isLocalHome()){//dont affect other projects
                continue;
            }
            obj_item.obj_design.int_modeExecute=int_modeExecute;            
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_setChildrenModeExecute(int_modeExecute);
            }
        }
    }    
    fn_setParentModeExecute(int_modeExecute){                  
        
        let obj_delegator=this.obj_delegator;                  
        let obj_container=obj_delegator.fn_getParentComponent();
        if(!obj_container){return;}
        obj_container.obj_design.int_modeExecute=int_modeExecute;            
        if(obj_container.obj_designDelegate){
            obj_container.obj_designDelegate.fn_setParentModeExecute(int_modeExecute);
        }
        
    }    
    
    fn_setPaletteSelected(bln_maintainMap){                         

        //console.log("DESIGN DELEGATE fn_setPaletteSelected");
        
        
        let obj_delegator=this.obj_delegator;                  

        //this refers to obj_delegator.obj_designDelegate
        obj_delegator.fn_setLevelLimit();                              
        
        if(!obj_projectParent){alert("obj_projectParent is false");return;}

        obj_delegator.obj_holder.bln_maintainMap=bln_maintainMap;        
        
        if(obj_project.obj_designDelegate){            
            obj_project.obj_designDelegate.fn_deSelectPaletteItems();
        }                               
        
        obj_projectParent.obj_palettSelected=obj_delegator;         
        obj_projectParent.obj_palettSelectedLast=obj_projectParent.obj_palettSelected;                                 
        
        if(obj_delegator.obj_holder.obj_container){                        
            obj_delegator.obj_holder.obj_container.obj_holder.obj_lastItem=obj_delegator;            
        }    
        
        if(obj_delegator.obj_design.bln_dynamicPin){
            //obj_delegator.obj_design.int_modeExecute=obj_holder.int_modeReadOnly;
        }  

        obj_delegator.obj_design.int_modeExecute=obj_holder.int_modeEdit;                      
        this.fn_setChildrenModeExecute(obj_holder.int_modeEdit);//new change to also set children to editable
        this.fn_setParentModeExecute(obj_holder.int_modeEdit);//new change to also set aéé parent to editable

        obj_projectParent.fn_onPaletteItemSelected();//update environment, property sheets etc                
    } 
    
    fn_deSelectPaletteItems(){        
        
        let obj_delegator=this.obj_delegator;

        if(!obj_projectParent.obj_palettSelected){                        
            return;//added 2021-09--12
        }
        //this refers to obj_delegator.obj_designDelegate
        this.fn_setPaletteDeSelected();        
        let arr=obj_delegator.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=obj_delegator.obj_design.arr_item[i];            
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_deSelectPaletteItems();
            }
        }
    } 
    
    fn_destructDesignComponent(){//cannot go to base object , as used by design process
        let obj_delegator=this.obj_delegator;
        obj_delegator.fn_removeAllContent();        
    }       
    fn_setPaletteDeSelected(){          

        //console.log("fn_setPaletteDeSelected");

        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteDeSelected");return;}
        
        obj_projectParent.fn_onPaletteItemDeSelected();//update environment        
        obj_projectParent.obj_palettSelected=false;
        
        //console.log("fn_setPaletteDeSelected: " + this.obj_design.str_type);             
        
    }        
    fn_designEventScroll(){        
    }    
    fn_designEventMouseenter(){
    }
    fn_designEventMouseleave(){            
    }
    
    fn_designEventClickCapture(){        
        //this refers to obj_delegator.obj_designDelegate        
        this.fn_onPaletteItemClickCapture();
    }
    fn_designEventClickBubble(){        
        //this refers to obj_delegator.obj_designDelegate
        this.fn_onPaletteItemClickBubble();
    }    
    fn_preparePublish(){

        let obj_delegator=this.obj_delegator;
        
        let arr, obj_item;

        if(!obj_delegator.fn_isElement()){
            return;
        }
        
        //let str_designMarker=obj_projectParent.obj_holder.str_prefix;
        //obj_delegator.dom_obj.removeAttribute(str_designMarker + "id");
        //obj_delegator.dom_obj.removeAttribute("idXDesign");
        
        arr=obj_delegator.obj_design.arr_item;
        
        for(let i=0;i<arr.length;i++){
            obj_item=obj_delegator.obj_design.arr_item[i];                                      
            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_preparePublish();            
            }
        }
    }

    fn_viewHTML(){

        let obj_delegator=this.obj_delegator;

        //this refers to obj_delegator.obj_designDelegate
        this.fn_preparePublish();        
        obj_delegator.obj_holder.str_html=obj_delegator.dom_obj.outerHTML;
        alert(obj_delegator.obj_holder.str_html);

    } 

    

    
    fn_parseHTMLContent(str_content=""){                

        //this refers to the "real" target object
        let obj_delegator=this.obj_delegator;

        if(!obj_delegator.fn_isElement()){            
            obj_delegator.dom_obj.data=str_content;
            return;
        }

        obj_delegator.fn_removeAllContent();
        let dom_obj=document.createElement("div");
        
        dom_obj.innerHTML=str_content;   
        
        //console.log("str_content:" + str_content);
        
        var oCol = dom_obj.childNodes;
        for (var i = 0; i < oCol.length; i++) {

            let dom_child, attrib, str_name, str_value, str_type, str_tag, str_text, str_length;
            let obj_ini, obj_item;
            
            dom_child = oCol[i];    
            
            obj_ini=new Holder;                       

            str_text="";            

            switch(dom_child.nodeType){
                case 1://element node                    
                    str_type=dom_child.tagName.toLowerCase();                    
                    str_tag=str_type;                                                    
                    console.log("ELEMENTNODE");                    
                    
                break;
                case 3://3 for text node,                    
                    str_type="textnode";
                    str_tag="text";         
                    str_text=dom_child.data;                       
                    str_length=str_text.length;
                    console.log("textnode"); 
                    /*
            console.log("str_type:" + str_type);
            console.log("str_tag:" + str_tag);
            console.log("str_text:[" + str_text + "]");
            console.log("str_length:[" + str_length + "]");
            //obj_shared.fn_enumerateObject(obj_ini);            
            //*/                               
            
                if (str_text.match(/^\s*$/)){
                console.log("Blank Text Node");
                //continue;
                }
                break;                
                case 8://8 for comment node,
                    str_type="comment";
                    str_tag="<!--"
                    str_text=dom_child.data;                                        
                    console.log("comment node");                                                         
                break;                
                default:
                    //console.log("node Type: " + dom_child.nodeType);
                    str_type="tag";
                    str_tag="tag";
                    console.log("tag node");
                    //continue;
            }            

            obj_ini.obj_design.str_type=str_type;
            obj_ini.obj_design.str_tag=str_tag;
            obj_ini.obj_design.str_content=str_text;
            
            //obj_ini.obj_design.str_text="aaa";                
            obj_delegator.obj_designDelegate.fn_parseHTMLContentCreateStyle(dom_child, obj_ini.obj_domStyle);
                
            //*
            if(dom_child.attributes){
            for (var j = 0; j < dom_child.attributes.length; j++) {
                attrib = dom_child.attributes[j];                 
                str_name=attrib.name;                                
                if(str_name){
                    str_value=attrib.value;                
                    if(str_name=="style"){}
                    else{
                        
                        obj_ini.obj_domProperty[str_name]=str_value;            
                        //obj_ini.obj_domAttribute[str_name]=str_value;            
                        //console.log("attrib: " + str_name + ":" + str_value);
                    }
                }
            }
            }   
            //*/            

            /*
            console.log("str_type:" + str_type);
            console.log("str_tag:" + str_tag);
            console.log("str_text:" + str_text);
            //obj_shared.fn_enumerateObject(obj_ini);            
            //*/
            
            
            obj_item=obj_delegator.fn_addItem(obj_ini);//ServerSideItem  

            if(obj_item.obj_designDelegate){
                obj_item.obj_designDelegate.fn_listenEventDesign(); 
            }
            
            if(obj_item.fn_isElement()){
                obj_item.obj_designDelegate.fn_parseHTMLContent(dom_child.innerHTML);
            }
        }
        dom_obj.remove();
        
    }             
    
    fn_parseHTMLContentCreateStyle(dom_obj, obj_domStyle){

        let obj_delegator=this.obj_delegator;

        if(!dom_obj){return;}
        if(!dom_obj.getAttribute){return;}

        let style=dom_obj.style;
        let str_style, str_name, str_value;
        let i, arr_parts, arr_subParts, str_part;        
        str_style=dom_obj.getAttribute("style");        
        
        if(!str_style){
            str_style="";            
        }
        //console.log("str_style: " + str_style);        
        if(!str_style.length){return;}
        arr_parts = str_style.split(";")        
        for (i=0;i<arr_parts.length;i++) {
            str_part=arr_parts[i];            
            if(str_part.length){
                arr_subParts = str_part.split(':');                            
                str_name=arr_subParts[0].trim();
                str_value=arr_subParts[1].trim();
                //console.log("style: " + str_name + ":" + str_value);
                obj_domStyle[str_name]=str_value;
                //console.log("style set: " + str_name + ":" + obj_domStyle[str_name]);
            }
        }
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

    fn_setList(str_value, bln_disallowSpace=true){                
        
        str_value=this.fn_defaultNotSet(str_value);                                
        if(bln_disallowSpace){            
            str_value=str_value.toLowerCase();        
            str_value=obj_shared.fn_replace(str_value, " ", ",");                               
        }        
        str_value=obj_shared.fn_formatString(str_value, obj_const.int_alphaNumericComma);
        str_value=obj_shared.fn_formatUniqueList(str_value);                        
        
        return str_value;        
    }    
    
    fn_setClassList(str_value){                
        this.obj_delegator.obj_design.str_classList=this.fn_setList(str_value);
    }        
    fn_setCategoryList(str_value){                
        this.obj_delegator.obj_design.str_categoryList=this.fn_setList(str_value, false);
    }
    fn_setClassExtend(str_value){
        str_value=this.fn_defaultNotSet(str_value);                
        str_value=obj_shared.fn_formatShortName(str_value);                    
        this.obj_delegator.obj_design.str_classExtend=str_value;
    }    
    fn_setCreatedDate(str_value){
        str_value=this.fn_defaultNotSetDate(str_value);                
        str_value=obj_shared.fn_formatShortDate(str_value);                    
        this.obj_delegator.obj_design.str_createdDate=str_value;
    }
    fn_setModifiedDate(str_value){
        str_value=this.fn_defaultNotSetDate(str_value);                
        str_value=obj_shared.fn_formatShortDate(str_value);                    
        this.obj_delegator.obj_design.str_modifiedDate=str_value;
    }    
    
    fn_setDesignProperty(str_name, foo_value){  

        switch(str_name){                                                    
            case "str_classExtend":            
                this.fn_setClassExtend(foo_value);                                                
                return; 
            case "str_classList":            
                this.fn_setClassList(foo_value);                                                                
                return;                
            case "str_categoryList":            
                this.fn_setCategoryList(foo_value);                                                                
                return;                            
            case "str_createdDate":            
                this.fn_setCreatedDate(foo_value);                                                
                return; 
            case "str_modifiedDate":            
                this.fn_setModifiedDate(foo_value);                                                
                return; 
            case "str_name":                
                this.obj_delegator.fn_setName(foo_value);                                
                return;
            case "str_nameRegistrator":                
                foo_value=this.fn_defaultNotSet(foo_value);                        
                break;            
            case "str_tag":
                this.obj_delegator.fn_setTag(foo_value, true);                                                
                return;  
            case "str_text":                
                this.obj_delegator.fn_setText(foo_value);
                return;
            case "str_type":                                 
                this.obj_delegator.fn_setType(foo_value);                                                
                return;              
        }

        let bln_valid=true;
        switch(str_name){                
            default:
                foo_value=obj_shared.fn_parseBool(foo_value);                               
        }

        if(bln_valid){           
            
            this.obj_delegator.fn_setDesignProperty(str_name, foo_value);
            //this.obj_delegator.obj_design[str_name]=foo_value;              
        }
        
        
    }

      
    //END DESIGN FUNCTIONS AND EVENTS
    
    
}//END CLS
//END DesignDelegate.js


//START DesignDelegateeazygrid.js
class DesignDelegateeazygrid extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){      
        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}
        let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);              
        obj_projectParent.obj_lastGrid=obj_delegator;      
    }    
    fn_cutPaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_cutPaletteItem")
        super.fn_cutPaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();        
      }
      fn_deletePaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_deletePaletteItem")
        super.fn_deletePaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();        
      }

    
}//END CLS
//END DesignDelegateeazygrid.js


//START DesignDelegateeazygriditem.js
class DesignDelegateeazygriditem extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){ 
      if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}     
      let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);      
        obj_projectParent.obj_lastGrid=obj_delegator.obj_holder.obj_container;//not part of eazyGrid      
      }        
    fn_addPaletteItem(obj_ini){//required                  
        let obj_delegator=this.obj_delegator;        
        if(obj_delegator.obj_holder.obj_container.obj_design.bln_eazyGrid){          
            switch(obj_ini.obj_design.str_type.toLowerCase()){
              case "eazygrid":                                            
              break;      
            }
          }          
          
        return super.fn_addPaletteItem(obj_ini);        
    }    
    fn_setDesignProperty(str_name, foo_value){
      super.fn_setDesignProperty(str_name, foo_value);      
      if(this.obj_delegator.obj_holder.obj_container){
        this.obj_delegator.obj_holder.obj_container.fn_applyFeatures();
      }
      
    }                            
    
}//END CLS
//END DesignDelegateeazygriditem.js


//START DesignDelegategrid.js
class DesignDelegategrid extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor        
        
    }        
    fn_setPaletteSelected(bln_maintainMap){      
        if(!obj_projectParent){alert("obj_projectParent is false: fn_setPaletteSelected");return;}
        let obj_delegator=this.obj_delegator;
        super.fn_setPaletteSelected(bln_maintainMap);              
        obj_projectParent.obj_lastGrid=obj_delegator;      
    }    
    fn_cutPaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_cutPaletteItem")
        super.fn_cutPaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();        
      }
      fn_deletePaletteItem(obj_item){
        let obj_delegator=this.obj_delegator;
        console.log("fn_deletePaletteItem")
        super.fn_deletePaletteItem(obj_item);   
        obj_delegator.fn_applyFeatures();      
        obj_projectParent.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();        
      }
    
}//END CLS
//END DesignDelegategrid.js


//START DesignDelegateProjectInstance.js
class DesignDelegateProjectInstance extends DesignDelegate{
    constructor(obj_delegator) {                  
        super(obj_delegator); // call the super class constructor          
        
        
    }            
    fn_initialize(obj_delegator){
        super.fn_initialize(obj_delegator);        
        
        if(this.obj_delegator.obj_design.bln_lockComponent==undefined){this.obj_delegator.obj_design.bln_lockComponent=false;}        
        if(this.obj_delegator.obj_design.bln_isLocalHome==undefined){this.obj_delegator.obj_design.bln_isLocalHome=true;}                                
    }      
    fn_onPaletteItemClickCapture(){//event capture        
        //obj_projectParent.obj_palettSelectedLast=obj_projectParent.obj_palettSelected;        
        //console.log("capture obj_projectParent.obj_palettSelectedLast: " + obj_projectParent.obj_palettSelectedLast);

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();//deselect all children starting from base
    }
    fn_destructDesignComponent(){

        //this refers to obj_delegator.obj_designDelegate
        this.fn_deSelectPaletteItems();
        alert("should not be occurring ");        
        //should be handled by iframe reload
    } 
    fn_setup(){
        super.fn_setup();                
        if(window.parent){            
            window.parent.obj_project.fn_projectTarget_onLoad();//notify parent design component 
        }
    } 


    
    
}//END CLS
//END DesignDelegateProjectInstance.js


//START GlobalVariable.js
//write component specific globals here
var obj_projectTarget;
var obj_projectParent;
//write component specific globals here
//END GlobalVariable.js


/*id: 349395//*/
/*type: DesigntimeCode//*/
/*END COMPONENT//*/






//START XTRA CLASSES

/*START COMPONENT//*/
/*id: 349595//*/
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

/*id: 349595//*/
/*type: button//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349629//*/
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

/*id: 349629//*/
/*type: tablecell//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349630//*/
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
/*id: 349630//*/
/*type: tableheader//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349631//*/
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


/*id: 349631//*/
/*type: tablerow//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349632//*/
/*type: tag//*/

/*id: 349632//*/
/*type: tag//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349612//*/
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

/*id: 349612//*/
/*type: input//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349628//*/
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

/*id: 349628//*/
/*type: table//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349678//*/
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
              
              
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_input=obj_container.fn_addItem(obj_ini);//BootItem                              
              //END TEXT INPUT TO VALUE CELL        
            }  
        
      
        }//END CLS
        //END TAG
        //END component/xdesign1_propertysheet
/*id: 349678//*/
/*type: xdesign1_propertysheet//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349673//*/
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
                    obj_project.fn_onStateChange();
                    //obj_project.obj_palettSelected.obj_designDelegate.fn_setPaletteSelected();       
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
                        let str_nameShort=obj_shared.fn_formatShortName(str_value);     
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
              
              
              if(obj_selected.obj_design.int_modeExecute!==obj_holder.int_modeEdit){                
                return obj_ini;
              }      

              let str_listIn="bln_isContainer,bln_maintainId,bln_registerAtContainer,bln_showToolbar,bln_themeType,bln_typeable,str_nameRegistrator,bln_registerAtProject,bln_palettePin,dataSVG,filterSVG,gridTemplate,str_categoryList,str_createdDate,str_idProject,str_modifiedDate,str_name,str_nameTheme,str_subType,str_tag,str_text,str_themeType,str_urlServer,str_urlServer, str_value,";              
              let str_listInProjectOnly="bln_classController,bln_lockComponent,str_classList,str_classExtend,str_nameRelease,str_type,str_urlServer";
              str_listIn+=str_listInProjectOnly;

              //obj_design.bln_useOwnButton

              let bln_display;

              bln_disabled=true;

              let str_method="fn_validateDesignInput";
              if(obj_selected && obj_selected[str_method]){
                bln_disabled=obj_selected[str_method](obj_ini);
              }                        


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
                break;
                
                case "bln_classController":                                                                           
                  if(!obj_selected.fn_proposeClassController()){
                      bln_disabled=true;
                  }
                  break;
                case "str_classList":                                                         
                case "str_classExtend":                                    
                  if(!obj_selected.fn_getClassController()){
                    bln_disabled=true;
                  }            
                break;
              }

              obj_ini.obj_domProperty.disabled=bln_disabled;                    
              //obj_ini.obj_domProperty.readonly=bln_disabled;                    

              
              
              
              return obj_ini;
            }
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydesign
/*id: 349673//*/
/*type: xdesign1_propertydesign//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349621//*/
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

/*id: 349621//*/
/*type: navelement//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349625//*/
/*type: recordset//*/

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
/*id: 349625//*/
/*type: recordset//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349662//*/
/*type: xdesign1_managermenu//*/
      //XSTART component/xdesign1_managermenu
      class xdesign1_managermenu extends recordset{
        constructor(obj_ini) {      
          super(obj_ini);        
        } 
        fn_initialize(obj_ini){
          super.fn_initialize(obj_ini);                
          
          
          this.fn_setType("xdesign1_managermenu");      
          this.fn_setTag("xdesign1_managermenu");            
          this.obj_design.bln_isGenericTag=true;
          this.fn_extends("recordset");            
          
        }
        
        
        fn_bootChildren(){//in boot phase , and often overidden                  

          let obj_ini=new Holder;                                    
          obj_ini.obj_design.str_type="dynamiccontent";    
          obj_ini.obj_design.str_name="dynamiccontent";    
          this.obj_holder.obj_dynamiccontent=this.fn_addItem(obj_ini);                    
          //console.log("fn_bootChildren: " + this.obj_holder.obj_dynamiccontent);

        }    
        fn_onStateChange(){                       
          this.obj_holder.bln_hasContent=false;          
          
          this.obj_holder.obj_container.fn_setDisplay(false);
          this.fn_close();          
          if(!obj_projectTarget){return false;}                 
          this.obj_holder.obj_container.fn_setDisplay();
          this.obj_holder.obj_container.fn_setEnabled();
          return true;
        }
        
        fn_close(bln_disable=true){
          this.obj_holder.obj_container.fn_close();                                  
          this.obj_holder.obj_container.fn_setDisabled(bln_disable);                                            

        }
        fn_open(bln_enable=true){          
          this.obj_holder.obj_container.fn_open();
          this.obj_holder.obj_container.fn_setEnabled(bln_enable);                                                      
        }
        
        fn_openContent(){
          //console.log("fn_openContent");            
          if(this.obj_holder.bln_hasContent){
            return;            
          }
          
          this.obj_holder.bln_hasContent=true;

          
          let obj_dynamiccontent=this.fn_getComponent("dynamiccontent");                                  
          if(!obj_dynamiccontent){
            //console.log("obj_dynamiccontent is false");            
            this.fn_bootChildren();            
            obj_dynamiccontent=this.obj_holder.obj_dynamiccontent;
          }    
          //console.log("x obj_dynamiccontent: " + obj_dynamiccontent);            
          if(!obj_dynamiccontent){
            return;
          }    
          obj_dynamiccontent.fn_prepare(); 

          let obj_ini=new Holder;                                    
          obj_ini.obj_design.str_type="accordion";    
          this.obj_holder.obj_accordion=obj_dynamiccontent.fn_addItem(obj_ini);                    

          this.fn_getContent();

        }
        fn_getContent(){           
          //console.log("manage rmenu default fn_getContent");

        }
        fn_closeContent(){
          //console.log("fn_closeContent");
        }          

        fn_getMenuItems(obj_post){

          let obj_row, arr_row;                       
          let str_CategoryName, str_CategoryCurrent;

          str_CategoryCurrent="";
          arr_row=obj_post.RowData;                                              
          
          for(var i=0;i<arr_row.length;i++){
            
            obj_row=arr_row[i];      
      
            if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object      
            
            if(obj_post.bln_ListAll){        
              str_CategoryName="All";
            }
            else{
              str_CategoryName=obj_row.CategoryName;
              if(str_CategoryName===null){
                continue;
              }                
            }
      
            if(str_CategoryName.toLowerCase()!==str_CategoryCurrent.toLowerCase()){
              str_CategoryCurrent=str_CategoryName;
              this.fn_addMenuItem(str_CategoryName);
            }             
          }
          this.fn_addMenuItem("All");
        }  
        fn_addMenuItem(str_CategoryName){
        }

        fn_getRecordSetItems(obj_post){                                                            

          let obj_ini, obj_item, obj_container, obj_row, arr_row;                     
          
          arr_row=obj_post.RowData;
          obj_container=this.obj_holder.obj_accordion;                                
          
          for(var i=0;i<arr_row.length;i++){
            
            obj_row=arr_row[i];      
      
            if(obj_shared.fn_isObjectEmpty(obj_row)){continue;}//RowData Can contain a single empty object                             
            
            
            let str_color="orange";              
            let str_LastVersionDate=obj_row.LastVersionDate;
            let bln_valid=obj_shared.fn_validDate(str_LastVersionDate);
            if(bln_valid ||obj_row.InstanceType==="category"){
              str_color="white";
            }
            
            obj_ini=new Holder;            
            obj_ini.obj_design.bln_dynamicPin=true;                                        
            obj_ini.obj_design.str_text=obj_row.InstanceName;
            obj_ini.obj_design.str_type="button";
            obj_ini.obj_design.int_idRecordTarget=obj_row.InstanceId;
            obj_ini.obj_design.str_typeRecord=obj_row.InstanceType;
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";            
            this.fn_formatRecordSetItem(obj_ini, obj_row);
            obj_item=obj_container.fn_addItem(obj_ini);
            obj_item.fn_setColor(str_color);
          }
        }

        fn_formatRecordSetItem(obj_ini){           
        }

        
      }//END CLS
      //END TAG
      //END component/xdesign1_managermenu



/*id: 349662//*/
/*type: xdesign1_managermenu//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349608//*/
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

/*id: 349608//*/
/*type: flex//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349618//*/
/*type: menubutton//*/
class menubutton extends component {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor        
    }        
    fn_initialize(obj_ini){                
        
        super.fn_initialize(obj_ini);
        
        this.fn_setType("menubutton");      
        this.fn_setTag("button", true);              
        this.obj_design.bln_isMenuButton=true;

        this.fn_setIsContainer(true);

        //START INITIALIZE DESIGN        
        if(this.obj_design.bln_isOpen==undefined){this.obj_design.bln_isOpen=false;}//ensure visible placeholder at front of object defintion
        

        this.obj_design.bln_listenClick=true;
        this.obj_design.str_nameEventClick=this.obj_holder.str_prefix + "MenuButtonClick";  
        this.obj_design.str_valueEventClick="fn_MenuButtonClick";                  

        if(this.obj_design.str_text===undefined){this.obj_design.str_text=this.obj_design.str_name;}            
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM
        //END INITIALIZE DOM
        
        //START INITIALIZE STYLE                        
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="block";}
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="45px";}    
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="3px 12px";}
        if(this.obj_domStyle.border===undefined){this.obj_domStyle.border="0px solid black";}                          
        if(this.obj_domStyle.fontSize===undefined){this.obj_domStyle.fontSize="12pt";}        
        if(this.obj_domStyle.cursor===undefined){this.obj_domStyle.cursor="pointer";}
        if(this.obj_domStyle.marginRight===undefined){this.obj_domStyle.marginRight="0px";}      
        if(this.obj_domStyle.marginBottom===undefined){this.obj_domStyle.marginBottom="1px";}              
        //END INITIALIZE STYLE
    }            
    fn_onLoad(){
        super.fn_onLoad();        
        if(this.obj_design.bln_isOpen){
            this.fn_openContent();        
        }        
        //this.fn_setColorGradient();
    }        
    
    fn_createSelf(){

        super.fn_createSelf();
        
        let dom_obj;
        dom_obj=document.createElement("div");        
        this.dom_obj.parentNode.insertBefore(dom_obj, this.dom_obj.nextSibling);                
        dom_obj.style.display="none";
        this.dom_objContentContainer=dom_obj;            

        dom_obj=document.createElement("flex");
        //dom_obj.style.display="flex";        
        dom_obj.style.display="block";        
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
    
    /*
    fn_setColorGradient(){
        let obj_parent=this.fn_getParentComponent();                
        let obj_container=obj_parent.fn_getObjectMatching("fn_setColorGradient");                
        if(obj_container){            
            if(obj_container){
                console.log("MENU BUTTON HIERACHY");
    
                let str_rgb=obj_container.dom_obj.style.backgroundColor;                              
                let str_hex=obj_shared.fn_convertRGBToHex(str_rgb);                    
                let str_hex_new=obj_shared.fn_lightenGradient(str_hex, 25);                
                this.fn_setStyleProperty("backgroundColor", str_hex_new);                                    
            }
        }      
    }
    //*/
    
    fn_setHTMLContent(){
        super.fn_setHTMLContent();    
        this.fn_setText(this.obj_design.str_text);                
    } 
    
    fn_addItem(obj_ini){
        let obj_item;        
        if(obj_ini.obj_design.str_type===undefined){
            obj_ini.obj_design.str_type="button";                   
        }                
        obj_item=super.fn_addItem(obj_ini);//CallSuper
        
        return obj_item;
    }        

    
    fn_setDisplay(bln_display=true){          
        
        if(!bln_display){
            this.obj_design.bln_pin=undefined;
        }
        super.fn_setDisplay(bln_display);
    }
    fn_open(){        
        this.fn_openContent();
    }
    fn_close(){        
        if(!this.obj_design.bln_pin){
            this.fn_closeContent();
        }                
    }
    fn_openContent(){          

        if(this.obj_domProperty.disabled){            
            return;
        }
    
        let obj_container=this.fn_getParentComponent();        
        let str_method="fn_open";        
        if(obj_container && obj_container[str_method]){
            obj_container[str_method]();
        }      
        
        this.dom_objContentContainer.style.display="block";
        this.obj_design.bln_isOpen=true;        

        //console.log("menu tab fn_openContent");

        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];                                    
            let str_method="fn_openContent";        
            if(obj_item && obj_item[str_method]){
                //console.log("obj_item fn_openContent");
                obj_item[str_method]();
            }                  
        }
    }
    fn_closeContent(){                           
        
        this.dom_objContentContainer.style.display="none";
        this.obj_design.bln_isOpen=false;                
        
        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];                                    
            let str_method="fn_closeContent";        
            if(obj_item && obj_item[str_method]){
                obj_item[str_method]();
            }                  
        }
    }    
    fn_toggle(bln_isOpen=false){                
        if(bln_isOpen){            
            //this.obj_design.bln_pin=false;
            this.fn_closeContent();
        }
        else{            
            this.fn_openContent();
        }
    }        
    
    fn_onClick(){                  

        let bln_isOpen=this.obj_design.bln_isOpen;        
        let obj_container=this.fn_getParentComponent();        
        let str_method="fn_close";        
        if(obj_container && obj_container[str_method]){
            obj_container[str_method]();
        }      

        
        this.fn_toggle(bln_isOpen)        
    }
}//END CLS
//END MENUBUTTON

/*id: 349618//*/
/*type: menubutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349623//*/
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

/*id: 349623//*/
/*type: panel//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349609//*/
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

/*id: 349609//*/
/*type: form//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349627//*/
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
/*id: 349627//*/
/*type: svgblock//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349607//*/
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
/*id: 349607//*/
/*type: eazygriditem//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349589//*/
/*type: abcaccordion//*/

            //XSTART component/abcaccordion
              class abcaccordion extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("abcaccordion");      
                  this.fn_setTag("abcaccordion");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                }
              }//END CLS
              //END TAG
              //END component/abcaccordion
/*id: 349589//*/
/*type: abcaccordion//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349590//*/
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
/*id: 349590//*/
/*type: abcconsumer//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349591//*/
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
/*id: 349591//*/
/*type: abchasserver//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349593//*/
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
        
        //START INITIALIZE STYLE              
        if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}            
        if(this.obj_domStyle.padding===undefined){this.obj_domStyle.padding="10px";}            
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="block";}            
        /*
        if(this.obj_domStyle.display===undefined){this.obj_domStyle.display="flex";}                    
        this.fn_setStyleProperty("align-items", "flex-start");
        this.fn_setStyleProperty("flex-flow", "column wrap");
        //*/
        
        //END INITIALIZE STYLE                
    }
    
    fn_addItem(obj_ini=false){
        let obj_item;        
        if(!obj_ini){
          obj_ini=new Holder;
          obj_ini.obj_design.str_type="menubutton";                   
          obj_ini.obj_domStyle.flexDirection="row";           
            obj_ini.obj_domStyle.flexWrap="wrap";                  
        }      
        obj_item=super.fn_addItem(obj_ini);//CallSuper          
        return obj_item;
    }

    
    //START COMPONENT EVENT HANDLING        
    fn_open(){
        this.fn_openParent();
    }
    fn_close(){
        this.fn_closeLevel();
    }
    fn_openParent(){        
        let obj_container=this.fn_getParentComponent();        
        let str_method="fn_open";        
        if(obj_container && obj_container[str_method]){
            obj_container[str_method]();
        }              
    }
    fn_closeLevel(){
        
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            let obj_item=this.obj_design.arr_item[i];                                    
            let str_method="fn_close";        
            if(obj_item && obj_item[str_method]){
                if(!obj_item.obj_design.bln_isPinned){
                    obj_item[str_method]();
                }
            }              
        }
    }
    
    //START COMPONENT EVENT HANDLING 
    fn_onClick(){     
        //console.log("accordion click");        
    }

}//END CLS
//END ACCORDION
/*id: 349593//*/
/*type: accordion//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349594//*/
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
        
/*id: 349594//*/
/*type: block//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349597//*/
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

  fn_set(obj_copy, obj_template){//required   
    if(!obj_copy){
        this.fn_clear();
        return;            
    }     

    let str_categoryList=obj_copy.obj_design.str_categoryList;       
    obj_copy.bln_removeId=true;     
    obj_project.fn_removeId(obj_copy);        
    obj_copy.obj_design.str_categoryList=str_categoryList;      

    this.bln_hasContent=true;        
    this.obj_item=obj_copy;        
    this.obj_template=obj_template;  
  }
  fn_clear(){//required           
      this.bln_hasContent=false;        
      this.obj_item=false;        
      this.obj_template=false;            
  }
  fn_get(){//required        
      return this.obj_item;
  }    
  fn_validateCopy(obj_item){        

    let bln_debug=false;      

    if(!obj_item){        
        return false;
    }

    //Item must be in editmode
    if((obj_item.obj_design.int_modeExecute!==obj_holder.int_modeEdit)){        
        return false;
    }    
        
    if(obj_item===obj_projectTarget){                        
        if(bln_debug){console.log("VALIDATE COPY: CANNOT MANIPULATE PROJECT INSTANCE")};
        return false;
    }      

    if(bln_debug){console.log("VALIDATE COPY: VALIDATED")};   
    return true;
  }

  fn_copy(obj_item){//required  
    
    if(!this.fn_validateCopy(obj_item)){return;}            
    let obj_copy=this.fn_getCopy(obj_item);        
    this.fn_set(obj_copy, obj_item);         
  }
  fn_getCopy(obj_item){//required        
      let obj_copy;
      let str_json=JSON.stringify(obj_item, this.fn_cloneReplacer());        
      //console.log("str_json: " + str_json);
      obj_copy=JSON.parse(str_json);
      obj_copy.obj_holder=new Holder;                              
      return obj_copy;
  }  

  fn_validatePaste(obj_selected){        

    let bln_debug=false;

    
      let obj_item=this.fn_get();                
      if(!obj_item){     
          if(bln_debug){console.log("VALIDATE PASTE: CLIPBOARD IS BLANK")};   
          return false;
      }        
              
      if(bln_debug){console.log("VALIDATE PASTE: GET CONTAINER")};   
    
      let obj_container=obj_project.fn_validateContainer(obj_selected, obj_item.obj_design.int_idRecord);                      
      if(!obj_container){
          if(bln_debug){console.log("VALIDATE PASTE: NO VALID CONTAINER")};   
          return false;
      }

      if(obj_container.obj_design.bln_dynamicPin){            
        if(bln_debug){console.log("VALIDATE PASTE: CANOT PASTE INTO DYNAMIC PIN")};   
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

      //why is it necessary to destroy the orginal copy ?
      //this.fn_copy(obj_item);
      //obj_item=this.fn_get();                        
      
      if(!obj_container){
          console.log("CLIPBOARD PASTE ERROR: CONTAINER IS FALSE");
          return false;
      }      

      //*
      let obj_template=this.obj_template;
      this.fn_clear();      
      this.fn_copy(obj_template);//not sure why we cannot re-use the template   
      //*/
      

      
      let obj_copy=obj_container.fn_addItem(obj_item);//ClientSideItem            
      return obj_copy;        
  }

  fn_validateInsert(obj_insertNextTo){        

    let bln_debug=false;

    let obj_item=this.fn_get();    

    if(!obj_item){     
        if(bln_debug){console.log("VALIDATE INSERT: CLIPBOARD IS BLANK")};   
        return false;
    }  

    //Item must be in editmode
    if((obj_item.obj_design.int_modeExecute!==obj_holder.int_modeEdit)){        
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


    let obj_container=obj_insertNextTo.fn_getParentComponent();
    if(!obj_container){
        if(bln_debug){console.log("VALIDATE INSERT: NO VALID CONTAINER PARENT IS FALSE")};   
        return false;
    }

    obj_container=obj_project.fn_validateContainer(obj_container, obj_item.obj_design.int_idRecord);                          
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

  fn_validateDelete(obj_selected){

      let bln_debug=false;      

      if(!obj_selected){        
          return false;
      }

      //Item must be in editmode
      if((obj_selected.obj_design.int_modeExecute!==obj_holder.int_modeEdit)){        
        return false;
    }

      if(obj_selected===obj_projectTarget){            
          if(bln_debug){console.log("VALIDATE DELETE: CANNOT DELETE PROJECT INSTANCE")};
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
              if(value.indexOf("myId")===0){//if present
                  //return;
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
        
/*id: 349597//*/
/*type: clipboard//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349600//*/
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


/*id: 349600//*/
/*type: designfile//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349603//*/
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
/*id: 349603//*/
/*type: desktopnavigationbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349604//*/
/*type: div//*/

            //XSTART component/div
              class div extends component{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("div");      
                  this.fn_setTag("div");            
                  this.obj_design.bln_isGenericTag=true;
                  // this.fn_extends("component");            
                }
              }//END CLS
              //END TAG
              //END component/div
/*id: 349604//*/
/*type: div//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349605//*/
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
/*id: 349605//*/
/*type: dynamiccontent//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349606//*/
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
/*id: 349606//*/
/*type: eazygrid//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349610//*/
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
/*id: 349610//*/
/*type: grid//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349611//*/
/*type: img//*/
class img extends component {
    constructor(obj_ini) {      
      super(obj_ini);        
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);    
      
      //START INITIALIZE DESIGN
      this.fn_setType("img");      
      this.fn_setTag("img", true);            
      //END INITIALIZE DESIGN
      
      //START INITIALIZE DOM
      //if(this.obj_domProperty.src===undefined){this.obj_domProperty.src="/firefoxlogo.png";}      
      //END INITIALIZE DOM
      
      //START INITIALIZE STYLE      
      //if(this.obj_domStyle.overflow===undefined){this.obj_domStyle.overflow="hidden";}
      if(this.obj_domStyle.verticalAlign===undefined){this.obj_domStyle.verticalAlign="bottom";}//eazyStyle
      //END  INITIALIZE STYLE  

      this.fn_setIsContainer(false);
  }    
  fn_setDomProperty(str_name, str_value){        
    switch(str_name){
      case "src":                    
        let arr_path=str_value.split(obj_path.str_path_folder_application);        
        if(arr_path.length>1){
          str_value = str_value.replace(arr_path[0],'');
          //console.log(str_name + ": " + str_value);
        }
        break;
      default:        
    }
    
    super.fn_setDomProperty(str_name, str_value);
    
  }
}//END CLS
//END IMG

/*id: 349611//*/
/*type: img//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349613//*/
/*type: inputandbutton//*/
class inputandbutton extends component {
    constructor(obj_ini) {

        super(obj_ini); // call the super class constructor        
    }    
    fn_initialize(obj_ini){        
        
        super.fn_initialize(obj_ini);               

        this.fn_setType("inputandbutton");      
        this.fn_setTag("inputandbutton");                        

        this.fn_requires("input");                        
        this.fn_requires("xdesign1_addtagbutton");                                
        
        this.fn_setIsContainer(true);

        //START INITIALIZE DESIGN
        if(this.obj_design.str_text===undefined){this.obj_design.str_text=this.obj_design.str_name;}            
        //END INITIALIZE DESIGN     
        
        //START INITIALIZE DOM                
        //END INITIALIZE DOM         
        
        //START INITIALIZE STYLE  
        if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="40px";}                      
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
        obj_ini.obj_design.bln_registerAtContainer=true;
        obj_input=obj_container.fn_addItem(obj_ini);//BootItem                
        //END TEXT INPUT        

        //ADD BUTTON TO VALUE CELL
        obj_ini=new Holder;
        obj_ini.obj_design.str_type="xdesign1_addtagbutton";                
        obj_ini.obj_design.str_name=this.obj_design.str_text;
        obj_ini.obj_theme=this.obj_theme;
        obj_ini.obj_design.str_linkId=obj_input.obj_design.str_idXDesign;                    
        //obj_ini.obj_design.str_nameEventClick=this.obj_design.str_nameEventButtonClick;
        //obj_ini.obj_design.xstr_valuexEventClick=this.obj_design.str_valueEventButtonClick;
        obj_container.fn_addItem(obj_ini);//BootItem                      
        //ADD BUTTON TO VALUE CELL    
    }
    xfn_setEnabled(bln_value){
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

/*id: 349613//*/
/*type: inputandbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349615//*/
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
/*id: 349615//*/
/*type: loginbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349616//*/
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
/*id: 349616//*/
/*type: loginpanel//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349617//*/
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
/*id: 349617//*/
/*type: loginpanelform//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349619//*/
/*type: menubuttonpalettepinned//*/

            //XSTART component/menubuttonpalettepinned
              class menubuttonpalettepinned extends menubutton{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("menubuttonpalettepinned");      
                  this.fn_setTag("menubuttonpalettepinned");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("menubutton");
                   
                   //this.obj_design.str_nameTheme="xdesign1_menubutton";
                   this.obj_design.str_nameTheme="thememenubutton";
                   //

                   if(this.obj_design.str_catQuery===undefined){
                    this.obj_design.str_catQuery="notset";
                   }
                }

                fn_onLoad(){
                  super.fn_onLoad();
                  let obj_ini=new Object;
                  obj_ini.str_catQuery=this.obj_design.str_catQuery;      
                  //console.log("obj_ini.str_catQuery: " + obj_ini.str_catQuery);
                  obj_project.fn_runAction("getListPalettePinnedComponent", obj_ini);
                }        
              }//END CLS
              //END TAG
              //END component/menubuttonpalettepinned
/*id: 349619//*/
/*type: menubuttonpalettepinned//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349620//*/
/*type: navblock//*/
  class navblock extends panel {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);
      

      //START INITIALIZE DESIGN      
      this.fn_setType("navblock");      
      this.fn_setTag("navblock");      

      this.obj_design.bln_listenClick=true;    
      this.fn_setIsContainer(true);

      this.fn_extends("panel");                         

      //if(this.obj_domProperty.innerText===undefined){this.obj_domProperty.innerText="My Nav"}              
      if(this.obj_design.int_idNavContainer==undefined){this.obj_design.int_idNavContainer=0;}        
      if(this.obj_design.int_idNavRequest==undefined){this.obj_design.int_idNavRequest=0;}              
      if(this.obj_design.bln_isDisabled==undefined){this.obj_design.bln_isDisabled=true;}                                      
      
      //END INITIALIZE DESIGN      

      //START INITIALIZE STYLE       
      
      
      //this.fn_requires("ajax");                   
      //this.fn_requires("grid");                   
      //END INITIALIZE STYLE      
    }
   fn_onClick(){//can be overidden          
      super.fn_onClick(); 
      this.fn_getItem();      
    }      

    fn_validatePost(obj_post){//runs on return from server fn_getBootalble;

      if(obj_post.RecordId===0){
          console.log("Record Not Found on Server.");        
          return false;
      }
      /*                
      obj_post.RecordId;
      obj_post.RecordType;        
      obj_post.RowData;
      obj_shared.fn_enumerateObject(obj_post.ObjectData, "aaaaaaaaaaaa");
      //*/
      return true;
      
  } 

    fn_register(){

      if(this.fn_getDesignProperty("bln_isDisabled")){    
        console.log("Note NavBlock: isDisabled is true: " + this.obj_design.bln_isDisabled);
        return false;
      }    
  
      if(!this.obj_design.int_idNavContainer){
        console.log("Error NavBlock: idNavContainer is false");
        return false;
      }
      
      if(!this.obj_design.int_idNavRequest){
        console.log("Error NavBlock: idNavRequest is false");
        return false;
      }
      return true;
  }
  fn_getItem(){
    

    let obj_ini, obj_navContainer, obj_navRequest;    
    
    if(!this.fn_register()){return;}
    
    //*    
    obj_navContainer=obj_project.fn_findItemByIdRecord(this.obj_design.int_idNavContainer);        
    if(!obj_navContainer){
      console.log("Error NavBlock: navContainer is false");
      return;
    }
    obj_navContainer.fn_debug("Going to LOAD into NavContainer");
    obj_navContainer.fn_removeAllItems();   

    obj_ini=new Holder;
    obj_ini.obj_design.int_idRecord=this.obj_design.int_idNavRequest;           
    

    obj_navRequest=obj_navContainer.fn_addItem(obj_ini);//ServerSideItem
  }

  

  
  
    
  
}//END CLS


/*id: 349620//*/
/*type: navblock//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349624//*/
/*type: programiconbutton//*/

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
/*id: 349624//*/
/*type: programiconbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349626//*/
/*type: smartbutton//*/

//XSTART component/smartbutton
class smartbutton extends recordset{
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);                
    
    
    this.fn_setType("smartbutton");      
    this.fn_setTag("smartbutton");            
    this.obj_design.bln_isGenericTag=true;
    this.fn_extends("menubutton");            
  }
  fn_bootChildren(){
    let obj_ini;
    obj_ini=new Holder;                                                                           
    obj_ini.obj_design.str_type="menubutton";                                       
    this.obj_holder.obj_recordset=this.fn_addItem(obj_ini);//BootItem     
  }
  fn_onload(){
    console.log("this.obj_holder.obj_recordset: " + this.obj_holder.obj_recordset);

  }
  fn_open(){
    let obj_container=this.fn_getParentComponent();        
    let str_method="fn_open";        
    if(obj_container && obj_container[str_method]){
        obj_container[str_method]();
    }      
  }
  fn_close(){
    let obj_container=this.fn_getParentComponent();        
    let str_method="fn_close";        
    if(obj_container && obj_container[str_method]){
        obj_container[str_method]();
    }             
  }
}//END CLS
//END TAG
//END component/smartbutton
/*id: 349626//*/
/*type: smartbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349644//*/
/*type: textarea//*/
class textarea extends component {
    constructor(obj_ini) {      
      super(obj_ini);        
    } 
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);        

      this.fn_setType("textarea");      
      this.fn_setTag("textarea", true);                  

      this.obj_design.bln_listenChange=true;
    }        
    fn_onChange(){                    
      obj_project.obj_projectEvent=this;             
      this.obj_design.str_content=this.dom_obj.value;                        
    }   
    fn_applyTheme(){ 
      super.fn_applyTheme();
      this.fn_setStyleProperty("background-color", this.obj_theme.foregroundColor);          

      let str_color=this.obj_theme.highlightColor;
      if(this.obj_domProperty.disabled){
        str_color="gray";
      }
      this.fn_setStyleProperty("color", str_color); 
    }   
    xfn_setDisabled(){
      super.fn_setDisabled();
      this.fn_setStyleProperty("color", this.obj_theme.foregroundColor);                  
    }   
    
}//END CLS
//END TAG
/*id: 349644//*/
/*type: textarea//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349645//*/
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
/*id: 349645//*/
/*type: texteditor//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349646//*/
/*type: textnode//*/
class textnode extends tag {
  constructor(obj_ini) {      
    super(obj_ini);        
  } 
  fn_initialize(obj_ini){
    super.fn_initialize(obj_ini);        

    this.fn_setType("textnode");      
    this.fn_setTag("txt", true);                  
    
  }        
  fn_execute(){
    super.fn_execute();

    this.dom_obj.nodeValue=this.obj_design.str_content;    
  }
}//END CLS
//END TAG
/*id: 349646//*/
/*type: textnode//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349647//*/
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
/*id: 349647//*/
/*type: theme//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349648//*/
/*type: toolbar//*/

            //XSTART component/toolbar
              class toolbar extends flex{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("toolbar");      
                  this.fn_setTag("toolbar");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("flex");            
                }
              }//END CLS
              //END TAG
              //END component/toolbar
/*id: 349648//*/
/*type: toolbar//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349652//*/
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
/*id: 349652//*/
/*type: xdesign1_addtagbutton//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349654//*/
/*type: xdesign1_closeproject//*/

            //XSTART component/xdesign1_closeproject
              class xdesign1_closeproject extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_closeproject");      
                  this.fn_setTag("xdesign1_closeproject");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){  
                  obj_project.obj_holder.bln_toggleChooseProject=false;                  
                  obj_project.fn_closeProject();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_closeproject
/*id: 349654//*/
/*type: xdesign1_closeproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349656//*/
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
/*id: 349656//*/
/*type: xdesign1_import//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349657//*/
/*type: xdesign1_managercategory//*/

      //XSTART component/xdesign1_managercategory
        class xdesign1_managercategory extends xdesign1_managermenu{

        constructor(obj_ini) {      
          super(obj_ini);        
        } 
        fn_initialize(obj_ini){
          super.fn_initialize(obj_ini);                          
          
          this.fn_setType("xdesign1_managercategory");      
          this.fn_setTag("xdesign1_managercategory");            
          this.obj_design.bln_isGenericTag=true;            
          this.fn_extends("xdesign1_managermenu");                              

          this.obj_design.str_urlServer="server.php";
          this.obj_holder.bln_debugServer=false;
        }                           
        
        fn_onStateChange(){                          
          super.fn_onStateChange();          
          this.obj_holder.obj_container.fn_setEnabled();                                        
        }
        fn_getContent(){
          //console.log("fn_getContent");          
          let obj_query={};            
          obj_query.str_action="getListProjectInCategory";            
          obj_query.str_queryString="CategoryName=" + this.obj_design.str_categoryName;                                
          this.fn_runQuery(obj_query);
        }           

        getListProjectInCategory(obj_post){                                                  
          this.fn_getRecordSetItems(obj_post);
        }

        fn_formatRecordSetItem(obj_ini, obj_row){
          obj_ini.obj_design.str_name="xdesign1_buttonOpenProject" + obj_row.InstanceName;            
          obj_ini.obj_design.str_valueEventClick="fn_openProject";            
          obj_ini.obj_design.int_idRecordTarget=obj_row.InstanceId;                                        
        }
        
      }//END CLS
      //END TAG
      //END component/xdesign1_managerprojectcategory
/*id: 349657//*/
/*type: xdesign1_managercategory//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349658//*/
/*type: xdesign1_managercategorypalette//*/

            //XSTART component/xdesign1_managercategorypalette
            class xdesign1_managercategorypalette extends xdesign1_managermenu{
              constructor(obj_ini) {      
                super(obj_ini);        
              } 
              fn_initialize(obj_ini){
                super.fn_initialize(obj_ini);                
                
                
                this.fn_setType("xdesign1_managercategorypalette");      
                this.fn_setTag("xdesign1_managercategorypalette");            
                this.fn_extends("xdesign1_managermenu");                              
                this.obj_design.bln_isGenericTag=true;                  

                this.obj_design.str_urlServer="server.php";
                this.obj_holder.bln_debugServer=false;
              }

              

              fn_onStateChange(){                          
                super.fn_onStateChange();          
                this.obj_holder.obj_container.fn_setEnabled();                                        
              }
              fn_getContent(){
                //console.log("abc fn_getContent");          
                let obj_query={};            
                obj_query.str_action="getListPaletteInCategory";            
                obj_query.str_queryString="CategoryName=" + this.obj_design.str_categoryName;                                
                this.fn_runQuery(obj_query);
              }           
      
              getListPaletteInCategory(obj_post){                                                  
                this.fn_getRecordSetItems(obj_post);
              }
      
              fn_formatRecordSetItem(obj_ini, obj_row){
                
                obj_ini.obj_design.str_name="xdesign1_buttonAddPaletteItem" + obj_row.InstanceName;            
                obj_ini.obj_design.str_valueEventClick="fn_addComponentItem";            
                obj_ini.obj_design.int_idRecordTarget=obj_row.InstanceId;        
                obj_ini.obj_design.str_typeRecordTarget=obj_row.InstanceType;                
      
              }
              
            }//END CLS
            //END TAG
            //END component/xdesign1_managercategoryproject
/*id: 349658//*/
/*type: xdesign1_managercategorypalette//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349659//*/
/*type: xdesign1_managercategoryproject//*/

            //XSTART component/xdesign1_managercategoryproject
            class xdesign1_managercategoryproject extends xdesign1_managermenu{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_managercategoryproject");      
                  this.fn_setTag("xdesign1_managercategoryproject");            
                  this.fn_extends("xdesign1_managermenu");                              
                  this.obj_design.bln_isGenericTag=true;                  

                  this.obj_design.str_urlServer="server.php";
                  this.obj_holder.bln_debugServer=false;
                }

                fn_onStateChange(){                          
                  super.fn_onStateChange();          
                  this.obj_holder.obj_container.fn_setEnabled();                                        
                }
                fn_getContent(){
                  //console.log("fn_getContent");          
                  let obj_query={};            
                  obj_query.str_action="getListProjectInCategory";            
                  obj_query.str_queryString="CategoryName=" + this.obj_design.str_categoryName;                                
                  this.fn_runQuery(obj_query);
                }           
        
                getListProjectInCategory(obj_post){                                                  
                  this.fn_getRecordSetItems(obj_post);
                }
        
                fn_formatRecordSetItem(obj_ini, obj_row){
                  obj_ini.obj_design.str_name="xdesign1_buttonOpenProject" + obj_row.InstanceName;            
                  obj_ini.obj_design.str_valueEventClick="fn_openProject";            
                  obj_ini.obj_design.int_idRecordTarget=obj_row.InstanceId;                                        
                }
                
              }//END CLS
              //END TAG
              //END component/xdesign1_managercategoryproject
/*id: 349659//*/
/*type: xdesign1_managercategoryproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349660//*/
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
          } 
          fn_getContent(){ 
            
            if(!this.fn_getComponentCode()){
              return;
            }
            
            this.fn_createTextEditor();      
            this.fn_displayComponentCode();
          }                     
          fn_onPaletteItemSelected(){    
            
            if(!this.fn_getComponentCode()){
              return;
            }
            
            this.obj_holder.obj_container.fn_setEnabled(true);                                                                  
          }

          fn_getComponentCode(){    
            
            let obj_selected=obj_project.obj_palettSelected;            
            if(obj_selected!==obj_projectTarget){              
              this.obj_holder.obj_container.fn_setDisabled();                    
              return false;
            }                   
            let str_componentCode=obj_selected.obj_holder.str_componentCode;                  
            if(!str_componentCode){
              this.fn_openComponentCode();
            }
            
            return true;
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
            
            //console.log("obj_texteditor: " + obj_texteditor);
            if(!obj_texteditor){                           
              return;
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
            let obj_dynamiccontent=this.fn_getComponent("dynamiccontent");                                    
            //console.log("obj_dynamiccontent: " + obj_dynamiccontent);
            if(!obj_dynamiccontent){
              return;
            }

            obj_dynamiccontent.fn_prepare();  
      
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
            obj_item=obj_dynamiccontent.fn_addItem(obj_ini);
            this.fn_register(obj_item);      
            //let obj_texteditor=this.fn_getComponent("xdesign1_componenttexteditor");                                    
            //console.log("fn_createTextEditor obj_texteditor: " + obj_texteditor);
      
          }   
        }//END CLS
        //END TAG
        //END component/xdesign1_managercomponent
/*id: 349660//*/
/*type: xdesign1_managercomponent//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349666//*/
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

          
          fn_XDesigner_onLogIn(){            
            let obj_item;
            
            let bln_visibleUserAuthor=true;              
            let bln_displaySysAdmin=true;            
            
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
            
            super.fn_onStateChange();
            this.obj_holder.obj_container.fn_setDisplay();
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
/*id: 349666//*/
/*type: xdesign1_managersettings//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349668//*/
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
/*id: 349668//*/
/*type: xdesign1_move//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349669//*/
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
/*id: 349669//*/
/*type: xdesign1_newproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349670//*/
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
              
              let obj_container, obj_item, obj_ini, arr, int_modeExecute;
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
            if(!obj_clipboard.fn_validateCopy(obj_selected)){  
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
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validatePaste(obj_selected)){  
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
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem
            //ADD BUTTON TO VALUE CELL
      
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateCopy(obj_selected)){  
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
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL

            bln_disabled=false;      
            if(!obj_clipboard.fn_validateInsert(obj_selected)){  
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
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem            
            //ADD BUTTON TO VALUE CELL
      
            //*
            switch(obj_selected.obj_design.str_type.toLowerCase()){
              case "eazygrid":
                let obj_ini;
                //ADD BUTTON TO VALUE CELL
                bln_disabled=false;      
                if(!obj_clipboard.fn_validateDelete(obj_selected)){  
                  bln_disabled=true;    
                }
                obj_ini=new Holder;
                obj_ini.obj_design.str_type="button";                                  
                obj_ini.obj_design.str_name="ROTATE";    
                obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;          
                obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
                obj_ini.obj_design.str_valueEventClick="fn_setEazyGridSwitch";
                obj_container.fn_addItem(obj_ini);//BootItem      
                //ADD BUTTON TO VALUE CELL
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
            obj_ini.obj_design.str_name="Home";          
            //obj_ini.obj_theme=this.obj_theme;            
            obj_ini.obj_design.str_linkId=obj_selected.obj_design.str_idXDesign;                      
            obj_ini.obj_design.str_nameEventClick=obj_project.obj_holder.str_prefix + "myDesignerButtonClick";
            //obj_ini.obj_design.str_valueEventClick="fn_selectLocalHome";  
            obj_ini.obj_design.str_valueEventClick="fn_selectHome";              
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_container.fn_addItem(obj_ini);//BootItem      
            //ADD BUTTON TO VALUE CELL

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


            /*            
            bln_disabled=false;      
            if(!obj_clipboard.fn_validateDelete(obj_selected)){  
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
            obj_ini.obj_domProperty.disabled=bln_disabled;    
            obj_item=obj_container.fn_addItem(obj_ini);//BootItem               
            //ADD BUTTON TO VALUE CELL
            
            
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
              obj_ini.obj_domProperty.disabled=bln_disabled;    
              obj_item=obj_container.fn_addItem(obj_ini);//BootItem   
            }
      
            
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
            obj_ini.obj_design.str_valueEventClick="fn_saveAsProject";            
            obj_ini.obj_domProperty.disabled=bln_disabled;         
            if(!bln_disabled){obj_item=obj_container.fn_addItem(obj_ini);}            
            //*/
            
            //*/
            
            //ADD BUTTON TO VALUE CELL      
          }
          fn_setEazyGridSwitch(){

            console.log("fn_setEazyGridSwitch");
            
              let obj_eazygrid=obj_project.obj_palettSelected;            
              obj_eazygrid.obj_design.int_axis=obj_shared.fn_flipAxis(obj_eazygrid.obj_design.int_axis);    
              obj_eazygrid.fn_compileTemplate();                              
              obj_eazygrid.fn_applyFeatures();//required , or must go in base object additem                             
              obj_eazygrid.obj_designDelegate.fn_setPaletteSelected();      
            }
      
            fn_validateSave(obj_item, obj_localHome){
              let bln_debug=false;
              
      
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
              
              if(bln_debug){console.log("VALIDATE OPEN: VALIDATED")};   
              return true;
          }
        }
        //END CLS
        //END TAG
        //END component/xdesign1_objectaction
/*id: 349670//*/
/*type: xdesign1_objectaction//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349671//*/
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
        
/*id: 349671//*/
/*type: xdesign1_objectmap//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349672//*/
/*type: xdesign1_openproject//*/

            //XSTART component/xdesign1_openproject
              class xdesign1_openproject extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_openproject");      
                  this.fn_setTag("xdesign1_openproject");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                
                fn_onClick(){  
                  obj_project.obj_holder.bln_toggleChooseProject=true;                  
                  obj_project.fn_onStateChange();                  
                }
              }//END CLS              
              //END TAG
              //END component/xdesign1_openproject
/*id: 349672//*/
/*type: xdesign1_openproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349674//*/
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
            
              let str_listIn="bln_maintainId,bln_palettePin,bln_registerAtContainer,bln_registerAtProject,bln_typeable,dataSVG,filterSVG,gridTemplate,int_idRecord,str_categoryList,str_name,str_nameRegistrator,str_nameTheme,str_subType,str_type,str_tag,str_value,";
              //let str_listInProjectOnly="bln_palettePin,";        
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
      
              let str_listInProjectOnly="bln_palettePin,";
      
        
              if(!bln_isProject){//probably ok to leave disabled global if selected component is not the project
                //obj_ini.obj_domProperty.disabled=true;    
              }
              
      
              if(obj_shared.fn_inStr(","+obj_ini.obj_design.str_name+",", ","+str_listAllAccess+",")){
                obj_ini.obj_domProperty.disabled=false;    
              }  
      
              if(obj_shared.fn_inStr(","+obj_ini.obj_design.str_name+",", ","+str_listReadOnly+",")){
                obj_ini.obj_domProperty.disabled=true;    
              }  
        
              return obj_ini;
            }
          
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydesignui
/*id: 349674//*/
/*type: xdesign1_propertydesignui//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349675//*/
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
              
              //pls gnore this comment
              obj_ini.obj_domProperty.disabled=false;                   
              return obj_ini;
            }
            
        }//END CLS
        //END TAG
        //END component/xdesign1_propertydomattribute
/*id: 349675//*/
/*type: xdesign1_propertydomattribute//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349676//*/
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
/*id: 349676//*/
/*type: xdesign1_propertydomproperty//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349677//*/
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
/*id: 349677//*/
/*type: xdesign1_propertydomstyle//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349680//*/
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
/*id: 349680//*/
/*type: xdesign1_release//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349681//*/
/*type: xdesign1_saveproject//*/

            //XSTART component/xdesign1_saveproject
              class xdesign1_saveproject extends button{
                constructor(obj_ini) {      
                  super(obj_ini);        
                } 
                fn_initialize(obj_ini){
                  super.fn_initialize(obj_ini);                
                  
                  
                  this.fn_setType("xdesign1_saveproject");      
                  this.fn_setTag("xdesign1_saveproject");            
                  this.obj_design.bln_isGenericTag=true;
                   this.fn_extends("button");            
                }
                fn_onClick(){  
                  obj_project.fn_saveProject();
                }
              }//END CLS
              //END TAG
              //END component/xdesign1_saveproject
/*id: 349681//*/
/*type: xdesign1_saveproject//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349682//*/
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
/*id: 349682//*/
/*type: xdesign1_xcompile//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349683//*/
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
/*id: 349683//*/
/*type: xdesign1_xcreatebackup//*/
/*END COMPONENT//*/


/*START COMPONENT//*/
/*id: 349684//*/
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
/*id: 349684//*/
/*type: xdesign1_xmaintain//*/
/*END COMPONENT//*/

//END XTRA CLASSES




//START AUTO GENERATED COMPONENT MAP
const obj_ComponentMap = new Map([['button', button],['tablecell', tablecell],['tableheader', tableheader],['tablerow', tablerow],['tag', tag],['input', input],['table', table],['xdesign1_propertysheet', xdesign1_propertysheet],['xdesign1_propertydesign', xdesign1_propertydesign],['navelement', navelement],['recordset', recordset],['xdesign1_managermenu', xdesign1_managermenu],['flex', flex],['menubutton', menubutton],['panel', panel],['form', form],['svgblock', svgblock],['eazygriditem', eazygriditem],['abcaccordion', abcaccordion],['abcconsumer', abcconsumer],['abchasserver', abchasserver],['accordion', accordion],['block', block],['clipboard', clipboard],['designfile', designfile],['desktopnavigationbutton', desktopnavigationbutton],['div', div],['dynamiccontent', dynamiccontent],['eazygrid', eazygrid],['grid', grid],['img', img],['inputandbutton', inputandbutton],['loginbutton', loginbutton],['loginpanel', loginpanel],['loginpanelform', loginpanelform],['menubuttonpalettepinned', menubuttonpalettepinned],['navblock', navblock],['programiconbutton', programiconbutton],['smartbutton', smartbutton],['textarea', textarea],['texteditor', texteditor],['textnode', textnode],['theme', theme],['toolbar', toolbar],['xdesign1_addtagbutton', xdesign1_addtagbutton],['xdesign1_closeproject', xdesign1_closeproject],['xdesign1_import', xdesign1_import],['xdesign1_managercategory', xdesign1_managercategory],['xdesign1_managercategorypalette', xdesign1_managercategorypalette],['xdesign1_managercategoryproject', xdesign1_managercategoryproject],['xdesign1_managercomponent', xdesign1_managercomponent],['xdesign1_managersettings', xdesign1_managersettings],['xdesign1_move', xdesign1_move],['xdesign1_newproject', xdesign1_newproject],['xdesign1_objectaction', xdesign1_objectaction],['xdesign1_objectmap', xdesign1_objectmap],['xdesign1_openproject', xdesign1_openproject],['xdesign1_propertydesignui', xdesign1_propertydesignui],['xdesign1_propertydomattribute', xdesign1_propertydomattribute],['xdesign1_propertydomproperty', xdesign1_propertydomproperty],['xdesign1_propertydomstyle', xdesign1_propertydomstyle],['xdesign1_release', xdesign1_release],['xdesign1_saveproject', xdesign1_saveproject],['xdesign1_xcompile', xdesign1_xcompile],['xdesign1_xcreatebackup', xdesign1_xcreatebackup],['xdesign1_xmaintain', xdesign1_xmaintain]]);
//END AUTO GENERATED MAP




/*START COMPONENT//*/
/*id: 349396//*/
/*type: TemplateCode//*/

//START Project.js
class Project extends component{
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
obj_boot.obj_design.int_idRecord=0; 
/*END DESIGN BOOT VARIABLE//*/
//END Project.js


/*id: 349396//*/
/*type: TemplateCode//*/
/*END COMPONENT//*/




/*START INSTANCE JSON MAP//*/
var obj_InstanceJSONMap = new Map([
[100, {"obj_design":{"int_idRecord":100,"str_idXDesign":"myId_54177211","str_name":"accordion","str_variableName":"accordion","str_type":"accordion","str_tag":"accordion","str_createdDate":"2022-01-31 20:32:58","str_modifiedDate":"2022-01-31 20:32:58","str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"bln_palettePin":true,"bln_classController":"false"},"obj_domStyle":{"width":"100%","display":"block","padding":"10px"}}],
[101, {"obj_design":{"int_idRecord":101,"str_idXDesign":"myId_74846880","str_name":"button","str_variableName":"button","str_type":"button","str_tag":"button","str_content":"My component","str_createdDate":"2022-02-02 19:54:40","str_modifiedDate":"2022-02-02 19:54:40","bln_typeable":true,"str_text":"My component","str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"bln_palettePin":true},"obj_domProperty":{"innerText":"My component"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[103, {"obj_design":{"int_idRecord":103,"str_idXDesign":"myId_35465536","str_name":"Server Manager","str_variableName":"servermanager","str_type":"designfile","str_tag":"designfile","str_createdDate":"2022-01-31 21:02:46","str_modifiedDate":"2022-01-31 21:02:46","bln_palettePin":true,"str_categoryList":"Toolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[104, {"obj_design":{"int_idRecord":104,"str_idXDesign":"myId_33156561","str_name":"flex","str_variableName":"flex","str_type":"flex","str_tag":"flex","str_createdDate":"2022-01-31 21:05:11","str_modifiedDate":"2022-01-31 21:05:11","bln_palettePin":true,"bln_createRelease":"false","bln_isLocalHome":true,"str_categoryList":"Toolbox"},"obj_domStyle":{"cursor":"default","display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto"}}],
[105, {"obj_design":{"int_idRecord":105,"str_idXDesign":"myId_28661619","str_name":"navblock","str_variableName":"navblock","str_type":"navblock","str_tag":"panel","str_classExtend":"panel","str_createdDate":"2022-01-31 21:06:58","str_modifiedDate":"2022-01-31 21:06:58","int_idNavContainer":0,"int_idNavRequest":0,"bln_isDisabled":true,"bln_palettePin":true,"str_categoryList":"Toollbox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","width":"100%","padding":"10px","overflow":"auto"}}],
[106, {"obj_design":{"int_idRecord":106,"str_idXDesign":"myId_54166875","str_name":"eazygrid","str_variableName":"eazygrid","str_type":"eazygrid","str_tag":"eazygrid","str_createdDate":"2022-01-31 21:08:50","str_modifiedDate":"2022-01-31 21:08:50","bln_eazyGrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"str_classList":"eazygriditem","arr_item":[{"obj_design":{"int_idRecord":"5921","str_type":"eazygriditem"}},{"obj_design":{"int_idRecord":"5922","str_type":"eazygriditem"}}],"int_axis":1,"bln_classController":true},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","overflow":"hidden","background-color":"#2b2c34","grid-gap":"10px","grid-auto-rows":"minmax(100px, 1fr)","grid-auto-columns":"minmax(100px, 1fr)","grid-template-rows":"minmax(100px, 1fr) minmax(100px, 1fr)","grid-template-columns":"minmax(100px, 1fr)"}}],
[107, {"obj_design":{"int_idRecord":107,"str_idXDesign":"myId_99919679","str_name":"eazygriditem","str_variableName":"eazygriditem","str_type":"eazygriditem","str_tag":"eazygriditem","str_createdDate":"2022-01-31 21:09:35","str_modifiedDate":"2022-01-31 21:09:35","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_palettePin":true,"str_categoryList":"Toolbox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domStyle":{"background-color":"#414141"}}],
[108, {"obj_design":{"int_idRecord":108,"str_idXDesign":"myId_66633136","str_name":"block","str_variableName":"block","str_type":"block","str_tag":"block","str_createdDate":"2022-01-31 21:10:58","str_modifiedDate":"2022-01-31 21:10:58","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"bln_classController":"false"}}],
[109, {"obj_design":{"int_idRecord":109,"str_idXDesign":"myId_60061830","str_name":"img","str_variableName":"img","str_type":"img","str_tag":"img","str_createdDate":"2022-01-30 19:57:28","str_modifiedDate":"2022-01-30 19:57:28","str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"bln_palettePin":true},"obj_domStyle":{"vertical-align":"bottom"}}],
[110, {"obj_design":{"int_idRecord":110,"str_idXDesign":"myId_08998424","str_name":"input","str_variableName":"input","str_type":"input","str_tag":"input","str_createdDate":"2022-02-02 19:57:30","str_modifiedDate":"2022-02-02 19:57:30","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[111, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4378","str_type":"input"}},{"obj_design":{"int_idRecord":"4379","str_type":"xdesign1_addtagbutton"}}],"int_idRecord":111,"str_idXDesign":"myId_77627280","str_name":"inputandbutton","str_variableName":"inputandbutton","str_type":"inputandbutton","str_tag":"inputandbutton","str_createdDate":"2022-02-02 20:01:12","str_modifiedDate":"2022-02-02 20:01:12","str_text":"My component","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domStyle":{"height":"40px","margin-right":"1px","margin-bottom":"1px"}}],
[113, {"obj_design":{"int_idRecord":113,"str_idXDesign":"myId_13277337","str_name":"menubutton","str_variableName":"menubutton","str_type":"menubutton","str_tag":"button","str_createdDate":"2022-02-02 20:04:57","str_modifiedDate":"2022-02-02 20:04:57","bln_isMenuButton":true,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My component","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My component"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[114, {"obj_design":{"int_idRecord":114,"str_idXDesign":"myId_28488134","str_name":"grid","str_variableName":"grid","str_type":"grid","str_tag":"grid","str_createdDate":"2022-02-02 20:07:44","str_modifiedDate":"2022-02-02 20:07:44","str_minDim":"100px","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","grid-gap":"10px","overflow":"hidden"}}],
[115, {"obj_design":{"int_idRecord":115,"str_idXDesign":"myId_61644147","str_name":"clipboard","str_variableName":"clipboard","str_type":"clipboard","str_tag":"clipboard","str_createdDate":"2022-02-02 20:09:36","str_modifiedDate":"2022-02-02 20:09:36","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[116, {"obj_design":{"int_idRecord":116,"str_idXDesign":"myId_46955922","str_name":"panel","str_variableName":"panel","str_type":"panel","str_tag":"panel","str_createdDate":"2022-02-02 20:10:52","str_modifiedDate":"2022-02-02 20:10:52","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"bln_classController":true},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","width":"100%","padding":"10px","overflow":"auto"}}],
[117, {"obj_design":{"int_idRecord":117,"str_idXDesign":"myId_13220336","str_name":"dynamiccontent","str_variableName":"dynamiccontent","str_type":"dynamiccontent","str_tag":"dynamiccontent","bln_registerAtContainer":true,"str_classExtend":"flex","str_createdDate":"2022-02-02 20:12:17","str_modifiedDate":"2022-02-02 20:12:17","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domStyle":{"cursor":"default","display":"flex","flex-wrap":"wrap","height":"100%","width":"100%","overflow":"auto"}}],
[118, {"obj_design":{"int_idRecord":118,"str_idXDesign":"myId_26363223","str_name":"svgblock","str_variableName":"svgblock","str_type":"svgblock","str_tag":"svgblock","str_createdDate":"2022-02-02 20:15:23","str_modifiedDate":"2022-02-02 20:15:23","pointerEventSVG":"none","typeSVG":"image/svg+xml","bln_palettePin":true,"str_categoryList":"MyToolBox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domStyle":{"padding":"0px","align-self":"center","width":"100px","height":"100px","display":"block"}}],
[119, {"obj_design":{"int_idRecord":119,"str_idXDesign":"myId_65431523","str_name":"form","str_variableName":"form","str_type":"form","str_tag":"form","str_createdDate":"2022-02-02 20:16:55","str_modifiedDate":"2022-02-02 20:16:55","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[123, {"obj_design":{"int_idRecord":123,"str_idXDesign":"myId_11691618","str_name":"table","str_variableName":"table","str_type":"table","str_tag":"table","str_classList":"tablerow,tablecell,tableheader","str_createdDate":"2022-02-02 20:26:22","str_modifiedDate":"2022-02-02 20:26:22","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"bln_classController":true}}],
[124, {"obj_design":{"int_idRecord":124,"str_idXDesign":"myId_11132063","str_name":"tablerow","str_variableName":"tablerow","str_type":"tablerow","str_tag":"tr","str_createdDate":"2022-02-02 20:30:36","str_modifiedDate":"2022-02-02 20:30:36","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"str_classList":"tablecell,tableheader","bln_classController":true}}],
[125, {"obj_design":{"int_idRecord":125,"str_idXDesign":"myId_67341806","str_name":"tablecell","str_variableName":"tablecell","str_type":"tablecell","str_tag":"td","str_createdDate":"2022-02-02 20:32:17","str_modifiedDate":"2022-02-02 20:32:17","bln_palettePin":true,"bln_typeable":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true,"bln_classController":true}}],
[126, {"obj_design":{"int_idRecord":126,"str_idXDesign":"myId_43168907","str_name":"tableheader","str_variableName":"tableheader","str_type":"tableheader","str_tag":"th","str_createdDate":"2022-02-02 20:33:17","str_modifiedDate":"2022-02-02 20:33:17","bln_palettePin":true,"bln_typeable":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[128, {"obj_design":{"int_idRecord":128,"str_idXDesign":"myId_23360686","str_name":"textarea","str_variableName":"textarea","str_type":"textarea","str_tag":"textarea","str_createdDate":"2022-02-02 20:34:27","str_modifiedDate":"2022-02-02 20:34:27","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[129, {"obj_design":{"int_idRecord":129,"str_idXDesign":"myId_63063741","str_name":"texteditor","str_variableName":"texteditor","str_type":"texteditor","str_tag":"texteditor","str_createdDate":"2022-02-02 20:36:02","str_modifiedDate":"2022-02-02 20:36:02","str_nameEditorTheme":"snow","bln_useHTML":true,"bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[130, {"obj_design":{"int_idRecord":130,"str_idXDesign":"myId_22222444","str_name":"textnode","str_variableName":"textnode","str_type":"textnode","str_tag":"txt","str_createdDate":"2022-02-02 20:43:41","str_modifiedDate":"2022-02-02 20:43:41","blnIsTag":true,"bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true}}],
[200, {"obj_design":{"int_idRecord":200,"str_idXDesign":"myId_33303063","str_name":"navelement","str_variableName":"navelement","str_type":"div","str_tag":"button","str_createdDate":"2022-02-02 20:37:35","str_modifiedDate":"2022-02-02 20:37:35","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_createRelease":"false","bln_isLocalHome":true},"obj_domStyle":{"width":"10px","height":"10px","padding":"10px","margin":"10px","cursor":"pointer"}}],
[2435, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3227","str_type":"block"}},{"obj_design":{"int_idRecord":"3228","str_type":"block"}}],"int_idRecord":2435,"str_name":"xdesign1_managersettings","str_type":"xdesign1_managersettings","str_tag":"xdesign1_managersettings","bln_registerAtProject":true,"str_classExtend":"xdesign1_managermenu","bln_palettePin":true,"bln_isLocalHome":true,"str_idXDesign":"myId_38639474","str_idProject":"myId_11188187","position":"relative","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26","str_variableName":"xdesign1_managersettings"},"obj_domStyle":{"flex-wrap":"wrap","position":"relative","flex-direction":"column","display":"flex","flex-flow":"column wrap","width":"100%","overflow":"auto","cursor":"default"},"int_offset":0,"int_limit":0}],
[2443, {"obj_design":{"str_type":"xdesign1_xcreatebackup","str_name":"xdesign1_xcreatebackup","int_idRecord":2443,"str_tag":"button","str_content":"My button","str_classExtend":"button","str_text":"XCreate Backup","bln_isLocalHome":true,"str_idXDesign":"myId_38873086","str_idProject":"myId_11188187","str_nameRegistrator":"xdesign1_managersettings","str_variableName":"xdesign1_xcreatebackup","str_createdDate":"2022-0-22 14:57:1","str_modifiedDate":"2022-0-22 14:57:1","bln_typeable":true,"str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"XCreate Backup"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white","display":"block"}}],
[2445, {"obj_design":{"str_type":"xdesign1_import","str_name":"xdesign1_import","int_idRecord":2445,"str_tag":"button","str_content":"My button","str_classExtend":"button","str_text":"Import","bln_isLocalHome":true,"str_idXDesign":"myId_67783374","str_idProject":"myId_11188187","bln_registerAtContainer":true,"str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"Import"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[2457, {"obj_design":{"str_type":"xdesign1_newproject","str_name":"xdesign1_newproject","int_idRecord":2457,"str_tag":"button","str_content":"My button","str_classExtend":"button","str_text":"New","bln_isLocalHome":true,"bln_registerAtContainer":true,"str_idXDesign":"myId_80466641","str_idProject":"myId_11188187","str_variableName":"xdesign1_newproject","str_createdDate":"2022-0-30 18:44:19","str_modifiedDate":"2022-0-30 18:44:19","bln_typeable":true,"str_urlServer":"server.php","bln_createRelease":"false","str_categoryList":"XDesign","bln_lockComponent":true,"bln_palettePin":true,"str_nameTheme":"themebutton","obj_enabled":{"cursor":"pointer","color":"white"}},"obj_domProperty":{"innerText":"New"},"obj_domStyle":{"padding":"3px 12px","border":"0px solid black","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","height":"40px","background-color":"rgb(65, 65, 65)","display":"block","cursor":"pointer","color":"white"}}],
[2703, {"obj_design":{"int_idRecord":"2703","str_idXDesign":"myId_36262766","str_name":"xdesign1_objectmap","str_type":"xdesign1_objectmap","str_tag":"xdesign1_objectmap","str_classList":"navelement","str_classExtend":"tag","bln_palettePin":true,"bln_maintainId":true,"bln_isLocalHome":true},"obj_domStyle":{"display":"block"}}],
[2716, {"obj_design":{"int_idRecord":"2716","str_idXDesign":"myId_06036640","str_name":"xdesign1_objectaction","str_type":"xdesign1_objectaction","str_tag":"xdesign1_objectaction","str_classExtend":"tag","bln_palettePin":true,"bln_isLocalHome":true},"obj_domStyle":{"display":"block"}}],
[2801, {"obj_design":{"int_idRecord":"2801","str_idXDesign":"myId_73730761","str_name":"xdesign1_propertydesignui","str_type":"xdesign1_propertydesignui","str_tag":"xdesign1_propertydesignui","bln_palettePin":true,"bln_maintainId":true,"bln_isLocalHome":true},"obj_domStyle":{"display":"block"}}],
[2803, {"obj_design":{"int_idRecord":"2803","str_idXDesign":"myId_61677166","str_name":"xdesign1_propertydesign","str_type":"xdesign1_propertydesign","str_tag":"xdesign1_propertydesign","str_classExtend":"propertysheet","bln_palettePin":true,"bln_maintainId":true,"bln_isLocalHome":true},"obj_domStyle":{"display":"block"}}],
[2804, {"obj_design":{"int_idRecord":2804,"str_idXDesign":"myId_77799267","str_name":"xdesign1_propertysheet","str_type":"xdesign1_propertysheet","str_tag":"xdesign1_propertysheet","str_classExtend":"tag","bln_palettePin":true,"bln_maintainId":true,"bln_isLocalHome":true,"str_classList":"input,table"},"obj_domStyle":{"display":"block"}}],
[2950, {"obj_design":{"int_idRecord":2950,"str_idXDesign":"myId_23295222","str_name":"xdesign1_propertydomstyle","str_type":"xdesign1_propertydomstyle","str_tag":"xdesign1_propertydomstyle","str_classExtend":"xdesign1_propertysheet","bln_isLocalHome":true,"str_classList":"input,table","bln_palettePin":true,"bln_maintainId":true},"obj_domStyle":{"display":"block"}}],
[2953, {"obj_design":{"int_idRecord":2953,"str_idXDesign":"myId_26227662","str_name":"xdesign1_propertydomproperty","str_type":"xdesign1_propertydomproperty","str_tag":"xdesign1_propertydomproperty","str_classExtend":"xdesign1_propertysheet","bln_palettePin":true,"bln_isLocalHome":true}}],
[2955, {"obj_design":{"int_idRecord":"2955","str_idXDesign":"myId_43616051","str_name":"xdesign1_propertydomattribute","str_type":"xdesign1_propertydomattribute","str_tag":"xdesign1_propertydomattribute","str_classExtend":"xdesign1_propertysheet","bln_palettePin":true,"bln_isLocalHome":true}}],
[2981, {"obj_design":{"str_type":"xdesign1_xcompile","str_name":"xdesign1_xcompile","int_idRecord":2981,"str_idXDesign":"myId_67296791","str_idProject":"myId_11188187","str_tag":"button","str_content":"My button","str_text":"XCompile","str_classExtend":"button","bln_isLocalHome":true,"str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"XCompile"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-r-adius":"4px","border-radius":"4px","background-color":"#414141"}}],
[3056, {"obj_design":{"str_type":"texteditor","str_name":"xdesign1_console","int_idRecord":"3056","str_idXDesign":"myId_61855568","str_idProject":"myId_11188187","str_tag":"xdesign1_console","str_nameEditorTheme":"snow","str_nameRegistrator":"xdesign1_managersettings","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26","bln_useHTML":true,"str_variableName":"xdesign1_console"},"obj_domStyle":{"color":"white","width":"100%","height":"100%","display":"block"}}],
[3057, {"obj_design":{"str_type":"xdesign1_move","str_name":"xdesign1_move","int_idRecord":3057,"str_idProject":"myId_11188187","str_tag":"button","str_content":"My button","str_text":"XMove","str_classExtend":"button","bln_isLocalHome":true,"str_idXDesign":"myId_16143821","str_nameRegistrator":"xdesign1_managersettings"},"obj_domProperty":{"innerText":"XMove"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-r-adius":"4px","border-radius":"4px","background-color":"#414141"}}],
[3076, {"obj_design":{"int_idRecord":3076,"str_idXDesign":"myId_93777233","str_name":"xdesign1_theme","str_type":"theme","str_tag":"xdesign1_theme","bln_palettePin":true,"bln_maintainId":true,"bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":"3080","str_type":"grid"}}],"bln_registerAtProject":true,"str_idProject":"myId_11188187","str_variableName":"xdesign1_theme","str_createdDate":"2022-0-22 15:19:43","str_modifiedDate":"2022-0-22 15:19:43","str_urlServer":"server.php","bln_createRelease":"false","str_categoryList":"XDesign1"},"obj_domStyle":{"background-color":"rgb(43, 44, 52)","font-family":"Helvetica, Arial, sans-serif","display":"none"}}],
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
[3177, {"obj_design":{"int_idRecord":3177,"str_idXDesign":"myId_38655048","str_name":"LoginButton","str_type":"loginbutton","str_tag":"loginbutton","bln_isLocalHome":true,"typeSVG":"image/svg+xml","filterSVG":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","str_classExtend":"svgblock","pointerEventSVG":"none","bln_registerAtProject":true,"str_variableName":"loginbutton","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":"false","blnIsTag":true,"bln_palettePin":true,"str_urlServer":"server.php","dataSVG":"/app/shared/asset/power-off.svg","str_categoryList":"XDesign1"},"obj_domStyle":{"padding":"0px","align-self":"center","display":"block","width":"25px","height":"25px","margin-left":"auto","margin-right":"30px"}}],
[3192, {"obj_design":{"str_type":"loginpanel","str_name":"loginPanel","int_idRecord":3192,"str_idXDesign":"myId_87716375","str_idProject":"myId_11188187","str_tag":"loginpanel","str_classExtend":"panel","bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":3236,"str_type":"loginpanelform"}},{"obj_design":{"int_idRecord":"3514","str_type":"designfile"}},{"obj_design":{"int_idRecord":3520,"str_type":"loginbutton"}}],"bln_registerAtProject":true,"str_variableName":"loginpanel","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":true,"str_urlServer":"server.php","bln_palettePin":true,"str_categoryList":"XDesign1"},"obj_domStyle":{"overflow":"auto","zindex":"10","left":"0px","top":"0px","height":"100%","width":"100%","padding":"10px","flex-direction":"column","align-items":"center","background-color":"rgb(43, 44, 52)","font-family":"helvetica","visibility":"visible","display":"block"},"int_count":0}],
[3197, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3246","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3197","str_idXDesign":"myId_36888371","str_idProject":"myId_87716375","str_tag":"td","str_text":"xdesignblank","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3198, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3197","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3198","str_idXDesign":"myId_98606601","str_idProject":"myId_87716375","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"}}],
[3201, {"obj_design":{"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3201","str_idXDesign":"myId_33861760","str_idProject":"myId_87716375","str_tag":"td","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-28 7:42:45","str_modifiedDate":"2021-11-28 7:42:45","bln_createRelease":"false","arr_item":[{"obj_design":{"int_idRecord":"3402","str_type":"input"}}],"str_urlServer":"server.php"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3202, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3201","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3202","str_idXDesign":"myId_87338318","str_idProject":"myId_87716375","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"}}],
[3203, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3198","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3202","str_type":"tablerow"}},{"obj_design":{"int_idRecord":"3207","str_type":"tablerow"}}],"str_type":"table","str_name":"My table","int_idRecord":"3203","str_idXDesign":"myId_01505510","str_idProject":"myId_87716375","str_tag":"table","str_classList":"tablerow,tablecell,tableheader","str_variableName":"mytable","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"}}],
[3206, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3305","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3206","str_idXDesign":"myId_07738118","str_idProject":"myId_87716375","str_tag":"td","bln_typeable":true,"str_variableName":"mytablecell","str_createdDate":"2021-11-27 13:8:56","str_modifiedDate":"2021-11-27 13:8:56","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domStyle":{"padding":"0px","color":"gray"}}],
[3207, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3206","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3207","str_idXDesign":"myId_31170818","str_idProject":"myId_87716375","str_tag":"tr","str_variableName":"mytablerow","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"}}],
[3227, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":2443,"str_type":"xdesign1_xcreatebackup"}},{"obj_design":{"int_idRecord":2445,"str_type":"xdesign1_import"}},{"obj_design":{"int_idRecord":2981,"str_type":"xdesign1_xcompile"}},{"obj_design":{"int_idRecord":3057,"str_type":"xdesign1_move"}},{"obj_design":{"int_idRecord":3381,"str_type":"xdesign1_release"}},{"obj_design":{"int_idRecord":3621,"str_type":"xdesign1_xmaintain"}},{"obj_design":{"int_idRecord":"4276","str_type":"desktopnavigationbutton"}}],"str_type":"block","str_name":"My block","int_idRecord":"3227","str_idProject":"myId_11188187","str_tag":"block","str_idXDesign":"myId_30136815","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26","str_variableName":"myblock","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domStyle":{"display":"flex","flow-flow":"row wrap","flex-flow":"row wrap"}}],
[3228, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3056","str_type":"texteditor"}}],"str_type":"block","str_name":"My block","int_idRecord":"3228","str_idProject":"myId_11188187","str_tag":"block","str_idXDesign":"myId_46803442","str_createdDate":"2021-11-18 13:2:26","str_modifiedDate":"2021-11-18 13:2:26","str_variableName":"myblock"},"obj_domStyle":{"display":"flex","flow-flow":"row wrap","flex-flow":"row wrap"}}],
[3229, {"obj_design":{"str_type":"input","str_name":"My input","int_idRecord":"3229","str_idProject":"myId_93777233","str_tag":"input","bln_themeType":true,"str_idXDesign":"myId_94454041"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px"}}],
[3230, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3229","str_type":"input"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3230","str_idXDesign":"myId_81377959","str_idProject":"myId_93777233","str_tag":"td"}}],
[3231, {"obj_design":{"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3231","str_idXDesign":"myId_28827369","str_idProject":"myId_93777233","str_tag":"td"}}],
[3232, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"3232","str_idXDesign":"myId_49595816","str_idProject":"myId_93777233","str_tag":"button","str_content":"My button","str_text":"My button"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","color":"white"}}],
[3233, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3232","str_type":"button"}}],"str_type":"tablecell","str_name":"My tablecell","int_idRecord":"3233","str_idXDesign":"myId_10183300","str_idProject":"myId_93777233","str_tag":"td"}}],
[3234, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3231","str_type":"tablecell"}},{"obj_design":{"int_idRecord":"3233","str_type":"tablecell"}}],"str_type":"tablerow","str_name":"My tablerow","int_idRecord":"3234","str_idXDesign":"myId_83868966","str_idProject":"myId_93777233","str_tag":"tr"}}],
[3235, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3084","str_type":"table"}}],"str_type":"block","str_name":"My block","int_idRecord":"3235","str_idXDesign":"myId_01101168","str_idProject":"myId_93777233","str_tag":"block"},"obj_domStyle":{"display":"block","backgroundcolor":"red","background-color":"red"}}],
[3236, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3303","str_type":"tag"}}],"str_tag":"form","str_type":"loginpanelform","str_idXDesign":"myId_61366636","str_idProject":"myId_87716375","str_name":"loginpanelform","int_idRecord":3236,"blnIsTag":true,"bln_registerAtProject":true,"bln_isLocalHome":true,"str_variableName":"loginpanelform","str_createdDate":"2021-11-29 0:2:58","str_modifiedDate":"2021-11-29 0:2:58","bln_createRelease":"false","str_classExtend":"form","str_urlServer":"server.php","str_categoryList":"XDesign1"},"obj_domStyle":{"font-fmily":"helvetica"}}],
[3246, {"obj_design":{"str_type":"input","str_name":"xdesign1_AuthorizeUserEmail","int_idRecord":"3246","str_idXDesign":"myId_13131319","str_idProject":"myId_87716375","str_tag":"input","bln_registerAtProject":true,"str_variableName":"xdesign1_authorizeuseremail","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domProperty":{"type":"email","minlinegth":"5","maxlength":"100","size":"20","placeholder":"email address","required":true},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px","display":"block"}}],
[3303, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3203","str_type":"table"}},{"obj_design":{"int_idRecord":"3304","str_type":"tag"}}],"str_tag":"fieldset","str_type":"tag","str_idXDesign":"myId_61939443","str_idProject":"myId_87716375","str_name":"My tag","int_idRecord":"3303","blnIsTag":true,"str_variableName":"mytag","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false"}}],
[3304, {"obj_design":{"str_tag":"legend","str_type":"tag","str_content":"<p>XDesigner</p>","bln_typeable":true,"str_idXDesign":"myId_66993314","str_idProject":"myId_87716375","str_name":"My tag","int_idRecord":"3304","blnIsTag":true,"str_text":"<p>XDesigner</p>","str_variableName":"mytag","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domStyle":{"color":"white","background-color":"rgb(65, 65, 65)","padding":"3px 30px"}}],
[3305, {"obj_design":{"str_type":"input","str_name":"My input","int_idRecord":"3305","str_idXDesign":"myId_67197766","str_idProject":"myId_87716375","str_tag":"input","str_variableName":"myinput","str_createdDate":"2021-11-27 13:8:56","str_modifiedDate":"2021-11-27 13:8:56","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domProperty":{"type":"submit","value":"Sign In"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px"}}],
[3381, {"obj_design":{"str_type":"xdesign1_release","str_name":"xdesign1_release","int_idRecord":3381,"str_idProject":"myId_11188187","str_tag":"button","str_content":"My button","str_text":"XRelease","str_classExtend":"button","bln_isLocalHome":true,"str_nameRegistrator":"xdesign1_managersettings","str_createdDate":"2021-11-19 20:4:47","str_modifiedDate":"2021-11-19 20:4:47","bln_typeable":true,"str_idXDesign":"myId_40689098"},"obj_domProperty":{"innerText":"XRelease"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","color":"white","border-r-adius":"4px","border-radius":"4px","background-color":"#414141","display":"none"}}],
[3402, {"obj_design":{"str_type":"input","str_name":"xdesign1_AuthorizeUserPass","int_idRecord":"3402","str_idProject":"myId_87716375","str_tag":"input","bln_registerAtProject":true,"str_variableName":"xdesign1_authorizeuserpass","str_createdDate":"2021-11-29 8:50:28","str_modifiedDate":"2021-11-29 8:50:28","bln_createRelease":"false","str_idXDesign":"myId_16744640","str_urlServer":"server.php"},"obj_domProperty":{"minlinegth":"5","maxlength":"100","size":"20","placeholder":"One Time Pass","type":"text"},"obj_domStyle":{"padding":"10px","background-color":"rgb(65, 65, 65)","border":"medium none rgb(65, 65, 65)","color":"white","border-radius":"4px","display":"none"}}],
[3451, {"obj_design":{"str_type":"panel","str_name":"My panel","int_idRecord":"3451","str_idXDesign":"myId_21664382","str_idProject":"myId_84955184","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-8 14:24:57","str_modifiedDate":"2022-0-8 14:24:57","bln_createRelease":"false","str_urlServer":"server.php","arr_item":[{"obj_design":{"int_idRecord":"4277","str_type":"desktopnavigationbutton"}}]},"obj_domStyle":{"display":"flex","height":"100%","width":"100%","padding":"10px","overflow":"auto","background-color":"blue"}}],
[3452, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3451","str_type":"panel"}}],"str_type":"panel","str_name":"My panel","int_idRecord":"3452","str_idXDesign":"myId_21412696","str_idProject":"myId_84955184","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-8 14:24:55","str_modifiedDate":"2022-0-8 14:24:55","bln_createRelease":"false"},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","padding":"10px","overflow":"auto","width":"300px"}}],
[3453, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3452","str_type":"panel"}}],"int_idRecord":3453,"str_idXDesign":"myId_84955184","str_name":"ABC HasServer","str_variableName":"abchasserver","str_type":"abchasserver","str_tag":"abchasserver","str_createdDate":"2022-0-8 14:24:51","str_modifiedDate":"2022-0-8 14:24:51","bln_palettePin":true,"bln_createRelease":"false","bln_isLocalHome":true}}],
[3454, {"obj_design":{"str_type":"panel","str_name":"My panel","int_idRecord":"3454","str_idXDesign":"myId_31166661","str_idProject":"myId_15692536","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-8 14:58:59","str_modifiedDate":"2022-0-8 14:58:59","bln_createRelease":"false","arr_item":[{"obj_design":{"int_idRecord":"3461","str_type":"abchasserver"}}],"str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"display":"flex","height":"100%","width":"100%","padding":"10px","overflow":"auto","background-color":"red"}}],
[3455, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3454","str_type":"panel"}}],"str_type":"eazygriditem","str_idXDesign":"myId_53300165","str_idProject":"myId_15692536","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"3455","str_createdDate":"2022-0-8 14:58:55","str_modifiedDate":"2022-0-8 14:58:55","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_createRelease":"false","str_urlServer":"server.php","bln_classController":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[3457, {"obj_design":{"str_type":"eazygriditem","str_idXDesign":"myId_68555616","str_idProject":"myId_15692536","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"3457","str_createdDate":"2022-0-8 14:58:55","str_modifiedDate":"2022-0-8 14:58:55","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_createRelease":"false","str_urlServer":"server.php","arr_item":[{"obj_design":{"int_idRecord":"4518","str_type":"panel"}}],"bln_classController":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[3458, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3455","str_type":"eazygriditem"}},{"obj_design":{"int_idRecord":"3457","str_type":"eazygriditem"}}],"str_type":"eazygrid","str_name":"maingrid","int_idRecord":"3458","str_idXDesign":"myId_43534660","str_idProject":"myId_15692536","str_variableName":"maingrid","str_tag":"maingrid","str_createdDate":"2022-0-8 14:58:55","str_modifiedDate":"2022-0-8 14:58:55","bln_eazyGrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)","bln_createRelease":"false","str_urlServer":"server.php","bln_registerAtProject":true,"str_classList":"eazygriditem","int_axis":1,"bln_classController":"false"},"obj_domStyle":{"height":"100%","width":"100%","padding":"0px","overflow":"hidden","background-color":"#2b2c34","grid-gap":"10px","grid-auto-rows":"minmax(100px, 1fr)","grid-auto-columns":"minmax(100px, 1fr)","grid-template-rows":"minmax(100px, 1fr) minmax(100px, 1fr)","grid-template-columns":"minmax(100px, 1fr)","display":"grid"}}],
[3459, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3458","str_type":"eazygrid"}},{"obj_design":{"int_idRecord":3645,"str_type":"loginpanel"}}],"int_idRecord":3459,"str_idXDesign":"myId_15692536","str_name":"ABC Consumer","str_variableName":"abcconsumer","str_type":"abcconsumer","str_tag":"abcconsumer","str_createdDate":"2022-0-8 14:58:18","str_modifiedDate":"2022-0-8 14:58:18","bln_isLocalHome":true,"str_urlServer":"server.php","bln_addToDesktop":true,"str_categoryList":"MyGeneral","bln_palettePin":true,"bln_classController":true},"obj_domStyle":{"display":"block"}}],
[3460, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3451","str_type":"panel"}}],"str_type":"panel","str_name":"My panel","int_idRecord":"3460","str_idXDesign":"myId_21412696","str_idProject":"myId_84955184","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-8 14:24:55","str_modifiedDate":"2022-0-8 14:24:55","bln_createRelease":"false","str_urlServer":"server.php"},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","padding":"10px","overflow":"auto","width":"300px"}}],
[3461, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3460","str_type":"panel"}}],"int_idRecord":"3461","str_idXDesign":"myId_84955184","str_name":"ABC HasServer","str_variableName":"abchasserver","str_type":"abchasserver","str_tag":"abchasserver","str_createdDate":"2022-0-8 14:24:51","str_modifiedDate":"2022-0-8 14:24:51","bln_palettePin":true,"bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_15692536","str_urlServer":"server.php"}}],
[3462, {"obj_design":{"str_type":"panel","str_name":"My panel","int_idRecord":"3462","str_idXDesign":"myId_14474464","str_idProject":"myId_44714498","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-9 17:15:19","str_modifiedDate":"2022-0-9 17:15:19","bln_createRelease":"false"},"obj_domStyle":{"display":"flex","height":"100%","width":"100%","padding":"10px","overflow":"auto","background-color":"red"}}],
[3463, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3462","str_type":"panel"}}],"str_type":"eazygriditem","str_idXDesign":"myId_41777441","str_idProject":"myId_44714498","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"3463","str_createdDate":"2022-0-9 17:15:11","str_modifiedDate":"2022-0-9 17:15:11","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_createRelease":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[3464, {"obj_design":{"str_type":"panel","str_name":"My panel","int_idRecord":"3464","str_idXDesign":"myId_11142141","str_idProject":"myId_44714498","str_variableName":"mypanel","str_tag":"panel","str_createdDate":"2022-0-9 17:15:21","str_modifiedDate":"2022-0-9 17:15:21","bln_createRelease":"false"},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","width":"100%","padding":"10px","overflow":"auto"}}],
[3465, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3464","str_type":"panel"}}],"str_type":"eazygriditem","str_idXDesign":"myId_44114818","str_idProject":"myId_44714498","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"3465","str_createdDate":"2022-0-9 17:15:11","str_modifiedDate":"2022-0-9 17:15:11","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_createRelease":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[3466, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3463","str_type":"eazygriditem"}},{"obj_design":{"int_idRecord":"3465","str_type":"eazygriditem"}}],"str_type":"eazygrid","str_name":"My eazygrid","int_idRecord":"3466","str_idXDesign":"myId_74114491","str_idProject":"myId_44714498","str_variableName":"myeazygrid","str_tag":"eazygrid","str_createdDate":"2022-0-9 17:15:11","str_modifiedDate":"2022-0-9 17:15:11","bln_eazyGrid":true,"str_minDim":"100px","str_gridTemplateDefault":"minmax(100px, 1fr)","bln_createRelease":"false"},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","overflow":"hidden","background-color":"#2b2c34","grid-gap":"10px","grid-auto-rows":"minmax(100px, 1fr)","grid-auto-columns":"minmax(100px, 1fr)","grid-template-rows":"minmax(100px, 1fr) minmax(100px, 1fr)","grid-template-columns":"minmax(100px, 1fr)"}}],
[3467, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3466","str_type":"eazygrid"}}],"int_idRecord":"3467","str_idXDesign":"myId_44714498","str_name":"TestXYZ","str_variableName":"testxyz","str_type":"component","str_tag":"component","str_createdDate":"2022-0-9 17:14:57","str_modifiedDate":"2022-0-9 17:14:57","bln_palettePin":true,"bln_createRelease":"false","bln_isLocalHome":true}}],
[3485, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3486","str_type":"grid"}}],"int_idRecord":3485,"str_idXDesign":"myId_49309531","str_name":"My CRM","str_variableName":"mycrm","str_type":"component","str_tag":"component","str_createdDate":"2022-0-12 20:37:15","str_modifiedDate":"2022-0-12 20:37:15","bln_createRelease":true,"bln_isLocalHome":true,"str_urlServer":"server.php","bln_palettePin":true,"str_categoryList":"general"}}],
[3486, {"obj_design":{"str_type":"grid","str_name":"My grid","int_idRecord":"3486","str_idXDesign":"myId_21996454","str_idProject":"myId_49309531","str_variableName":"mygrid","str_tag":"grid","str_createdDate":"2022-0-12 20:42:49","str_modifiedDate":"2022-0-12 20:42:49","str_minDim":"100px","bln_createRelease":"false","arr_item":[{"obj_design":{"int_idRecord":"3491","str_type":"accordion"}},{"obj_design":{"int_idRecord":"3496","str_type":"accordion"}}]},"obj_domStyle":{"display":"grid","height":"100%","width":"100%","padding":"0px","grid-gap":"10px","overflow":"hidden","grid-template-columns":"repeat(auto-fit, minmax(300px, 1fr))","grid-template-rows":"repeat(auto-fit, minmax(50px, 1fr))"}}],
[3487, {"obj_design":{"str_text":"Test A","str_type":"button","str_idXDesign":"myId_46610631","str_idProject":"myId_49309531","str_name":"My button","str_variableName":"mybutton","str_tag":"button","str_content":"Test A","int_idRecord":"3487","str_createdDate":"2022-0-12 20:43:56","str_modifiedDate":"2022-0-12 20:43:56","bln_typeable":true,"bln_createRelease":"false"},"obj_domProperty":{"innerText":"Test A"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3488, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3487","str_type":"button"}}],"str_text":"Group 1","str_idXDesign":"myId_21464112","str_type":"menubutton","str_idProject":"myId_49309531","str_name":"My menubutton","str_variableName":"mymenubutton","str_tag":"button","int_idRecord":"3488","str_createdDate":"2022-0-12 20:43:56","str_modifiedDate":"2022-0-12 20:43:56","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Group 1"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3489, {"obj_design":{"str_text":"Test B","str_type":"button","str_idXDesign":"myId_61116129","str_idProject":"myId_49309531","str_name":"My button","str_variableName":"mybutton","str_tag":"button","str_content":"Test B","int_idRecord":"3489","str_createdDate":"2022-0-12 20:43:56","str_modifiedDate":"2022-0-12 20:43:56","bln_typeable":true,"bln_createRelease":"false"},"obj_domProperty":{"innerText":"Test B"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3490, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3489","str_type":"button"}}],"str_text":"Group 2","str_idXDesign":"myId_30444940","str_type":"menubutton","str_idProject":"myId_49309531","str_name":"My menubutton","str_variableName":"mymenubutton","str_tag":"button","int_idRecord":"3490","str_createdDate":"2022-0-12 20:43:56","str_modifiedDate":"2022-0-12 20:43:56","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Group 2"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3491, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3488","str_type":"menubutton"}},{"obj_design":{"int_idRecord":"3490","str_type":"menubutton"}}],"str_type":"accordion","str_name":"My accordion","int_idRecord":"3491","str_idXDesign":"myId_96226066","str_idProject":"myId_49309531","str_variableName":"myaccordion","str_tag":"accordion","str_createdDate":"2022-0-12 20:43:56","str_modifiedDate":"2022-0-12 20:43:56","bln_createRelease":"false"},"obj_domStyle":{"width":"100%"}}],
[3492, {"obj_design":{"str_text":"Test A","str_type":"button","str_idXDesign":"myId_20611166","str_idProject":"myId_49309531","str_name":"My button","str_variableName":"mybutton","str_tag":"button","str_content":"Test A","int_idRecord":"3492","str_createdDate":"2022-0-12 20:44:3","str_modifiedDate":"2022-0-12 20:44:3","bln_typeable":true,"bln_createRelease":"false"},"obj_domProperty":{"innerText":"Test A"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3493, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3492","str_type":"button"}}],"str_text":"Group 1","str_idXDesign":"myId_42632461","str_type":"menubutton","str_idProject":"myId_49309531","str_name":"My menubutton","str_variableName":"mymenubutton","str_tag":"button","int_idRecord":"3493","str_createdDate":"2022-0-12 20:44:3","str_modifiedDate":"2022-0-12 20:44:3","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Group 1"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3494, {"obj_design":{"str_text":"Test B","str_type":"button","str_idXDesign":"myId_31366233","str_idProject":"myId_49309531","str_name":"My button","str_variableName":"mybutton","str_tag":"button","str_content":"Test B","int_idRecord":"3494","str_createdDate":"2022-0-12 20:44:3","str_modifiedDate":"2022-0-12 20:44:3","bln_typeable":true,"bln_createRelease":"false"},"obj_domProperty":{"innerText":"Test B"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3495, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3494","str_type":"button"}}],"str_text":"Group 2","str_idXDesign":"myId_32314332","str_type":"menubutton","str_idProject":"myId_49309531","str_name":"My menubutton","str_variableName":"mymenubutton","str_tag":"button","int_idRecord":"3495","str_createdDate":"2022-0-12 20:44:3","str_modifiedDate":"2022-0-12 20:44:3","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"Group 2"},"obj_domStyle":{"flex-direction":"row","flex-wrap":"wrap","display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[3496, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"3493","str_type":"menubutton"}},{"obj_design":{"int_idRecord":"3495","str_type":"menubutton"}}],"str_type":"accordion","str_name":"My accordion","int_idRecord":"3496","str_idXDesign":"myId_11212444","str_idProject":"myId_49309531","str_variableName":"myaccordion","str_tag":"accordion","str_createdDate":"2022-0-12 20:44:3","str_modifiedDate":"2022-0-12 20:44:3","bln_createRelease":"false"},"obj_domStyle":{"width":"100%"}}],
[3514, {"obj_design":{"str_type":"designfile","str_name":"loginPanelServerManager","int_idRecord":"3514","str_idXDesign":"myId_75250001","str_idProject":"myId_87716375","str_variableName":"loginpanelservermanager","str_tag":"designfile","str_createdDate":"2022-0-19 9:29:0","str_modifiedDate":"2022-0-19 9:29:0","str_urlServer":"/app/xdesign1/server/server.php","bln_createRelease":"false","bln_registerAtProject":true}}],
[3520, {"obj_design":{"int_idRecord":3520,"str_idXDesign":"myId_38655048","str_name":"LoginButton","str_type":"loginbutton","str_tag":"loginbutton","bln_isLocalHome":true,"typeSVG":"image/svg+xml","filterSVG":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","str_classExtend":"svgblock","pointerEventSVG":"none","bln_registerAtProject":true,"str_variableName":"loginbutton","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":"false","blnIsTag":true,"str_urlServer":"server.php","str_idProject":"myId_87716375","dataSVG":"/app/shared/asset/power-off.svg"},"obj_domStyle":{"padding":"0px","align-self":"center","width":"25px","height":"25px","margin-left":"auto","margin-right":"30px","display":"none"}}],
[3621, {"obj_design":{"str_type":"xdesign1_xmaintain","str_name":"xdesign1_xmaintain","int_idRecord":3621,"str_idXDesign":"myId_31632081","str_idProject":"myId_11188187","str_variableName":"xdesign1_xmaintain","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-22 15:1:16","str_modifiedDate":"2022-0-22 15:1:16","bln_typeable":true,"str_text":"XMaintain","str_urlServer":"server.php","bln_createRelease":"false","bln_isLocalHome":true},"obj_domProperty":{"innerText":"XMaintain"},"obj_domStyle":{"padding":"3px 12px","border":"0px solid black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","height":"40px","background-color":"rgb(65, 65, 65)","color":"white"}}],
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
[3645, {"obj_design":{"str_type":"loginpanel","str_name":"loginPanel","int_idRecord":3645,"str_idXDesign":"myId_87716375","str_idProject":"myId_11188187","str_tag":"loginpanel","str_classExtend":"panel","bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":"3642","str_type":"loginpanelform"}},{"obj_design":{"int_idRecord":"3643","str_type":"designfile"}},{"obj_design":{"int_idRecord":"3644","str_type":"loginbutton"}}],"bln_registerAtProject":true,"str_variableName":"loginpanel","str_createdDate":"2021-11-28 11:5:55","str_modifiedDate":"2021-11-28 11:5:55","bln_createRelease":true,"str_urlServer":"server.php","bln_useExternalButton":true,"bln_classController":true},"obj_domStyle":{"overflow":"auto","zindex":"10","left":"0px","top":"0px","height":"100%","width":"100%","padding":"10px","flex-direction":"column","align-items":"center","background-color":"rgb(43, 44, 52)","font-family":"helvetica","visibility":"visible","display":"flex"},"int_count":0}],
[3728, {"obj_design":{"int_idRecord":3728,"str_idXDesign":"myId_09972907","str_name":"DesktopNavigationButton","str_variableName":"desktopnavigationbutton","str_type":"desktopnavigationbutton","str_tag":"desktopnavigationbutton","bln_registerAtProject":true,"str_classExtend":"svgblock","str_createdDate":"2022-0-24 8:28:4","str_modifiedDate":"2022-0-24 8:28:4","bln_palettePin":true,"str_urlServer":"server.php","bln_createRelease":"false","bln_isLocalHome":true,"pointerEventSVG":"none","typeSVG":"image/svg+xml","dataSVG":"/app/shared/asset/exit-button.svg","str_urlNavigate":"https://www.mycode.buzz","str_categoryList":"XDesign1"},"obj_domStyle":{"padding":"0px","align-self":"center","display":"block","data":"this.obj_design.dataSVG=obj_path.fn_getURLAssetFile(this.obj_design.str_type, \"default.svg\")","filter":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","width":"25px","height":"25px","margin-right":"30px","margin-left":"auto"}}],
[3738, {"obj_design":{"int_idRecord":3738,"str_idXDesign":"myId_32633243","str_name":"programiconbutton","str_variableName":"programiconbutton","str_type":"programiconbutton","str_tag":"button","bln_registerAtProject":true,"str_createdDate":"2022-0-24 21:13:56","str_modifiedDate":"2022-0-24 21:13:56","str_urlServer":"server.php","bln_createRelease":"false","bln_isLocalHome":true,"bln_palettePin":true,"str_classExtend":"button","str_content":"programiconbutton","bln_typeable":true,"str_text":"programiconbutton","str_categoryList":"XDesign1"},"obj_domProperty":{"innerText":"programiconbutton"},"obj_domStyle":{"color":"black","border-radius":"10px","backgrodund-color":"orange","background-color":"orange","display":"block","height":"80px","padding":"1em","border":"5px solid black","cursor":"pointer","margin-right":"10px","margin-bottom":"10px"}}],
[4276, {"obj_design":{"int_idRecord":"4276","str_idXDesign":"myId_88432288","str_name":"DesktopNavigationButton","str_variableName":"desktopnavigationbutton","str_type":"desktopnavigationbutton","str_tag":"desktopnavigationbutton","bln_registerAtProject":true,"str_classExtend":"svgblock","str_createdDate":"2022-0-24 8:28:4","str_modifiedDate":"2022-0-24 8:28:4","str_urlServer":"server.php","bln_createRelease":"false","bln_isLocalHome":true,"pointerEventSVG":"none","typeSVG":"image\/svg+xml","dataSVG":"\/app\/shared\/asset\/exit-button.svg","str_urlNavigate":"https:\/\/www.mycode.buzz","str_idProject":"myId_11188187"},"obj_domStyle":{"padding":"0px","align-self":"center","display":"block","data":"this.obj_design.dataSVG=obj_path.fn_getURLAssetFile(this.obj_design.str_type, \"default.svg\")","filter":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","width":"25px","height":"25px","margin-right":"30px","margin-left":"auto"}}],
[4277, {"obj_design":{"int_idRecord":"4277","str_idXDesign":"myId_77224326","str_name":"DesktopNavigationButton","str_variableName":"desktopnavigationbutton","str_type":"desktopnavigationbutton","str_tag":"desktopnavigationbutton","bln_registerAtProject":true,"str_classExtend":"svgblock","str_createdDate":"2022-0-24 8:28:4","str_modifiedDate":"2022-0-24 8:28:4","str_urlServer":"server.php","bln_createRelease":"false","bln_isLocalHome":true,"pointerEventSVG":"none","typeSVG":"image\/svg+xml","dataSVG":"\/app\/shared\/asset\/exit-button.svg","str_urlNavigate":"https:\/\/www.mycode.buzz","str_idProject":"myId_15692536"},"obj_domStyle":{"padding":"0px","align-self":"center","display":"block","data":"this.obj_design.dataSVG=obj_path.fn_getURLAssetFile(this.obj_design.str_type, \"default.svg\")","filter":"invert(69%) sepia(62%) saturate(5763%) hue-rotate(191deg) brightness(105%) contrast(101%)","width":"25px","height":"25px","margin-right":"30px","margin-left":"auto"}}],
[4285, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4341","str_type":"accordion"}}],"int_idRecord":4285,"str_idXDesign":"myId_44754904","str_name":"ABC Accordion","str_variableName":"abcaccordion","str_type":"abcaccordion","str_tag":"abcaccordion","str_createdDate":"2022-0-29 11:5:14","str_modifiedDate":"2022-0-29 11:5:14","str_urlServer":"server.php","bln_createRelease":"false","bln_isLocalHome":true,"str_categoryList":"MyGeneral,XMyCRM","bln_palettePin":true}}],
[4325, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4325","str_idXDesign":"myId_54751166","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:37:41","str_modifiedDate":"2022-0-29 13:37:41","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4326, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4325","str_type":"button"}}],"str_type":"menubutton","str_name":"My menubutton","int_idRecord":"4326","str_idXDesign":"myId_41381414","str_idProject":"myId_44754904","str_variableName":"mymenubutton","str_tag":"button","str_createdDate":"2022-0-29 13:37:21","str_modifiedDate":"2022-0-29 13:37:21","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My menubutton","str_urlServer":"server.php","bln_createRelease":"false","bln_isOpen":true},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My menubutton"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4327, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4327","str_idXDesign":"myId_49960559","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:38:25","str_modifiedDate":"2022-0-29 13:38:25","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4328, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4327","str_type":"button"}}],"str_type":"menubutton","str_name":"My menubutton","int_idRecord":"4328","str_idXDesign":"myId_83115963","str_idProject":"myId_44754904","str_variableName":"mymenubutton","str_tag":"button","str_createdDate":"2022-0-29 13:37:48","str_modifiedDate":"2022-0-29 13:37:48","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My menubutton","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My menubutton"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4329, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4329","str_idXDesign":"myId_94689908","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:38:28","str_modifiedDate":"2022-0-29 13:38:28","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4330, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4330","str_idXDesign":"myId_39139894","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:38:31","str_modifiedDate":"2022-0-29 13:38:31","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4331, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4329","str_type":"button"}},{"obj_design":{"int_idRecord":"4330","str_type":"button"}}],"str_type":"menubutton","str_name":"My menubutton","int_idRecord":"4331","str_idXDesign":"myId_93036459","str_idProject":"myId_44754904","str_variableName":"mymenubutton","str_tag":"button","str_createdDate":"2022-0-29 13:37:50","str_modifiedDate":"2022-0-29 13:37:50","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My menubutton","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My menubutton"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4332, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4332","str_idXDesign":"myId_59115115","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:38:36","str_modifiedDate":"2022-0-29 13:38:36","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4333, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4333","str_idXDesign":"myId_93457947","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:38:38","str_modifiedDate":"2022-0-29 13:38:38","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4334, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4334","str_idXDesign":"myId_99540449","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:38:42","str_modifiedDate":"2022-0-29 13:38:42","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4335, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4332","str_type":"button"}},{"obj_design":{"int_idRecord":"4333","str_type":"button"}},{"obj_design":{"int_idRecord":"4334","str_type":"button"}}],"str_type":"menubutton","str_name":"My menubutton","int_idRecord":"4335","str_idXDesign":"myId_37323124","str_idProject":"myId_44754904","str_variableName":"mymenubutton","str_tag":"button","str_createdDate":"2022-0-29 13:37:53","str_modifiedDate":"2022-0-29 13:37:53","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My menubutton","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My menubutton"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4336, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4328","str_type":"menubutton"}},{"obj_design":{"int_idRecord":"4331","str_type":"menubutton"}},{"obj_design":{"int_idRecord":"4335","str_type":"menubutton"}}],"str_type":"accordion","str_name":"My accordion","int_idRecord":"4336","str_idXDesign":"myId_36844447","str_idProject":"myId_44754904","str_variableName":"myaccordion","str_tag":"accordion","str_createdDate":"2022-0-29 13:37:47","str_modifiedDate":"2022-0-29 13:37:47","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domStyle":{"width":"100%","display":"block"}}],
[4337, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4336","str_type":"accordion"}}],"str_type":"menubutton","str_name":"My menubutton","int_idRecord":"4337","str_idXDesign":"myId_61932222","str_idProject":"myId_44754904","str_variableName":"mymenubutton","str_tag":"button","str_createdDate":"2022-0-29 13:37:24","str_modifiedDate":"2022-0-29 13:37:24","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My menubutton","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My menubutton"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4338, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4326","str_type":"menubutton"}},{"obj_design":{"int_idRecord":"4337","str_type":"menubutton"}}],"str_type":"accordion","str_name":"My accordion","int_idRecord":"4338","str_idXDesign":"myId_97318776","str_idProject":"myId_44754904","str_variableName":"myaccordion","str_tag":"accordion","str_createdDate":"2022-0-29 13:37:18","str_modifiedDate":"2022-0-29 13:37:18","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domStyle":{"width":"100%","display":"block"}}],
[4339, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4338","str_type":"accordion"}}],"str_type":"menubutton","str_name":"My menubutton","int_idRecord":"4339","str_idXDesign":"myId_16513614","str_idProject":"myId_44754904","str_variableName":"mymenubutton","str_tag":"button","str_createdDate":"2022-0-29 13:36:56","str_modifiedDate":"2022-0-29 13:36:56","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My menubutton","str_urlServer":"server.php","bln_createRelease":"false","bln_isOpen":true},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My menubutton"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4340, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4342","str_type":"button"}}],"str_type":"menubutton","str_name":"My menubutton","int_idRecord":"4340","str_idXDesign":"myId_43994524","str_idProject":"myId_44754904","str_variableName":"mymenubutton","str_tag":"button","str_createdDate":"2022-0-29 13:37:1","str_modifiedDate":"2022-0-29 13:37:1","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My menubutton","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My menubutton"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4341, {"obj_design":{"arr_item":[{"obj_design":{"int_idRecord":"4339","str_type":"menubutton"}},{"obj_design":{"int_idRecord":"4340","str_type":"menubutton"}}],"str_type":"accordion","str_name":"My accordion","int_idRecord":"4341","str_idXDesign":"myId_16133669","str_idProject":"myId_44754904","str_variableName":"myaccordion","str_tag":"accordion","str_createdDate":"2022-0-29 13:36:54","str_modifiedDate":"2022-0-29 13:36:54","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domStyle":{"width":"100%","display":"block"}}],
[4342, {"obj_design":{"str_type":"button","str_name":"My button","int_idRecord":"4342","str_idXDesign":"myId_53717511","str_idProject":"myId_44754904","str_variableName":"mybutton","str_tag":"button","str_content":"My button","str_createdDate":"2022-0-29 13:38:57","str_modifiedDate":"2022-0-29 13:38:57","bln_typeable":true,"str_text":"My button","str_urlServer":"server.php","bln_createRelease":"false"},"obj_domProperty":{"innerText":"My button"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4343, {"obj_design":{"int_idRecord":4343,"str_idXDesign":"myId_27762672","str_name":"menubuttonpalettepinned","str_variableName":"menubuttonpalettepinned","str_type":"menubuttonpalettepinned","str_tag":"button","str_createdDate":"2022-0-29 17:27:59","str_modifiedDate":"2022-0-29 17:27:59","str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick","str_text":"My component","str_urlServer":"server.php","bln_createRelease":"false","bln_lockComponent":true,"bln_isLocalHome":true,"str_classExtend":"menubutton","bln_isOpen":true,"bln_palettePin":true},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My component"},"obj_domAttribute":{"innertext":"My componentxx"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4378, {"obj_design":{"str_type":"input","bln_registerAtContainer":true,"str_idXDesign":"myId_93347176","str_idProject":"myId_77627280","str_name":"My input","str_variableName":"myinput","str_tag":"input","int_idRecord":"4378","str_createdDate":"2022-02-02 20:01:13","str_modifiedDate":"2022-02-02 20:01:13","bln_createRelease":"false"},"obj_domProperty":{},"obj_domStyle":{"margin-right":"3px"}}],
[4379, {"obj_design":{"str_type":"xdesign1_addtagbutton","str_name":"My component","str_linkId":"myId_93347176","str_idXDesign":"myId_20642864","str_idProject":"myId_77627280","str_variableName":"mycomponent","str_tag":"component","int_idRecord":"4379","str_createdDate":"2022-02-02 20:01:14","str_modifiedDate":"2022-02-02 20:01:14","blnIsTag":true,"bln_createRelease":"false"}}],
[4399, {"obj_design":{"int_idRecord":4399,"str_idXDesign":"myId_41641664","str_name":"recordset","str_variableName":"recordset","str_type":"recordset","str_tag":"designfile","str_createdDate":"2022-02-06 15:20:46","str_modifiedDate":"2022-02-06 15:20:46","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_isLocalHome":true,"str_classExtend":"designfile"}}],
[4401, {"obj_design":{"int_idRecord":4401,"str_idXDesign":"myId_46441417","str_name":"smartbutton","str_variableName":"smartbutton","str_type":"smartbutton","str_tag":"button","str_classExtend":"menubutton","str_createdDate":"2022-02-06 20:54:30","str_modifiedDate":"2022-02-06 20:54:30","bln_palettePin":true,"str_categoryList":"MyToolBox","str_text":"My Smart Button","bln_isLocalHome":true,"bln_isMenuButton":true,"bln_isOpen":true,"str_nameEventClick":"xDesign_MenuButtonClick","str_valueEventClick":"fn_MenuButtonClick"},"obj_domProperty":{"xDesign_MenuButtonClick":"fn_MenuButtonClick","innerText":"My Smart Button"},"obj_domStyle":{"display":"block","width":"100%","height":"45px","padding":"3px 12px","border":"0px solid black","font-size":"12pt","cursor":"pointer","margin-right":"0px","margin-bottom":"1px"},"obj_nativeEvent":{"isTrusted":true},"obj_projectEvent":{"obj_design":{"int_idRecord":0,"str_type":"button"}}}],
[4424, {"obj_design":{"int_idRecord":"4424","str_idXDesign":"myId_14661169","str_name":"xdesign1_managercategory","str_variableName":"xdesign1_managercategory","str_type":"xdesign1_managercategory","str_tag":"xdesign1_managercategory","str_createdDate":"2022-02-09 15:07:15","str_modifiedDate":"2022-02-09 15:07:15","bln_palettePin":true,"str_categoryList":"xdesign1","bln_isLocalHome":true}}],
[4425, {"obj_design":{"int_idRecord":"4425","str_idXDesign":"myId_10471075","str_name":"xdesign1_managercategoryproject","str_variableName":"xdesign1_managercategoryproject","str_type":"xdesign1_managercategoryproject","str_tag":"xdesign1_managercategoryproject","str_createdDate":"2022-02-11 19:35:21","str_modifiedDate":"2022-02-11 19:35:21","bln_palettePin":true,"str_categoryList":"XDesign","bln_isLocalHome":true}}],
[4426, {"obj_design":{"int_idRecord":"4426","str_idXDesign":"myId_62644118","str_name":"xdesign1_managercategorypalette","str_variableName":"xdesign1_managercategorypalette","str_type":"xdesign1_managercategorypalette","str_tag":"xdesign1_managercategorypalette","str_classExtend":"xdesign1_managermenu","str_createdDate":"2022-02-11 19:56:54","str_modifiedDate":"2022-02-11 19:56:54","bln_palettePin":true,"str_categoryList":"XDesign","bln_isLocalHome":true}}],
[4517, {"obj_design":{"int_idRecord":"4517","str_idXDesign":"myId_65115254","str_name":"button","str_variableName":"button","str_type":"button","str_tag":"button","str_content":"My component","str_createdDate":"2022-02-02 19:54:40","str_modifiedDate":"2022-02-02 19:54:40","bln_typeable":true,"str_text":"My component","bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_15692536"},"obj_domProperty":{"innerText":"My component"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[4518, {"obj_design":{"int_idRecord":"4518","str_name":"panel","str_variableName":"panel","str_type":"panel","str_tag":"panel","str_createdDate":"2022-02-02 20:10:52","str_modifiedDate":"2022-02-02 20:10:52","bln_createRelease":"false","bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":"4517","str_type":"button"}},{"obj_design":{"int_idRecord":"4682","str_type":"button"}}],"str_idProject":"myId_15692536","str_idXDesign":"myId_66165466"},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","width":"100%","padding":"10px","overflow":"auto"}}],
[4611, {"obj_design":{"str_type":"xdesign1_saveproject","str_name":"xdesign1_saveproject","int_idRecord":4611,"str_tag":"button","str_content":"My button","str_classExtend":"button","str_text":"Save","bln_isLocalHome":true,"bln_registerAtContainer":true,"str_idXDesign":"myId_69116086","str_idProject":"myId_11188187","str_variableName":"xdesign1_saveproject","str_createdDate":"2022-0-30 18:44:19","str_modifiedDate":"2022-0-30 18:44:19","bln_typeable":true,"str_urlServer":"server.php","bln_createRelease":"false","str_categoryList":"XDesign","bln_palettePin":true,"str_nameTheme":"themebutton","obj_enabled":{"cursor":"pointer","color":"white"}},"obj_domProperty":{"innerText":"Save","disabled":true},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","margin-right":"1px","margin-bottom":"1px","background-color":"rgb(65, 65, 65)","border-radius":"4px","pointer-events":"none","cursor":"default","color":"gray"}}],
[4682, {"obj_design":{"int_idRecord":"4682","str_name":"button","str_variableName":"button","str_type":"button","str_tag":"button","str_content":"My component","str_createdDate":"2022-02-02 19:54:40","str_modifiedDate":"2022-02-02 19:54:40","bln_typeable":true,"str_text":"My component","bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_15692536","str_idXDesign":"myId_11644169"},"obj_domProperty":{"innerText":"My component"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[5031, {"obj_design":{"int_idRecord":"5031","str_idXDesign":"myId_05914684","str_name":"xdesign1_managercomponent","str_variableName":"xdesign1_managercomponent","str_type":"xdesign1_managercomponent","str_tag":"xdesign1_managercomponent","bln_registerAtProject":true,"str_classExtend":"xdesign1_managermenu","str_createdDate":"2022-02-16 14:57:19","str_modifiedDate":"2022-02-16 14:57:19","bln_palettePin":true,"str_categoryList":"XDesign","bln_isLocalHome":true}}],
[5752, {"obj_design":{"int_idRecord":"5752","str_idXDesign":"myId_86726098","str_name":"xdesign1_closeproject","str_variableName":"xdesign1_closeproject","str_type":"xdesign1_closeproject","str_tag":"button","bln_registerAtContainer":true,"str_classExtend":"button","str_createdDate":"2022-02-17 11:22:27","str_modifiedDate":"2022-02-17 11:22:27","bln_isLocalHome":true,"str_idProject":"myId_11188187","str_content":"xdesign_closeproject","bln_typeable":true,"str_text":"Close","str_nameTheme":"themebutton","obj_enabled":{"cursor":"pointer","color":"white"},"bln_palettePin":true,"str_categoryList":"XDesign"},"obj_domProperty":{"innerText":"Close","disabled":true},"obj_domStyle":{"padding":"3px 12px","border":"0px solid black","margin-right":"1px","margin-bottom":"1px","border-radius":"4px","height":"40px","background-color":"rgb(65, 65, 65)","display":"none","pointer-events":"none","cursor":"default","color":"gray"}}],
[5780, {"obj_design":{"int_idRecord":5780,"str_idXDesign":"myId_45515453","str_name":"xdesign1_openproject","str_variableName":"xdesign1_openproject","str_type":"xdesign1_openproject","str_tag":"button","bln_registerAtContainer":true,"str_classExtend":"button","str_createdDate":"2022-02-18 20:38:36","str_modifiedDate":"2022-02-18 20:38:36","bln_palettePin":true,"str_categoryList":"XDesign","bln_isLocalHome":true,"str_content":"xdesign_openproject","bln_typeable":true,"str_text":"Open","str_nameTheme":"themebutton"},"obj_domProperty":{"innerText":"Open"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[5799, {"obj_design":{"int_idRecord":5799,"str_idXDesign":"myId_56476156","str_name":"Toolbar","str_variableName":"toolbar","str_type":"toolbar","str_tag":"toolbar","bln_registerAtContainer":true,"str_classExtend":"flex","str_createdDate":"2022-02-19 12:08:55","str_modifiedDate":"2022-02-19 12:08:55","bln_palettePin":true,"str_categoryList":"MyToolbox","bln_isLocalHome":true}}],
[5921, {"obj_design":{"str_type":"eazygriditem","str_idXDesign":"myId_66248164","str_idProject":"myId_54166875","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"5921","str_createdDate":"2022-02-21 18:51:32","str_modifiedDate":"2022-02-21 18:51:32","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_classController":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[5922, {"obj_design":{"str_type":"eazygriditem","str_idXDesign":"myId_64546152","str_idProject":"myId_54166875","str_name":"My eazygriditem","str_variableName":"myeazygriditem","str_tag":"eazygriditem","int_idRecord":"5922","str_createdDate":"2022-02-21 18:51:32","str_modifiedDate":"2022-02-21 18:51:32","str_minDim":"100px","gridTemplate":"minmax(100px, 1fr)","bln_classController":"false"},"obj_domStyle":{"background-color":"#414141"}}],
[5936, {"obj_design":{"int_idRecord":5936,"str_idXDesign":"myId_74756805","str_name":"My component rtest","str_variableName":"mycomponentrtest","str_type":"component","str_tag":"component","bln_classController":"false","str_createdDate":"2022-02-26 08:32:20","str_modifiedDate":"2022-02-26 08:32:20","str_categoryList":"MyGeneral","bln_isLocalHome":true,"arr_item":[{"obj_design":{"int_idRecord":5937,"str_type":"panel"}}],"bln_palettePin":true}}],
[5937, {"obj_design":{"int_idRecord":5937,"str_idXDesign":"myId_79636946","str_name":"panel","str_variableName":"panel","str_type":"panel","str_tag":"panel","str_createdDate":"2022-02-02 20:10:52","str_modifiedDate":"2022-02-02 20:10:52","bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_74756805","arr_item":[{"obj_design":{"int_idRecord":"5938","str_type":"button"}},{"obj_design":{"int_idRecord":5942,"str_type":"button"}}],"bln_classController":"false"},"obj_domStyle":{"display":"flex","background-color":"orange","height":"100%","width":"100%","padding":"10px","overflow":"auto"}}],
[5938, {"obj_design":{"int_idRecord":"5938","str_idXDesign":"myId_55252151","str_name":"button","str_variableName":"button","str_type":"button","str_tag":"button","str_content":"My component","str_createdDate":"2022-02-02 19:54:40","str_modifiedDate":"2022-02-02 19:54:40","bln_typeable":true,"str_text":"My component","bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_74756805","bln_classController":"false"},"obj_domProperty":{"innerText":"My component"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}],
[5942, {"obj_design":{"int_idRecord":"5942","str_idXDesign":"myId_82811888","str_name":"button","str_variableName":"button","str_type":"button","str_tag":"button","str_content":"My component","str_createdDate":"2022-02-02 19:54:40","str_modifiedDate":"2022-02-02 19:54:40","bln_typeable":true,"str_text":"My component","bln_createRelease":"false","bln_isLocalHome":true,"str_idProject":"myId_74756805"},"obj_domProperty":{"innerText":"My component"},"obj_domStyle":{"height":"40px","padding":"3px 12px","border":"0px solid black","color":"black","cursor":"pointer","margin-right":"1px","margin-bottom":"1px"}}]
]);
/*END INSTANCE JSON MAP//*/


