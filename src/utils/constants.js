const domain = import.meta.env.VITE_DOMAIN_BACKEND
const timeOutRequest = import.meta.env.VITE_TIME_OUT_REQUEST

const noneKeepAliveComponent = 'none'

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
    domain,
    timeOutRequest,
    noneKeepAliveComponent,
    eventName,
    acceptServiceType,
    colors,
    statusCode
}