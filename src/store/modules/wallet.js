import * as types from '../mutations'
import storage from '@/utils/storage'
import moment from 'moment'

const state = {
  wallet: storage.getItem('wallet.wallet', {}),
  createStatus: null,
  failureMsg: ''
}

const getters = {
  getTotalByName: (state, getters) => name => {
    let total = 0
    state.wallet[name].transactions.forEach(t => { total += t.amount })
    return total
  }
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
      return true
    }
  },
  addTransaction ({ commit }, { walletName, category, amount, currency, type }) {
    commit(types.WALLET_ADD_TRANSACTION, { walletName, category, amount, currency, type })
  }
}

const mutations = {
  [types.WALLET_CREATE] (state, {name}) {
    state.wallet = {...state.wallet, [name]: {createdAt: moment(), transactions: []}}
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
  },
  [types.WALLET_ADD_TRANSACTION] (state, { walletName, category, amount, currency, type }) {
    amount = parseFloat(amount)
    const transaction = {
      type,
      category,
      amount,
      currency,
      createdAt: moment({})
    }

    let wallet = state.wallet[walletName]
    if (!wallet.transactions) {
      wallet.transactions = []
    }

    state.wallet[walletName].transactions.push(transaction)
    // Save to localStorage
    window.localStorage.setItem('wallet.wallet', JSON.stringify(state.wallet))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
  // namespaced: true
}
