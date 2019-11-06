<template>
    <div id="shopInfo">
        <div class="shop-header">
            <div class="header-container">
                <div class="header-left">
                    <img src="../images/63d2494016e3ce1feb74241ddbfb7jpeg.jpeg" alt="叫了个炸鸡(凯隆店)" />
                    <div class="left-title">
                        <div class="top">
                            <h1>叫了个炸鸡(凯隆店)</h1>
                            <span>预订中，今天 11:00后开始送餐</span>
                        </div>
                        <p>
                            <el-rate
                                v-model="value5"
                                disabled
                                text-color="#ff9900"
                                score-template="{value}"
                            ></el-rate>
                            <span>
                                (
                                <a href="javascript:" class="rate">490</a>)
                            </span>
                        </p>
                    </div>
                    <div class="shopguid-info">
                        <ul>
                            <li class="shop-evaluate">
                                <div class="evaluate-left">
                                    <h2 class="font-red-color">4.6</h2>
                                    <p>
                                        综合评价
                                        <br />
                                        <span>高于周边商家</span>
                                        <span class="font-red-color">69.7%</span>
                                    </p>
                                </div>
                                <div class="evaluate-right">
                                    <p>
                                        服务态度
                                        <el-rate
                                            v-model="value5"
                                            disabled
                                            text-color="#ff9900"
                                            score-template="{value}"
                                        ></el-rate>
                                        <span class="font-red-color">3.0分</span>
                                    </p>
                                    <p>
                                        菜品评价
                                        <el-rate
                                            v-model="value5"
                                            disabled
                                            text-color="#ff9900"
                                            score-template="{value}"
                                        ></el-rate>
                                        <span class="font-red-color">3.0分</span>
                                    </p>
                                </div>
                            </li>
                            <li class="address">
                                <p>
                                    <span class="lable">商家地址：</span>
                                    <span>11</span>
                                </p>
                                <p>
                                    <span class="lable">营业时间：</span>
                                    <span>11:00-14:00 / 14:45-00:00</span>
                                </p>
                            </li>
                            <li>
                                <p class="shop-delivery">
                                    由
                                    <span>叫了个炸鸡(凯隆店)</span>
                                    提供配送服务
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="header-right">
                    <span>
                        <em>起送价</em>
                        <em class="shop-server-value">20元</em>
                    </span>
                    <span>
                        <em>配送费</em>
                        <em class="shop-server-value">配送费￥1.4</em>
                    </span>
                    <span>
                        <em>平均送达速度</em>
                        <em class="shop-server-value">50分钟</em>
                    </span>
                </div>
                <a href="javascript" class="collect">
                    <i class="collect-icon bg"></i>
                    <span>收藏</span>
                </a>
            </div>
        </div>
        <div class="shop-nav">
            <div class="nav-container">
                <div class="left">
                    <ul class="route-nav">
                        <router-link
                            tag="li"
                            :class="{'router-link-active': $route.name =='shop/goods'}"
                            :to="{name: 'shop/goods', params: {name: $route.params.name,id: $route.params.id}}"
                            exact
                        >所有商品</router-link>
                        <router-link
                            tag="li"
                            :class="{'router-link-active': $route.name =='shop/rate'}"
                            class="before-style"
                            :to="{name: 'shop/rate', params: {name: $route.params.name,id: $route.params.id}}"
                        >评价</router-link>
                        <router-link
                            tag="li"
                            :class="{'router-link-active': $route.name =='shop/info'}"
                            class="before-style"
                            :to="{name: 'shop/info', params: {name: $route.params.name,id: $route.params.id}}"
                        >商家资质</router-link>
                    </ul>
                    <div class="sort">
                        <a
                            href="javascript:"
                            :class="{active: sortObj['default']}"
                            @click="sort('default')"
                            ref="default"
                        >默认排序</a>
                        <a
                            href="javascript:"
                            :class="{active: sortObj['score']}"
                            @click="sort('score')"
                            ref="score"
                        >
                            评分
                            <i
                                class="score"
                                :class="{'blur-score': !sortObj['score'], 'active-score': sortObj['score']}"
                            ></i>
                        </a>
                        <a
                            href="javascript:"
                            :class="{active: sortObj['sales']}"
                            @click="sort('sales')"
                            ref="sales"
                        >
                            销量
                            <i
                                class="sales"
                                :class="{'blur-sales': !sortObj['sales'], 'active-sales': sortObj['sales']}"
                            ></i>
                        </a>
                        <a
                            href="javascript:"
                            :class="{active: sortObj['price']}"
                            @click="sort('price')"
                            ref="price"
                        >
                            价格
                            <i
                                class="price"
                                :class="{'blur-price': !sortObj['price'], 'active-price':    (sortObj['price'] && sort_price['desc']), 'sort-asce':  ( sortObj['price']&&sort_price['asce'])}"
                            ></i>
                        </a>
                        <div class="layout">
                            <a
                                href="javascript:"
                                title="以网格形式展示"
                                :class="{'active-grid': layout == 'grid' }"
                                @click="layout='grid'"
                            >
                                <i class="layout-grid"></i>
                            </a>
                            <a
                                href="javascript:"
                                title="以列表形式展示"
                                :class="{'active-list': layout == 'list' }"
                                @click="layout='list'"
                            >
                                <i class="layout-list"></i>
                            </a>
                        </div>
                        <!-- <a href="javascript:">价格</a>
                        <a href="javascript:">价格</a>-->
                    </div>
                </div>
                <div class="right">
                    <div class="search-input">
                        <input
                            type="text"
                            id="shop-search-input"
                            placeholder="搜索美食..."
                            autocomplete
                        />
                        <i class="el-icon-search"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="shop-container">
            <div class="content">
                <div class="shop-left">
                    <router-view></router-view>
                </div>
                <div class="shop-right">
                    <h3>商家公告</h3>
                    <p></p>
                    <div class="shopbulletin-delivery">
                        <h4>配送说明：</h4>
                        <p>配送费￥1.4</p>
                    </div>
                    <ul class="shopbulletin-supports">
                        <li>
                            <i>保</i>
                            <span>该商户食品安全已由国泰产险承担，食品安全有保障</span>
                        </li>
                    </ul>
                    <a class="shopcomplaint">举报商家</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value5: 3,
            route: "",
            sortObj: {
                default: true,
                score: false,
                sales: false,
                price: false
            },
            sort_price: {
                desc: true,
                asce: false
            },
            layout: "grid"
        };
    },
    methods: {
        sort(type) {
            if (type == "price") {
                this.sort_price.desc = !this.sort_price.desc;
                this.sort_price.asce = !this.sort_price.asce;
            } else {
            }
            for (let t in this.sortObj) {
                this.sortObj[t] = false;
            }
            this.sortObj[type] = true;
        }
    },
    computed: {},
    watch: {
        layout() {
            this.$store.dispatch("setShoplayout", this.layout);
        }
    },
    created() {
        let arr = this.$route.path.split("/");
        let str = "/" + arr[1] + "/" + arr[2] + "/" + arr[3];

        this.route = str;
        // console.log(this.route);
    }
};
</script>

<style lang="scss">
@import "../style/mixin.scss";
#shopInfo {
    .font-red-color {
        color: #f74342 !important;
    }

    .el-rate {
        display: inline-block;
        vertical-align: middle;
        i {
            font-size: 16px;
        }

        .el-rate__icon {
            margin-right: 0;
        }
    }

    .shop-header {
        padding-top: 48px;
        background: url("../images/shop-bg.0391dd.jpg") no-repeat;
        background-size: cover;
        .header-container {
            display: flex;
            position: relative;
            align-items: center;
            margin: 0 auto;
            width: 1180px;
            height: 142px;
        }

        .header-left {
            display: flex;
            position: relative;
            align-items: center;
            padding-right: 25px;
            height: 142px;
            color: #ffffff;
            z-index: 1;
            img {
                width: 95px;
                height: 95px;
                margin-right: 15px;
                border-radius: 50%;
                border: 4px solid rgba(255, 255, 255, 0.3);
                box-sizing: border-box;
            }
            .rate {
                margin-left: -3px;
                color: #ffffff;
            }
        }

        .left-title {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .top {
                display: flex;
                align-items: center;

                h1,
                span {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 170px;
                }
                h1 {
                    font-size: 20px;
                    margin: 0;
                }
                span {
                    margin-left: 5px;
                    padding: 2px 4px;
                    color: #ffffff;
                    border-radius: 3px;
                    background-color: rgb(84, 206, 117);
                    font-size: 12px;
                    box-sizing: border-box;
                }
            }

            p {
                margin: 10px 0;
            }

            p > span {
                vertical-align: middle;
                margin-left: 2px;
                font-size: 14px;
            }
        }

        .header-left .shopguid-info {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
            padding-top: 142px;
            width: 100%;
            overflow: hidden;
            opacity: 0;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.322);
            background: rgba(255, 255, 255, 0.1);
            max-height: 0;
            color: #333333;
            transition: opacity 0.1s ease-in-out, max-height 0.4s ease-in-out;

            ul {
                padding: 0 20px;
                background: #ffffff;

                li {
                    padding: 15px 0;
                    border-top: 1px solid #eeeeee;
                    text-align: left;
                }
            }

            .shop-evaluate {
                display: flex;
                justify-content: space-around;
                text-align: center;
                border-top: none;
            }

            .evaluate-left {
                flex: 1;
                border-right: 1px solid #eeeeee;

                h2 {
                    font-size: 28px;
                    line-height: 42px;
                }

                p {
                    font-size: 12px;

                    span {
                        display: inline-block;
                        margin: 0 2px;
                        color: #999999;
                        line-height: 20px;
                    }
                }
            }
            .evaluate-right {
                flex: 1.26;
                display: flex;
                flex-direction: column;
                justify-content: center;

                p {
                    font-size: 12px;
                    line-height: 2;

                    .el-rate {
                        line-height: 24px;
                    }

                    .el-rate i {
                        font-size: 12px;
                    }
                }
            }

            .address {
                p {
                    margin-left: 70px;
                    color: #666666;
                    font-size: 14px;
                }
                .lable {
                    margin-left: -70px;
                }
            }

            p.shop-delivery {
                margin: 0 0 10px;
                font-size: 14px;

                span {
                    color: #0089dc;
                    margin: 0 5px;
                }
            }
        }

        .header-left:hover {
            .shopguid-info {
                opacity: 1;
                max-height: 900px;
            }
        }

        .header-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 700px;
            padding-right: 100px;
            height: 142px;
            color: #ffffff;
            font-size: 14px;

            span {
                margin-left: 80px;
            }

            .shop-server-value {
                display: block;
                margin: 12px 0 3px;
                font-size: 18px;
            }
        }
        .collect {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: 0;
            right: 0;
            padding: 10px 5px;
            width: 80px;
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0 0 5px 5px;
            color: #eee;
            box-sizing: border-box;

            .collect-icon {
                width: 24px;
                height: 24px;
                font-size: 14px;

                background-size: 24px 24px;
            }

            .collect-icon.bg {
                background-image: url("../images/icons/full-heart.svg");
            }
        }
    }

    .shop-nav {
        background: #ffffff;
        .nav-container,
        .left,
        .left .route-nav {
            display: flex;
        }
        .nav-container {
            justify-content: space-between;
            align-items: center;

            width: 1180px;
            margin: 0 auto;

            .left {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: space-between;

                li {
                    cursor: default;
                    position: relative;
                    width: 112px;
                }

                li,
                .sort {
                    @include center;
                    height: 57px;
                }

                .sort {
                    display: flex;
                    align-items: center;

                    .active {
                        color: #0089dc;
                    }

                    .score,
                    .sales,
                    .price {
                        display: inline-block;
                        margin-left: 5px;
                        width: 14px;
                        height: 14px;
                        vertical-align: top;
                        background: no-repeat;

                        background-size: 15px;
                        background-position: center;
                    }

                    .blur-score,
                    .blur-sales,
                    .blur-price {
                        background-image: url("../images/icons/down.svg");
                    }

                    .active-score,
                    .active-sales,
                    .active-price {
                        background-image: url("../images/icons/active-down.svg");
                    }

                    .sort-asce {
                        background-size: 10px;
                        background-image: url("../images/icons/up.svg");
                    }

                    .layout {
                        display: flex;
                        align-items: center;
                        a {
                            padding: 0;
                            width: 32px;
                            height: 32px;
                            border: 1px solid #ddd;
                            // background-color: #0089dc;
                            // border-color: #0089dc;
                        }

                        .layout-grid,
                        .layout-list {
                            width: 22px;
                            height: 22px;
                            background-size: cover;
                        }

                        .layout-grid {
                            background-image: url("../images/icons/grid.svg");
                        }

                        .layout-list {
                            background-image: url("../images/icons/list.svg");
                        }

                        .active-grid {
                            background-color: #0089dc;
                            border-color: #0089dc;
                            .layout-grid {
                                background-image: url("../images/icons/active-grid.svg");
                            }
                        }
                        .active-list {
                            background-color: #0089dc;
                            border-color: #0089dc;
                            .layout-list {
                                background-image: url("../images/icons/active-list.svg");
                            }
                        }
                    }
                }

                .router-link-active {
                    color: #0089dc;
                }
                .router-link-active::after,
                .before-style::before {
                    content: "";
                    position: absolute;
                    left: 0;
                }
                .router-link-active::after {
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    border-top: 3px solid;
                }
                .before-style::before {
                    top: 50%;
                    margin-top: -7px;
                    height: 14px;
                    width: 1px;
                    background-color: #ccc;
                }

                .sort {
                    a {
                        @include center;
                        padding: 0 15px;
                    }
                }
            }
        }

        .right {
            padding: 0 0 0 30px;
            #shop-search-input {
                width: 200px;
            }
            #shop-search-input:focus {
                width: 200px;
            }
        }
    }

    .shop-container {
        .content {
            display: flex;
            width: 1180px;
            margin: 20px auto 0 auto;
        }

        .shop-left {
            flex: 3;
        }
        .shop-right {
            max-height: 238px;
            flex: 1;
            margin-left: 15px;
            text-align: left;
            border-radius: 2px 2px 0 0;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
            color: #333333;
            background: #ffffff;

            h3 {
                padding: 0 1em;
                color: #ffffff;
                background: #0089dc;
                line-height: 2.8em;
            }
            & > p {
                padding: 10px 15px;
            }

            .shopbulletin-delivery {
                background: #f5f5f5;
                padding: 10px 15px;

                h4 {
                    font-weight: 700;
                }
            }
            .shopbulletin-supports {
                padding: 0 15px;
                li {
                    display: flex;
                    margin: 10px 0;
                    i {
                        flex: 1 0 auto;
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        line-height: 22px;
                        text-align: center;
                        border-radius: 50%;
                        background: #999999;
                        color: #ffffff;
                        font-size: 12px;
                        margin-right: 5px;
                    }
                    span {
                        letter-spacing: 1px;
                    }
                }
            }
            .shopcomplaint {
                display: block;
                line-height: 3;
                font-size: 18px;
                text-align: center;
                color: #666666;
                border-top: 1px solid #eeeeee;
                cursor: pointer;
            }
        }
    }
}
</style>