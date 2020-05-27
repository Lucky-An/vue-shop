/* 
用于管理home的状态
*/
import {
    getBaseCategoryList,
    bannersList,
    floorsList
} from '@/api'
const state = {
    BaseCategoryList: [], //? 三级列表数据
    floors: [], //? 楼层数据
    banners: [] //? 轮播图数据
}
const mutations = {
    // * 将后台数据交给vuex管理
    SAVE_CATEGORY(state, category) {
        state.BaseCategoryList = category
    },
    // * 将楼层数据交给vuex管理
    SAVE_FLOORS(state, floors) {
        state.floors = floors
    },
    // * 将轮播图数据交给vuex管理
    SAVE_BANNERS(state, floors) {
        state.banners = floors
    }
}
const actions = {
    // * 请求接口拿到后台数据
    async getBaseCategoryListToState({
        commit
    }) {
        const result = await getBaseCategoryList()
        if (result.code === 200) {
            commit('SAVE_CATEGORY', result.data)
        }

    },
    // * 请求接口拿到楼层数据
    async getFloorsList({
        commit
    }) {
        const result = await floorsList()
        if (result.code === 200) {
            commit('SAVE_FLOORS', result.data)
        }
    },
    // * 请求接口拿到轮播图数据
    async getBannersList({
        commit
    }) {
        const result = await bannersList();
        if (result.code === 200) {
            commit('SAVE_BANNERS', result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}