var jsdiff = require('diff');
var fs = require('fs');
var path = require('path');
var typeOf = require('typeof');

var filePath = path.join(__dirname, '/users.json');
var cKeys = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

var filePath = path.join(__dirname, '/users2.json');
var dKeys = fs.readFileSync(filePath, {encoding: 'utf-8'},

function(err){console.log(err);});
var dif = jsdiff.diffChars(cKeys, dKeys);
console.log("hello",'4') 

{
  for(var i = 0, co = cKeys.length; i < co; i++){
    var key = cKeys[i];
    if(typeof (cKeys[key]) !== typeof (dKeys[key])){
      dif[key] = 'Type mismatch ' + names['c'] + ':' + typeof c[key] + '!==' + names['d'] + typeof d[key];
      console.log(dif[key],'1');
      continue;
    }
    if(typeof cKeys[key] === 'function'){
      if(cKeys[key].toString() !== dKeys[key].toString()){
        dif[key] = 'Differing functions';
      }console.log(dif[key],'2')
      continue;
    }
    if(typeof cKeys[key] === 'object'){
      if(cKeys[key].length !== undefined){ // array
        var temp = cKeys[key].slice(0);
        temp = temp.filter(function(el){
          return (dKeys[key].indexOf(el) === -1);
        });
        var message = '';
        if(temp.length > 0){
          message += names['c'] + ' excess ' + JSON.stringify(temp);
        }

        temp = dKeys[key].slice(0);
        temp = temp.filter(function(el){
          return (cKeys[key].indexOf(el) === -1);
        });
        if(temp.length > 0){
          message += ' and ' + names['d'] + ' excess ' + JSON.stringify(temp);
        }
        if(message !== ''){
          dif[key] = message;
        }console.log(dif[key],'3')
        continue;
      }
      var diff = deepEqualWithDiff(c[key], d[key], {a:names['c'],e:names['d']});
      if(diff !== true && Object.keys(diff).length > 0){
        dif[key] = diff;
      }console.log(dif[key],'4')
      continue;
    }
    // Simple types left so
    if(cKeys[key] !== dKeys[key]){
      dif[key] = names['c'] + ':' + cKeys[key] + ' !== ' + names['d'] + ':' + dKeys[key]; 
    }
  }
  return Object.keys(dif).length > 0 ? dif : true;
}
console.log(dif[key],'5');