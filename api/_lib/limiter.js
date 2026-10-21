const crypto = require('crypto');
const { BATCH_LIMIT, BATCH_WINDOW_MS } = require('./config');

// Best-effort, in-memory, per function instance. Nothing is persisted or logged;
// the requester is kept only as a salted hash that dies with the instance.
// See todo.md: replace with a platform-level rate limit.
const salt = crypto.randomBytes(16);
const windows = new Map();

function requesterKey(req) {
  const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '')
    .split(',')[0]
    .trim();
  return crypto.createHash('sha256').update(salt).update(ip).digest('hex');
}

function prune(now) {
  for (const [key, w] of windows) if (w.resetAt <= now) windows.delete(key);
}

// Returns { allowed, limit, remaining, resetSeconds } and consumes one unit when allowed.
function consume(req) {
  const now = Date.now();
  prune(now);
  const key = requesterKey(req);
  let w = windows.get(key);
  if (!w) {
    w = { used: 0, resetAt: now + BATCH_WINDOW_MS };
    windows.set(key, w);
  }
  const resetSeconds = Math.max(1, Math.ceil((w.resetAt - now) / 1000));
  if (w.used >= BATCH_LIMIT) return { allowed: false, limit: BATCH_LIMIT, remaining: 0, resetSeconds };
  w.used += 1;
  return { allowed: true, limit: BATCH_LIMIT, remaining: BATCH_LIMIT - w.used, resetSeconds };
}

module.exports = { consume };
