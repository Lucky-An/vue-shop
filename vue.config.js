module.exports = {
    lintOnSave: false, //直接关闭eslint检查
    devServer: {
        proxy: {
            '/api': { //! 之处理/api 开头的请求
                target: 'http://182.92.128.115', //! 转发目标地址
                changeOrigin: true //! 支持跨域
            }
            //     ,
            //   '/foo': {
            //     target: '<other_url>'
            //   }
        }
    }
}