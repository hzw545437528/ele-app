import Vue from 'vue';
import VueRouter from 'vue-router';
import vue from '../main';
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
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
            {
                path: '/search/:searchVal',
                name: 'search',
                component: () => import('../page/search.vue')
            },
            {
                path: '/shop/:name/:id',
                name: 'shop',
                component: () => import('../page/shopInfo.vue'),
                children: [
                    {
                        path: '/shop/:name/:id',
                        name: 'shop/goods',
                        component: () => import('../components/shopInfo/goods.vue')
                    },
                    {
                        path: '/shop/:name/:id/rate',
                        name: 'shop/rate'
                    },
                    {
                        path: '/shop/:name/:id/info',
                        name: 'shop/info',
                    }
                ]
            },
            {
                path: '/profile',
                component: () => import('../page/profile.vue'),
                children: [
                    {
                        path: '/profile/order',
                        name: 'order',
                        component: () => import('../page/recentOrder.vue')
                    },
                    {
                        path: '/profile/order/id/:orderId',
                        name: 'orderDetail',
                        component: () => import('../page/orderDetail.vue')
                    }
                ]
            },
        ]
    },
    {
        path: '/cart/checkout',
        name: 'cart/checkout',
        component: () => import('../page/checkout.vue')
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
    routes,
    //滚动条位置
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
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
router.beforeResolve((to, from, next) => {
    if (to.name.includes('shop')) {
        vue.$store.dispatch('setShowLocation', false);
    }
    else {
        vue.$store.dispatch('setShowLocation', true);
        // vue.$store.dispatch('setShopInfo', {})
        // vue.$store.dispatch('setShop', {})
    }
    next();
});
export default router;
//# sourceMappingURL=index.js.map