// Tunable constants. Open questions about them live in todo.md.
module.exports = {
  PAGE_SIZE: 10, // catalog resources (characters, locations)
  SOULS_LIST_MAX: 20, // /api/souls?count=
  SOULS_LIST_DEFAULT: 20,
  BATCH_SIZE: 100, // /api/souls/batch
  BATCH_LIMIT: 10, // batches per requester per window
  BATCH_WINDOW_MS: 60 * 60 * 1000, // 1 hour
};
