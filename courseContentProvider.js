var fs = require('fs');
var path = require('path');
var diff = require('deep-diff').diff;
var convertCSV = require('./convert_csvtojson.js');
var request = require('request');

var changedData = [];
var compareObjects = function(oldObject,newObject) {
	var changed = false;newObject
	for(key in oldObject){
		var oldValue = oldObject[key];
		var newValue = newObject[key];

		if(oldValue === newValue)
			continue;
		else{
			changed = true;
			break;
		}
	}

	return changed;
	}
var init = function() {

//read two JSON files
	var filePath = path.join(__dirname, '/file1.json');
var one = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err,one){if (err) throw err; var obj1 = JSON.parse(one);});
var oldData=JSON.parse(one);	//converting JSON files to Objects.

var filePath = path.join(__dirname, '/file2.json');
var two = fs.readFileSync(filePath, {encoding: 'utf-8'},
	function(err,data){if (err) throw err; var obj2 = JSON.parse(data);});
var newData=JSON.parse(two);

//Check if data has been deleted
if(newData.length < oldData.length)
{
	for(var k=newData.length; k <= oldData.length; k++ )
	{
		console.log(oldData[k]);
	}

}

//Check if data has been added
else if(newData.length > oldData.length)
{
for(var j=oldData.length; j<=newData.length; j++)
	{	console.log(newData[j]);
		oldData.push(newData[j]);
	}
}

//checking if the data has been modified
else if(newData.length === oldData.length){

	//Compare all elements
	for (var i = 0; i < oldData.length; i++) {
		var changed = compareObjects(oldData[i],newData[i]);
		if(changed === true){
			changedData.push(newData[i]);
		}
	}
}
console.log(changedData);
// console.log(oldData);	
}
console.log('before');
init()
console.log("output" );

request({
    	url: 'http://localhost:8081/messages', //URL to hit at the Entry point
    	method: 'POST',
    	headers: {
        	'Content-Type': 'MyContentType',
        	'Custom-Header': 'Custom Value'
    			},
   		 body: changedData
   		 }
   		,function(error, response, body){
    		if(error) {
        				console.log(error);}
        		
        		else {
        				console.log(response.statusCode, body);}
});
