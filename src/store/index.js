import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/auth'
import wallet from './modules/wallet'
// import createPersistedState from 'vuex-persistedstate'
// import * as types from './mutations'
const debug = process.env.NODE_ENV !== 'production'
// const KEY = 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  //
  modules: {
    app,
    auth,
    wallet
  },
  // plugins: [createPersistedState()],
  strict: debug
})
