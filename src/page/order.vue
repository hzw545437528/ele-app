<template>
    <div>
        <OrderBar></OrderBar>
        <router-view></router-view>
    </div>
</template>
<script>
import OrderBar from "../components/common/OrderBar.vue";
export default {
    components: {
        OrderBar
    },
    created() {
        this.$store.dispatch("setNavName", "近三个月订单");
    }
};
</script>
<style>
</style>