<template>
    <div id="search">
        <div class="search-shop-wrap">
            <table class="shop-wrap">
                <tbody>
                    <tr>
                        <th colspan="4">
                            <h4>
                                <a href="javascript:">一点点(东方名城店)</a>
                                <div class="rstblock-activity">
                                    <i>保</i>
                                </div>
                            </h4>
                            <el-rate
                                v-model="value5"
                                disabled
                                text-color="#ff9900"
                                score-template="{value}"
                            ></el-rate>
                            <small></small>
                            <small class="ng-scope">
                                平均
                                <span class="highlight">31</span>分钟送达
                            </small>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <a href="javascript:">
                                <span>(大杯)波霸奶茶</span>
                                <br />
                            </a>
                        </td>
                        <td class="col search-col2">￥ 13</td>
                        <td class="col search-col3">
                            <a href="javascript:" class="btn">去购买</a>
                        </td>
                        <td class="search-col4">
                            <el-rate
                                v-model="value5"
                                disabled
                                text-color="#ff9900"
                                score-template="{value}"
                            ></el-rate>
                            <div>月售124份</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            本商家还有
                            <strong class="highlight num-padding">17</strong>
                            份相关美食，
                            <a
                                class="search-foodtable-showmore"
                                href="JavaScript:"
                            >
                                显示全部相关美食
                                <i class="el-icon-arrow-down"></i>
                            </a>
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
            value5: 3.0
        };
    }
};
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}
#search {
    margin-top: 15px;
    text-align: left;
    width: 1180px;
    margin: 0 auto;

    .shop-wrap {
        margin: 0;
        padding: 0;
        width: 100%;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        background: #ffffff;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 14px;
        th {
            padding: 7px 14px;
            color: #333333;
            border: 1px solid #ddd;
            background: #f9f9f9;
            h4 {
                margin: 0;
                padding: 0 0 5px 0;

                a {
                    font-size: 1.2em;
                    color: #333333;
                }
                i {
                    display: inline-block;
                    box-sizing: border-box;
                    font-style: normal;
                    vertical-align: middle;
                    color: #fff;
                    font-style: normal;
                    font-size: 12px;
                    line-height: 16px;
                    overflow: hidden;
                    text-align: center;
                    width: 18px;
                    border-radius: 2px;
                    margin-right: 3px;
                    padding: 1px;
                    background: rgb(153, 153, 153);
                    white-space: nowrap;
                }
                .rstblock-activity {
                    display: inline-block;
                    margin-left: 5px;
                    margin-top: 0;
                    position: relative;
                    top: -3px;
                }
            }

            & > small {
                margin-right: 10px;
                padding-left: 10px;
                margin-left: 2px;
                border-left: 1px solid #ddd;
            }
            .ng-scope {
                font-size: 0.9em;
                color: #888888;
                font-style: normal;
                font-weight: 400;

                span {
                    padding: 0 3px;
                }
            }
        }

        .el-rate {
            display: inline-block;
            i {
                font-size: 16px;
            }

            .el-rate__icon {
                margin-right: 0;
            }
        }

        td {
            padding: 12px 14px;
            border: 0;
            border-top: 1px solid #f5f5f5;

            a {
                color: #333333;
            }
        }

        .col {
            text-align: center;
        }

        .search-col2 {
            width: 100px;
        }
        .search-col3 {
            width: 160px;
            .btn {
                font-size: 14px;
                background-color: #0080d9;
                padding: 7px 30px;
                color: #fff;
            }
        }
        .search-col4 {
            width: 130px;
        }

        .highlight {
            color: #ff8800;
        }

        .num-padding {
            padding: 0 3px;
        }

        .search-foodtable-showmore {
            color: #0089dc;
        }
    }
}
</style>