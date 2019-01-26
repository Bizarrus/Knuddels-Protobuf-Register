const Encoder = require('../main.js').Encoder;
const Decoder = require('../main.js').Decoder;

Encoder.check('nickname', function onSuccess(error, buffer) {
	if(error) {
		throw new Error(error);
	}
	
	
	console.log('Encoded (Binary)', buffer);
	console.log('Encoded (Base64)', buffer.toString('base64'));
	
	Decoder.execute(buffer, function onSuccess(error, data) {
		if(error) {
			throw new Error(error);
		}
		
		console.log('Decoded', data);
	});
});

Encoder.submit('nickname', 'password', 'male', 20, 7, function onSuccess(error, buffer) {
	if(error) {
		throw new Error(error);
	}
	
	
	console.log('Encoded (Binary)', buffer);
	console.log('Encoded (Base64)', buffer.toString('base64'));
	
	Decoder.execute(buffer, function onSuccess(error, data) {
		if(error) {
			throw new Error(error);
		}
		
		console.log('Decoded', data);
	});
});