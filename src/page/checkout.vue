<template>
    <div id="checkout">
        <header>
            <div class="content">
                <div class="bread">
                    当前位置：
                    <ul>
                        <li>
                            新大陆科技园
                            <span>></span>
                        </li>
                        <li @click="$router.go(-1)">
                            叫了个炸鸡(凯隆店)
                            <span>></span>
                        </li>
                        <li>订单信息</li>
                    </ul>
                </div>
                <div class="dropdown">
                    <div @mouseenter="enter('user-nav')" @mouseleave="leave('user-nav')">
                        <span>{{$store.getters.user}}</span>
                        <i class="el-icon-arrow-down header-drop-down"></i>
                    </div>
                    <div
                        @mouseenter="enter('user-nav')"
                        @mouseleave="leave('user-nav')"
                        class="card user-nav"
                        ref="user-nav"
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
                        <a @click="logout" class="logout" style="cursor: pointer">
                            <i class="el-icon-switch-button"></i>
                            退出登录
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <div class="checkoutguide">
            <div class="content">
                <div class="left">
                    <img src="../images/checkoutlogo.png" alt />
                    <span>订单信息</span>
                </div>
                <div class="right">
                    <span class="checkoutguide-item active">选择商品</span>
                    <span class="checkoutguide-item active">确认订单信息</span>
                    <span class="checkoutguide-item">成功提交订单</span>
                    <p class="checkoutguide-line">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                        <span class="line line4"></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="checkout-cart" v-if="cartInfo.goods.length != 0">
                <div class="checkoutcart-container">
                    <div class="checkoutcart-title">
                        <h2>订单详情</h2>
                        <a @click="$router.go(-1)">
                            <span>&lt;</span> 返回商家修改
                        </a>
                    </div>
                    <div class="checkoutcart-tablerow tablerowhead">
                        <div class="cell itemname">商品</div>
                        <div class="cell itemquantity">份数</div>
                        <div class="cell itemtotal">小计（元）</div>
                    </div>
                    <dl class="checkoutcart-group">
                        <dt class="checkoutcart-grouptitle">1号购物车</dt>
                        <dd v-for="(item, index) in cartInfo.goods" :key="index">
                            <div class="checkoutcart-tablerow">
                                <div class="cell itemname">{{item.name}}</div>
                                <div class="cell itemquantity">
                                    <button @click="itemNum('reduce',item)">-</button>
                                    <input type="text" v-model="item.pieces" />
                                    <button @click="itemNum('add',item)">+</button>
                                </div>
                                <div class="cell itemtotal">¥{{itemPrice(item)}}</div>
                            </div>
                        </dd>
                    </dl>
                    <ul>
                        <li class="checkoutcart-tablerow extra">
                            <div class="cell itemname">
                                <span>配送费</span>
                                <span class="icon-circle-help"></span>
                            </div>
                            <div class="cell itemquantity"></div>
                            <div class="cell itemtotal">￥{{delivery_fee}}</div>
                        </li>
                        <li class="checkoutcart-tablerow extra">
                            <div class="cell itemname">
                                <span>餐盒</span>
                            </div>
                            <div class="cell itemquantity"></div>
                            <div class="cell itemtotal">￥{{packaging_fee}}</div>
                        </li>
                    </ul>
                    <div class="checkoutcart-total color-stress">
                        ￥
                        <span class="num">{{totalPrice}}</span>
                    </div>
                    <div class="checkoutcart-totalextra">
                        共
                        <span>1</span>
                        份商品
                    </div>
                </div>
            </div>
            <div class="checkout-content" v-if="cartInfo.goods.length != 0">
                <div class="checkout-select">
                    <h2>
                        收获地址
                        <a href="javascript:" class="checkout-addaddress">添加新地址</a>
                    </h2>
                    <ul class="checkout-address-list">
                        <li
                            class="checkout-address"
                            :class="{'active':0 == addressIndex}"
                            @mouseenter="showEditBtn($event)"
                            @mouseleave="hideEditBtn($event)"
                            @click="selectAddress(0,addressInfo[0])"
                            v-if="showMore"
                        >
                            <i class="checkout-address-icon icon-location-line"></i>
                            <div class="checkout-address-info">
                                <p>{{addressInfo[0].name}} {{addressInfo[0].gender}} {{addressInfo[0].phone}}</p>
                                <p>{{addressInfo[0].detail}}</p>
                            </div>
                            <div class="checkout-address-edit">
                                <a href="javascript:">修改</a>
                                <a href="javascript:">×</a>
                            </div>
                            <!-- <p class="checkout-address needupgrade">地址超出配送范围</p> -->
                            <i class="icon-tick"></i>
                        </li>
                        <li
                            class="checkout-address active"
                            @mouseenter="showEditBtn($event)"
                            @mouseleave="hideEditBtn($event)"
                            v-if="showMore && address && address != addressInfo[0]"
                        >
                            <i class="checkout-address-icon icon-location-line"></i>
                            <div class="checkout-address-info">
                                <p>{{address.name}} {{address.gender}} {{address.phone}}</p>
                                <p>{{address.detail}}</p>
                            </div>
                            <div class="checkout-address-edit">
                                <a href="javascript:">修改</a>
                                <a href="javascript:">×</a>
                            </div>
                            <!-- <p class="checkout-address needupgrade">地址超出配送范围</p> -->
                            <i class="icon-tick"></i>
                        </li>
                        <template v-if="!showMore">
                            <li
                                class="checkout-address"
                                :class="{'active':index == addressIndex}"
                                @mouseenter="showEditBtn($event)"
                                @mouseleave="hideEditBtn($event)"
                                @click="selectAddress(index, item)"
                                v-for="(item, index) in addressInfo"
                                :key="index"
                            >
                                <i class="checkout-address-icon icon-location-line"></i>
                                <div class="checkout-address-info">
                                    <p>{{addressInfo[index].name}} {{addressInfo[index].gender}} {{addressInfo[index].phone}}</p>
                                    <p>{{addressInfo[index].detail}}</p>
                                </div>
                                <div class="checkout-address-edit">
                                    <a href="javascript:">修改</a>
                                    <a href="javascript:">×</a>
                                </div>
                                <!-- <p class="checkout-address needupgrade">地址超出配送范围</p> -->
                                <i class="icon-tick"></i>
                            </li>
                        </template>
                        <a
                            href="javascript:"
                            class="checkout-showmoreaddress"
                            @click="showMore = false"
                            v-if="showMore"
                        >
                            显示更多地址
                            <i class="el-icon-arrow-down"></i>
                        </a>
                        <a
                            href="javascript:"
                            class="checkout-showmoreaddress"
                            @click="showMore = true"
                            v-else
                        >
                            收起
                            <i class="el-icon-arrow-up"></i>
                        </a>
                    </ul>
                </div>
                <div class="checkout-select">
                    <h2 class="checkout-title">
                        付款方式
                        <span class="color-tip checkout-pay-tip">推荐使用在线支付，不用找零，优惠更多</span>
                    </h2>
                    <ul>
                        <li class="checkout-pay active">
                            <p ng-bind="pay.title" class="ng-binding">在线支付</p>
                            <p class="color-mute ng-binding" ng-bind="pay.tip">支持微信、支付宝、QQ钱包及大部分银行卡</p>
                            <i class="icon-tick"></i>
                        </li>
                    </ul>
                </div>
                <div class="checkout-select">
                    <h2 class="checkout-title">选择优惠</h2>
                    <p class="checkout-info">
                        <span class="checkout-infolabel">使用优惠券</span>
                        <span class="color-mute">
                            网站不支持
                            <em class="color-stress">（仅手机客户端可用）</em>
                        </span>
                    </p>
                </div>
                <div class="checkout-select">
                    <h2 class="checkout-title">其他信息</h2>
                    <div class="checkout-info">
                        <span class="checkout-infolabel">配送方式</span>
                        <span>
                            本订单由
                            <a class="ng-binding">[叫了个炸鸡(凯隆店)]</a>
                            提供配送
                        </span>
                    </div>
                    <div class="checkout-info">
                        <span class="checkout-infolabel">送达时间</span>
                        <div class="formselect">
                            <span
                                class="formselect-value"
                                @mouseenter="enter('deliveryTimeForm')"
                            >{{dTime}}</span>
                            <div
                                class="formselect-data ui-scrollbar-light"
                                ref="deliveryTimeForm"
                                @mouseenter="enter('deliveryTimeForm')"
                                @mouseleave="leave('deliveryTimeForm')"
                            >
                                <span
                                    v-for="(item, index) in deliveryTimes"
                                    :key="index"
                                    :class="{active:dTimeIndex == index}"
                                    @click="selectDeliveryTime(item,index,$event)"
                                >
                                    {{item}}
                                    <i
                                        class="el-icon-check"
                                        style="color: #0089dc;"
                                        v-if="dTimeIndex == index"
                                    ></i>
                                </span>
                            </div>
                            <i class="el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <div class="checkout-info">
                        <span class="checkout-infolabel">发票信息</span>
                        <span class="checkout-invoice">
                            <input
                                class="checkout-input"
                                placeholder="仅在饿了么 APP 中支持开发票哦"
                                disabled="disabled"
                            />
                        </span>
                    </div>
                    <div class="checkout-info">
                        <span class="checkout-infolabel">订单备注</span>
                        <span>
                            <input class="checkout-input" v-model="orderNote" />
                        </span>
                    </div>
                    <div class="checkout-info">
                        <span class="checkout-infolabel">餐具份数</span>
                        <div class="tableware"></div>
                        <div class="formselect">
                            <span
                                class="formselect-value"
                                @mouseenter="enter('tableware')"
                            >{{selectTWPieces}}</span>
                            <div
                                class="formselect-data ui-scrollbar-light"
                                ref="tableware"
                                @mouseenter="enter('tableware')"
                                @mouseleave="leave('tableware')"
                            >
                                <span
                                    :class="{active: index == tablewareIndex}"
                                    v-for="(item, index) in tablewarePieces"
                                    :key="index"
                                    @click="selectTableware(item, index)"
                                >
                                    {{item}}
                                    <i
                                        class="el-icon-check"
                                        style="color: #0089dc;"
                                        v-if="index == tablewareIndex"
                                    ></i>
                                </span>
                            </div>
                            <i class="el-icon-arrow-down"></i>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        class="btn-stress btn-lg"
                        ref="confirmBtn"
                        id="confirmBtn"
                        @click="confirm"
                    >确认下单</button>
                    <div class="checkout-dapp">
                        <p class="checkout-dapp-tip">
                            扫码下载APP
                            <br />APP下单立享优惠
                        </p>
                        <i class="checkout-dapp-qrcode"></i>
                        <i class="el-icon-caret-bottom"></i>
                        <img src="../images/QR_code.png" alt="扫一扫下载饿了么手机 App" />
                    </div>
                </div>
            </div>
            <div class="nodata" v-else>
                <p class="nodata-container">
                    你的购物车是空的，去
                    <router-link to="/place">下单</router-link>&nbsp;吧
                </p>
            </div>
        </div>
        <footer class="footer">底部</footer>
        <Dialog :open.sync="showDialog" :info="msgBoxInfo" @update:open="val => {showDialog = val}"></Dialog>
    </div>
</template>

<script>
import Dropdown from "../components/header/Dropdown";
import Dialog from "../components/common/Dialog";
export default {
    data() {
        return {
            //配送费
            delivery_fee: this.$store.getters.shop.shop_fee,
            packaging_fee: 2.0,
            shopName: this.$store.getters.shopInfo.shop_name,
            addressIndex: null,
            address: null,
            cartInfo: {
                goods: []
            },
            addressInfo: [
                {
                    name: "黄",
                    gender: "先生",
                    location: "新大陆科技园",
                    detail: "新大陆科技园(西门)",
                    phone: "13205010696"
                },
                {
                    name: "黄",
                    gender: "先生",
                    location: "新大陆科技园",
                    detail: "新大陆科技园(西门)",
                    phone: "13205010696"
                },
                {
                    name: "黄",
                    gender: "先生",
                    location: "新大陆科技园",
                    detail: "新大陆科技园(西门)",
                    phone: "13205010696"
                }
            ],
            showMore: true,
            //配送时间
            deliveryTimes: ["立即送达"],
            dTimeIndex: 0,
            dTime: "立即送达",

            //餐具
            tablewarePieces: ["未选择", "无需餐具"],
            tablewareIndex: 0,
            selectTWPieces: "未选择",

            //订单备注
            orderNote: "",

            //validate
            showDialog: false,
            msgBoxInfo: {
                type: "",
                title: "下单出错",
                msg: ""
            }
        };
    },
    methods: {
        hadleScroll() {},
        enter(ref) {
            // this.$refs[ref].classList.add("show");
            this.$refs[ref].style.display = "flex";
        },
        leave(ref) {
            // this.$refs[ref].classList.remove("show");
            this.$refs[ref].style.display = "none";
        },
        logout() {
            localStorage.removeItem("login_user");
            this.$store.dispatch("setUser", "登录/注册");
            this.$router.push("/login");
        },
        showEditBtn(e) {
            let target = e.currentTarget;
            let editNode = target.querySelector(".checkout-address-edit");
            editNode.style.display = "block";
        },
        hideEditBtn(e) {
            let target = e.currentTarget;
            let editNode = target.querySelector(".checkout-address-edit");
            editNode.style.display = "none";
        },
        selectAddress(index, item) {
            this.address = null;
            this.address = item;
            this.addressIndex = index;
        },
        //配送时间
        handleDeliveryTimes() {
            let date = new Date(),
                hh = date.getHours(),
                mm = date.getMinutes();

            if (mm >= 45) {
                hh += 1;
                mm = 0;
            } else if (mm >= 30 && mm < 45) {
                mm = 45;
            } else if (mm >= 15 && mm < 30) {
                mm = 30;
            } else {
                mm = 15;
            }
            let time, MM;
            for (; hh < 24; mm += 15) {
                if (mm >= 60) {
                    hh += 1;
                    mm = 0;
                }
                if (hh != 24) {
                    MM = mm == 0 ? "00" : mm;
                    time = hh + ":" + MM;
                    this.deliveryTimes.push(time);
                }
            }

            // console.log(this.deliveryTimes);
        },
        selectDeliveryTime(item, index, e) {
            this.dTimeIndex = index;
            this.dTime = item;
            this.leave("deliveryTimeForm");
            let target = e.currentTarget,
                parent = target.parentElement;
            target.scrollIntoView();
            console.log(parent);
        },
        //餐具份数
        handleTabelwarePeices() {
            for (let i = 1; i <= 10; i++) {
                this.tablewarePieces.push(i + "份");
            }
            this.tablewarePieces.push("10份以上");
            // console.log(this.tablewarePieces);
        },
        selectTableware(item, index) {
            this.selectTWPieces = item;
            this.tablewareIndex = index;
            this.leave("tableware");
        },
        //处理购物车商品
        handleShopCart() {
            if (localStorage[this.shopName]) {
                let shopCart = JSON.parse(localStorage[this.shopName]);

                this.cartInfo = shopCart.cartInfo;
            }
            // console.log(this.cartInfo);
        },
        //计算单个商品价格
        itemPrice(commondity) {
            return (commondity.pieces * commondity.price).toFixed(2);
        },
        //修改商品数量
        itemNum(operate, commondity) {
            let i = 0,
                exist = this.cartInfo.goods.some((item, index) => {
                    if (commondity == item) {
                        i = index;
                        return true;
                    }
                    return false;
                });
            if (exist) {
                if (operate == "add") {
                    this.cartInfo.goods[i].pieces++;
                } else if (operate == "reduce") {
                    if (this.cartInfo.goods[i].pieces > 1) {
                        this.cartInfo.goods[i].pieces--;
                    } else {
                        this.cartInfo.goods.splice(i, 1);
                    }
                }
            }
            if (this.cartInfo.goods.length == 0) {
                localStorage.removeItem(this.shopName);
            } else {
                let shopCart = {
                    shopName: this.$store.getters.shopInfo.shop_name,
                    cartInfo: this.cartInfo
                };
                localStorage.setItem(this.shopName, JSON.stringify(shopCart));
                // console.log(localStorage["shopCart"]);
            }
        },
        //确认下单
        confirm() {
            let start_send = this.$store.getters.shopInfo.start_send;
            if (!this.address) {
                this.msgBoxInfo.type = "warn";
                this.msgBoxInfo.msg = "请添加您的收获地址";
                this.showDialog = true;
            } else if (parseFloat(this.totalPrice) < start_send) {
                console.log(1);
                this.msgBoxInfo.type = "error";
                this.msgBoxInfo.msg = "起送价增加";
                this.showDialog = true;
            }
        }
    },
    computed: {
        totalPrice() {
            let price = 0;
            this.cartInfo.goods.forEach((item, index) => {
                price += item.pieces * item.price;
            });
            price += this.packaging_fee + this.delivery_fee;
            if (price) {
                price = price.toFixed(2);
            }

            return price;
        }
    },
    created() {
        // console.log(document.documentElement.scrollTop);
        this.handleShopCart();
        this.handleDeliveryTimes();
        this.handleTabelwarePeices();
    },
    mounted() {
        window.addEventListener("scroll", this.hadleScroll);
    },
    components: {
        Dropdown,
        Dialog
    }
};
</script>

<style lang="scss">
@import "../style/mixin.scss";
#checkout {
    a {
        cursor: pointer;
        color: #0089dc;
    }
    .content,
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        width: 1180px;
    }
    header {
        display: block;
        background-color: #0089dc;
        border-bottom: 1px solid #027ecb;
        color: #fff;
        font-size: 12px;
        .content {
            line-height: 30px;
            ul {
                display: flex;
            }
            .bread {
                display: flex;
                li {
                    margin-right: 3px;
                    cursor: pointer;
                    &:last-child {
                        cursor: default;
                    }
                }
                span {
                    margin: 0 3px;
                    cursor: default;
                }
            }
            .dropdown {
                position: relative;
                span {
                    cursor: default;
                }
                .header-drop-down {
                    position: relative;
                    color: #d5efff;
                    margin-left: 8px;
                    margin-right: 3px;
                    cursor: pointer;
                    background: #449be5;
                    border-radius: 3px;
                    text-align: center;
                    font-size: 20px;
                    vertical-align: middle;
                }
                .card {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    z-index: 999;
                    background: $f;
                    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
                }
                .user-nav {
                    top: 30px;
                    right: -2px;
                    width: 100px;
                    box-sizing: border-box;
                    flex-direction: column;
                    justify-content: space-around;

                    a {
                        i {
                            font-size: 14px;
                        }
                        text-indent: -5px;
                        line-height: 32px;
                        font-size: 12px;
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
            }
        }
    }
    .checkoutguide {
        background-color: #0089dc;
        height: 96px;
        .content {
            img {
                height: 96px;
            }
            .left {
                display: flex;
                align-items: center;
                span {
                    margin-left: 14px;

                    font-size: 26px;
                    color: #ffffff;
                    &::before {
                        content: "";
                        border-left: 1px solid #9cc9ee;
                        height: 25px;
                        display: inline-block;
                        margin-right: 14px;
                    }
                }
            }
        }
        .right {
            position: relative;
            margin-top: 10px;
            .checkoutguide-item,
            .checkoutguide-item::before {
                display: inline-block;
                text-align: center;
                font-size: 12px;
            }
            .checkoutguide-item {
                position: relative;
                z-index: 1;
                width: 100px;
                counter-increment: number 1;
                color: #9cc9ee;
                & + .checkoutguide-item {
                    margin-left: 65px;
                }
                &::before {
                    content: counter(number);
                    margin: 0 40px 8px;
                    width: 22px;
                    line-height: 22px;
                    border-radius: 50%;
                    background-color: #a5d0f3;
                    color: #0089dc;
                    font-weight: 700;
                }
            }
            .checkoutguide-item.active {
                color: #fef22f;
                &::before {
                    background-color: #fef22f;
                }
            }
            .checkoutguide-line {
                position: absolute;
                top: 8px;
                left: 50px;
                height: 3px;
                width: 330px;
                background-color: #9cc9ee;
                text-align: left;
                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    width: 250px;
                    height: 3px;
                    background: #fef22f;
                }

                .line {
                    display: inline-block;
                    width: 3px;
                    height: 3px;
                    background-color: #fff;
                    vertical-align: top;
                    margin-left: 4px;
                    &1 {
                        margin-left: -50px;
                    }
                    &2 {
                        width: 4px;
                    }
                    &3 {
                        width: 5px;
                    }
                    &4 {
                        width: 17px;
                    }
                }
            }
        }
    }
    .container {
        .nodata {
            padding-top: 50px;
            text-align: center;
            margin-bottom: 20px;
            flex: 1;
            .nodata-container {
                display: inline-block;
                padding-left: 110px;
                line-height: 115px;
                background: url("../images/nodata.6477c5.png") no-repeat;
                color: #999;
            }
        }
        .color-stress {
            color: #f74342;
        }
        .color-mute {
            color: #999;
        }
        .checkout-cart,
        .checkout-content {
            margin-top: 12px;
            background: #ffffff;
            box-sizing: border-box;
        }

        .checkout-cart {
            align-self: flex-start;
            width: 34%;
            text-align: left;
            .checkoutcart-container {
                border: 1px solid #e0e0e0;
                line-height: 1;
                .checkoutcart-title {
                    position: relative;
                    padding: 20px;
                    height: 60px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #eee;
                    h2 {
                        font-size: 16px;
                        font-weight: 700;
                        color: #333333;
                    }
                    a {
                        position: absolute;
                        top: 22px;
                        right: 28px;
                        font-size: 12px;
                        color: #666666;
                    }
                }
                .checkoutcart-group,
                .checkoutcart-tablerow.extra {
                    margin-top: -1px;
                    background-color: #fff;
                }
                .checkoutcart-tablerow {
                    display: flex;
                    align-items: center;
                    background-color: #fcfaf8;
                    height: 48px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 18px 0 20px;
                    font-size: 14px;
                    color: #666;
                    .icon-circle-help::after {
                        content: "";
                        background-image: url("../images/icons/queshelp.svg");
                        display: inline-block;
                        width: 14px;
                        height: 14px;
                        background-size: cover;
                    }
                    .itemname {
                        padding: 5px 0 3px 10px;
                        width: 45%;
                        font-size: 12px;
                        line-height: 1.3;
                    }
                    .itemquantity {
                        width: 30%;
                        white-space: nowrap;
                        text-align: center;
                        @include commondityPiece;
                    }
                    .itemtotal {
                        padding-right: 10px;
                        text-align: right;
                        width: 25%;
                    }
                }
                .tablerowhead {
                    background-color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    color: #999;
                }
                .checkoutcart-group {
                    .checkoutcart-grouptitle {
                        border-bottom: 1px solid #eee;
                        padding-left: 30px;
                        height: 48px;
                        line-height: 48px;
                        font-size: 14px;
                        font-weight: 700;
                        color: #333;
                    }
                }
                .checkoutcart-total {
                    padding: 52px 28px 10px;
                    font-size: 24px;
                    text-align: right;
                    .num {
                        font-size: 46px;
                        margin-left: -10px;
                    }
                }
                .checkoutcart-totalextra {
                    padding: 0 30px 22px;
                    font-size: 12px;
                    color: #666;
                    text-align: right;
                }
            }
        }
        .checkout-content {
            align-self: flex-start;
            padding: 25px 20px 150px 30px;
            width: 65%;
            border: 1px solid #e0e0e0;
            text-align: left;

            .checkout-select {
                margin-bottom: 40px;
                h2 {
                    margin-bottom: 15px;
                    font-size: 16px;
                    font-weight: 700;
                }
                .checkout-addaddress {
                    float: right;
                    text-decoration: underline;
                    font-size: 14px;
                    font-weight: 400;
                    color: #0089dc;
                }
                .checkout-address {
                    display: flex;
                    position: relative;
                    margin-bottom: -1px;
                    padding: 15px 20px 15px 0;
                    width: 100%;
                    box-sizing: border-box;
                    line-height: 1.5;
                    border: 1px solid #eee;
                    cursor: pointer;
                    .checkout-address-icon {
                        width: 64px;
                        text-align: center;
                        vertical-align: middle;
                        border-right: 1px solid #eee;
                        font-size: 30px;
                        color: #ccc;
                    }
                    .icon-location-line {
                        display: inline-block;
                        background: url("../images/icons/icon-location.svg")
                            center no-repeat;
                    }
                    .checkout-address-info {
                        padding-left: 16px;
                        color: #333333;
                        p:last-child {
                            color: #666666;
                        }
                    }
                    .checkout-address-edit {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        a {
                            margin: 2px;
                            color: #0089dc;
                        }
                        display: none;
                    }
                    .icon-tick {
                        @include tick;
                    }
                    &.active {
                        @include checkout-active;
                    }
                    &:hover {
                        background-color: #f9f9f9;
                    }
                }
                .checkout-showmoreaddress {
                    display: inline-block;
                    margin-top: 8px;
                    color: #999;
                }
                & > ul {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }
                .checkout-pay {
                    padding: 14px 20px;
                    width: 48.2%;
                    box-sizing: border-box;
                    border: 1px solid #eee;
                    cursor: pointer;
                    p:first-child {
                        margin-bottom: 4px;
                    }

                    &.active {
                        @include checkout-active;
                    }
                    .icon-tick {
                        @include tick;
                    }
                }
                .checkout-pay-tip {
                    margin-left: 16px;
                    font-size: 12px;
                    font-weight: 400;
                }
                .color-tip {
                    color: #ff9c00;
                }
                .checkout-infolabel {
                    display: inline-block;
                    margin-right: 20px;
                    width: 5em;
                    text-align: right;
                }
            }

            .checkout-info {
                display: flex;
                align-items: center;
                margin-bottom: 20px;

                .formselect {
                    display: flex;
                    align-items: center;
                    position: relative;
                    width: 150px;
                    &-value {
                        flex: 1;
                        display: inline-block;
                        padding-left: 8px;
                        line-height: 39px;
                        border: 1px solid #e0e0e0;
                        color: #666;
                    }
                    // &:hover {
                    //     .formselect-data {
                    //         display: flex;
                    //     }
                    // }
                    &-data {
                        position: absolute;
                        display: none;
                        flex-direction: column;
                        top: 0;
                        width: 100%;
                        max-height: 260px;
                        overflow-y: auto;
                        border: 1px solid #eee;
                        box-shadow: 0 0 4px rgba(0, 0, 0, 0.13);
                        background-color: #fff;
                        z-index: 1;
                        img {
                            width: 18px;
                            height: 18px;
                        }
                        span {
                            position: relative;
                            padding: 10px 8px;
                            cursor: pointer;
                            color: #666;
                            &:hover {
                                background-color: #f7f7f7;
                            }
                        }
                        .active {
                            color: #0089dc;
                        }
                    }
                    .ui-scrollbar-light {
                        &::-webkit-scrollbar {
                            width: 4px;
                            height: 4px;
                        }
                        &::-webkit-scrollbar-thumb {
                            background-color: rgba(0, 0, 0, 0.26);
                        }
                    }
                    i {
                        position: absolute;
                        right: 5px;
                        top: 50%;
                        margin-top: -7px;
                        color: #ccc;
                    }
                }
                .checkout-input {
                    padding: 5px 10px;
                    width: 235px;
                    border: 1px solid #e0e0e0;
                    outline: 0;
                    box-sizing: border-box;
                    font-size: 14px;
                    line-height: 1.3;
                    color: #666;
                    &[disabled] {
                        background-color: #eee;
                    }
                }
                .tableware {
                    background: url("../images/green-leaf.e6e9f2.png") no-repeat;
                    width: 38px;
                    height: 40px;
                }
            }

            .btn-lg {
                @include btn-lg;
            }
            .btn-stress {
                background-color: #f74342;
                color: #fff;
            }
            .checkout-dapp {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                box-sizing: border-box;
                position: relative;
                float: right;
                padding: 12px;
                width: 183px;
                border: 1px solid #ddd;
                border-radius: 2px;
                text-align: right;
                color: #999;
                cursor: default;
                .checkout-dapp-tip {
                    display: inline-block;
                    font-size: 12px;
                }
                .checkout-dapp-qrcode {
                    background: url("../images/icons/icon-solid.svg") no-repeat;
                    width: 35px;
                    height: 35px;
                    background-size: cover;
                }
                img {
                    position: absolute;
                    left: 0;
                    top: 61px;
                    display: none;
                    padding: 16px 28px;
                    margin-left: -1px;
                    width: 183px;
                    height: 158px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    border-top: none;
                    background-color: #fff;
                }
                &:hover {
                    img {
                        display: block;
                    }
                }
            }
        }
    }
    .footer {
        @include center;

        height: 200px;
    }
}
</style>