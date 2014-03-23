/*!	The MIT License (MIT)

	Copyright (c) 2014 Bear & Owl

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/;/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){};
MicroEvent.prototype	= {
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		if( typeof destObject === 'function' ){
			destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
		}else{
			destObject[props[i]] = MicroEvent.prototype[props[i]];
		}
	}
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent;
};/**
  * Copyright (c) 2012, Leon Sorokin
  * All rights reserved. (MIT Licensed)
  *
  * reMarked.js - DOM > markdown
  */
  var reMarked=function(e){function r(e,t){if(!t)return e;for(var n in e){if(typeof t[n]!=="undefined")e[n]=t[n]}}function i(e,t){var n="";while(t-->0)n+=e;return n}function s(e){var e=e.replace(/^\s\s*/,""),t=/\s/,n=e.length;while(t.test(e.charAt(--n)));return e.slice(0,n+1)}function o(e,t,n){return i(t,n-e.length)+e}function u(e,t,n){return e+i(t,n-e.length)}function a(e){if(!e)return"";return"<"+e+">"}function f(e){if(!e)return"";return"</"+e+">"}function l(e,t){return e.replace(/^/gm,t)}function c(e){return(e.nodeName=="#text"?"txt":e.nodeName).toLowerCase()}function h(e,t){var n,r;if(t instanceof Array){n=t[0];r=t[1]}else n=r=t;n=n instanceof Function?n.call(this,e):n;r=r instanceof Function?r.call(this,e):r;return n+e+r}var t=[];var n={link_list:false,h1_setext:true,h2_setext:true,h_atx_suf:false,gfm_code:false,li_bullet:"*-+"[0],hr_char:"-_*"[0],indnt_str:["    ","  ","  "][0],bold_char:"*_"[0],emph_char:"*_"[1],gfm_del:true,gfm_tbls:true,tbl_edges:false,hash_lnks:false,br_only:false};r(n,e);this.render=function(e){if(typeof e=="string"){var r=e;e=document.createElement("div");e.innerHTML=r}var s=new p.tag(e,null,0);var o=s.rend().replace(/^[\t ]+\n/gm,"\n");if(n.link_list){o+="\n\n";var u=0;for(var a in t){if(!t[a].e.title)continue;var f=t[a].e.href.length;if(f&&f>u)u=f}for(var l in t){var c=t[l].e.title?i(" ",u+2-t[l].e.href.length)+'"'+t[l].e.title+'"':"";o+="  ["+(+l+1)+"]: "+t[l].e.href+c+"\n"}}return o.replace(/^[\t ]+\n/gm,"\n")};var p={};p.tag=klass({wrap:"",lnPfx:"",lnInd:0,init:function(e,t,n){this.e=e;this.p=t;this.i=n;this.c=[];this.tag=c(e);this.initK()},initK:function(){var e;if(this.e.hasChildNodes()){var n=/^(?:a|strong|code|em|sub|sup|del|i|u|b|big|center)$/,r,i;for(e in this.e.childNodes){if(!/\d+/.test(e))continue;r=this.e.childNodes[e];i=c(r);if(/style|script|canvas|video|audio/.test(i))continue;if(i=="txt"&&/^\s+$/.test(r.textContent)){if(e==0||e==this.e.childNodes.length-1)continue;var s=this.e.childNodes[e-1],o=this.e.childNodes[e+1];if(s&&!c(s).match(n)||o&&!c(o).match(n))continue}if(!p[i])i="tag";var u=new p[i](r,this,this.c.length);if(u instanceof p.a&&r.href||u instanceof p.img){u.lnkid=t.length;t.push(u)}this.c.push(u)}}},rend:function(){return this.rendK().replace(/\n{3,}/gm,"\n\n")},rendK:function(){var e,t="";for(var n in this.c){e=this.c[n];t+=(e.bef||"")+e.rend()+(e.aft||"")}return t.replace(/^\n+|\n+$/,"")}});p.blk=p.tag.extend({wrap:["\n\n",""],wrapK:null,tagr:false,lnInd:null,init:function(e,t,n){this.supr(e,t,n);if(this.lnInd===null){if(this.p&&this.tagr&&this.c[0]instanceof p.blk)this.lnInd=4;else this.lnInd=0}if(this.wrapK===null){if(this.tagr&&this.c[0]instanceof p.blk)this.wrapK="\n";else this.wrapK=""}},rend:function(){return h.call(this,(this.tagr?a(this.tag):"")+h.call(this,l(l(this.rendK(),this.lnPfx),i(" ",this.lnInd)),this.wrapK)+(this.tagr?f(this.tag):""),this.wrap)},rendK:function(){var e=this.supr();if(this.p instanceof p.li){var t=null,n=e.match(/^[\t ]+/gm);if(!n)return e;for(var r in n){if(t===null||n[r][0].length<t.length)t=n[r][0]}return e.replace(new RegExp("^"+t),"")}return e}});p.tblk=p.blk.extend({tagr:true});p.cblk=p.blk.extend({wrap:["\n",""]});p.ctblk=p.cblk.extend({tagr:true});p.inl=p.tag.extend({rend:function(){return h.call(this,this.rendK(),this.wrap)}});p.tinl=p.inl.extend({tagr:true,rend:function(){return a(this.tag)+h.call(this,this.rendK(),this.wrap)+f(this.tag)}});p.p=p.blk.extend({rendK:function(){return this.supr().replace(/^\s+/gm,"")}});p.div=p.p.extend();p.span=p.inl.extend();p.list=p.blk.extend({expn:false,wrap:[function(){return this.p instanceof p.li?"\n":"\n\n"},""]});p.ul=p.list.extend({});p.ol=p.list.extend({});p.li=p.cblk.extend({wrap:["\n",function(e){return this.p.expn||e.match(/\n{2}/gm)?"\n":""}],wrapK:[function(){return this.p.tag=="ul"?n.li_bullet+" ":this.i+1+".  "},""],rendK:function(){return this.supr().replace(/\n([^\n])/gm,"\n"+n.indnt_str+"$1")}});p.hr=p.blk.extend({wrap:["\n\n",i(n.hr_char,3)]});p.h=p.blk.extend({});p.h_setext=p.h.extend({});n.h1_setext&&(p.h1=p.h_setext.extend({wrapK:["",function(e){return"\n"+i("=",e.length)}]}));n.h2_setext&&(p.h2=p.h_setext.extend({wrapK:["",function(e){return"\n"+i("-",e.length)}]}));p.h_atx=p.h.extend({wrapK:[function(e){return i("#",this.tag[1])+" "},function(e){return n.h_atx_suf?" "+i("#",this.tag[1]):""}]});!n.h1_setext&&(p.h1=p.h_atx.extend({}));!n.h2_setext&&(p.h2=p.h_atx.extend({}));p.h3=p.h_atx.extend({});p.h4=p.h_atx.extend({});p.h5=p.h_atx.extend({});p.h6=p.h_atx.extend({});p.a=p.inl.extend({lnkid:null,rend:function(){var e=this.rendK(),t=this.e.getAttribute("href"),r=this.e.title?' "'+this.e.title+'"':"";if(!t||t==e||t[0]=="#"&&!n.hash_lnks)return e;if(n.link_list)return"["+e+"] ["+(this.lnkid+1)+"]";return"["+e+"]("+t+r+")"}});p.img=p.inl.extend({lnkid:null,rend:function(){var e=this.e.alt,t=this.e.getAttribute("src");if(n.link_list)return"["+e+"] ["+(this.lnkid+1)+"]";var r=this.e.title?' "'+this.e.title+'"':"";return"!["+e+"]("+t+r+")"}});p.em=p.inl.extend({wrap:n.emph_char});p.i=p.em.extend();p.del=n.gfm_del?p.inl.extend({wrap:"~~"}):p.tinl.extend();p.br=p.inl.extend({wrap:["",function(){var e=n.br_only?"<br>":"  ";return this.p instanceof p.h?"<br>":e+"\n"}]});p.strong=p.inl.extend({wrap:i(n.bold_char,2)});p.b=p.strong.extend();p.dl=p.tblk.extend({lnInd:2});p.dt=p.ctblk.extend();p.dd=p.ctblk.extend();p.sub=p.tinl.extend();p.sup=p.tinl.extend();p.blockquote=p.blk.extend({lnPfx:"> ",rend:function(){return this.supr().replace(/>[ \t]$/gm,">")}});p.pre=p.blk.extend({tagr:true,wrapK:"\n",lnInd:0});p.code=p.blk.extend({tagr:false,wrap:"",wrapK:function(e){return e.indexOf("`")!==-1?"``":"`"},lnInd:0,init:function(e,t,r){this.supr(e,t,r);if(this.p instanceof p.pre){this.p.tagr=false;if(n.gfm_code){var i=this.e.getAttribute("class");i=(i||"").split(" ")[0];if(i.indexOf("lang-")===0)i=i.substr(5);this.wrapK=["```"+i+"\n","\n```"]}else{this.wrapK="";this.p.lnInd=4}}}});p.table=n.gfm_tbls?p.blk.extend({cols:[],init:function(e,t,n){this.supr(e,t,n);this.cols=[]},rend:function(){for(var e in this.c)for(var t in this.c[e].c)for(var n in this.c[e].c[t].c)this.c[e].c[t].c[n].prep();return this.supr()}}):p.tblk.extend();p.thead=n.gfm_tbls?p.cblk.extend({wrap:["\n",function(e){var t="";for(var r in this.p.cols){var o=this.p.cols[r],u=o.a[0]=="c"?":":" ",a=o.a[0]=="r"||o.a[0]=="c"?":":" ";t+=(r==0&&n.tbl_edges?"|":"")+u+i("-",o.w)+a+(r<this.p.cols.length-1||n.tbl_edges?"|":"")}return"\n"+s(t)}]}):p.ctblk.extend();p.tbody=n.gfm_tbls?p.cblk.extend():p.ctblk.extend();p.tfoot=n.gfm_tbls?p.cblk.extend():p.ctblk.extend();p.tr=n.gfm_tbls?p.cblk.extend({wrapK:[n.tbl_edges?"| ":"",n.tbl_edges?" |":""]}):p.ctblk.extend();p.th=n.gfm_tbls?p.inl.extend({guts:null,wrap:[function(){var e=this.p.p.p.cols[this.i],t=this.i==0?"":" ",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n=i(" ",r);break;case"c":n=i(" ",Math.floor(r/2));break;default:n=""}return t+n},function(){var e=this.p.p.p.cols[this.i],t=this.i==this.p.c.length-1?"":" |",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n="";break;case"c":n=i(" ",Math.ceil(r/2));break;default:n=i(" ",r)}return n+t}],prep:function(){this.guts=this.rendK();this.rendK=function(){return this.guts};var e=this.p.p.p.cols;if(!e[this.i])e[this.i]={w:null,a:""};var t=e[this.i];t.w=Math.max(t.w||0,this.guts.length);if(this.e.align)t.a=this.e.align}}):p.ctblk.extend();p.td=p.th.extend();p.txt=p.inl.extend({initK:function(){this.c=this.e.textContent.split(/^/gm)},rendK:function(){var e=this.c.join("").replace(/\r/gm,"");if(!(this.p instanceof p.code||this.p instanceof p.pre)){e=e.replace(/^\s*#/gm,"\\#").replace(/\*/gm,"\\*")}if(this.i==0)e=e.replace(/^\n+/,"");if(this.i==this.p.c.length-1)e=e.replace(/\n+$/,"");return e}})};!function(e,t){typeof define=="function"?define(t):typeof module!="undefined"?module.exports=t():this[e]=t()}("klass",function(){function e(e){return i.call(t(e)?e:function(){},e,1)}function t(e){return typeof e===u}function n(e,t,n){return function(){var r=this.supr;this.supr=n[f][e];var i=t.apply(this,arguments);return this.supr=r,i}}function r(e,r,i){for(var s in r)r.hasOwnProperty(s)&&(e[s]=t(r[s])&&t(i[f][s])&&a.test(r[s])?n(s,r[s],i):r[s])}function i(e,n){function i(){}function s(){this.init?this.init.apply(this,arguments):(n||a&&o.apply(this,arguments),l.apply(this,arguments))}i[f]=this[f];var o=this,u=new i,a=t(e),l=a?e:this,c=a?{}:e;return s.methods=function(e){return r(u,e,o),s[f]=u,this},s.methods.call(s,c).prototype.constructor=s,s.extend=arguments.callee,s[f].implement=s.statics=function(e,t){return e=typeof e=="string"?function(){var n={};return n[e]=t,n}():e,r(this,e,o),this},s}var s=this,o=s.klass,u="function",a=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,f="prototype";return e.noConflict=function(){return s.klass=o,this},s.klass=e,e})
;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  inlineEls: [
    'span',
    'br', 
    'b', 
    'strong', 
    'em', 
    'i', 
    'a'
  ],

  blockEls: [
    'p',
    'h1',
    'h2',
    'h3',
    'blockquote',
    'ul',
    'ol'
  ],

  allowedHeaderParents: [
    'p', 
    'div', 
    'h1', 
    'h3', 
    'h2', 
    'h4'
  ],

  disallowedBlockquoteChildren: [
    'ul', 
    'ol', 
    'li'
  ]
};



},{}],2:[function(require,module,exports){
module.exports = {
  formatting: 'Markdown',

  mode: 'regular', // Regular / inline

  placeholder: 'Content here', // Text to be inserted when element is empty

  hooliganismDisabled: true, // Should users be stopped from just sitting hitting enter repeatedly?

  positioning: null,
    
  // Which choices of formatting should be used
  painters: {
    Link: {
      className: 'fa fa-link',
      enabled: true,
    },

    Headings: {
      className: 'fa fa-font headings',
      enabled: true, 
      levels: [1, 2, 3]
    },

    Bold: {
      className: 'fa fa-bold',
      enabled: true
    },

    Italic: {
      className: 'fa fa-italic',
      enabled: true
    },

    UnorderedList: {
      className: 'fa fa-list-ul',
      enabled: true
    },

    OrderedList: {
      className: 'fa fa-list-ol',
      enabled: true
    },

      // TODO: Coming real soon, working in with a proper 'history manager'
      
      // undo: {
      //     className: 'fa-undo',
      //     enabled: true
      // },

      // redo: {
      //     className: 'fa-rotate-right',
      //     enabled: true
      // },

    Blockquote: {
      className: 'fa fa-quote-right',
      enabled: true
    }
  },

  shortcutsEnabled: true,

  shortcuts: [
    {
      key: 'ctrl + b',
      command: 'Bold'
    },

    {
      key: 'ctrl + i',
      command: 'Italic'
    },

    {
      key: 'ctrl + q',
      command: 'Blockquote'
    },

    {
      key: 'ctrl + h',
      command: 'H1'
    },

    {
      key: 'ctrl + s',
      command: 'H2'
    }
  ]
};

},{}],3:[function(require,module,exports){
var Constants = require('./constants');

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
  },

  outerHeight: function(node) {
    var height = node.offsetHeight;   
    return height;
  },

  outerWidth: function(node) {
    var width = node.offsetWidth;
    return width;
  }
};

module.exports = {
  Utils: Utils, 
  DOM: DOM
}

},{"./constants":1}],4:[function(require,module,exports){
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

    if (this.options.hooliganismDisabled) {
      
      var node = DOM.getFirstNonTextParent(new TextSelection().getRange().startContainer);

      if ((e.keyCode === 13) && !node.textContent.trim() && (node.nodeName.toLowerCase() !== 'li')) {
        e.preventDefault();
      }
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

},{"./dom":3,"./logger":8,"./range_and_selection":24}],5:[function(require,module,exports){
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

},{"./defaults":2,"./dom":3,"./editor":4,"./formatter":6,"./painters":16,"./sanitiser":25,"./shortcut_manager":26,"./toolbar":27}],6:[function(require,module,exports){
function Formatter () {

}

Formatter.prototype = {
  getMarkdown: function(content) {
	 return new reMarked({h_atx_suf:  true}).render(content);
	}
};

module.exports = Formatter;
},{}],7:[function(require,module,exports){
// Export the jQuery plugin definition, nothing fancy here
// just a standard jQuery plugin wrapper

var Forger = require('./forger');

module.exports = function() {

  if (window.$) {
    $.fn.Forger = function(options) {

      return this.each(function() {
        var $this = $(this);
        var instance = $this.data('Forger');
        
        if (!instance) {
          $this.data('Forger', (instance = new Forger(this, options)));
        }

        // Called with a method
        if (typeof options === 'string') {
          instance[options]()
        }
      });
    }

    $.fn.Forger.Constructor = Forger;   
  }
}
},{"./forger":5}],8:[function(require,module,exports){
var Forger = require('./forger');

function Log(message) {
  if (Forger.DEBUG) {
    console.log(message);
  }
}

module.exports = Log;
},{"./forger":5}],9:[function(require,module,exports){
var Forger = require('./forger');

// Add optional jQuery wrapper. If jQuery exists globally, 
// Forger will be added to the .fn prototype
require('./jquery_wrapper')();

// Setup plugins
require('./plugins');

// Export the Forger constructor globally
window.Forger = Forger;
},{"./forger":5,"./jquery_wrapper":7,"./plugins":22}],10:[function(require,module,exports){
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


},{"../constants":1,"../dom":3,"../logger":8,"../range_and_selection":24}],11:[function(require,module,exports){
var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

var Bold = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'Bold';
  this.className = forger.options.painters[this.name].className;
};


Bold.prototype = {
  // DOM representation of this painter. The toolbar will assemble these.
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    this.button = li;
    return this.button;
  },

  apply: function() {
    console.log('Painter: Bold: Applying');
    document.execCommand('bold');
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var active = document.queryCommandState('bold');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(Bold);

module.exports = Bold;


},{"../dom":3,"../logger":8,"../range_and_selection":24}],12:[function(require,module,exports){
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
var H1 = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'H1';
  this.className = forger.options.painters[this.name].className;
};


H1.prototype = {
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
        document.execCommand('formatBlock', false, '<h1>');
      }

      else {
        document.execCommand('formatBlock', false, '<p>');
      }
    }

    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var startContainer = new TextSelection().getRange().startContainer;
    var active = DOM.elIsWithinEl(startContainer, 'h1', this.forger.editor.el.parentNode) ? true : false;

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(H1);

module.exports = H1;
},{"../dom":3,"../logger":8,"../range_and_selection":24}],13:[function(require,module,exports){
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
var H2 = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'H2';
  this.className = forger.options.painters[this.name].className;
};

H2.prototype = {
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
        document.execCommand('formatBlock', false, '<h2>');
      }

      else {
        document.execCommand('formatBlock', false, '<p>');
      }
    }
    
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var startContainer = new TextSelection().getRange().startContainer;
    var active = DOM.elIsWithinEl(startContainer, 'h2', this.forger.editor.el.parentNode) ? true : false;

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(H2);

module.exports = H2;


},{"../dom":3,"../logger":8,"../range_and_selection":24}],14:[function(require,module,exports){
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


},{"../dom":3,"../logger":8,"../range_and_selection":24}],15:[function(require,module,exports){
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
},{"../constants":1,"../dom":3,"../logger":8,"../range_and_selection":24}],16:[function(require,module,exports){
// Painters are just little classes that apply one type of formatting
// Think of them as little dudes with paintbrushes painting on a nice Bold,
// or an Italic...

var Painters = {
  Blockquote: require('./blockquote'),
  Bold: require('./bold'),
  Headings: require('./headings'),
  H1: require('./h1'),
  H2: require('./h2'),
  H3: require('./h3'),
  Italic: require('./italic'),
  Link: require('./link'),
  OrderedList: require('./ordered_list'),
  UnorderedList: require('./unordered_list')
};

module.exports = Painters;

},{"./blockquote":10,"./bold":11,"./h1":12,"./h2":13,"./h3":14,"./headings":15,"./italic":17,"./link":18,"./ordered_list":19,"./unordered_list":20}],17:[function(require,module,exports){
var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

var Italic = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'Italic';
  this.className = forger.options.painters[this.name].className;
};


Italic.prototype = {
  // DOM representation of this painter. The toolbar will assemble these.
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    this.button = li;
    return this.button;
  },

  apply: function() {
    document.execCommand('italic');
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var active = document.queryCommandState('italic');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(Italic);

module.exports = Italic;
},{"../dom":3,"../logger":8,"../range_and_selection":24}],18:[function(require,module,exports){
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
        var node = start.querySelectorAll('a')[0];
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


},{"../dom":3,"../logger":8,"../range_and_selection":24}],19:[function(require,module,exports){
var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

var OrderedList = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'OrderedList';
  this.className = forger.options.painters[this.name].className;
};

OrderedList.prototype = {
  // DOM representation of this painter. The toolbar will assemble these.
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    this.button = li;
    return this.button;
  },

  apply: function() {
    document.execCommand('insertorderedlist');
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var active = document.queryCommandState('insertorderedlist');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(OrderedList);

module.exports = OrderedList;


},{"../dom":3,"../logger":8,"../range_and_selection":24}],20:[function(require,module,exports){
var Log = require('../logger');
var TextSelection = require('../range_and_selection');
var DOM = require('../dom').DOM;

var UnorderedList = function(forger) {
  this.enabled = true;
  this.forger = forger;
  this.name = 'UnorderedList';
  this.className = forger.options.painters[this.name].className;
};


UnorderedList.prototype = {
  // DOM representation of this painter. The toolbar will assemble these.
  getDOMButton: function() {
    var li = document.createElement('li');
    var i = document.createElement('i');
    i.className = this.className;
    li.appendChild(i);
    this.button = li;
    return this.button;
  },

  apply: function() {
    document.execCommand('insertunorderedlist');
    this.trigger('formatting:applied');
  },

  assignActiveState: function() {
    var active = document.queryCommandState('insertunorderedlist');

    if (active) {
      this.button.classList.add('active');
    } else {
      this.button.classList.remove('active');
    }
  }
};

MicroEvent.mixin(UnorderedList);

module.exports = UnorderedList;


},{"../dom":3,"../logger":8,"../range_and_selection":24}],21:[function(require,module,exports){
function focusPlugin (forger) {

}

module.exports = focusPlugin;
},{}],22:[function(require,module,exports){
var Forger = require('../forger');
var focusPlugin = require('./focus_mode');
var wordsPlugin = require('./words');

Forger.Plugins = {
  cache: {},
  
  register: function(name, handler) {
    this.cache[name] = handler;
  }
};

// Registers 'official' plugins - doesn't 'use' them, but merely registers their presence
// Instances can choose which plugins they wish to use
Forger.Plugins.register('focusPlugin', focusPlugin);
Forger.Plugins.register('wordsPlugin', wordsPlugin);

/* 

A note on plugins: 
   
Plugins aren't particularly complicated. Any plugin you register needs
to have a name and a handler function. The handler function will be called
with a Forger instance whenever that instance decides to 'use()' the plugin 
with the matching name. This plugin function may do whatever it wishes to 
provide the plugin functionality. By being handed the Forger instance to work 
with one has access to the toolbar, editor, formatter and so on. */


},{"../forger":5,"./focus_mode":21,"./words":23}],23:[function(require,module,exports){
function wordsPlugin (forger) {

}

module.exports = wordsPlugin;
},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

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
},{}],26:[function(require,module,exports){
var keys = {
	16: 'shift',
	17: 'ctrl',
	66: 'b',
	73: 'i',
	81: 'q',
	72: 'h', 
	83: 's'
};

function ShortcutManager (forger, config) {
	this.editor = forger.editor;
	this.mappings = config;
	this.addEventListeners();
}

ShortcutManager.prototype.addEventListeners = function() {
	var self = this;

	function handleKeyDown(e) {
		var parts = [];

		if (e.ctrlKey) {
			parts.push('ctrl');
		}

		if (keys[e.keyCode]) {
			parts.push(keys[e.keyCode]);
		}

		var hotkey = parts.join('+');
		self.processHotkey(hotkey, e);
	}

	this.editor.el.addEventListener('keydown', handleKeyDown);

	this.removeEventListeners = function() {
		this.editor.el.removeEventListener('keydown', handleKeyDown);
	}
};

ShortcutManager.prototype.processHotkey = function(hotkey, e) {
	var self = this;

	this.mappings.forEach(function(mapping) {
		if (mapping.key === hotkey) {
			e.preventDefault(); // Browsers will try to handle some of the hotkeys, like bold, by default
			// TODO: Direct this to the painters!
		}
	});
};

ShortcutManager.prototype.destroy = function() {
	this.removeEventListeners();
};

module.exports = ShortcutManager;

},{}],27:[function(require,module,exports){
'use strict';

var TOOLBAR_HTML = String() +
"<div class='formatting'>" +
  "<ul></ul>" +
"</div>" +
"<div class='link'>" +
  "<div class='link-wrapper'>" +
    "<input type='text' placeholder='e.g. http://www.reddit.com' />" +
    "<button class='js-add-link'><i class='fa fa-plus-circle'></i></button>" +
  "</div>" +
"</div>" +
"<div class='arrow down'></div>";

var Log = require('./logger');
var TextSelection = require('./range_and_selection');
var DOM = require('./dom').DOM;

// Class for the toolbar UI
function Toolbar(forger, baseClass) {
	this.forger = forger;
	this.isHidden = true;
	this.attrs = {};
	this.mode = forger.options.mode; // Inline or not
	this.painters = forger.painters;
	this.el = this.constructToolbar();
	this.state = {};
	document.querySelector('body').appendChild(this.el);
	this.setInitialState();
	this.addEventListeners();
}

Toolbar.prototype = {
	addEventListeners: function() {
		var self = this;

		// TODO: Tidy this up so there's a way for the events to be unbound
		this.painters.forEach(function(painter) {
			painter.bind('formatting:applied', function() {
				self.positionEl();
				self.setActiveFormats();
			})
		});
	},

	constructToolbar: function() {
		var html;

		var wrapper = document.createElement('div');
		wrapper.className = this.forger.baseClass + '-toolbar forger-toolbar hide cf';
		wrapper.innerHTML = TOOLBAR_HTML;

		var ul = wrapper.querySelector('ul');

		// Append and bind to all of our Painter buttons
		this.painters.forEach(function(painter) {
	     var button = painter.getDOMButton();
			ul.appendChild(button);
		
			// Must be on 'mousedown' VS 'click' due to the speed of loss of focus
			button.addEventListener('mousedown', function() {
				Log("Toolbar: Painter clicked")
				var ts = new TextSelection();
				ts.restoreSelection(ts.selection, ts.getRange(), function() {
			 		painter.apply();
				});
			}.bind(this));
		});

		wrapper.querySelector('.formatting').appendChild(ul);

		return wrapper;
	},

	setInitialState: function() {
		this.makeQueryable();
  
		this.attrs.toolbarHeight = DOM.outerHeight(this.el);
		this.attrs.toolbarWidth = DOM.outerWidth(this.el);
		this.attrs.toolbarArrowLeftOffset = parseInt(getComputedStyle(this.el.querySelector('.arrow')).left);
  		this.attrs.toolbarArrowHeight = DOM.outerHeight(this.el.querySelector('.arrow'));

		this.returnFromQueryable();
	},
  	
  	// Allow quick querying of display: none; element
	makeQueryable: function() {
		this.el.classList.add('queryable');
	},
  
	returnFromQueryable: function() {
		this.el.classList.remove('queryable');
	},

	// TODO: This is dead simple atm, it will animate up / down
	enterFormattingMode: function() {
		var formatting = this.el.querySelector('.formatting');
		formatting.style.display = 'block';
		var link = this.el.querySelector('.link');
		link.style.display = 'none';
	},
  	
  	// TODO: This is dead simple atm, it will animate up / down
	enterLinkMode: function() {
		var formatting = this.el.querySelector('.formatting');
		formatting.style.display = 'none';
		var link = this.el.querySelector('.link');
		link.style.display = 'block';
		link.querySelector('input').focus();
	},

	positionEl: function(mousedownOffsets) {
		var range = new TextSelection().getRange();
		var offset =  range.getClientRects()[0];				
		var scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);

		// These chaps sort out our various types of positioning
		// TODO: Sort out Windows being too small, so moving from left to right and so on
		var positioners = {
			sidey: function() {
				this.el.style.top = ((offset.top + scrollTop) - this.attrs.toolbarHeight) + 'px';				
				this.el.style.left = (offset.left - (this.attrs.toolbarArrowLeftOffset + 20)) + 'px';	
			},

			top: function() {
				this.el.style.top = ((offset.top + scrollTop) - this.attrs.toolbarHeight - this.attrs.toolbarArrowHeight) + 'px';
				this.el.style.left = ((offset.left + offset.right) / 2) - (this.attrs.toolbarWidth / 2) + 'px';
			}
		};

		// TODO: Base this off a Forger option
		positioners.top.call(this);
	},

	show: function() {
		Log("Toolbar: Showing");
		this.isHidden = false;
		this.setActiveFormats();
		this.el.classList.remove('hide');
		this.el.classList.add('show');
	},

	hide: function() {
		Log("Toolbar: Hiding");
	  	this.isHidden = true;
	  	this.el.classList.remove('show');
	  	this.el.classList.add('hide');
	},

	setActiveFormats: function() {
		this.painters.forEach(function(painter) {
	  		painter.assignActiveState();
		}); 
	},

	setLinkPlaceholder: function(url) {
  		this.el.querySelector('.link').querySelector('input').value = (url || '');
	}
};

module.exports = Toolbar;
},{"./dom":3,"./logger":8,"./range_and_selection":24}]},{},[9])