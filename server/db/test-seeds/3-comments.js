/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').truncate()
  await knex('comments').insert([
    { authorId: 'def456', itemId: 1, comment: 'Could I claim this?' },
    { authorId: 'abc123', itemId: 1, comment: 'Yes, you can.' },
    {
      authorId: 'def456',
      itemId: 1,
      comment: 'OK. I will come collect it in 20 minutes.',
    },
  ])
}
