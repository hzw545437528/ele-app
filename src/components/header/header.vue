<template>
    <div id="header">
        <ul class="nav">
            <router-link to="/" tag="li" class="logo">
                <img src="../../images/index_header_logo.png" alt />
            </router-link>
            <router-link
                v-for="(item, index) in navTitle"
                :key="index"
                :to="item.href"
                tag="li"
            >{{item.title}}</router-link>
        </ul>
        <ul class="tools">
            <li>规则中心</li>
            <li
                style="position:relative;"
                @mouseenter="enter('QRCode')"
                @mouseleave="leave('QRCode')"
            >
                <i class="el-icon-mobile-phone"></i>
                手机应用
                <div class="card QR-code" ref="QRCode">
                    <span>扫一扫，手机订餐更方便</span>
                    <img src="../../images/QR_code.png" alt="扫一扫下载饿了么手机 App" />
                </div>
            </li>
            <li @mouseenter="enter('user-nav')" @mouseleave="leave('user-nav')" v-if="isLogin">
                <div>
                    <span>{{user}}</span>
                    <i class="el-icon-arrow-down"></i>
                </div>
                <div class="card user-nav" ref="user-nav">
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
                    <router-link to="/login" class="logout">
                        <i class="el-icon-switch-button"></i>
                        退出登录
                    </router-link>
                </div>
            </li>
            <router-link v-else to="/login" tag="li">
                <i class="el-icon-s-custom"></i>
                {{user}}
            </router-link>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        user: String,
        isLogin: Boolean
    },
    data() {
        return {
            navTitle: [
                { title: "首页", href: "/place" },
                { title: "我的订单", href: "/order" },
                { title: "加盟合作", href: "/cooperation" },
                { title: "我的客服", href: "/service" }
            ]
        };
    },
    methods: {
        enter(ref) {
            this.$refs[ref].classList.add("show");
        },
        leave(ref) {
            this.$refs[ref].classList.remove("show");
        },
        logout() {
            localStorage.removeItem("ele_login");
        }
    },
    beforeDestroy() {
        this.logout();
    }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
#header {
    @include flex;
    justify-content: space-around;
    width: 1180px;
    margin: 0 auto;
    height: $ext;
    line-height: $ext;
    .logo {
        width: 105px;
        margin-right: 30px;
        line-height: $ext;
        height: $ext;
        img {
            width: 105px;
            line-height: $ext;
            height: $ext;
            vertical-align: middle;
        }
    }

    ul {
        @include flex;
    }

    .nav {
        li {
            width: 112px;
            color: $f;
        }
        li:hover {
            cursor: pointer;
            background: rgba(0, 103, 203, 0.4);
        }
        .router-link-exact-active {
            background: #0067cb;
        }
    }

    .tools {
        width: 400px;
        font-size: 14px;
        position: relative;
        & > li {
            padding: 0 10px;
            width: 106px;
            box-sizing: border-box;
            color: #d2e7f9;
            i {
                font-size: 18px;
                vertical-align: middle;
                margin: 0 5px 0 0;
            }
            &:nth-child(3) {
                width: auto;
                padding: 0;
                position: absolute;
                right: 0;
                color: $f;

                & > div > i {
                    display: $in-bl;
                    position: relative;
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    margin: 0 3px 0 8px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    vertical-align: middle;
                    color: #d5efff;
                    background: #449be5;
                }
            }

            &:nth-child(3):hover {
                cursor: default;
            }
        }
        li:hover {
            cursor: pointer;
            color: $f;
        }
    }

    .card {
        display: none;
        position: absolute;
        background: $f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
    }

    .QR-code {
        top: 55px;
        left: 10px;
        width: 180px;
        height: 233.6px;
        padding: 3px 10px;
        color: #000000;
        font-size: 16px;
        font-weight: bold;
        span {
            line-height: 24px;
        }
        img {
            width: 180px;
            height: 180px;
        }
    }

    .QR-code::before {
        @include triangle;
        left: 10px;
        top: -10px;
    }

    .user-nav {
        position: absolute;
        top: 53px;
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