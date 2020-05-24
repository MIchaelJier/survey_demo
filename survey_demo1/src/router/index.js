import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { index: 0 }
  },
  {
    path: '/about',
    name: 'About',
    meta: { index: 1 },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    meta: { index: 1 },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Search/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { index: 3 },
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    meta: { index: 2, requireAuth: true },
    component: () => import('../views/Edit/Edit.vue')
  },
  {
    path: '/show',
    name: 'Show',
    meta: { index: 1 },
    component: () => import('../views/Show/Show.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
