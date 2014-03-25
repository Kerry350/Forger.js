'use strict';

var DOM = require('./dom').DOM;

function Sanitiser (html) {
  this.html = html;
}

Sanitiser.prototype = {
  // Sanitise mostly tidies up the mess made by cross-browser inconsistencies
  // within contenteditable elements
  sanitise: function() {
    var self = this;

    // Replace non-break spaces with a proper space
    var content = this.html.replace(/&nbsp;/gi,' ');
    var donour = document.createElement('div');
    donour.innerHTML = content;

    donour.normalize();

    // Promote elements sorts out block level elements being within other block level
    // elements that they shouldn't be
    this.reorderElements(donour, ['ul', 'ol', 'div', 'p'], ['div', 'p']);

    // Get rid of top-level <br /> elements
    this.removeMatchingEls(donour, 'br', true);

    // Wrap top-level text nodes with a <p> element to stop stray text nodes
    this.wrapTextNodes(donour);

    // Wrap any blockquote child text nodes
    var blockquotes = donour.querySelectorAll('blockquote');

    Array.prototype.forEach.call(blockquotes, function(blockquote) {
        self.wrapTextNodes(blockquote);
    });

    // Clean up <br /> elements
    this.sanitiseBrElements(donour);

    // Get rid of empty <div> and <p> elements
    this.removeEmptyElements(donour, 'div');
    this.removeEmptyElements(donour, 'p');

    // Replace <div> with <p>
    this.swapElements(donour, 'div', 'p');

    return donour.innerHTML;
  },

  sanitiseBrElements: function(el) {
    var els = el.querySelectorAll('br + br');

    for (var i = 0, len = els.length; i < len; i++) {
      var br = els[i];
      br.parentNode.removeChild(br);
    }
  },

  swapElements: function(el, old, newElem) {
    var elems = el.querySelectorAll(old);

    Array.prototype.forEach.call(elems, function(elem) {
      var replacement = document.createElement(newElem);
      replacement.innerHTML = elem.innerHTML;
      elem.parentNode.replaceChild(replacement, elem);
    });
  },

  // Moves block level elements 'up one level', if they are within a
  // block level parent that isn't allowed, i.e. a <ul> within a <p>,
  // in that case we'd remove the <p> and keep the <ul> as a top level
  // parent itself
  reorderElements: function(el, els, parents) {
    this.walkTheDOM(el, function(node) {
      if ((node.parentNode !== el) && (node !== el) && DOM.isEl(node, els) && DOM.hasParent(node, parents)) {
        DOM.unwrap([node]);
      }
    });
  },

  removeEmptyElements: function(el, tag) {
    var els = el.querySelectorAll(tag);
    for (var i = 0, len = els.length; i < len; i++) {
      if (els[i].nodeName.toLowerCase() === tag && els[i].innerHTML.trim() === '') {
        els[i].parentNode.removeChild(els[i]);
      }
    }
  },

  walkTheDOM: function(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
      this.walkTheDOM(node, func);
      node = node.nextSibling;
    }
  },

  removeMatchingEls: function(content, tag, parentOnly) {
    var els = content.querySelectorAll(tag);
    for (var i = 0, len = els.length; i < len; i++) {
      if (!parentOnly) {
        els[i].parentNode.removeChild(els[i]);
      }

      else if (parentOnly && (els[i].parentNode === content)) {
        els[i].parentNode.removeChild(els[i]);
      }
    }
  },

  // Can be used with a *normalized* DOM
  wrapTextNodes: function(content) {
    var wrappedCounter = 0;

    for (var i = 0, len = content.childNodes.length; i < len; i++) {
      if (content.childNodes[i].nodeType === 3) {
        var p = document.createElement('p');
        content.childNodes[i].parentNode.insertBefore(p, content.childNodes[i]);
        p.appendChild(content.childNodes[i + 1]); // Add one due to the p increasing child nodes by one
        wrappedCounter++;
      }
    }

    return wrappedCounter;
  }
};

module.exports = Sanitiser;