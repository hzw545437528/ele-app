<template>
    <div id="location">
        <div class="location">
            <span>当前位置:</span>
            <span>
                <router-link to="/place" class="location-name">新大陆科技园</router-link>
            </span>
            <span>
                <a href="javascript:;">[切换地址]</a>
            </span>
            <span v-if="navName">
                <i class="el-icon-arrow-right"></i>
            </span>
            <span v-if="navName">{{navName}}</span>
        </div>
        <searchInput v-if="showSearch" @search="search" :searchVal.sync="searchVal"></searchInput>
    </div>
</template>

<script>
import searchInput from "./searchInput";
export default {
    props: {
        navName: String,
        showSearch: {
            type: Boolean
        }
    },
    data() {
        return {
            searchVal: ""
        };
    },
    methods: {
        search() {
            if (!this.searchVal) {
                return;
            }
            this.$router.replace({
                name: "search",
                params: { searchVal: this.searchVal }
            });
        }
    },
    watch: {
        $route(to, from) {
            if (
                to.name == "place" &&
                to.params.searchVal != undefined &&
                to.params.searchVal == ""
            ) {
                this.searchVal = "";
            }
        }
    },
    created() {
        let reg = /([^/]+)$/;
        let str = this.$route.path.match(reg)[1];
        if (this.$route.name == "search" && str) {
            this.searchVal = str;
        }
        // console.log(this.$route.path);
        // let arr = this.$route.path.split("/");
        // if (arr[2]) {

        // }
    },
    components: {
        searchInput
    }
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
@mixin search_marin_padding {
    margin: 4px 0;
    padding: 0 8px;
    line-height: 24px;
}
#location {
    @include flex;
    justify-content: space-between;
    align-items: center;
    height: 53.6px;

    .location {
        font-size: 12px;
        span {
            display: inline-block;
            margin-right: 6px;
            line-height: 53.6px;
        }

        & span:nth-child(1) {
            color: #999999;
        }
        & span:nth-child(2) a {
            color: #333333;
        }
        & span:nth-child(3) a {
            color: #0089dc;
        }
        & span:nth-child(4) i {
            font-weight: bold;
        }
        .location-name:hover {
            color: #0089dc;
        }
    }

    .place-search {
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
}
</style>