'use strict';

var ShortcutManager = require('./shortcut_manager');
var Formatter = require('./formatter');
var Editor = require('./editor');
var Sanitiser = require('./sanitiser');
var Toolbar = require('./toolbar');
var Painters = require('./painters');
var Utils = require('./dom').Utils;
var Defaults = require('./defaults');

// Get the next ID for the new instance
var getID = (function () {
  var id = 0;

  return function() {
    return id++;
  }
})();

// The core Forger constructor. Takes charge of bringing in an Editor instance etc.
var Forger = function(el, options) {
  this.options = Utils.merge(Defaults, options);

  // Assign a unique ID to differentiate between instances
  this.id = getID();
  this.el = el;
  this.baseClass = 'forger-' + this.id; // Base class for DOM related elements
      
  this.init();
  
  return this;
};

Forger.prototype = {
  init: function() {
    this.editor = new Editor(this, this.el);
    this.editor.init();

    this.shortcutManager = new ShortcutManager(this, this.options.shortcuts);
    this.formatter = new Formatter();
    this.sanitiser = new Sanitiser();
    
    // TODO: These classes
    // this.historyManager = new HistoryManager() // For undo / redo as the browser is inconsistent as hell

    this.setupPainters();

    if (this.options.mode !== 'inline') {
      this.toolbar = new Toolbar(this, this.baseClass);
      this.enterFormattingMode();
    }
    
    return this;
  },

  setupPainters: function() {
    // Set up the active / enabled painters that we'll be using
    this.painters = [];

    for (var key in this.options.painters) {
      if (this.options.painters[key].enabled) {
        var painter = new Painters[key](this);
        this.painters.push(painter);   
      }
    }
  },

  // TODO: Move this reponsibility solely to the toolbar
  enterLinkMode: function() {
    this.toolbar.enterLinkMode();
  },

  enterFormattingMode: function() {
    this.toolbar.enterFormattingMode();
  },

  // Public methods for grabbing content in various formats
  markdown: function() {
    return new Formatter().getMarkdown(new Sanitiser(this.editor.getContent()).sanitise())
  },

  HTML: function() {
    return new Sanitiser(this.editor.getContent()).sanitise();
  },

  // Use enables previously registered plugins for use with this instance
  use: function(name) {
    var handler = Forger.Plugins.cache[name];

    if (handler) {
        handler(this);
    } else {
        throw new Error("There is no plugin registered with that name, use Forger.Plugins.register('name', fn) to register a plugin");
    }
  },

  // BOOM! Destroy all the things!
  destroy: function() {
    // TODO: Get editor to do this in it's destroy method instead
    this.editor.el.attr('contentEditable', 'inherit');
    // TODO: Destroy all classes
  }
};

// DEBUG mode will output logs to the Console. At the moment that's
// as fancy as it gets.
Forger.DEBUG = true;

module.exports = Forger;
