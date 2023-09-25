const YAML = require('yamljs');
// API Docs
// Load individual path files and merge them into the main document
console.log(process.cwd());
const auth = ''; // YAML.load('docs/auth.yaml');

module.exports = { auth };
