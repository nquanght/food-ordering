// ======= Admin routes =======

const adminRoutes = [
    {
        path: '/admin',
        redirect: {
            path: 'admin/homepage'
        },
        component: () => import('../layouts/AdminLayout.vue'),
        children: [
            {
                path: 'homepage',
                name: 'AdminHomePage',
                component: () => import('../pages/admin/homepage/AdminHomePage.vue'),
                meta: {title: 'admin.navigation.homepage'}
            },
            {
                path: 'order',
                name: 'AdminOrder',
                component: () => import('../pages/admin/order/AdminOrder.vue'),
                meta: {title: 'admin.navigation.pick'}
            },
            {
                path: 'merchant',
                name: 'AdminMerchant',
                component: () => import('../pages/admin/order/AdminMerchant.vue'),
                meta: {title: 'admin.navigation.merchant'}
            },
            {
                path: 'setting',
                name: 'AdminSetting',
                component: () => import('../pages/admin/setting/AdminSetting.vue'),
                meta: {title: 'admin.navigation.setting'}
            },
            {
                path: 'setting_2',
                name: 'AdminSetting2',
                component: () => import('../pages/admin/setting/AdminSetting2.vue'),
                meta: {title: 'admin.navigation.setting_2'}
            },
            {
                path: 'delivery-app-management',
                name: 'AdminDeliveryAppManagement',
                component: () => import('../pages/admin/management/AdminDeliveryAppManagement.vue'),
                meta: {title: 'admin.navigation.delivery_app_management'}
            },
            {
                path: 'user-management',
                name: 'AdminUserManagement',
                component: () => import('../pages/admin/management/AdminUserManagement.vue'),
                meta: {title: 'admin.navigation.user_management'}
            },
        ]
    },
]

export default adminRoutes