var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;
var Constants = require('../constants');

var canApplyHeading = function() {
  var range = new TextSelection().getRange();
  var allowedParents = Constants.allowedHeaderParents;
  var nodes = new TextSelection().getNodesInRange();

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

var Headings = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'Headings';
  this.className = forger.options.painters[this.name].className;
  this.levelMenuOpen = false;
};

Headings.prototype = {
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    
    var ul = document.createElement('ul');
    ul.className = 'heading-levels';
    ul.style.display = 'none';

    // Append a button for each of the levels wanted. 1 === H1 and so on. 
    this.forger.options.painters[this.name].levels.forEach(function(level) {
      var levelButton = document.createElement('li');
      levelButton.textContent = 'H' + level;
      levelButton.setAttribute('data-heading-level', level);
      ul.appendChild(levelButton);
    });

    li.appendChild(ul);

    this.button = li;
    this.levelMenu = ul;

    setTimeout(function() {
      this.addEventListeners();
    }.bind(this), 1);

    return this.button;
  },

  addEventListeners: function() {
    var levelMenu = this.button.querySelector('.heading-levels');

    // TODO: Tidy this up, named functions to unbind rather than anonymous functions
    levelMenu.addEventListener('mousedown', function(e) {
      if (e.target && e.target.nodeName.toLowerCase() === 'li') {
        var level = e.target.getAttribute('data-heading-level');
        e.stopPropagation();

        var ts = new TextSelection();
        ts.restoreSelection(ts.selection, ts.getRange(), function() {
          this.applyLevelFormatting(level);
        }.bind(this));
      }
    }.bind(this));
  },

  canApply: function() {
    return canApplyHeading();
  },

  showLevelMenu: function() {
    this.levelMenu.style.display = 'block'; 
    this.levelMenuOpen = true;
  },

  hideLevelMenu: function() {
    this.levelMenu.style.display = 'none';
    this.levelMenuOpen = false;
  },

  apply: function() {
    if (this.levelMenuOpen) {
      this.hideLevelMenu();  
    } else {
      this.showLevelMenu();
    }
  },

  // Only allow headings for single lines of text currently wrapped in a <p> or <div>
  // (this will also work with top-level text nodes in FF, as the main Forger wrapper is a <div>)
  applyLevelFormatting: function(level) {
    if (this.canApply()) {
      if (DOM.isEl(DOM.getBlockParent(new TextSelection().getRange().startContainer), ['p', 'div'])) {
        document.execCommand('formatBlock', false, '<h' + level+ '>');
      }

      else {
        document.execCommand('formatBlock', false, '<p>');
      }

      this.hideLevelMenu();
    }

    this.trigger('formatting:applied');
  },

  // TODO: Assign active states to each level button too
  assignActiveState: function() {
    var startContainer = new TextSelection().getRange().startContainer;

    // TODO: Make this nicer, elIsWithinEl should accept an array
    var active = DOM.elIsWithinEl(startContainer, 'h1', this.forger.editor.el.parentNode) ||
    DOM.elIsWithinEl(startContainer, 'h2', this.forger.editor.el.parentNode) ||
    DOM.elIsWithinEl(startContainer, 'h3', this.forger.editor.el.parentNode) 

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(Headings);

module.exports = Headings;