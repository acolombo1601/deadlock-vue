import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Heroes.vue")
    },
    {
      path: "/detalle/:id",
      component: () => import("@/views/Detalle.vue")
    }
    ,
    {
      path: "/favoritos",
      component: () => import("@/views/Favoritos.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue")
    }
  ],
})

export default router
