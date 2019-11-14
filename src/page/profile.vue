<template>
    <div id="profile">
        <OrderBar></OrderBar>
        <router-view></router-view>
    </div>
</template>

<script>
import OrderBar from "../components/common/OrderBar.vue";
export default {
    components: {
        OrderBar
    }
};
</script>

<style>
</style>