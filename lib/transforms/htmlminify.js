// minify HTML
// npm i html-minifier --save-dev
const htmlmin = require('html-minifier');

module.exports = (content, outputPath) => {
  if (!String(outputPath).endsWith('.html')) return content;

  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true
  });
};