<template>
    <div id="login">
        <div>
            <img src="//shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png" class />
        </div>
        <div class="form">
            <div>
                <InputGroup
                    v-model="phoneData.value"
                    :inputData="phoneData"
                    @input="checkPhone"
                    @btnClick="sendCode"
                ></InputGroup>
            </div>
            <div>
                <InputGroup :inputData="codeData"></InputGroup>
            </div>
            <button class="login-btn">登录</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
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

    checkPhone(): void {
        let reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if (reg.test(this.phoneData.value)) {
            this.phoneData.disabled = false;
        } else {
            this.phoneData.disabled = true;
        }
    }
    //发送验证码
    sendCode() {
        this.isSend = true;
    }
}
</script>
<style lang="scss">
@import "../style/mixin.scss";
#login {
    width: 3rem;
    height: 3.9rem;
    & img {
        width: 1.3rem;
        height: 0.56rem;
    }
    .form {
        margin: 16px 0 0;

        div {
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
            background: #4cd96f;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>