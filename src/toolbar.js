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