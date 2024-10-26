import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import adminRoutes from './adminRoutes.js'

let commonRoutes = [
  ...routes,
  ...adminRoutes
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: commonRoutes
})

export default router
