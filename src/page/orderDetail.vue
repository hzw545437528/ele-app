<template>
    <div id="orderDetail">
        <div class="order-content">
            <h3>订单详情</h3>
            <div class="arrive">
                <h5>{{this.order.order_state}}</h5>
                <p>{{this.order.confirm_time}}确认送达</p>
                <router-link to class="chargeBack">申请退单</router-link>
                <router-link to class="onceMore">再来一单</router-link>
                <router-link to class="appraise">评价</router-link>
            </div>
            <div class="shop-info">
                <router-link to class="img">
                    <img :src="shopsImage[this.order.img]" :alt="this.order.shop_name" />
                </router-link>
                <p>订单号：{{this.orderid}}...</p>
                <p>商家电话：{{this.order.shop_number}}</p>
                <div class="collect">
                    <div class="no" v-if="isShow" @click="change1()">
                        <i class="iconfont icon-wodeshoucang">收藏</i>
                    </div>
                    <div class="yes" @click="change2()" v-else>
                        <i class="iconfont icon-wodeshoucang"></i>已收藏
                    </div>
                </div>
            </div>
            <div class="detail">
                <div class="order-detail">
                    <div class="title">
                        <span>菜品</span>
                        <span>数量</span>
                        <span>小计（元）</span>
                    </div>
                    <div
                        class="menu"
                        v-for="(i, index) in orderMenu(this.order.order_menu)"
                        :key="index"
                    >
                        <span>{{i}}</span>
                        <span>{{orderNum(order.order_num)[index]}}</span>
                        <span>{{orderPartCost(order.part_cost)[index]}}</span>
                    </div>
                    <div class="discount">
                        <div v-if="order.new_discount!=0.00">
                            <span>门店新客立减</span>
                            <span>-{{this.order.new_discount}}</span>
                        </div>
                        <div v-if="order.full_discount!=0.00">
                            <span>店铺满减优惠</span>
                            <span>-{{this.order.full_discount}}</span>
                        </div>
                        <div v-if="order.person_discount!=0.00">
                            <span>津贴优惠</span>
                            <span>-{{this.order.person_discount}}</span>
                        </div>
                        <div v-if="order.shop_discount!=0.00">
                            <span>店铺红包</span>
                            <span>-{{this.order.shop_discount}}</span>
                        </div>
                        <div>
                            <span></span>
                            <div class="total">
                                实际支付：
                                <i>{{this.order.order_pay}}</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="send-detail">
                    <div class="bolder">配送信息</div>
                    <div style="clear:both"></div>
                    <div>
                        <span>配送方式：{{this.order.send_way}}</span>
                    </div>
                    <div style="clear:both"></div>
                    <div>
                        <span>送达时间：{{this.order.arrive_time}}</span>
                    </div>
                    <div class="br">
                        <br />
                    </div>
                    <div>
                        <span>联系人：{{this.order.contact}}</span>
                    </div>
                    <div style="clear:both"></div>
                    <div>
                        <span>联系电话：{{this.order.contact_number}}</span>
                    </div>
                    <div style="clear:both"></div>
                    <div>
                        <span>收货地址：{{this.order.address}}</span>
                    </div>
                    <div class="br">
                        <br />
                    </div>
                    <div>
                        <span>发票信息：{{this.order.invoice_info}}</span>
                    </div>
                    <div style="clear:both"></div>
                    <div>
                        <span>备注：{{this.order.remark}}</span>
                    </div>
                </div>
                <div class="border">
                    <img src="../images/border.png" alt="aa" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            order: "",
            shopsImage: {},
            shopData: [],
            orderid: "",
            isShow: true
        };
    },
    mounted() {
        this.getOrder(),
            this.orderMenu(),
            this.orderNum(),
            this.orderPartCost();
    },
    methods: {
        getOrder() {
            var orderId = this.$route.params.orderId;
            this.$server.getOrderById(this, orderId).then(res => {
                this.order = res.data[0];
                this.$server
                    .getShopByName(this, this.order.shop_name)
                    .then(res => {
                        this.shopData = res.data;
                        this.order.img = this.shopData[0].img;
                        this.getShopImg(this.order.img);
                    });
                this.orderid = this.order.order_id.substring(0, 16);
            });
        },
        getShopImg(imgPath) {
            this.$server.getShopImg(this, imgPath).then(res => {
                this.$set(this.shopsImage, imgPath, res);
            });
        },
        change1() {
            this.isShow = false;
        },
        change2() {
            this.isShow = true;
        },
        orderMenu(str) {
            let arr = [];
            if (str) {
                arr = str.split(",");
            }
            return arr;
        },
        orderNum(str) {
            let arr = [];
            if (str) {
                arr = str.split(",");
            }
            return arr;
        },
        orderPartCost(str) {
            let arr = [];
            if (str) {
                arr = str.split(",");
            }
            return arr;
        }
    },
    created() {
        this.$store.dispatch("setNavName", "订单详情");
    }
};
</script>

<style lang="scss">
@import "../style/mixin.scss";
* {
    box-sizing: border-box;
}

#orderDetail {
    background: #f5f5f5;

    .order-content {
        border: 1px solid #eee;
        background-color: #fff;
        min-height: 680px;
        padding: 20px 18px;

        h3 {
            position: relative;
            float: left;
            margin-left: 20px;
            margin-top: 5px;
        }

        .arrive {
            position: relative;
            top: 60px;
            padding: 24px 32px 0 30px;
            min-height: 94px;
            border: 1px solid #f8e5bb;
            background-color: #fefdee;
            line-height: 1;

            h5 {
                font-size: 16px;
                color: #333;
                font-weight: 400;
                position: absolute;
                top: 0px;
            }

            p {
                line-height: 1.5;
                font-size: 14px;
                color: #999;
                position: absolute;
                top: 38px;
            }

            .chargeBack,
            .onceMore {
                color: #999;
                text-decoration: underline;
                font-size: 14px;
            }

            .chargeBack {
                position: absolute;
                top: 40px;
                right: 300px;
            }

            .onceMore {
                position: absolute;
                top: 40px;
                right: 180px;
            }

            .appraise {
                color: #fff;
                padding: 12px 35px;
                border-radius: 2px;
                background-color: #f74342;
                position: absolute;
                top: 25px;
                right: 40px;
                font-size: 14px;
            }
        }

        .shop-info {
            position: relative;
            top: 80px;
            height: 80px;
            padding: 18px 30px 16px;
            background-color: #f8f8f6;
            border: 1px solid #eee;
            border-bottom: 1px solid #eee;

            img {
                width: 44px;
                height: 44px;
                float: left;
            }

            p {
                line-height: 1.5;
                font-size: 15px;
                color: #999;
            }

            & p:nth-child(1) {
                position: absolute;
            }

            & p:nth-child(2) {
                position: absolute;
                top: 15px;
                left: 87px;
            }

            .collect {
                cursor: pointer;
                color: #999;
                position: relative;
                top: -50px;
                float: right;
                .no {
                    & :hover {
                        color: #ff9c00;
                    }
                }
                .yes {
                    color: #999;
                    i {
                        color: #ff9c00;
                    }
                    & :hover {
                        color: #ff9c00;
                    }
                }
            }
        }
        .detail {
            overflow: hidden;
            position: relative;
            top: 68px;
            width: 100%;
            height: 100%;
            border-right: 1px solid #eee;
            border-left: 1px solid #eee;

            .order-detail {
                margin-bottom: -20000px;
                padding-bottom: 20000px;
                float: left;
                background-color: #f8f8f8;
                border-bottom: 1px solid #eee;
                border-right: 1px solid #eee;
                vertical-align: top;
                width: 60%;
                height: 100%;

                .title,
                .menu {
                    display: table;
                    width: 100%;
                    height: 51px;
                    font-size: 14px;
                    color: #666;
                    line-height: 1;

                    span {
                        display: table-cell;
                        padding-top: -100px;
                        padding-bottom: 0px;
                        vertical-align: middle;
                    }

                    & span:nth-child(1) {
                        padding-left: 30px;
                        width: 60%;
                        text-align: left;
                    }

                    & span:nth-child(2) {
                        width: 10%;
                        text-align: center;
                    }

                    & span:nth-child(3) {
                        padding-right: 30px;
                        width: 30%;
                        text-align: right;
                    }
                }

                .title {
                    border-bottom: 1px solid #eee;
                    font-weight: 700;
                }

                .discount {
                    & > div {
                        display: table;
                        width: 100%;
                        height: 51px;
                        font-size: 14px;
                        color: #666;
                        line-height: 1;
                    }

                    span {
                        display: table-cell;
                        vertical-align: middle;
                    }

                    & span:nth-child(1) {
                        padding-left: 30px;
                        width: 60%;
                        text-align: left;
                    }

                    & span:nth-child(2) {
                        color: #f74342;
                        padding-right: 30px;
                        width: 30%;
                        text-align: right;
                    }

                    .total {
                        color: #000;
                        padding-right: 30px;
                        width: 30%;
                        text-align: right;
                        display: table-cell;
                        vertical-align: middle;
                        i {
                            color: #f74342;
                            font-size: 26px;
                            font-weight: 700;
                            font-style: normal;
                        }
                    }
                }

                .discount {
                    border-top: 1px solid #eee;
                }
            }
            .send-detail {
                margin-bottom: -20000px;
                padding-bottom: 20000px;
                border-bottom: 1px solid #eee;
                background-color: #fff;
                vertical-align: top;
                width: 40%;
                height: 100%;
                float: left;

                .br {
                    clear: both;
                    border-bottom: 1px dashed #eee;
                    width: 90%;
                    margin-left: 20px;
                }

                .bolder {
                    position: relative;
                    padding: 20px 0 4px 25px;
                    font-size: 14px;
                    line-height: 1;
                    font-weight: 700;
                    float: left;
                }

                span {
                    padding: 20px 0 4px 25px;
                    font-size: 14px;
                    line-height: 1;
                    float: left;
                }
            }

            .border {
                img {
                    position: relative;
                    bottom: -5px;
                    width: 972px;
                    height: 9px;
                    margin: -8px 0 0;
                }
            }
        }
    }
}
</style>