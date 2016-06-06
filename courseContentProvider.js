var fs = require('fs');
var path = require('path');
var diff = require('deep-diff').diff;

var changedData = [];

var compareObjects = function(oldObject,newObject) {
	var changed = false;
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

	var filePath = path.join(__dirname, '/file1.json');
var one = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err,one){if (err) throw err; var obj1 = JSON.parse(one);});
var oldData=JSON.parse(one);

var filePath = path.join(__dirname, '/file2.json');
var two = fs.readFileSync(filePath, {encoding: 'utf-8'},
	function(err,data){if (err) throw err; var obj2 = JSON.parse(data);});
var newData=JSON.parse(two);

//Check if data has been added
if(newData.length > oldData.length)
{
for(var j=oldData.length; j<=newData.length; j++)
	{	console.log(newData[j]);
		oldData.push(newData[j]);
	}
}
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
console.log(oldData);

	
}

init()