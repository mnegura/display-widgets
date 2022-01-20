import { createWebHistory, createRouter } from "vue-router";
import store from "../store";

const Dashboard = () => import("@/views/Dashboard.vue");
const NotFound = () => import("@/views/NotFound.vue");

const languagePrefix = "/:lang(en|de)?";

export const routeNames = {
  dashboard: "Dashboard"
};

const routes = [
  {
    path: `/`,
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
