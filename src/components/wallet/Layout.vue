<template>
  <v-app id="" toolbar>
    <v-navigation-drawer persistent absolute height="100%" clipped enable-resize-watcher v-model="drawer" light>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="profile ? profile.picture : 'http://www.iconsdb.com/icons/preview/caribbean-blue/businessman-xl.png'" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ `Welcome ${profile ? profile.name : 'Guest'}` }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile to="/wallet/">
          <v-list-tile-content>
            <v-list-tile-title v-text="'หน้าแรก'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
          <v-list-tile slot="item">
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" :to="{name: 'WalletView', params: {name: subItem.title}}">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-tile to="/wallet/categories">
          <v-list-tile-content>
            <v-list-tile-title v-text="'จัดการหมวดหมู่'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isLoggedIn" @click="onLogout">
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="cyan" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ titleBar }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div>© {{ new Date().getFullYear() }} Zone-Gamer</div>
      </v-footer>
    </main>
  </v-app>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'wallet_layout',
  data () {
    return {
      drawer: true,
      items: [
        {
          action: 'restaurant',
          title: 'My wallet',
          active: true,
          items: []
        }
      ],
      right: null
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.isLoggedIn,
      welcomeMsg: state => {
        if (state.auth.isLoggedIn) {
          return `Hello, User`
        }
        return `Hello guest`
      },
      wallets: state => {
        return state.wallet.wallet
      },
      profile: state => {
        if (state.auth.isLoggedIn && state.auth.profile.name) {
          return state.auth.profile
        } else {
          return null
        }
      },
      titleBar: state => state.app.titleBar
    })
  },
  watch: {
    wallets (val) {
      this.updateItems(val)
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    updateItems (wallets) {
      let wallets_ = Object.keys(wallets).map((current) => {
        return {
          title: current
        }
      })
      this.items[0].items = wallets_
    },
    onLogout () {
      this.logout()
      this.$router.push('/wallet/')
    }
  },
  mounted () {
    this.updateItems(this.wallets)
  }
}
</script>

<style>
.application--toolbar>main>.container {
  min-height: calc(100vh - 140px);
}

.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}

.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}

.loginBtn:focus {
  outline: none;
}

.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}



/* Facebook */

.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}

.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}

.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}



/* Google */

.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}

.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}

.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}
</style>