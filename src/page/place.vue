<template>
    <div id="place">
        <div class="to-take">
            <div class="img">
                <img src="../images/takeout.408a87.png" alt />
            </div>
        </div>

        <!-- 商家分类 -->
        <div class="shop-type-wrap">
            <div class="excavator-filter">
                <span class="excavator-filter-name type-title">商家分类:</span>
                <a
                    href="javascript:"
                    ref="allShop"
                    class="all-shop type-title types hover"
                    @click="selectAllType"
                >全部商家</a>
                <a
                    href="javascript:"
                    class="types type-title hover"
                    v-for="(item, index) in type_1"
                    :key="index"
                    @click="selectType_1(item)"
                >{{item}}</a>

                <!-- 二级分类 -->
                <div class="type-2" v-show="type_2.length">
                    <a
                        href="javascript:"
                        :class="{ focus: type_2_focus[item] }"
                        v-for="(item, index) in type_2"
                        :key="index"
                        @click="selectType_2(item)"
                    >{{type_2[index]}}</a>
                </div>
            </div>
        </div>

        <!-- 商家展示 -->

        <div class="shop-container search-null" v-if="isFirst && !hasShop">
            <div>
                <img src="../images/icon-restaurant.b3a359.png" alt="找不到商家" />
            </div>
            <div class="not-found-shop">附近没有找到符合条件的商家，换个筛选条件试试吧</div>
        </div>
        <!-- loading -->

        <div class="shop-container" v-else>
            <div
                class="shop-profile"
                v-for="(item, index) in shopData"
                :key="index"
                @mouseenter="showProfile(index)"
                @mouseleave="hideProfile(index)"
                @click="getShopInfo(item)"
            >
                <div class="logo">
                    <img :src="shopsImage[item.img]" :alt="item.shop_name" />
                    <span>{{item.distribution_time}} 分钟</span>
                </div>
                <div class="content">
                    <div class="title">{{item.shop_name}}</div>
                    <div class="level">
                        <el-rate v-model="item.level" disabled text-color="#ff9900"></el-rate>
                    </div>
                    <div class="shop-fee">
                        <span v-if="!item.shop_fee">免配送费</span>
                        <span v-else>配送费￥{{item.shop_fee}}</span>
                    </div>
                    <div class="provide">
                        <i v-for="(i, index) in shopProvide(item.provide)" :key="index">{{i}}</i>
                    </div>
                </div>
                <div
                    :class="{'shop-profile-right': (index + 1) % 4 != 0,
                               'shop-profile-left': (index + 1) % 4 == 0 }"
                    :ref="'profile'+index"
                    @mouseenter="hideProfile(index)"
                >
                    <div class="shop-show-title">{{item.shop_name}}</div>
                    <div class="shop-show-type">
                        <span v-for="(type,i) in item.type_2" :key="i">{{type}}</span>
                    </div>
                    <div
                        class="provide shop-show-provide"
                        v-for="(provide, i) in shopProvide(item.provide)"
                        :key="i"
                    >
                        <i>{{provide}}</i>
                        <div style="clear: both;">{{ provideIntroduce(provide) }}</div>
                    </div>
                    <div class="show-delivery-fee-time">
                        <span class="fee" v-if="item.shop_fee">配送费￥{{item.shop_fee}}</span>
                        <span class="fee" v-else>免配送费</span>
                        <span class="time">
                            平均
                            <span>{{item.distribution_time}}</span>
                            分钟送达
                        </span>
                    </div>
                    <div class="shop-show-introduction">{{item.introduction}}</div>
                </div>
            </div>
            <div class="loading" v-if="isLoading">
                <img src="../images/loading.0e7b2e.gif" alt="正在加载" />
                正在加载更多商家
            </div>
        </div>

        <!-- 展示更多 -->
        <div class="show-more" @click="showMore" v-if="!isLoading&&hasMore">
            <span>点击加载更多商家...</span>
        </div>
        <Dialog :open.sync="showDialog" :info="dialogInfo" @update:open="val => showDialog = val"></Dialog>
    </div>
</template>
<script>
import Dialog from "../components/common/Dialog";
export default {
    name: "place",
    data() {
        return {
            type_2: [], //二级类别
            type_2_focus: {}, //二级类别选中 { "地方菜系": true }
            shopData: [],
            page: 0,
            //按类别搜索商家
            searchType: {},
            searchType_1: "",
            searchType_2: "",
            isLoading: false,
            hasMore: true,
            isAll: false,
            shopsImage: {},
            showTimeOut: null,
            isFirst: true,
            hasShop: true,

            showDialog: false,
            dialogInfo: {
                title: "请求出错",
                type: "warn",
                msg: "请求更多商家，请先登录"
            }
        };
    },
    methods: {
        setShopType() {
            this.$server.getShopType(this).then(res => {
                let type = {},
                    type_1 = [],
                    t_1,
                    data = res.data;
                data.forEach(item => {
                    if (!type_1.includes(item.type_1)) {
                        type_1.push(item.type_1);
                    }
                });
                for (let t of type_1) {
                    t_1 = [];
                    data.forEach(item => {
                        if (item.type_1 == t) {
                            t_1.push(item.type_2);
                        }
                    });
                    type[t] = t_1;
                }
                this.$store.dispatch("setShopType", type);
                this.$store.dispatch("setShopType_1", type_1);
            });
        },
        selectAllType() {
            if (this.isAll) {
                return;
            }
            this.isAll = true;
            this.page = 0;
            this.shopData = null;
            this.hasShop = true;
            this.isFirst = true;
            for (let t in this.type_2_focus) {
                this.type_2_focus[t] = false;
            }
            this.changeAllType_style();
            this.getAllShops();
        },
        selectType_1(type, e) {
            if (
                this.searchType_1 == type &&
                this.searchType_2 == "" &&
                !this.isAll
            ) {
                return;
            }

            this.isAll = false;
            this.hasShop = true;
            this.isFirst = true;
            e = e || window.event;
            this.searchType_2 = "";
            this.searchType_1 = type;
            this.page = 0;
            this.shopData = null;

            this.changeType_1_style(e);
            let allType = this.$store.getters.shopType,
                selectType = [];
            for (let t in allType) {
                if (t == type) {
                    selectType = allType[t];
                }
            }
            // let type_2_focus = {};
            // type_2_focus["全部"] = true;
            this.$set(this.type_2_focus, "全部", true);

            for (let t of selectType) {
                // type_2_focus[t] = false;
                this.$set(this.type_2_focus, t, false);
            }
            // this.type_2_focus = type_2_focus;
            this.type_2 = Array.from(selectType);
            if (this.type_2.length) {
                this.type_2.unshift("全部");
            }
            this.getShops();
        },
        selectType_2(type) {
            this.isAll = false;
            this.searchType_2 = type == "全部" ? "" : type;
            this.page = 0;
            this.shopData = null;
            this.hasShop = true;
            this.isFirst = true;
            let tFocus = this.type_2_focus;
            this.$refs["allShop"].classList.remove("focus");
            for (let t in tFocus) {
                t == type ? (tFocus[t] = true) : (tFocus[t] = false);
            }
            this.getShops();
            // e = e || window.event;
            // this.$refs["allShop"].classList.remove("focus");
            // this.changeType_2_style(e);
        },
        changeAllType_style(e) {
            let el = this.$refs["allShop"];
            el.classList.remove("hover");
            el.classList.add("focus");
        },
        changeType_1_style(e) {
            this.$refs["allShop"].classList.remove("all-shop");
            this.$refs["allShop"].classList.remove("focus");
            this.$refs["allShop"].classList.add("hover");
            e.path[1].childNodes.forEach(item => {
                item.classList.remove("active");
            });
            e.target.classList.add("active");
        },
        changeType_2_style(e) {
            e.path[1].childNodes.forEach(item => {
                item.classList.remove("focus");
            });
            e.target.classList.add("focus");
        },
        //请求商家简介
        getAllShops() {
            this.isLoading = true;
            this.$server.getShops(this, {}, this.page).then(res => {
                if (res.data.length == 0 && this.isFirst) {
                    this.hasShop = false;
                }
                if (res.data.length < 15) {
                    this.hasMore = false;
                } else {
                    this.hasMore = true;
                }
                if (!this.page) {
                    this.shopData = res.data;
                    this.shopData.forEach(item => {
                        this.getShopImg(item.img);
                    });
                } else {
                    res.data.forEach(item => {
                        this.getShopImg(item.img);
                        this.shopData.push(item);
                    });
                }
                this.$nextTick(() => {
                    this.isLoading = false;
                });
            });
        },
        getShops() {
            this.isLoading = true;
            this.searchType = {};
            if (this.searchType_1) {
                this.searchType.type = this.searchType_1;
            }
            if (this.searchType_2) {
                this.searchType.type_2 = this.searchType_2;
            }
            this.$server
                .getShops(this, this.searchType, this.page)
                .then(res => {
                    if (res.data.length == 0 && this.isFirst) {
                        this.hasShop = false;
                    }
                    if (res.data.length < 15) {
                        this.hasMore = false;
                    } else {
                        this.hasMore = true;
                    }
                    if (!this.page) {
                        this.shopData = res.data;
                        this.shopData.forEach(item => {
                            this.getShopImg(item.img);
                        });
                    } else {
                        res.data.forEach(item => {
                            this.getShopImg(item.img);
                            this.shopData.push(item);
                        });
                    }
                    this.$nextTick(() => {
                        this.isLoading = false;
                    });
                });
        },
        //获取商家图片
        getShopImg(imgPath) {
            this.$server.getShopImg(this, imgPath).then(res => {
                // this.shopsImage.push(res);
                this.$set(this.shopsImage, imgPath, res);
                // console.log(this.shopsImage);
            });
        },
        shopProvide(str) {
            let arr = [];
            if (str) {
                arr = str.split(",");
            }
            return arr;
        },
        //加载更多
        showMore() {
            if (localStorage["login_user"]) {
                this.page++;
                this.isFirst = false;
                if (this.isAll) {
                    this.getAllShops();
                } else {
                    this.getShops();
                }
            } else {
                this.showDialog = true;
            }
        },
        //鼠标移入展示商家信息
        showProfile(index) {
            this.showTimeOut = setTimeout(() => {
                this.$refs["profile" + index][0].style.display = "block";
            }, 500);
        },
        //鼠标移出隐藏商家信息
        hideProfile(index) {
            clearTimeout(this.showTimeOut);
            this.$refs["profile" + index][0].style.display = "none";
        },
        provideIntroduce(provide) {
            let str = "";
            if (provide == "保") {
                str = "该商户食品安全已由国泰产险承担，食品安全有保障";
            } else if (provide == "赔") {
                str = "商家原因导致订单取消，赔付代金券";
            } else if (provide == "票") {
                str = "该商家支持开发票，请在下单时填写好发票抬头";
            }
            return str;
        },
        //请求商家详细
        getShopInfo(item) {
            console.log(item);
            let routeData = this.$router.resolve({
                name: "shop",
                params: {
                    name: item.shop_name,
                    id: item._id
                }
            });

            window.open(routeData.href, "_blank");
        }
    },
    computed: {
        type_1() {
            return this.$store.getters.shopType_1;
        }
    },
    created() {
        if (!this.$store.getters.shopType) {
            this.setShopType();
        }
        this.getAllShops();
    },
    components: {
        Dialog
    }
};
</script>

<style lang="scss">
@import "../style/mixin.scss";

@mixin shop-profile-show {
    position: absolute;
    display: none;
    z-index: 999;
    width: 294px;
    top: 2px;
    padding: 10px 15px;
    border: 2px solid #d3d3d3;
    background: #ffffff;
    text-align: left;
}

* {
    box-sizing: border-box;
}

#place {
    width: 1180px;
    margin: 0 auto;

    .to-take {
        text-align: right;
        border-bottom: 1px solid #e6e6e6;
        .img {
            margin-bottom: 6px;
            width: 186px;
            height: 42px;
            display: inline-block;
            cursor: pointer;
            img {
                width: 186px;
                height: 55px;
                vertical-align: middle;
            }
        }
    }
    .shop-type-wrap {
        border: 1px solid #e6e6e6;
        text-align: left;
        .type-title {
            padding: 0 10px;
            margin-right: 8px;
            &.focus {
                color: #fff;
                background-color: #0089dc;
                border-radius: 3px;
            }
        }
        .excavator-filter {
            line-height: 26px;
            padding: 10px 10px 10px 98px;
            background-color: #fff;
            position: relative;
            a {
                color: #666666;
                font-size: 14px;
            }
            .types {
                white-space: nowrap;
                display: inline-block;
                margin: 5px 6px;
            }
            .hover:hover {
                background-color: #f6f6f6;
                border-radius: 3px;
            }

            .all-shop {
                display: inline-block;
                line-height: 36px;
                background-color: #f6f6f6;
                border-radius: 0;
                margin: 0;
                padding: 0 16px;
                height: 38px;
            }
        }
        .type-title.active {
            line-height: 36px;
            background-color: #f6f6f6;
            border-radius: 0;
            margin: 0;
            padding: 0 16px;
            height: 38px;
        }
        .excavator-filter-name {
            position: absolute;
            top: 13px;
            left: 10px;
            font-size: 14px;
            color: #999999;
        }
        .type-2 {
            background-color: #f6f6f6;
            padding: 6px 0;
            box-sizing: border-box;
            a {
                white-space: nowrap;
                display: inline-block;
                margin: 5px 6px;
                padding: 0 10px;
            }

            .focus {
                color: #fff;
                background-color: #0089dc;
                border-radius: 3px;
            }
        }
    }

    // 商家缩略信息
    .shop-container {
        display: flex;

        flex-wrap: wrap;
        width: 1180px;
        margin-top: 20px;
        border: 1px solid #e6e6e6;
        background: #ffffff;

        .shop-profile-right {
            @include shop-profile-show;
            left: calc(100% + 2px);
        }

        .shop-profile-right::before {
            @include triangle;
            left: -20px;
            top: 10px;
            border: 10px solid #d3d3d3;
            // border-color: transparent transparent #ffffff;
            border-color: transparent #d3d3d3 transparent transparent;
        }

        .shop-profile-right::after {
            @include triangle;
            left: -16px;
            top: 10px;
            border: 10px solid #ffffff;
            // border-color: transparent transparent #ffffff;
            border-color: transparent #ffffff transparent transparent;
        }

        .shop-profile-left {
            @include shop-profile-show();
            right: 100%;
        }

        .shop-profile-left::before {
            @include triangle;
            right: -20px;
            top: 10px;
            border: 10px solid #d3d3d3;
            border-color: transparent transparent transparent #d3d3d3;
        }

        .shop-profile-left::after {
            @include triangle;
            right: -16px;
            top: 10px;
            border: 10px solid #ffffff;
            border-color: transparent transparent transparent #ffffff;
        }

        .shop-profile-left,
        .shop-profile-right {
            .shop-show-title {
                font-size: 16px;
                font-weight: bold;
                padding: 10px 0 0;
                color: #000000;
            }
            .shop-show-type {
                border-bottom: 1px solid #dbdbdb;
                span {
                    display: inline-block;
                    margin-right: 5px;
                    line-height: 35px;
                }
            }
            .shop-show-provide {
                display: flex;
                i {
                    flex: 0 0 auto;
                }
            }
            .show-delivery-fee-time {
                display: flex;
                margin: 10px 0 15px 0;
                padding: 10px;
                background: rgba(228, 225, 225, 0.5);
                justify-content: space-between;
                text-align: center;
                color: #696969;
                .fee {
                    flex: 1;
                    position: relative;
                    display: inline-block;
                }
                .fee::after {
                    content: "";
                    display: inline-block;
                    position: absolute;
                    width: 1px;
                    height: 14px;
                    right: -10px;
                    top: 2px;
                    background: #999999;
                }
                .time {
                    display: inline-block;
                    flex: 2;
                    span {
                        display: inline-block;
                        color: #f82e2e;
                        font-size: 13px;
                        padding: 0 2px;
                    }
                }
            }
            .shop-show-introduction {
                margin: 10px 0;
            }
        }

        .shop-profile {
            display: flex;
            padding: 20px;
            width: 25%;
            border-bottom: 1px #f5f5f5 solid;
            font-size: 12px;
            color: #999999;
            position: relative;
            .logo {
                margin-right: 20px;

                img {
                    display: block;
                    width: 70px;
                    height: 70px;
                    margin-bottom: 10px;
                }
            }
            .content {
                width: calc(100% - 90px);
                text-align: left;
            }
            .title {
                width: 100%;
                margin-bottom: 6px;

                color: #333333;
                font-size: 16px;
                font-weight: 600;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .level {
                padding-top: 5px;
                .el-rate {
                    i {
                        font-size: 14px;
                    }

                    .el-rate__icon {
                        margin-right: 0;
                    }
                }
            }
            .shop-fee {
                margin-top: 0;
            }
            .provide {
                margin-top: 10px;
                i {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border: 1px solid;
                    border-radius: 2px;
                    text-align: center;
                    line-height: 16px;
                    vertical-align: middle;
                    font-style: normal;
                    margin-right: 3px;
                }
            }
        }

        .shop-profile:hover {
            cursor: pointer;
            .title {
                color: #0089dc;
            }
            background: rgba(223, 219, 219, 0.2);
        }
    }

    // 展示更多
    .show-more {
        padding: 10px 0;
        background-image: linear-gradient(to bottom, #f9f9f9, #eee);
        color: #777;
        cursor: pointer;
    }
    .loading {
        width: 100%;
        font-size: 14px;
        color: #999999;
        line-height: 150px;
        text-align: center;
        img {
            width: 36px;
            margin-right: 6px;
            vertical-align: middle;
        }
    }

    //无该类型商家
    .search-null {
        padding: 80px 20px;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        font-size: 14px;

        img {
            width: 100px;
            padding-top: 50px;
            margin-bottom: 20px;
        }
        .not-found-shop {
            display: inline-block;
            width: 100%;
            font-size: 0.9em;
            color: #888;
        }
    }
}
</style>