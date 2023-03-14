import Home from "../pages/Home.vue"
import { createRouter, createWebHashHistory } from "vue-router"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: "/", component: Home }],
})
