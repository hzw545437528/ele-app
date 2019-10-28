<template>
    <div id="index">
        <div class="container">
            <div class="header-wrap">
                <Header :user="user" :isLogin="isLogin"></Header>
            </div>
            <router-view></router-view>
        </div>
        <SideBar></SideBar>
    </div>
</template>
<script>
import Header from "../components/header/header.vue";
import SideBar from "../components/common/SideBar.vue";
export default {
    data() {
        return {
            isLogin: false
        };
    },
    methods: {},
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    components: {
        Header,
        SideBar
    },
    created() {
        let user = localStorage.login_user
            ? localStorage.login_user
            : "登录/注册";
        this.$store.dispatch("setUser", user);
        this.isLogin = localStorage.login_user ? true : false;
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

    .right-bar {
        position: fixed;
        top: 0;
        right: 0;
        width: 35px;
        height: 100vh;
        background: #747070;
    }
}
</style>