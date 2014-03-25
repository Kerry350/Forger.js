function Formatter () {

}

Formatter.prototype = {
  getMarkdown: function(content) {
    return new reMarked({h_atx_suf:  true}).render(content);
  }
};

module.exports = Formatter;