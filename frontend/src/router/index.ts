import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ArticleBrowse from '../views/ArticleBrowse.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ArticleBrowse',
    component: ArticleBrowse,
  },
  { path: '/articles', redirect: '/' },
  {
    path: '/tag/:tag',
    name: 'ArticleBrowseTag',
    component: ArticleBrowse,
  },
  {
    path: '/article/:article',
    name: 'ArticleRead',
    component: () => import('../views/ArticleRead.vue'),
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
    path: '/admin-console',
    name: 'AdminConsole',
    component: () => import('../views/AdminConsole.vue'),
    children: [
      {
        path: '',
        name: 'AdminConsoleHome',
        component: () => import('../views/AdminConsoleHome.vue'),
      },
      {
        path: 'new-article',
        name: 'AdminConsoleNewArticle',
        component: () => import('../views/AdminConsoleNewArticle.vue'),
      },
      {
        path: 'update-article/:article',
        name: 'AdminConsoleUpdateArticle',
        component: () => import('../views/AdminConsoleUpdateArticle.vue'),
      },
    ],
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/Error404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
