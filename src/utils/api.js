const url = {
    merchant: {
        prefix: '/merchant',
        link: {
            urlGetMerchantDetail: 'get-merchant-detail',
            urlGetListMerchantDetail: 'get-list-merchant-detail',
            urlGetMerchantBranches: 'get-merchant-branches',
            searchMerchant: 'search-merchant',
        }
    },
    picking: {
        prefix: '/picking',
        link: {
            urlPickMerchant: 'pick-merchant',
            urlUnpickMerchant: 'unpick-merchant',
            urlGetSelectedMerchantToday: 'get-selected-merchant-today/:date',
        }
    },
    system: {
        prefix: '/system',
        link: {
            urlGetLanguages: 'get-languages',
            urlGetServices: 'get-services',
            urlGetMetaData: 'get-meta-data',
            urlGetAllSettingSystem: 'get-setting',
        }
    },
    food: {
        prefix: '/food',
        link: {
            urlGetFoods: 'get-foods',
            urlGetMerchantFood: 'get-merchant-food',
        }
    }
}

export {
    url
}