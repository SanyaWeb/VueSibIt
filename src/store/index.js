import Vue from 'vue'
import Vuex from 'vuex'
import sumInv from "./sumInv"
import mult from "./mult"
import limitTypes from "./limitTypes"
import takeProfit from "./takeProfit"
import stopLoss from "./stopLoss"
import buttons from "./buttons"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        sumInv, mult, limitTypes, takeProfit, stopLoss, buttons
    }
})