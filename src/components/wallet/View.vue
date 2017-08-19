<template>
  <div class="wallet">
    <v-tabs dark fixed icons centered>
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
      <v-tabs-content
        key="1"
        id="tab-1"
      >
        <v-card flat>
          <v-card-text>
            <h3>{{ name }} ({{ getTotal }})</h3>
            <v-layout row wrap>
              <v-flex sm12 md2>
                <v-select
                  v-bind:items="typeItems"
                  v-model="type"
                  label="Select"
                  single-line
                  auto
                  prepend-icon="map"
                  hide-details
                ></v-select>
              </v-flex>
              <v-flex sm12 md4>
                <v-select
                  v-bind:items="categoryItems"
                  v-model="category"
                  label="Select"
                  :search-input.sync="categoryInput"
                  autocomplete
                ></v-select>
              </v-flex>
              <v-flex sm12 md5>
                <v-text-field
                  label="จำนวนเงิน"
                  v-model="amount"
                  :suffix="suffix"
                ></v-text-field>
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
      <v-tabs-content
        key="2"
        id="tab-2"
      >
        <v-card flat>
          <v-card-text>
            <v-data-table
              v-model="selected"
              v-bind:headers="headers"
              v-bind:items="items"
              select-all
              v-bind:pagination.sync="pagination"
              selected-key="name"
              class="elevation-1"
            >
              <template slot="headers" scope="props">
                <tr>
                  <th v-for="header in props.headers" :key="header.text"
                    :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                    @click="changeSort(header.value)"
                  >
                    <v-icon>arrow_upward</v-icon>
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template slot="items" scope="props">
                <tr>
                  <td class="text-xs-right">{{ props.item.category|defaultValue('ไม่ได้ระบุ ') }}</td>
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

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
        sortBy: 'name'
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
      categoryItemsDefault: ['Food', 'Drink', 'Drink1', 'Drink2', 'Drink3', 'Drink4', 'Drink5', 'Drink6', 'Drink7', 'Drink8']
      // items: []
    }
  },
  props: ['name'],
  computed: {
    ...mapState({
      'wallet': state => state.wallet.wallet
    }),
    items () {
      return this.wallet[this.name].transactions
    },
    getTotal () {
      return this.$store.getters.getTotalByName(this.name)
    }
  },
  watch: {
    categoryInput (value) {
      if (!value || value.length === 0) return
      this.categoryItems = [value, ...this.categoryItemsDefault]
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
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
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
  }
}
</script>

<style scoped>
.wallet {
  text-align: left;
}
</style>
