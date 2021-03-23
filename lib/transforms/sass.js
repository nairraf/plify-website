// sass CSS processing
// npm i sass --save-dev

/* global dev */

const sass = require('sass');

function renderSass(content, outputPath) {
    let result = sass.renderSync({
        data: content,
        /*
            outFile needs to be set to generate the sourceMap.
            the file is not written to disk automatically, sass leaves it up to you to write the file manually
            since we don't care about the file and we are embedding the sourceMap in the returned css (if dev === true) we don't need to write it to disk
            we simply return the result to eleventy and let eleventy write the compiled css file for us
            because of this outFile can be set to anything, but to keep things simple we use eleventy's outputPath
        */
        outFile: outputPath, 
        includePaths: [
            'src/_scss/'
        ],
        outputStyle: 'compressed',
        sourceMap: dev ? true : false,
        sourceMapEmbed: true
    });
    
    return result
}

module.exports = (content, outputPath) => {
    if (!String(outputPath).endsWith('.css')) return content;

    return (
        renderSass(content, outputPath)
    ).css;
};