import {
    reqDetailInfo
} from '@/api'

const state = {
    detailInfo: {} //商品详情信息
}

const mutations = {
    /* 
        接收商品详情信息
    */
    RECEIVE_DETAIL_INFO(state, detailInfo) {
        state.detailInfo = detailInfo
    },
    // 修改选中状态
    UPDATE_DETAIL_INFO(state, params) {
        const attrList = state.detailInfo.spuSaleAttrList
        for (let i = 0; i < attrList.length; i++) {
            if (attrList[i].id === params.params1) {
                for (let j = 0; j < attrList[i].spuSaleAttrValueList.length; j++) {
                    attrList[i].spuSaleAttrValueList[j].isChecked = '0';
                    if (attrList[i].spuSaleAttrValueList[j].id === params.params2) {
                        attrList[i].spuSaleAttrValueList[j].isChecked = '1';
                    }
                }
            }
        }
        state.detailInfo.spuSaleAttrList = attrList
    }
}

const actions = {
    /* 
        获取指定商品信息
    */
    async getDetailInfo({
        commit
    }, skuId) {
        const result = await reqDetailInfo(skuId)
        if (result.code === 200) {
            commit('RECEIVE_DETAIL_INFO', result.data)
        }
    },
    // 修改选中商品属性
    setSaleAttrValueList({
        commit
    }, params) {
        commit('UPDATE_DETAIL_INFO', params)
    }
}

const getters = {
    // 返回三级分类名称的对象
    categoryView(state) {
        const categoryView = state.detailInfo.categoryView
        return categoryView ? categoryView : {}
    },
    // 返回商品sku相关对象
    skuInfo(state) {
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo ? skuInfo : {}
    },
    // 返回商品的轮播图片数组
    skuImageList(state) {
        const skuInfo = state.detailInfo.skuInfo
        const skuImageList = skuInfo ? skuInfo.skuImageList : []
        console.log("调用了mapgetters中的轮播图数组")
        console.log(skuImageList)
        return skuImageList
    },
    // 返回商品销售属性列表
    spuSaleAttrList(state) {
        const spuSaleAttrList = state.detailInfo.spuSaleAttrList
        return spuSaleAttrList ? spuSaleAttrList : []
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}