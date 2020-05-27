/* 
用于管理user的状态
*/

import {
    getUUID
} from '@/untils/storageUntils'

const state = {
    userInfo: {}, //用户信息对象
    userTempId: getUUID()
}
const mutations = {}
const actions = {}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}