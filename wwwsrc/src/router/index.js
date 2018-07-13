import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/login'
import Register from '@/components/Register'
import Keep from '@/component/Keep'
import Vault from '@/component/Vault'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },

    {
      path: '/Register',
      name: 'Register',
      component: Register
    },

    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/Keeps',
      name: 'Keep',
      component: Keep
    },

    {
      path: '/Vaults',
      name: 'Vault',
      component: Vault
    },
  ]
})
