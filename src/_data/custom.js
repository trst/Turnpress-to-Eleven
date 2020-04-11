// Add capability for Eleventy to perform fetch request for dynamic
// data at build time.
const fetch = require('node-fetch');

/**
 * ===============================
 * Custom Data Type from WordPress
 * ===============================
 * This is a template. To enable a new type of data (either from a 
 * custom post type, or for a custom api endpoint, duplicate this file
 * and rename it based on how you'd like Eleventy to access this data
 * in its templating language (e.g., rename it to 'products.js' and
 * the returned data will be accessible under {{ products }}.
 *
 * @return { Array } array of objects
 */

// Unless set to 'true', return empty array
const enabled = false; 

// Set custom endpoint to retrieve data from; this is by default setup
// for Wordpress, but there's no reason why you couldn't pull from
// a different service, say, Airtable, or whatever.
// E.g., 'tm/v1/custom-endpoint'
const endpoint = ''; 



async function fetchItems() {
  // Array of Posts
  let items = [];

  // Default API Query State
  let paged = 1;
  let total = null;

  // Flag for Loop
  let continueFetch = (enabled) ? true : false;

  while (continueFetch) {
    try {
      // API Call
      const response = await fetch(`${process.env.API}/wp-json/${endpoint}?page=${paged}`);

      // Set total with total number of pages returned by WordPress
      // Only run if total hasn't been set, i.e., first iteration
      if (!total) total = response.headers.get('X-WP-TotalPages');

      // Return response data as JSON
      const data = await response.json();

      // Flag errors during API query
      if (data.errors) {
        let errors = data.errors;

        errors.map(error => console.error(error.message));

        throw new Error("Error fetching items");
      }

      // If no errors, then add returned JSON to Array of Items
      items = items.concat(data);

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

  // Return the Array
  return items;
}

// Export Array of Posts
module.exports = fetchItems();
