// General useful utility functions
var Utils = {
  stringStartsWith: function (string, pattern) {
    return (string.indexOf(pattern) === 0) ? true : false;
  },

  // Merge any number of objects together
  merge: function() {
    var obj = {};
    var i = 0;
    var il = arguments.length;
    var key;

    for (; i < il; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  }
};

// Lightweight DOM wrapper, saves using something like jQuery

// TODO: Abstract all of the .indexOf uses in to a nicer utility method
var DOM = {
  insertAfter: function(el, target) {
    var parent = target.parentNode;

    if (parent.lastchild === target) {
      parent.appendChild(el);
    } else {
      parent.insertBefore(el, target.nextSibling);
    }
  },

  offset: function(node) {
    var left = 0;
    var top = 0;

    if (node.offsetParent) {
      do {
        left += node.offsetLeft;
        top += node.offsetTop;
      } while (node = node.offsetParent);
    }

    return {left: left, top: top};
  },

  isAParent: function(node, parentNode) {
    var parent;
    while (parent = node.parentNode) {
      if (parent === parentNode) {
        return true;
      }
      node = parent;
    }

    return false;
  },

  getFirstNonTextParent: function(node) {
    if (node.nodeType === 3) {
      return node.parentNode;
    }

    else if (node.nodeType === 1) {
      return node;
    }
  },

  containsEl: function(nodes, els) {
    var containsEls = false;

    Array.prototype.forEach.call(nodes, function(node) {
      if (this.isEl(node, els)) {
        containsEls = true;
      }
    }.bind(this));

    return containsEls;
  },

  isEl: function(node, els) {
    return (els.indexOf(node.nodeName.toLowerCase()) !== -1) ? true : false;
  },


  getBlockParent: function(node) {
    var inlineEls = Constants.inlineEls;

    if (node.nodeType === 3) {
      return DOM.getBlockParent(node.parentNode);
    }

    else if ( (node.nodeType === 1) && (inlineEls.indexOf(node.nodeName.toLowerCase()) !== -1) ) {
      return DOM.getBlockParent(node.parentNode);
    }

    else if ((node.nodeType === 1) && (inlineEls.indexOf(node.nodeName.toLowerCase()) === -1) ) {
      return node;
    }
  },

  elIsWithinEl: function(el, parent, limiter) {
    while (el) {
      if (el === limiter) {
        return false;
      }

      if (el.nodeType === 1 && el.tagName.toLowerCase() === parent) {
        return true;
      }

      el = el.parentNode;
    }

    return false;
  },

  hasParent: function(node, parents) {
    return (parents.indexOf(node.parentNode.nodeName.toLowerCase()) !== -1) ? true : false;
  },

  unwrap: function(nodes) { 
    while (nodes[0]) {
      var parent = nodes[0].parentNode;
    
      while (nodes[0].firstChild) {
        parent.insertBefore(nodes[0].firstChild, nodes[0]);
      }

      parent.removeChild(nodes[0]);
      nodes.shift();
    }
  }
};

module.exports = {
  Utils: Utils, 
  DOM: DOM
}
