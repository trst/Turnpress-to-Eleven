// Add capability for Eleventy to perform fetch request for dynamic
// data at build time.
const fetch = require('node-fetch');

/**
 * Enable Eleventy to access retrieved data
 * ========================================
 * @return { Array } array of post objects available as `{{ posts }}`
 */
async function fetchPosts() {
  // Array of Posts
  let posts = [];

  // Default API Query State
  let paged = 1;
  let total = null;

  // Flag for Loop
  let continueFetch = true;

  while (continueFetch) {
    try {
      // API Call
      const response = await fetch(`${process.env.API}/wp-json/wp/v2/posts?page=${paged}`);

      // Set total with total number of pages returned by WordPress
      // Only run if total hasn't been set, i.e., first iteration
      if (!total) total = response.headers.get('X-WP-TotalPages');

      // Return response data as JSON
      const data = await response.json();

      // Flag errors during API query
      if (data.errors) {
        let errors = data.errors;

        errors.map(error => console.error(error.message));

        throw new Error("Error fetching posts");
      }

      // If no errors, then add returned JSON to Array of Posts
      posts = posts.concat(data);

      // If paged is greater than total, stop iterating the loop
      // I.e., reached the end of the pagination
      if (+paged === +total) continueFetch = false;

      // Increment the current paged
      paged = paged + 1;
    }

    // Eleventy had some issue executing the the API query
    catch {
        throw new Error("Error Eleventy");
    }
  }

  // Return the Array of Posts
  return posts;
}

// Export Array of Posts
module.exports = fetchPosts();
