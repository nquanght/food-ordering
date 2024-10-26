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
                name: 'navigation.order',
                component: () => import('../pages/order/Order.vue')
            },
            {
                path: 'bill',
                name: 'navigation.bill',
                component: () => import('../pages/bill/Bill.vue')
            },
            {
                path: 'contact',
                name: 'navigation.contact',
                component: () => import('../pages/contact/Contact.vue')
            },
            {
                path: 'feedback',
                name: 'navigation.feedback',
                component: () => import('../pages/feedback/Feedback.vue')
            },
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../pages/error/ErrorPage.vue')
    }
]

export default routes