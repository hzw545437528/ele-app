<template>
    <div class="profile-panel">
        <h3 class="profile-paneltitle">
            <span>
                <slot name="title"></slot>
            </span>
        </h3>
        <slot name="content"></slot>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss">
.profile-panel {
    border: 1px solid #eee;
    background-color: #fff;
    min-height: 680px;
    padding: 20px 18px;
    text-align: left;
    .profile-paneltitle {
        border-bottom: 2px solid #f4f4f4;
        padding: 0 20px 11px;
        font-size: 18px;
        font-weight: 700;
    }
}
</style>