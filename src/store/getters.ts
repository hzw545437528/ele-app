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
    }
}

export default getters