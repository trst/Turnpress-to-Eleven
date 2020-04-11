// Make `.env` key-value available to Eleventy
require('dotenv').config();

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy('src/assets');

  /**
   * Eleventy Filter: `ago`
   * ======================
   * Takes a string and uses moment to format it into a new string
   * based on the 'x days ago' format
   *
   * @docs https://momentjs.com/docs/#/displaying/fromnow/
   *
   * @param  { String } date
   * @return { String }
   */
  eleventyConfig.addFilter('ago', function(date) {
    const moment = require('moment');

    return moment(date).fromNow();
  });

  /**
   * Eleventy Filter: `date`
   * =======================
   * Takes a string and uses moment to format it into a new string
   * second parameter sets date format; See moment docs for more info
   *
   * @docs https://momentjs.com/docs/#/parsing/string-format/
   *
   * @param  { String } date
   * @param  { String } format
   * @return { String }
   */
  eleventyConfig.addFilter('date', function(date, format) {
    const moment = require('moment');
    return (format) ? moment(date).format(format) : moment(date).format("MMMM Do, YYYY");
  });

  /**
   * Eleventy Filter: sort_array
   * ===========================
   * Sorts an array of objects/arrays and sorts them by a particular
   * property. See `base.njk` for an example use sorting pages by title
   * for the navigation.
   *
   * @docs https://lodash.com/docs/#orderBy
   *
   * @param  { Array }  array to be sorted, i.e., the filtered 11ty object
   * @param  { String } path or property to be sorted by
   * @param  { String } order direction i.e., `asc` or `desc`
   *
   * @return { Array }
   */
  eleventyConfig.addFilter('sort_array', function(array, path, order) {
    const orderBy = require('lodash/orderBy');

    return orderBy(array, path, order);
  });

  /**
   * Eleventy Plugin: Local Images
   * =============================
   * Makes an async request to download images locally at build time.
   *
   * Intended to be used in conjunction with Netlify, to take advantage
   * of its default CDN. If you use a CDN with WordPress already,
   * disable this plugin.
   */
  const localImages = require('eleventy-plugin-local-images');
  eleventyConfig.addPlugin(localImages, {
    distPath: 'build',
    assetPath: '/assets/img',
    selector: 'img',
    verbose: true
  });

  return {
    dir: {
      input: "src",
      output: "build"
    }
  }
}
