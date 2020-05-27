/* 
! 管理购物车模块
*/
import {
    reqAddToCart,
    reqCartList,
    reqCheckCartItem,
    reqDeleteCartItem
} from '@/api'
/* 
用于管理user的状态
*/

const state = {
    cartList: []
}
const mutations = {
    RECEIVE_CART_LIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 设置购物项的选中状态
    checkCartItem({
        commit
    }, obj) {
        console.log(obj.skuId, obj.checked)
        const result = reqCheckCartItem(obj.skuId, obj.checked)
        // if (result.code !== 200) {
        //     throw new Error("切换选中状态失败")
        // }
        return result
    },
    //删除购物项
    async deleteCartItem({
        commit
    }, skuId) {
        const result = await reqDeleteCartItem(skuId);
        // if (result.code === 200) {

        // } else {

        // }
        // return result.code === 200 ? '' : result.message || '删除购物项失败'
        return result
    },
    // 获取购物车列表
    async getCartList({
        commit
    }) {
        const result = await reqCartList();
        if (result.code === 200) {
            const cartList = result.data
            commit('RECEIVE_CART_LIST', cartList)
        }
    },

    // 添加到购物车
    async addToCartVuex({
        commit
    }, {
        skuId,
        skuNum
    }) {
        const result = await reqAddToCart(skuId, skuNum)
        return result.code === 200 ? result : Promise.reject(result.message)
    }
}
const getters = {
    // 总价格
    totalCount(state) {
        let total = 0;
        state.cartList.forEach(item => {
            if (item.isChecked) {
                total += item.skuNum
            }
        });
        return total;
    },
    // 总数量
    totalPrice(state) {
        let totalPrice = 0;
        state.cartList.forEach(item => {
            if (item.isChecked) {
                totalPrice += item.skuNum * item.skuPrice
            }
        });
        return totalPrice
    },
    // 是否全选
    isAllChecked(state) {
        if (state.cartList.length === 0) {
            return false
        }
        return state.cartList.every(value => value.isChecked === 1)
        // return true
    },
    // 所有选中的购物项组成的数组
    checkedCartItems(state) {
        // console.log(state.cartList.filter((item) => {
        //     item.isChecked === 1
        // }))
        let arr = []
        if (state.cartList.length > 0) {
            arr = state.cartList.filter((item) => item.isChecked > 0)
        }
        return arr


    }
}

export default {
    state,
    mutations,
    actions,
    getters
}