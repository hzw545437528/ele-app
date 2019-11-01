import Vue from 'vue'
import VueRouter, { RouterOptions } from 'vue-router'
import vue from '../main';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
    return (originalPush.call(this, location) as any).catch((err: any) => err)
}

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
                component: () => import('../page/shopInfo.vue')
            },
            {
                path: '/profile/order',
                name: 'order',
                component: () => import('../page/order.vue'),
                children: [
                    {
                        path: '/profile/order',
                        name: 'order',
                        component: () => import('../page/recentOrder.vue')
                    }
                ]
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
]

const router: any = new VueRouter(({
    routes
} as RouterOptions))

router.beforeEach((to: any, from: any, next: any) => {

    const isLogin = localStorage.login_user ? true : false;
    let path = ['/login', '/index', '/place']
    if (path.includes(to.path)) {
        next();
    } else {
        isLogin ? next() : next('/login');
    }
})

router.beforeResolve((to: any, from: any, next: any) => {
    if (to.name == 'shop') {
        vue.$store.dispatch('setShowLocation', false)
    } else {
        vue.$store.dispatch('setShowLocation', true)
    }
    next()
})

export default router
