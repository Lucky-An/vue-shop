import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

export default [{
        path: '/',
        component: Home
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/login',
        component: Login,
        meta: {
            isFooterHide: true
        }
    }, {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail
    }, {
        name: 'addCartSuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess
    }, {
        name: 'shopCart',
        path: '/shopcart',
        component: ShopCart
    }
]