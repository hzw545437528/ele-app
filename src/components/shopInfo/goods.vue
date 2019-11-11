<template>
    <div id="goods">
        <div class="shopmenu-nav">
            <a
                href="javascript:"
                :class="{active:shopmenu_nav_active[item]}"
                v-for="(item, index) in shopmenu_nav"
                :key="index"
                @click="scroll(item)"
            >{{item}}</a>
        </div>
        <div class="shopmenu-nav-fixed" v-if="menuNavFixed">
            <a
                href="javascript:"
                :class="{active:shopmenu_nav_active[item]}"
                v-for="(item, index) in shopmenu_nav"
                :key="index"
                @click="scroll(item)"
            >{{item}}</a>
        </div>
        <div class="goods-container">
            <div class="goods-content">
                <div v-for="(shopmenu, index) in shopmenu_nav" :key="index">
                    <h3 class="menutitle" :ref="shopmenu">
                        {{shopmenu}}
                        <small>{{params.goods.type[index].tip}}</small>
                    </h3>
                    <div class="goods-wrap">
                        <ul
                            :class="{'goods-grid':$store.getters.shoplayout=='grid','goods-list':$store.getters.shoplayout=='list'}"
                        >
                            <li
                                v-for="(item, goodsindex) in goods(shopmenu)"
                                :key="goodsindex"
                                class="goods"
                            >
                                <div class="goods-left">
                                    <img
                                        src="../../images/63d2494016e3ce1feb74241ddbfb7jpeg.jpeg"
                                        alt
                                    />
                                </div>
                                <div class="goods-right">
                                    <div class="goods-title">{{item.title}}</div>
                                    <p
                                        class="goods-introduce"
                                        @mouseenter="showtip"
                                        @mouseleave="hidetip"
                                    >{{item.introduce}}</p>
                                    <span class="goodsintroduce-tip">{{item.introduce}}</span>
                                    <div class="inco-star">
                                        <el-rate
                                            v-model="item.level"
                                            disabled
                                            text-color="#ff9900"
                                            score-template="{value}"
                                        ></el-rate>
                                        <small>(14)</small>
                                        <small>月售10份</small>
                                    </div>
                                    <div class="goods-price">
                                        ￥
                                        <span v-if="item.price">{{item.price}}</span>
                                        <div
                                            style="display: inline-block"
                                            v-else-if="item.specification"
                                        >
                                            <span>{{getLowestPrice(item.specification)[0]}}</span>
                                            <small style="margin-left: 5px;color: #888888;">起</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-div">
                                    <a
                                        href="javascript:"
                                        class="btn"
                                        v-if="item.specification"
                                        @click="showSepc(shopmenu, item.title)"
                                    >选规格</a>
                                    <a
                                        href="javascript:"
                                        class="btn"
                                        v-else
                                        @click="addCarts(item)"
                                    >加入购物车</a>
                                </div>
                                <div
                                    class="shop-specmenu"
                                    v-if="item.specification && $store.getters.showMask"
                                    :ref="shopmenu+item.title"
                                >
                                    <div class="shop-specmenu-specs">
                                        <dl>
                                            <dt>规格</dt>
                                            <dd
                                                @click="selectSpec(index, item.title)"
                                                :class="{current: goodsSpec.select[index]}"
                                                v-for="(spec, index) in item.specification"
                                                :key="index"
                                            >{{spec.title}}</dd>
                                        </dl>
                                    </div>
                                    <div class="shop-specmenu-infogroup">
                                        <p>
                                            已选：
                                            <span>{{item.specification[goodsSpec.index].title}}</span>
                                        </p>
                                        <p class="shop-specmenu-price">
                                            <span class="yen">￥</span>
                                            <span
                                                class="price"
                                            >{{item.specification[goodsSpec.index].price}}</span>
                                        </p>
                                    </div>
                                    <div class="shop-specmenu-infogroup btns">
                                        <button class="btn-primary" @click="addCarts">选好了，加入购物车</button>
                                        <a
                                            href="javascript:"
                                            @click="$store.dispatch('setShowMask', false)"
                                        >不要了</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="shop-cart">
            <div class="shop-cartbasket" id="shop_cartbasket" ref="shop_cartbasket">
                <div>
                    <div class="cartbasket-head">
                        <div class="cartbasket-headrow">
                            购物车
                            <a href="javascript:" @click="clearCart">[清空]</a>
                        </div>
                    </div>
                </div>
                <div class="shop-cartbasket-empty" v-if="shopcart.goods.length ==0">
                    <div class="icon-cart">
                        <i></i>
                    </div>
                    <p>购物车是空的，赶紧选购吧</p>
                </div>
                <div
                    class="shop-cartbasket-tablerow"
                    v-for="(commondity, index) in shopcart.goods"
                    :key="index"
                >
                    <div class="itemname">{{commondity.name}}</div>
                    <div class="itemquantity">
                        <button @click="itemNum('reduce',commondity)">-</button>
                        <input type="text" v-model="commondity.pieces" />
                        <button @click="itemNum('add',commondity)">+</button>
                    </div>
                    <div class="itemtotal">￥{{itemPrice(commondity)}}</div>
                </div>
            </div>
            <div class="shop-cartfooter" @click="showcartbasket">
                <span class="icon-cart">
                    <i></i>
                    <span
                        class="shop-cartpieces"
                        v-if="shopcart.goods.length"
                    >{{shopcart.goods.length}}</span>
                </span>
                <p class="shop-cartfooter-text price" v-if="totalPrice">
                    <span class="yuan">￥</span>
                    {{totalPrice}}
                </p>
                <div class="shop-cartfooter-text">配送费￥{{$store.getters.shop.shop_fee}}</div>
                <button
                    class="shop-cartfooter-checkout"
                    :class="{disabled:settle!='去结算 >'}"
                    :disabled="settle!='去结算 >'"
                    @click.stop="checkBill"
                >{{settle}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuNavFixed: false,
            shopmenu_nav: [],
            shopmenu_nav_active: {},
            params: this.$route.params,
            // goods_type: []
            goodsSpec: {
                select: [true, false],
                index: 0
            },
            selectGoods: "",

            //购物车高度
            cartHeight: 0,

            //购物车
            shopcart: {
                totalPrice: 0,
                totalPieces: 0,
                goods: []
            }
        };
    },
    methods: {
        scroll(type) {
            this.$refs[type][0].scrollIntoView({
                behavior: "smooth"
            });
        },
        handleScroll() {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            if (scrollTop >= 266) {
                this.menuNavFixed = true;
            } else {
                this.menuNavFixed = false;
            }
            let obj = this.getTypePositon();
            // console.log(obj);
            this.shopmenu_nav.forEach((item, index) => {
                let cur = obj[item];
                let nextProperty = this.shopmenu_nav[index + 1]
                        ? this.shopmenu_nav[index + 1]
                        : "last",
                    next = obj[nextProperty];
                if (scrollTop >= cur && scrollTop <= next) {
                    for (let t in this.shopmenu_nav_active) {
                        this.shopmenu_nav_active[t] = false;
                    }
                    this.shopmenu_nav_active[item] = true;
                    // console.log(this.shopmenu_nav_active);
                    return;
                }
            });
        },
        getTypePositon() {
            let obj = {};
            let target, offset;
            for (let t of this.shopmenu_nav) {
                target = this.$refs[t][0] || "";
                if (target) {
                    offset = target.offsetTop;
                    while ((target = target.offsetParent)) {
                        offset = offset + target.offsetTop - 1;
                    }
                    if (t == this.shopmenu_nav[this.shopmenu_nav.length - 1]) {
                        // console.log(this.$refs[t].parentNode.clientHeight);
                        obj.last =
                            offset +
                            this.$refs[t][0].parentNode.clientHeight -
                            10;
                    }
                    obj[t] = offset;
                }
            }

            return obj;
        },
        showtip(e) {
            e.target.parentNode.querySelector(
                ".goodsintroduce-tip"
            ).style.opacity = 1;
            e.target.parentNode.querySelector(
                ".goodsintroduce-tip"
            ).style.display = "inline-block";
        },
        hidetip(e) {
            e.target.parentNode.querySelector(
                ".goodsintroduce-tip"
            ).style.opacity = 0;
            e.target.parentNode.querySelector(
                ".goodsintroduce-tip"
            ).style.display = "none";
        },
        goods(type) {
            // console.log(type);
            let arr = [];
            this.params.goods.goods.forEach((item, index) => {
                if (item.type.includes(type)) {
                    arr.push(item);
                }
            });
            // console.log(arr);
            return arr;
        },
        getLowestPrice(specification) {
            // console.log(specification);
            let arr = specification.map(item => {
                return item.price;
            });
            arr.sort();
            return arr;
        },
        //处理商家信息
        handleShopInfo() {
            this.shopmenu_nav = [];
            if (this.params.goods) {
                for (let t of this.params.goods.type) {
                    this.shopmenu_nav.push(t.title);
                }
                for (let i of this.shopmenu_nav) {
                    this.$set(this.shopmenu_nav_active, i, false);
                }
            }
        },
        //根据商品名获取到商品
        getGoodsByName(name) {
            let arr = this.params.goods.goods.filter(item => {
                return item.title == name;
            });
            this.selectGoods = arr[0];
        },
        //打开规格选项
        showSepc(shopmenu, title) {
            this.$store.dispatch("setShowMask", true);
            this.goodsSpec.select = [];
            this.goodsSpec.index = 0;

            let str = shopmenu + title;
            this.getGoodsByName(title);
            let spec = this.selectGoods;
            spec.specification.forEach((item, index) => {
                index == 0
                    ? this.goodsSpec.select.push(true)
                    : this.goodsSpec.select.push(false);
            });
            this.$nextTick(() => {
                this.$refs[str][0].style.display = "block";
            });
        },
        //选择规格
        selectSpec(index, title) {
            this.goodsSpec.index = index;
            let arr = this.goodsSpec.select.map((item, i) => {
                if (index == i) {
                    return true;
                }
                return false;
            });
            this.goodsSpec.select = arr;
        },
        //添加购物车
        addCarts(item) {
            let obj = {};
            if (item.title) {
                obj = {
                    name: item.title,
                    price: item.price,
                    pieces: 1
                };
            } else {
                obj = {
                    name: this.selectGoods.title,
                    price: this.selectGoods.specification[this.goodsSpec.index]
                        .price,
                    pieces: 1
                };
                this.$store.dispatch("setShowMask", false);
            }
            let exist = this.shopcart.goods.some((item, index) => {
                if (item.name == obj.name && item.price == obj.price) {
                    console.log(item);
                    this.shopcart.goods[index].pieces++;
                    return true;
                }
                return false;
            });
            !exist ? this.shopcart.goods.push(obj) : 0;
            // console.log(this.shopcart.goods);
            this.$nextTick(() => {
                let cart = this.$refs["shop_cartbasket"],
                    height = window.getComputedStyle(cart).height;
                this.cartHeight = height;
            });
            localStorage.setItem("shopCart", JSON.stringify(this.shopcart));
            // console.log(this.shopcart.goods);
            // console.log(goodsInfo);
        },
        //展示购物车
        showcartbasket() {
            let cart = this.$refs["shop_cartbasket"],
                elecss = window.getComputedStyle(cart),
                top = elecss.top,
                height = elecss.height;
            if (parseFloat(top) != 0) {
                this.$refs["shop_cartbasket"].style.top = 0;
            } else {
                this.$refs["shop_cartbasket"].style.top =
                    -parseFloat(height) + "px";
            }
        },
        //购物车高度
        cmpheight() {
            let cart = this.$refs["shop_cartbasket"],
                height = window.getComputedStyle(cart).height;
            // console.log(cart);
            // console.log(height);
            return height;
        },
        //单个商品总价
        itemPrice(commondity) {
            return parseFloat(
                (commondity.pieces * commondity.price).toFixed(2)
            );
        },
        //修改商品数量
        itemNum(operate, commondity) {
            let i = 0,
                exist = this.shopcart.goods.some((item, index) => {
                    if (commondity == item) {
                        i = index;
                        return true;
                    }
                    return false;
                });
            if (exist) {
                if (operate == "add") {
                    this.shopcart.goods[i].pieces++;
                } else if (operate == "reduce") {
                    if (this.shopcart.goods[i].pieces > 1) {
                        this.shopcart.goods[i].pieces--;
                    } else {
                        this.shopcart.goods.splice(i, 1);
                        this.$nextTick(() => {
                            let height = this.cmpheight();
                            this.cartHeight = height;
                        });
                    }
                }
            }
            if (this.shopcart.goods.length == 0) {
                localStorage.removeItem("shopCart");
            } else {
                localStorage["shopCart"] = JSON.stringify(this.shopcart);
                console.log(localStorage["shopCart"]);
            }
        },
        //清空购物车
        clearCart() {
            this.shopcart.goods = [];
            this.$nextTick(() => {
                let cart = this.$refs["shop_cartbasket"],
                    height = window.getComputedStyle(cart).height;
                this.cartHeight = height;
            });
            localStorage.removeItem("shopCart");
        },
        checkBill() {
            console.log(1);
        }
    },
    computed: {
        totalPrice() {
            let price = 0;
            this.shopcart.goods.forEach((item, index) => {
                price += item.pieces * item.price;
            });
            if (price) {
                price = parseFloat(price.toFixed(2));
            }
            return price;
        },
        settle() {
            let str = "",
                start_send = this.$store.getters.shopInfo.start_send;
            if (this.totalPrice) {
                let subNum = this.totalPrice - start_send;
                if (subNum < 0) {
                    str = `还差 ${Math.abs(subNum.toFixed(2))} 元起送`;
                } else {
                    return "去结算 >";
                }
            } else {
                str = "购物车是空的";
            }
            return str;
        }
    },
    watch: {
        params() {
            // let arr = [];
            // this.params.goods.forEach((item, index) => {
            //     if (item.type) {
            //         for (let i of item.type) {
            //             arr.includes(i) ? 0 : arr.push(i);
            //         }
            //     }
            // });
            // for (let i of arr) {
            //     this.$set(this.shopmenu_nav_active, i, false);
            // }
            // this.shopmenu_nav = arr;
            this.handleShopInfo();
        },
        cartHeight() {
            let cart = this.$refs["shop_cartbasket"];
            if (this.shopcart.goods.length != 0) {
                cart.style.top = "-" + this.cartHeight;
            } else {
                cart.style.top = -45 + "px";
            }
        }
    },
    directives: {
        eleHeight: {
            inserted(el) {
                let height = window.getComputedStyle(el).height;
                el.style.top = "-" + height;
            }
        }
    },
    created() {
        this.handleShopInfo();
        if (localStorage["shopCart"]) {
            this.shopcart = JSON.parse(localStorage["shopCart"]);
        }
        let scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
        if (scrollTop > 266) {
            this.menuNavFixed = true;
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        // console.log(this.$refs);
    }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
#goods {
    position: relative;
    .shopmenu-nav {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 15px 5px;
        background: #ffffff;
        border: 1px solid #eee;
        a {
            width: calc(20% - 10px);
            padding: 3px 10px;
            margin: 5px;
            box-sizing: border-box;
            text-align: left;
            border-radius: 2px;
        }

        a.active {
            color: #ffffff;
            background: #0089dc;
        }
    }
    .shopmenu-nav-fixed::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    .shopmenu-nav-fixed::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.26);
    }
    .shopmenu-nav-fixed {
        display: flex;
        flex-direction: column;
        position: fixed;
        max-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        left: 50px;
        top: 0;
        width: 130px;
        padding-right: 10px;
        border-right: 1px solid #ddd;

        a {
            padding: 15px 15px 15px 0;
            text-align: right;
            position: relative;
        }

        a::after {
            content: "";
            position: absolute;
            top: 50%;
            right: -4px;
            margin-top: -4px;
            display: inline-block;
            box-sizing: border-box;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 2px solid #f7f7f7;
            background-color: #dddddd;
        }

        .active {
            color: #0089dc;
        }
        .active::after {
            content: url("../../images/icons/ele-icon.svg");
            border: none;
            background-color: transparent;
            right: 5px;
            top: 10px;
        }
    }
    .goods-container .goods-content {
        color: #333333;
        small {
            font-size: 12px;
            color: #999999;
            margin: 0 2px;
        }
        .menutitle {
            padding: 20px 15px 10px;
            text-align: left;
            font-size: 20px;
        }

        .goods-grid {
            display: flex;
            flex-wrap: wrap;
            img {
                width: 100px;
                height: 100px;
            }

            .goods {
                display: flex;
                position: relative;
                margin: 0 12px 12px 0;
                width: calc(50% - 12px);
                background: #ffffff;

                .goods-left {
                    height: 100px;
                }

                .goods-right {
                    height: 100px;
                    padding: 10px 10px 0 12px;
                    box-sizing: border-box;
                    text-align: left;

                    .goods-title {
                        @include ui-ellipsis;
                        width: 304px;
                        font-weight: 700;
                    }
                    .goods-introduce {
                        @include ui-ellipsis;
                        width: 304px;
                        color: #999999;
                        font-size: 12px;
                        margin: 3px 0;
                    }

                    .goodsintroduce-tip {
                        bottom: 72px;
                        max-width: 300px;
                    }

                    .inco-star {
                        display: flex;
                        align-items: center;

                        .el-rate {
                            display: flex;
                            align-items: center;
                            i {
                                font-size: 14px;
                            }
                        }
                    }
                    .goods-price {
                        position: absolute;
                        bottom: 5px;
                        color: #f74342;
                        font-weight: 700;
                        margin: 3px 0;
                    }
                }

                .btn {
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                    width: 90px;
                    height: 26px;
                    border-radius: 20px;
                    text-align: center;
                    line-height: 26px;
                    font-size: 12px;
                    background: #0089dc;
                    color: #ffffff;
                    cursor: pointer;
                }
            }
        }

        .goods-list {
            .goods {
                display: flex;
                align-items: center;
                position: relative;
                padding: 15px 0;
                margin: 0 0 12px;
                justify-content: space-between;
                background: #ffffff;
                img {
                    width: 64px;
                    height: 64px;
                }
                .goods-left {
                    flex: 1;
                }

                .goods-right {
                    flex: 6;
                    text-align: left;
                    position: relative;
                    z-index: 0;
                    padding-right: 110px;
                    box-sizing: border-box;

                    .goods-title {
                        @include ui-ellipsis;
                        width: 539px;
                        font-weight: 700;
                    }

                    .goods-introduce {
                        @include ui-ellipsis;
                        width: 539px;
                        color: #999999;
                        font-size: 12px;
                        margin: 1px 0;
                    }
                    .goodsintroduce-tip {
                        bottom: 40px;
                        max-width: 500px;
                    }

                    .goods-price {
                        position: absolute;
                        right: 0;
                        top: calc(50% - 9.6px);
                        width: 110px;
                        text-align: center;
                        font-weight: 700;
                    }
                    .inco-star {
                        display: flex;
                        align-items: center;

                        .el-rate {
                            display: flex;
                            align-items: center;
                            i {
                                font-size: 14px;
                            }
                        }
                    }
                }
                .btn-div {
                    flex: 1.5;

                    .btn {
                        display: inline-block;
                        width: 90px;
                        height: 26px;
                        border-radius: 20px;
                        text-align: center;
                        line-height: 26px;
                        font-size: 12px;
                        background: #0089dc;
                        color: #ffffff;
                        cursor: pointer;
                    }
                }
            }
        }

        .goods-grid,
        .goods-list {
            .goodsintroduce-tip {
                display: none;
                position: absolute;
                padding: 5px 10px;
                z-index: 999;
                border-radius: 3px;
                box-sizing: border-box;
                opacity: 0;
                color: #ffffff;
                background: rgba(114, 111, 119, 0.8);
                transition: opacity 0.3s ease-in-out;
                &::before {
                    @include triangle;
                    border-color: rgba(114, 111, 119, 0.8) transparent
                        transparent;
                    right: calc(50% - 5px);
                    bottom: -10px;
                }
            }
        }

        .shop-specmenu {
            display: none;
            position: absolute;
            z-index: 1001;
            width: 300px;
            background: #ffffff;
            right: -305px;
            top: -10px;
            text-align: left;
            border: 1px;
            box-shadow: 0 1px 15px #ccc;
            .shop-specmenu-specs {
                margin: 10px;
                padding: 12px 10px 0;
                border: 1px solid #eee;
                background-color: #fcfcfc;

                dl {
                    padding-bottom: 14px;
                }
                dt {
                    font-size: 14px;
                    padding-bottom: 10px;
                    color: #666;
                }
                dd {
                    display: inline-block;
                    padding: 0 14px;
                    min-width: 28px;
                    height: 26px;
                    line-height: 26px;
                    font-size: 14px;
                    border: 1px solid #bbb;
                    color: #999;
                    border-radius: 13px;
                    margin-right: 18px;
                    margin-bottom: 6px;
                    cursor: pointer;
                    &.current {
                        border-color: #0089dc;
                        color: #0089dc;
                    }
                }
            }

            .shop-specmenu-infogroup {
                padding: 0 10px;
                font-size: 14px;
                color: #666;
                line-height: 1.5;

                .shop-specmenu-price {
                    font-size: 16px;
                    font-weight: 700;
                    color: #ff6000;

                    .yen {
                        font-size: 12px;
                    }
                }
            }
            .btns {
                padding: 14px 10px;
                .btn-primary {
                    display: inline-block;
                    padding: 8px 17px;
                    line-height: 1;
                    border: none;
                    border-radius: 2px;
                    outline: 0;
                    cursor: pointer;
                    font-size: 14px;
                    text-align: center;
                    background-color: #0089dc;
                    color: #fff;
                }
                a {
                    margin-left: 12px;
                    color: #999;
                }
            }
        }
        .shop-specmenu::before {
            @include triangle;
            border: 6px solid #ffffff;
            border-color: transparent #ffffff transparent transparent;
            left: -12px;
            top: 20px;
        }
    }
    .shop-cart {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 320px;
        height: 46px;
        font-size: 14px;
        z-index: 102;
        .shop-cartbasket {
            position: absolute;
            top: -45px;
            width: 100%;
            background-color: #ffffff;
            box-shadow: 0 1px 15px #ccc;
            transition: top 0.3s ease-in-out;

            .cartbasket-head {
                box-sizing: border-box;
                padding: 12px 10px;
                height: 45px;
                font-size: 14px;
                border-bottom: 1px solid #eeeeee;
                background: #fafafa;
                border-top: 2px solid #0089dc;
                .cartbasket-headrow {
                    text-align: left;
                    color: #333333;
                    a {
                        color: #0089dc;
                    }
                }
            }
            .shop-cartbasket-empty {
                color: #999;
                text-align: center;
                .icon-cart {
                    margin: 40px 0 20px;
                    i {
                        display: inline-block;
                        width: 42px;
                        height: 42px;
                        background: url("../../images/icons/emptycart-icon.svg");
                        background-size: cover;
                    }
                }
                p {
                    font-size: 14px;
                    margin-bottom: 40px;
                }
            }
            .shop-cartbasket-tablerow {
                display: flex;
                padding: 10px 10px;
                .itemname {
                    width: 50%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 5px;
                    box-sizing: border-box;
                    text-align: left;
                    color: #333333;
                }
                .itemquantity {
                    width: 25%;
                    text-align: center;
                    button {
                        background: #ffffff;
                        height: 20px;
                        width: 20px;
                        line-height: 18px;
                        border: 1px solid #dddddd;
                        outline: none;
                        cursor: pointer;
                        color: #666666;
                    }
                    input {
                        width: 30px;
                        height: 20px;
                        border: none;
                        box-sizing: border-box;
                        border-top: 1px solid #dddddd;
                        border-bottom: 1px solid #dddddd;
                        text-align: center;
                        font-size: 12px;
                        outline: none;
                        color: #666666;
                    }
                }
                .itemtotal {
                    flex: auto;
                    text-align: right;
                    color: #f17530;
                }
            }
        }

        .shop-cartfooter {
            display: flex;
            align-items: center;
            height: 46px;
            line-height: 46px;
            background: #2c2c2c;
            box-shadow: 0 1px 3px #2c2c2c;
            cursor: pointer;
            position: relative;

            .icon-cart {
                display: flex;
                position: relative;
                width: 40px;
                justify-content: center;
                align-items: center;
                i {
                    display: inline-block;
                    background-image: url("../../images/icons/shop-cart.svg");
                    background-size: cover;
                    width: 20px;
                    height: 20px;
                }
                .shop-cartpieces {
                    position: absolute;
                    height: 16px;
                    line-height: 16px;
                    min-width: 16px;
                    border-radius: 50%;
                    right: 0;
                    top: -6px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    background-color: #ff2828;
                    color: #ffffff;
                }
            }
            .shop-cartfooter-text {
                font-size: 12px;
                margin-left: 2px;
                padding-left: 6px;
                color: #999;
                border-left: 1px solid #555;
                line-height: 1;
                &.price {
                    height: 100%;
                    line-height: 46px;
                    padding: 0;
                    margin: 0;
                    border-left: none;
                    font-size: 24px;
                    color: #ffffff;
                    .yuan {
                        margin-right: -7px;
                        font-size: 8px;
                    }
                }
            }
            .shop-cartfooter-checkout {
                position: absolute;
                border: none;
                outline: none;
                padding: 0;
                right: 0;
                top: 0;
                bottom: 0;
                width: 120px;
                text-align: center;

                font-size: 14px;
                background-color: #51d862;
                font-weight: 700;
                color: #fff;
                cursor: pointer;
                &.disabled {
                    background-color: #e4e4e4;
                    color: #333;
                    cursor: default;
                }
            }
        }
    }
}
</style>