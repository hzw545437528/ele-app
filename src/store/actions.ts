import { ActionTree } from "vuex";

const action: ActionTree<any, any> = {
    setUser({state, commit}, user: any) {
        commit("SET_USER", user)
    }
}