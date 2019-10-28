import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: () => import('../page/index.vue'),
        children: [
            {
                path: '',
                redirect: '/place'
            },
            {
                path: '/place',
                name: 'place',
                component: () => import('../page/place.vue')
            },
        ]
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
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.login_user ? true : false;
    let path = ['/login', '/index', '/place'];
    if (path.includes(to.path)) {
        next();
    }
    else {
        isLogin ? next() : next('/login');
    }
});
export default router;
//# sourceMappingURL=index.js.map