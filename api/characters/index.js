const { handle, paginate, filterItems } = require('../_lib/http');
const { characters } = require('../_lib/data');

module.exports = handle((req, res) => {
  const items = filterItems(characters, req.query, {
    contains: ['name'],
    exact: ['status', 'species', 'gender'],
  });
  return paginate(req, res, '/api/characters', items);
});
