import {reqGetCode, reqRegister} from '@/api'


const state = {
    code:''
}
const mutations = {
    REQGETCODE(state,code){
        state.code = code
    }
}
const actions = {
    //获取验证码，接口问题，直接返回了验证码，正常情况发手机
    async reqGetCode({commit},phone){
        const result = await reqGetCode(phone)
        if(result.code===200){
            commit('REQGETCODE',result.data)
        }
    },
    async reqRegister(_,data){
        const result = await reqRegister(data)
        if(result.code===200){
            return 'OK'
        }else {
            return Promise.reject(new Error(result.message))
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