<template>
  <div class="wallet">
    <v-container fluid elevation-0 class="wallet-name mb-4" text-xs-center>
      <h4>Wallet {{ name }}</h4>
    </v-container>
    <v-tabs v-model="currentTabId" v-if="hasWallet(name)" dark icons centered>
      <v-tabs-bar slot="activators" class="cyan">
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item href="#tab-1" ripple>
          <v-icon>phone</v-icon>
          เพิ่มรายการ
        </v-tabs-item>
        <v-tabs-item href="#tab-2" ripple>
          <v-icon>favorite</v-icon>
          ประวัติ
        </v-tabs-item>
        <v-tabs-item href="#graph">
          <v-icon>account_box</v-icon>
          กราฟ
        </v-tabs-item>
        <v-tabs-item href="#settings">
          <v-icon>account_box</v-icon>
          ตั้งค่ากระเป๋าตังค์
        </v-tabs-item>
      </v-tabs-bar>

      <v-tabs-content key="1" id="tab-1">
        <TransactionTab :typeItems="typeItems" :categoryItems="categoryItems" :walletItems="walletItems"></TransactionTab>
      </v-tabs-content>

      <v-tabs-content key="3" id="tab-2">
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

      <v-tabs-content key="3" id="graph">
        <v-card flat>
          <v-card-text>
            Coming soon
          </v-card-text>
        </v-card>
      </v-tabs-content>

      <v-tabs-content key="4" id="settings">
        <v-card flat>
          <v-card-text>
            <v-container fluid>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Normal with hint text/label</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-text-field name="input-1" label="Label Text" id="testing"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>สกุลเงิน</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-select v-bind:items="Object.keys(currencyList)" v-model="settings.currency" label="Currency" autocomplete :hint="currencyHint()" persistent-hint></v-select>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs4>
                </v-flex>
                <v-flex xs8>
                  <v-btn primary @click="onSubmitSettings">ตั้งค่า</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
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
import TransactionTab from '@/components/wallet/tabs/Transaction.vue'
import moment from 'moment'
import currencyList from '@/data/currency.json'

export default {
  name: 'wallet_view',
  data () {
    return {
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
        { state: 'รายจ่าย', value: 0 },
        { state: 'รายรับ', value: 1 },
        { state: 'โอนไปกระเป๋าอื่น', value: 2 }
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
    },
    wallet () {
      return this.$store.getters.getWallet(this.name)
    }
  },
  watch: {
    categoryInput (value) {
      if (!value || value.length === 0) return
      this.categoryItems = [value, ...this.categoryItemsDefault]
    },
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
      // this.wallet = this.$store.getters.getWallet(this.name)
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

      this.settings = { ...this.wallet.settings }

      // Set title bar
      this.$store.dispatch('setTitleBar', `Wallet ${this.name}`)
    },
    onSubmitSettings () {
      this.$store.dispatch('changeSettings', { walletName: this.name, newSettings: this.settings })
    },
    onCategoryAddClick () {
      //
    },
    currencyHint () {
      let walletCurrency = this.wallet.settings ? this.wallet.settings.currency : 'THB'
      const currency = currencyList[walletCurrency]
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
  },
  components: {
    TransactionTab
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
