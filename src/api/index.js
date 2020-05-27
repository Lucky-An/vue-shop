import http from './http'
import mockAjax from './mockAjax'
// 请求三级分类接口 /api/product/getBaseCategoryList
export const getBaseCategoryList = () => {
    return http('/product/getBaseCategoryList')
}

// * 请求商品接口
export const getProductList = (searchParams) => {
    //函数体
    return http.post('/list', searchParams)
}
// getProductList({})
// 登陆接口 /api/user/passport/login

export const UserLogin = (data) => {
    return http({
        url: '/user/passport/login',
        method: 'POST',
        data
    })
}

export const reqDetailInfo = (skuId) => http.get(`/item/${skuId}`)
// 添加到购物车
export const reqAddToCart = (skuId, skuNum) => http.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车列表
export const reqCartList = () => http.get(`/cart/cartList`)
// 切换购物项的选中状态
export const reqCheckCartItem = (skuID, isChecked) => http.get(`/cart/checkCart/${skuID}/${isChecked}`)
// 删除购物车中的商品
export const reqDeleteCartItem = (skuID) => http.delete(`/cart/deleteCart/${skuID}`)


/*
?  以下是专门针对mock的接口请求
*/

export const bannersList = () => { //* 请求banners数据
    return mockAjax.get('/banners')
}

export const floorsList = () => {
    //函数体
    return mockAjax.get('/floors')
}


/*
?  以上是专门针对mock的接口请求
*/
// getProductDetail(30).then().catch()