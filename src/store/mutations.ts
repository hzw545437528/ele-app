import { MutationTree } from "vuex";


const mutations: MutationTree<any> = {
    SET_USER(state: any, user: any): void {
        state.user = user
    },
    SET_SHOPTYPE(state: any, shopType: any): void {
        state.shopType = shopType
    },
    SET_SHOPTYPE_1(state: any, shopType_1: any): void {
        state.shopType_1 = shopType_1
    },
    SET_NAVNAME(state: any, navName: any): void {
        state.navName = navName
    },
    SET_SHOWLOCATION(state: any, showLocation: any): void {
        state.showLocation = showLocation
    },
    SET_SHOPLAYOUT(state: any, shoplayout: any): void {
        state.shoplayout = shoplayout
    }
}

export default mutations