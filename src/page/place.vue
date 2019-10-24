<template>
    <div id="place">
        <header class="header">
            <div class="location">
                <span>当前位置</span>
                <span>
                    <router-link to="/place">新大陆科技园</router-link>
                </span>
                <span>
                    <a href="javascript:;">[切换地址]</a>
                </span>
            </div>
            <div class="place-search">
                <input type="text" placeholder="搜索商家,美食..." />
                <i class="el-icon-search"></i>
            </div>
        </header>
        <div class="to-take">
            <div class="img">
                <img src="../images/takeout.408a87.png" alt />
            </div>
        </div>
        <div class="shop-type-wrap">
            <div class="excavator-filter">
                <span class="excavator-filter-name type-title">商家分类:</span>
                <a href="javascript:" class="all-shop type-title">全部商家</a>
                <a
                    href="javascript:"
                    class="types type-title"
                    v-for="(item, index) in type_1"
                    :key="index"
                >{{item}}</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "place",
    data() {
        return {
            type_1: [],
            type_2: []
        };
    },
    methods: {
        getShopType() {
            this.$server.getShopType(this).then(res => {
                let data = res.data;
                data.forEach(item => {
                    if (this.type_1.indexOf(item.type_1) == -1) {
                        this.type_1.push(item.type_1);
                    }
                });
            });
        }
    },
    created() {
        this.getShopType();
    }
};
</script>

<style lang="scss">
@import "../style/mixin.scss";

@mixin search_marin_padding {
    margin: 4px 0;
    padding: 0 8px;
    line-height: 24px;
}

* {
    box-sizing: border-box;
}

#place {
    width: 1180px;
    margin: 0 auto;

    .header {
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
            & span:nth-child(2) {
                color: #333333;
            }
            & span:nth-child(3) a {
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

    .to-take {
        text-align: right;
        border-bottom: 1px solid #e6e6e6;
        .img {
            margin-bottom: 6px;
            width: 186px;
            height: 42px;
            display: inline-block;
            cursor: pointer;
            img {
                width: 186px;
                height: 55px;
                vertical-align: middle;
            }
        }
    }
    .shop-type-wrap {
        border: 1px solid #e6e6e6;
        text-align: left;
        .type-title {
            padding: 0 10px;
            margin-right: 8px;
        }
        .excavator-filter {
            line-height: 26px;
            padding: 10px 10px 10px 98px;
            background-color: #fff;
            position: relative;
            a {
                color: #666666;
                font-size: 14px;
            }
            .types {
                white-space: nowrap;
                display: inline-block;
                margin: 5px 6px;
            }
            .types:hover {
                background-color: #f6f6f6;
                border-radius: 3px;
            }

            .all-shop {
                display: inline-block;
                line-height: 36px;
                background-color: #f6f6f6;
                border-radius: 0;
                margin: 0;
                padding: 0 16px;
                height: 38px;
            }
        }
        .excavator-filter-name {
            position: absolute;
            top: 13px;
            left: 10px;
            font-size: 14px;
            color: #999999;
        }
    }
}
</style>