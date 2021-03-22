// PostCSS CSS processing
// npm i postcss postcss-advanced-variables postcss-nested postcss-scss cssnano --save-dev

/* global dev */

const
    postcss = require('postcss'),
    postcssPlugins = [
        require('postcss-advanced-variables'),
        require('postcss-nested'),
        require('cssnano')
    ],
    postcssOptions = {
        from: 'src/_scss/main.scss',
        syntax: require('postcss-scss'),
        map: dev ? { inline: true } : false
    };

module.exports = async (content, outputPath) => {
    if (!String(outputPath).endsWith('.css')) return content;

    return (
        await postcss(postcssPlugins).process(content, postcssOptions)
    ).css;
};