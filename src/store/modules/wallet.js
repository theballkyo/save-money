import * as types from '../mutations'
import storage from '@/utils/storage'

const state = {
  wallet: storage.getItem('wallet.wallet', {}),
  createStatus: null,
  failureMsg: ''
}

const actions = {
  createWallet ({ commit, state }, name) {
    if (name === '') {
      const failureMsg = `Name can't emtry`
      commit(types.WALLET_CREATE_FAILURE, { failureMsg })
      return
    }
    commit(types.WALLET_CREATING)
    if (state.wallet[name]) {
      const failureMsg = `Name is same`
      commit(types.WALLET_CREATE_FAILURE, { failureMsg })
    } else {
      commit(types.WALLET_CREATE, { name })
      commit(types.WALLET_CREATE_SUCCESS)
    }
  }
}

const mutations = {
  [types.WALLET_CREATE] (state, {name}) {
    state.wallet = {...state.wallet, [name]: {createdAt: new Date(), statements: []}}
    window.localStorage.setItem('wallet.wallet', JSON.stringify(state.wallet))
  },
  [types.WALLET_CREATE_SUCCESS] (state) {
    state.createStatus = 'success'
  },
  [types.WALLET_CREATE_FAILURE] (state, { failureMsg }) {
    state.failureMsg = failureMsg
    state.createStatus = 'failure'
  },
  [types.WALLET_CREATING] (state) {
    state.failureMsg = ''
    state.createStatus = 'creating'
  }
}

export default {
  state,
  actions,
  mutations
  // namespaced: true
}
