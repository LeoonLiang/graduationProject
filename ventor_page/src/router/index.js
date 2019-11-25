import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login/index.vue'
import Index from '@/views/Index/index.vue'
import newbusiness from '@/views/newbusiness/index.vue'
import IndexPage from '@/components/pages/Index/index.vue'
import PMpage from '@/components/pages/PMpage/index.vue'
import Order from '@/components/pages/Order/index.vue'



Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path:'/',
          name:'IndexPage',
          component:IndexPage
        },
        {
          path:'PMpage',
          name:'PMpage',
          component:PMpage
        },
        {
          path:'Order',
          name:'Order',
          component:Order
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/newbusiness',
      name: 'newbusiness',
      component: newbusiness
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  if(to.path === '/login') {
    return next()
  }

  const token = localStorage.getItem('token')

  if(token) {
        next()
  }else {
    alert("您还未登录，点击确定跳转至登录")
    next('/login')
  }
})

export default router