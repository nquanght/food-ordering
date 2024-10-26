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
                name: 'navigation.homepage',
                component: () => import('../pages/admin/homepage/AdminHomePage.vue')
            },
        ]
    },
]

export default adminRoutes