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
                meta: { keepAlive: true }
            },
            {
                path: 'bill',
                name: 'Bill',
                component: () => import('../pages/bill/Bill.vue'),
            },
            {
                path: 'contact',
                name: 'Contact',
                component: () => import('../pages/contact/Contact.vue'),
            },
            {
                path: 'feedback',
                name: 'Feedback',
                component: () => import('../pages/feedback/Feedback.vue'),
            },
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/error/ErrorPage.vue')
    }
]

export default routes