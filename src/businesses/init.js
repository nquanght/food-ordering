const shopeeFoodBusiness = require('./services/shopeeFoodBusiness')
const grabFoodBusiness = require('./services/grabFoodBusiness')
const beFoodBusiness = require('./services/beFoodBusiness')

module.exports = (serviceCode) => {
    let service = null
    switch (serviceCode) {
        case 'shopee_food':
            service = shopeeFoodBusiness
            break;
        case 'grab_food':
            service = grabFoodBusiness
            break;
        case 'be_food':
            service = beFoodBusiness
            break;
        default:
            throw new Error("Invalid Service.");
    }

    return service
}