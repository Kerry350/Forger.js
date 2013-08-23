Pibble.js
======

**This is a work in progress. The plugin isn't completely finished yet. Use at your own risk.**

Pibble.js transforms near enough any element in to a content editable region. It makes use of HTML5's `contenteditable` attribute. 

At the moment this is built as a jQuery plugin, but I'll be porting it over to 'vanilla' JS soon - therefore there will be no dependencies. (It's okay, there will still be a jQuery plugin wrapper for optional use).

# Examples

Use like so:

```javascript
$('#element').Pibble();
```

If you'd like to retrieve the content of the element, either formatted as HTML or Markdown, you can use either:

```javascript
$('#element').data('Pibble').HTML()
```

or

```javascript
$('#element').data('Pibble').markdown()
```

The HTML to Markdown parsing is thanks to reMarked.js, all credit to Leon Sorokin for that. 

# Isn't Pibble a stupid name?
Yeah, it's pretty stupid. I'm terrible at naming things, so Pibble is the result of the vowels of Scribble and Penman being merged (both being words to do with writing).
