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
        url: 'admin/homepage',
        name: 'admin.navigation.homepage',
        code: 'admin_homepage',
        icon: ''
    },
    {
        group: 'admin.navigation.order',
        children: [
            {
                url: 'admin/order',
                name: 'admin.navigation.order',
                code: 'admin_order',
                icon: ''
            },
            {
                url: 'admin/merchant',
                name: 'admin.navigation.merchant',
                code: 'admin_merchant',
                icon: ''
            },
        ]
    },
    {
        group: 'admin.navigation.setting',
        children: [
            {
                url: 'admin/setting',
                name: 'admin.navigation.setting',
                code: 'admin_setting',
                icon: ''
            },
            {
                url: 'admin/setting_2',
                name: 'admin.navigation.setting_2',
                code: 'admin_setting_2',
                icon: ''
            },
        ]
    }
]

export {
    userMenu,
    adminMenu
}