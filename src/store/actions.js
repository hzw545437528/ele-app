const actions = {
    setUser({ state, commit }, user) {
        commit("SET_USER", user);
    },
    setShopType({ commit }, shopType) {
        commit("SET_SHOPTYPE", shopType);
    },
    setShopType_1({ commit }, shopType_1) {
        commit("SET_SHOPTYPE_1", shopType_1);
    },
    setNavName({ commit }, navName) {
        commit("SET_NAVNAME", navName);
    },
    setShowLocation({ commit }, showLocation) {
        commit("SET_SHOWLOCATION", showLocation);
    },
    setShoplayout({ commit }, shoplayout) {
        commit("SET_SHOPLAYOUT", shoplayout);
    },
    setShowMask({ commit }, showMask) {
        commit("SET_SHOWMASK", showMask);
    },
    setShopInfo({ commit }, shopInfo) {
        commit("SET_SHOPINFO", shopInfo);
    },
    setShop({ commit }, shop) {
        commit("SET_SHOP", shop);
    }
};
export default actions;
//# sourceMappingURL=actions.js.map