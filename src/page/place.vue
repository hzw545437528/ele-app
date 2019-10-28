<template>
    <div id="place">
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
            </div>
            <div class="place-search">
                <input type="text" placeholder="搜索商家,美食..." />
                <i class="el-icon-search"></i>
            </div>
        </header>

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
        <div class="shop-container">
            <div class="shop-profile" v-for="(item, index) in shopData" :key="index">
                <div class="logo">
                    <img src="../images/2e3e64d19a35bfc67390c2ff7422dpng.webp" alt />
                    <span>{{item.distribution_time}} 分钟</span>
                </div>
                <div class="content">
                    <div class="title">{{item.shop_name}}</div>
                    <div class="level">
                        <el-rate v-model="item.level" disabled text-color="#ff9900"></el-rate>
                    </div>
                    <div class="shop-fee">
                        <span>配送费￥{{item.shop_fee}}</span>
                    </div>
                    <div class="provide">
                        <i v-for="(i, index) in shopProvide(item.provide)" :key="index">{{i}}</i>
                    </div>
                </div>
            </div>
            <div class="shop-profile">
                <div class="logo">
                    <img src="../images/5279b8882dba2610b6b93994f4176jpeg.webp" alt />
                    <span>30 分钟</span>
                </div>
                <div class="content">
                    <div class="title">刘记养生粥铺</div>
                    <div class="level">
                        <el-rate v-model="value5" disabled text-color="#ff9900"></el-rate>
                    </div>
                    <div class="shop-fee">2.5</div>
                    <div class="provide">
                        <i>保</i>
                        <i>赔</i>
                    </div>
                </div>
            </div>
            <div class="shop-profile">
                <div class="logo">
                    <img src="../images/1b69b8cf603743b02d9a84d6f4d42png.webp" alt />
                    <span>30 分钟</span>
                </div>
                <div class="content">
                    <div class="title">三米粥铺(福州江滨店)</div>
                    <div class="level">
                        <el-rate v-model="value5" disabled text-color="#ff9900"></el-rate>
                    </div>
                    <div class="shop-fee">2.5</div>
                    <div class="provide">
                        <i>保</i>
                        <i>赔</i>
                    </div>
                </div>
            </div>
            <div class="shop-profile">
                <div class="logo">
                    <img src="../images/5d481659f8dedccfec8703126fbcepng.webp" alt />
                    <span>30 分钟</span>
                </div>
                <div class="content">
                    <div class="title">曼玲粥店(江滨店)</div>
                    <div class="level">
                        <el-rate v-model="value5" disabled text-color="#ff9900"></el-rate>
                    </div>
                    <div class="shop-fee">
                        <span>配送费￥</span>
                        1.5
                    </div>
                    <div class="provide">
                        <i>保</i>
                    </div>
                </div>
            </div>
            <div class="shop-profile">
                <div class="logo">
                    <img src="../images/5d481659f8dedccfec8703126fbcepng.webp" alt />
                    <span>30 分钟</span>
                </div>
                <div class="content">
                    <div class="title">曼玲粥店(江滨店)</div>
                    <div class="level">
                        <el-rate v-model="value5" disabled text-color="#ff9900"></el-rate>
                    </div>
                    <div class="shop-fee">
                        <span>配送费￥</span>
                        1.5
                    </div>
                    <div class="provide">
                        <i>保</i>
                    </div>
                </div>
            </div>
        </div>
        <!-- 展示更多 -->
        <div class="show-more" @click="showMore">
            <span>点击展示更多</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "place",
    data() {
        return {
            type_2: [], //二级类别
            type_2_focus: null, //二级类别选中 { "地方菜系": true }
            shopData: [],
            value5: 3.4,
            page: 0,
            //按类别搜索商家
            searchType: {},
            searchType_1: "",
            searchType_2: ""
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
            this.searchType_1 = this.searchType_2 = "";
            this.page = 0;
            for (let t in this.type_2_focus) {
                this.type_2_focus[t] = false;
            }
            this.changeAllType_style();
            this.getShops();
        },
        selectType_1(type, e) {
            e = e || window.event;
            this.searchType_2 = "";
            this.searchType_1 = type;
            this.page = 0;
            this.changeType_1_style(e);
            let allType = this.$store.getters.shopType,
                selectType = [];
            for (let t in allType) {
                if (t == type) {
                    selectType = allType[t];
                }
            }
            let type_2_focus = {};
            type_2_focus["全部"] = true;
            for (let t of selectType) {
                type_2_focus[t] = false;
            }
            this.type_2_focus = type_2_focus;
            this.type_2 = Array.from(selectType);
            if (this.type_2.length) {
                this.type_2.unshift("全部");
            }
            this.getShops();
        },
        selectType_2(type) {
            this.searchType_2 = type == "全部" ? "" : type;
            this.page = 0;
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
        getShops() {
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
                    if (!this.page) {
                        this.shopData = res.data;
                    } else {
                        res.data.forEach(item => {
                            this.shopData.push(item);
                        });
                    }
                });
        },
        shopProvide(str) {
            // console.log(str);
            let arr = [];
            if (str) {
                arr = str.split(",");
                // console.log(arr);
            }
            return arr;
        },
        //加载更多
        showMore() {
            this.page++;
            this.getShops();
            // console.log(this.page);
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
        this.getShops();
    }
};
</script>

<style lang="scss">
@import "../style/mixin.scss";

@mixin search_marin_padding {
    margin: 4px 0;
    padding: 0 8px;
    line-height: 24px;
}

* {
    box-sizing: border-box;
}

#place {
    width: 1180px;
    margin: 0 auto;

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
        }

        .place-search {
            margin: 10px 0;
            position: relative;
            height: 32px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            background: #fff;
            input {
                @include search_marin_padding;
                width: 236px;
                outline: none;
                border: none;
                transition: width 0.3s ease-in-out;
            }
            input:focus {
                width: 306px;
            }
            i {
                display: inline-block;
                @include search_marin_padding;
                width: 46px;
                box-sizing: border-box;
                text-align: center;
                font-size: 20px;
                vertical-align: middle;
                color: #999;
            }
            i:hover {
                color: #0089dc;
                cursor: pointer;
            }
        }
    }

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

        .shop-profile {
            display: flex;
            padding: 20px;
            width: 25%;
            border-bottom: 1px #f5f5f5 solid;
            font-size: 12px;
            color: #999999;

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
        }
    }

    // 展示更多
    .show-more {
        padding: 10px 0;
        box-shadow: 0 1px 1px #999999;
        cursor: pointer;
    }
}
</style>