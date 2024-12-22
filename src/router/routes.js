// ======= User routes =======

const routes = [
    {
        path: '/',
        redirect: {
            path: '/order'
        },
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            {
                path: 'order',
                name: 'Order',
                component: () => import('../pages/order/Order.vue'),
                meta: {
                    keepAlive: true,
                    title: 'navigation.order'
                }
            },
            {
                path: 'bill',
                name: 'Bill',
                component: () => import('../pages/bill/Bill.vue'),
                meta: {
                    title: 'navigation.bill'
                }
            },
            {
                path: 'contact',
                name: 'Contact',
                component: () => import('../pages/contact/Contact.vue'),
                meta: {
                    title: 'navigation.contact'
                }
            },
            {
                path: 'feedback',
                name: 'Feedback',
                component: () => import('../pages/feedback/Feedback.vue'),
                meta: {
                    title: 'navigation.feedback'
                }
            },
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/error/ErrorPage.vue')
    }
]

export default routes