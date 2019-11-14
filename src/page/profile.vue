<template>
    <div id="profile">
        <div class="profile-container">
            <!-- <OrderBar></OrderBar> -->
            <ul class="profile-nav">
                <li class="profile-nav-section" v-for="(item, index) in navigation" :key="index">
                    <div v-if="!item.children">
                        <h2 class="profile-nav-sectiontitle">
                            <router-link :to="item.href">{{item.name}}</router-link>
                        </h2>
                    </div>

                    <div v-else>
                        <h2 class="profile-nav-sectiontitle">{{item.name}}</h2>
                        <ul>
                            <li v-for="(child,i) in item.children" :key="i">
                                <router-link :to="child.href">{{child.name}}</router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div class="profile-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import OrderBar from "../components/common/OrderBar.vue";
export default {
    data() {
        return {
            navigation: [
                {
                    name: "个人中心",
                    icon: "",
                    href: "/profile"
                },
                {
                    name: "我的订单",
                    icon: "",
                    children: [
                        {
                            name: "近三个月订单",
                            href: "/profile/order"
                        }
                    ]
                },
                {
                    name: "我的资产",
                    icon: "",
                    children: [
                        {
                            name: "我的红包",
                            href: "/profile/hongbao"
                        },
                        {
                            name: "我的金币",
                            href: "/profile/points"
                        }
                    ]
                },
                {
                    name: "我的资料",
                    icon: "",
                    children: [
                        {
                            name: "个人资料",
                            href: "/profile/info"
                        },
                        {
                            name: "地址管理",
                            href: "/profile/address"
                        }
                    ]
                },
                {
                    name: "我的收藏",
                    icon: "",
                    href: "/profile/favor"
                }
            ]
        };
    },
    components: {
        OrderBar
    },
    created() {
        // console.log(this.$route);
    }
};
</script>

<style lang="scss">
.profile-container {
    width: 1180px;
    margin: 0 auto;
    display: flex;
    .profile-nav {
        margin-top: 20px;
        flex: 0 0 170px;
        text-align: left;
        .profile-nav-section {
            margin-bottom: 32px;
            .profile-nav-sectiontitle {
                margin-bottom: 8px;
                font-weight: 700;
                font-size: 18px;
                a {
                    font-size: 18px;
                }
            }
            li {
                padding: 4px 0;
                a {
                    color: #666;
                }
            }
        }
    }
    .profile-content {
        flex: auto;
    }

    .router-link-exact-active {
        color: #0089dc !important;
    }
}
</style>