// Add capability for Eleventy to perform fetch request for dynamic
// data at build time.
const fetch = require('node-fetch');

/**
 * ===================
 * Menu from WordPress
 * ===================
 * Assumes you're using a WP plugin to expose menu items to the REST
 * API, like `WP REST API v2 Menus`. If you're not into setting this
 * kind of thing up yourself, see the accompanying 
 *
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
const menu_name = 'main-menu'; 



async function fetchMenuItems() {
  if (!enabled) return [];

  // Array of Posts
  let items = [];

  try {
    // API Call
    const response = await fetch(`${process.env.API}/wp-json/menus/v1/menus/${menu_name}`);

    // Return response data as JSON
    const data = await response.json();

    // Flag errors during API query
    if (data.errors) {
      let errors = data.errors;

      errors.map(error => console.error(error.message));

      throw new Error("Error fetching items");
    }

    // If no errors, then add returned JSON to Array of Items
    items = items.concat(data.items);
  }

  // Eleventy had some issue executing the the API query
  catch {
      throw new Error("Error Eleventy");
  }

  // Return the Array
  return items;
}

// Export Array of Posts
module.exports = fetchMenuItems();
