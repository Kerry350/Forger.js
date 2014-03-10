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
