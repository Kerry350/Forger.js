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

