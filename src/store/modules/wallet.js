import * as types from '../mutations'

const state = {
  wallet: [],
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
    if (state.wallet.find((wallet) => wallet.name === name)) {
      const failureMsg = `Name is same`
      commit(types.WALLET_CREATE_FAILURE, { failureMsg })
    } else {
      commit(types.WALLET_CREATE, { name })
      setTimeout(() => {
        commit(types.WALLET_CREATE_SUCCESS)
        console.log(`Creat wallet name ${name} successfully`)
      }, 1)
    }
  }
}

const mutations = {
  [types.WALLET_CREATE] (state, {name}) {
    state.wallet.push({
      name,
      createAt: new Date(),
      statement: []
    })
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
