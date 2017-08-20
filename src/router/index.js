import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import WalletLayout from '@/components/wallet/Layout'
import WalletHome from '@/components/wallet/Home'
import WalletView from '@/components/wallet/View'

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
      component: WalletLayout,
      children: [
        {
          path: '',
          name: 'WalletHome',
          component: WalletHome
        },
        {
          path: 'categories',
          name: 'WalletCategories',
          component: WalletHome
        },
        {
          path: ':name',
          name: 'WalletView',
          component: WalletView,
          props: true
        }
      ]
    }
  ]
})
