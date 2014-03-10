// Export the jQuery plugin definition, nothing fancy here
// just a standard jQuery plugin wrapper

var Forger = require('./forger');

module.exports = function() {

  if (window.$) {
    $.fn.Forger = function(options) {

      return this.each(function() {
        var $this = $(this);
        var instance = $this.data('Forger');
        
        if (!instance) {
          $this.data('Forger', (instance = new Forger(this, options)));
        }

        // Called with a method
        if (typeof options === 'string') {
          instance[options]()
        }
      });
    }

    $.fn.Forger.Constructor = Forger;   
  }
}