/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {
      id: 1,
      itemName: 'Hummus',
      allergens: JSON.stringify(['nuts']),
      description:
        'Homecooked Hummus that is both filling and healthy! Cooked with chickpeas, tahini, lemon juice, garlic, cumin, salt and olive oil.',
      imageUrl:
        '["https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3252&q=80"]',
      //expiry: new Date().setDate(new Date().getDate() + 7),
      //Hard-coded for seed data,
      expiry: '2022-07-18 06:38:14',
      availability: 'Yes',
      userId: '1',
    },

    {
      id: 2,
      itemName: 'Scones',
      allergens: JSON.stringify(['eggs', 'nuts', 'dairy']),
      description:
        'Scones with love! Made with flour, sugar, baking powder, salt, butter, cream, eggs, and cashews',
      imageUrl:
        '["https://images.unsplash.com/photo-1589114471223-dec0d8d572c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"]',
      //Hard-coded for seed data,
      expiry: '2022-07-19 06:38:14',
      availability: 'Yes',
      userId: '2',
    },

    {
      id: 3,
      itemName: 'Chicken Empanadas',
      allergens: JSON.stringify(['poultry', 'eggs', 'dairy']),
      description:
        'Empanadas are a type of pastry that is filled with meat and cooked vegetables. Made with chicken, eggs, butter, carrots, greenpeas, potato, and raisins',
      imageUrl:
        '["https://images.themodernproper.com/billowy-turkey/production/posts/2020/Chicken-Empanada-14.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1599768574&s=e3b5e8fe53c559c704cad71e33d367e5"]',
      //Hard-coded for seed data,
      expiry: '2022-07-20 06:38:14',
      availability: 'No',
      userId: '3',
    },
  ])
}
