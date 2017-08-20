import * as types from '../mutations'

const state = {
  titleBar: 'App title bar name'
}

const actions = {
  setTitleBar ({ commit }, name) {
    commit(types.APP_SET_TITLE_BAR, { name })
  }
}

const mutations = {
  [types.APP_SET_TITLE_BAR] (state, { name }) {
    state.titleBar = name
  }
}

export default {
  state,
  actions,
  mutations
}
