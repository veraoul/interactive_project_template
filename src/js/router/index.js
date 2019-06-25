import VueRouter from 'vue-router';
import Vue from 'vue';

// import Main from '@/container/Main';

const Main = () => import(/* webpackChunkName: "Main" */'@/container/Main');
const Guide = () => import(/* webpackChunkName: "Main" */'@/container/Guide');

Vue.use(VueRouter);

export const routes = [
  { path: '/', component: Guide },
  { path: '*', component: Guide },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
