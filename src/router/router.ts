import Home from "../pages/Home.vue"
import { createRouter, createWebHistory } from "vue-router"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
      props: (route) => ({
        project: route.query.project,
        target: route.query.target,
      }),
    },
  ],
})
