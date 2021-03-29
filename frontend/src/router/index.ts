import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ArticleBrowse',
    component: () => import('../views/ArticleBrowse.vue'),
  },
  { path: '/articles', redirect: '/' },
  {
    path: '/tag/:tag',
    name: 'ArticleBrowseTag',
    component: () => import('../views/ArticleBrowse.vue'),
  },
  {
    path: '/article/:article',
    name: 'ArticleRead',
    component: () => import('../views/ArticleRead.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue'),
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
