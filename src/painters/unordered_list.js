var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

var UnorderedList = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'UnorderedList';
  this.className = forger.options.painters[this.name].className;
};


UnorderedList.prototype = {
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
    document.execCommand('insertunorderedlist');
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var active = document.queryCommandState('insertunorderedlist');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(UnorderedList);

module.exports = UnorderedList;

