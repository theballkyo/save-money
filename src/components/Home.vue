<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="loginStatus !== 'request'">
      <button @click="authenticate('facebook')" class="loginBtn loginBtn--facebook">
  Login with Facebook
</button>
<button class="loginBtn loginBtn--google">
  Login with Google
</button>
    </p>
    <p>
      Or sign in as guest
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'App name'
    }
  },
  computed: {
    ...mapState({
      loginStatus: state => state.auth.loginStatus
    })
  },
  methods: {
    ...mapActions([
      'loginRequest',
      'loginSuccess',
      'loginFail'
    ]),
    authenticate: function (provider) {
      this.loginRequest()
      window.FB.login(response => {
        if (response.status === 'connected') {
          const profile = {
            fb_token: response.authResponse.accessToken,
            fb_uid: response.authResponse.userID
          }
          this.loginSuccess(profile)
        } else {
          this.loginFail()
        }
      }, {scope: 'email,user_friends', auth_type: 'rerequest'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

/* Shared */
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
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
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
