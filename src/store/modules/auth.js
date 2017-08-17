import * as types from '../mutations.js'

const state = {
  isLoggedIn: false,
  loginStatus: null,
  profile: null
}

const actions = {
  loginRequest ({ commit }) {
    commit(types.AUTH_LOGIN_REQUEST)
  },
  loginSuccess ({ commit }, profile) {
    commit(types.AUTH_LOGIN_SUCCESS, {profile})
  }
}

const mutations = {
  [types.AUTH_LOGIN_REQUEST] (state) {
    state.isLoggedIn = false
    state.loginStatus = 'request'
    state.profile = null
  },
  [types.AUTH_LOGIN_SUCCESS] (state, { profile }) {
    state.isLoggedIn = true
    state.loginStatus = null
    state.profile = {...profile}
  },
  [types.AUTH_LOGIN_FAIL] (state) {
    state.isLoggedIn = false
    state.loginStatus = 'fail'
  }
}

export default {
  state,
  actions,
  mutations
}
