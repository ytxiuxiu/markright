var hljs = require('highlight.js');
var iterator = require('markdown-it-for-inline');

var mr = require('markdown-it')({
  linkify: true,
  typography: true,
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str, true).value;
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
.use(require('markdown-it-github-toc'))
.use(require('markdown-it-video'))
.use(require('markdown-it-katex'))
.use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
  tokens[idx].attrPush([ 'target', '_blank' ]);
});