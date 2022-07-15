/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth0Id: '',
      name: 'Harry Horatio',
      username: 'HairyHarry123',
      email: 'heyharry@example.com',
      postcode: 5010,
    },

    {
      id: 2,
      auth0Id: '',
      name: 'Sally Slippers',
      username: 'SlipsAllDay',
      email: 'sandals1@example.com',
      postcode: 5011,
    },

    {
      id: 3,
      auth0Id: '',
      name: 'Edward Clippers',
      username: 'E-clips-E',
      email: 'clippityclap_3@example.com',
      postcode: 5012,
    },

    {
      id: 4,
      auth0Id: '',
      name: 'L.A. Leh',
      username: 'la.la.la',
      email: 'la.la.la@example.com',
      postcode: 5024,
    },

    {
      id: 5,
      auth0Id: '',
      name: 'Scott Carew',
      username: 'carooo.scott',
      email: 'scott.caroo@example.com',
      postcode: 5014,
    },

    {
      id: 6,
      auth0Id: '',
      name: 'Charlotte Greatbatch',
      username: 'charleeeey',
      email: 'charl.great@example.com',
      postcode: 5019,
    },

    {
      id: 7,
      auth0Id: '',
      name: 'Jojo Mepham',
      username: 'jooojooo',
      email: 'jo.jo@example.com',
      postcode: 5016,
    },

    {
      id: 8,
      auth0Id: '',
      name: 'Mat Ruane',
      username: '_mat_',
      email: 'matDman@example.com',
      postcode: 5018,
    },

    {
      id: 9,
      auth0Id: '',
      name: 'Curious George',
      username: 'curiosityFTW',
      email: 'whatIsThat@example.com',
      postcode: 5019,
    },

    {
      id: 10,
      auth0Id: '',
      name: 'Draco Malfoy',
      username: 'notThatBadDraco',
      email: 'notMyDad@example.com',
      postcode: 5022,
    },

    {
      id: 11,
      auth0Id: '',
      name: 'Joey Tribbiani',
      username: 'iLoveFood143',
      email: 'howYouDoin@example.com',
      postcode: 5013,
    },

    {
      id: 12,
      auth0Id: '',
      name: 'Barney Stinson',
      username: 'legendWait4',
      email: '8Dairy@example.com',
      postcode: 5026,
    },
  ])
}
