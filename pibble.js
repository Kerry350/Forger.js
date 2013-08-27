 // Pibble. A content editing plugin. Transform elements in to content editable sections. 

(function(window, $) {
  /* Third party libraries:
     - reMarked.js for converting HTML in to Markdown
   */

  /**
  * Copyright (c) 2012, Leon Sorokin
  * All rights reserved. (MIT Licensed)
  *
  * reMarked.js - DOM > markdown
  */
  var reMarked=function(e){function r(e,t){if(!t)return e;for(var n in e){if(typeof t[n]!=="undefined")e[n]=t[n]}}function i(e,t){var n="";while(t-->0)n+=e;return n}function s(e){var e=e.replace(/^\s\s*/,""),t=/\s/,n=e.length;while(t.test(e.charAt(--n)));return e.slice(0,n+1)}function o(e,t,n){return i(t,n-e.length)+e}function u(e,t,n){return e+i(t,n-e.length)}function a(e){if(!e)return"";return"<"+e+">"}function f(e){if(!e)return"";return"</"+e+">"}function l(e,t){return e.replace(/^/gm,t)}function c(e){return(e.nodeName=="#text"?"txt":e.nodeName).toLowerCase()}function h(e,t){var n,r;if(t instanceof Array){n=t[0];r=t[1]}else n=r=t;n=n instanceof Function?n.call(this,e):n;r=r instanceof Function?r.call(this,e):r;return n+e+r}var t=[];var n={link_list:false,h1_setext:true,h2_setext:true,h_atx_suf:false,gfm_code:false,li_bullet:"*-+"[0],hr_char:"-_*"[0],indnt_str:["    ","  ","  "][0],bold_char:"*_"[0],emph_char:"*_"[1],gfm_del:true,gfm_tbls:true,tbl_edges:false,hash_lnks:false,br_only:false};r(n,e);this.render=function(e){if(typeof e=="string"){var r=e;e=document.createElement("div");e.innerHTML=r}var s=new p.tag(e,null,0);var o=s.rend().replace(/^[\t ]+\n/gm,"\n");if(n.link_list){o+="\n\n";var u=0;for(var a in t){if(!t[a].e.title)continue;var f=t[a].e.href.length;if(f&&f>u)u=f}for(var l in t){var c=t[l].e.title?i(" ",u+2-t[l].e.href.length)+'"'+t[l].e.title+'"':"";o+="  ["+(+l+1)+"]: "+t[l].e.href+c+"\n"}}return o.replace(/^[\t ]+\n/gm,"\n")};var p={};p.tag=klass({wrap:"",lnPfx:"",lnInd:0,init:function(e,t,n){this.e=e;this.p=t;this.i=n;this.c=[];this.tag=c(e);this.initK()},initK:function(){var e;if(this.e.hasChildNodes()){var n=/^(?:a|strong|code|em|sub|sup|del|i|u|b|big|center)$/,r,i;for(e in this.e.childNodes){if(!/\d+/.test(e))continue;r=this.e.childNodes[e];i=c(r);if(/style|script|canvas|video|audio/.test(i))continue;if(i=="txt"&&/^\s+$/.test(r.textContent)){if(e==0||e==this.e.childNodes.length-1)continue;var s=this.e.childNodes[e-1],o=this.e.childNodes[e+1];if(s&&!c(s).match(n)||o&&!c(o).match(n))continue}if(!p[i])i="tag";var u=new p[i](r,this,this.c.length);if(u instanceof p.a&&r.href||u instanceof p.img){u.lnkid=t.length;t.push(u)}this.c.push(u)}}},rend:function(){return this.rendK().replace(/\n{3,}/gm,"\n\n")},rendK:function(){var e,t="";for(var n in this.c){e=this.c[n];t+=(e.bef||"")+e.rend()+(e.aft||"")}return t.replace(/^\n+|\n+$/,"")}});p.blk=p.tag.extend({wrap:["\n\n",""],wrapK:null,tagr:false,lnInd:null,init:function(e,t,n){this.supr(e,t,n);if(this.lnInd===null){if(this.p&&this.tagr&&this.c[0]instanceof p.blk)this.lnInd=4;else this.lnInd=0}if(this.wrapK===null){if(this.tagr&&this.c[0]instanceof p.blk)this.wrapK="\n";else this.wrapK=""}},rend:function(){return h.call(this,(this.tagr?a(this.tag):"")+h.call(this,l(l(this.rendK(),this.lnPfx),i(" ",this.lnInd)),this.wrapK)+(this.tagr?f(this.tag):""),this.wrap)},rendK:function(){var e=this.supr();if(this.p instanceof p.li){var t=null,n=e.match(/^[\t ]+/gm);if(!n)return e;for(var r in n){if(t===null||n[r][0].length<t.length)t=n[r][0]}return e.replace(new RegExp("^"+t),"")}return e}});p.tblk=p.blk.extend({tagr:true});p.cblk=p.blk.extend({wrap:["\n",""]});p.ctblk=p.cblk.extend({tagr:true});p.inl=p.tag.extend({rend:function(){return h.call(this,this.rendK(),this.wrap)}});p.tinl=p.inl.extend({tagr:true,rend:function(){return a(this.tag)+h.call(this,this.rendK(),this.wrap)+f(this.tag)}});p.p=p.blk.extend({rendK:function(){return this.supr().replace(/^\s+/gm,"")}});p.div=p.p.extend();p.span=p.inl.extend();p.list=p.blk.extend({expn:false,wrap:[function(){return this.p instanceof p.li?"\n":"\n\n"},""]});p.ul=p.list.extend({});p.ol=p.list.extend({});p.li=p.cblk.extend({wrap:["\n",function(e){return this.p.expn||e.match(/\n{2}/gm)?"\n":""}],wrapK:[function(){return this.p.tag=="ul"?n.li_bullet+" ":this.i+1+".  "},""],rendK:function(){return this.supr().replace(/\n([^\n])/gm,"\n"+n.indnt_str+"$1")}});p.hr=p.blk.extend({wrap:["\n\n",i(n.hr_char,3)]});p.h=p.blk.extend({});p.h_setext=p.h.extend({});n.h1_setext&&(p.h1=p.h_setext.extend({wrapK:["",function(e){return"\n"+i("=",e.length)}]}));n.h2_setext&&(p.h2=p.h_setext.extend({wrapK:["",function(e){return"\n"+i("-",e.length)}]}));p.h_atx=p.h.extend({wrapK:[function(e){return i("#",this.tag[1])+" "},function(e){return n.h_atx_suf?" "+i("#",this.tag[1]):""}]});!n.h1_setext&&(p.h1=p.h_atx.extend({}));!n.h2_setext&&(p.h2=p.h_atx.extend({}));p.h3=p.h_atx.extend({});p.h4=p.h_atx.extend({});p.h5=p.h_atx.extend({});p.h6=p.h_atx.extend({});p.a=p.inl.extend({lnkid:null,rend:function(){var e=this.rendK(),t=this.e.getAttribute("href"),r=this.e.title?' "'+this.e.title+'"':"";if(!t||t==e||t[0]=="#"&&!n.hash_lnks)return e;if(n.link_list)return"["+e+"] ["+(this.lnkid+1)+"]";return"["+e+"]("+t+r+")"}});p.img=p.inl.extend({lnkid:null,rend:function(){var e=this.e.alt,t=this.e.getAttribute("src");if(n.link_list)return"["+e+"] ["+(this.lnkid+1)+"]";var r=this.e.title?' "'+this.e.title+'"':"";return"!["+e+"]("+t+r+")"}});p.em=p.inl.extend({wrap:n.emph_char});p.i=p.em.extend();p.del=n.gfm_del?p.inl.extend({wrap:"~~"}):p.tinl.extend();p.br=p.inl.extend({wrap:["",function(){var e=n.br_only?"<br>":"  ";return this.p instanceof p.h?"<br>":e+"\n"}]});p.strong=p.inl.extend({wrap:i(n.bold_char,2)});p.b=p.strong.extend();p.dl=p.tblk.extend({lnInd:2});p.dt=p.ctblk.extend();p.dd=p.ctblk.extend();p.sub=p.tinl.extend();p.sup=p.tinl.extend();p.blockquote=p.blk.extend({lnPfx:"> ",rend:function(){return this.supr().replace(/>[ \t]$/gm,">")}});p.pre=p.blk.extend({tagr:true,wrapK:"\n",lnInd:0});p.code=p.blk.extend({tagr:false,wrap:"",wrapK:function(e){return e.indexOf("`")!==-1?"``":"`"},lnInd:0,init:function(e,t,r){this.supr(e,t,r);if(this.p instanceof p.pre){this.p.tagr=false;if(n.gfm_code){var i=this.e.getAttribute("class");i=(i||"").split(" ")[0];if(i.indexOf("lang-")===0)i=i.substr(5);this.wrapK=["```"+i+"\n","\n```"]}else{this.wrapK="";this.p.lnInd=4}}}});p.table=n.gfm_tbls?p.blk.extend({cols:[],init:function(e,t,n){this.supr(e,t,n);this.cols=[]},rend:function(){for(var e in this.c)for(var t in this.c[e].c)for(var n in this.c[e].c[t].c)this.c[e].c[t].c[n].prep();return this.supr()}}):p.tblk.extend();p.thead=n.gfm_tbls?p.cblk.extend({wrap:["\n",function(e){var t="";for(var r in this.p.cols){var o=this.p.cols[r],u=o.a[0]=="c"?":":" ",a=o.a[0]=="r"||o.a[0]=="c"?":":" ";t+=(r==0&&n.tbl_edges?"|":"")+u+i("-",o.w)+a+(r<this.p.cols.length-1||n.tbl_edges?"|":"")}return"\n"+s(t)}]}):p.ctblk.extend();p.tbody=n.gfm_tbls?p.cblk.extend():p.ctblk.extend();p.tfoot=n.gfm_tbls?p.cblk.extend():p.ctblk.extend();p.tr=n.gfm_tbls?p.cblk.extend({wrapK:[n.tbl_edges?"| ":"",n.tbl_edges?" |":""]}):p.ctblk.extend();p.th=n.gfm_tbls?p.inl.extend({guts:null,wrap:[function(){var e=this.p.p.p.cols[this.i],t=this.i==0?"":" ",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n=i(" ",r);break;case"c":n=i(" ",Math.floor(r/2));break;default:n=""}return t+n},function(){var e=this.p.p.p.cols[this.i],t=this.i==this.p.c.length-1?"":" |",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n="";break;case"c":n=i(" ",Math.ceil(r/2));break;default:n=i(" ",r)}return n+t}],prep:function(){this.guts=this.rendK();this.rendK=function(){return this.guts};var e=this.p.p.p.cols;if(!e[this.i])e[this.i]={w:null,a:""};var t=e[this.i];t.w=Math.max(t.w||0,this.guts.length);if(this.e.align)t.a=this.e.align}}):p.ctblk.extend();p.td=p.th.extend();p.txt=p.inl.extend({initK:function(){this.c=this.e.textContent.split(/^/gm)},rendK:function(){var e=this.c.join("").replace(/\r/gm,"");if(!(this.p instanceof p.code||this.p instanceof p.pre)){e=e.replace(/^\s*#/gm,"\\#").replace(/\*/gm,"\\*")}if(this.i==0)e=e.replace(/^\n+/,"");if(this.i==this.p.c.length-1)e=e.replace(/\n+$/,"");return e}})};!function(e,t){typeof define=="function"?define(t):typeof module!="undefined"?module.exports=t():this[e]=t()}("klass",function(){function e(e){return i.call(t(e)?e:function(){},e,1)}function t(e){return typeof e===u}function n(e,t,n){return function(){var r=this.supr;this.supr=n[f][e];var i=t.apply(this,arguments);return this.supr=r,i}}function r(e,r,i){for(var s in r)r.hasOwnProperty(s)&&(e[s]=t(r[s])&&t(i[f][s])&&a.test(r[s])?n(s,r[s],i):r[s])}function i(e,n){function i(){}function s(){this.init?this.init.apply(this,arguments):(n||a&&o.apply(this,arguments),l.apply(this,arguments))}i[f]=this[f];var o=this,u=new i,a=t(e),l=a?e:this,c=a?{}:e;return s.methods=function(e){return r(u,e,o),s[f]=u,this},s.methods.call(s,c).prototype.constructor=s,s.extend=arguments.callee,s[f].implement=s.statics=function(e,t){return e=typeof e=="string"?function(){var n={};return n[e]=t,n}():e,r(this,e,o),this},s}var s=this,o=s.klass,u="function",a=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,f="prototype";return e.noConflict=function(){return s.klass=o,this},s.klass=e,e})

  var id = 0;

  function getToolbarHTML(formattingOptions, className) {
    var html;
    
    var outerDiv = $('<div />');
    outerDiv.addClass(className + '-toolbar pibble-toolbar');
    
    var ul = $('<ul />');

    for (var key in formattingOptions) {
      if (formattingOptions[key].enabled) {
        var el = $('<li />').addClass(formattingOptions[key].className).data('format-option', formattingOptions[key].name);
        ul.append(el); 
      }
    }

    outerDiv.append(ul);

    return outerDiv;
  }

  // Utility DOM functions
  DOM = {};

  DOM.insertAfter = function(el, target) {
    var parent = target.parentNode;

    if (parent.lastchild === target) {
      parent.appendChild(el);
    } 

    else {
      parent.insertBefore(el, target.nextSibling);
    }
  }

  DOM.createNode = function(tag) {

  }

  var Pibble = function(el, options) {
    this.options = options;
    this.id = id++;
    this.element = $(el);
    this.setInitialProperties();
    this.init();

    return this;
  };

  Pibble.prototype = {
    init: function() {
      this.element.addClass(this.baseClass);
      this.element.addClass('pibble');
      this.addEventListeners();
      this.setBaseAttributes();
      this.setUpToolbar();
      this.emptyCheck();
      return this;
    },

    setInitialProperties: function() {
      this.baseClass = 'pibble-' + this.id;
      this.menuSelectionInProgress = false;
    },

    setUpToolbar: function() {
      var toolbar = getToolbarHTML(this.options.formattingOptions, this.baseClass).hide();
      $('body').append(toolbar);
      this.toolbar = toolbar;
    },

    setBaseAttributes: function() {
      this.element.attr('contentEditable', true);
    },

    handleFormattingSelection: function(e) {
      var self = this;
      var formatting = $(e.currentTarget).data('format-option');
      var sel = window.getSelection();
      var range = sel.getRangeAt(0);
      this.restoreSelection(sel, range, function() {
        self.applyFormatting(formatting);
      });
    },

    restoreSelection: function(sel, range, cb) {
      var self = this;

      /* Bit of a 'hack', we need to wait for the content editable element to perform it's 
         clearing of the text due to loss of focus (from clicking the toolbar), before we can then
         re-insert the text range. Whilst the element has technically lost focus, we're working with 
         the toolbar and therefore the text is still active and should be selected as such. */
      setTimeout(function() {
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        cb();       
      }, 0);
    },

    applyFormatting: function(formatting) {
      this.formatting[formatting]();
      this.setActiveFormats();
    },

    formatting: {
      bold: function() {
        document.execCommand('bold');
      },

      italic: function() {
        document.execCommand('italic');
      },

      link: function() {

      },

      insertunorderedlist: function() {
        document.execCommand('insertunorderedlist');
      },
      
      insertorderedlist: function() {
        document.execCommand('insertorderedlist');
      },

      undo: function() {
        document.execCommand('undo');
      },

      redo: function() {
        document.execCommand('redo');
      }
    },

    addEventListeners: function() {
      var self = this;
      
      this.element[0].addEventListener('paste', this.handlePaste);
      
      $(document).on('keyup.' + this.baseClass, this.element, function(e) {
        // self.handleKeyup(e);
        // If it's a text node and it's parent is the element, it's IE being a douche.
        // This is when you manually click back within the element from somewhere else.
        // IE will 'focus' and report the right elements on keydown, yet by keyup a new empty
        // text node will have been filled and inserted with the text
        // var start = window.getSelection().getRangeAt(0).startContainer;

        // if (start.nodeType === 3 && start.parentNode === self.element[0]) {
        //   var p = document.createElement('p');
        //   p.textContent = start.textContent;
        //   start.parentNode.replaceChild(p, start);
        //   self.refocus(p, p.textContent.length);
        // }
      });

      $(document).on('keydown.' + this.baseClass, this.element, function(e) {
        // self.handleKeydown(e);      
      });
      
      $(document).on('mouseup.' + this.baseClass, '.' + this.baseClass, function(e) {
        self.handleMouseUp(e);
      });

      $(document).on('mouseup.' + this.baseClass, '.' + this.baseClass + '-toolbar li', function(e) {
        e.stopPropagation(); // Mouseup on our toolbar buttons shouldn't propagate to the main element
      }); 


      $(document).on('mousedown.' + this.baseClass, '.' + this.baseClass + '-toolbar li', function(e) {
        self.menuSelectionInProgress = true;
        self.handleFormattingSelection(e);
      }); 

      $(document).on('blur.' + this.baseClass, '.' + this.baseClass, function(e) {
        if (!self.menuSelectionInProgress) {
          self.handleBlur(e);          
        }

        // Blur skipped, set selection in progress back to false
        self.menuSelectionInProgress = false;
      });          
    },

    handleClick: function(e) {

    },

    handlePaste: function(e) {
      if (e.clipboardData) {
        if (e.clipboardData.types) {
          var plainText = e.clipboardData.getData('text/plain');
          var html = e.clipboardData.getData('text/html');
        } 

        else {
          // Types array seems to be implemented everywhere (apart from IEs case below),
          // but I'll leave this here for now.
          // var text = e.clipboardData.getData('text/plain');
          // var url = e.clipboardData.getData('text/uri-list');
          // var html = e.clipboardData.getData('text/html');
        }
      }

      else {
        // IE
        if (window.clipboardData) {
          var plainText = window.clipboardData.getData('Text');
          var url = window.clipboardData.getData('URL');
        }
      }
    },

    getSelection: function(cb) {
      var selection = window.getSelection();

      // Check if a selection exists within the element
      if ($(selection.anchorNode).parents('.' + this.baseClass).length > 0) {
        // Check the selection contains text, rather than just the cursor
        // Mouseup fires too quickly, hence the timeout
        window.setTimeout(function() {
          if ((selection.type && selection.type !== 'Caret') || (!selection.isCollapsed)) {
            cb(selection);
          }

          else {
            cb(false);
          }
        }, 0);
      }

      else {
        cb(false);
      }
    },

    handleMouseUp: function(e) {
      var self = this;

      function handle(result) {
        var x = e.pageX;
        var y = e.pageY;
        self.positionToolbar(x, y);
        self.showToolbar();
      }

      this.getSelection(function(result) {
        if (result) {
          handle(result);
        }

        else {
          self.hideToolbar();
        }
      });
    },

    handleBlur: function() {
      this.hideToolbar();
    },

    positionToolbar: function(x, y) {
      this.toolbar.css({
        position: 'absolute',
        top: y + 15,
        left: x
      });
    },

    setActiveFormats: function() {
      var self = this;
      
      var formats = this.options.formattingOptions;

      for (var key in formats) {
        var applied = document.queryCommandState(formats[key].name);
        self.toolbar.find('.' + formats[key].className).toggleClass('active', applied);
      };
    },

    showToolbar: function() {
      this.setActiveFormats();
      this.toolbar.show();
    }, 

    hideToolbar: function() {
      this.toolbar.hide();
    },

    cleanContent: function() {
      this.element.find('div').contents().unwrap().wrap('<p/>');  
    },

    handleKeydown: function(e) {
      var self = this;

      var range = window.getSelection().getRangeAt(0);

      if (e.keyCode === 8) {

        // The placeholder is active, we are in the first element after it, 
        // and pressing backspace. We want to cancel this to stop flickering
        // in chrome, Opera etc, and also stop Firefox from reverting to it's
        // defaults and inserting a <br />
        if (this.placeholderEl &&
            range.startContainer === this.placeholderEl.nextSibling &&
            range.startOffset === 0) {
            e.preventDefault();
        }
      }

      if (e.keyCode === 13) {
        e.preventDefault();
        this.handleEnterKey();
      }

      if ((e.keyCode === 13) && (this.options.mode === 'inline')) {
        e.preventDefault();
      }
    },

    handleKeyup: function(e) {
      // this.emptyCheck(e);
    },

    // Browsers are far too inconsistent in their handling of the return key. 
    // So we handle it instead. This method is quite long, but there are a lot
    // of use cases to handle.
    handleEnterKey: function() {
      var sel = window.getSelection();
      var range = sel.getRangeAt(0);
      var anchor = sel.anchorNode;
      var el;

  
      // el will be a <p>, <li> and so on. 
      if (anchor.nodeType === 1) {
        el = anchor;
      }

      else if (anchor.nodeType === 3) {
        // This extra check is for Firefox who sneakily goes back to inserting text 
        // without a <p> element on <ctrl + a>, <backspace> and then <backspace> again
        // Pop a fix in there to replace with a <p>. IE will also do this when you
        // manually focus the element with a click, and start typing. 
        if (anchor.parentNode === this.element[0]) {
          el = anchor; // Text node
          var p = document.createElement('p');
          p.textContent = el.textContent;
          el.parentNode.replaceChild(p, el);
          el = p; // Set to the replaced element
          this.refocus(el, el.textContent.length);
        }

        else {
          // The text nodes containing <p>, <li> etc
          el = anchor.parentNode;
        }
      }

      // We have the el, we now need to deal with one of four scenarios:
      
      // Presssing enter right at the end of the node in a collapsed state, in which case just skip to the newline - endCollapsedState

      if (range.collapsed && (range.startContainer.textContent.length === range.startOffset)) {
        this.handleEndCollapsedState(sel, range, el);
      }

      // Pressing enter in a collapsed state, but part way in the node, move the rest of the node to the newline - middleCollapsedState

      else if (range.collapsed && (range.startContainer.textContent.length !== range.startOffset)) {
        this.handleMiddleCollapsedState(sel, range, el);
      }

      // Pressing enter with highlighted text within the same node, at the end of the node, delete text and go new line - endNonCollapsedState

      else if (!range.collapsed && (range.startContainer === range.endContainer) && (range.endContainer.textContent.length === range.endOffset)) {
        this.handleEndNonCollapsedState(sel, range, el);
      }

      // Pressing enter with hihglighted text within the same node, but in the middle of the node, delete text and send the rest of the text to a new line - middleNonCollapsedState

      else if (!range.collapsed && (range.startContainer === range.endContainer) && (range.endContainer.textContent.length !== range.endOffset)) {
        this.handleMiddleNonCollapsedState(sel, range, el);
      }

      // Pressing enter with highlighted text that spans multiple nodes, delete the text and don't insert a new line - spannedNonCollapsedState

      else if (!range.collapsed && (range.startContainer !== range.endContainer)) {
        this.handleSpannedNonCollapsedState(sel, range, el);
      }

      
    },

    handleEndCollapsedState: function(sel, range, el) {
      var p = document.createElement(el.nodeName.toLowerCase());
      DOM.insertAfter(p, el);
      this.lastElInserted = p;
      this.refocus(p);
    },

    handleMiddleCollapsedState: function(sel, range, el) {
      var toRemain = range.startContainer.textContent.substring(0, range.startOffset);
      var toExtract = range.startContainer.textContent.substring(range.startOffset);
      el.textContent = toRemain;
      var p = document.createElement(el.nodeName.toLowerCase());
      p.textContent = toExtract;
      DOM.insertAfter(p, el);
      this.lastElInserted = p;
      this.refocus(p);
    },

    handleEndNonCollapsedState: function(sel, range, el) {
      var toRemain = range.startContainer.textContent.substring(0, range.startOffset);
      el.textContent = toRemain;
      var p = document.createElement(el.nodeName.toLowerCase());
      DOM.insertAfter(p, el);
      this.lastElInserted = p;
      this.refocus(p);
    },

    handleMiddleNonCollapsedState: function(sel, range, el) {
      var toRemain = range.startContainer.textContent.substring(0, range.startOffset);
      var toExtract = range.startContainer.textContent.substring(range.endOffset, range.startContainer.textContent.length);
      el.textContent = toRemain;
      var p = document.createElement(el.nodeName.toLowerCase());
      p.textContent = toExtract;
      DOM.insertAfter(p, el);
      this.lastElInserted = p;
      this.refocus(p);
    },

    handleSpannedNonCollapsedState: function(sel, range, el) {
      var toRemainInAnchorNode = range.startContainer.textContent.substring(0, range.startOffset);
      var toRemainInFocusNode = range.endContainer.textContent.substring(range.endOffset, range.endContainer.textContent.length);
      range.startContainer.textContent = toRemainInAnchorNode;
      range.endContainer.textContent = toRemainInFocusNode;

      sibling = range.startContainer.parentNode.nextSibling;

      while (sibling) {
        if (sibling !== range.endContainer.parentNode) {
          var next = sibling.nextSibling;
          this.element[0].removeChild(sibling);
          sibling = next;
        }

        else {
          sibling = null;
        }
      }
      
      this.refocus(range.endContainer);
    },

    elementIsEmpty: function() {
      // Will cover most
      if (this.element[0].innerHTML.trim() === '') {
        return true;
      }

      // When clicking the element manually with the placeholder active, 
      // then pressing backspace, IE inserts &nbsp;, this will cover those.
      // No point doing this for everyone due to the regex penalty.
      if (this.element[0].innerHTML.trim().replace(/&nbsp;/gi,'') === '') {
        this.element[0].innerHTML = this.element[0].innerHTML.replace(/&nbsp;/gi,'');
        return true;
      }

      else {
        return false;
      }
    },

    emptyCheck: function(e) {
      var self = this;

      this.removeDeadElements();
      
      // Element is empty, so insert a placeholder <p> element
      if (this.elementIsEmpty()) {
        var p = document.createElement('p');
        p.contentEditable = false;
        $(p).addClass('pibble-placeholder');
        p.appendChild(document.createTextNode("Placeholder text"));
        this.element[0].appendChild(p);
        this.placeholderEl = p;

        var p = document.createElement('p');
        p.className = 'intro-para';
        
        this.element[0].appendChild(p);

        this.refocus(p);
      }

      // Not empty
      else {
        // Check if current content matches the content of the placeholder at the time of insertion,
        // if not, and there is actually an active placeholder, remove it. 
        // this.element[0].innerHTML.trim() != this.snapshot
        if ((this.placeholderEl) 
            && (this.element[0].children[0] === this.placeholderEl)
            && (this.element[0].children[0].nextSibling.textContent !== '')) {

          this.placeholderEl.parentNode.removeChild(this.placeholderEl);
          this.placeholderEl = null; // We've removed it, so nullify our internal reference too
        }
        
      }
    },

    removeDeadElements: function() {
      var children = this.element[0].children;

      // Solitary element (will ignore text nodes)
      if (children.length === 1) {
        // Is empty, and is not an empty <p> that we've manually inserted on return
        if ((children[0].textContent === '') && (children[0] !== this.lastElInserted)) {
          this.element[0].removeChild(children[0]);          
        }
      }
    },

    // Focuses the element in Chrome and Safari (.focus() alone won't insert cursor)
    refocus: function(el, index) {
      var sel = window.getSelection();
      var range = document.createRange();
      range.setStart(el, (index || 0));
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      // IE, Opera and Firefox will obey this
      this.element.focus();
    },

    getContent: function(contentType) {
      return this['get' + contentType]();
    },

    getMarkdown: function() {  
      return new reMarked().render(this.getHTML());
    },

    getHTML: function() {
      this.sanitiseContent(this.element[0].innerHTML);
      return this.element.html();
    },

    sanitiseContent: function(content) {
      // Straight up remove all &nbsp;
      content = content.replace(/&nbsp;/gi,'');
      var donour = document.createElement('div');
      donour.innerHTML = content;

      // Get rid of <br /> elements altogether
      this.removeEls(donour, 'br');

      // Wrap top-level text nodes with a <p> element
      this.wrapTextNodes(donour);

      // Get rid of empty <div> and <p> elements
      this.removeEmptyElements(donour, 'div');
      this.removeEmptyElements(donour, 'p');

      // Replace <div> with <p> 

      // <p> elements with multiple text nodes post <br /> removal

      console.log(donour)
    },

    removeEmptyElements: function(el, tag) {
      var els = el.querySelectorAll(tag);
      for (var i = 0; i < els.length; i++) {
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

    removeEls: function(content, tag) {      
      var els = content.querySelectorAll(tag);
      for (var i = 0; i < els.length; i++) {
        els[i].parentNode.removeChild(els[i]);
      }
    },

    wrapTextNodes: function(content) {
      for (var i = 0; i < content.childNodes.length; i++) {
        if (content.childNodes[i].nodeType === 3) {
          var p = document.createElement('p');
          p.textContent = content.childNodes[i].textContent;
          content.childNodes[i].parentNode.replaceChild(p, content.childNodes[i]);
        }
      }
    },

    markdown: function() {
      return this.getContent('Markdown');
    },

    HTML: function() {
      return this.getContent('HTML');
    },

    destroy: function() {
      // Set content editable attr back to inherit
      this.element.attr('contentEditable', 'inherit');

      // Remove event listeners with the ID suffix of the instance
      $(document).off('mouseup.' + this.baseClass);
      $(document).off('mouseup.' + this.baseClass);
      $(document).off('mousedown.' + this.baseClass); 
      $(document).off('blur.' + this.baseClass);          
      
      // Remove the toolbar element
      this.toolbar.remove();
    }
  };

  // Export the jQuery plugin definition
  $.fn.Pibble = function(options) {
    var opts = $.extend(true, {}, $.fn.Pibble.defaults, options);

    return this.each(function() {
      var $this = $(this);
      var instance = $this.data('Pibble');

      if (!instance) {
        $this.data('Pibble', (instance = new Pibble(this, opts)));
      }

      // Called with a method
      if (typeof options === 'string') {
        instance[options]()
      }
    });
  }

  // Plugin defaults
  $.fn.Pibble.defaults = {
    returnFormat: 'Markdown',
    mode: 'regular',
    placeholderText: 'Insert content',
    formattingOptions: {
      bold: {
        name: 'bold',
        className: 'icon-bold',
        enabled: true
      },

      italic: {
        name: 'italic',
        className: 'icon-italic',
        enabled: true
      },

      insertunorderedlist: {
        name: 'insertunorderedlist',
        className: 'icon-list-ul',
        enabled: true
      },

      insertorderedlist: {
        name: 'insertorderedlist',
        className: 'icon-list-ol',
        enabled: true
      },

      undo: {
        name: 'undo',
        className: 'icon-undo',
        enabled: true
      },

      redo: {
        name: 'redo',
        className: 'icon-rotate-right',
        enabled: true
      }
    }
  };

  $.fn.Pibble.Constructor = Pibble;

})(this, jQuery);