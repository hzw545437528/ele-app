<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    created() {
        window.addEventListener("beforeunload", () => {
            console.log(1);
            localStorage.setItem(
                "messageStore",
                JSON.stringify(this.$store.state)
            );
        });
        localStorage.getItem("messageStore") &&
            this.$store.replaceState(
                Object.assign(
                    this.$store.state,
                    JSON.parse(localStorage.getItem("messageStore"))
                )
            );
    }
};
</script>
<style lang="scss">
@import "./style/mixin.scss";

#app {
    width: $width;
    height: $height;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333333;
}
</style>
