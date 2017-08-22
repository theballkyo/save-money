<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 md3>
          <v-select v-bind:items="typeItems" v-model="transactionType" label="ประเภท" prepend-icon="map" item-text="state" item-value="value" return-object></v-select>
        </v-flex>
        <v-flex v-if="transactionType.value !== 2" xs12 md2>
          <v-btn block primary dark @click.stop="categoryDialog = true">เลือกหมวดหมู่</v-btn>
          <v-dialog v-model="categoryDialog">
            <v-card>
              <v-card-title>Select Categories</v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-list two-line>
                  <template v-for="item in items">
                    <v-subheader v-if="item.header" v-text="item.header"></v-subheader>
                    <v-divider v-else-if="item.divider" v-bind:inset="item.inset"></v-divider>
                    <v-list-tile avatar v-else v-bind:key="item.title" href="javascript:;" download target="_blank">
                      <v-list-tile-avatar>
                        <img v-bind:src="item.avatar"></v-list-tile-avatar>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn class="blue--text darken-1" flat @click.native="categoryDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat @click.native="categoryDialog = false">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex v-else xs12 md5>
          <v-select v-bind:items="walletItems" v-model="transferToWallet" label="กระเป๋าตัง" autocomplete></v-select>
        </v-flex>
        <v-flex xs12 md3>
          <v-text-field label="จำนวนเงิน" v-model="amount"></v-text-field>
        </v-flex>
        <v-flex xs12 md2>
          <v-btn block class="blue-grey white--text" @click="onAdd">
            Save
            <v-icon right dark>check_circle</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  data () {
    return {
      categoryDialog: false,
      transactionType: {},
      category: null,
      transferToWallet: null,
      amount: 0,
      items: [
        { avatar: '/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
        { header: 'Or create new' },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Create new', subtitle: '' }
      ]
    }
  },
  props: {
    typeItems: {
      required: true
    },
    categoryItems: {
      required: true
    },
    walletItems: {
      required: true
    }
  },
  methods: {
    onAdd () {
      this.$emit('onAdd', {})
    },
    onCategoryAddClick () {
      //
    }
  },
  watch: {
    transactionType (value) {
      this.$emit('onTransactionTypeChange', value)
    }
  },
  mounted () {
    //
  }
}
</script>

<style scoped>

</style>
