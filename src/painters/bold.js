var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

var Bold = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'Bold';
  this.className = forger.options.painters[this.name].className;
};


Bold.prototype = {
  // DOM representation of this painter. The toolbar will assemble these.
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    this.button = li;
    return this.button;
  },

  apply: function() {
    console.log('Painter: Bold: Applying');
    document.execCommand('bold');
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var active = document.queryCommandState('bold');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(Bold);

module.exports = Bold;

