var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

var Italic = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'Italic';
  this.className = forger.options.painters[this.name].className;
};


Italic.prototype = {
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
    document.execCommand('italic');
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var active = document.queryCommandState('italic');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(Italic);

module.exports = Italic;