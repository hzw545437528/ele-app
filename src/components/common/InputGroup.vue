<template>
    <div id="input-group">
        <!-- 组件结构 -->
        <!-- 组件容器 -->
        <div class="input-wrap" :class="{'is-invalid': inputData.error }">
            <input
                :type="inputData.type"
                :placeholder="inputData.placeholder"
                :value="inputData.value"
                :name="inputData.name"
                :maxlength="inputData.max"
                autocomplete="off"
                @input="$emit('input', $event.target.value)"
            />
            <!-- 输入框后面的按钮 -->
            <button
                v-if="inputData.btnTitle"
                :disabled="inputData.disabled"
                :class="{'is-disabled': !inputData.disabled}"
                @click="$emit('btnClick')"
            >{{inputData.btnTitle}}</button>
        </div>
        <!-- 错误提醒 -->
        <div v-if="inputData.error" class="invalid-feedback">{{inputData.error}}</div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
@Component({})
export default class InputGroup extends Vue {
    @Prop({
        type: Object
    })
    inputData!: Object;
}
</script>

<style lang="scss">
@import "../../style/mixin.scss";
#input-group {
    .input-wrap {
        position: relative;
        height: 0.48rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }
    input,
    button {
        border: none;
        outline: none;
        padding: 0;
        border-radius: 5px;
    }

    input {
        height: 0.48rem;
        width: $width;
        text-indent: 15px;
    }

    button {
        position: absolute;
        line-height: 0.4rem;
        right: 0.01rem;
        top: 0.04rem;
        width: 40%;
        font-size: 14px;
        font-weight: bold;
        background: #fff;
        color: rgba(0, 0, 0, 0.3);
    }

    .is-invalid {
        border: 1px solid red;
    }

    .invalid-feedback {
        margin-top: 10px;
        text-indent: 14px;
        text-align: left;
        color: red;
    }
    .is-disabled {
        color: #2395ff;
    }
}
</style>