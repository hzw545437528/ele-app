import { GetterTree } from 'vuex';

const getters: GetterTree<any, any> = {
    user(state: any): any {
        return state.user
    },
    shopType(state: any): any {
        return state.shopType
    },
    shopType_1(state: any): any {
        return state.shopType_1
    },
    navName(state: any): any {
        return state.navName
    },
    showLocation(state: any): any {
        return state.showLocation
    },
    shoplayout(state: any): any {
        return state.shoplayout
    },
    showMask(state: any): Boolean {
        return state.showMask
    },
    shopInfo(state: any) {
        return state.shopInfo
    },
    shop(state: any) {
        return state.shop
    }
}

export default getters