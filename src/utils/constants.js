const domain = import.meta.env.VITE_DOMAIN_BACKEND
const timeOutRequest = import.meta.env.VITE_TIME_OUT_REQUEST

const noneKeepAliveComponent = 'none'

const urlAPIs = {
    urlGetLanguages: 'get-languages',
    urlGetCategories: 'get-categories',
    urlGetFoods: 'get-foods',
    urlGetMerchantDetail: 'get-merchant-detail',
    urlGetServices: 'get-services',

    searchMerchant: 'search-merchant'
}

const eventName = {
    changeTitle: 'changeTitle',
    close: 'close',
    handleCollapseSideBar: 'handleCollapseSideBar'
}

const acceptServiceType = ['internal', 'external']

export {
    urlAPIs,
    domain,
    timeOutRequest,
    noneKeepAliveComponent,
    eventName,
    acceptServiceType
}