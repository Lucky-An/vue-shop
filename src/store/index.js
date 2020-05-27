/* 
vuex最核心的管理对象
*/

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import home from './modules/home'
import user from './modules/user'
import search from './modules/search'
import detail from './modules/detail'
import shopCart from './modules/shopCart'

Vue.use(Vuex)


export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules: {
        home,
        user,
        search,
        detail,
        shopCart
    }
})