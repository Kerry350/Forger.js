var Forger = require('./forger');

// Add optional jQuery wrapper. If jQuery exists globally, 
// Forger will be added to the .fn prototype
require('./jquery_wrapper')();

// Setup plugins
require('./plugins');

// Export the Forger constructor globally
window.Forger = Forger;