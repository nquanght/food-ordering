const userMenu = [
    {
        url: 'order',
        name: 'navigation.order',
        code: 'order'
    },  
    {
        url: 'bill',
        name: 'navigation.bill',
        code: 'bill'
    },
    {
        url: 'contact',
        name: 'navigation.contact',
        code: 'contact'
    },
    {
        url: 'feedback',
        name: 'navigation.feedback',
        code: 'feedback'
    },
]

const adminMenu = [
    {
        url: 'homepage',
        name: 'admin.navigation.homepage',
        code: 'admin_homepage',
        icon: 'fa-solid fa-gauge'
    },
    {
        name: 'admin.navigation.order',
        icon: 'fa-solid fa-utensils',
        group: [
            {
                url: 'order',
                name: 'admin.navigation.pick',
                code: 'admin_order'
            },
            {
                url: 'merchant',
                name: 'admin.navigation.merchant',
                code: 'admin_merchant'
            },
        ]
    },
    {
        name: 'admin.navigation.management',
        icon: 'fa-solid fa-list-check',
        group: [
            {
                url: 'service-management',
                name: 'admin.navigation.service_management',
                code: 'service_management'
            },
            {
                url: 'user-management',
                name: 'admin.navigation.user_management',
                code: 'admin_user_management'
            },
        ]
    },
    {
        name: 'admin.navigation.setting',
        icon: 'fa-solid fa-gear',
        group: [
            {
                url: 'setting',
                name: 'admin.navigation.setting',
                code: 'admin_setting'
            },
            {
                url: 'setting_2',
                name: 'admin.navigation.setting_2',
                code: 'admin_setting_2'
            },
        ]
    }
]

export {
    userMenu,
    adminMenu
}