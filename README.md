###  项目运行用npm run dev

## 如果要关闭eslint的某个规则校验   去到 package.json的 rule中配置  off关闭
如  
"rules":{
    "no-irregular-whitespace":"off"
}


##  也可以通过配置vue.config.js 来搞定

## 引入less less-loader

## 搭建路由

## Header组件搭建

### 在当前路由通过编程式导航跳转到当前路由会出错
#### 解决办法1 this.$router.push()  方法给两个参数   第一个参数为跳转地址   第二个参数为成功回调就可以解决这个问题
```javascript
this.$router.push("/search", () => {
        //函数体
});
```

解决办法2：修正vueRouter原型上的push和replace方法

```javascript
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(loaction,onComplete,onAbort){
	return originPush.call(this,loaction,onComplete,onAbort).catch(()=>{})
}
```

##  两种路由传递query参数方式

```javascript
this.$router.push(
        {
          path: "/search",
          query: {
            keywords: this.keywords
          }
        }
      );
```

```javascript
this.$router.push(`/search?keywords=${this.keywords}`)
```

##  路由传递params参数

####  路由传递params参数需要先在`routes.js`中为params添加占位符

```javascript
    {
        path: '/search/:keywords？',//问号代表params参数可传可不传
        component: Search
    }
```

 ```javascript
this.$router.push(`/search/${this.keywords}`);
 ```

```javascript
      this.$router.push(
        {
          name: "Search",
          params: {
            keywords: this.keywords
          }
        }
      );
```



###  **注意：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：**

也就是说下面这种写法是错误的,因为params会被忽略

```javascript
this.$router.push({path:'/search',params:{keywords: this.keywords}})
```

##  解决部分界面不需要显示Footer组件的问题

###  借用$route的meta属性

```javascript
{
        path: '/login',
        component: Login,
        meta: {
            isFooterHide: true
        }
 }
```

```html
<template>
  <div>
    <Header></Header>
    <!-- 一级路由显示区域 -->
    <router-view></router-view>
    <Footer v-if="!$route.meta.isFooterHide"></Footer>
  </div>
</template>
```

##  拆分Home组件

##  封装axios

1. 基本配置
2. 请求拦截器
3. 响应拦截器

##  根据vue-cli文档`devServer`在`vue.config.js`中配置服务器地址以及跨域相关

```javascript
    devServer: {
        proxy: {
            '/api': { //! 之处理/api 开头的请求
                target: 'http://182.92.128.115', //! 转发目标地址
                changeOrigin: true //! 支持跨域
            }
        }
    }
```

## 解决一个小问题：跳转search路由时选择name和params组合，当params为空串时出现问题

###  解决方案：判断参数是否有值

##  vuex多模块编程

##  引入lodash实现函数节流

##  实现lodash按需加载

