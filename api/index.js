const { handle, baseUrl } = require('./_lib/http');
const { BATCH_SIZE, BATCH_LIMIT, BATCH_WINDOW_MS } = require('./_lib/config');

module.exports = handle((req, res) => {
  const base = `${baseUrl(req)}/api`;
  res.status(200).json({
    name: "Heaven's Data",
    note: 'Unofficial API inspired by Preacher. No key, no accounts, nothing is stored: data is generated on the fly.',
    characters: `${base}/characters`,
    locations: `${base}/locations`,
    souls: `${base}/souls`,
    souls_batch: `${base}/souls/batch`,
    batch: { size: BATCH_SIZE, limit: BATCH_LIMIT, window_seconds: BATCH_WINDOW_MS / 1000 },
  });
});
