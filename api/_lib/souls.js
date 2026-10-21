const crypto = require('crypto');
const { locations } = require('./data');

// Where a soul can be, how likely, and which statuses fit there.
const PLACES = [
  { name: 'Registration Gate', weight: 20, statuses: ['registered', 'in_transit'] },
  { name: 'Pray Fields', weight: 25, statuses: ['wandering', 'praying'] },
  { name: 'Magic Forest', weight: 15, statuses: ['wandering', 'resting'] },
  { name: 'Dormitory', weight: 25, statuses: ['resting'] },
  { name: 'Observational Cloud', weight: 5, statuses: ['watching'] },
  { name: 'All Saints Church', weight: 5, statuses: ['praying'] },
  { name: 'Hell', weight: 5, statuses: ['lost'] },
].map((p) => ({ ...p, location: locations.find((l) => l.name === p.name) }));

const STATUSES = [...new Set(PLACES.flatMap((p) => p.statuses))];

const FIRST = ['Abel', 'Agnes', 'Amos', 'Beatrice', 'Cain', 'Clara', 'Dolores', 'Eli', 'Esther', 'Felix', 'Gideon', 'Hazel', 'Ida', 'Jonah', 'Lena', 'Mabel', 'Noah', 'Opal', 'Rufus', 'Silas', 'Tessa', 'Uriah', 'Vera', 'Walt', 'Zelda'];
const LAST = ['Ashby', 'Barlow', 'Caldwell', 'Dunmore', 'Everett', 'Fairchild', 'Granger', 'Holloway', 'Ingram', 'Jessup', 'Kendrick', 'Lockwood', 'Mercer', 'Nolan', 'Oakley', 'Pruitt', 'Quimby', 'Rhodes', 'Sutton', 'Tolliver', 'Underhill', 'Voss', 'Whitlock', 'Yates'];

const pick = (arr) => arr[crypto.randomInt(arr.length)];

function pickPlace(places) {
  const total = places.reduce((sum, p) => sum + p.weight, 0);
  let r = crypto.randomInt(total);
  for (const p of places) {
    if (r < p.weight) return p;
    r -= p.weight;
  }
  return places[places.length - 1];
}

// filters: { location: <location id>, status: <status> } - both optional.
// Returns null when the filters match no place at all.
function generateSouls(count, filters = {}) {
  let places = PLACES;
  if (filters.location) places = places.filter((p) => String(p.location.id) === String(filters.location));
  if (filters.status) places = places.filter((p) => p.statuses.includes(filters.status));
  if (places.length === 0) return null;

  const souls = [];
  for (let i = 0; i < count; i++) {
    const place = pickPlace(places);
    const statuses = filters.status ? [filters.status] : place.statuses;
    souls.push({
      id: crypto.randomBytes(6).toString('hex'),
      name: `${pick(FIRST)} ${pick(LAST)}`,
      status: pick(statuses),
      location: { id: place.location.id, name: place.location.name },
    });
  }
  return souls;
}

module.exports = { generateSouls, STATUSES };
