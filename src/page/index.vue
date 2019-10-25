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
            user: "登陆/注册",
            isLogin: false
        };
    },
    methods: {
        getUser() {
            this.user = localStorage["ele_login"]
                ? localStorage["ele_login"]
                : this.user;
        }
    },
    components: {
        Header,
        SideBar
    },
    created() {
        this.getUser();
        this.isLogin = localStorage["ele_login"] ? true : false;
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