<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    methods: {
        //单个商品总价
        itemPrice(commondity) {
            return parseFloat(
                (commondity.pieces * commondity.price).toFixed(2)
            );
        },
        //修改商品数量
        itemNum(operate, commondity) {
            let i = 0,
                exist = this.shopcart.goods.some((item, index) => {
                    if (commondity == item) {
                        i = index;
                        return true;
                    }
                    return false;
                });
            if (exist) {
                if (operate == "add") {
                    this.shopcart.goods[i].pieces++;
                } else if (operate == "reduce") {
                    if (this.shopcart.goods[i].pieces > 1) {
                        this.shopcart.goods[i].pieces--;
                    } else {
                        this.shopcart.goods.splice(i, 1);
                        this.$nextTick(() => {
                            let height = this.cmpheight();
                            this.cartHeight = height;
                        });
                    }
                }
            }
            if (this.shopcart.goods.length == 0) {
                localStorage.removeItem("shopCart");
            } else {
                let shopCart = {
                    shopName: this.$store.getters.shopInfo.shop_name,
                    cartInfo: this.shopcart
                };
                localStorage.setItem(this.shopName, JSON.stringify(shopCart));
                // console.log(localStorage["shopCart"]);
            }
        }
    }
};
</script>

<style>
</style>