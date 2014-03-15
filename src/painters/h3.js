var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

// This is currently repeated for headings 1 - 3. Moving it to a shared Heading prototype is on my todos.
var canApplyHeading = function() {
  var range = TextUtils.getCurrentRange();
  var allowedParents = Constants.allowedHeaderParents;
  var nodes = getNodesInRange();

  if (DOM.getBlockParent(range.startContainer) === DOM.getBlockParent(range.endContainer)) {
    if (!DOM.containsEl(nodes, ['br'])) {
      var parent = DOM.getBlockParent(range.startContainer);
      if (allowedParents.indexOf(parent.nodeName.toLowerCase()) !== -1) {
        return true;
      }
    }
  }

  return false;
};

// NOTE: H1, H2, H3  have all been replaced by the Headings painter, this is left in for prosperity at the moment
var H3 = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'H3';
  this.className = forger.options.painters[this.name].className;
};


H3.prototype = {
  // DOM representation of this painter. The toolbar will assemble these.
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    this.button = li;
    return this.button;
  },

  canApply: function() {
    return canApplyHeading();
  },

  // Only allow headings for single lines of text currently wrapped in a <p> or <div>
  // (this will also work with top-level text nodes in FF, as the main Forger wrapper is a <div>)
  apply: function() {
    if (this.canApply()) {
      if (DOM.isEl(DOM.getBlockParent(new TextSelection().getRange().startContainer), ['p', 'div'])) {
        document.execCommand('formatBlock', false, '<h3>');
      }

      else {
        document.execCommand('formatBlock', false, '<p>');
      }
    }
    
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var startContainer = new TextSelection().getRange().startContainer;
    var active = DOM.elIsWithinEl(startContainer, 'h3', this.forger.editor.el.parentNode) ? true : false;

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(H3);

module.exports = H3;

