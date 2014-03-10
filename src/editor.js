'use strict';

// The core Editor instance, monitors the contentEditable element,
// passing off actions to the Painters and so on

var Log = require('./logger');
var TextSelection = require('./range_and_selection');
var DOM = require('./dom').DOM;

function Editor (forger, el) {
  this.forger = forger;
  this.el = el;
  this.options = forger.options;
  this.addEventListeners();
  this.state = {};
}

Editor.prototype = {
  init: function() {
    this.el.classList.add(this.forger.baseClass);
    this.el.classList.add('forger');
    this.el.setAttribute('contentEditable', true);
    this.checkIfEmpty(null, true);
  },

  isEmpty: function(e) {
    var html = this.el.innerHTML.trim();
    html = html.replace(/<br>/i, '');
    var stripped = html.replace(/<(?:.|\n)*?>/gm, '');

    if (html === '' || stripped === '') {
      if (e) { e.preventDefault(); }
      return true;
    }

    else {
      return false;
    }
  },

  checkIfEmpty: function(e) {

    // On the first run we'll match the placeholder
    if (this.isEmpty(e)) {
      var p = document.createElement('p');
      var textNode = document.createTextNode(this.options.placeholderText);
      p.appendChild(textNode);
      this.el.html(p);
      this.refocus(textNode, textNode.textContent.length);
    }

    this.checkIfEmpty = function(e) {
      if (this.isEmpty(e)) {
        var p = document.createElement('p');
        p.innerHTML = '&#8203;';
        this.el.html(p);
        this.refocus(p, 0);
      }
    };
  },

  // Focuses an element or textNode in Chrome and Safari
  refocus: function(el, index) {
    var range = document.createRange();
    range.setStart(el, (index || 0));
    range.collapse(true);
    new TextSelection().addRange(range);

    // IE, Opera and Firefox will use .focus()
    this.el.focus();
  },

  getSelection: function(cb) {
    var selection = new TextSelection().selection;

    // Is the selection within our Editor instances element?
    if (DOM.isAParent(selection.anchorNode, this.el)) {
      // Is the selection more than just a cursor?
      // Mouseup fires too quickly, hence the timeout
      window.setTimeout(function() {
        if (!selection.isCollapsed) {
          cb(selection);
        } else {
          cb(false);
        }
      }, 0);
    } else {
      cb(false);
    }
  },

  addEvent: function(el, ev, handler) {
    if (!this.events) {
      this.events = [];
    }

    el.addEventListener(ev, handler);

    // We store these so removal of all events later is automated
    this.events.push({
      el: el,
      ev: ev,
      handler: handler
    });
  },

  removeAllEvents: function() {
    this.events.forEach(function(eventObj) {
      eventObj.el.removeEventListener(eventObj.ev, eventObj.handler);
    });
  },

  addEventListeners: function() {

    // Assign the correct context
    this.onPaste = this.onPaste.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onDocumentMousedown = this.onDocumentMousedown.bind(this);
    this.onMousedown = this.onMousedown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    // Key based
    this.addEvent(this.el, 'paste', this.onPaste);
    this.addEvent(this.el, 'keyup', this.onKeyUp);
    this.addEvent(this.el, 'keydown', this.onKeyDown);

    if (this.options.mode !== 'inline') {
      this.addEvent(window, 'resize', this.onWindowResize);

      // Input-like
      this.addEvent(this.el, 'focus', this.onFocus);
      this.addEvent(this.el, 'blur', this.onBlur);

      // Mouse based
      this.addEvent(document, 'mousedown', this.onDocumentMousedown);
      this.addEvent(this.el, 'mousedown', this.onMousedown);
      this.addEvent(this.el, 'mouseup', this.onMouseUp);
    }
  },

  onFocus: function() {
    Log('Editor: onFocus');

    if (this.el.textContent.trim() === this.options.placeholder) {
      var p = document.createElement('p');
      p.innerHTML = '&#8203;';
      this.el.html(p);
      this.refocus(p, 0);
    }
  },

  onBlur: function() {
    Log('Editor: onBlur');

    if (!this.el.textContent.trim()) {
      var p = document.createElement('p');
      var textNode = document.createTextNode(this.options.placeholder);
      p.appendChild(textNode);
      this.element.html(p);
    }
  },

  onDocumentMousedown: function(e) {
    if (!DOM.isAParent(e.target, this.el) && !DOM.isAParent(e.target, this.forger.toolbar.el)) {
      this.reset();
    }
  },

  reset: function() {
    this.forger.toolbar.hide();
    this.forger.enterFormattingMode();
  },

  onMousedown: function(e) {
    e.stopPropagation();
    this.state.lastMouseDownOffsets = {x: e.pageX, y: e.pageY};
  },

  onMouseUp: function() {        
    Log("Editor: Mouseup");

    this.getSelection(function(selection) {

      if (selection && this.forger.toolbar.isHidden) {
        this.forger.toolbar.positionEl(this.state.lastMouseDownOffsets);
        this.forger.toolbar.show();
      }

      else if (selection && !this.forger.toolbar.isHidden)  {
        this.forger.toolbar.positionEl(this.state.lastMouseDownOffsets);
      }

      // In link mode the editor will be used without a selection for a period,
      // but the link mode input will deal with it's own blur event
      else if (!selection && this.forger.uiMode !== 'link') {
        this.reset();
      }

    }.bind(this));
  },

  onKeyDown: function(e) {
    if ((e.keyCode === 13) && (this.options.mode === 'inline')) {
      e.preventDefault();
      return false;
    }

    var node = DOM.getFirstNonTextParent(new TextSelection().getRange().startContainer);

    // Don't let people just sit smashing the Enter key making new paragraphs. I might make this an option
    // rather than enforcing it...
    if ((e.keyCode === 13) && !node.textContent.trim() && (node.nodeName.toLowerCase() !== 'li')) {
      e.preventDefault();
    }
  },

  onKeyUp: function(e) {
    this.checkIfEmpty(e);
  },

  onPaste: function(e) {
    e.preventDefault();

    var text;

    if (e.clipboardData) {
      text = e.clipboardData.getData('text/plain');
      var html = e.clipboardData.getData('text/html');
    } else if (window.clipboardData) {
      text = window.clipboardData.getData('Text');
      var url = window.clipboardData.getData('URL');
    }

    // Replace new lines with proper spaces
    text = text.replace(/\n/g," ");

    // TODO: Have a looky at not using insertHTML and see if other solutions are wonky still
    document.execCommand('insertHTML', false, text);
  },

  onWindowResize: function(e) {
    Log("Editor: Handling resize");
    this.forger.toolbar.positionEl(this.state.lastMouseDownOffsets);
  },

  getContent: function() {
    return this.el.innerHTML.trim();
  }
};

module.exports = Editor;
