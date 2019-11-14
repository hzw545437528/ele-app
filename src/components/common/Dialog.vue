<template>
    <div id="dialog" v-if="open" @click.self="close">
        <div class="msgbox">
            <div class="msgbox-content">
                <div class="icon-box">
                    <i class="icon" :class="iconType"></i>
                </div>
                <div class="msg-info">
                    <h2 class="error-title">{{info.title}}</h2>
                    <p class="error-msg">{{info.msg}}</p>
                </div>
            </div>
            <div class="msgbox-btn">
                <button class="btn-lg btn-primary msg-confirm" @click="close">确定</button>
            </div>
            <div class="close-btn" @click="close">
                <i class="el-icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        },
        info: Object
    },
    data() {
        return {
            iconType: {
                warn: false,
                error: false,
                success: false
            }
        };
    },
    methods: {
        close() {
            this.$emit("update:open", false);
        }
    },
    watch: {
        open() {
            console.log(this.info.type);
            this.iconType[this.info.type] = true;
        }
    },
    created() {
        this.iconType[this.info.type] = true;
    }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
#dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    .msgbox {
        position: fixed;
        background-color: #fff;
        top: 164px !important;
        width: 465px;
        padding: 50px;
        box-sizing: border-box;
        text-align: left;
        .msgbox-content {
            display: flex;
            .icon-box {
                .icon {
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    background-size: cover;
                    &.warn {
                        background: url("../../images/icons/icon-warn.svg")
                            no-repeat;
                    }
                    &.error {
                        background: url("../../images/icons/icon-error.svg")
                            no-repeat;
                    }
                }
            }
            .msg-info {
                margin-left: 14px;
                text-align: left;
                .error-title {
                    margin-bottom: 8px;
                    font-size: 18px;
                    color: #666666;
                    font-weight: 700;
                }
                .error-msg {
                    color: #999999;
                }
            }
        }
        .msgbox-btn {
            margin: {
                top: 25px;
                left: 50px;
            }
            .btn-lg {
                @include btn-lg;
            }
            .msg-confirm {
                min-width: 112px;
            }
        }
        .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #ccc;
            cursor: pointer;
            i {
                font-size: 16px;
            }
        }
    }
}
</style>