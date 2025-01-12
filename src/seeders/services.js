/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const tableName = 'services'

const logoMerchant = {
  shopee_food: 'https://i.pinimg.com/originals/68/56/0e/68560e3c28c3a9d8e2f472756c1553ed.jpg',
  grab_food: 'https://i.ytimg.com/vi/dOWV466VY4Y/maxresdefault.jpg',
  be_food: 'https://mir-s3-cdn-cf.behance.net/projects/404/02a0ee176100517.Y3JvcCw5MDAsNzAzLDAsOTg.png',
  shop: 'https://static.vecteezy.com/system/resources/previews/006/398/492/non_2x/illustration-of-store-or-market-flat-design-vector.jpg'
}

exports.seed = async (knex) => {
  /* Deletes All existing entries */
  await knex(tableName).del()

  await knex(tableName).insert([
    {
      name: 'GrabFood',
      code: 'grab_food',
      logo: logoMerchant.grab_food,
      type: 'external'
    },
    {
      name: 'ShopeeFood',
      code: 'shopee_food',
      logo: logoMerchant.shopee_food,
      type: 'external'
    },
    {
      name: 'BeFood',
      code: 'be_food',
      logo: logoMerchant.be_food,
      type: 'external'
    },
    {
      name: 'Shop',
      code: 'shop',
      logo: logoMerchant.shop,
      type: 'internal'
    },
  ]);
};
