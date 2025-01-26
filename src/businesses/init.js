const shopeeFoodBusiness = require('./services/ShopeeFoodBusiness')
const grabFoodBusiness = require('./services/GrabFoodBusiness')
const beFoodBusiness = require('./services/BeFoodBusiness')

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