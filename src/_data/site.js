// Add capability for Eleventy to perform fetch request for dynamic
// data at build time.
const fetch = require('node-fetch');

/**
 * Enable Eleventy to access retrieved data
 * ========================================
 * @return { Array } array of page objects available as `{{ pages }}`
 */
async function fetchInfo() {

  let information = {};

  try {
    // API Call
    const response = await fetch(`${process.env.API}/wp-json/`);

    // Return response data as JSON
    const data = await response.json();

    information = {
      name: data.name,
      description: data.description,
    }

    // Flag errors during API query
    if (data.errors) {
      let errors = data.errors;

      errors.map(error => console.error(error.message));

      throw new Error("Error fetching site information");
    }

  }

  // Eleventy had some issue executing the the API query
  catch {
      throw new Error("Error Eleventy");
  }

  // Return site info object
  return information;
}

// Export Array of Pages
module.exports = fetchInfo();
