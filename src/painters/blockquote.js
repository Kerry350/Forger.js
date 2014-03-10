var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;
var Constants = require('../constants');

var canApplyBlockquote = function() {
  var self = this;
  var nodes = new TextSelection().getNodesInRange();
  var canApply = !DOM.containsEl(nodes, Constants.disallowedBlockquoteChildren);
  return canApply;
};

var Blockquote = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'Blockquote';
  this.className = forger.options.painters[this.name].className;
};


Blockquote.prototype = {
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
    return canApplyBlockquote();
  },

  // Only allow headings for single lines of text currently wrapped in a <p> or <div>
  // (this will also work with top-level text nodes in FF, as the main Forger wrapper is a <div>)
  apply: function() {
    if (this.canApply()) {

      // Try to stop infinitely nested blockquote elements
      var nodes = new TextSelection().getNodesInRange(true);

      if (DOM.containsEl(nodes, 'blockquote')) {
        if (!window.opera) {

          var currentRangeData = new TextSelection().getRangeData();

          var blockquotes = [];
          
          for (var i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].nodeName.toLowerCase() === 'blockquote') {
              blockquotes.push(nodes[i]);
            }
          }
          
          DOM.unwrap(blockquotes);

          setTimeout(function() {
            new TextSelection().createRangeFromData(currentRangeData, true);
            this.forger.toolbar.positionEl();
            this.trigger('formatting:applied');
          }.bind(this), 1)

        } else {
          document.execCommand('formatBlock', false, '<p>');
          document.execCommand('outdent');
          this.trigger('formatting:applied');
        }
      } else {
        // Opera can't use indent due to it's handling.
        // Opera produces <p><blockquote>Text</blockquote></p>
        // VS <blockquote><p>Text</p></blockquote>
        if (!window.opera) {
          document.execCommand('indent');
          this.trigger('formatting:applied');
        } else {
          document.execCommand('formatBlock', false, '<blockquote>');
          this.trigger('formatting:applied');
        }
      }
    }
  },

  assignActiveState: function() {
    var startContainer = new TextSelection().getRange().startContainer;
    var active = DOM.elIsWithinEl(startContainer, 'blockquote', this.forger.editor.el.parentNode) ? true : false;

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(Blockquote);

module.exports = Blockquote;

