import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Home from '@/components/Home'
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
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Keeps/:keepId',
      name: 'Keep',
      component: Keep
      },
      {
        path: '/Vaults/:vaultId',
        name: 'Vault',
        component: Vault
        },
  ]
})
