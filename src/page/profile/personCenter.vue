<template>
    <div id="person-center">
        <div class="profile-info">
            <div class="profile-infoitem">
                <div class="profile-avatarwrap">
                    <img src alt="13205010696头像" />
                </div>
                <div class="profile-persondata">
                    <h3>
                        中午好，
                        <strong>13205010696</strong>
                    </h3>
                    <p class="profile-tips">小主，今天午餐吃点啥？</p>
                </div>
            </div>
            <div class="profile-infoitem">
                <p>我的红包</p>
                <p class="profile-infoitem-number hongbao">
                    <span class="number">0</span>
                    个
                </p>
            </div>
            <div class="profile-infoitem">
                <p>我的金币</p>
                <p class="profile-infoitem-number score">
                    <span class="number">34</span>
                    个
                </p>
            </div>
            <div class="profile-infoitem">
                <p>账户余额</p>
                <p class="profile-infoitem-number balance">
                    <span class="number">0.00</span>
                    元
                </p>
            </div>
        </div>
        <div class="profile-order">
            <div class="tabnavigation">
                <a class="tabnavigation-navitem active">最近订单</a>
                <a
                    class="tabnavigation-rightitem profile-allorder"
                    @click="$router.push('/profile/order')"
                >查看全部订单&gt;</a>
            </div>
            <div class="profile-order-content">
                <ul>
                    <li class="order-item" v-for="(item, index) in 3" :key="index">
                        <div class="order-itemcol order-item-infowrap">
                            <a href="javascript:" class="imgwrap">
                                <img
                                    src="../../images/63d2494016e3ce1feb74241ddbfb7jpeg.jpeg"
                                    alt="叫了个炸鸡(凯隆店)"
                                />
                            </a>
                            <div class="order-item-info">
                                <h3 class="info-shoptitle">
                                    <a href="javascript:">叫了个炸鸡(凯隆店)</a>
                                </h3>
                                <p class="info-commodity">叫了个童子鸡+饮料套餐</p>
                                <a href="javascript:" class="info-productnum">
                                    共
                                    <span>1</span>
                                    个菜品&gt;
                                </a>
                            </div>
                        </div>
                        <div class="order-itemcol order-item-time">2019-10-27 19:53</div>
                        <div class="order-itemcol order-item-price">¥19.20</div>
                        <div class="order-itemcol order-item-status">
                            <p class="status end">订单已完成</p>
                            <a class="statuslink">订单详情</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="profile-foot">
            <div class="tabnavigation">
                <a class="tabnavigation-navitem active">美食足迹</a>
                <a class="tabnavigation-navitem">我的收藏</a>
                <div class="tabnavigation-rightitem simplepagination">
                    1/1
                    <span class="pre-btn el-icon-arrow-left disable"></span>
                    <span class="next-btn el-icon-arrow-right disable"></span>
                </div>
            </div>
            <div class="profile-foot-content">
                <ul>
                    <li class="foot-item">
                        <a class="shop-profile">
                            <div class="logo">
                                <img src="../../images/63d2494016e3ce1feb74241ddbfb7jpeg.jpeg" alt />
                                <span>25 分钟</span>
                            </div>
                            <div class="content">
                                <div class="title">叫了个炸鸡(凯隆店)</div>
                                <div class="level">
                                    <el-rate v-model="level" disabled text-color="#ff9900"></el-rate>
                                </div>
                                <div class="shop-fee">
                                    <!-- <span v-if="!item.shop_fee">免配送费</span> -->
                                    <span>配送费￥0.1</span>
                                </div>
                                <div class="provide">
                                    <i>保</i>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            level: 4.8
        };
    }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
#person-center {
    .profile {
        &-info,
        &-order,
        &-foot {
            margin-bottom: 20px;
            border: 1px solid #eee;
            background-color: #fff;
        }
        &-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30px 0;
            .profile-infoitem {
                border-right: 1px solid #eee;
                width: 203px;
                &:first-child {
                    display: flex;
                    align-items: center;
                    flex: 0 0 400px;
                    padding-left: 30px;
                    text-align: left;
                }
                .profile-avatarwrap {
                    position: relative;
                    display: inline-block;
                    margin-right: 20px;
                    cursor: pointer;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        display: inline-block;
                        width: 112px;
                        height: 112px;
                    }
                }
                .profile-persondata {
                    .profile-tips {
                        margin: 6px 0 10px;
                        color: #999;
                        font-size: 12px;
                    }
                }
                p {
                    line-height: 1.5;
                }

                .profile-infoitem-number {
                    font-weight: 600;
                    font-size: 12px;
                    height: 60px;
                    line-height: 60px;
                    &.hongbao {
                        color: #fc463f;
                    }
                    &.score {
                        color: #5db423;
                    }
                    &.balance {
                        color: #ff9c00;
                    }
                    .number {
                        font-size: 30px;
                    }
                }
            }
        }
        &-order {
            .profile-order-content {
                .order-item {
                    display: flex;
                    align-items: center;
                    text-align: left;
                    padding: 20px 0 15px 0;
                    font-size: 12px;
                    &-infowrap {
                        flex: 1 0 auto;
                        display: flex;
                        align-items: center;
                        .imgwrap {
                            padding-right: 20px;
                            img {
                                width: 70px;
                                height: 70px;
                            }
                        }
                        .order-item-info {
                            flex: 1;
                            .info {
                                &-shoptitle {
                                    width: 100%;
                                    a {
                                        font-size: 16px;
                                        font-weight: 700;
                                    }
                                }
                                &-commodity {
                                    @include ui-ellipsis;
                                    max-width: 523px;
                                    margin: 6px 0;
                                    font-size: 12px;
                                    color: #999;
                                }
                                &-productnum {
                                    font-size: 12px;
                                    color: #999;
                                    span {
                                        color: #f04240;
                                        font-style: normal;
                                    }
                                }
                            }
                        }
                    }
                    &-time {
                        flex: 0 0 85px;
                        color: #999;
                        text-align: center;
                    }
                    &-price {
                        flex: 0 0 190px;
                        font-size: 16px;
                        text-align: center;
                    }
                    &-status {
                        flex: 0 0 100px;
                        text-align: center;
                        .status {
                            font-size: 16px;
                        }
                        .end {
                            color: #999;
                        }
                        .statuslink {
                            color: #0089dc;
                            font-size: 12px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        &-foot {
            .tabnavigation .simplepagination {
                font-size: 12px;
                cursor: default;
                .pre-btn,
                .next-btn {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    line-height: 18px;
                    text-align: center;
                    color: #999;
                    background-color: #ececec;
                    border-radius: 2px;
                    cursor: pointer;
                }
                .pre-btn {
                    margin: 0 6px;
                }
                .disabled,
                .disabled:hover {
                    background-color: #f4f4f4;
                    color: #ccc;
                }
            }
        }
        &-order,
        &-foot {
            padding: 20px 20px 0;
            .tabnavigation {
                text-align: left;
                border-bottom: 2px solid #f4f4f4;
                position: relative;
                &-navitem,
                &-rightitem {
                    line-height: 1;
                }
                &-navitem {
                    display: inline-block;
                    margin-bottom: -2px;
                    padding: 0 10px;
                    height: 27px;
                    cursor: pointer;
                    font-size: 16px;
                    color: #666;
                    &.active {
                        font-weight: 700;
                        border-bottom: 3px solid #0089dc;
                    }
                }
                &-rightitem {
                    position: absolute;
                    bottom: 10px;
                    right: 0;
                    color: #666;
                    cursor: pointer;
                    &.profile-allorder {
                        font-size: 12px;
                    }
                }
            }

            .foot-item {
                display: flex;
                flex-flow: wrap;
                .shop-profile {
                    @include shopItem;
                    width: calc(100% / 3);
                }
            }
        }
    }
}
</style>