var lnum = require('code-highlight-linenums');
var hljs = require('highlight.js');
var iterator = require('markdown-it-for-inline');

var mr = require('markdown-it')({
  linkify: true,
  typography: true,
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return lnum(str, {
          hljs: hljs,
          lang: lang,
          start: 1
        });
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
})
.use(require('markdown-it-sub'))
.use(require('markdown-it-sup'))
.use(require('markdown-it-footnote'))
.use(require('markdown-it-deflist'))
.use(require('markdown-it-abbr'))
.use(require('markdown-it-emoji'))
.use(require('markdown-it-container'))
.use(require('markdown-it-ins'))
.use(require('markdown-it-task-lists'))
.use(require('markdown-it-mark'))
.use(require('markdown-it-github-toc'), {
  tocClassName: 'mr-toc',
  anchorClassName: 'mr-anchor'
})
.use(require('markdown-it-video'))
.use(require('markdown-it-katex'));

mr.renderer.renderToken = function(tokens, idx, options) {
  var token = tokens[idx];

  // source line number
  if (token.map && token.level === 0 && token.type.endsWith('_open')) {
    line = token.map[0];
    token.attrJoin('class', 'line');
    token.attrSet('data-line', String(token.map[0]));
  }

  // link target
  if (token && token.type === 'link_open' && token.attrPush) {
    token.attrPush(['target', '_blank']);
  }

  return mr.renderer.constructor.prototype.renderToken.call(this, tokens, idx, options);
};

module.exports = mr;