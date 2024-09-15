// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Lakshita Jain";
export const SITE_DESCRIPTION =
  "I am Lakshita Jain! Welcome to my homepage.";
export const MY_NAME = "Lakshita Jain";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
