<template>
    <div id="index">
        <div class="container">
            <div class="header-wrap" :class="{shopInfoHeader: isShopInfoPage}">
                <Header :user="user" :isLogin="isLogin" :isShopPage="isShopInfoPage"></Header>
            </div>

            <div class="location-wrap" v-if="$store.getters.showLocation">
                <Location :showSearch="showSearch" :navName="navName"></Location>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
        <SideBar></SideBar>
    </div>
</template>
<script>
import Header from "../components/header/header.vue";
import SideBar from "../components/common/SideBar.vue";
import Location from "../components/common/Location.vue";
export default {
    data() {
        return {
            isLogin: false,
            showSearch: true
        };
    },
    methods: {},
    computed: {
        user() {
            return this.$store.getters.user;
        },
        navName() {
            return this.$store.getters.navName;
        },
        isShopInfoPage() {
            return !this.$store.getters.showLocation;
        }
    },
    watch: {
        $route(to, from) {
            let path = ["place", "search"];
            to.name == "place" ? this.$store.dispatch("setNavName", "") : 0;
            to.name == "search"
                ? this.$store.dispatch("setNavName", "搜索结果")
                : 0;
            if (path.includes(to.name)) {
                return (this.showSearch = true);
            }
            this.showSearch = false;
        }
    },
    components: {
        Header,
        SideBar,
        Location
    },
    created() {
        let user = localStorage.login_user
            ? localStorage.login_user
            : "登录/注册";
        this.$store.dispatch("setUser", user);
        this.isLogin = localStorage.login_user ? true : false;
        let pathName = this.$route.name;
        if (pathName == "search") {
            this.$store.dispatch("setNavName", "搜索结果");
        }
    }
};
</script>

<style lang="scss">
@import "../style/mixin.scss";
#index {
    position: relative;

    .container {
        margin-right: 35px;
    }
    .header-wrap {
        height: 60px;
        line-height: 60px;
        background: #1e89e0;
        position: relative;
    }

    .location-wrap {
        width: 1180px;
        margin: 0 auto;
    }

    .content {
        width: 1180px;
        margin: 0 auto;
    }

    .right-bar {
        position: fixed;
        top: 0;
        right: 0;
        width: 35px;
        height: 100vh;
        background: #747070;
    }

    .shopInfoHeader {
        position: absolute;
        width: 100%;
        height: 48px;
        line-height: 48px;
        background-color: #000;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
    }
}
</style>