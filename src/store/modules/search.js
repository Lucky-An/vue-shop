import {
    getProductList
} from '@/api'

const state = {
    productList: {}
}

const mutations = {
    SAVE_PRODUCT_LIST(state, productList) {
        state.productList = productList
    }
}

const actions = {
    async getProductListTostate({
        commit
    }, searchParms) {
        const result = await getProductList(searchParms)
        if (result.code === 200) {
            commit('SAVE_PRODUCT_LIST', result.data)
        }
    }
}

const getters = {
    // * 品牌列表
    trademarkList(state) {
        return state.productList.trademarkList || []
    },
    // * 属性列表
    attrsList(state) {
        return state.productList.attrsList || []
    },
    // * 商品列表
    goodsList(state) {
        return state.productList.goodsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}