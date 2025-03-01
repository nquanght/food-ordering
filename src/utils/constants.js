const domain = import.meta.env.VITE_DOMAIN_BACKEND
const timeOutRequest = import.meta.env.VITE_TIME_OUT_REQUEST

const noneKeepAliveComponent = 'none'

const urlAPIs = {
    urlGetLanguages: 'get-languages',
    urlGetCategories: 'get-categories',
    urlGetFoods: 'get-foods',
    urlGetMerchantDetail: 'get-merchant-detail',
    urlGetListMerchantDetail: 'get-list-merchant-detail',
    urlGetServices: 'get-services',
    urlGetMetaData: 'get-meta-data',
    urlGetMerchantFood: 'get-merchant-food',
    searchMerchant: 'search-merchant',
    urlPickMerchant: 'pick-merchant',
    urlUnpickMerchant: 'unpick-merchant',
    urlGetSelectedMerchantToday: 'get-selected-merchant-today/:date',
    urlGetAllSettingSystem: 'get-setting',
    urlGetMerchantBranches: 'get-merchant-branches'
}

const eventName = {
    changeTitle: 'changeTitle',
    close: 'close',
    closeAll: 'closeAll',
    handleCollapseSideBar: 'handleCollapseSideBar',
    showNotify: 'showToastNotify',
    fetchDataSelectedMerchant: 'fetchDataSelectedMerchant',
    reloadDataSelectedMerchant: 'reloadSelectedMerchant'
}

const acceptServiceType = ['internal', 'external']

const colors = {
    service: {
        shopee_food: {
            bg: '#ee4d2d',
            text: '#ffffff'
        },
        grab_food: {
            bg: '#08993e',
            text: '#ffffff'
        },
        be_food: {
            bg: '#ffcc00',
            text: '#1f2656'
        }
    }
}

const statusCode = {
    success: 200,
    created: 201,
    unauthorized: 401
}

export {
    urlAPIs,
    domain,
    timeOutRequest,
    noneKeepAliveComponent,
    eventName,
    acceptServiceType,
    colors,
    statusCode
}