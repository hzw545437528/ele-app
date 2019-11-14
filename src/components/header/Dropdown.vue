<template>
    <div id="drop-down">
        <div @mouseenter="enter('user-nav')" @mouseleave="leave('user-nav')">
            <span>{{user}}</span>
            <i class="el-icon-arrow-down header-drop-down"></i>
        </div>
        <div
            class="card user-nav"
            ref="user-nav"
            @mouseenter="enter('user-nav')"
            @mouseleave="leave('user-nav')"
        >
            <router-link to>
                <i class="el-icon-s-custom"></i>
                个人中心
            </router-link>
            <router-link to>
                <i class="el-icon-star-on"></i>
                我的收藏
            </router-link>
            <router-link to>
                <i class="el-icon-location-outline"></i>
                我的地址
            </router-link>
            <a @click="logout" class="logout">
                <i class="el-icon-switch-button"></i>
                退出登录
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: String,
        fontSize: String
    },
    methods: {
        enter(ref) {
            this.$refs[ref].classList.add("show");
        },
        leave(ref) {
            this.$refs[ref].classList.remove("show");
        },
        logout() {
            localStorage.removeItem("login_user");
            this.$store.dispatch("setUser", "登录/注册");
            this.$router.push("/login");
        }
    }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
#drop-down {
    position: relative;

    .card {
        display: none;
        position: absolute;
        z-index: 999;
        background: $f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    }
    .user-nav {
        position: absolute;
        bottom: -133px;
        right: -2px;
        width: 122px;
        height: 137px;
        padding: 4px 6px;
        box-sizing: border-box;

        a {
            i {
                font-size: 16px;
            }
            text-indent: -5px;
            line-height: 32px;
            font-size: 14px;
            color: rgba(102, 102, 102, 0.8);
        }
        a:hover {
            background: #f1f1f1;
        }

        .logout {
            border-top: 1px solid #eee;
        }
    }

    .user-nav::before {
        @include triangle;
        right: 10px;
        top: -10px;
    }

    .show {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
}
</style>