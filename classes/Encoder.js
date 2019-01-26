const protobuf = require('protobufjs');

module.exports = (new function Encoder() {
	this.check = function check(nickname, callback) {
		this.load({
			action:		'/registration.RegistrationRequest',
			data: {
				type:		'NICK',
				nickname:	nickname
			}
		}, callback);
	};
	
	this.submit = function submit(nickname, password, gender, age, category, callback) {
		this.load({
			action:		'/registration.RegistrationRequest',
			data: {
				type:			'FULL_REG_V1',
				nickname:		nickname,
			    age:			age,
			    gender:			gender,
			    password:		password,
			    category:		category,
			    dsgvoQuestion:	'Stimmst du den AGB ([url]https://www.knuddels.de/agb[/url]) und der Verarbeitung deiner Daten im Rahmen unserer Datenschutzerkl\303\244rung ([url]https://www.knuddels.de/legal/privacy-policy.html[/url]) zu?'
			}
		}, callback);
	};
	
	this.getEnum = function getEnum(enums, value) {
		if(typeof(value) === 'number' || !isNaN(parseInt(value, 10))) {
			if(typeof(value) === 'string') {
				value = parseInt(value, 10);
			}
			
			let number = null;
			
			Object.keys(enums).forEach(function(key) {
				if(number !== null) {
					return;
				}
				
				if(enums[key] === value) {
					number = enums[key];
					return;
				}
			});
			
			return number;
		}
		
		let found = null;
		
		Object.keys(enums).forEach(function(key) {
			if(found !== null) {
				return;
			}
			
			if(key.toUpperCase() === value.toUpperCase() || key.toUpperCase().substr(0, 1) === value.toUpperCase()) {
				found = enums[key];
			}
		});
		
		return found;
	};
	
	this.load = function load(payload, callback) {
		protobuf.load(Workspace + '/definitions/Register.proto', function(error, root) {
			if(error) {
				callback(error, null);
				return;
			}
			
			var Bundle		= root.lookupType('Bundle');
			var RequestType	= root.lookup('').RequestType;
			var Gender		= root.lookup('').Gender;
			
			// convert enums
			if(typeof(payload.data.type) !== 'undefined') {
				payload.data.type = this.getEnum(RequestType, payload.data.type);
			}
			
			if(typeof(payload.data.gender) !== 'undefined') {
				payload.data.gender = this.getEnum(Gender, payload.data.gender);
			}
			
			var exception	= Bundle.verify(payload);
			
			if(exception) {
				callback(exception, null);
				return;
			}
			
			var message	= Bundle.create(payload);
			var buffer	= Bundle.encode(message).finish();
			
			callback(null, buffer);
		}.bind(this));
	};
}());
