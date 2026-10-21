const { handle } = require('../_lib/http');
const { generateSouls, STATUSES } = require('../_lib/souls');
const { locations } = require('../_lib/data');
const { consume } = require('../_lib/limiter');
const { BATCH_SIZE } = require('../_lib/config');

module.exports = handle((req, res) => {
  const { status, location } = req.query;
  if (status && !STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${STATUSES.join(', ')}` });
  }
  if (location && !locations.some((l) => String(l.id) === location)) {
    return res.status(400).json({ error: 'location must be a location id from /api/locations' });
  }
  // Check the filters first so a bad request does not burn a batch.
  const results = generateSouls(BATCH_SIZE, { status, location });
  if (!results) return res.status(404).json({ error: 'There is nothing here' });

  const quota = consume(req);
  res.setHeader('X-RateLimit-Limit', String(quota.limit));
  res.setHeader('X-RateLimit-Remaining', String(quota.remaining));
  res.setHeader('X-RateLimit-Reset', String(quota.resetSeconds));
  if (!quota.allowed) {
    res.setHeader('Retry-After', String(quota.resetSeconds));
    return res.status(429).json({ error: 'Batch limit reached, try again later', retry_after_seconds: quota.resetSeconds });
  }
  return res.status(200).json({ info: { count: results.length }, results });
});
