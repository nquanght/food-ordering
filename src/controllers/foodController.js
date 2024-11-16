const axios = require('axios')
const {responseSuccess} = require("../helpers/response");
const merchantConfig = require('../config/merchants')

const getFoods = async (req, res) => {
    const merchant = 'shopee_food'

    const merchantConfigElement = merchantConfig[merchant]

    const url = merchantConfigElement.origin + "/dish/get_delivery_dishes?id_type=2&request_id=110218"
    const headers = merchantConfigElement.header

    let result = []

    await axios.get(url,  {headers})
        .then(response => {
            result = repairData(response.data)
            // result = response.data
        })
        .catch(error => {
            console.error(error);
        });

    return responseSuccess(res, result)
}

const repairData = (list) => {
    let result = []
    let data = list['reply']['menu_infos']

    data.forEach((item) => {
        let dishInfo = {
            category_id: item.dish_type_id,
            category_name: item.dish_type_name,
            remain: item.dishes.length,
            foods: []
        }

        if (item.dishes.length > 0) {
            item.dishes.forEach((dish) => {
                dishInfo.foods.push({
                    food_id: dish.id,
                    food_name: dish.name,
                    description: dish.description,
                    price: dish.price.value,
                    thumbnail_url: dish.photos[2].value,
                    is_out_of_stock: !dish.is_available
                })
            })
        }
        result.push(dishInfo)
    })

    return result
}

module.exports = {
    getFoods
}