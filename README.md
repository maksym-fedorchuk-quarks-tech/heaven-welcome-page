# heaven-welcome-page

Heaven's Data: a free, keyless, stateless API inspired by Preacher, plus its portal. One repository, one Vercel project.

- Portal: static pages in the repository root (`index.html`, `about.html`, `locations.html`).
- API: Vercel functions in `api/`, shared code in `api/_lib/`. Nothing is stored; souls are generated on every request.

Endpoints (all `GET`): `/api`, `/api/characters`, `/api/characters/{id}`, `/api/locations`, `/api/locations/{id}`, `/api/souls`, `/api/souls/batch`. Full docs are on the About page.

Open questions and next steps are tracked in [todo.md](todo.md).
