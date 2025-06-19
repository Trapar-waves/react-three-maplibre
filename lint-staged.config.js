/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{ts,tsx,js,css}": "eslint --cache --max-warnings=0 --no-warn-ignored",
};
