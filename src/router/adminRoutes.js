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
            },
            {
                path: 'order',
                name: 'AdminOrder',
                component: () => import('../pages/admin/order/AdminOrder.vue')
            },
            {
                path: 'merchant',
                name: 'AdminMerchant',
                component: () => import('../pages/admin/order/AdminMerchant.vue')
            },
            {
                path: 'setting',
                name: 'AdminSetting',
                component: () => import('../pages/admin/setting/AdminSetting.vue')
            },
            {
                path: 'setting_2',
                name: 'AdminSetting2',
                component: () => import('../pages/admin/setting/AdminSetting2.vue')
            },
            {
                path: 'delivery-app-management',
                name: 'AdminDeliveryAppManagement',
                component: () => import('../pages/admin/management/AdminDeliveryAppManagement.vue')
            },
            {
                path: 'user-management',
                name: 'AdminUserManagement',
                component: () => import('../pages/admin/management/AdminUserManagement.vue')
            },
        ]
    },
]

export default adminRoutes