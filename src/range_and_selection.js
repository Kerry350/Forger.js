// Manage current Window selections / ranges nicely
function TextSelection() {
  this.selection = window.getSelection();
}

TextSelection.prototype = {
  getRange: function() {
    return this.selection.getRangeAt(0);
  },

  getRangeData: function() {
    var range = this.getRange().cloneRange();

    return {
      startContainer: range.startContainer,
      startOffset: range.startOffset,
      endContainer: range.endContainer,
      endOffset: range.endOffset
    };
  },

  createRangeFromData: function(data, insert) {
    var range = document.createRange();
    range.setStart(data.startContainer, data.startOffset);
    range.setEnd(data.endContainer, data.endOffset);

    if (insert) {
      this.addRange(range);
    }

    return range;
  },

  addRange: function(range) {
    this.selection.removeAllRanges();
    this.selection.addRange(range);
  },

  restoreSelection: function(selection, range, cb) {
    setTimeout(function() {
      this.addRange(range);
      cb();
    }.bind(this), 0);
  },

  // Hattip - not my code: http://stackoverflow.com/questions/1482832/how-to-get-all-elements-that-are-highlighted/1483487#1483487
  rangeIntersectsNode: function(range, node) {
    var nodeRange;

    if (range.intersectsNode) {
      return range.intersectsNode(node);
    } else {
      
      nodeRange = node.ownerDocument.createRange();
      
      try {
        nodeRange.selectNode(node);
      } catch (e) {
        nodeRange.selectNodeContents(node);
      }

      return range.compareBoundaryPoints(Range.END_TO_START, nodeRange) == -1 &&
             range.compareBoundaryPoints(Range.START_TO_END, nodeRange) == 1;
    }
  },

  // Hattip - not my code: http://stackoverflow.com/questions/1482832/how-to-get-all-elements-that-are-highlighted/1483487#1483487
  getNodesInRange: function(includeParentIfSingular) {
    var self = this;

    var range, sel, elmlist, treeWalker, containerElement;
    sel = window.getSelection();

    if (sel.rangeCount > 0) {
      range = sel.getRangeAt(0);
    }

    if (range) {
      containerElement = range.commonAncestorContainer;
      
      if (containerElement.nodeType != 1) {
        containerElement = containerElement.parentNode;
      }

      treeWalker = window.document.createTreeWalker(
          containerElement,
          NodeFilter.SHOW_ELEMENT,
          function(node) { return self.rangeIntersectsNode(range, node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; },
          false
      );

      elmlist = [treeWalker.currentNode];
      
      while (treeWalker.nextNode()) {
        elmlist.push(treeWalker.currentNode);
      }
    }

    if (includeParentIfSingular && elmlist.length === 1) {
      elmlist.push(elmlist[0].parentNode);
    }

    console.log(elmlist);

    return elmlist;
  }
};

module.exports = TextSelection;
