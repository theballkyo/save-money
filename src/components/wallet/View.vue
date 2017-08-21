<template>
  <div class="wallet">
    <v-container fluid elevation-0 class="wallet-name mb-4" text-xs-center><h4>Wallet {{ name }}</h4></v-container>
    <v-tabs v-model="currentTabId" v-if="hasWallet(name)" dark fixed icons centered>
      <v-tabs-bar slot="activators" class="cyan">
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item href="#tab-1">
          <v-icon>phone</v-icon>
          เพิ่มรายการ
        </v-tabs-item>
        <v-tabs-item href="#tab-2">
          <v-icon>favorite</v-icon>
          ประวัติ
        </v-tabs-item>
        <v-tabs-item href="#tab-3">
          <v-icon>account_box</v-icon>
          กราฟ
        </v-tabs-item>
        <v-tabs-item href="#settings">
          <v-icon>account_box</v-icon>
          ตั้งค่ากระเป๋าตังค์
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-content key="1" id="tab-1">
        <v-card>
          <v-card-text>
            <v-layout row wrap>
              <v-flex sm12 md3>
                <v-select
                  v-bind:items="typeItems"
                  v-model="type"
                  label="ประเภท"
                  prepend-icon="map"
                  item-text="state"
                  item-value="value"
                  return-object
                ></v-select>
              </v-flex>
              <v-flex v-if="type.value !== 2" sm12 md4>
                <v-select v-bind:items="categoryItems"  v-model="category" label="หมวดหมู่" :search-input.sync="categoryInput" autocomplete></v-select>
              </v-flex>
              <v-flex v-else sm12 md5>
                <v-select v-bind:items="walletItems" v-model="transferToWallet" label="กระเป๋าตัง" autocomplete></v-select>
              </v-flex>
              <v-flex v-if="type.value !== 2" s12 m1>
                <v-btn fab dark class="indigo" @click="onCategoryAddClick">
                  <v-icon dark>add</v-icon>
                </v-btn>
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field label="จำนวนเงิน" v-model="amount" :suffix="suffix"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex s12 m1>
                <v-btn
                  class="blue-grey white--text"
                  @click="onAdd"
                >
                  Upload
                  <v-icon right dark>cloud_upload</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tabs-content>
      <v-tabs-content key="2" id="tab-2">
        <v-card flat>
          <v-card-text>
            <v-data-table v-bind:headers="headers" :items="items" class="elevation-1" v-bind:pagination.sync="pagination">
              <template slot="headerCell" scope="props">
                <span v-tooltip:bottom="{ 'html': props.header.text }">
                  {{ props.header.text }}
                </span>
              </template>
              <template slot="items" scope="props">
                <tr>
                  <td class="text-xs-left">{{ props.item.category|defaultValue('ไม่ได้ระบุ ') }}</td>
                  <td class="text-xs-right">{{ props.item.amount }}</td>
                  <td class="text-xs-right">{{ props.item.currency }}</td>
                  <td class="text-xs-right">{{ props.item.createdAt|formatDate }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tabs-content>
      
      <v-tabs-content key="2" id="settings">
        <v-card flat>
          <v-card-text>
            <form @keyup.enter="onSubmitSettings" @submit.prevent="onSubmitSettings">
              <v-container fluid>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Normal with hint text/label</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="input-1"
                      label="Label Text"
                      id="testing"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>สกุลเงิน</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-select
                      v-bind:items="Object.keys(currencyList)"
                      v-model="settings.currency"
                      label="Currency" autocomplete
                      :hint="currencyHint(settings.currency)"
                      persistent-hint	
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs4>
                  </v-flex>
                  <v-flex xs8>
                    <v-btn primary>ตั้งค่า</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </form>
          </v-card-text>
        </v-card>
      </v-tabs-content>

    </v-tabs>
    <v-alert v-else error value="true">
      ไม่พบ Wallet {{ name }}
    </v-alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import currencyList from '@/data/currency.json'

export default {
  name: 'wallet_view',
  data () {
    return {
      wallet: null,
      type: '',
      category: '',
      categoryInput: '',
      amount: 0,
      suffix: 'Baht',
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      selected: [],
      headers: [
        {
          text: 'หมวดหมู่',
          align: 'left',
          value: 'category'
        },
        { text: 'จำนวนเงิน', value: 'amount' },
        { text: 'สกุลเงิน', value: 'currency' },
        { text: 'วันที่บันทึก', value: 'createdAt' }
      ],
      typeItems: [
        {state: 'รายจ่าย', value: 0},
        {state: 'รายรับ', value: 1},
        {state: 'โอนไปกระเป๋าอื่น', value: 2}
      ],
      categoryItems: [],
      categoryItemsDefault: ['Food', 'Drink', 'Drink1', 'Drink2', 'Drink3', 'Drink4', 'Drink5', 'Drink6', 'Drink7', 'Drink8'],
      walletItems: [],
      transferToWallet: '',
      currencyList: [],
      settings: {
        currency: 'THB'
      },
      currentTabId: 'tab-1'
    }
  },
  props: ['name'],
  computed: {
    ...mapGetters([
      'hasWallet'
    ]),
    items () {
      return this.$store.getters.getWallet(this.name).transactions
    },
    getTotal () {
      return this.$store.getters.getTotalByName(this.name)
    }
  },
  watch: {
    categoryInput (value) {
      if (!value || value.length === 0) return
      this.categoryItems = [value, ...this.categoryItemsDefault]
    },
    // type (value) {
    //   const myWalletName = this.name
    //   const wallets = this.$store.state.wallet.wallet.filter(wallet => wallet.name !== myWalletName)
    //   console.log(wallets)
    //   this.walletItems = wallets
    // },
    '$route' () {
      this.init()
    }
  },
  methods: {
    ...mapActions([
      'addTransaction'
    ]),
    onAdd () {
      let transaction = {
        type: this.type.value,
        walletName: this.name,
        category: this.category,
        amount: this.amount,
        currency: 'THB'
      }

      if (this.type.value === 2) {
        let transactionTo = {
          ...transaction,
          walletName: this.transferToWallet,
          transferFrom: this.name
        }

        this.addTransaction(transactionTo)

        transaction.transferTo = this.transferToWallet
      }

      this.addTransaction(transaction)

      this.currentTabId = 'tab-2'
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    init () {
      this.wallet = this.$store.getters.getWallet(this.name)
      const myWalletName = this.name
      let walletItems = []
      Object.keys(this.$store.state.wallet.wallet).forEach(name => {
        if (name === myWalletName) return
        walletItems.push(name)
      })
      this.walletItems = walletItems

      this.type = 0
      this.category = ''
      this.transferToWallet = ''

      this.currentTabId = 'tab-1'
      this.wallet = this.$store.getters.getWallet(this.name)

      // Set title bar
      this.$store.dispatch('setTitleBar', `Wallet ${this.name}`)
    },
    onCategoryAddClick () {
      //
    },
    currencyHint (value) {
      const currency = currencyList[value]
      return `${currency.symbol} (${currency.name})`
    }
  },
  filters: {
    defaultValue (value, value2) {
      if (!value || value === '') {
        return value2
      }
      return value
    },
    formatDate (value) {
      if (value) {
        return moment.parseZone(String(value)).local().format('YYYY/MM/DD HH:mm:ss')
      }
      return ''
    }
  },
  mounted () {
    this.categoryItems = [...this.categoryItemsDefault]
    this.currencyList = currencyList
    this.init()
  }
}
</script>

<style scoped>
.wallet {
  text-align: left;
}
.wallet-name {
  background-color: white;
  border: 1px solid #e1e1e1;
}
</style>
