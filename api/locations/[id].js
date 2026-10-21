const { handle, byIds } = require('../_lib/http');
const { locations } = require('../_lib/data');

module.exports = handle((req, res) => byIds(req, res, locations));
