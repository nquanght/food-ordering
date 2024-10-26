/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const tableName = 'delivery_app'

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableName).del()

  await knex(tableName).insert([
    {name: 'GrabFood', code: 'grab_food'},
    {name: 'ShopeeFood', code: 'shopee_food'},
    {name: 'BeFood', code: 'be_food'},
  ]);
};
