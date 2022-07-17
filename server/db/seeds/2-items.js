/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').truncate()
  await knex('items').insert([
    {
      itemName: 'Hummus',
      allergens: 'nuts',
      description:
        'Home-cooked Hummus that is both filling and healthy! Cooked with chickpeas, tahini, lemon juice, garlic, cumin, salt and olive oil.',
      imageUrl:
        'https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3252&q=80',
      //expiry: new Date().setDate(new Date().getDate() + 7),
      //Hard-coded for seed data,
      expiry: '2022-07-18 06:38:14',
      availability: 'Yes',
      userId: '1',
    },

    {
      itemName: 'Scones',
      allergens: 'eggs, nuts, dairy',
      description:
        'Scones with love! Made with flour, sugar, baking powder, salt, butter, cream, eggs, and cashews',
      imageUrl:
        'https://images.unsplash.com/photo-1589114471223-dec0d8d572c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      //Hard-coded for seed data,
      expiry: '2022-07-19 06:38:14',
      availability: 'Yes',
      userId: '2',
    },

    {
      itemName: 'Chicken Empanadas',
      allergens: 'poultry, eggs, dairy',
      description:
        'Empanadas are a type of pastry that is filled with meat and cooked vegetables. Made with chicken, eggs, butter, carrots, green peas, potato, and raisins',
      imageUrl:
        'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Chicken-Empanada-14.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1599768574&s=e3b5e8fe53c559c704cad71e33d367e5',
      //Hard-coded for seed data,
      expiry: '2022-07-20 06:38:14',
      availability: 'No',
      userId: '3',
    },

    {
      itemName: 'Fish and Chips',
      allergens: 'fish',
      description:
        'Fish and chips is one of the most famous comfort foods in New Zealand and this particular batch is made from beer-battered hoki and homegrown potatoes.',
      imageUrl:
        'https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      expiry: '2022-08-24, 08:24:02',
      availability: 'Yes',
      userId: '5',
    },

    {
      itemName: 'Chicken Curry',
      allergens: 'poultry, dairy, soya, spices',
      description:
        'This curry has been made with a mixture of herbs and spices including garam masala, coriander, turmeric, cayenne pepper to nae a few. This is a classic Indian main dish that curry lovers would surely enjoy!',
      imageUrl:
        'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
      expiry: '2022-08-18, 05:07:00',
      availability: 'Yes',
      userId: '6',
    },

    {
      itemName: 'Haggis',
      allergens: 'nutmeg, oatmeal, meat, spices',
      description:
        "A savoury pudding that contains sheep's pluck, onion, spices, and stock and encased in animal stomach",
      imageUrl:
        'https://thepeskyvegan.com/wp-content/uploads/2020/01/vegan-haggis-feature.jpg',
      expiry: '2022-09-04, 07:09:00',
      availability: 'Yes',
      userId: '10',
    },

    {
      itemName: 'Bananas',
      allergens: 'Bananas',
      description:
        'A healthy fruit that is rich in nutrients which include vitamin C, Potassium, and Magnesium to name a few',
      imageUrl:
        'https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg',
      expiry: '2022-07-27, 07:27:17',
      availability: 'No',
      userId: '9',
    },

    {
      itemName: 'Feijoas',
      allergens: 'Feijoas',
      description:
        'Feijoas are a favourite fruit among kiwis and they are packed with fiber and vitamin C',
      imageUrl:
        'https://images.unsplash.com/photo-1541857754-557a44522bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      expiry: '2022-07-29, 12:20:54',
      availability: 'No',
      userId: '10',
    },

    {
      itemName: 'Fried Chicken',
      allergens: 'poultry',
      description:
        'Fried chicken is almost always a favourite among children and adults and this one should not disappoint. :)',
      imageUrl:
        'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      expiry: '2022-10-03, 14:30:30',
      availability: 'Yes',
      userId: '14',
    },

    {
      itemName: 'Margherita Pizza',
      allergens: 'dairy, gluten, milk',
      description:
        'A delicious dish of Italian origin, with a dough base, mozzarella cheese, basil, and tomatoes.',
      imageUrl:
        'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      expiry: '2022-08-01, 18:10:22',
      availability: 'Yes',
      userId: '14',
    },

    {
      itemName: 'Blueberry Muffins',
      allergens: 'eggs, dairy, gluten, cereal',
      description:
        'These were made with extra blueberries and is a traditional family recipe of ours',
      imageUrl:
        'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZWJlcnJ5JTIwbXVmZmlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      expiry: '2022-07-31, 15:15:15',
      availability: 'No',
      userId: '14',
    },

    {
      itemName: 'Pears',
      allergens: 'Pears',
      description:
        'Pears are rich in folate, vitamin C and potassium. They are a great source of antioxidants',
      imageUrl:
        'https://images.unsplash.com/photo-1631160299919-6a175aa6d189?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80',
      expiry: '2022-07-25, 14:58:54',
      availability: 'Yes',
      userId: '13',
    },

    {
      itemName: 'Beef Lasagna',
      allergens: 'dairy, eggs, herbs, spices',
      description:
        'This lasagna was made by my very special friend, Monica and it is so delicious!',
      imageUrl:
        'https://images.unsplash.com/photo-1629115916087-7e8c114a24ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
      expiry: '2022-10-03, 23:00:23',
      availability: 'No',
      userId: '13',
    },

    {
      itemName: 'Fixer Elixir',
      allergens: 'dairy, eggs, nuts, spices',
      description:
        "This is the most effective post-bender, head's-too-tender ender from here to Denver",
      imageUrl:
        'https://townsquare.media/site/398/files/2014/03/stinson-hangover-fixer.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89',
      expiry: '2032-12-31, 23:59:59',
      availability: 'Yes',
      userId: '13',
    },
  ])
}
