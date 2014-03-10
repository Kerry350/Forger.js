Forger.js
=========

forge:

* create (something) strong, enduring, or successful.
* move forward gradually or steadily.

A lightweight editor.

# Where'd the old version go?

There's a detailed explanation of what happened [here](https://kerrygallagher.co.uk/whered-it-go/).

Due to circumstances far beyond my control I had to change the name of this repo, revert / remove all history and rewrite everything. 

Because of this, Forger.js was born.

# Dependencies

Forger does make use of reMarked.js and MicroEvent.js, these are packaged in the /dist versions for you already. Forger doesn't have a dependency on jQuery, although you are free to make use of the optional jQuery wrapper if you want. 

# How to use

Simply make a new Forger instance passing through the element you'd like to have `contenteditable` functionality, and an optional set of options if you wish. 

`new Forger(document.querySelector('#test'), options);`

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

        H1: {
            className: 'fa fa-heading',
            enabled: true
        },

        H2: {
            className: 'fa fa-subheading',
            enabled: true
        },

        H3: {
            className: 'fa fa-intro-text',
            enabled: true
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

TODO: Docs for methods coming soon

# Extend with your own 'Painters'

TODO: Docs for this coming soon

# Plugins

TODO: Docs for this coming soon

# Credits

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
