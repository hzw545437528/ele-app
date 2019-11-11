<template>
    <div id="side-bar">
        <div class="right-toolbar" ref="in1">
            <div class="tool-bar-middle">
                <router-link to class="toolbar-btn">
                    <li
                        style="position:relative;"
                        @mouseenter="enter('order')"
                        @mouseleave="leave('order')"
                    >
                        <i class="iconfont icon-6"></i>
                        <div class="card" ref="order">
                            <span>我的订单</span>
                        </div>
                    </li>
                </router-link>
                <div class="toolbar-separator"></div>
                <router-link to class="toolbar-btn toolbar-cartbtn">
                    <i class="iconfont icon-gouwuche"></i>
                    <div @click="translateShop('in1','in2')">购物车</div>
                </router-link>
                <div class="toolbar-separator"></div>
                <router-link to class="toolbar-btn">
                    <li
                        style="position:relative;"
                        @mouseenter="enter('info')"
                        @mouseleave="leave('info')"
                        @click="translateInfo('in1','in2')"
                    >
                        <i class="iconfont icon-xinfeng"></i>
                        <div class="card" ref="info">
                            <span>我的信息</span>
                        </div>
                    </li>
                </router-link>
            </div>
            <div class="tool-bar-bottom">
                <li
                    class="toolbar-btn"
                    style="position:relative;"
                    @mouseenter="enter('QRCode')"
                    @mouseleave="leave('QRCode')"
                >
                    <i class="iconfont icon-erweima"></i>
                    <div class="code-card QR-code" ref="QRCode">
                        <img src="../../images/QR_code.png" alt="下载手机应用" />
                        <p class="blue">下载手机应用</p>
                        <p class="red">即可参加分享红包活动</p>
                    </div>
                </li>
                <router-link to class="toolbar-btn go-top" v-if="btnFlag">
                    <li
                        style="position:relative;"
                        @mouseenter="enter('up')"
                        @mouseleave="leave('up')"
                        @click="backTop"
                    >
                        <i class="iconfont icon-zhidingxian"></i>
                        <div class="card" ref="up">
                            <span>回到顶部</span>
                        </div>
                    </li>
                </router-link>
            </div>
        </div>
        <div class="tool-bar-content" ref="in2">
            <div class="sidebar-caption">
                <a href="/" v-if="isShow">购物车</a>
                <a href="/" v-else>我的信息</a>
                <span class="el-icon-d-arrow-right" @click="translate('in1','in2')"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showShop: false,
            showInfo: false,
            btnFlag: false,
            isShow: false
        };
    },
    mounted() {
        window.addEventListener("scroll", this.scrollToTop);
    },
    destroyed() {
        window.removeEventListener("scroll", this.scrollToTop);
    },
    methods: {
        enter(ref) {
            this.$refs[ref].style.display = "block";
        },
        leave(ref) {
            this.$refs[ref].style.display = "none";
        },
        translateShop(ref1, ref2) {
            if (!this.showShop && !this.showInfo) {
                this.$refs[ref1].classList.remove("toolbar-change-hide");
                this.$refs[ref2].classList.remove(
                    "toolbar-content-change-hide"
                );
                this.$refs[ref1].classList.add("toolbar-change");
                this.$refs[ref2].classList.add("toolbar-content-change");
                this.showShop = true;
                this.isShow = true;
            } else if (this.showShop && !this.showInfo) {
                this.$refs[ref1].classList.add("toolbar-change-hide");
                this.$refs[ref2].classList.add("toolbar-content-change-hide");
                this.$refs[ref1].classList.remove("toolbar-change");
                this.$refs[ref2].classList.remove("toolbar-content-change");
                this.showShop = false;
            } else {
                this.showShop = true;
                this.showInfo = false;
                this.isShow = true;
            }
        },
        translateInfo(ref1, ref2) {
            if (!this.showShop && !this.showInfo) {
                this.$refs[ref1].classList.remove("toolbar-change-hide");
                this.$refs[ref2].classList.remove(
                    "toolbar-content-change-hide"
                );
                this.$refs[ref1].classList.add("toolbar-change");
                this.$refs[ref2].classList.add("toolbar-content-change");
                this.showInfo = true;
                this.isShow = false;
            } else if (!this.showShop && this.showInfo) {
                this.$refs[ref1].classList.add("toolbar-change-hide");
                this.$refs[ref2].classList.add("toolbar-content-change-hide");
                this.$refs[ref1].classList.remove("toolbar-change");
                this.$refs[ref2].classList.remove("toolbar-content-change");
                this.showInfo = false;
            } else {
                this.showInfo = true;
                this.showShop = false;
                this.isShow = false;
            }
        },
        translate(ref1, ref2) {
            this.$refs[ref1].classList.add("toolbar-change-hide");
            this.$refs[ref2].classList.add("toolbar-content-change-hide");
            this.$refs[ref1].classList.remove("toolbar-change");
            this.$refs[ref2].classList.remove("toolbar-content-change");
            this.showInfo = false;
            this.showShop = false;
        },
        backTop() {
            const that = this;
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop =
                    that.scrollTop + ispeed;
                if (that.scrollTop === 0) {
                    clearInterval(timer);
                }
            }, 16);
        },

        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop() {
            const that = this;
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            that.scrollTop = scrollTop;
            if (that.scrollTop > 60) {
                that.btnFlag = true;
            } else {
                that.btnFlag = false;
            }
        }
    }
};
</script>
<style lang="scss">
@import "../../style/mixin.scss";
.right-toolbar {
    position: fixed;
    top: 0;
    right: 0;
    width: 35px;
    height: 100vh;
    font-weight: bolder;
    background-color: #747070;

    .tool-bar-middle {
        position: absolute;
        width: 35px;
        top: 50%;
        margin-top: -220px;

        .toolbar-separator {
            font-size: 1px;
            border-top: 1px solid #ccc;
            height: 0px;
            margin: 0 9px;
        }

        .toolbar-cartbtn {
            div {
                width: 20px;
                margin: 0 auto;
                line-height: 18px;
                font-size: 14px;
            }
        }

        .toolbar-btn,
        .toolbar-cartbtn {
            position: relative;
            display: block;
            cursor: pointer;
            text-align: center;
            font-size: 13px;
            &:hover {
                background: #26a2ff;
            }
        }
    }

    .tool-bar-bottom {
        top: 530px;
        position: absolute;

        .toolbar-btn {
            width: 35px;
            line-height: 35px;
            color: #ccc;
            margin: 5px 0;
            &:hover {
                background: #26a2ff;
            }

            .code-card {
                display: none;
                position: absolute;
                left: -150px;
                top: -150px;

                height: 180px;
                background: #fff;
                box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);

                .blue {
                    color: #26a2ff;
                    position: absolute;
                    top: 110px;
                    left: 20px;
                }

                .red {
                    padding: 0px;
                    color: #f63;
                    font-size: 12px;
                }
            }
        }

        .QR-code {
            padding: 3px 10px;
            font-size: 16px;
            font-weight: bold;
            img {
                width: 120px;
                height: 120px;
            }
        }

        .QR-code::before {
            @include trianglereverse;
            left: 150px;
            top: 160px;
        }
    }
    .tool-bar-middle,
    .tool-bar-bottom {
        .card {
            display: none;
            position: absolute;
            left: -90px;
            top: 0;
            width: 80px;
            background: #747070;
            border-radius: 5px;
        }

        .card::after {
            @include triangletransparent;
            left: 80px;
            top: 11px;
        }

        .toolbar-btn {
            width: 35px;
            line-height: 35px;
            color: #ccc;
            margin: 5px 0;
            position: relative;
            display: block;
            cursor: pointer;
            text-align: center;
            font-size: 13px;
            &:hover {
                background: #009fcc;
            }
        }
    }
}
.tool-bar-content {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 0;
    overflow: auto;
    background-color: #e6e6e6;

    .sidebar-caption {
        background: #fff;
        font-size: 16px;
        color: #999;
        padding: 5px 10px;
        height: 30px;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;

        a {
            max-width: 240px;
            display: inline-block;
            line-height: 23px;
            color: #333;
            text-decoration: none;
            // float: left;
        }

        span {
            float: right;
            cursor: pointer;
            line-height: 20px;
            margin-left: 15px;
            color: #666;
        }
    }
}
.toolbar-change {
    transform: translateX(-295px);
    transition: transform 0.5s;
}
.toolbar-content-change {
    width: 295px;
    transition: width 0.5s;
}
.toolbar-change-hide {
    transform: translateX(0px);
    transition: transform 0.5s;
}
.toolbar-content-change-hide {
    width: 0;
    transition: width 0.5s;
}
</style>