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
                        <small>大家喜欢吃，才叫真好吃</small>
                    </h3>
                    <div class="goods-wrap">
                        <ul
                            :class="{'goods-grid':$store.getters.shoplayout=='grid','goods-list':$store.getters.shoplayout=='list'}"
                        >
                            <li v-for="item in 10" :key="item" class="goods">
                                <div class="goods-left">
                                    <img
                                        src="../../images/63d2494016e3ce1feb74241ddbfb7jpeg.jpeg"
                                        alt
                                    />
                                </div>
                                <div class="goods-right">
                                    <div class="goods-title">叫了个童子鸡+饮料套餐</div>
                                    <p
                                        class="goods-introduce"
                                        @mouseenter="showtip"
                                        @mouseleave="hidetip"
                                    >所有鸡的底味都有一点点微辣哦 滴辣不沾的宝宝慎拍啊 主要原料：鸡肉</p>
                                    <span
                                        class="goodsintroduce-tip"
                                    >所有鸡的底味都有一点点微辣哦 滴辣不沾的宝宝慎拍啊 主要原料：鸡肉</span>
                                    <div class="inco-star">
                                        <el-rate
                                            v-model="value5"
                                            disabled
                                            text-color="#ff9900"
                                            score-template="{value}"
                                        ></el-rate>
                                        <small>(14)</small>
                                        <small>月售10份</small>
                                    </div>
                                    <div class="goods-price">￥46.8</div>
                                </div>
                                <div class="btn-div">
                                    <a class="btn">加入购物车</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value5: 3.0,
            menuNavFixed: false,
            shopmenu_nav: [
                "热销",
                "优惠",
                "进店必看",
                "童子炸鸡",
                "鸡の同伙",
                "鸡の旁友"
            ],
            shopmenu_nav_active: {
                热销: true,
                优惠: false,
                进店必看: false,
                童子炸鸡: false,
                鸡の同伙: false,
                鸡の旁友: false
            },
            click: false
        };
    },
    methods: {
        scroll(type) {
            this.click = true;
            setTimeout(() => {
                this.click = false;
            }, 10);
            this.$refs[type][0].scrollIntoView({
                behavior: "smooth"
            });
        },
        handleScroll() {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            if (!this.click && scrollTop >= 266) {
                this.menuNavFixed = true;
            } else {
                this.menuNavFixed = false;
            }
            let obj = this.getTypePositon();
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
        },
        hidetip(e) {
            e.target.parentNode.querySelector(
                ".goodsintroduce-tip"
            ).style.opacity = 0;
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
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
                        display: inline-block;
                        position: absolute;
                        right: 14px;
                        top: -25px;
                        padding: 5px 10px;
                        z-index: 999;
                        border-radius: 3px;
                        max-width: 300px;
                        box-sizing: border-box;
                        opacity: 0;
                        color: #ffffff;
                        background: rgba(114, 111, 119, 0.8);
                        transition: opacity 0.3s ease-in-out;
                        &::before {
                            @include triangle;
                            border-color: rgba(114, 111, 119, 0.8) transparent
                                transparent;
                            bottom: -10px;
                            right: 145px;
                        }
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
                        display: inline-block;
                        position: absolute;
                        left: 62px;
                        top: -15px;
                        padding: 5px 10px;
                        z-index: 999;
                        border-radius: 3px;
                        max-width: 500px;
                        box-sizing: border-box;
                        opacity: 0;
                        color: #ffffff;
                        background: rgba(114, 111, 119, 0.8);
                        transition: opacity 0.3s ease-in-out;
                        &::before {
                            @include triangle;
                            border-color: rgba(114, 111, 119, 0.8) transparent
                                transparent;
                            bottom: -10px;
                            right: 245px;
                        }
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
    }
}
</style>