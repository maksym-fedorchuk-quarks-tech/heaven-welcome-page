// Static catalog, inspired by the Preacher universe. Statuses are API fiction, not canon.
const characters = [
  { id: 1, name: 'Jesse Custer', status: 'Alive', species: 'Human', gender: 'Male', origin: 'Annville', location: 'Annville' },
  { id: 2, name: "Tulip O'Hare", status: 'Alive', species: 'Human', gender: 'Female', origin: 'Ratwater', location: 'New Orleans' },
  { id: 3, name: 'Cassidy', status: 'Alive', species: 'Vampire', gender: 'Male', origin: 'Unknown', location: 'New Orleans' },
  { id: 4, name: 'Eugene "Arseface" Root', status: 'Alive', species: 'Human', gender: 'Male', origin: 'Annville', location: 'Hell' },
  { id: 5, name: 'The Saint of Killers', status: 'Dead', species: 'Human', gender: 'Male', origin: 'Ratwater', location: 'Hell' },
  { id: 6, name: 'Herr Starr', status: 'Alive', species: 'Human', gender: 'Male', origin: 'Unknown', location: 'Masada' },
  { id: 7, name: 'Jody', status: 'unknown', species: 'Human', gender: 'Male', origin: 'Angelville', location: 'Angelville' },
  { id: 8, name: 'T.C.', status: 'unknown', species: 'Human', gender: 'Male', origin: 'Angelville', location: 'Angelville' },
  { id: 9, name: 'Odin Quincannon', status: 'Dead', species: 'Human', gender: 'Male', origin: 'Annville', location: 'Hell' },
  { id: 10, name: 'Hugo Root', status: 'unknown', species: 'Human', gender: 'Male', origin: 'Annville', location: 'Annville' },
  { id: 11, name: 'Emily Woodrow', status: 'Alive', species: 'Human', gender: 'Female', origin: 'Annville', location: 'Annville' },
  { id: 12, name: "Marie L'Angelle", status: 'Dead', species: 'Human', gender: 'Female', origin: 'Angelville', location: 'Hell' },
  { id: 13, name: 'DeBlanc', status: 'Alive', species: 'Angel', gender: 'Male', origin: 'Heavens', location: 'Registration Gate' },
  { id: 14, name: 'Fiore', status: 'Alive', species: 'Angel', gender: 'Male', origin: 'Heavens', location: 'Registration Gate' },
  { id: 15, name: 'Genesis', status: 'unknown', species: 'Entity', gender: 'unknown', origin: 'Heavens', location: 'Unknown' },
  { id: 16, name: 'God', status: 'unknown', species: 'Deity', gender: 'unknown', origin: 'Heavens', location: 'Unknown' },
];

// The first six are the Heavens areas soul events used to come from.
const locations = [
  { id: 1, name: 'Registration Gate', type: 'Gate', realm: 'Heavens' },
  { id: 2, name: 'Pray Fields', type: 'Field', realm: 'Heavens' },
  { id: 3, name: 'Magic Forest', type: 'Forest', realm: 'Heavens' },
  { id: 4, name: 'Dormitory', type: 'Residential', realm: 'Heavens' },
  { id: 5, name: 'Observational Cloud', type: 'Cloud', realm: 'Heavens' },
  { id: 6, name: 'All Saints Church', type: 'Church', realm: 'Heavens' },
  { id: 7, name: 'Annville', type: 'Town', realm: 'Earth' },
  { id: 8, name: 'Angelville', type: 'Plantation', realm: 'Earth' },
  { id: 9, name: 'New Orleans', type: 'City', realm: 'Earth' },
  { id: 10, name: 'Ratwater', type: 'Town', realm: 'Earth' },
  { id: 11, name: 'Masada', type: 'Facility', realm: 'Earth' },
  { id: 12, name: 'Hell', type: 'Realm', realm: 'Hell' },
];

module.exports = { characters, locations };
