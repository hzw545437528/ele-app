import { ActionTree } from "vuex";

const actions: ActionTree<any, any> = {
    setUser({ state, commit }, user: any) {
        commit("SET_USER", user)
    },
    setShopType({ commit }, shopType: any) {
        commit("SET_SHOPTYPE", shopType)
    },
    setShopType_1({ commit }, shopType_1: any) {
        commit("SET_SHOPTYPE_1", shopType_1)
    },
    setNavName({ commit }, navName: any) {
        commit("SET_NAVNAME", navName)
    },
    setShowLocation({ commit }, showLocation: any) {
        commit("SET_SHOWLOCATION", showLocation)
    }
}
export default actions;