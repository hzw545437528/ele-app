<template>
    <div id="orderBar">
        <div class="profile-sidebar">
            <ul>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-home"></i>
                        <router-link to="/profile">
                            <i class="title">个人中心</i>
                        </router-link>
                    </h2>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-weibiaoti--"></i> 我的订单
                    </h2>
                    <ul>
                        <li>
                            <router-link class="recentOrder" to="/profile/order">
                                <i>近三个月订单</i>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-wodezichan"></i> 我的资产
                    </h2>
                    <ul>
                        <li>
                            <router-link to="/profile">
                                <i>我的红包</i>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/profile">
                                <i>我的金币</i>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-app_icons--"></i> 我的资料
                    </h2>
                    <ul>
                        <li>
                            <router-link to="/profile/info">
                                <i>个人资料</i>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/profile/address">
                                <i>地址管理</i>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-wodeshoucang"></i>
                        <router-link to="/profile/favor">
                            <i class="title">我的收藏</i>
                        </router-link>
                    </h2>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
* {
    box-sizing: border-box;
}

#orderBar {
    background: #f5f5f5;

    .profile-sidebar {
        float: left;
        margin-left: -80px;
        width: 230px;
        background: #f5f5f5;
        i {
            font-style: normal;
        }
        .router-link-exact-active {
            i {
                color: #4169e1;
            }
        }

        .profile-sidebar-section {
            margin-bottom: 32px;

            .profile-sidebar-sectiontitle {
                margin-bottom: 8px;
                font-weight: 700;
                font-size: 18px;
                color: #000;

                .title {
                    font-size: 18px;
                    color: #000;
                }

                i {
                    color: #696969;
                }
            }

            ul > li > a {
                color: #696969;
                font-size: 14px;
            }
        }
    }
}
</style>