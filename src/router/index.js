import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Wallet from '@/components/wallet/Layout'
import WalletHome from '@/components/wallet/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/wallet',
      component: Wallet,
      children: [
        {
          path: '/',
          name: 'WalletHome',
          component: WalletHome
        },
        {
          path: '/:id',
          name: 'Wallet'
        }
      ]
    }
  ]
})
