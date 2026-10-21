const { handle, byIds } = require('../_lib/http');
const { characters } = require('../_lib/data');

module.exports = handle((req, res) => byIds(req, res, characters));
