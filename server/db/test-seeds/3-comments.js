/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').truncate()
  await knex('comments').insert([
    { auth0Id: 'auth0|2', itemId: 1, comment: 'Could I claim this?' },
    { auth0Id: 'auth0|1', itemId: 1, comment: 'Yes, you can.' },
    {
      auth0Id: 'auth0|2',
      itemId: 1,
      comment: 'OK. I will come collect it in 20 minutes.',
    },
    { auth0Id: 'auth0|1', itemId: 2, comment: 'Nice' },
  ])
}
