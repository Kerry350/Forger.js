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
