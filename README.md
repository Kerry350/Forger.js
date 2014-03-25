Forger.js
=========

forge:

* create (something) strong, enduring, or successful.
* move forward gradually or steadily.

A lightweight WYSIWYG editor.

# Demo 

You can play with Forger.js [here](http://kerry350.github.io/Forger.js/).

Please bare in mind that there are a few things to fix. I've tried to be super transparent with these issues, they will either be in the TODO.md file or denoted by `// TODO` comments in the code. I'm working as hard as I can to get these checked off when I can. 

# Dependencies

Forger does make use of reMarked.js and MicroEvent.js, these are packaged in the `/dist` versions for you already. Forger doesn't have a dependency on jQuery, although you are free to make use of the optional jQuery wrapper if you want. 

# Installation 

Use either the minified version of Forger.js, or the unminified version, linked within the `/dist` directory. I will be adding Forger.js to Bower once it's at a nice stable point. 

# How to use

Simply make a new Forger instance passing through the element you'd like to have `contenteditable` functionality, and an optional set of options if you wish. 

`new Forger(document.querySelector('#test'), options);`

# Styling (CSS)

I've made the assumption that most people will want to style their own Forger instances. However, there is 'default' Forger.js CSS within `forger.css`. At the moment this is mixed in with CSS I'm using on the demo page, I'll be looking to split this out soon so people can use it properly. I'll also be denoting what is required for Forger.js to work properly, and which styles are totally up to you to implement. That way you can just scrap the optional pieces if you wish. Feel free to use the default look though. 

# Events

There are a number of Forger events you can hook in to. These are:

TODO: Documentation is coming on events

# Options

```
var options = {
    formatting: 'Markdown',

    mode: 'regular', // Regular / inline
     
    placeholder: 'Content here', // Text to be inserted when element is empty

    hooliganismDisabled: true, // Should users be stopped from just sitting hitting enter repeatedly?

    positioning: null, // Info coming soon on this
    
    // Which choices of formatting should be used
    painters: {
        Link: {
            className: 'fa fa-link',
            enabled: true,
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

        Headings: {
            className: 'fa fa-font headings',
            enabled: true, 
            levels: [1, 2, 3] // H1, H2, H3 etc
        },

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
```

# jQuery wrapper

This is just a convenience wrapper, you don't have to use it. 

`$('#test').Forger(options)`

# Public Methods

`var instance = new Forger(document.querySelector('#test'), options);`

### `.HTML()`

Returns the editor's HTML content

`instance.HTML();`

### `.markdown()`

Returns the editor's content in Markdown format

`instance.markdown();`

# Extend with your own 'Painters'

TODO: Docs for this coming soon

# Plugins

TODO: Docs for this coming soon

# Credits

* Browserify for CommonJS module functionality
* HTML to Markdown parsing is provided by [reMarked.js](http://leeoniya.github.io/reMarked.js/) library. 
* Lightweight event emitter capabilities are provided by [MicroEvent.js](https://github.com/jeromeetienne/microevent.js).
* Some CSS animations are provided by [Animate.css](http://daneden.github.io/animate.css/).
* classList functionality is provided to older browsers thanks to a shim from Eli Grey, [ClassList.js](https://github.com/eligrey/classList.js/).

# Alternatives 

You might not like Forger.js, and that's okay. There are a lot of WYSIWYG alternatives, if Forger isn't what you're looking for, one of these might be:

### Paid for 

* [Froala](http://editor.froala.com/)
* [Redactor](http://imperavi.com/redactor/)

### Open source

* [Wymeditor](https://github.com/wymeditor/wymeditor)
* [Summernote](https://github.com/HackerWins/summernote)
* [Bootstrap-wysiwyg](https://github.com/mindmup/bootstrap-wysiwyg)
* [jQuery Notebook](https://github.com/raphaelcruzeiro/jquery-notebook)
* [Medium.js](https://github.com/jakiestfu/Medium.js/)
* [Zenpen](https://github.com/tholman/zenpen)
* [Raptor Editor](https://github.com/PANmedia/raptor-editor)
* [wysihtml5](https://github.com/xing/wysihtml5)

### Monolithic

* [TinyMCE](http://www.tinymce.com/)
* [CKEditor](http://ckeditor.com/)

# License 

The MIT License (MIT)

Copyright (c) 2014, Kerry Gallagher, Bear & Owl

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
