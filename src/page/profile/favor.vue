<template>
    <div id="profile-favor">
        <profile-panel>
            <template #title>我的收藏</template>
            <template #content>
                <div class="favor-restaurants">
                    <h4 class="favor-title">
                        当前区域共有
                        <span>0</span>
                        家可配送商家
                    </h4>
                    <div class="nodata">
                        <p class="nodata-container">暂无可配送商家</p>
                    </div>
                </div>
                <div class="favor-restaurants"></div>
                <div class="favor-restaurants">
                    <h4 class="favor-title">当前区域不可配送的商家</h4>
                    <div class="nodata">
                        <p class="nodata-container">暂无不可配送商家</p>
                    </div>
                </div>
                <div class="favor-restaurants"></div>
            </template>
        </profile-panel>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#profile-favor {
    // text-align: left;
    // border: 1px solid #eee;
    // background-color: #fff;
    // min-height: 680px;
    // padding: 20px 18px;
    .profile-title {
        border-bottom: 2px solid #f4f4f4;
        padding: 0 20px 11px;
        font-size: 18px;
        font-weight: 700;
    }
    .favor-restaurants {
        width: 970px;
        padding-left: 30px;
        margin-top: 30px;
        .favor-title {
            font-size: 14px;
            margin-bottom: 12px;
            span {
                color: red;
                margin: 0 1px;
            }
        }
        .nodata {
            padding-top: 50px;
            text-align: center;
            .nodata-container {
                display: inline-block;
                padding-left: 110px;
                line-height: 115px;
                background: url(/img/nodata.6477c5.png) no-repeat;
                color: #999;
            }
        }
    }
}
</style>