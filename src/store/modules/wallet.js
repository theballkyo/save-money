import * as types from '../mutations'
import storage from '@/utils/storage'
import moment from 'moment'

const defaultCategories = [
  {
    name: 'Food',
    icon: '',
    sub: [
      {
        name: 'Noodle',
        icon: ''
      },
      {
        name: 'Buffet',
        icon: ''
      }
    ]
  },
  {
    name: 'Drink',
    icon: '',
    sub: [
      {
        name: 'Coke',
        icon: ''
      },
      {
        name: 'Pepsi',
        icon: ''
      }
    ]
  }
]

const state = {
  wallet: storage.getItem('wallet.wallet', {}),
  categories: storage.getItem('wallet.categories', defaultCategories),
  createStatus: null,
  failureMsg: ''
}

const getters = {
  getTotalByName: (state, getters) => name => {
    let total = 0
    state.wallet[name].transactions.forEach(t => { total += t.amount })
    return total
  },
  getWallet: (state, getters) => name => {
    return state.wallet[name]
  },
  hasWallet: (state) => name => {
    return !!state.wallet[name]
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
  addTransaction ({ commit }, { walletName, category, amount, currency, type, transferTo = null, transferFrom = null }) {
    commit(types.WALLET_ADD_TRANSACTION, { walletName, category, amount, currency, type, transferTo, transferFrom })
  },
  changeSettings ({ commit }, { walletName, newSettings }) {
    commit(types.WALLET_CHANGE_SETTINGS, { walletName, newSettings })
  }
}

const mutations = {
  [types.WALLET_CREATE] (state, {name}) {
    let wallet = {
      createdAt: moment(),
      settings: {
        currency: 'THB' // Default
      },
      totalAmount: 0,
      transactions: []
    }
    state.wallet = {...state.wallet, [name]: wallet}
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
  [types.WALLET_ADD_TRANSACTION] (state, { walletName, category, amount, type, transferTo, transferFrom }) {
    amount = parseFloat(amount)
    let wallet = state.wallet[walletName]
    const currency = wallet.currency
    const transaction = {
      type,
      category,
      amount,
      currency,
      transferTo,
      transferFrom,
      createdAt: moment()
    }

    if (!wallet.transactions) {
      wallet.transactions = []
    }

    state.wallet[walletName].transactions.push(transaction)
    // Save to localStorage
    window.localStorage.setItem('wallet.wallet', JSON.stringify(state.wallet))
  },
  [types.WALLET_CHANGE_SETTINGS] (state, { walletName, newSettings }) {
    let wallet = state.wallet[walletName]
    wallet.settings = {...wallet.settings, ...newSettings}
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
