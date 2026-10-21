const { handle } = require('../_lib/http');
const { generateSouls, STATUSES } = require('../_lib/souls');
const { locations } = require('../_lib/data');
const { SOULS_LIST_DEFAULT, SOULS_LIST_MAX } = require('../_lib/config');

module.exports = handle((req, res) => {
  const count = req.query.count === undefined ? SOULS_LIST_DEFAULT : Number.parseInt(req.query.count, 10);
  if (!Number.isInteger(count) || count < 1 || count > SOULS_LIST_MAX) {
    return res.status(400).json({ error: `count must be an integer from 1 to ${SOULS_LIST_MAX}` });
  }
  const { status, location } = req.query;
  if (status && !STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${STATUSES.join(', ')}` });
  }
  if (location && !locations.some((l) => String(l.id) === location)) {
    return res.status(400).json({ error: 'location must be a location id from /api/locations' });
  }
  const results = generateSouls(count, { status, location });
  if (!results) return res.status(404).json({ error: 'There is nothing here' });
  return res.status(200).json({ info: { count: results.length }, results });
});
