var Forger = require('./forger');

function Log(message) {
	if (Forger.DEBUG) {
		console.log(message);
	}
}

module.exports = Log;