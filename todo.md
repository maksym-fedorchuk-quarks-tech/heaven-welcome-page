# TODO and open questions

Items to agree on before or after merging. Add here instead of deciding silently.

## Needs a decision

- [ ] **Base URL in docs.** Docs use `https://heavensdata.com/api`. Confirm the canonical host (`heavensdata.com` or `www.heavensdata.com`).
- [ ] **Who is a "requester" for the batch limit?** Currently a salted hash of the IP, kept only in memory. Is that acceptable under "no user data"?
- [ ] **Batch limit values.** Now 10 batches (1000 souls) per hour per requester. Should `/api/souls` (up to 20) be limited too?
- [ ] **Limit enforcement.** The in-memory limiter is per function instance, so it is loose. Options: a Vercel platform rate-limit rule (no storage), or a shared store (contradicts "nothing is stored").
- [ ] **`/souls` vs `/souls/batch`.** Keep both, or fold the short list into the batch endpoint?
- [ ] **Reproducibility.** Add a `seed` parameter (same seed, same souls) for tutorials and tests? It also makes real paging of souls possible.
- [ ] **Soul fields.** Now `id`, `name`, `status`, `location`. Anything else (dates, link to a character)?
- [ ] **Characters and souls.** Should some characters have a matching soul (`soul_id`)?
- [ ] **Page size.** Catalog pages hold 10 items (to show paging with 16 characters). Rick and Morty uses 20.
- [ ] **Catalog content.** Review the 16 characters, their statuses and species. Statuses are API fiction, not canon.
- [ ] **Fan-project wording.** Review the "unofficial, not affiliated" disclaimer and the use of character names.
- [ ] **Cookies.** Postponed on purpose. Nothing sets cookies now.

## Cleanup outside this repository (needs the owner)

- [ ] Delete the `GCP_KEY` secret in the GitHub repository settings (the GCS deploy workflow is removed).
- [ ] Decommission the GCS bucket `www.heavensdata.com`, the `token-generator` Cloud Function and the BigQuery token tables in project `publicdatasource`.
- [ ] Check that DNS for the domain points to Vercel only.
- [ ] Archive the `heaven-data-source` repository once nothing depends on it.

## Portal

- [ ] `locations.html` and `index.html` reference images that are not in `images/` (`pic03.jpg`, `pic05.jpg`, `pic06.jpg`, `pic01.jpg`).
- [ ] "Full Story" buttons on the locations page link to `#`.
- [ ] `Gate.png` (about 3 MB) sits in the repository root and is not used.
- [ ] `404.html` is still the template page.
- [ ] Contact e-mail on pages is plain text or `#`, not a `mailto:` link.

## Ideas for later

- [ ] OpenAPI spec and a "Try it" console on the docs page.
- [ ] Code samples (curl, Python, JS) next to each endpoint.
- [ ] CSV output (`format=csv`) for souls.
- [ ] Tutorials: funnels, filtering, bulk loading with the batch limit.

## Not verified

- [ ] Nothing in this change has been run locally or deployed: the API functions, the Vercel routing of `api/**/[id].js` and the pages are untested. Check a Vercel preview deployment before merging.
