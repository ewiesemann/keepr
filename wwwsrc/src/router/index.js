import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Home from '@/components/Home'
import Register from '@/components/Register'
// import Keep from '@/components/Keep'
// import Vault from '@/components/Vault'

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

    // {
    //   path: '/Keeps',
    //   name: 'Keep',
    //   component: Keep
    // },

    // {
    //   path: '/Vaults',
    //   name: 'Vault',
    //   component: Vault
    // },
  ]
})
