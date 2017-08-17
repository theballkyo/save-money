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
  facebookLoginRequest ({ commit }) {
    commit(types.AUTH_LOGIN_REQUEST)
    window.FB.login(response => {
      if (response.status === 'connected') {
        const profile = {
          fb_token: response.authResponse.accessToken,
          fb_uid: response.authResponse.userID
        }
        commit(types.AUTH_LOGIN_SUCCESS, { profile })
      } else {
        commit(types.AUTH_LOGIN_FAILURE)
      }
    }, {scope: 'email,user_friends', auth_type: 'rerequest'})
  },
  loginSuccess ({ commit }, profile) {
    commit(types.AUTH_LOGIN_SUCCESS, {profile})
  },
  loginFailure ({ commit }) {
    commit(types.AUTH_LOGIN_FAILURE)
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
  [types.AUTH_LOGIN_FAILURE] (state) {
    state.isLoggedIn = false
    state.loginStatus = 'failure'
  }
}

export default {
  state,
  actions,
  mutations
}
