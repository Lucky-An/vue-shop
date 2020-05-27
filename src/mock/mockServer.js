/* 
利用mockjs来定义mock接口
*/
import Mock from 'mockjs'
import banners from './banners.json' //! 自动解析为了js数组
import floors from './floors.json'

Mock.mock('/mock/banners', {
    code: 200,
    data: banners
})

Mock.mock('/mock/floors', {
    code: 200,
    data: floors
})


console.log("Mock服务启动，可以请求mock数据")
// ! 不需要向外暴露但是必须要执行一次     怎么执行？  在main.js中引入一次