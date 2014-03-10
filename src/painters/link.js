var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;
var Utils = require('../dom').Utils;

var Link = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'Link';
  this.className = forger.options.painters[this.name].className;
  this.selectionBeforeInput = null;
  this.state = {};
};

Link.prototype = {
  // DOM representation of this painter. The toolbar will assemble these.
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    this.button = li;

    setTimeout(function() {
      this.addEventListeners();
    }.bind(this), 1);

    return this.button;
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
    if (this.forger.options.mode !== 'inline') {
      this.onLinkInputBlur = this.onLinkInputBlur.bind(this);
      this.onAddLinkMousedown = this.onAddLinkMousedown.bind(this);

      this.addEvent(this.forger.toolbar.el.querySelector('.link input'), 'blur', this.onLinkInputBlur);
      this.addEvent(this.forger.toolbar.el.querySelector('.js-add-link'), 'mousedown', this.onAddLinkMousedown);
    }
  },

  onLinkInputBlur: function() {
    Log('Painter: Link: onLinkInputBlur');

    if (!this.state.handlingLinkAdd) {
      this.forger.enterFormattingMode();

      setTimeout(function() {
        new TextSelection().addRange(this.selectionBeforeInput);
      }.bind(this), 10);
    }

    else {
      this.state.handlingLinkAdd = false;
    }
  },

  onAddLinkMousedown: function() {
    Log('Painter: Link: onAddLinkMousedown');

    this.state.handlingLinkAdd = true;
    this.handleUrlSubmission();
  },

  apply: function() {
    Log('Painter: Link: Applying');

    this.selectionBeforeInput = new TextSelection().getRange();

    var range = new TextSelection().getRange();
    var startNode = DOM.getFirstNonTextParent(range.startContainer);
    var endNode = DOM.getFirstNonTextParent(range.endContainer);
    var url = null;

    // If we're highlighting within a link we should pre-populate using it's value
    if (startNode.nodeName.toLowerCase() === 'a') {
      url = startNode.href;
    }

    else if (endNode.nodeName.toLowerCase() === 'a') {
      url = endNode.href;
    }

    this.forger.toolbar.setLinkPlaceholder(url);
    this.forger.enterLinkMode();
  },

  handleUrlSubmission: function() {
    Log('Painter: Link: Handling URL submission');

    // Add the old selection back after we've blurred 
    new TextSelection().addRange(this.selectionBeforeInput);

    var url = this.forger.toolbar.el.querySelector('.link').querySelector('input').value.trim();

    if (url) {
      this.applyLinkToDOM(url);
    }

    this.forger.enterFormattingMode();

    setTimeout(function() {
      if (url) {
        var start = DOM.getFirstNonTextParent(this.selectionBeforeInput.startContainer);
        var node = $(start).find('a')[0];
        var range = document.createRange();
        range.selectNode(node);
      }

      else {
        var range = this.selectionBeforeInput;
      }

      new TextSelection().addRange(range);

    }.bind(this), 10);
  },

  applyLinkToDOM: function(url) {
    if (!Utils.stringStartsWith(url, 'http://') && !Utils.stringStartsWith(url, 'https://')) {
      url = 'http://' + url;
    }

    document.execCommand('createLink', false, url);
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    // TODO: There is no such thing as link for queryCommandState...do some manual checking here
    var active = document.queryCommandState('link');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(Link);

module.exports = Link;

