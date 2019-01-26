const protobuf = require('protobufjs');

module.exports = (new function Decoder() {
	this.execute = function execute(buffer, callback) {
		protobuf.load(Workspace + '/definitions/Register.proto', function(error, root) {
			if(error) {
				callback(error, null);
				return;
			}
			
			var Bundle		= root.lookupType('Bundle');
			var RequestType	= root.lookup('').RequestType;
			var Gender		= root.lookup('').Gender;
			var message		= Bundle.decode(buffer);
			callback(null, message);
		}.bind(this));
	};
}());