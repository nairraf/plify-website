// npm install @11ty/eleventy-img --save-dev
// image optimization
const 
    Image = require("@11ty/eleventy-img")
    dev = global.dev = (process.env.ELEVENTY_ENV === 'development');

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
        widths: [25, 300, 600, 900, 1200],
        formats: ["jpeg", "webp"],
        urlPath: "/images/",
        outputDir: "./_site/images/"
    });

    let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: "inline"
    });
}

// 11ty config
module.exports = eleventyConfig => {
    // shortcodes
    //  {% image "./src/images/cat.jpg", "photo of my cat" %}
    //  {% image "./src/images/cat.jpg", "photo of my cat", "(min-width: 30em) 50vw, 100vw" %}
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    // watches - when to recompile
    eleventyConfig.addWatchTarget('./src/_scss/');
    eleventyConfig.addWatchTarget('./src/_js/');
    
    // transforms
    //      Compile SCSS
    //      uncomment only one of the scss compilers below, your choice of postcss or sass
    //eleventyConfig.addTransform('postcss', require('./lib/transforms/postcss'));
    eleventyConfig.addTransform('sass', require('./lib/transforms/sass'));
    //      minify HTML
    eleventyConfig.addTransform('htmlminify', require('./lib/transforms/htmlminify'));
    //      inline assets
    //eleventyConfig.addTransform('inline', require('./lib/transforms/inline'));

    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
};