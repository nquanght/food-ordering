const {isEmpty} = require('lodash')

const repairDataFood = (listData) => {
    let result = []

    if (isEmpty(listData)) {
        return result
    }
    
    let data = listData['reply']['menu_infos']

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
    repairDataFood
}