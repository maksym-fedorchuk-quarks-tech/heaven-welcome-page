const { handle, paginate, filterItems } = require('../_lib/http');
const { locations } = require('../_lib/data');

module.exports = handle((req, res) => {
  const items = filterItems(locations, req.query, {
    contains: ['name'],
    exact: ['type', 'realm'],
  });
  return paginate(req, res, '/api/locations', items);
});
