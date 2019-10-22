import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'home',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../page/login.vue')
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
    }
];
const router = new VueRouter({
    routes
});
export default router;
//# sourceMappingURL=index.js.map