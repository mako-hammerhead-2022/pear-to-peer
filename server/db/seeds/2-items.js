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
      allergens: 'chickpeas',
      description:
        'Home-cooked Hummus that is both filling and healthy! Cooked with chickpeas, tahini, lemon juice, garlic, cumin, salt and olive oil.',
      imageUrl:
        'https://images.unsplash.com/photo-1637949385162-e416fb15b2ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3252&q=80',
      //expiry: new Date().setDate(new Date().getDate() + 7),
      //Hard-coded for seed data,
      expiry: '2022-08-18 06:38:14',
      availability: 'Yes',
      auth0Id: 'auth0|1',
    },

    {
      itemName: 'Scones',
      allergens: 'eggs, nuts, dairy, gluten',
      description:
        'Scones with love! Made with flour, sugar, baking powder, salt, butter, cream, eggs, and cashews',
      imageUrl:
        'https://images.unsplash.com/photo-1589114471223-dec0d8d572c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      //Hard-coded for seed data,
      expiry: '2022-09-19 06:38:14',
      availability: 'Yes',
      auth0Id: 'auth0|1',
    },

    {
      itemName: 'Carrots',
      allergens: 'carrots',
      description:
        'These have been grown in our garden and have been looked after very well. Great source of vitamins and nutrients',
      imageUrl:
        'https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-1200.jpg',
      expiry: '2022-10-10 10:34:55',
      availability: 'Yes',
      auth0Id: 'auth0|5',
    },

    {
      itemName: 'Chicken Empanadas',
      allergens: 'poultry, eggs, dairy',
      description:
        'Empanadas are a type of pastry that is filled with meat and cooked vegetables. Made with chicken, eggs, butter, carrots, green peas, potato, and raisins',
      imageUrl:
        'https://images.themodernproper.com/billowy-turkey/production/posts/2020/Chicken-Empanada-14.jpg?w=1200&auto=compress%2Cformat&fit=crop&dm=1599768574&s=e3b5e8fe53c559c704cad71e33d367e5',
      //Hard-coded for seed data,
      expiry: '2022-07-24 06:38:14',
      availability: 'Yes',
      auth0Id: 'auth0|2',
    },

    {
      itemName: 'Lemons',
      allergens: 'none',
      description:
        'I have a big lemon tree in my front yard which is full of beautiful juicy lemons. Feel free to contact me and bring a bag to come and pick your own.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlz40GvRtgjQShH91Fyf82vOwXmf1lr-j36g&usqp=CAU',
      expiry: '2022-08-24, 08:24:02',
      availability: 'Yes',
      auth0Id: 'auth0|3',
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
      auth0Id: 'auth0|4',
    },

    {
      itemName: 'Broccoli',
      allergens: 'none',
      description:
        'I have about 6 heads of broccoli in my garden which are free to a good home!',
      imageUrl:
        'https://resources.stuff.co.nz/content/dam/images/4/y/w/9/c/n/image.related.StuffLandscapeThreeByTwo.1464x976.23rphq.png/1639532022578.jpg',
      expiry: '2022-09-04, 07:09:00',
      availability: 'Yes',
      auth0Id: 'auth0|5',
    },

    {
      itemName: 'Feijoas',
      allergens: 'Feijoas',
      description:
        'Feijoas are a favourite fruit among kiwis and they are packed with fiber and vitamin C. Our bush is overgrown at the moment so you are welcome to take some for your family.',
      imageUrl:
        'https://images.unsplash.com/photo-1541857754-557a44522bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      expiry: '2022-07-29, 12:20:54',
      availability: 'Yes',
      auth0Id: 'auth0|7',
    },

    {
      itemName: 'Mandarins',
      allergens: 'none',
      description:
        'Come and grab some citrusy goodness! Big juicy mandarins (without seeds!) are available for anyone who wants them.',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMWgG3ErK-GVFrl1aAtM4_rkCACmVo-JOfsA&usqp=CAU',
      expiry: '2022-10-03, 14:30:30',
      availability: 'Yes',
      auth0Id: 'auth0|8',
    },

    {
      itemName: 'Plums',
      allergens: 'none',
      description:
        'We have an excess of plums on our tree.  Good for jam, cakes, sauces or just on their own! If you want some please let me know and we can arrange collection.',
      imageUrl:
        'https://cdn.britannica.com/71/115271-050-3EEF6DFD/Plums-tree.jpg',
      expiry: '2022-08-01, 18:10:22',
      availability: 'Yes',
      auth0Id: 'auth0|9',
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
      auth0Id: 'auth0|10',
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
      auth0Id: 'auth0|10',
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
      auth0Id: 'auth0|11',
    },

    {
      itemName: 'Strawberry Jam',
      allergens: 'sugar, strawberries',
      description:
        'Had a lot of strawberries grow this year and made a whole lot of Strawberry Jam.  I have about 20 jars to give away if anyone wants some.',
      imageUrl:
        'https://therecipecritic.com/wp-content/uploads/2020/06/Homemade-Strawberry-Jam-6.jpg',
      expiry: '2032-12-31, 23:59:59',
      availability: 'Yes',
      auth0Id: 'auth0|12',
    },

    {
      itemName: `Roh's Potatoes`,
      allergens: 'potatoes',
      description:
        'I grew these bad boys myself. Great for a mash, a boil or a fry - these homegrown gems will not disappoint.',
      imageUrl:
        'https://www.ruralsprout.com/wp-content/uploads/2019/09/store-potatoes-feature.jpg',
      expiry: '2032-12-31, 23:59:59',
      availability: 'Yes',
      auth0Id: 'auth0|12',
    },
  ])
}
