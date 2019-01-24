const Encoder = require('./Encoder.js');

const nickname		= 'DeinNickname';
const password		= 'DeinPasswort';
const gender		= 'Male';
const age			= 28;
const category		= 7;

Encoder.check(nickname, function(error, buffer) {
	if(error) {
		throw new Error(error);
	}
	
	console.log(buffer.toString('base64'));
});

Encoder.submit(nickname, password, gender, age, category, function(error, buffer) {
	if(error) {
		throw new Error(error);
	}
	
	console.log(buffer.toString('base64'));
});
