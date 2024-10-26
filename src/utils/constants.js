const domain = import.meta.env.VITE_DOMAIN_BACKEND
const timeOutRequest = import.meta.env.VITE_TIME_OUT_REQUEST

const urlAPIs = {
    getLanguages: 'get-languages',
    getCategories: 'get-categories',
    getFoods: 'test'
}

export {
    urlAPIs,
    domain,
    timeOutRequest
}