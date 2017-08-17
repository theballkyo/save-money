import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import wallet from './modules/wallet'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  //
  modules: {
    auth,
    wallet
  },
  strict: debug
})
