/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const tableName = 'delivery_app'

const logoMerchant = {
  shopee_food: 'https://i.pinimg.com/originals/68/56/0e/68560e3c28c3a9d8e2f472756c1553ed.jpg',
  grab_food: 'https://i.ytimg.com/vi/dOWV466VY4Y/maxresdefault.jpg',
  be_food: 'https://mir-s3-cdn-cf.behance.net/projects/404/02a0ee176100517.Y3JvcCw5MDAsNzAzLDAsOTg.png'
}

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del()

  await knex(tableName).insert([
    {name: 'GrabFood', code: 'grab_food', logo: logoMerchant.shopee_food},
    {name: 'ShopeeFood', code: 'shopee_food', logo: logoMerchant.grab_food},
    {name: 'BeFood', code: 'be_food', logo: logoMerchant.be_food},
  ]);
};
