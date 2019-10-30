<template>
    <div id="recentOrder">
        <div class="order-content">
            <h3>近三个月订单</h3>
            <div class="img">
                <img src="/img/takeout.408a87.408a87ec.png" alt="">
            </div>
            <table>
                <thead>
                    <tr class="table-title">
                        <th>下单时间</th>
                        <th>订单内容</th>
                        <th></th>
                        <th>支付金额（元）</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="order-profile" v-for="(item, index) in orderData" :key="index">
                        <td>{{item.order_time}}</td>
                        <td><img src="../images/5d481659f8dedccfec8703126fbcepng.webp" alt /></td>
                        <td>
                            <p>
                                <span v-for="(i, index) in orderMenu(item.order_menu)" :key="index"">
                                    {{i}}{{orderNum(item.order_num)[index]}}份
                                    <span v-if="((index+1)!=item.totalnum)">/</span>
                                </span>
                                <span class="bolder"> {{item.totalnum}} </span>个菜品
                            </p>
                            <p>订单号：{{item.order_id}}</p>
                        </td>
                        <td>{{item.order_pay}}</td>
                        <td>{{item.state}}</td>
                        <td>
                            <div class="order-detail">
                                <a href="/profile/order/id">订单详情</a>
                            </div>
                            <div v-if="(item.state=='等待评价')">
                                <div class="display">
                                    <div class="order-appraise">
                                        <a href="/profile/order/rate">评价订单</a>
                                        <i class="el-icon-arrow-down"></i>
                                    </div>
                                    <div class="once-more1">
                                        <a href="/profile/order/id">再来一份</a>
                                    </div> 
                                </div>
                            </div>  
                            <div class="once-more2" v-else>
                                <a href="/profile/order/id">再来一份</a>
                            </div>    
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderData:[],
        }
    },
    mounted(){
        this.getOrders(),
        this.orderMenu(),
        this.orderNum()
    },
    methods:{ 
        getOrders() {
            this.$server
                .getOrders(this)
                .then(res => {
                    res.data.forEach(item => {
                        this.orderData.push(item);
                    });
                });
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
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin.scss";
* {
    box-sizing: border-box;
}

#recentOrder {
    width: 1180px;
    margin: 0 auto;
    background:#f5f5f5;

    .order-content {
        margin-left: 170px;
        border: 1px solid #eee;
        background-color: #fff;
        min-height: 680px;
        padding: 20px 18px; 

        h3 {
            float: left;
            margin-left: 20px;
            margin-top: 5px;
        }

        .img {
            float: right;
            margin-bottom: 6px;
            img {
                width: 186px;
                height: 55px;
            }
        }

        table {
            display: table;
            width:100%;
            border-collapse: separate;
            position: relative;
            top:-13px;
            border-spacing:0;

            tr {
                display: table-row;
                vertical-align: inherit;
                border-color: inherit;
                height: 10px;

                th {
                    display: table-cell;
                    vertical-align: inherit;
                    font-size:13px;
                    height:30px;
                    text-align: -internal-center;
                }
                & th:nth-child(1) {
                    width:77px;     
                }
                & th:nth-child(2) {
                    width:124px;
                }
                & th:nth-child(3) {
                    width:393px;
                }
                & th:nth-child(4),th:nth-child(5),th:nth-child(6) {
                    width:126px;
                }

                td {
                    height:134px;
                }
                & td:nth-child(1) {
                    color:#999;
                    font-size:12px;
                }
                & td:nth-child(2) {
                    img {
                        width:70px;
                        height:70px;
                    }
                }
                & td:nth-child(3) {
                    color:#999;
                    font-size:12px;
                    p {
                        text-align:left;
                        margin:0px;
                        & span:nth-child(1) {
                            color:#999;
                            font-size:12px;
                        }
                        .bolder {
                            color:#666;
                            font-weight:bolder;
                        }
                    }
                }
                & td:nth-child(4) {
                    font-weight:bolder;
                }
                & td:nth-child(5) {
                    font-size:14px;
                    color:#999;
                }
                & td:nth-child(6) {
                    position:relative;
                    a {
                        color:#000;
                    }
                    .order-detail {
                        font-size:12px;
                        padding:4px 0;
                        margin:10px 24px;
                        border:1px solid #eee;
                        &:hover {
                            border-color:#4169E1;
                            a {
                                color:#4169E1;
                            }
                        }
                    }
                    .display {
                        &:hover {
                            .once-more1 {
                                display:block;
                            }
                        }
                    }
                    .order-appraise {
                        font-size:12px;
                        padding:4px 0;
                        background-color:#ff4248;
                        margin:10px 24px;
                        border:1px solid #eee;
                        a {
                            color:#fff;
                        }
                        .el-icon-arrow-down {
                            color:#fff;
                        }
                    }
                    .once-more1 {
                        display:none;
                        position:absolute;
                        top:88px;
                        left:5px;
                        font-size:12px;
                        padding:4px 9px;
                        border:1px solid #eee;
                        margin:10px 24px;
                        &:hover {
                            background:#f5f5f5;
                            a {
                                color:#000;
                            }
                        }
                        a {
                            color:#999;
                        }
                        
                    }
                    .once-more2 {
                        font-size:12px;
                        padding:4px 0;
                        margin:10px 24px;
                        &:hover {
                            a {
                                color:#4169E1;
                            }
                        }
                    }
                }
            }

            .table-title {
                background-color:#f5f5f5;
            }
        }
    }

    
}
</style>