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
