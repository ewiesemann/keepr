import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from '@/components/Home'
// @ts-ignore
import login from '@/components/login'
// import Keep from '@/component/Keep'
// import Vault from '@/component/Vault'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },

    {
      path: '/',
      name: 'Home',
      component: Home
    },

    // {
    //   path: '/Keeps/:keepId',
    //   name: 'Keep',
    //   component: Keep
    // },

    // {
    //   path: '/Vaults/:vaultId',
    //   name: 'Vault',
    //   component: Vault
    // },
  ]
})
