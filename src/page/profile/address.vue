<template>
    <div id="profile-address">
        <profile-panel>
            <template #title>地址管理</template>
            <template #content>
                <ul class="desktop-addresslist">
                    <li class="desktop-addressitem" v-for="(item, index) in 4" :key="index">
                        <h3 class="name">
                            黄
                            <span class="gender">先生</span>
                        </h3>
                        <p class="address">新大陆科技园&nbsp;新大陆科技园</p>
                        <p class="mobile">13205010696</p>
                        <div class="btn-group">
                            <button class="btn">修改</button>
                            <button class="btn">删除</button>
                        </div>
                    </li>
                    <li class="desktop-addressitem addaddress">
                        <i class="el-icon-plus"></i>
                        添加新地址
                    </li>
                </ul>
            </template>
        </profile-panel>
    </div>
</template>


<script>
export default {};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.desktop-addresslist {
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding-top: 15px;
    .desktop-address {
        &item {
            width: 300px;
            position: relative;
            padding: 16px 20px;
            color: #666666;
            margin: {
                bottom: 15px;
                right: 35px;
            }
            border: 1px solid #ddd;
            height: 110px;
            &:nth-child(3n) {
                margin-right: 0;
            }
            h3 {
                font-size: 14px;
                margin-bottom: 10px;
                padding-right: 60px;
                span {
                    margin-left: 5px;
                }
            }
            .name,
            .address,
            .mobile {
                height: 22px;
                line-height: 22px;
                cursor: default;
                vertical-align: middle;
                @include ui-ellipsis;
            }

            .btn-group {
                position: absolute;
                right: -6px;
                top: 6px;
                .btn {
                    font-size: 12px;
                    color: #bbb;
                    border: 0;
                    background: 0 0;
                    cursor: pointer;
                }
            }
            &.addaddress {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #fcfcfc;
                color: #999;
                cursor: pointer;
                i {
                    margin-right: 10px;
                    font-weight: 700;
                }
            }
            &:hover {
                border: 1px solid #0089dc;
                .btn,
                &.addaddress {
                    color: #0089dc;
                }
            }
        }
    }
}
</style>