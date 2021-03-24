import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Articles from '../views/Articles.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Articles',
    component: Articles,
  },
  { path: '/articles', redirect: '/' },
  {
    path: '/tag/:tag',
    name: 'ArticlesWithTag',
    component: Articles,
  },
  {
    path: '/article/:article',
    name: 'ArticlePage',
    component: () => import('../views/ArticlePage.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('../views/AdminLogin.vue'),
  },
  {
    path: '/admin-console/:article?',
    name: 'AdminConsole',
    component: () => import('../views/AdminConsole.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
