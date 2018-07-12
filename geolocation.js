//Imports
const fs = require('fs');

//Initial data
const filename       = 'data.json';
const basePosition   = {
	latitude  : 66.330000,
	longitude : -3.440000,
};
const includedRadius = 100;
const earthRadius    = 6370;

//Functions
function readData( filename ){
	
	return new Promise(function( ful, rej ){
		
		fs.readFile('./' + filename, "utf8", ( err, data ) =>{
			if ( err ) {
				rej(err);
			}
			if(data === ""){
				rej(new Error());
			}
			ful(data);
		});
		
	});
	
}

function processUser( user, res ){
	
	if ( isGeoIncluded(user, basePosition, includedRadius, earthRadius) ) {
		
		res.push(user);
		
	}
	
}

function isGeoIncluded( user, basePosition, includedRadius, sphereRadius ){
	
	const sinSquare = n => Math.sin(n) * Math.sin(n);
	const toRadians = angle => angle * (Math.PI / 180);
	
	const dLat = toRadians(Math.abs(user.latitude - basePosition.latitude));
	const dLon = toRadians(Math.abs(user.longitude - basePosition.longitude));
	
	const angle    = 2 * Math.asin(Math.sqrt(sinSquare(dLat / 2) + Math.cos(toRadians(user.latitude)) * Math.cos(toRadians(basePosition.latitude)) * sinSquare(dLon / 2)));
	const distance = angle * sphereRadius;
	
	return distance <= includedRadius;
	
}

function execute(){
	
	return readData(filename).then(function( data ){
		
		let user, res = [];
		
		data.split('\n').forEach(function( line ){
			
			user = JSON.parse(line);
			processUser(user, res);
			
		});
		
		return Promise.resolve(res.sort(function( a, b ){
			
			return a.user_id - b.user_id;
			
		}));
		
	});
	
}

module.exports = {
	
	basePosition,
	includedRadius,
	earthRadius,
	
	readData,
	processUser,
	isGeoIncluded,
	execute
	
};