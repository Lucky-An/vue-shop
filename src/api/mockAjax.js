/* 
?    专门针对mock数据的请求
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/


import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//? 配置nprogress
nprogress.configure({
    showSpinner: true //? 右上角旋转进度条
})

// *进行基础配置
const mockAjax = axios.create({
    baseURL: '/mock', //? 基础路径前缀配置
    timeout: 2000, //? 超时时间配置

});
// * 配置请求拦截器
mockAjax.interceptors.request.use((config) => {
    nprogress.start(); //? 开启进度条
    return config //! 必须返回config
})

// * 配置响应拦截器
mockAjax.interceptors.response.use(
    // ? 成功的拦截处理
    value => {
        //? 隐藏进度条
        nprogress.done();
        return value.data
    },
    // ? 失败的拦截处理
    err => {
        //? 隐藏进度条
        nprogress.done();
        alert(err.message)
        return new Promise(() => {})
        // return Promise.reject(err.message)  //? 常规处理不终端promise链
    }
)


export default mockAjax