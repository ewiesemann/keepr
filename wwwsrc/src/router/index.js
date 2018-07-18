import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import login from '@/components/login'
// @ts-ignore
import Home from '@/components/Home'
// @ts-ignore
import Register from '@/components/Register'
// @ts-ignore
import Profile from '@/components/Profile'
// @ts-ignore
import MyVault from '@/components/MyVault'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },

    {
      path: '/Register',
      name: 'Register',
      component: Register
    },

    {
      path: '/Home',
      name: 'Home',
      component: Home
    },

    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },

    {
      path: '/MyVault',
      name: 'MyVault',
      component: MyVault
    }
  ]
})
