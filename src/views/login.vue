<template>
  <div class="login-box">
    <div class="login">
      <div class="title">{{$t('login.text1')}}</div>
      <div class="input-box">
        <input type="text" @keyup.enter="login" :placeholder="$t('login.text2')" v-model.trim="phoneNumber" class="input" @input="checkInput">
      </div>
      <div class="input-box">
        <input type="password" @keyup.enter="login" :placeholder="$t('login.text3')" class="input" v-model.trim="password" @input="checkInput">
      </div>
      <div class="btn-box" @click.prevent="login">
        <div class="btn-login" :class="{'toLogin': isOkBtn, 'loading-btn': loadingShow}"><img src="../assets/img/common/loading.gif" alt="" class="loading-m" v-show="loadingShow">登录</div>
        <p class="error" v-show="errText">{{errText}}</p>
      </div>
      <div class="forget-box">
        <router-link class="secret-a" to="/getBackPwd">{{$t('login.text5')}} |</router-link>
        <router-link class="secret-a" to="/register"> {{$t('login.text6')}}</router-link>
      </div>
      <div class="third-login">{{$t('login.text7')}}</div>
      <div class="third-box">
        <div class="wechat cursor"><img src="../assets/img/common/wechat.png"></div>
        <div class="qq cursor"><img src="../assets/img/common/qq.png"></div>
        <div class="facebook cursor"><img src="../assets/img/common/facebook.png"></div>
        <div class="twitter cursor"><img src="../assets/img/common/twitter.png"></div>
        <div class="google cursor"><img src="../assets/img/common/google.png"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '@/assets/js/bus'
  export default {
		data() {
			return {
        phoneNumber: '',
        password: '',
        isOkBtn: false,
        loadingShow: false,
        errText: ''
      }
		},
    methods: {
      login(){
        this.errText = ''
        if (this.phoneNumber === '') {
          this.errText = this.$t('login.text2')
          return
        }
        let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        if (!reg.test(this.phoneNumber)) {
          this.errText = this.$t('login.text8')
          return
        }
        if (this.password === '') {
          this.errText = this.$t('login.text3')
          return
        }
        this.loadingShow = true
        var authenticationData = {
          Username : this.phoneNumber,
          Password : this.password,
        };
        var userPool = new this.$AmazonCognitoIdentity.CognitoUserPool(this.$poolData);
        var userData = {
          Username : this.phoneNumber,
          Pool : userPool
        };
        var attributeList = [];
        var authenticationDetails = new this.$AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var cognitoUser = new this.$AmazonCognitoIdentity.CognitoUser(userData);
        let _this = this
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            Bus.$emit('setUserFn', _this.phoneNumber)
            _this.loadingShow = false
            var accessToken = result.getAccessToken().getJwtToken();
            localStorage.setItem('__userEmail__', _this.phoneNumber)
            localStorage.setItem('__notTips', 'noTips')
            _this.$router.push('/home')
          },
          onFailure: function(err) {
            _this.loadingShow = false
            if (localStorage.getItem('discoveryLang') === 'CN') {
              if (err.message === 'User does not exist.') {
                _this.errText = '用户不存在'
              } else if (err.message === 'Incorrect username or password.') {
                _this.errText = '用户名或密码不正确'
              } else {
                _this.errText = '登录失败'
              }
            } else {
              _this.errText = err.message
            }
          }
        });
      },
      checkInput() {
        this.errText = ''
        if (this.phoneNumber !== '' && this.password !== '') {
          this.isOkBtn = true
        } else {
          this.isOkBtn = false
        }
      }
    }
	}
</script>

<style scoped lang="stylus">
.login-box{
  height calc(100vh - 80px)
  background-size: 100%;
  padding-top: 90px
  background url("../assets/img/common/Backgroud.png") no-repeat center / cover
}
.login{
  width 500px
  height 600px
  border-radius 8px
  margin: 0 auto
  background #fff
  .title{
    line-height 100px
    text-align center
    font-size 26px
    color #000
    height 100px
    border-bottom 1px solid #e7e7e7
    margin-bottom 50px
  }
  .input-box{
    padding 0 30px
    margin-bottom 20px
    .input{
      height 50px
      width 100%
      background #f2f3f7
      border-radius 4px
      padding-left 30px
      font-size 16px
      color #19191a
      &::-webkit-input-placeholder{
       color:#b3b3b3
      }
      &::-moz-placeholder{   /* Mozilla Firefox 19+ */
              color:#b3b3b3
            }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#b3b3b3
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#b3b3b3
      }
    }
  }
  .btn-box{
    cursor pointer
    margin-top 50px
    height 50px
    position relative
    padding 0 30px
    .btn-login{
      display flex
      justify-content center
      align-items center
      line-height 50px
      text-align center
      height 50px
      width 100%
      background #f2f3f7
      border-radius 4px
      font-size 16px
      color #b3b3b3
      &.toLogin{
        background #3376ff
        color #fff
      }
      &.loading-btn{
        pointer-events none
      }
      .loading-m{
        width: 30px
        margin-right: 10px
        display: block
      }
    }
    .error{
      top -25px
      font-size 12px
      color #ff2121
      position absolute
    }
  }
  .forget-box{
    margin-top 20px
    padding 0 30px
    text-align right
    .secret-a{
      font-size 16px
      color #000
    }
  }
  .third-login{
    text-align center
    font-size 16px
    color #b3b3b3
    margin-top 60px
  }
  .third-box{
    display flex
    justify-content center
    margin-top 20px
    .cursor{
      width 48px
      height 48px
      cursor pointer
      margin-right 20px
      &:last-child{
        margin-right 0
      }
      img{
        width 100%
      }
    }
  }
}
</style>
