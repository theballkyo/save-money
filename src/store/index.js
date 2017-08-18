import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import wallet from './modules/wallet'
import createPersistedState from 'vuex-persistedstate'
// import * as types from './mutations'
const debug = process.env.NODE_ENV !== 'production'
const KEY = 'vuex'
Vue.use(Vuex)

// Reset state
let item = JSON.parse(window.localStorage.getItem(KEY))

item.wallet.failureMsg = ''

window.localStorage.setItem(KEY, JSON.stringify(item))

export default new Vuex.Store({
  //
  modules: {
    auth,
    wallet
  },
  plugins: [createPersistedState()],
  strict: debug
})
