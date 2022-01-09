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
