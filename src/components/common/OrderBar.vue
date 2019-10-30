<template>
    <div id="orderBar">
        <header class="header">
            <!-- 位置展示及搜索框 -->
            <div class="location">
                <span>当前位置</span>
                <span>
                    <router-link to="/place">新大陆科技园</router-link>
                </span>
                <span>
                    <a href="javascript:;">[切换地址]</a>
                </span>
                <span>></span>
                <span>近三个月订单</span>
            </div>
        </header>
        
        <div class="profile-sidebar">
            <ul>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-home"></i>
                        <router-link to="/profile"><i class="title"> 个人中心</i></router-link>
                    </h2>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-weibiaoti--"></i> 我的订单
                    </h2>
                    <ul>
                        <li>
                            <router-link class="recentOrder" to="/profile/order"><i>近三个月订单</i></router-link>
                        </li>
                    </ul>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-wodezichan"></i> 我的资产
                    </h2>
                    <ul>
                        <li>
                            <router-link to="/profile"><i>我的红包</i></router-link>
                        </li>
                        <li>
                            <router-link to="/profile"><i>我的金币</i></router-link>
                        </li>
                    </ul>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-app_icons--"></i> 我的资料
                    </h2>
                    <ul>
                        <li>
                            <router-link to="/profile/info"><i>个人资料</i></router-link>
                        </li>
                        <li>
                            <router-link to="/profile/address"><i>地址管理</i></router-link>
                        </li>
                    </ul>
                </li>
                <li class="profile-sidebar-section">
                    <h2 class="profile-sidebar-sectiontitle">
                        <i class="iconfont icon-wodeshoucang"></i>
                        <router-link to="/profile/favor"> <i class="title">我的收藏</i></router-link>
                    </h2>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
}
</script>

<style lang="scss">
@import "../../style/mixin.scss";
* {
    box-sizing: border-box;
}

#orderBar {
    width: 1180px;
    margin: 0 auto;
    background:#f5f5f5;

    .header {
        @include flex;
        justify-content: space-between;
        align-items: center;
        height: 53.6px;
        

        .location {
            font-size: 12px;
            span {
                display: inline-block;
                margin-right: 6px;
                line-height: 53.6px;
            }

            & span:nth-child(1) {
                color: #999999;
            }
            & span:nth-child(2) {
                color: #333333;
            }
            & span:nth-child(3) a {
                color: #0089dc;
            }
            & span:nth-child(4) {
                color: #999999;
                font-weight: bolder;
            }
            & span:nth-child(5) {
                color: #333333;
            }
        }
    }

    .profile-sidebar {
        float: left;
        margin-left: -80px;
        width: 230px;
        background:#f5f5f5;
        i{
            font-style:normal;
        }
        .router-link-exact-active {
            i {
                color:#4169E1;
            }
        }


        .profile-sidebar-section {
            margin-bottom: 32px;

            .profile-sidebar-sectiontitle {
                margin-bottom: 8px;
                font-weight: 700;
                font-size: 18px;
                color:#000;

                .title {
                    font-size: 18px;
                    color:#000;
                }

                i {
                    color:#696969;
                }
            }

            ul > li > a {
                color:#696969;
                font-size:14px;
            }

        }

    }
    
}
</style>