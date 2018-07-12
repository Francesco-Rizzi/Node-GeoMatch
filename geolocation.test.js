console.log('--- TESTS ---'); //@todo setup NPM with a test suite

let errors   = 0;
let tests    = 0;
let promises = [];


const readData = require('./geolocation').readData;

//FILE NOT EXISTS
((function(){
	tests++;
	promises.push(readData('tofail').then(x => errors++).catch(e =>{
	}));
}))();

//FILE EXISTS
((function(){
	tests++;
	promises.push(readData('./data.json').then(x =>{
	}).catch(e => errors++));
}))();

//FILE EMPTY
((function(){
	tests++;
	promises.push(readData('./empty.json').then(x => errors++).catch(e =>{
	}));
}))();


const isWithinRadius = require('./geolocation').isGeoIncluded;
const basePosition   = require('./geolocation').basePosition;
const earthRadius    = require('./geolocation').earthRadius;
const includedRadius = require('./geolocation').includedRadius;

//OUTSIDE RADIUS
((function(){
	tests++;
	let user = {
		"latitude"  : "76.999447",
		"longitude" : "-9.742744",
		"user_id"   : 14,
		"name"      : "Helen Cahill"
	};
	let res  = isWithinRadius(user, basePosition, includedRadius, earthRadius);
	if ( res ) {
		errors++;
	}
}))();

//IN RADIUS
((function(){
	tests++;
	let user = {
		"latitude"  : "66.2451022",
		"longitude" : "-2.238335",
		"user_id"   : 4,
		"name"      : "Ian Kehoe"
}
	;let res = isWithinRadius(user, basePosition, includedRadius, earthRadius);
	if ( !res ) {
		errors++;
	}
}))();


Promise.all(promises).then(function( res ){
	console.log(`Executed ${tests} tests with ${errors} errors.`);
});