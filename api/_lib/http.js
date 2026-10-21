const { PAGE_SIZE } = require('./config');

// Common wrapper: CORS, GET-only, uniform JSON errors.
function handle(fn) {
  return (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET, OPTIONS');
      return res.status(405).json({ error: 'Only GET is supported' });
    }
    try {
      return fn(req, res);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}

function baseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  return `${proto}://${req.headers.host}`;
}

function pageUrl(req, path, query, page) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (k !== 'page' && typeof v === 'string' && v !== '') params.set(k, v);
  }
  params.set('page', String(page));
  return `${baseUrl(req)}${path}?${params.toString()}`;
}

// Rick-and-Morty-style paging: { info: { count, pages, next, prev }, results }.
// Nothing matched or page out of range -> 404 { error: 'There is nothing here' }.
function paginate(req, res, path, items) {
  const page = Number.parseInt(req.query.page, 10) || 1;
  if (page < 1) return res.status(400).json({ error: 'page must be 1 or greater' });
  const pages = Math.ceil(items.length / PAGE_SIZE);
  if (items.length === 0 || page > pages) {
    return res.status(404).json({ error: 'There is nothing here' });
  }
  const start = (page - 1) * PAGE_SIZE;
  return res.status(200).json({
    info: {
      count: items.length,
      pages,
      next: page < pages ? pageUrl(req, path, req.query, page + 1) : null,
      prev: page > 1 ? pageUrl(req, path, req.query, page - 1) : null,
    },
    results: items.slice(start, start + PAGE_SIZE),
  });
}

// Case-insensitive "contains" for `name`, exact (case-insensitive) match for the rest.
function filterItems(items, query, { contains = ['name'], exact = [] }) {
  return items.filter((item) => {
    for (const key of contains) {
      const q = query[key];
      if (typeof q === 'string' && q !== '' && !String(item[key]).toLowerCase().includes(q.toLowerCase())) return false;
    }
    for (const key of exact) {
      const q = query[key];
      if (typeof q === 'string' && q !== '' && String(item[key]).toLowerCase() !== q.toLowerCase()) return false;
    }
    return true;
  });
}

// /resource/1 or /resource/1,3,5 -> object or array (like Rick and Morty API).
function byIds(req, res, items) {
  const ids = String(req.query.id)
    .split(',')
    .map((s) => Number.parseInt(s, 10));
  if (ids.length === 0 || ids.some((n) => !Number.isInteger(n) || n < 1)) {
    return res.status(400).json({ error: 'id must be a positive integer or a comma-separated list of them' });
  }
  const found = ids.map((id) => items.find((x) => x.id === id));
  if (found.some((x) => !x)) return res.status(404).json({ error: 'Not found' });
  return res.status(200).json(ids.length === 1 ? found[0] : found);
}

module.exports = { handle, baseUrl, paginate, filterItems, byIds };
