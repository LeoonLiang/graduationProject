import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
const state={
    uid:null,
    token:undefined
}
export default new Vuex.Store({
    state,
    mutations: {
        saveToken(state,key) {
            state.token  = key.token;
            state.uid = key.uid;
            // state.exist = key.exist
        }
    }
})