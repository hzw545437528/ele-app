<template>
    <div class="search-input">
        <input
            type="text"
            placeholder="搜索商家,美食..."
            :value="searchVal"
            @input="$emit('update:searchVal', $event.target.value)"
            autocomplete
        />
        <i class="el-icon-search" @click="$emit('search')"></i>
    </div>
</template>

<script>
export default {
    props: {
        searchVal: String
    }
};
</script>

<style lang="scss">
@mixin search_marin_padding {
    margin: 4px 0;
    padding: 0 8px;
    line-height: 24px;
}
.search-input {
    margin: 10px 0;
    position: relative;
    height: 32px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background: #fff;
    input {
        @include search_marin_padding;
        width: 236px;
        outline: none;
        border: none;
        transition: width 0.3s ease-in-out;
    }
    input:focus {
        width: 306px;
    }
    i {
        display: inline-block;
        @include search_marin_padding;
        width: 46px;
        box-sizing: border-box;
        text-align: center;
        font-size: 20px;
        vertical-align: middle;
        color: #999;
    }
    i:hover {
        color: #0089dc;
        cursor: pointer;
    }
}
</style>