<template>
    <div id="login">
        <div class="wrap">
            <div>
                <img src="//shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png" class />
            </div>
            <div class="form">
                <div>
                    <InputGroup
                        v-model="phoneData.value"
                        :inputData="phoneData"
                        @btnClick="sendCode"
                    ></InputGroup>
                </div>
                <div>
                    <InputGroup v-model="codeData.value" :inputData="codeData"></InputGroup>
                </div>
                <button
                    class="login-btn"
                    @click="login"
                    :disabled="loginDisabled"
                    :class="{'login-disabled': loginDisabled}"
                >登录</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
import InputGroup from "../components/common/InputGroup.vue";

@Component({
    components: {
        InputGroup
    }
})
export default class Login extends Vue {
    @Provide() phoneData: {
        type: string;
        placeholder: string;
        value: string;
        name: string;
        max: number;
        error: string;
        btnTitle: string;
        disabled: boolean;
    } = {
        type: "text",
        placeholder: "请输入手机号",
        value: "",
        name: "phoneNumber",
        max: 11,
        error: "",
        btnTitle: "获取验证码",
        disabled: true
    };

    @Provide() codeData: Object = {
        type: "text",
        placeholder: "验证码",
        value: "",
        name: "verifyCode",
        error: ""
    };

    @Provide() isSend: boolean = false;

    @Provide() reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;

    @Provide() loginDisabled = true;

    @Provide() verfiyCode = "";

    @Watch("phoneData.value", { immediate: true })
    phoneValueChange(val: any, oldVal: any): void {
        if (!val) {
            (this as any).loginDisabled = true;
        } else {
            (this as any).loginDisabled = false;
        }
        (this as any).phoneData.disabled = true;
        if (!(this as any).isSend) {
            if ((this as any).reg.test((this as any).phoneData.value)) {
                (this as any).phoneData.error = "";
                (this as any).phoneData.disabled = false;
            }
        }
    }
    @Watch("codeData.value", { immediate: true })
    codeValueChange(val: any, oldVal: any): void {
        if (val) {
            (this as any).codeData.error = "";
        }
    }

    //发送验证码
    sendCode() {
        const _this: any = this as any;
        _this.isSend = true;
        let time = 30;
        _this.phoneData.error = "";
        _this.phoneData.disabled = true;
        _this.phoneData.btnTitle = "已发送(" + time + ")";
        let timer = setInterval(() => {
            --time;
            _this.phoneData.btnTitle = "已发送(" + time + ")";
            if (time < 0) {
                clearInterval(timer);
                _this.phoneData.btnTitle = "重新获取";
                if (_this.reg.test(this.phoneData.value)) {
                    _this.phoneData.disabled = false;
                }
            }
        }, 1000);
        _this.$server.getVerifyCode(_this);
    }

    //登录
    login() {
        const _this: any = this as any;
        if (!_this.reg.test(_this.phoneData.value)) {
            _this.phoneData.error = "请输入正确的手机号";
        } else if (!_this.isSend) {
            _this.phoneData.error = "请获取验证码";
        } else if (!_this.codeData.value) {
            _this.codeData.error = "请输入验证码";
        } else if (_this.codeData.value != _this.verifyCode) {
            _this.codeData.error = "验证码错误";
        } else {
            _this.$server
                .login(_this, _this.phoneData.value, _this.codeData.value)
                .then((res: any) => {
                    let data = res.data;
                    if (data.code == 0) {
                        _this.$message({
                            message: data.msg,
                            type: "error"
                        });
                    } else if (data.code == 1) {
                        _this.$message({
                            message: data.msg,
                            type: "success"
                        });

                        localStorage.setItem("login_user", data.user);
                        _this.$router.push("/");
                    } else if (data.code == -1) {
                        _this.$message({
                            message: data.msg,
                            type: "warning"
                        });
                    }
                });
        }
    }
}
</script>
<style lang="scss">
@import "../style/mixin.scss";
#login {
    @include center;
    height: $height;
    .wrap {
        width: 3rem;
        height: 3.9rem;
    }
    & img {
        width: 1.3rem;
        height: 0.56rem;
    }
    .form {
        margin: 16px 0 0;

        & > div {
            margin-bottom: 16px;
        }

        .login-btn {
            width: $width;
            height: 0.42rem;
            margin: 30px 0 0;
            border: none;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
            outline: none;
            background: rgb(76, 217, 111);

            &:hover {
                cursor: pointer;
            }
        }

        .login-disabled {
            background: rgba(76, 217, 111, 0.6);
        }
    }
}
</style>