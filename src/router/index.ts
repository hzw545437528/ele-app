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
                        path: '',
                        name: '/profile/personCenter',
                        component: () => import("../page/profile/personCenter.vue")
                    },
                    {
                        path: '/profile/hongbao',
                        name: 'profile/hongbao',
                        component: () => import("../page/profile/hongbao.vue")
                    },
                    {
                        path: '/profile/points',
                        name: 'profile/points',
                        component: () => import("../page/profile/points.vue")
                    },
                    {
                        path: '/profile/info',
                        name: 'profile/info',
                        component: () => import("../page/profile/info.vue")
                    },
                    {
                        path: '/profile/address',
                        name: 'profile/address',
                        component: () => import("../page/profile/address.vue")
                    },
                    {
                        path: '/profile/favor',
                        name: 'profile/favor',
                        component: () => import("../page/profile/favor.vue")
                    },
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
]

const router: any = new VueRouter(({
    routes,
    //滚动条位置
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
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
    if (to.name.includes('shop')) {
        vue.$store.dispatch('setShowLocation', false)
    } else {
        vue.$store.dispatch('setShowLocation', true)
        // vue.$store.dispatch('setShopInfo', {})
        // vue.$store.dispatch('setShop', {})
    }
    let name = to.name,
        navName = "";
    console.log(name);
    if (name.includes("personCenter")) {
        navName = "个人中心";
    } else if (name.includes("order")) {
        navName = "近三个月订单"
    } else if (name.includes("info")) {
        navName = "个人资料"
    } else if (name.includes("address")) {
        navName = "地址管理"
    } else if (name.includes("hongbao")) {
        navName = "我的红包"
    } else if (name.includes("points")) {
        navName = "我的金币"
    }
    else if (name.includes("favor")) {
        navName = "我的收藏"
    }
    vue.$store.dispatch('setNavName', navName)
    next()
})

export default router
