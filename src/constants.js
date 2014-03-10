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


