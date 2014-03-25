# Done

* ~~Add in a classList polyfill for older browsers~~
* ~~Make sure active styles are applied after a painter is applied~~
* ~~Reposition toolbar when painter is applied~~
* ~~Make hooliganismMode option do stuff~~
* ~~Remove jQuery references~~
* ~~Make a 'heading' painter that manages h1, h2 and h3 as a dropdown. I think this will be much nicer.~~ 
* ~~Build the plugin setup~~
* ~~Fix up all content being deleted, i.e. ctrl + a, then backspace, then backspace again~~ (although there's still a janky little jump to fix)
* ~~Use CommonJS modules (by way of Browserify) for handling dependencies~~
* ~~Fix hooliganism mode and <li> elements, pressing enter should be allowed here when empty~~

# Bugs 

* Fix Blockquote methods
* Allow a way to unlink links

# Improvements

* There's a lot of repetition in Painters at the moment. Add shared methods on a base prototype to inherit from.
* Build the History manager to manage undo / redo as the browser does it so inconsistently.
* Build the focus mode plugin
* Build the words plugin
* Make the events methods (addEvent and removeAllEvents) a Mixin to be shared
* Add in some tests
* Fix toolbar positioning (? - it's not 'broken', but I don't know whether the tip of the arrow being placed at the start of the highlight would work better) 
* Add in animation for link input appearing
* Finish / tidy up the CSS
* All the todos in comments...
* Add to Bower once at a stable point