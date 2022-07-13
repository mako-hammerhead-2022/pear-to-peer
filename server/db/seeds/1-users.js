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
      authId: '',
      name: 'Harry Horatio',
      username: 'HairyHarry123',
      email: 'heyharry@example.com',
      postcode: 5010,
    },

    {
      id: 2,
      authId: '',
      name: 'Sally Slippers',
      username: 'SlipsAllDay',
      email: 'sandals1@example.com',
      postcode: 5011,
    },

    {
      id: 3,
      authId: '',
      name: 'Edward Clippers',
      username: 'E-clips-E',
      email: 'clippityclap_3@example.com',
      postcode: 5012,
    },
  ])
}
