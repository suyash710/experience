require('colors')
var jsdiff = require('diff');
var fs = require('fs');
var path = require('path');
var diff = require('deep-diff').diff;

var filePath = path.join(__dirname, '/users.json');
var one = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

var filePath = path.join(__dirname, '/users2.json');
var two = fs.readFileSync(filePath, {encoding: 'utf-8'},
	function(err){console.log(err);});

// console.log(one);
// console.log(two); 
var differ = diff(one, two);
{
	if(differ==undefined)
	{console.log('no updates in file');}

	if(one.length > two.length )
	{
		console.log("values deleted");
		console.log('updated entities below - ');
		for (var i=0; i<one.length;i++)
		{
			if (typeof one[i]!= typeof two[i] )
			{
				compare[i] =typeof one[i];
				console.log("hello");
				console.log(differ);
				continue

			}
		}

	}
	else if(one.length < two.length )
	{
		console.log("values added");
		console.log('updated files below - ');
		console.log(differ);

	}
;	
}

// differ.map(function(part){
//   // green for additions, red for deletions 
//   // grey for blue 
//   var color = part.added ? 'green' :
//     part.removed ? 'red' : 'blue';
//   process.stderr.write(part.value[color]);
// console.log(); 
// console.log();