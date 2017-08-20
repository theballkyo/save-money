<template>
  <div class="wallet">
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
      </v-tabs-bar>
      <v-tabs-content key="1" id="tab-1">
        <v-card flat>
          <v-card-text>
            <h3>{{ name }} ({{ getTotal }})</h3>
            <v-layout row wrap>
              <v-flex sm12 md2>
                <v-select v-bind:items="typeItems" v-model="type" label="Select" single-line auto prepend-icon="map" hide-details></v-select>
              </v-flex>
              <v-flex sm12 md4>
                <v-select v-bind:items="categoryItems" v-model="category" label="Select" :search-input.sync="categoryInput" autocomplete></v-select>
              </v-flex>
              <v-flex sm12 md5>
                <v-text-field label="จำนวนเงิน" v-model="amount" :suffix="suffix"></v-text-field>
              </v-flex>
              <v-flex s12 m1>
                <v-btn fab dark class="indigo" @click="onAdd">
                  <v-icon dark>add</v-icon>
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
    </v-tabs>
    <v-alert v-else error value="true">
      ไม่พบ Wallet {{ name }}
    </v-alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

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
      typeItems: ['ใช้จ่าย', 'ได้รับ'],
      categoryItems: [],
      categoryItemsDefault: ['Food', 'Drink', 'Drink1', 'Drink2', 'Drink3', 'Drink4', 'Drink5', 'Drink6', 'Drink7', 'Drink8'],
      currentTabId: 'tab-1'
    }
  },
  props: ['name'],
  computed: {
    ...mapGetters([
      'hasWallet'
    ]),
    items () {
      return this.wallet.transactions
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
    '$route' () {
      this.init()
    }
  },
  methods: {
    ...mapActions([
      'addTransaction'
    ]),
    onAdd () {
      this.addTransaction({
        type: this.type,
        walletName: this.name,
        category: this.category,
        amount: this.amount,
        currency: 'THB'
      })
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
      this.currentTabId = 'tab-1'
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
        return moment(String(value)).format('YYYY/MM/DD hh:mm')
      }
    }
  },
  mounted () {
    this.categoryItems = [...this.categoryItemsDefault]
    this.wallet = this.$store.getters.getWallet(this.name)
  }
}
</script>

<style scoped>
.wallet {
  text-align: left;
}
</style>
