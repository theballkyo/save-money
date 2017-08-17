<template>
  <div>
    <div v-if="!isLoggedIn" class="sign-in">
      <button @click="authenticate('facebook')" class="loginBtn loginBtn--facebook">
        Login with Facebook
      </button>
    </div>
    <div v-else>
      <div class="display-2 blue--text">Create new wallet</div>
      <v-card class="elevation-0">
        <v-card-text>
          <v-container>
            <v-alert v-if="failureMsg" warning value="true">
              {{ failureMsg }}
            </v-alert>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Wallet name</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  name="wallet-name"
                  label="Wallet name"
                  v-model="walletName"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-btn
              class='btn--extra'
              info
              large
              :loading="createStatus==='creating'"
              @click.native="onCreateWalletClick"
              :disabled="createStatus==='creating'"
            >Create wallet</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      walletName: '',
      isCreating: false
      // failureMsg: ''
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.isLoggedIn,
      createStatus: state => state.wallet.createStatus,
      failureMsg: state => {
        return state.wallet.failureMsg
      }
    })
  },
  methods: {
    ...mapActions([
      'facebookLoginRequest',
      'createWallet'
    ]),
    authenticate (provider) {
      if (provider === 'facebook') {
        this.facebookLoginRequest()
      }
    },
    onCreateWalletClick () {
      if (this.createStatus === 'creating') return
      this.createWallet(this.walletName)
    }
  }
}
</script>

<style scoped>
.btn--extra {
  width: 100%
}
</style>
